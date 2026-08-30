"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function KineticTypography() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const letterSpacing = useTransform(scrollYProgress, [0, 0.5, 1], ["-0.05em", "0.2em", "-0.05em"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.8, 1], [0, 1, 1, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section ref={containerRef} className="h-[150vh] bg-[#010408] relative border-b border-white/5">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-4">
        <motion.h2 
          style={{ letterSpacing, opacity, scale }}
          className="text-3xl md:text-6xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 uppercase max-w-5xl leading-tight"
        >
          Metode belajar konvensional tidak cukup untuk PCPM BI
        </motion.h2>
      </div>
    </section>
  );
}
