import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { PerformanceCard } from '@/components/ui/performance-benchmark-card';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect('/pricing');
  }

  // Fetch tryout results
  const tryouts = await prisma.tryoutResult.findMany({
    where: { userId: (session.user as any).id },
    orderBy: { createdAt: 'desc' }
  });

  const totalTryouts = tryouts.length;
  
  // Calculate averages
  let avgAccuracy = 0;
  let avgPace = 0;
  let totalSoal = 0;
  let verbalPct = 0, numPct = 0, diagramPct = 0, dsPct = 0;

  if (totalTryouts > 0) {
    const sumAccuracy = tryouts.reduce((acc, curr) => acc + curr.accuracy, 0);
    avgAccuracy = Math.round(sumAccuracy / totalTryouts);

    // Total questions in TPD is 93 (17 Verbal + 17 Numerikal + 17 Diagram + 42 DS)
    totalSoal = totalTryouts * 93;

    // Calculate Pace
    // Max time is 90 minutes = 5400 seconds
    const totalTimeSpent = tryouts.reduce((acc, curr) => acc + (5400 - curr.timeSaved), 0);
    avgPace = Math.round(totalTimeSpent / totalSoal);

    // Topic Mastery
    const sumVerbal = tryouts.reduce((acc, curr) => acc + curr.verbal, 0);
    const sumNum = tryouts.reduce((acc, curr) => acc + curr.numerikal, 0);
    const sumDiagram = tryouts.reduce((acc, curr) => acc + curr.diagram, 0);
    const sumDS = tryouts.reduce((acc, curr) => acc + curr.digitSimbol, 0);

    verbalPct = Math.round((sumVerbal / (17 * totalTryouts)) * 100);
    numPct = Math.round((sumNum / (17 * totalTryouts)) * 100);
    diagramPct = Math.round((sumDiagram / (17 * totalTryouts)) * 100);
    dsPct = Math.round((sumDS / (42 * totalTryouts)) * 100);
  }

  // Determine weakness for AI Insights
  let weakness = "Belum ada data";
  let weaknessRecommendation = "Selesaikan setidaknya 1 Tryout TPD untuk mendapatkan analisis AI terkait kekuatan dan kelemahan Anda.";
  
  if (totalTryouts > 0) {
    const topics = [
      { name: "Verbal", val: verbalPct },
      { name: "Numerikal", val: numPct },
      { name: "Diagram (Spasial)", val: diagramPct },
      { name: "Digit Simbol", val: dsPct }
    ];
    topics.sort((a, b) => a.val - b.val); // lowest first
    weakness = topics[0].name;
    weaknessRecommendation = `Berdasarkan ${totalTryouts} latihan terakhir, akurasi pada topik **${weakness}** masih menjadi kelemahan utama Anda (${topics[0].val}%).\n\nKami merekomendasikan Anda untuk fokus berlatih lebih banyak variasi soal pada topik tersebut untuk meningkatkan total skor Anda.`;
  }

  const performanceData = {
    title: "Akurasi Keseluruhan TPD",
    headerIcon: <span className="text-lg">🎯</span>,
    mainValue: avgAccuracy,
    percentageChange: totalTryouts > 1 ? 5.2 : 0, // Mocked positive change for demo if has history
    benchmarkAverage: 80,
    competitors: [
      {
        name: "Top 10% Peserta",
        value: 92,
        icon: <span className="text-lg">🏆</span>,
      },
      {
        name: "Rata-rata Peserta",
        value: 75,
        icon: <span className="text-lg">👥</span>,
      },
      {
        name: "Batas Lulus Aman",
        value: 80,
        icon: <span className="text-lg">✅</span>,
      },
    ],
    performanceLevels: [
        { label: "0", value: 60, color: "bg-red-500" },
        { label: "60", value: 75, color: "bg-orange-400" },
        { label: "75", value: 85, color: "bg-yellow-400" },
        { label: "85+", value: 100, color: "bg-green-500" },
    ],
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 font-sans relative overflow-hidden">
      <img src="/bi-logo-black.png" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 opacity-[0.03] pointer-events-none invert" alt="" />
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src="/bi-logo-white.png" alt="Bank Indonesia" className="h-8 w-auto" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              Halo, {session.user.name || 'Calon PCPM BI'}! 👋
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Pantau kesiapan dan perkembangan belajarmu di sini.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/tryouts" className="px-5 py-2.5 bg-[#00e5ff] text-black font-bold rounded-lg hover:bg-[#00c4cc] transition-colors shadow-[0_0_15px_rgba(0,229,255,0.3)]">
              Mulai Tryout Baru
            </Link>
            <Link href="/interview" className="px-5 py-2.5 border border-gray-700 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
              AI Chatbot
            </Link>
          </div>
        </div>

        {/* Analytics Section with Performance Card */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          
          <div className="xl:col-span-2 grid grid-cols-2 gap-4">
            <div className="bg-[#111111] border border-[#222] rounded-xl p-5 relative overflow-hidden group hover:border-[#00e5ff]/50 transition-colors">
              <div className="text-xs text-gray-500 font-semibold tracking-wider mb-2">STATUS KESIAPAN</div>
              <div className="text-3xl font-bold text-[#00e5ff]">{avgAccuracy >= 80 ? 'Siap Ujian' : (totalTryouts === 0 ? '-' : 'Belum Siap')}</div>
              <div className="text-xs text-[#00e5ff] mt-2 bg-[#00e5ff]/10 inline-block px-2 py-1 rounded">Berdasarkan Akurasi Total</div>
            </div>

            <div className="bg-[#111111] border border-[#222] rounded-xl p-5 relative overflow-hidden group hover:border-[#a3e635]/50 transition-colors">
              <div className="text-xs text-gray-500 font-semibold tracking-wider mb-2">AKURASI RATA-RATA</div>
              <div className="text-3xl font-bold text-[#a3e635]">{avgAccuracy}%</div>
              <div className="text-xs text-gray-400 mt-2">Dari target kelulusan 80%</div>
            </div>

            <div className="bg-[#111111] border border-[#222] rounded-xl p-5 relative overflow-hidden group hover:border-[#c084fc]/50 transition-colors">
              <div className="text-xs text-gray-500 font-semibold tracking-wider mb-2">KECEPATAN (PACE)</div>
              <div className="text-3xl font-bold text-[#c084fc]">{avgPace}s</div>
              <div className="text-xs text-gray-400 mt-2">Rata-rata per soal</div>
            </div>

            <div className="bg-[#111111] border border-[#222] rounded-xl p-5 relative overflow-hidden group hover:border-[#facc15]/50 transition-colors">
              <div className="text-xs text-gray-500 font-semibold tracking-wider mb-2">SOAL DIKERJAKAN</div>
              <div className="text-3xl font-bold text-[#facc15]">{totalSoal}</div>
              <div className="text-xs text-gray-400 mt-2">Dari {totalTryouts} sesi Tryout</div>
            </div>
          </div>

          <div className="xl:col-span-1">
            <PerformanceCard
              title={performanceData.title}
              headerIcon={performanceData.headerIcon}
              mainValue={performanceData.mainValue}
              percentageChange={performanceData.percentageChange}
              benchmarkAverage={performanceData.benchmarkAverage}
              competitors={performanceData.competitors}
              performanceLevels={performanceData.performanceLevels}
            />
          </div>

        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Topic Mastery (Col-Span-2) */}
          <div className="bg-[#111111] border border-[#222] rounded-xl p-6 lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-bold text-gray-300 tracking-wider">PENGUASAAN TOPIK (TOPIC MASTERY)</h2>
            </div>
            
            <div className="space-y-6">
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">📊 Kemampuan Numerikal</span>
                  <span className="text-sm font-bold text-[#a3e635]">{numPct}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-[#a3e635] h-2 rounded-full transition-all duration-1000" style={{ width: `${numPct}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">📝 Kemampuan Verbal</span>
                  <span className="text-sm font-bold text-[#00e5ff]">{verbalPct}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-[#00e5ff] h-2 rounded-full transition-all duration-1000" style={{ width: `${verbalPct}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">🧩 Kemampuan Spasial (Diagram)</span>
                  <span className="text-sm font-bold text-[#ff2a85]">{diagramPct}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-[#ff2a85] h-2 rounded-full transition-all duration-1000" style={{ width: `${diagramPct}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">🔢 Digit Simbol</span>
                  <span className="text-sm font-bold text-[#c084fc]">{dsPct}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-[#c084fc] h-2 rounded-full transition-all duration-1000" style={{ width: `${dsPct}%` }}></div>
                </div>
              </div>

            </div>
          </div>

          {/* AI Insights (Col-Span-1) */}
          <div className="bg-gradient-to-br from-[#111111] to-[#1a1a1a] border border-[#ff2a85]/30 rounded-xl p-6 relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff2a85] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🤖</span>
              <h2 className="text-sm font-bold text-[#ff2a85] tracking-wider">AI INSIGHTS & REKOMENDASI</h2>
            </div>
            
            <div className="text-gray-300 text-sm leading-relaxed mb-6 flex-1 whitespace-pre-wrap">
              {weaknessRecommendation}
            </div>

            <Link href="/tryouts" className="block w-full text-center px-4 py-3 bg-[#ff2a85]/10 border border-[#ff2a85]/50 text-[#ff2a85] font-bold rounded-lg hover:bg-[#ff2a85] hover:text-white transition-colors">
              Mulai Latihan {weakness !== 'Belum ada data' ? weakness : 'Sekarang'}
            </Link>
          </div>

        </div>

      </div>
    </main>
  );
}
