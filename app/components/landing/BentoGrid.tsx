"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Zap, MessageSquare, Activity, Lock } from "lucide-react";
import React from "react";

function TiltCard({ children, className, glowColor }: { children: React.ReactNode, className?: string, glowColor?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ perspective: 1000 }}
      className="w-full h-full"
    >
        <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative w-full h-full rounded-[2rem] p-8 md:p-10 flex flex-col justify-between overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 group ${className}`}
        >
        {glowColor && (
            <div className={`absolute -right-20 -bottom-20 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none ${glowColor}`}></div>
        )}
        <div style={{ transform: "translateZ(40px)" }} className="relative z-10 h-full flex flex-col pointer-events-none">
            {children}
        </div>
        </motion.div>
    </motion.div>
  );
}

export default function BentoGrid() {
  return (
    <section className="py-32 px-6 bg-[#010408] border-t border-white/5 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
            <Zap className="w-4 h-4 fill-current" /> Senjata Rahasia
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            Tiga Senjata Rahasia <br className="hidden md:block" />Penakluk Bank Indonesia
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Rasakan simulasi paling akurat dengan 3 fitur AI andalan kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">
          {/* Feature 1 - Speed Drill (Large) */}
          <div className="md:col-span-2 md:row-span-2">
            <TiltCard glowColor="bg-blue-500" className="bg-gradient-to-br from-[#081b33] to-[#030a14] border-blue-900/30">
                <div className="flex-1">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md mb-8 border border-white/20 shadow-inner">
                        <Zap className="w-8 h-8 text-[#F4D160]" />
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">AI Speed Drill<br/>Infinite</h3>
                    <p className="text-slate-300 max-w-lg text-lg leading-relaxed font-medium">
                        Sistem tidak memiliki bank soal statis. AI kami menghasilkan triliunan kombinasi soal secara realtime. Tidak akan pernah ada soal yang sama, melatih insting kecepatanmu ke tingkat maksimal.
                    </p>
                </div>
            </TiltCard>
          </div>

          {/* Feature 2 - AI Chatbot */}
          <TiltCard glowColor="bg-purple-500">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 border border-purple-500/30">
                <MessageSquare className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">AI Chatbot Evaluasi</h3>
            <p className="text-slate-400 font-medium leading-relaxed">Asisten cerdas yang menganalisis pola kelemahanmu dan membantu mengevaluasi secara otomatis.</p>
          </TiltCard>

          {/* Feature 3 - BI Case Simulator */}
          <TiltCard glowColor="bg-emerald-500">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6 border border-emerald-500/30">
                <Activity className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">BI Case Simulator</h3>
            <p className="text-slate-400 font-medium leading-relaxed">Uji pemahamanmu dengan studi kasus Bank Sentral sesungguhnya lewat simulator interaktif kami.</p>
          </TiltCard>
        </div>

        {/* Feature 4 - BLURRED TEASER (GIANT EXCLUSIVE BLOCK) */}
        <div className="mt-6 rounded-[3rem] bg-[#0A111F] p-12 md:p-20 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl border border-slate-800 text-center min-h-[400px]">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
              <div className="w-full h-full filter blur-[20px] flex justify-around items-center" style={{ backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(255,255,255,0.05) 2px, transparent 0)', backgroundSize: '40px 40px' }}>
                <div className="w-64 h-64 bg-purple-500/20 rounded-full blur-[60px] animate-pulse"></div>
                <div className="w-80 h-80 bg-blue-500/20 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
          </div>

          <div className="z-10 bg-slate-900/60 backdrop-blur-xl px-12 py-14 rounded-[2.5rem] border border-slate-700/50 flex flex-col items-center justify-center max-w-4xl mx-auto shadow-2xl">
            <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center mb-8 shadow-inner relative">
              <div className="absolute inset-0 rounded-full border border-blue-400/30 animate-ping"></div>
              <Lock className="w-12 h-12 text-slate-300" />
            </div>
            
            <h3 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 mb-6 tracking-tight leading-tight">
              Akses AI Canggih <br className="hidden md:block" />Segera Hadir
            </h3>
            
            <p className="text-slate-300 text-xl font-medium max-w-2xl leading-relaxed">
              Kami sedang menyiapkan ekosistem AI generasi berikutnya. Fitur revolusioner lainnya akan terbuka penuh saat peluncuran resmi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
