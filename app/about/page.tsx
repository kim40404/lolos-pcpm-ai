import Link from 'next/link';
import { Target, Users, Zap, Shield, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#010408] text-slate-300 font-sans selection:bg-blue-500/30">
      
      <main className="relative overflow-hidden pb-32">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none opacity-50"></div>
        <div className="absolute top-[40%] right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        {/* Hero Section */}
        <section className="relative z-10 pt-32 pb-20 px-6 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
            ✨ About Us
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 tracking-tight leading-tight mb-8">
            Merevolusi Cara Anda <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Mempersiapkan PCPM BI</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
            LolosPCPM lahir dari keresahan ribuan kandidat yang gagal menembus Bank Indonesia hanya karena kurang familiar dengan format tes yang presisi. Kami hadir untuk menutup celah tersebut.
          </p>
        </section>

        {/* Vision & Mission Cards */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <div className="bg-slate-900/50 backdrop-blur-md p-12 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[60px] group-hover:bg-blue-500/20 transition-all duration-700"></div>
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-8 border border-blue-500/30">
              <Target className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-6">Misi Kami</h3>
            <p className="text-lg text-slate-400 leading-relaxed">
              Memberikan simulasi tes yang 99% mendekati aslinya, lengkap dengan analisis AI yang membedah kelemahan Anda secara real-time. Kami percaya bahwa persiapan yang terukur adalah kunci utama kelulusan.
            </p>
          </div>
          
          <div className="bg-slate-900/50 backdrop-blur-md p-12 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-purple-500/10 rounded-full blur-[60px] group-hover:bg-purple-500/20 transition-all duration-700"></div>
            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-8 border border-purple-500/30">
              <Shield className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-6">Visi Kami</h3>
            <p className="text-lg text-slate-400 leading-relaxed">
              Menjadi platform pendidikan spesifik rekrutmen Bank Sentral nomor satu di Indonesia, mencetak bankir-bankir muda yang tidak hanya pintar secara akademis, tapi tangguh secara mental.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Mengapa LolosPCPM?</h2>
            <p className="text-xl text-slate-400">Keunggulan yang tidak akan Anda temukan di bimbingan belajar konvensional.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Teknologi AI Terkini", desc: "Dari pembuatan kombinasi soal tak terbatas hingga chatbot analitik, semuanya didukung oleh kecerdasan buatan." },
              { icon: Users, title: "Dirancang oleh Ahli", desc: "Silabus kami disusun berdasarkan data historis dan wawancara mendalam dengan alumni PCPM BI." },
              { icon: Target, title: "Akurasi 99%", desc: "Tingkat kesulitan, format soal, dan batasan waktu dibuat identik dengan ujian aslinya untuk melatih insting Anda." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 hover:border-slate-600 transition-colors">
                <feature.icon className="w-10 h-10 text-[#F4D160] mb-6" />
                <h4 className="text-xl font-bold text-white mb-4">{feature.title}</h4>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-[#081b33] to-[#030a14] border border-blue-900/30 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full"></div>
            <h2 className="text-4xl font-black text-white mb-6 relative z-10">Siap Mengukir Sejarah Bersama Kami?</h2>
            <p className="text-xl text-blue-200/70 mb-10 relative z-10">
              Jangan pertaruhkan masa depan Anda pada persiapan yang sekadarnya.
            </p>
            <Link 
              href="/register" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition-colors relative z-10 shadow-[0_0_30px_rgba(37,99,235,0.4)]"
            >
              Mulai Perjalanan Anda <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Legal Disclaimer */}
        <section className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-16">
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <h4 className="text-white font-bold text-lg mb-2 flex items-center justify-center gap-2">
              <span className="text-red-500">⚠️</span> Peringatan & Disclaimer Hukum
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              LolosPCPM adalah platform simulasi pelatihan independen dan <strong>TIDAK</strong> berafiliasi, didukung, atau bekerja sama dengan Bank Indonesia. Seluruh materi, soal, dan analisis merupakan hasil sintesis kecerdasan buatan (AI) yang ditujukan murni untuk keperluan latihan mandiri kandidat PCPM, bukan merupakan informasi/soal resmi dari pihak penyelenggara ujian. Kami tidak menjamin kelulusan pengguna.
            </p>
          </div>
        </section>
      </main>
      
      {/* Footer */}
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
    </div>
  );
}
