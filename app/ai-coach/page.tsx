"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function AICoachPage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Halo! Saya AI Personal Coach Anda. Berdasarkan data Speed Drill terakhir, akurasi Verbal Anda 85% tapi kecepatan Numerikal Anda perlu ditingkatkan (rata-rata 42 detik). Ada topik yang ingin dibahas?' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (sessionStatus === 'unauthenticated' || (sessionStatus === 'authenticated' && (session?.user as any)?.isPremium !== true)) {
      router.push('/pricing');
    }
  }, [sessionStatus, session, router]);

  if (sessionStatus === 'loading') return <div className="container flex-center" style={{ height: '100vh' }}><div className="dot-typing"></div></div>;
  if (sessionStatus === 'unauthenticated' || (session?.user as any)?.isPremium !== true) {
    return null;
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Send previous context (max last 5 messages to save tokens)
          messages: newMessages.slice(-5),
          contextType: 'coach'
        })
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessages(prev => [...prev, { role: 'system', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'system', content: `[ERROR] ${data.error}` }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'system', content: '[ERROR] Koneksi ke AI terputus.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <main className="container" style={{ padding: 'var(--sp-2xl) 0', maxWidth: '800px', height: 'calc(100vh - 72px)', display: 'flex', flexDirection: 'column' }}>
      
      <div className="flex-between" style={{ marginBottom: 'var(--sp-md)' }}>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <img src="/bi-icon-black.png" alt="BI Icon" className="h-6 w-auto" />
            <div className="badge badge-premium">Premium Feature</div>
          </div>
          <h1 className="text-gradient">AI Personal Coach</h1>
          <p style={{ color: 'var(--c-slate-800)', opacity: 0.8 }}>Asisten pintar yang mengenal kelemahanmu.</p>
        </div>
        <Link href="/dashboard" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
          Kembali
        </Link>
      </div>

      <div className="glass-card" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: 'var(--sp-xl)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ 
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              background: msg.role === 'user' ? 'var(--c-navy-800)' : 'var(--c-slate-100)',
              color: msg.role === 'user' ? 'white' : 'var(--c-slate-900)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              borderBottomRightRadius: msg.role === 'user' ? '2px' : 'var(--radius-md)',
              borderBottomLeftRadius: msg.role === 'system' ? '2px' : 'var(--radius-md)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              {msg.role === 'system' && <div style={{ fontSize: '0.75rem', fontWeight: 600, opacity: 0.5, marginBottom: '4px' }}>AI COACH</div>}
              <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isTyping && (
            <div style={{ alignSelf: 'flex-start', background: 'var(--c-slate-100)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'flex', gap: '4px' }}>
              <span className="dot-typing"></span>
            </div>
          )}
        </div>

        <div style={{ padding: 'var(--sp-md)', borderTop: '1px solid rgba(0,0,0,0.05)', background: 'white' }}>
          <form onSubmit={handleSend} style={{ display: 'flex', gap: 'var(--sp-sm)' }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya tips numerikal, analisis teks, dsb..."
              style={{ flexGrow: 1, padding: '0.75rem 1rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--c-slate-800)', outline: 'none' }}
              disabled={isTyping}
            />
            <button type="submit" className="btn btn-primary" disabled={isTyping || !input.trim()} style={{ padding: '0.75rem 1.5rem' }}>
              Kirim
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .dot-typing {
          position: relative; width: 6px; height: 6px; border-radius: 5px;
          background-color: var(--c-slate-800); color: var(--c-slate-800);
          animation: dot-typing 1s infinite linear; margin-left: 10px;
        }
        @keyframes dot-typing {
          0% { box-shadow: 10px 0 0 0 var(--c-slate-800), 20px 0 0 0 var(--c-slate-800); }
          50% { box-shadow: 10px -5px 0 0 var(--c-slate-800), 20px 0 0 0 var(--c-slate-800); }
          100% { box-shadow: 10px 0 0 0 var(--c-slate-800), 20px 0 0 0 var(--c-slate-800); }
        }
      `}</style>
    </main>
  );
}
