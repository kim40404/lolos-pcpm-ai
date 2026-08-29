"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type FgdMessage = {
  character: string;
  statement: string;
};

export default function FGDPage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  
  const [hasStarted, setHasStarted] = useState(false);
  const [fgdSize, setFgdSize] = useState<3 | 5>(3);

  // History for AI
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);

  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Voice recognition states
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const reco = new SpeechRecognition();
        reco.continuous = true;
        reco.interimResults = true;
        reco.lang = 'id-ID';

        reco.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setInput(currentTranscript);
        };

        reco.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
        };

        reco.onend = () => {
          setIsListening(false);
        };

        setRecognition(reco);
      }
    }
  }, []);

  const toggleListen = () => {
    if (isListening) {
      recognition?.stop();
      setIsListening(false);
    } else {
      setInput('');
      recognition?.start();
      setIsListening(true);
    }
  };

  const startGame = () => {
    setMessages([
      { role: 'assistant', content: `[{ "character": "Moderator", "statement": "Topik hari ini: Menghadapi inflasi global, haruskah BI menaikkan suku bunga acuan secara agresif atau menahannya demi UMKM? Diskusi kelompok beranggotakan ${fgdSize} orang. Silakan dimulai dari Anda, Kandidat A." }]` }
    ]);
    setHasStarted(true);
  };

  useEffect(() => {
    if (sessionStatus === 'unauthenticated' || (sessionStatus === 'authenticated' && (session?.user as any)?.isPremium !== true)) {
      router.push('/pricing');
    }
  }, [sessionStatus, session, router]);

  if (sessionStatus === 'loading') return <div className="container flex-center" style={{ height: '100vh' }}><div className="dot-typing"></div></div>;
  if (sessionStatus === 'unauthenticated' || (session?.user as any)?.isPremium !== true) {
    return null;
  }

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    if (isListening) {
      recognition?.stop();
      setIsListening(false);
    }

    const userMessage = input.trim();
    setInput('');
    const newHistory = [...messages, { role: 'user', content: `Kandidat A: "${userMessage}"` }];
    setMessages(newHistory);
    setIsProcessing(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory,
          contextType: 'fgd',
          fgdSize: fgdSize
        })
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessages([...newHistory, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages([...newHistory, { role: 'assistant', content: `[{ "character": "System", "statement": "[ERROR] ${data.error}" }]` }]);
      }
    } catch (err) {
      setMessages([...newHistory, { role: 'assistant', content: `[{ "character": "System", "statement": "[ERROR] Gagal terhubung ke server." }]` }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const parseFgdContent = (content: string): FgdMessage[] => {
    if (content.startsWith('Kandidat A:')) {
      return [{ character: 'Anda (Kandidat A)', statement: content.replace('Kandidat A:', '').replace(/"/g, '').trim() }];
    }
    try {
      const cleaned = content.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (e) {
      // Fallback if AI hallucinates formatting
      return [{ character: 'System', statement: content }];
    }
  };

  return (
    <main style={{ padding: 'var(--sp-xl) 0', height: 'calc(100vh - 72px)', display: 'flex', flexDirection: 'column', background: 'var(--c-slate-900)' }}>
      <div className="container" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', maxWidth: '1000px', height: '100%' }}>
        
        <div className="flex-between" style={{ marginBottom: 'var(--sp-md)' }}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src="/bi-icon-color.svg" alt="BI Icon" className="h-6 w-auto" />
              <div className="badge badge-premium">Premium Feature</div>
            </div>
            <h1 className="text-gradient-gold" style={{ fontSize: '1.75rem' }}>FGD Round Table</h1>
            <p style={{ color: 'var(--c-slate-300)', opacity: 0.8, fontSize: '0.875rem' }}>Simulasi Leaderless Group Discussion (LGD).</p>
          </div>
          <Link href="/dashboard" className="btn btn-outline" style={{ padding: '0.5rem 1rem', borderColor: 'var(--c-slate-500)', color: 'white' }}>
            Kembali
          </Link>
        </div>

        {!hasStarted ? (
          <div className="glass-card flex-center" style={{ background: 'var(--c-slate-800)', padding: 'var(--sp-3xl) var(--sp-xl)', flexDirection: 'column', textAlign: 'center', marginTop: 'var(--sp-xl)', border: '1px solid var(--c-slate-700)' }}>
            <div style={{ fontSize: '4rem', marginBottom: 'var(--sp-md)' }}>🗣️</div>
            <h2 style={{ marginBottom: 'var(--sp-sm)', color: 'white' }}>Persiapan Simulasi FGD</h2>
            <p style={{ opacity: 0.8, marginBottom: 'var(--sp-xl)', maxWidth: '500px', color: 'var(--c-slate-300)' }}>
              Pilih jumlah partisipan dalam diskusi ini. AI telah diprogram ulang agar mampu menyerang secara spesifik poin yang Anda kemukakan. Anda juga dapat menggunakan perintah suara (mic).
            </p>
            
            <div style={{ display: 'flex', gap: 'var(--sp-md)', marginBottom: 'var(--sp-2xl)' }}>
              <button 
                onClick={() => setFgdSize(3)}
                className="btn"
                style={{ 
                  padding: '1rem 2rem', 
                  background: fgdSize === 3 ? 'var(--c-gold-500)' : 'transparent', 
                  color: fgdSize === 3 ? 'var(--c-navy-900)' : 'var(--c-gold-500)',
                  border: '2px solid var(--c-gold-500)',
                  borderRadius: 'var(--radius-lg)',
                  fontWeight: 600
                }}
              >
                Grup 3 Orang<br/><span style={{ fontSize: '0.75rem', opacity: 0.8 }}>(Anda + Rizky + Nadia)</span>
              </button>
              <button 
                onClick={() => setFgdSize(5)}
                className="btn"
                style={{ 
                  padding: '1rem 2rem', 
                  background: fgdSize === 5 ? 'var(--c-gold-500)' : 'transparent', 
                  color: fgdSize === 5 ? 'var(--c-navy-900)' : 'var(--c-gold-500)',
                  border: '2px solid var(--c-gold-500)',
                  borderRadius: 'var(--radius-lg)',
                  fontWeight: 600
                }}
              >
                Grup 5 Orang<br/><span style={{ fontSize: '0.75rem', opacity: 0.8 }}>(Anda + 4 Karakter Lain)</span>
              </button>
            </div>

            <button 
              onClick={startGame} 
              className="btn btn-primary"
              style={{ padding: '1rem 3rem', fontSize: '1.25rem', borderRadius: 'var(--radius-full)' }}
            >
              Masuk ke Ruang Diskusi
            </button>
          </div>
        ) : (
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
            
            {/* Round Table Visual */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', height: '250px', border: '8px solid var(--c-slate-800)', borderRadius: '50%', background: 'var(--c-slate-900)', zIndex: 0, opacity: 0.5, pointerEvents: 'none' }}></div>

            <div style={{ flexGrow: 1, overflowY: 'auto', padding: 'var(--sp-xl)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-lg)', zIndex: 1 }}>
              {messages.map((msg, idx) => {
                const parsedMessages = parseFgdContent(msg.content);

                return (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-sm)', width: '100%' }}>
                    {parsedMessages.map((pMsg, pIdx) => {
                      const isUser = pMsg.character.includes('Kandidat A');
                      let align = 'center';
                      let bgColor = 'var(--c-slate-800)';
                      let color = 'white';
                      let avatar = '👤';
                      let positionClass = '';

                      if (isUser) {
                        align = 'flex-end';
                        bgColor = 'var(--c-gold-500)';
                        color = 'var(--c-navy-900)';
                        positionClass = 'self-end';
                      } else if (pMsg.character.includes('Rizky')) {
                        align = 'flex-start';
                        bgColor = 'rgba(20, 184, 166, 0.1)';
                        color = 'var(--c-slate-100)';
                        avatar = '👨‍💼';
                        positionClass = 'self-start';
                      } else if (pMsg.character.includes('Nadia')) {
                        align = 'flex-start';
                        bgColor = 'rgba(139, 92, 246, 0.1)';
                        color = 'var(--c-slate-100)';
                        avatar = '👩‍💼';
                        positionClass = 'self-start';
                      } else if (pMsg.character.includes('Bima')) {
                        align = 'flex-start';
                        bgColor = 'rgba(59, 130, 246, 0.1)';
                        color = 'var(--c-slate-100)';
                        avatar = '📊';
                        positionClass = 'self-start';
                      } else if (pMsg.character.includes('Siska')) {
                        align = 'flex-start';
                        bgColor = 'rgba(244, 63, 94, 0.1)';
                        color = 'var(--c-slate-100)';
                        avatar = '🧐';
                        positionClass = 'self-start';
                      } else if (pMsg.character.includes('Moderator')) {
                        align = 'center';
                        bgColor = 'rgba(255, 255, 255, 0.05)';
                        color = 'var(--c-slate-400)';
                        avatar = '📋';
                        positionClass = 'self-center';
                      }

                      return (
                        <div key={pIdx} className={`animate-fade-in ${positionClass}`} style={{ 
                          display: 'flex', gap: '16px', maxWidth: '80%', 
                          flexDirection: align === 'flex-end' ? 'row-reverse' : (align === 'center' ? 'column' : 'row'),
                          alignItems: align === 'center' ? 'center' : 'flex-start'
                        }}>
                          
                          {align !== 'center' && (
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--c-slate-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0, border: `2px solid ${isUser ? 'var(--c-gold-500)' : 'var(--c-slate-600)'}` }}>
                              {avatar}
                            </div>
                          )}

                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: align }}>
                            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--c-slate-400)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                              {pMsg.character}
                            </span>
                            <div className="glass-card" style={{ 
                              background: bgColor, 
                              color: color, 
                              padding: '16px 24px', 
                              borderRadius: '16px', 
                              borderTopRightRadius: align === 'flex-end' ? 0 : '16px', 
                              borderTopLeftRadius: align === 'flex-start' ? 0 : '16px',
                              border: `1px solid ${isUser ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
                              fontSize: '1.125rem',
                              lineHeight: 1.6,
                              textAlign: align === 'center' ? 'center' : 'left'
                            }}>
                              {pMsg.statement}
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                );
              })}
              
              {isProcessing && (
                <div className="self-start" style={{ display: 'flex', gap: '16px', maxWidth: '70%', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--c-slate-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                    🤖
                  </div>
                  <div className="glass-card" style={{ padding: '16px 24px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center' }}>
                    <div className="dot-typing"></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div style={{ padding: 'var(--sp-lg)', background: 'var(--c-slate-900)', borderTop: '1px solid var(--c-slate-800)', zIndex: 2 }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={toggleListen}
                  className="btn"
                  style={{ 
                    borderRadius: '50%', width: '56px', height: '56px', padding: 0,
                    background: isListening ? 'var(--c-danger)' : 'var(--c-slate-800)',
                    color: 'white', border: '1px solid var(--c-slate-700)',
                    flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem'
                  }}
                  disabled={isProcessing}
                  title="Gunakan Suara (Voice)"
                >
                  {isListening ? '⏹️' : '🎤'}
                </button>
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isListening ? "Mendengarkan..." : "Sampaikan argumen Anda ke dalam forum..."}
                  style={{ flexGrow: 1, padding: '16px 24px', borderRadius: 'var(--radius-full)', border: '1px solid var(--c-slate-700)', background: 'var(--c-slate-800)', color: 'white', outline: 'none', fontSize: '1.125rem' }}
                  disabled={isProcessing}
                />
                <button 
                  onClick={handleSend}
                  disabled={isProcessing || !input.trim()}
                  className="btn btn-gold"
                  style={{ borderRadius: 'var(--radius-full)', padding: '0 32px', fontSize: '1.125rem', fontWeight: 700 }}
                >
                  Bicara
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
      <style jsx>{`
        .self-start { align-self: flex-start; }
        .self-end { align-self: flex-end; }
        .self-center { align-self: center; }
        .dot-typing {
          position: relative; width: 8px; height: 8px; border-radius: 5px;
          background-color: var(--c-slate-400); color: var(--c-slate-400);
          animation: dot-typing 1s infinite linear; margin-left: 15px;
        }
        @keyframes dot-typing {
          0% { box-shadow: 15px 0 0 0 var(--c-slate-400), 30px 0 0 0 var(--c-slate-400); }
          50% { box-shadow: 15px -8px 0 0 var(--c-slate-400), 30px 0 0 0 var(--c-slate-400); }
          100% { box-shadow: 15px 0 0 0 var(--c-slate-400), 30px 0 0 0 var(--c-slate-400); }
        }
      `}</style>
    </main>
  );
}
