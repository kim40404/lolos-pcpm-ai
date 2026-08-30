"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type DrillState = {
  question: string;
  isEvaluation: boolean;
  isCorrect: boolean | null;
  explanation: string;
};

export default function DynamicDrillPage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  
  const [hasStarted, setHasStarted] = useState(false);
  const [drillTopic, setDrillTopic] = useState<'numerikal' | 'verbal' | 'kebanksentralan'>('numerikal');
  const [questionCount, setQuestionCount] = useState(1);
  const [correctCount, setCorrectCount] = useState(0);

  // To keep track of history for the AI Context (raw messages)
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  
  // To render the UI beautifully
  const [drillState, setDrillState] = useState<DrillState | null>(null);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (sessionStatus === 'unauthenticated') {
      router.push('/pricing');
    }
  }, [sessionStatus, session, router]);

  if (sessionStatus === 'loading') return <div className="container flex-center" style={{ height: '100vh' }}><div className="dot-typing"></div></div>;
  if (sessionStatus === 'unauthenticated') {
    return null;
  }

  const parseJSON = (text: string) => {
    try {
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (e) {
      console.error("Failed to parse JSON:", text);
      return null;
    }
  };

  const getTopicLabel = () => {
    if (drillTopic === 'verbal') return 'Verbal (Sinonim/Antonim/Analogi)';
    if (drillTopic === 'kebanksentralan') return 'Kebanksentralan & Makroekonomi';
    return 'Logika Numerikal (Deret/Cerita)';
  };

  const requestInitialQuestion = async () => {
    setIsProcessing(true);
    setHasStarted(true);
    const initialMsg = { role: 'user', content: `Tolong berikan saya 1 soal ${getTopicLabel()} baru sekarang.` };
    const newHistory = [initialMsg];
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory,
          contextType: 'dynamic-drill',
          drillTopic: drillTopic
        })
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 403) {
          alert("Peringatan: Token AI Anda telah habis! Silakan lakukan Top Up untuk memulai latihan.");
        } else {
          alert("Terjadi kesalahan sistem. Silakan coba lagi.");
        }
        return;
      }

      if (res.ok) {
        const parsed = parseJSON(data.reply);
        if (parsed) {
          setDrillState({
            question: parsed.question,
            isEvaluation: false,
            isCorrect: null,
            explanation: ''
          });
          setMessages([...newHistory, { role: 'assistant', content: JSON.stringify(parsed) }]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendAnswer = async () => {
    if (!input.trim() || isProcessing) return;

    const userMsg = { role: 'user', content: `Jawaban saya: ${input.trim()}` };
    setInput('');
    const newHistory = [...messages, userMsg];
    setIsProcessing(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.slice(-2),
          contextType: 'dynamic-drill',
          drillTopic: drillTopic
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        if (res.status === 403) {
          alert("Peringatan: Token AI Anda telah habis! Silakan lakukan Top Up untuk melanjutkan latihan.");
        } else {
          alert("Terjadi kesalahan sistem. Silakan coba lagi.");
        }
        return;
      }
      
      if (res.ok) {
        const parsed = parseJSON(data.reply);
        if (parsed) {
          setDrillState({
            question: parsed.question,
            isEvaluation: parsed.isEvaluation,
            isCorrect: parsed.isCorrect,
            explanation: parsed.explanation
          });
          setMessages([...newHistory, { role: 'assistant', content: JSON.stringify(parsed) }]);
          setQuestionCount(prev => prev + 1);
          if (parsed.isCorrect) setCorrectCount(prev => prev + 1);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main style={{ padding: 'var(--sp-xl) 0', minHeight: 'calc(100vh - 72px)', background: 'var(--c-slate-100)', position: 'relative', overflow: 'hidden' }}>
      <img src="/bi-logo.svg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 opacity-[0.03] pointer-events-none" alt="" />
      <div className="container" style={{ maxWidth: '800px', position: 'relative', zIndex: 10 }}>
        
        <div className="flex-between" style={{ marginBottom: 'var(--sp-xl)' }}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src="/bi-icon-color.svg" alt="BI Icon" className="h-6 w-auto" />
              <div className="badge badge-premium">Premium Feature</div>
            </div>
            <h1 className="text-gradient">AI Dynamic Drill ⚡</h1>
            <p style={{ color: 'var(--c-slate-800)', opacity: 0.8 }}>Latihan soal tak terbatas (Infinite Generation) oleh AI.</p>
          </div>
          <Link href="/dashboard" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
            Kembali
          </Link>
        </div>

        {!hasStarted ? (
          <div className="glass-card flex-center" style={{ background: 'white', padding: 'var(--sp-3xl) var(--sp-xl)', flexDirection: 'column', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: 'var(--sp-md)' }}>🎯</div>
            <h2 style={{ marginBottom: 'var(--sp-sm)' }}>Pilih Topik Latihan</h2>
            <p style={{ opacity: 0.8, marginBottom: 'var(--sp-xl)', maxWidth: '500px' }}>
              AI kami akan menghasilkan soal orisinal secara *real-time* yang tidak akan pernah habis. Silakan pilih topik kelemahan Anda.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)', width: '100%', maxWidth: '400px', marginBottom: 'var(--sp-2xl)' }}>
              <button 
                onClick={() => setDrillTopic('numerikal')}
                className="btn"
                style={{ 
                  padding: '1rem', 
                  background: drillTopic === 'numerikal' ? 'var(--c-navy-900)' : 'white', 
                  color: drillTopic === 'numerikal' ? 'white' : 'var(--c-navy-900)',
                  border: '2px solid var(--c-navy-900)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'left',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  fontWeight: 600
                }}
              >
                <span>🔢 Logika Numerikal</span>
                {drillTopic === 'numerikal' && <span>✓</span>}
              </button>
              <button 
                onClick={() => setDrillTopic('verbal')}
                className="btn"
                style={{ 
                  padding: '1rem', 
                  background: drillTopic === 'verbal' ? 'var(--c-navy-900)' : 'white', 
                  color: drillTopic === 'verbal' ? 'white' : 'var(--c-navy-900)',
                  border: '2px solid var(--c-navy-900)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'left',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  fontWeight: 600
                }}
              >
                <span>📝 Kemampuan Verbal</span>
                {drillTopic === 'verbal' && <span>✓</span>}
              </button>
              <button 
                onClick={() => setDrillTopic('kebanksentralan')}
                className="btn"
                style={{ 
                  padding: '1rem', 
                  background: drillTopic === 'kebanksentralan' ? 'var(--c-navy-900)' : 'white', 
                  color: drillTopic === 'kebanksentralan' ? 'white' : 'var(--c-navy-900)',
                  border: '2px solid var(--c-navy-900)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'left',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  fontWeight: 600
                }}
              >
                <span>🏛️ Kebanksentralan</span>
                {drillTopic === 'kebanksentralan' && <span>✓</span>}
              </button>
            </div>

            <button 
              onClick={requestInitialQuestion} 
              className="btn btn-gold"
              style={{ padding: '1rem 3rem', fontSize: '1.25rem', borderRadius: 'var(--radius-full)' }}
              disabled={isProcessing}
            >
              {isProcessing ? 'Memuat Soal Pertama...' : 'Mulai Tantangan'}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-lg)' }}>
            
            {/* HUD / Stats */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: 'white', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontWeight: 600, color: 'var(--c-slate-800)' }}>
                Topik: <span style={{ color: 'var(--c-navy-900)' }}>{getTopicLabel()}</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="badge" style={{ background: 'var(--c-navy-900)', color: 'white' }}>Soal ke-{questionCount}</div>
                <div className="badge" style={{ background: 'var(--c-success)', color: 'white' }}>Benar: {correctCount}</div>
              </div>
            </div>

            {/* Evaluation Flashcard */}
            {drillState?.isEvaluation && (
              <div className="animate-fade-in" style={{ 
                background: 'white', 
                borderRadius: 'var(--radius-lg)', 
                padding: 'var(--sp-xl)', 
                boxShadow: 'var(--shadow-md)',
                borderTop: `6px solid ${drillState.isCorrect ? 'var(--c-success)' : 'var(--c-danger)'}` 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--sp-md)' }}>
                  <div style={{ 
                    width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.25rem',
                    background: drillState.isCorrect ? 'var(--c-success)' : 'var(--c-danger)'
                  }}>
                    {drillState.isCorrect ? '✓' : '✗'}
                  </div>
                  <h2 style={{ color: drillState.isCorrect ? 'var(--c-success)' : 'var(--c-danger)' }}>
                    {drillState.isCorrect ? 'Jawaban Benar!' : 'Jawaban Salah!'}
                  </h2>
                </div>
                <div className="markdown-content" style={{ color: 'var(--c-slate-800)', fontSize: '1.125rem' }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{drillState.explanation}</ReactMarkdown>
                </div>
              </div>
            )}

            {/* Question Flashcard */}
            {drillState?.question && (
              <div className="animate-fade-in" style={{ 
                background: 'var(--c-navy-900)', 
                borderRadius: 'var(--radius-lg)', 
                padding: 'var(--sp-2xl)', 
                boxShadow: 'var(--shadow-lg)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--c-gold-500)', color: 'var(--c-navy-900)', padding: '4px 16px', borderBottomLeftRadius: 'var(--radius-md)', fontWeight: 700 }}>
                  SOAL BARU
                </div>
                
                <h3 style={{ color: 'var(--c-gold-500)', marginBottom: 'var(--sp-md)' }}>Pertanyaan</h3>
                <div className="markdown-content" style={{ fontSize: '1.25rem', lineHeight: 1.6 }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {drillState.question.replace(/([A-E][.)])\s/g, '\n\n$1 ')}
                  </ReactMarkdown>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: 'var(--sp-xl)' }}>
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendAnswer()}
                    placeholder="Ketik jawaban (dan alasan jika perlu)..."
                    style={{ flexGrow: 1, padding: '16px', borderRadius: 'var(--radius-md)', border: 'none', outline: 'none', fontSize: '1.125rem', color: 'var(--c-slate-900)' }}
                    disabled={isProcessing}
                  />
                  <button 
                    onClick={handleSendAnswer}
                    disabled={isProcessing || !input.trim()}
                    className="btn btn-gold"
                    style={{ borderRadius: 'var(--radius-md)', padding: '0 32px', fontSize: '1.125rem', fontWeight: 700 }}
                  >
                    {isProcessing ? 'Menilai...' : 'Kirim'}
                  </button>
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="flex-center animate-pulse" style={{ padding: 'var(--sp-md) 0', color: 'var(--c-slate-500)' }}>
                <span className="dot-typing" style={{ marginRight: '12px' }}></span> AI sedang mengevaluasi dan meracik soal baru...
              </div>
            )}

          </div>
        )}

      </div>
      <style jsx>{`
        .dot-typing {
          position: relative; width: 6px; height: 6px; border-radius: 5px;
          background-color: var(--c-navy-900); color: var(--c-navy-900);
          animation: dot-typing 1s infinite linear;
        }
        @keyframes dot-typing {
          0% { box-shadow: 10px 0 0 0 var(--c-navy-900), 20px 0 0 0 var(--c-navy-900); }
          50% { box-shadow: 10px -5px 0 0 var(--c-navy-900), 20px 0 0 0 var(--c-navy-900); }
          100% { box-shadow: 10px 0 0 0 var(--c-navy-900), 20px 0 0 0 var(--c-navy-900); }
        }
        /* Override Markdown p color inside dark card */
        .markdown-content p { color: inherit; white-space: pre-wrap; margin-bottom: 0.75rem; }
        .markdown-content ul, .markdown-content ol { padding-left: 1.5rem; margin-bottom: 1rem; }
        .markdown-content li { margin-bottom: 0.5rem; }
      `}</style>
    </main>
  );
}
