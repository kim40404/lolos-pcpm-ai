"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function GuidePage() {
  const [activeTab, setActiveTab] = useState('verbal');

  return (
    <main className="container" style={{ padding: 'var(--sp-2xl) 0', minHeight: 'calc(100vh - 72px)' }}>
      
      <div className="flex-between" style={{ marginBottom: 'var(--sp-xl)' }}>
        <div>
          <h1 className="text-gradient">Panduan Strategi TPD</h1>
          <p style={{ color: 'var(--c-slate-800)', opacity: 0.8 }}>Cheat sheet dan rahasia menaklukkan PCPM BI 41.</p>
        </div>
        <Link href="/dashboard" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
          Kembali ke Dashboard
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: 'var(--sp-xl)', alignItems: 'start' }}>
        
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
            onClick={() => setActiveTab('numerikal')}
            className={`btn ${activeTab === 'numerikal' ? 'btn-primary' : 'btn-outline'}`}
            style={{ width: '100%', justifyContent: 'flex-start', border: activeTab === 'numerikal' ? 'none' : '1px solid transparent', background: activeTab !== 'numerikal' ? 'transparent' : '' }}
          >
            🔢 Strategi Numerikal
            <span style={{ fontSize: '0.6rem', background: 'var(--c-gold-500)', padding: '2px 6px', borderRadius: '4px', marginLeft: 'auto', color: 'var(--c-navy-900)' }}>PRO</span>
          </button>
          <button 
            onClick={() => setActiveTab('digitsimbol')}
            className={`btn ${activeTab === 'digitsimbol' ? 'btn-primary' : 'btn-outline'}`}
            style={{ width: '100%', justifyContent: 'flex-start', border: activeTab === 'digitsimbol' ? 'none' : '1px solid transparent', background: activeTab !== 'digitsimbol' ? 'transparent' : '' }}
          >
            🔣 Strategi Digit Simbol
            <span style={{ fontSize: '0.6rem', background: 'var(--c-gold-500)', padding: '2px 6px', borderRadius: '4px', marginLeft: 'auto', color: 'var(--c-navy-900)' }}>PRO</span>
          </button>
          <button 
            onClick={() => setActiveTab('diagram')}
            className={`btn ${activeTab === 'diagram' ? 'btn-primary' : 'btn-outline'}`}
            style={{ width: '100%', justifyContent: 'flex-start', border: activeTab === 'diagram' ? 'none' : '1px solid transparent', background: activeTab !== 'diagram' ? 'transparent' : '' }}
          >
            🔷 Strategi Diagram
            <span style={{ fontSize: '0.6rem', background: 'var(--c-gold-500)', padding: '2px 6px', borderRadius: '4px', marginLeft: 'auto', color: 'var(--c-navy-900)' }}>PRO</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="glass-card animate-fade-in" style={{ padding: 'var(--sp-2xl)' }}>
          
          {activeTab === 'verbal' && (
            <div className="prose">
              <h2 style={{ marginBottom: 'var(--sp-md)' }}>📖 Cheat Sheet: Tes Verbal PCPM BI 41</h2>
              <p style={{ marginBottom: 'var(--sp-lg)', fontSize: '1.125rem', opacity: 0.8, borderLeft: '4px solid var(--c-gold-500)', paddingLeft: '16px' }}>
                Tes Verbal dirancang <strong>BUKAN</strong> untuk menguji seberapa cepat Anda membaca, melainkan seberapa akurat Anda menarik kesimpulan murni dari data tertulis tanpa membawa asumsi atau pengetahuan dari luar.
              </p>

              <h3 style={{ marginTop: 'var(--sp-xl)', marginBottom: 'var(--sp-sm)', color: 'var(--c-navy-800)' }}>1. Aturan Emas (The Golden Rule)</h3>
              <div style={{ background: 'var(--c-slate-100)', padding: 'var(--sp-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--sp-lg)' }}>
                <strong>"Apa yang tidak tertulis di teks, berarti tidak ada."</strong><br/>
                Jangan pernah menggunakan pengetahuan umum Anda. Jika teks mengatakan "Langit berwarna hijau", maka untuk keperluan menjawab soal, langit adalah hijau.
              </div>

              <h3 style={{ marginTop: 'var(--sp-xl)', marginBottom: 'var(--sp-sm)', color: 'var(--c-navy-800)' }}>2. Pahami 3 Opsi Jawaban dengan Tepat</h3>
              
              <div style={{ marginBottom: 'var(--sp-md)' }}>
                <h4 style={{ color: 'var(--c-success)' }}>🟢 A. BENAR (True)</h4>
                <p style={{ opacity: 0.8 }}>Pernyataan secara logis mengikuti informasi atau merupakan ringkasan akurat dari bagian teks.</p>
                <ul style={{ paddingLeft: '20px', opacity: 0.8 }}>
                  <li><strong>Ciri-ciri:</strong> Menggunakan parafrase dari kalimat di dalam teks.</li>
                  <li><strong>Syarat Mutlak:</strong> Anda bisa menunjuk langsung dengan jari ke kalimat dalam teks yang membuktikan pernyataan tersebut 100% benar.</li>
                </ul>
              </div>

              <div style={{ marginBottom: 'var(--sp-md)' }}>
                <h4 style={{ color: 'var(--c-danger)' }}>🔴 B. SALAH (False)</h4>
                <p style={{ opacity: 0.8 }}>Pernyataan secara mutlak bertentangan atau menyangkal informasi yang ada di dalam teks.</p>
                <ul style={{ paddingLeft: '20px', opacity: 0.8 }}>
                  <li><strong>Ciri-ciri:</strong> Teks bilang X naik, pernyataan bilang X turun.</li>
                  <li><strong>Syarat Mutlak:</strong> Anda bisa menunjuk dengan jari ke kalimat dalam teks yang membuktikan bahwa pernyataan itu mustahil.</li>
                </ul>
              </div>

              <div style={{ marginBottom: 'var(--sp-md)' }}>
                <h4 style={{ color: 'var(--c-warning)' }}>🟡 C. TIDAK DAPAT DITENTUKAN (Cannot Say)</h4>
                <p style={{ opacity: 0.8 }}>Tidak ada informasi yang cukup di dalam teks untuk memastikan secara pasti.</p>
                <ul style={{ paddingLeft: '20px', opacity: 0.8 }}>
                  <li><strong>Ciri-ciri:</strong> Pernyataan tersebut bisa jadi benar di dunia nyata, tetapi teks tidak pernah membahasnya.</li>
                  <li><strong>Sering Muncul Sebagai:</strong> Asumsi, spekulasi masa depan, atau tebakan sebab-akibat.</li>
                </ul>
              </div>

              <h3 style={{ marginTop: 'var(--sp-xl)', marginBottom: 'var(--sp-sm)', color: 'var(--c-navy-800)' }}>3. Jebakan Umum (Common Traps)</h3>
              <ul style={{ paddingLeft: '20px', opacity: 0.8, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><strong>Kata Kuantitas Absolut:</strong> Waspadai perubahan dari kata "Banyak" di teks, menjadi kata "Semua/Seluruh" di pernyataan soal.</li>
                <li><strong>Sebab-Akibat Buatan:</strong> Teks menyebutkan dua kejadian terjadi bersamaan, tapi soal menyebutkan kejadian A menyebabkan B. (Jawaban: Tidak Dapat Ditentukan).</li>
                <li><strong>Melompat ke Kesimpulan:</strong> "Menargetkan produksi" (di teks) tidak sama dengan "Akan memproduksi" (di soal). Target bisa meleset.</li>
              </ul>
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
