"use client";

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ArrowLeft, Play, Clock, CheckCircle2 } from 'lucide-react';

export default function TryoutsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/pricing');
    }
  }, [status, router]);

  if (status === 'loading') return <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">Loading...</div>;
  if (status === 'unauthenticated') return null;

  const tryouts = [
    {
      id: "TPD_8",
      title: "Tryout TPD PCPM BI - Paket 8",
      description: "Latihan intensif mencakup Verbal, Numerikal, Digit Simbol, dan Diagram.",
      time: "90 Menit",
      questions: 93,
      href: "/tryouts/Latihan_PCPM41_TPD_8.html",
      difficulty: "Hard"
    },
    {
      id: "TPD_9",
      title: "Tryout TPD PCPM BI - Paket 9",
      description: "Format asli PCPM BI dengan fokus pada kecepatan dan ketepatan numerikal.",
      time: "90 Menit",
      questions: 93,
      href: "/tryouts/Latihan_PCPM41_TPD_9.html",
      difficulty: "Hard"
    },
    {
      id: "TPD_10",
      title: "Tryout TPD PCPM BI - Paket 10",
      description: "Paket final untuk menguji ketahanan konsentrasi pada Digit Simbol.",
      time: "90 Menit",
      questions: 93,
      href: "/tryouts/Latihan_PCPM41_TPD_10.html",
      difficulty: "Hard"
    }
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 font-sans relative overflow-hidden">
      <img src="/bi-logo-white.png" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 opacity-[0.03] pointer-events-none" alt="" />
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              Daftar Tryout TPD
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Pilih paket latihan untuk simulasi tes yang sesungguhnya.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tryouts.map((t) => (
            <div key={t.id} className="bg-[#111] border border-[#222] rounded-2xl p-6 flex flex-col hover:border-[#00e5ff]/50 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <div className="px-3 py-1 bg-red-900/30 text-red-400 text-xs font-bold rounded-full border border-red-900/50">
                  {t.difficulty}
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <Clock className="w-4 h-4" />
                  {t.time}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{t.title}</h3>
              <p className="text-gray-400 text-sm mb-6 flex-1">
                {t.description}
              </p>
              
              <div className="flex items-center gap-4 mb-6 text-sm text-gray-300">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>{t.questions} Soal</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Real-time Scoring</span>
                </div>
              </div>

              <Link 
                href={t.href}
                className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-[#00e5ff] text-white hover:text-black rounded-xl font-bold transition-all group-hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]"
              >
                <Play className="w-4 h-4" /> Mulai Kerjakan
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
