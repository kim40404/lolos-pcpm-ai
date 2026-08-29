import Link from 'next/link';

export default function PricingPage() {
  return (
    <main style={{ padding: 'var(--sp-3xl) 0', minHeight: 'calc(100vh - 72px)' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: 'var(--sp-3xl)' }}>
          <div className="badge badge-premium animate-fade-in" style={{ marginBottom: 'var(--sp-md)' }}>
            Investasi Masa Depan
          </div>
          <h1 className="animate-fade-in stagger-1" style={{ marginBottom: 'var(--sp-md)' }}>
            Satu Langkah Lebih Dekat <br />
            <span className="text-gradient-gold">Menjadi PCPM BI.</span>
          </h1>
          <p className="animate-fade-in stagger-2" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem', color: 'var(--c-slate-800)', opacity: 0.8 }}>
            Pilih paket yang sesuai dengan target belajarmu. <br/>
            Buka kunci fitur AI dan Speed Drill tanpa batas.
          </p>
        </div>

        <div className="flex-center animate-fade-in stagger-3" style={{ gap: 'var(--sp-xl)', flexWrap: 'wrap', alignItems: 'stretch' }}>
          
          {/* Free Tier */}
          <div className="glass-card" style={{ width: '100%', maxWidth: '350px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginBottom: 'var(--sp-xs)' }}>Starter</h3>
            <p style={{ color: 'var(--c-slate-800)', opacity: 0.7, marginBottom: 'var(--sp-lg)' }}>Untuk pemanasan dan adaptasi TPD.</p>
            
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--c-navy-900)', marginBottom: 'var(--sp-lg)' }}>
              Gratis
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--sp-2xl) 0', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--c-success)' }}>✓</span> 
                <span style={{ opacity: 0.9 }}>Speed Drill (Limit 3 Sesi/Hari)</span>
              </li>
              <li style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--c-success)' }}>✓</span> 
                <span style={{ opacity: 0.9 }}>Dashboard Skor Dasar</span>
              </li>
              <li style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--c-success)' }}>✓</span> 
                <span style={{ opacity: 0.9 }}>Panduan Strategi Verbal</span>
              </li>
              <li style={{ display: 'flex', gap: '8px', opacity: 0.5 }}>
                <span>✕</span> 
                <span>AI Personal Coach Insight</span>
              </li>
              <li style={{ display: 'flex', gap: '8px', opacity: 0.5 }}>
                <span>✕</span> 
                <span>AI Simulasi Interview</span>
              </li>
            </ul>

            <Link href="/drill" className="btn btn-outline" style={{ width: '100%' }}>
              Mulai Gratis
            </Link>
          </div>

          {/* Premium Tier */}
          <div className="glass-card" style={{ width: '100%', maxWidth: '380px', display: 'flex', flexDirection: 'column', border: '2px solid var(--c-gold-500)', transform: 'scale(1.05)', position: 'relative', background: 'white' }}>
            
            <div style={{ position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)', background: 'var(--c-gold-500)', color: 'var(--c-navy-900)', padding: '4px 16px', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.875rem', boxShadow: 'var(--shadow-md)', whiteSpace: 'nowrap' }}>
              PALING POPULER
            </div>

            <h3 style={{ marginBottom: 'var(--sp-xs)' }}>Premium Access</h3>
            <p style={{ color: 'var(--c-slate-800)', opacity: 0.7, marginBottom: 'var(--sp-md)' }}>Persiapan total untuk hasil maksimal.</p>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: 'var(--sp-xs)' }}>
              <span style={{ textDecoration: 'line-through', color: 'var(--c-danger)', opacity: 0.7, fontWeight: 600 }}>Rp 149.000</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--c-success)', background: 'rgba(16,185,129,0.1)', padding: '2px 8px', borderRadius: '4px' }}>Diskon 67%</span>
            </div>
            
            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--c-navy-900)', marginBottom: '4px', lineHeight: 1 }}>
              Rp 49.000
            </div>
            <div style={{ fontSize: '0.875rem', opacity: 0.6, marginBottom: 'var(--sp-lg)' }}>per bulan (Batalkan kapan saja)</div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--sp-2xl) 0', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--c-gold-500)' }}>★</span> 
                <span style={{ fontWeight: 600, color: 'var(--c-navy-900)' }}>Speed Drill Unlimited</span>
              </li>
              <li style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--c-gold-500)' }}>★</span> 
                <span style={{ fontWeight: 600, color: 'var(--c-navy-900)' }}>Analisis AI Personal Coach</span>
              </li>
              <li style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--c-gold-500)' }}>★</span> 
                <span style={{ fontWeight: 600, color: 'var(--c-navy-900)' }}>Voice AI Simulasi Interview (Full)</span>
              </li>
              <li style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--c-success)' }}>✓</span> 
                <span style={{ opacity: 0.9 }}>Dashboard Progress Mendalam</span>
              </li>
              <li style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--c-success)' }}>✓</span> 
                <span style={{ opacity: 0.9 }}>Panduan Strategi Semua Kategori</span>
              </li>
            </ul>

            <Link href="/checkout" className="btn btn-gold" style={{ width: '100%', fontSize: '1.125rem', padding: '1rem', textAlign: 'center', display: 'block' }}>
              Berlangganan Sekarang
            </Link>
            <p style={{ textAlign: 'center', fontSize: '0.75rem', marginTop: '12px', opacity: 0.6 }}>
              Pembayaran aman dengan QRIS & Virtual Account.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}
