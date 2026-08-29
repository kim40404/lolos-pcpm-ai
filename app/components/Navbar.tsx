"use client";

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import QuotaDisplay from './QuotaDisplay';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0A192F]/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src="/bi-logo.svg" 
            alt="Bank Indonesia Logo" 
            className="h-10 w-auto object-contain bg-white rounded-full p-1 border border-white/20"
          />
          <div className="font-extrabold text-2xl tracking-tight text-white">
            Lolos<span className="text-[#F4D160]">PCPM</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-semibold text-sm">
          <Link href="/dynamic-drill" className="text-slate-300 hover:text-white transition-colors">
            Speed Drill
          </Link>
          <Link href="/interview" className="text-slate-300 hover:text-white transition-colors">
            AI Interview
          </Link>
          <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors">
            Dashboard Analitik
          </Link>
          <Link href="/guide" className="text-slate-300 hover:text-white transition-colors">
            Panduan PCPM
          </Link>
          <Link href="/pricing" className="text-[#F4D160] hover:text-[#fce484] transition-colors">
            Premium
          </Link>
        </nav>

        {/* User Auth Section */}
        <div className="flex items-center gap-2">
          {session ? (
            <div className="flex items-center gap-3">
              <QuotaDisplay />
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full py-1.5 px-4">
                <span className="text-sm font-medium text-slate-300 hidden sm:block">
                  Hi, <span className="text-white font-bold">{session.user?.name?.split(' ')[0]}</span>
                </span>
              <button 
                onClick={() => signOut()} 
                className="text-red-400 hover:text-red-300 flex items-center gap-2 text-sm font-semibold transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="px-6 py-2.5 rounded-full bg-white text-[#0A192F] font-bold text-sm hover:bg-slate-200 transition-colors shadow-lg"
            >
              Masuk / Daftar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
