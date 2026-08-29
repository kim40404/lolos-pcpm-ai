"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSimulatePayment = async () => {
    if (!session) {
      router.push('/login?callbackUrl=/checkout');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const res = await fetch('/api/upgrade', {
        method: 'POST',
      });

      if (res.ok) {
        // Update session so it re-fetches the token which now has isPremium = true
        await update({ isPremium: true });
        setSuccess(true);
        setTimeout(() => {
          router.push('/dashboard');
        }, 3000);
      } else {
        const data = await res.json();
        setError(data.error || 'Terjadi kesalahan saat memproses pembayaran.');
      }
    } catch (err) {
      setError('Gagal terhubung ke server pembayaran.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main style={{ padding: 'var(--sp-2xl) 0', minHeight: 'calc(100vh - 72px)', background: 'var(--c-slate-100)' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        
        <div className="glass-card animate-fade-in" style={{ background: 'white' }}>
          
          {success ? (
            <div style={{ textAlign: 'center', padding: 'var(--sp-2xl) 0' }}>
              <div style={{ fontSize: '4rem', marginBottom: 'var(--sp-md)' }}>🎉</div>
              <h2 style={{ color: 'var(--c-success)', marginBottom: 'var(--sp-sm)' }}>Pembayaran Berhasil!</h2>
              <p style={{ opacity: 0.8, marginBottom: 'var(--sp-xl)' }}>
                Akun Anda telah di-upgrade ke Premium. Semua fitur AI telah terbuka.
              </p>
              <div className="dot-typing" style={{ margin: '0 auto' }}></div>
              <p style={{ fontSize: '0.875rem', opacity: 0.6, marginTop: 'var(--sp-sm)' }}>Mengalihkan ke Dashboard...</p>
            </div>
          ) : (
            <>
              <div style={{ borderBottom: '1px solid var(--c-slate-200)', paddingBottom: 'var(--sp-md)', marginBottom: 'var(--sp-lg)' }}>
                <h2 style={{ color: 'var(--c-navy-900)' }}>Checkout (Simulasi Midtrans)</h2>
                <p style={{ opacity: 0.7 }}>Selesaikan pembayaran untuk mengaktifkan Premium.</p>
              </div>

              <div style={{ background: 'rgba(244, 209, 96, 0.1)', border: '1px dashed var(--c-gold-500)', padding: 'var(--sp-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--sp-xl)' }}>
                <div className="flex-between" style={{ marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600 }}>Paket Premium Access</span>
                  <span style={{ fontWeight: 800, color: 'var(--c-navy-900)' }}>Rp 49.000</span>
                </div>
                <div className="flex-between" style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                  <span>Pajak (11%)</span>
                  <span>Rp 5.390</span>
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid var(--c-slate-200)', margin: '12px 0' }} />
                <div className="flex-between" style={{ fontSize: '1.125rem' }}>
                  <span style={{ fontWeight: 600 }}>Total Pembayaran</span>
                  <span style={{ fontWeight: 800, color: 'var(--c-danger)' }}>Rp 54.390</span>
                </div>
              </div>

              {error && (
                <div style={{ color: 'var(--c-danger)', background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '4px', marginBottom: 'var(--sp-md)', fontSize: '0.875rem' }}>
                  {error}
                </div>
              )}

              <button 
                onClick={handleSimulatePayment} 
                disabled={isProcessing}
                className="btn btn-gold" 
                style={{ width: '100%', fontSize: '1.125rem', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                {isProcessing ? 'Memproses...' : '💳 Bayar Sekarang (Mockup)'}
              </button>
              
              <div style={{ textAlign: 'center', marginTop: 'var(--sp-md)' }}>
                <Link href="/pricing" style={{ fontSize: '0.875rem', color: 'var(--c-slate-800)', opacity: 0.7, textDecoration: 'none' }}>
                  Batal dan kembali
                </Link>
              </div>
            </>
          )}

        </div>
      </div>
      <style jsx>{`
        .dot-typing {
          position: relative; width: 6px; height: 6px; border-radius: 5px;
          background-color: var(--c-success); color: var(--c-success);
          animation: dot-typing 1s infinite linear;
        }
        @keyframes dot-typing {
          0% { box-shadow: 10px 0 0 0 var(--c-success), 20px 0 0 0 var(--c-success); }
          50% { box-shadow: 10px -5px 0 0 var(--c-success), 20px 0 0 0 var(--c-success); }
          100% { box-shadow: 10px 0 0 0 var(--c-success), 20px 0 0 0 var(--c-success); }
        }
      `}</style>
    </main>
  );
}
