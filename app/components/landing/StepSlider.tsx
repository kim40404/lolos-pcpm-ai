"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BrainCircuit, Target, MessageSquare, Briefcase } from "lucide-react";

const steps = [
  { id: 1, title: "Diagnostic Test", desc: "Mulai dengan tes awal untuk mengukur kecepatan dan ketepatan Anda.", icon: Target },
  { id: 2, title: "Evaluasi AI Chatbot", desc: "Dapatkan analisis tajam dari AI Chatbot tentang kelemahan di topik spesifik.", icon: MessageSquare },
  { id: 3, title: "Pelajari Strategi", desc: "Baca panduan khusus dan pahami rumus menyelesaikan soal jebakan.", icon: BrainCircuit },
  { id: 4, title: "Simulasi Kasus", desc: "Uji insting Anda menyelesaikan skenario Bank Sentral via BI Case Simulator.", icon: Briefcase },
];

export default function StepSlider() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-75%"]);

  return (
    <section ref={targetRef} className="h-[300vh] bg-[#010408] relative">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        <div className="px-6 md:px-[10vw] mb-12 relative z-10 w-full">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                Bagaimana Platform Ini Bekerja?
            </h2>
            <p className="text-slate-400 max-w-xl text-lg font-medium">
                Alur latihan sistematis yang terbukti secara data untuk mengoptimalkan persiapan PCPM Anda dari nol hingga siap tes.
            </p>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-6 md:px-[10vw] items-center">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="w-[85vw] md:w-[450px] h-[350px] bg-slate-900/50 border border-slate-700/50 backdrop-blur-xl rounded-[2rem] p-10 flex flex-col justify-center shrink-0 hover:border-blue-500/50 transition-all duration-500 group relative overflow-hidden shadow-2xl">
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-600/20 rounded-full blur-[60px] group-hover:bg-blue-500/40 transition-all duration-700"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/10 transition-transform">
                      <Icon className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    </div>
                    <span className="text-5xl font-black text-slate-800/50">0{step.id}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{step.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
