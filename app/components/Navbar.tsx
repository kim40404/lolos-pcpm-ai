"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { LogOut, Star, Menu, X, Flame } from 'lucide-react';
import QuotaDisplay from './QuotaDisplay';
import { motion } from 'framer-motion';

const MotionLink = motion.create(Link);

function MagneticLink({ children, href, className, onClick }: any) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <MotionLink
      href={href}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </MotionLink>
  );
}

export default function Navbar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0A192F]/90 backdrop-blur-md transition-all py-2">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 flex items-center justify-between relative">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
          <img 
            src="/bi-logo.svg" 
            alt="Bank Indonesia Logo" 
            className="h-9 md:h-12 w-auto object-contain bg-white rounded-full p-1 md:p-1.5 border border-white/20 transition-transform duration-500 group-hover:scale-110"
          />
          <div className="font-extrabold text-base md:text-xl tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-300">
            Lolos<span className="text-[#F4D160]">PCPM</span>
          </div>
        </Link>

        {/* Navigation Links - Desktop */}
        <nav className="hidden xl:flex absolute left-1/2 -translate-x-1/2 flex-nowrap items-center justify-center gap-3 font-semibold text-[13px] w-auto">
          <MagneticLink href="/tryouts" className="relative group text-white font-black transition-all border-2 border-yellow-400 bg-gradient-to-r from-orange-600/40 to-yellow-500/40 rounded-full px-5 py-2 hover:from-orange-500/60 hover:to-yellow-400/60 whitespace-nowrap flex items-center gap-2 overflow-hidden hover:scale-105 animate-fire-glow">
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-300/0 via-yellow-200/40 to-yellow-300/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
            <Flame className="w-5 h-5 text-yellow-300 fill-orange-500 animate-fire-flicker" />
            <span className="bg-gradient-to-r from-yellow-200 to-orange-400 bg-clip-text text-transparent drop-shadow-md">Tryout PCPM</span>
          </MagneticLink>
          <MagneticLink href="/dynamic-drill" className="text-slate-300 hover:text-white transition-colors border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 hover:border-white/20 whitespace-nowrap">
            AI Dynamic Drill
          </MagneticLink>
          <MagneticLink href="/interview" className="text-slate-300 hover:text-white transition-colors border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 hover:border-white/20 whitespace-nowrap">
            AI Chatbot
          </MagneticLink>
          <MagneticLink href="/policy-simulator" className="text-slate-300 hover:text-white transition-colors border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 hover:border-white/20 whitespace-nowrap">
            AI BI Case Simulator
          </MagneticLink>
          <MagneticLink href="/guide" className="text-slate-300 hover:text-white transition-colors border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 hover:border-white/20 whitespace-nowrap">
            Strategi TPD
          </MagneticLink>
        </nav>

        {/* User Auth Section & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {session ? (
            <div className="flex items-center gap-2 md:gap-3">
              
              {/* Premium & Token in one border */}
              <Link href="/pricing" className="flex items-center gap-1.5 md:gap-3 border border-[#F4D160]/30 rounded-full py-1.5 px-3 md:px-4 bg-[#F4D160]/10 hover:bg-[#F4D160]/20 transition-colors group cursor-pointer relative overflow-hidden">
                <span className="hidden sm:flex text-[#F4D160] font-bold text-[13px] items-center gap-1 relative z-10">
                  <Star className="w-3.5 h-3.5 fill-current" /> Premium
                </span>
                <div className="hidden sm:block w-[1px] h-4 bg-[#F4D160]/30 relative z-10"></div>
                <div className="scale-90 md:scale-100 origin-right relative z-10">
                  <QuotaDisplay />
                </div>
              </Link>

              {/* User info stacked vertically */}
              <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-xl py-1 px-2 md:px-3 hover:bg-white/10 transition-colors">
                <span className="text-[10px] md:text-[11px] font-medium text-slate-300 hidden sm:block">
                  Hi, <span className="text-white font-bold">{session.user?.name?.split(' ')[0]}</span>
                </span>
                <button 
                  onClick={() => signOut()} 
                  className="text-red-400 hover:text-red-300 flex items-center gap-1 text-[10px] font-semibold transition-colors mt-0.5"
                  title="Logout"
                >
                  <LogOut className="w-3 h-3" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>

            </div>
          ) : (
            <Link 
              href="/login" 
              className="group relative px-5 py-2 md:px-6 md:py-2.5 rounded-full bg-white text-slate-900 font-bold text-[12px] md:text-sm shadow-lg overflow-hidden flex items-center justify-center transition-colors hover:text-white"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0 rounded-full"></span>
              <span className="relative z-10">Masuk / Daftar</span>
            </Link>
          )}

          {/* Hamburger Menu Toggle (Visible on smaller than xl) */}
          <button 
            className="xl:hidden p-1 md:p-2 text-white hover:bg-white/10 rounded-lg transition-colors ml-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="xl:hidden absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-xl border-b border-white/10 py-5 px-6 flex flex-col gap-4 font-semibold text-sm shadow-2xl z-50"
        >
          <Link href="/tryouts" onClick={() => setIsMobileMenuOpen(false)} className="text-yellow-400 hover:text-yellow-300 transition-colors flex items-center justify-between pb-3 font-black bg-orange-900/20 px-4 py-2.5 rounded-lg border-2 border-orange-500/40 animate-fire-glow">
            <span className="flex items-center gap-2"><Flame className="w-5 h-5 text-yellow-400 fill-orange-500 animate-fire-flicker" /> Tryout PCPM</span> <span className="text-xs opacity-50">→</span>
          </Link>
          <Link href="/dynamic-drill" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white transition-colors flex items-center justify-between border-b border-white/5 pb-3">
            AI Dynamic Drill <span className="text-xs opacity-50">→</span>
          </Link>
          <Link href="/interview" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white transition-colors flex items-center justify-between border-b border-white/5 pb-3">
            AI Chatbot <span className="text-xs opacity-50">→</span>
          </Link>
          <Link href="/policy-simulator" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white transition-colors flex items-center justify-between border-b border-white/5 pb-3">
            AI BI Case Simulator <span className="text-xs opacity-50">→</span>
          </Link>
          <Link href="/guide" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white transition-colors flex items-center justify-between">
            Strategi TPD <span className="text-xs opacity-50">→</span>
          </Link>
        </motion.div>
      )}
    </header>
  );
}
