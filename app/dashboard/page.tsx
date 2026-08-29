"use client";

import Link from 'next/link';

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 font-sans">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src="/bi-logo-white.png" alt="Bank Indonesia" className="h-8 w-auto" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              Halo, Calon PCPM BI! 👋
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Pantau kesiapan dan perkembangan belajarmu di sini.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/dynamic-drill" className="px-5 py-2.5 bg-[#00e5ff] text-black font-bold rounded-lg hover:bg-[#00c4cc] transition-colors shadow-[0_0_15px_rgba(0,229,255,0.3)]">
              Lanjut Latihan
            </Link>
            <Link href="/ai-coach" className="px-5 py-2.5 border border-gray-700 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
              Tanya AI Coach
            </Link>
          </div>
        </div>

        {/* Top KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-[#111111] border border-[#222] rounded-xl p-5 relative overflow-hidden group hover:border-[#00e5ff]/50 transition-colors">
            <div className="text-xs text-gray-500 font-semibold tracking-wider mb-2">STATUS KESIAPAN</div>
            <div className="text-3xl font-bold text-[#00e5ff]">78%</div>
            <div className="text-xs text-[#00e5ff] mt-2 bg-[#00e5ff]/10 inline-block px-2 py-1 rounded">Siap Ujian</div>
          </div>

          <div className="bg-[#111111] border border-[#222] rounded-xl p-5 relative overflow-hidden group hover:border-[#a3e635]/50 transition-colors">
            <div className="text-xs text-gray-500 font-semibold tracking-wider mb-2">AKURASI RATA-RATA</div>
            <div className="text-3xl font-bold text-[#a3e635]">65%</div>
            <div className="text-xs text-gray-400 mt-2">Dari target 80%</div>
          </div>

          <div className="bg-[#111111] border border-[#222] rounded-xl p-5 relative overflow-hidden group hover:border-[#c084fc]/50 transition-colors">
            <div className="text-xs text-gray-500 font-semibold tracking-wider mb-2">KECEPATAN (PACE)</div>
            <div className="text-3xl font-bold text-[#c084fc]">42s</div>
            <div className="text-xs text-gray-400 mt-2">Per soal</div>
          </div>

          <div className="bg-[#111111] border border-[#222] rounded-xl p-5 relative overflow-hidden group hover:border-[#facc15]/50 transition-colors">
            <div className="text-xs text-gray-500 font-semibold tracking-wider mb-2">SOAL DIKERJAKAN</div>
            <div className="text-3xl font-bold text-[#facc15]">1.240</div>
            <div className="text-xs text-gray-400 mt-2">Dalam 7 hari terakhir</div>
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
                  <span className="text-sm text-gray-300">🧮 Kemampuan Numerikal</span>
                  <span className="text-sm font-bold text-[#a3e635]">85%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-[#a3e635] h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">📖 Kemampuan Verbal</span>
                  <span className="text-sm font-bold text-[#00e5ff]">70%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-[#00e5ff] h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">🧩 Kemampuan Spasial (Visual)</span>
                  <span className="text-sm font-bold text-[#ff2a85]">40%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-[#ff2a85] h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">🏦 Kebanksentralan</span>
                  <span className="text-sm font-bold text-[#c084fc]">60%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-[#c084fc] h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>

            </div>
          </div>

          {/* AI Insights (Col-Span-1) */}
          <div className="bg-gradient-to-br from-[#111111] to-[#1a1a1a] border border-[#ff2a85]/30 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff2a85] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🤖</span>
              <h2 className="text-sm font-bold text-[#ff2a85] tracking-wider">AI INSIGHTS & REKOMENDASI</h2>
            </div>
            
            <div className="text-gray-300 text-sm leading-relaxed mb-6">
              Berdasarkan latihan 7 hari terakhir, kecepatan Anda sudah di atas rata-rata peserta lain. Namun, akurasi pada topik <strong>Kemampuan Spasial</strong> masih menjadi kelemahan utama (40%).
              <br/><br/>
              Kami merekomendasikan Anda untuk fokus berlatih rotasi jaring-jaring 3D dan deret gambar hari ini.
            </div>

            <Link href="/dynamic-drill" className="block w-full text-center px-4 py-3 bg-[#ff2a85]/10 border border-[#ff2a85]/50 text-[#ff2a85] font-bold rounded-lg hover:bg-[#ff2a85] hover:text-white transition-colors">
              Mulai Latihan Spasial
            </Link>
          </div>

        </div>

      </div>
    </main>
  );
}
