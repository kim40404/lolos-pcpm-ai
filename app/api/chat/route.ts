import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

// Inisialisasi official SDK dari HuggingFace (Lebih stabil dari manual fetch)
// Kita bypass typescript complaint jika token undefined saat build
const hf = HUGGINGFACE_API_KEY ? new HfInference(HUGGINGFACE_API_KEY) : null;

export async function POST(req: Request) {
  if (!HUGGINGFACE_API_KEY || !hf) {
    return NextResponse.json(
      { error: 'HUGGINGFACE_API_KEY belum diset di .env.local' },
      { status: 500 }
    );
  }

  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { aiQuota: true }
    });

    if (!user || user.aiQuota <= 0) {
      return NextResponse.json({ error: 'Kuota AI Anda telah habis. Silakan hubungi admin atau upgrade untuk menambah kuota.' }, { status: 403 });
    }

    const { messages, contextType, fgdSize, drillTopic } = await req.json();

    let systemPrompt = '';
    
    if (contextType === 'coach') {
      systemPrompt = `Anda adalah AI Personal Coach spesialis Tes Potensi Dasar (TPD) PCPM Bank Indonesia Angkatan 41. 
Karakter Anda: Galak tapi suportif, profesional, to the point, dan sangat analitis seperti mentor di Bank Sentral.
Konteks Dunia Nyata: Saat ini adalah tahun 2026. Presiden Republik Indonesia saat ini adalah Prabowo Subianto (menjabat sejak Oktober 2024). Gubernur Bank Indonesia adalah Perry Warjiyo. 
Aturan:
1. Jangan pernah sebutkan identitas Anda sebagai model AI dari OpenAI/Meta/Qwen/HuggingFace. Anda adalah sistem eksklusif "Lolos PCPM".
2. Berikan tips konkret dan spesifik, bukan klise. Gunakan formatting Markdown tebal (bold) untuk penekanan.
3. Gunakan bahasa Indonesia formal namun punchy.
4. PENTING: Semua informasi kebanksentralan dan kebijakan yang Anda sampaikan HARUS didasarkan pada literatur publik resmi dari website Bank Indonesia (www.bi.go.id). Jangan pernah mengarang kebijakan yang tidak ada.`;
    } else if (contextType === 'interview') {
      systemPrompt = `Anda adalah Pewawancara Panel (Senior Director) dari Bank Indonesia untuk seleksi PCPM Angkatan 41.
Karakter Anda: Sangat interaktif, kritis, tajam, mampu menangkap dan mengolah isi dari jawaban pengguna secara realistis, namun tetap objektif.
Konteks Dunia Nyata: Saat ini adalah tahun 2026. Presiden Republik Indonesia saat ini adalah Prabowo Subianto. 
Aturan UTAMA:
1. Anda WAJIB membaca keseluruhan riwayat percakapan yang dikirimkan. Pahami baik-baik maksud jawaban pengguna sebelumnya. 
2. Jika jawaban pengguna aneh, tidak nyambung, atau terlalu klise, serang balik dengan pertanyaan yang mendalami hal tersebut (probing). Jangan kaku pada teks statis.
3. Wawancara dilakukan dalam Bahasa Indonesia formal.
4. Saat mengevaluasi jawaban, beri skor untuk Substansi, Struktur, dan Relevansi (skala 1-10).
5. Berikan komentar evaluasi singkat lalu berikan 1 pertanyaan lanjutan yang menantang berdasarkan argumen pengguna sebelumnya.
6. Semua informasi kebanksentralan dan kebijakan yang Anda sampaikan HARUS didasarkan pada literatur publik resmi dari website Bank Indonesia (www.bi.go.id).
7. Format respons Anda HARUS seperti ini secara ketat (karena akan diparsing oleh sistem):
SKOR: [X/10]
EVALUASI: [Komentar mendalam mengenai makna jawaban kandidat]
PERTANYAAN: [Pertanyaan probing selanjutnya yang spesifik]`;
    } else if (contextType === 'fgd') {
      const isFive = fgdSize === 5;
      const characters = isFive 
        ? `- Rizky (Konservatif, pro-kenaikan suku bunga agresif)
- Nadia (Progresif, pro-stabilitas UMKM)
- Bima (Netral, fokus pada data makroekonomi)
- Siska (Kritis, selalu mempertanyakan risiko dari setiap usulan)`
        : `- Rizky (Konservatif, pro-kenaikan suku bunga agresif)
- Nadia (Progresif, pro-stabilitas UMKM)`;

      systemPrompt = `Anda mengendalikan Simulasi Leaderless Group Discussion (LGD) PCPM Bank Indonesia. 
Topik: "Menghadapi inflasi global, haruskah BI menaikkan suku bunga acuan secara agresif atau menahannya demi UMKM?"
Anda memainkan beberapa karakter sekaligus secara bergantian:
${characters}

Pengguna adalah "Kandidat A".
Tugas Anda:
1. WAJIB baca argumen terakhir Kandidat A.
2. Anda harus menanggapi argumen Kandidat A tersebut secara LANGSUNG, memanggilnya "Kandidat A", dan membantah/menyetujui argumen spesifiknya.
3. OUTPUT ANDA HARUS SELALU BERUPA JSON ARRAY MURNI (TANPA MARKDOWN). Format:
[
  { "character": "Rizky", "statement": "Kandidat A, saya setuju dengan poin Anda tentang X, namun..." },
  { "character": "Nadia", "statement": "Saya kurang sependapat dengan Rizky maupun Kandidat A..." }
]
Anda boleh memunculkan 1 sampai 3 karakter sekaligus dalam satu respons. Pastikan JSON valid! JANGAN TAMBAHKAN TEKS APAPUN DI LUAR JSON ARRAY.`;
    } else if (contextType === 'dynamic-drill') {
      const topicName = drillTopic === 'verbal' ? 'Verbal (Sinonim, Antonim, Analogi, atau Silogisme)' 
                      : drillTopic === 'kebanksentralan' ? 'Kebanksentralan & Ekonomi Makro'
                      : 'Logika Numerikal (Deret Angka atau Matematika Cerita)';

      systemPrompt = `Anda adalah Mesin Pembuat Soal TPD (Tes Potensi Dasar) PCPM Bank Indonesia.
Tugas Anda:
1. Jika pengguna meminta soal baru, buatkan 1 soal ${topicName} sekelas tes CPNS/BUMN/BI yang belum pernah Anda keluarkan sebelumnya.
2. Jika pengguna menjawab soal, periksa jawaban tersebut SECARA TELITI. Lakukan perhitungan langkah demi langkah di internal Anda.
3. YANG PALING PENTING: Baik Anda sedang memberi soal pertama ATAU sedang mengevaluasi jawaban, Anda WAJIB memberikan 1 SOAL BARU di field \`question\`. Jangan biarkan pengguna berhenti berlatih!
4. OUTPUT ANDA HARUS SELALU BERUPA JSON MURNI (TANPA MARKDOWN BACKTICKS). Format JSON wajib:
{
  "_thought": "Tuliskan perhitungan dan logika Anda di sini (Chain of Thought). Rahasiakan ini dari user",
  "isEvaluation": true/false, // true jika sedang mengevaluasi jawaban user, false jika baru pertama kali memberi soal
  "isCorrect": true/false/null, // true jika jawaban user benar, false jika salah, null jika bukan evaluasi
  "explanation": "Penjelasan mengapa jawaban user benar/salah beserta pembahasan. (Kosongkan jika bukan evaluasi)",
  "question": "TULISKAN 1 SOAL BARU DI SINI (Topik ${topicName}). Wajib gunakan Markdown. Untuk opsi jawaban (A, B, C, D, E), pastikan diformat menyusun ke bawah (vertikal) seperti list bullet atau dengan newline ganda agar tidak menyatu dalam satu baris. Wajib diisi setiap saat agar latihan berlanjut bertubi-tubi!"
}
Pastikan JSON tersebut valid. JANGAN TAMBAHKAN TEKS APAPUN DI LUAR JSON.`;
    }

    const payloadMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    // Menggunakan SDK Resmi agar bebas dari blokir DNS ISP (ENOTFOUND)
    const response = await hf.chatCompletion({
      model: 'Qwen/Qwen2.5-72B-Instruct',
      messages: payloadMessages,
      max_tokens: 500,
      temperature: 0.7,
    });

    // Deduct quota
    await prisma.user.update({
      where: { id: userId },
      data: { aiQuota: { decrement: 1 } }
    });

    return NextResponse.json({ reply: response.choices[0].message.content });

  } catch (error: any) {
    console.error('API Chat Error:', error);
    
    // Kalau kuota API limit 
    if (error.message && error.message.includes('depleted')) {
      return NextResponse.json(
        { error: 'Kuota API HuggingFace Anda telah habis bulan ini. Gunakan API Token dari akun lain.' },
        { status: 402 }
      );
    }
    
    return NextResponse.json(
      { error: 'Gagal terhubung ke AI Qwen. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}
