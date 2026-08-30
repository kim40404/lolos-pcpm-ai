import Link from 'next/link'
import { MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import HeroSection from './components/landing/HeroSection'
import HowItWorks from './components/landing/HowItWorks'
import BentoGrid from './components/landing/BentoGrid'
import FeedbackForm from './components/landing/FeedbackForm'
import FloatingDisclaimer from './components/landing/FloatingDisclaimer'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main className="bg-[#010408] text-white min-h-screen font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* 1. Immersive GSAP Hero Section */}
      <HeroSection session={session} />

      {/* 2. Horizontal Step Slider (Replaced with Static Responsive Grid based on user feedback) */}
      <HowItWorks />

      {/* 3. Trust/Partner 3D Bento Grid */}
      <BentoGrid />

      {/* 5. Dashboard Analitik Insight */}
      <section className="py-32 bg-[#010408] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-6">
               Hacker-Style Dashboard
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
              Pantau Progres Anda Secara Presisi
            </h2>
            <p className="text-xl text-slate-400 font-medium leading-relaxed mb-8">
              Lupakan tryout tradisional. Dashboard analitik kami merekam setiap detik waktu respon dan pola jawaban Anda untuk memberikan evaluasi performa seperti dashboard intelijen sesungguhnya.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Pemetaan Kelemahan Otomatis",
                "Analisis Kecepatan Per Soal",
                "Grafik Peningkatan Harian"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-slate-300 font-medium text-lg">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/dashboard" className="inline-flex items-center font-bold text-blue-400 hover:text-blue-300 text-lg group">
              Lihat Contoh Dashboard <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <div className="w-full rounded-[2rem] border border-slate-800 bg-slate-900/50 p-8 shadow-2xl relative overflow-hidden group backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none"></div>
              
              <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4 relative z-10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm font-mono text-slate-400">Live Analytics // PCPM</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50">
                  <div className="text-sm text-slate-400 mb-2">Akurasi Verbal</div>
                  <div className="text-3xl font-black text-white">87%</div>
                  <div className="w-full bg-slate-900 h-2 mt-4 rounded-full overflow-hidden">
                    <div className="bg-blue-500 w-[87%] h-full"></div>
                  </div>
                </div>
                <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50">
                  <div className="text-sm text-slate-400 mb-2">Kecepatan (Pace)</div>
                  <div className="text-3xl font-black text-white">1.4s</div>
                  <div className="w-full bg-slate-900 h-2 mt-4 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 w-[70%] h-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 flex flex-col gap-4 relative z-10">
                <div className="h-4 w-3/4 bg-slate-700 rounded-full animate-pulse"></div>
                <div className="h-4 w-1/2 bg-slate-700 rounded-full animate-pulse"></div>
                <div className="h-4 w-5/6 bg-slate-700 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Feedback Section */}
      <section className="py-32 bg-[#010408] relative overflow-hidden border-t border-white/5">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="rounded-[3rem] bg-slate-900/40 p-10 md:p-16 relative overflow-hidden shadow-2xl text-center border border-slate-800 backdrop-blur-md">
            
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-8 border border-blue-500/30">
                <MessageSquare className="w-10 h-10 text-blue-400" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                Bagikan Pendapat Anda
              </h2>
              <p className="text-slate-400 text-lg md:text-xl mb-10 font-medium max-w-2xl mx-auto">
                Sebagai Beta Tester eksklusif, saran dan kesan Anda sangat berharga untuk menyempurnakan AI Engine ini sebelum rilis resmi ke publik.
              </p>
              
              <FeedbackForm />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Legal Disclaimer */}
      <section className="py-12 bg-[#010408] border-t border-slate-800 text-center px-6">
        <div className="max-w-5xl mx-auto bg-red-950/20 border border-red-900/30 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-orange-500"></div>
          <h4 className="text-white font-black text-2xl md:text-3xl mb-6 flex items-center justify-center gap-3 tracking-tight">
            <span className="text-red-500">⚠️</span> Pernyataan Independensi & Disclaimer Hukum
          </h4>
          <div className="space-y-4 text-slate-300 text-base md:text-lg leading-relaxed font-medium text-left md:text-center">
            <p>
              LolosPCPM adalah <strong>platform edukasi independen</strong> yang dibangun secara mandiri untuk membantu para kandidat mempersiapkan diri menghadapi seleksi kepegawaian. Platform ini <strong>SAMA SEKALI TIDAK berafiliasi, tidak disponsori, tidak didukung, dan tidak memiliki hubungan kerja sama dalam bentuk apa pun dengan Bank Indonesia (BI)</strong> maupun panitia seleksi resmi PCPM.
            </p>
            <p>
              Seluruh materi pelajaran, format soal, dan analisis kecerdasan buatan (AI) di dalam aplikasi ini disusun berdasarkan <strong>literatur publik, pengalaman umum, dan pedoman asesmen standar</strong>. Tidak ada satupun data rahasia atau soal bocoran asli yang digunakan. Ini murni merupakan alat bantu (simulator) pembelajaran, dan kami <strong>tidak menjamin kelulusan absolut</strong> bagi para penggunanya.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="py-12 border-t border-slate-800 bg-[#010408]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
              <img 
                src="/bi-logo.svg" 
                alt="Bank Indonesia" 
                className="h-8 w-auto object-contain bg-white rounded-full p-1"
              />
              <h3 className="font-extrabold text-2xl tracking-tight text-white">
                Lolos<span className="text-[#F4D160]">PCPM</span>
              </h3>
            </div>
            <p className="text-sm text-slate-500 font-medium">© 2026 AI Assistant Systems. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-slate-500">
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>
        </div>
      </footer>
      <FloatingDisclaimer />
    </main>
  )
}
