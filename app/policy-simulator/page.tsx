'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

function TokenBalanceDisplay() {
  const [quota, setQuota] = useState<number | null>(null);

  useEffect(() => {
    const fetchQuota = async () => {
      try {
        const res = await fetch('/api/user/quota');
        if (res.ok) {
          const data = await res.json();
          setQuota(data.aiQuota);
        }
      } catch (err) {}
    };
    fetchQuota();
    const interval = setInterval(fetchQuota, 5000);
    return () => clearInterval(interval);
  }, []);

  if (quota === null) return <span style={{ fontWeight: 700, color: 'var(--c-gold-600)' }}>Memuat...</span>;

  return <span style={{ fontWeight: 700, color: 'var(--c-gold-600)' }}>Token Tersedia: {quota}</span>;
}

export default function PolicySimulatorPage() {
  const { data: session, status: sessionStatus, update } = useSession();
  const router = useRouter();

  const [scenario, setScenario] = useState<string>('');
  const [decision, setDecision] = useState<string>('');
  const [evaluation, setEvaluation] = useState<string>('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStatus === 'unauthenticated') {
      router.push('/pricing');
    }
  }, [sessionStatus, router]);

  const generateScenario = async () => {
    setIsLoading(true);
    setError(null);
    setScenario('');
    setEvaluation('');
    setDecision('');
    
    try {
      const res = await fetch('/api/policy-simulator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate' }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        if (res.status === 403) {
          router.push('/pricing');
          return;
        }
        throw new Error(data.error || 'Gagal memuat skenario');
      }
      
      setScenario(data.scenario);
      // Update session to reflect token deduction
      await update();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const evaluateDecision = async () => {
    if (!decision.trim()) return;
    
    setIsEvaluating(true);
    setError(null);
    
    try {
      const res = await fetch('/api/policy-simulator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'evaluate', scenario, decision }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        if (res.status === 403) {
          router.push('/pricing');
          return;
        }
        throw new Error(data.error || 'Gagal mengevaluasi keputusan');
      }
      
      setEvaluation(data.evaluation);
      // Update session to reflect token deduction
      await update();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsEvaluating(false);
    }
  };

  if (sessionStatus === 'loading') return <div className="container flex-center" style={{ height: '100vh' }}><div className="dot-typing"></div></div>;
  if (sessionStatus === 'unauthenticated') return null;

  return (
    <main style={{ padding: 'var(--sp-2xl) 0', minHeight: 'calc(100vh - 72px)', position: 'relative', overflow: 'hidden' }}>
      {/* Background Watermark */}
      <img src="/bi-logo-cropped.png" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 opacity-[0.03] pointer-events-none" alt="" />
      
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-xl)', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(21, 101, 192, 0.1)', border: '1px solid rgba(21, 101, 192, 0.2)', borderRadius: '100px', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--c-navy-600)', letterSpacing: '1px' }}>STUDI KASUS PCPM</span>
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--c-navy-900)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              BI Case Simulator
            </h1>
          </div>
          
          {/* Real-time Quota Display */}
          <div className="glass-card" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', background: 'white' }}>
            <span style={{ fontSize: '1.2rem' }}>🪙</span>
            <TokenBalanceDisplay />
          </div>
        </div>

        {error && (
          <div style={{ background: '#fef2f2', color: '#ef4444', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: 'var(--sp-lg)', border: '1px solid #f87171' }}>
            {error}
          </div>
        )}

        {!scenario && !isLoading && (
          <div className="glass-card animate-fade-in" style={{ textAlign: 'center', padding: 'var(--sp-3xl) var(--sp-xl)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 'var(--sp-md)' }}>🏛️</div>
            <h2 style={{ marginBottom: 'var(--sp-md)' }}>Selamat Datang, Kandidat.</h2>
            <p style={{ color: 'var(--c-slate-600)', marginBottom: 'var(--sp-xl)', maxWidth: '500px', margin: '0 auto var(--sp-xl)' }}>
              Uji kemampuan pemecahan masalah Anda. Hadapi berbagai studi kasus kebanksentralan dan berikan analisis yang terstruktur.
            </p>
            <button 
              className="btn btn-gold flex items-center justify-center gap-2 mx-auto" 
              onClick={generateScenario}
              style={{ fontSize: '1.125rem', padding: '12px 32px' }}
            >
              Mulai Skenario <span className="text-sm bg-white/20 px-2 py-0.5 rounded">-1 Token</span>
            </button>
          </div>
        )}

        {isLoading && (
          <div className="glass-card flex-center" style={{ minHeight: '300px' }}>
            <div style={{ textAlign: 'center' }}>
              <div className="dot-typing" style={{ margin: '0 auto var(--sp-lg)' }}></div>
              <p style={{ color: 'var(--c-slate-500)', fontWeight: 500 }}>Mengumpulkan data makroekonomi global...</p>
            </div>
          </div>
        )}

        {scenario && !isLoading && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-lg)' }}>
            
            {/* Scenario Card */}
            <div className="glass-card" style={{ borderLeft: '4px solid var(--c-navy-900)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-md)' }}>
                <h3 style={{ margin: 0, color: 'var(--c-navy-900)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>📊</span> Laporan Intelijen Ekonomi
                </h3>
              </div>
              <div className="markdown-body" style={{ color: 'var(--c-slate-800)', lineHeight: 1.6 }}>
                <ReactMarkdown>{scenario}</ReactMarkdown>
              </div>
            </div>

            {/* Decision Input */}
            {!evaluation && (
              <div className="glass-card" style={{ background: 'var(--c-slate-50)' }}>
                <h3 style={{ marginBottom: 'var(--sp-md)', fontSize: '1.125rem' }}>Kebijakan Apa yang Anda Ambil?</h3>
                <textarea
                  value={decision}
                  onChange={(e) => setDecision(e.target.value)}
                  placeholder="Ketik analisis dan solusi Anda di sini (misal: 'Berdasarkan data inflasi, langkah yang tepat adalah...')"
                  style={{ 
                    width: '100%', 
                    minHeight: '150px', 
                    padding: '1rem', 
                    borderRadius: 'var(--radius-md)', 
                    border: '1px solid var(--c-slate-300)',
                    marginBottom: 'var(--sp-md)',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                  disabled={isEvaluating}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                  <button 
                    className="btn btn-outline" 
                    onClick={generateScenario}
                    disabled={isEvaluating}
                  >
                    Ganti Skenario
                  </button>
                  <button 
                    className="btn btn-primary" 
                    onClick={evaluateDecision}
                    disabled={!decision.trim() || isEvaluating}
                    style={{ minWidth: '180px', display: 'flex', justifyContent: 'center' }}
                  >
                    {isEvaluating ? <div className="dot-typing" style={{ transform: 'scale(0.7)' }}></div> : 'Eksekusi Kebijakan (1 Token)'}
                  </button>
                </div>
              </div>
            )}

            {/* Evaluation Card */}
            {evaluation && (
              <div className="glass-card animate-fade-in" style={{ borderLeft: '4px solid var(--c-gold-500)', background: 'linear-gradient(to right, rgba(234, 179, 8, 0.05), transparent)' }}>
                <h3 style={{ margin: '0 0 var(--sp-md) 0', color: 'var(--c-gold-600)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>⚖️</span> Evaluasi AI Coach
                </h3>
                <div className="markdown-body" style={{ color: 'var(--c-slate-800)', lineHeight: 1.6 }}>
                  <ReactMarkdown>{evaluation}</ReactMarkdown>
                </div>
                
                <div style={{ marginTop: 'var(--sp-xl)', paddingTop: 'var(--sp-lg)', borderTop: '1px solid var(--c-slate-200)', textAlign: 'center' }}>
                  <button 
                    className="btn btn-gold" 
                    onClick={generateScenario}
                  >
                    Mainkan Skenario Baru (1 Token)
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </main>
  );
}
