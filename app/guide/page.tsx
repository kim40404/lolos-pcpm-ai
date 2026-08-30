"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function GuidePage() {
  const [activeTab, setActiveTab] = useState('verbal');

  return (
    <main className="container" style={{ padding: 'var(--sp-2xl) 0', minHeight: 'calc(100vh - 72px)' }}>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-gradient">Panduan Strategi TPD</h1>
          <p style={{ color: 'var(--c-slate-800)', opacity: 0.8 }}>Cheat sheet dan rahasia menaklukkan PCPM BI 41.</p>
        </div>
        <Link href="/dashboard" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
          Kembali ke Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 md:gap-8 items-start">
        
        {/* Sidebar Nav */}
        <div className="glass-card" style={{ padding: 'var(--sp-md)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            onClick={() => setActiveTab('verbal')}
            className={`btn ${activeTab === 'verbal' ? 'btn-primary' : 'btn-outline'}`}
            style={{ width: '100%', justifyContent: 'flex-start', border: activeTab === 'verbal' ? 'none' : '1px solid transparent', background: activeTab !== 'verbal' ? 'transparent' : '' }}
          >
            📖 Strategi Verbal
          </button>
          <button 
            className="btn btn-outline"
            style={{ width: '100%', justifyContent: 'flex-start', border: '1px solid transparent', background: 'transparent', position: 'relative', overflow: 'hidden', cursor: 'not-allowed' }}
            disabled
          >
            <span style={{ filter: 'blur(4px)', opacity: 0.6, userSelect: 'none' }}>🔢 Strategi Numerikal</span>
            <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--c-slate-500)' }}>
              🔒 Terkunci
            </span>
          </button>
          <button 
            className="btn btn-outline"
            style={{ width: '100%', justifyContent: 'flex-start', border: '1px solid transparent', background: 'transparent', position: 'relative', overflow: 'hidden', cursor: 'not-allowed' }}
            disabled
          >
            <span style={{ filter: 'blur(4px)', opacity: 0.6, userSelect: 'none' }}>🔣 Strategi Digit Simbol</span>
            <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--c-slate-500)' }}>
              🔒 Terkunci
            </span>
          </button>
          <button 
            className="btn btn-outline"
            style={{ width: '100%', justifyContent: 'flex-start', border: '1px solid transparent', background: 'transparent', position: 'relative', overflow: 'hidden', cursor: 'not-allowed' }}
            disabled
          >
            <span style={{ filter: 'blur(4px)', opacity: 0.6, userSelect: 'none' }}>🔷 Strategi Diagram</span>
            <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--c-slate-500)' }}>
              🔒 Terkunci
            </span>
          </button>
        </div>

        {/* Content Area */}
        <div className="glass-card animate-fade-in" style={{ padding: 'var(--sp-2xl)' }}>
          
          {activeTab === 'verbal' && (
            <div className="prose" style={{ position: 'relative' }}>
              <h2 style={{ marginBottom: 'var(--sp-md)' }}>📖 Cheat Sheet: Tes Verbal PCPM BI 41</h2>
              <p style={{ marginBottom: 'var(--sp-lg)', fontSize: '1.125rem', opacity: 0.8, borderLeft: '4px solid var(--c-gold-500)', paddingLeft: '16px' }}>
                Tes Verbal dirancang <strong>BUKAN</strong> untuk menguji seberapa cepat Anda membaca, melainkan seberapa akurat Anda menarik kesimpulan murni dari data tertulis tanpa membawa asumsi atau pengetahuan dari luar.
              </p>

              <h3 style={{ marginTop: 'var(--sp-xl)', marginBottom: 'var(--sp-sm)', color: 'var(--c-navy-800)' }}>1. Aturan Emas (The Golden Rule)</h3>
              <div style={{ background: 'var(--c-slate-100)', padding: 'var(--sp-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--sp-lg)' }}>
                <strong>"Apa yang tidak tertulis di teks, berarti tidak ada."</strong><br/>
                Jangan pernah menggunakan pengetahuan umum Anda. Jika teks mengatakan "Langit berwarna hijau", maka untuk keperluan menjawab soal, langit adalah hijau.
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{ opacity: 0.3, filter: 'blur(5px)', userSelect: 'none', pointerEvents: 'none' }}>
                  <h3 style={{ marginTop: 'var(--sp-xl)', marginBottom: 'var(--sp-sm)', color: 'var(--c-navy-800)' }}>2. Pahami 3 Opsi Jawaban dengan Tepat</h3>
                  
                  <div style={{ marginBottom: 'var(--sp-md)' }}>
                    <h4 style={{ color: 'var(--c-success)' }}>🟢 A. BENAR (True)</h4>
                    <p style={{ opacity: 0.8 }}>Pernyataan secara logis mengikuti informasi atau merupakan ringkasan akurat dari bagian teks.</p>
                  </div>

                  <div style={{ marginBottom: 'var(--sp-md)' }}>
                    <h4 style={{ color: 'var(--c-danger)' }}>🔴 B. SALAH (False)</h4>
                    <p style={{ opacity: 0.8 }}>Pernyataan secara mutlak bertentangan atau menyangkal informasi yang ada di dalam teks.</p>
                  </div>
                  
                  <div style={{ marginBottom: 'var(--sp-md)' }}>
                    <h4 style={{ color: 'var(--c-warning)' }}>🟡 C. TIDAK DAPAT DITENTUKAN</h4>
                    <p style={{ opacity: 0.8 }}>Tidak ada informasi yang cukup di dalam teks untuk memastikan secara pasti.</p>
                  </div>

                  <h3 style={{ marginTop: 'var(--sp-xl)', marginBottom: 'var(--sp-sm)', color: 'var(--c-navy-800)' }}>3. Jebakan Umum (Common Traps)</h3>
                  <ul style={{ paddingLeft: '20px', opacity: 0.8, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li><strong>Kata Kuantitas Absolut:</strong> Waspadai perubahan dari kata "Banyak" di teks, menjadi kata "Semua/Seluruh" di pernyataan soal.</li>
                    <li><strong>Sebab-Akibat Buatan:</strong> Teks menyebutkan dua kejadian terjadi bersamaan, tapi soal menyebutkan kejadian A menyebabkan B. (Jawaban: Tidak Dapat Ditentukan).</li>
                    <li><strong>Melompat ke Kesimpulan:</strong> "Menargetkan produksi" (di teks) tidak sama dengan "Akan memproduksi" (di soal). Target bisa meleset.</li>
                  </ul>
                </div>
                
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, white 40%)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                  <div style={{ textAlign: 'center', background: 'white', padding: '24px', borderRadius: '16px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--c-slate-200)', maxWidth: '80%', transform: 'translateY(50px)' }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔒</div>
                    <h4 style={{ color: 'var(--c-navy-900)', marginBottom: '8px' }}>Buka Akses Penuh Segera Hadir</h4>
                    <p style={{ fontSize: '0.875rem', opacity: 0.8, margin: 0 }}>Panduan strategi terlengkap untuk Verbal, Numerikal, dan Logika akan tersedia di versi rilis berikutnya.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'verbal' && (
            <div className="flex-center animate-fade-in" style={{ flexDirection: 'column', minHeight: '400px', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: 'var(--sp-md)' }}>🔒</div>
              <h2 style={{ marginBottom: 'var(--sp-sm)' }}>Konten Premium</h2>
              <p style={{ opacity: 0.8, maxWidth: '400px', marginBottom: 'var(--sp-xl)' }}>
                Strategi komprehensif untuk {activeTab} hanya tersedia untuk pengguna Premium. Buka kunci sekarang untuk mempelajari polanya!
              </p>
              <Link href="/pricing" className="btn btn-gold" style={{ padding: '0.75rem 2rem' }}>
                Upgrade ke Premium
              </Link>
            </div>
          )}

        </div>
      </div>

      <style jsx>{`
        .prose h3 { font-size: 1.25rem; }
        .prose h4 { font-size: 1.1rem; margin-bottom: 4px; }
        .prose p { margin-bottom: 8px; line-height: 1.7; }
        .prose li { margin-bottom: 4px; line-height: 1.6; }
      `}</style>
    </main>
  );
}
