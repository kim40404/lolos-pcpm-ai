"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection({ session }: { session: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax effect on mouse move for the badge
    const handleMouseMove = (e: MouseEvent) => {
      if (!badgeRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      gsap.to(badgeRef.current, {
        x: x,
        y: y,
        ease: "power2.out",
        duration: 1
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Staggered entry animation
    const tl = gsap.timeline();
    
    tl.fromTo(badgeRef.current, 
      { opacity: 0, scale: 0.8, y: 30 }, 
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.5)" }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(descRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#081b33] via-[#030a14] to-[#010408] pt-20"
    >
      {/* Decorative Floating Logos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <img src="/bi-icon-white.png" className="absolute top-20 left-[10%] w-24 opacity-[0.03] rotate-12 blur-[1px]" alt="" />
        <img src="/bi-icon-color.svg" className="absolute bottom-40 right-[15%] w-32 opacity-[0.05] -rotate-12 blur-[2px]" alt="" />
        <img src="/bi-logo-white.png" className="absolute top-40 right-[5%] w-48 opacity-[0.02] rotate-6" alt="" />
        <img src="/bi-icon-black.png" className="absolute bottom-20 left-[5%] w-32 opacity-[0.04] rotate-45 invert" alt="" />
      </div>

      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Parallax Badge & Logo */}
        <div 
          ref={badgeRef}
          className="flex flex-col items-center gap-6 mb-8"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full group-hover:bg-blue-400/40 transition-all duration-700"></div>
            <img 
              src="/bi-logo.svg" 
              alt="Bank Indonesia" 
              className="relative z-10 h-32 md:h-40 w-auto object-contain bg-white rounded-[2rem] p-5 shadow-[0_0_40px_rgba(255,255,255,0.3)] border-2 border-white/40" 
            />
          </div>
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-orange-700/30 via-yellow-600/20 to-orange-700/30 border-2 border-orange-500/50 backdrop-blur-md animate-notice-bg">
            <span className="font-extrabold text-base md:text-lg tracking-tight text-white flex items-center gap-2">
              🔥 <span className="text-orange-400">PENGUMUMAN PENTING:</span> Ujian TPD Sudah Sangat Dekat! 
            </span>
            <span className="hidden sm:block text-orange-500/50">•</span>
            <span className="font-bold text-orange-200 text-sm md:text-base">Mulai Latihan Ekstra Sekarang!</span>
          </div>
        </div>

        {/* Typography */}
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-slate-300 tracking-tight leading-[1.1] mb-8 max-w-5xl"
        >
          Persiapan Seleksi PCPM BI Paling Komprehensif
        </h1>
        
        <p 
          ref={descRef}
          className="text-lg md:text-xl text-slate-400 font-medium max-w-3xl mb-12 leading-relaxed"
        >
          Platform all-in-one yang membantumu lulus PCPM BI. Dilengkapi dengan simulasi AI Dynamic Drill, Tryouts, AI Chatbot, dan BI Case Simulator berteknologi tinggi, serta fitur AI eksklusif lainnya.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <Link 
            href={session ? "/dynamic-drill" : "/login"}
            className="group relative px-8 py-4 rounded-full bg-white text-[#0A192F] font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] overflow-hidden flex items-center justify-center transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] w-full sm:w-auto"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0 rounded-full"></span>
            <span className="relative z-10 group-hover:text-white transition-colors flex items-center gap-2">
              Mulai Latihan Gratis <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          
          <Link 
            href={session ? "/dashboard" : "/login"}
            className="px-8 py-4 rounded-full bg-white/5 border border-white/20 text-white font-bold text-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-md w-full sm:w-auto"
          >
            Masuk Dashboard
          </Link>
        </div>

      </div>
    </section>
  );
}
