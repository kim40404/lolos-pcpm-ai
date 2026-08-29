import Link from 'next/link'
import { HeroSection } from "@/components/blocks/hero-with-mockup"
import { ShieldCheck, Zap, BrainCircuit, BarChart3, ChevronRight, Mic, LayoutDashboard, Target } from "lucide-react"

export default function Home() {
  return (
    <main className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen font-sans">
      
      {/* 21st.dev UI UX Pro Max Hero Section */}
      <HeroSection
        title="Tembus TPD PCPM BI dengan Data & Kecepatan"
        description="Latih kecepatanmu dengan Speed Drill, kenali kelemahan dengan AI Coach, dan hadapi wawancara dengan percaya diri. Sistem cerdas yang mengasah insting dan logikamu."
        primaryCta={{
          text: "Mulai Latihan Gratis",
          href: "/dynamic-drill",
        }}
        secondaryCta={{
          text: "Masuk Dashboard",
          href: "/dashboard",
        }}
      />

      {/* Bento Grid Features Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Bukan Sekadar Bank Soal
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Platform pertama di Indonesia yang menggunakan AI generatif untuk merancang pola tes Bank Indonesia dan mengidentifikasi metrik kemampuanmu secara presisi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {/* Feature 1 - Large */}
          <div className="md:col-span-2 md:row-span-2 rounded-[2rem] bg-gradient-to-br from-[#0A2647] to-[#144272] p-10 flex flex-col justify-between relative overflow-hidden group shadow-xl">
            <div className="z-10 relative">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md mb-8 border border-white/20">
                <Zap className="w-8 h-8 text-[#F4D160]" />
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">Speed Drill Infinite</h3>
              <p className="text-blue-100/80 max-w-lg text-lg leading-relaxed font-medium">
                Sistem tidak memiliki bank soal statis. AI kami menghasilkan triliunan kombinasi soal logika, numerikal, dan kebanksentralan secara realtime. Tidak akan pernah ada soal yang sama.
              </p>
            </div>
            
            {/* Decorative element */}
            <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full group-hover:bg-blue-400/30 transition-all duration-700 pointer-events-none"></div>
          </div>

          {/* Feature 2 */}
          <div className="rounded-[2rem] bg-white dark:bg-slate-900 p-8 flex flex-col justify-between border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-6">
                <BrainCircuit className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">AI Personal Coach</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Analisis kelemahan otomatis dan berikan umpan balik terpersonalisasi.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="rounded-[2rem] bg-white dark:bg-slate-900 p-8 flex flex-col justify-between border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Hacker-Style Analytics</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Lihat grafik performamu layaknya dashboard intelijen profesional.</p>
            </div>
          </div>
          
          {/* Feature 4 */}
          <div className="md:col-span-3 rounded-[2rem] bg-[#0F172A] p-10 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl border border-slate-800">
            <div className="z-10 md:w-3/5 text-center md:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-500/10 mb-6 border border-green-500/20">
                <Mic className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-3xl font-extrabold text-white mb-4">Simulasi Wawancara Multi-Agen</h3>
              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-2xl">
                Fitur eksklusif Simulasi LGD/FGD dengan AI suara. Berargumen dengan 4 kandidat AI lainnya dalam satu meja bundar virtual secara real-time.
              </p>
            </div>
            <div className="z-10 mt-8 md:mt-0 w-full md:w-auto">
              <Link href="/fgd" className="flex items-center justify-center px-8 py-4 rounded-xl bg-white text-[#0F172A] font-bold text-lg hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Coba FGD Simulator <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
            
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
          </div>
        </div>
      </section>

      {/* Methodology Section (Replacing Fake Testimonials) */}
      <section className="py-24 bg-white dark:bg-[#0B1120] border-y border-slate-200 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
              Metodologi Latihan Berbasis Data
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">Sistem kami dirancang untuk memetakan dan meningkatkan kemampuan kognitif Anda secara terstruktur.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Evaluasi Real-Time", text: "Setiap jawaban yang Anda berikan pada Speed Drill akan langsung dikalkulasi untuk mengukur kecepatan rata-rata (medan) dan tingkat akurasi per kategori soal." },
              { title: "Simulasi Tekanan Tinggi", text: "Lingkungan FGD dan Wawancara kami menduplikasi batasan waktu dan tekanan kognitif yang sebenarnya terjadi pada seleksi tahap akhir." },
              { title: "Pemetaan Kelemahan", text: "Dashboard analitik akan secara otomatis mendeteksi topik mana (Verbal, Logika, atau Numerikal) yang paling sering membuat Anda membuang waktu." },
            ].map((t, i) => (
              <div key={i} className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm relative">
                <div className="text-4xl text-blue-200 dark:text-slate-800 absolute top-4 left-4 font-serif">#</div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-xl relative z-10">{t.title}</h4>
                <p className="text-slate-700 dark:text-slate-300 relative z-10 leading-relaxed font-medium">
                  {t.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Pertanyaan Populer
          </h2>
        </div>
        <div className="space-y-6">
          {[
            { q: "Apakah soal yang disediakan sesuai dengan TPD BI terbaru?", a: "Ya. AI kami dilatih khusus menggunakan silabus dan pola pertanyaan Tes Potensi Dasar PCPM Bank Indonesia, meliputi logika, numerikal, verbal, dan pengetahuan kebanksentralan." },
            { q: "Apakah ini aplikasi berlangganan?", a: "Kami menyediakan tier gratis untuk latihan dasar (Dynamic Drill). Namun untuk fitur premium seperti AI Voice Interview, Simulasi FGD, dan Dashboard Analitik Hacker-Style, Anda memerlukan paket berlangganan." },
            { q: "Bagaimana cara kerja AI FGD Simulator?", a: "Kami menggunakan Multi-Agent LLM. Saat Anda memasukkan argumen melalui mikrofon, 3 AI kandidat lainnya akan merespons, setuju, atau membantah argumen Anda secara real-time." }
          ].map((faq, i) => (
            <div key={i} className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-3 flex items-start gap-3">
                <span className="text-blue-500 text-2xl leading-none">•</span> {faq.q}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1120]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/bi-logo.svg" 
                alt="Bank Indonesia" 
                className="h-8 w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all bg-white rounded-full p-1"
              />
              <h3 className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
                Lolos<span className="text-[#F4D160]">PCPM</span><span className="text-blue-500">.ai</span>
              </h3>
            </div>
            <p className="text-sm text-slate-500 font-medium">© 2026 AI Assistant Systems. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-slate-500">
            <Link href="#" className="hover:text-blue-500 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</Link>
            <Link href="/pricing" className="hover:text-blue-500 transition-colors">Pricing</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
