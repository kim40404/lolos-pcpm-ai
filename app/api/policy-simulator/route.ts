import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { HfInference } from '@huggingface/inference';
import { ratelimit } from '@/lib/ratelimit';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;

    // --- RATE LIMITING CHECK ---
    if (ratelimit) {
      const { success } = await ratelimit.limit(userId);
      if (!success) {
        return NextResponse.json(
          { error: 'Terlalu banyak permintaan (Spam terdeteksi). Mohon tunggu sekitar 1 menit sebelum mencoba lagi.' }, 
          { status: 429 }
        );
      }
    }
    // ---------------------------

    const { action, scenario, decision } = await req.json();

    // Check token quota
    const dbUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!dbUser || dbUser.aiQuota <= 0) {
      return NextResponse.json({ error: 'Token habis. Silakan langganan Premium.' }, { status: 403 });
    }

    // Deduct 1 token
    await prisma.user.update({
      where: { id: userId },
      data: { aiQuota: { decrement: 1 } },
    });

    if (action === 'generate') {
      const prompt = `Anda adalah seorang ahli pembuat soal seleksi Bank Indonesia (BI).
Buatlah sebuah studi kasus makroekonomi (maksimal 2-3 paragraf pendek) yang sangat menantang bagi calon pegawai Bank Indonesia (PCPM).
Skenarionya harus melibatkan salah satu atau kombinasi masalah berikut: Inflasi, Suku Bunga Global, Nilai Tukar Rupiah, Cadangan Devisa, atau Pertumbuhan Ekonomi.
Berikan data angka fiktif yang realistis (misal: "Inflasi bulan ini mencapai 6.5%, sementara Fed Rate baru saja naik...").
Tuliskan HANYA laporan kasusnya saja, tanpa ada teks pembuka atau penutup. Gunakan bahasa Indonesia yang baku dan profesional ala laporan bank sentral.`;

      let generatedScenario = '';
      for await (const chunk of hf.chatCompletionStream({
        model: "Qwen/Qwen2.5-72B-Instruct",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
        temperature: 0.8,
      })) {
        generatedScenario += (chunk.choices[0]?.delta?.content || "");
      }

      return NextResponse.json({ scenario: generatedScenario });
    } 
    
    else if (action === 'evaluate') {
      if (!scenario || !decision) {
        return NextResponse.json({ error: 'Scenario dan decision wajib diisi' }, { status: 400 });
      }

      const prompt = `Anda adalah Deputi Gubernur Senior Bank Indonesia.
Seorang analis (user) baru saja memberikan rekomendasi kebijakan berdasarkan skenario ekonomi berikut:

SKENARIO:
${scenario}

KEPUTUSAN USER:
${decision}

Tugas Anda: Evaluasi keputusan user dengan standar tinggi Bank Sentral.
1. Apakah kebijakannya tepat sasaran secara teori makroekonomi/moneter?
2. Apa dampak sampingan (trade-off) dari keputusannya yang mungkin tidak ia sadari?
3. Berikan skor (0-100) dan kesimpulan akhir.

PENTING: Seluruh standar teori kebanksentralan dan argumen yang Anda gunakan harus didasarkan pada literatur resmi publik dari website Bank Indonesia (www.bi.go.id).
Gunakan bahasa Indonesia yang profesional, tegas, berwibawa, dan sedikit mengintimidasi namun edukatif. Format jawaban Anda menggunakan markdown yang rapi (bold, bullet points).`;

      let evaluation = '';
      for await (const chunk of hf.chatCompletionStream({
        model: "Qwen/Qwen2.5-72B-Instruct",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 800,
        temperature: 0.7,
      })) {
        evaluation += (chunk.choices[0]?.delta?.content || "");
      }

      return NextResponse.json({ evaluation });
    }

    return NextResponse.json({ error: 'Action tidak valid' }, { status: 400 });

  } catch (error: any) {
    console.error('Policy Simulator API Error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan pada server AI.' }, { status: 500 });
  }
}
