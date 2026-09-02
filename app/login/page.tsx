"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password
    });

    if (res?.error) {
      setError('Email atau password salah');
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <main className="container flex-center" style={{ minHeight: '100vh', padding: 'var(--sp-2xl) 0' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '450px' }}>
        <h1 className="text-gradient" style={{ textAlign: 'center', marginBottom: 'var(--sp-md)', fontSize: '2rem' }}>Login Lolos PCPM</h1>
        <p style={{ textAlign: 'center', opacity: 0.8, marginBottom: 'var(--sp-xl)' }}>Selamat datang kembali.</p>
        
        {error && <div style={{ background: 'var(--c-danger)', color: 'white', padding: 'var(--sp-sm)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--sp-md)', textAlign: 'center' }}>{error}</div>}
        
        <form onSubmit={loginUser} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 600 }}>Email</label>
            <input 
              type="email" 
              value={data.email} 
              onChange={e => setData({...data, email: e.target.value})}
              required
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 600 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                value={data.password} 
                onChange={e => setData({...data, password: e.target.value})}
                required
                style={{ width: '100%', padding: '0.75rem', paddingRight: '2.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ccc' }}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', marginTop: 'var(--sp-sm)' }}>
            {loading ? 'Masuk...' : 'Masuk Dashboard'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 'var(--sp-xl)', opacity: 0.8 }}>
          Belum punya akun? <Link href="/register" style={{ color: 'var(--c-blue-500)', fontWeight: 600 }}>Daftar sekarang</Link>
        </p>
      </div>
    </main>
  );
}
