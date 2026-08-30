"use client";

import { motion } from "framer-motion";

const steps = [
  { step: 1, title: "Diagnostic Test", desc: "Mulai dengan tes awal (Drill) untuk mengukur kecepatan dan ketepatan Anda saat ini." },
  { step: 2, title: "Evaluasi AI Chatbot", desc: "Dapatkan analisis tajam dari AI Chatbot tentang kelemahan di topik spesifik." },
  { step: 3, title: "Pelajari Strategi", desc: "Baca panduan khusus dan pahami rumus rahasia menyelesaikan soal jebakan." },
  { step: 4, title: "Simulasi Kasus", desc: "Uji insting Anda menyelesaikan skenario Bank Sentral via BI Case Simulator." }
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5 relative z-10">
      <div className="text-center mb-20 relative">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Bagaimana Platform Ini Bekerja?
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
          Alur latihan sistematis yang terbukti secara data untuk mengoptimalkan persiapan PCPM Anda dari nol hingga siap tes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
        <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-1 bg-slate-800/50 z-0"></div>
        
        {steps.map((item, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            key={idx} 
            className="relative z-10 flex flex-col items-center text-center group"
          >
            <div className="w-24 h-24 rounded-full bg-slate-900 border-4 border-[#010408] shadow-2xl flex items-center justify-center mb-6 relative group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-500">
              <div className="absolute inset-0 rounded-full border border-blue-500/20 group-hover:border-blue-400 transition-colors"></div>
              <span className="text-3xl font-black text-blue-400 group-hover:text-white transition-colors">{item.step}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{item.title}</h3>
            <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
