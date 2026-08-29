"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function AIInterviewPage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'interviewing' | 'feedback'>('idle');
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [question, setQuestion] = useState("Ceritakan mengapa Anda tertarik berkarir di Bank Indonesia dan apa kontribusi yang bisa Anda berikan mengingat latar belakang pendidikan Anda?");
  const [feedback, setFeedback] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [history, setHistory] = useState<{role: string, content: string}[]>([]);
  const [timeLeft, setTimeLeft] = useState(120); // 2 menit

  useEffect(() => {
    let timer: any;
    if (isListening && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (isListening && timeLeft === 0) {
      document.getElementById('stop-btn')?.click();
    }
    return () => clearInterval(timer);
  }, [isListening, timeLeft]);

  useEffect(() => {
    if (sessionStatus === 'unauthenticated' || (sessionStatus === 'authenticated' && (session?.user as any)?.isPremium !== true)) {
      router.push('/pricing');
    }
  }, [sessionStatus, session, router]);

  if (sessionStatus === 'loading') return <div className="container flex-center" style={{ height: '100vh' }}><div className="dot-typing"></div></div>;
  if (sessionStatus === 'unauthenticated' || (session?.user as any)?.isPremium !== true) {
    return null;
  }

  // Initialize Speech Recognition
  if (typeof window !== 'undefined' && !recognition) {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.lang = 'id-ID';
      rec.continuous = true;
      rec.interimResults = true;
      
      rec.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      setRecognition(rec);
    }
  }

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      window.speechSynthesis.speak(utterance);
    }
  };

  const startInterview = (q?: any) => {
    const textToSpeak = typeof q === 'string' ? q : question;
    setStatus('interviewing');
    setTranscript('');
    setFeedback('');
    setTimeout(() => {
      speakText(textToSpeak);
    }, 500);
  };

  const toggleListening = async () => {
    if (isListening) {
      setIsListening(false);
      if (recognition) {
        recognition.stop();
      }
      
      const finalTranscript = transcript.trim();
      if (!finalTranscript) {
        setFeedback('[ERROR] Suara tidak terdeteksi. Silakan coba lagi dengan memastikan mikrofon aktif.');
        setStatus('feedback');
        return;
      }
      
      setIsProcessing(true);
      setStatus('feedback');

      const newHistory = [
        ...history,
        { role: 'assistant', content: question },
        { role: 'user', content: finalTranscript }
      ];

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: newHistory,
            contextType: 'interview'
          })
        });

        const data = await res.json();
        
        if (res.ok) {
          setFeedback(data.reply);
          setHistory(newHistory); // Save the history only on success
        } else {
          setFeedback(`[ERROR] ${data.error}`);
        }
      } catch (err) {
        setFeedback('[ERROR] Gagal terhubung ke AI.');
      } finally {
        setIsProcessing(false);
      }
    } else {
      setIsListening(true);
      setTranscript('');
      setTimeLeft(120);
      
      if (recognition) {
        try {
          recognition.start();
        } catch(e) {
          console.error("STT Error", e);
        }
      } else {
        alert("Browser Anda tidak mendukung fitur mikrofon untuk STT. Harap gunakan Chrome.");
        setIsListening(false);
      }
    }
  };

  return (
    <main className="container" style={{ padding: 'var(--sp-2xl) 0', maxWidth: '800px', height: 'calc(100vh - 72px)' }}>
      
      <div className="flex-between" style={{ marginBottom: 'var(--sp-xl)' }}>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <img src="/bi-logo-black.png" alt="Bank Indonesia" className="h-6 w-auto" />
          </div>
          <h1 className="text-gradient">AI Simulasi Interview</h1>
          <p style={{ color: 'var(--c-slate-800)', opacity: 0.8 }}>Latihan wawancara panel PCPM dengan AI interaktif.</p>
        </div>
        <Link href="/dashboard" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
          Kembali
        </Link>
      </div>

      <div className="glass-card" style={{ textAlign: 'center', padding: 'var(--sp-2xl)' }}>
        
        {status === 'idle' && (
          <div className="animate-fade-in">
            <div style={{ fontSize: '4rem', marginBottom: 'var(--sp-md)' }}>🎤</div>
            <h2 style={{ marginBottom: 'var(--sp-md)' }}>Siap untuk Wawancara?</h2>
            <p style={{ opacity: 0.8, marginBottom: 'var(--sp-xl)', maxWidth: '500px', margin: '0 auto var(--sp-xl)' }}>
              AI akan bertindak sebagai panelis BI. Pertanyaan akan dibacakan (pastikan volume perangkat Anda aktif). Jawablah menggunakan mikrofon Anda.
            </p>
            <button onClick={() => startInterview()} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.25rem' }}>
              Mulai Simulasi
            </button>
          </div>
        )}

        {status === 'interviewing' && (
          <div className="animate-fade-in">
            <div style={{ background: 'var(--c-slate-100)', padding: 'var(--sp-xl)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--sp-2xl)', borderLeft: '4px solid var(--c-navy-800)' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, opacity: 0.5, marginBottom: 'var(--sp-sm)', textAlign: 'left' }}>PEWAWANCARA AI</div>
              <p style={{ fontSize: '1.25rem', fontWeight: 500, textAlign: 'left', fontStyle: 'italic' }}>
                "{question}"
              </p>
            </div>

            <div style={{ marginBottom: 'var(--sp-xl)', minHeight: '100px', border: '1px dashed var(--c-slate-800)', padding: 'var(--sp-md)', borderRadius: 'var(--radius-md)', textAlign: 'left', background: isListening ? 'rgba(34, 197, 94, 0.05)' : 'transparent' }}>
              <div className="flex-between" style={{ marginBottom: 'var(--sp-sm)' }}>
                <span style={{ opacity: 0.5 }}>{isListening ? 'Mendengarkan (Bicara sekarang)...' : 'Jawaban Anda akan muncul di sini...'}</span>
                {isListening && (
                  <span style={{ 
                    fontWeight: 700, 
                    color: timeLeft <= 30 ? 'var(--c-danger)' : 'var(--c-navy-900)',
                    background: timeLeft <= 30 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(15, 23, 42, 0.05)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px'
                  }}>
                    ⏱ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </span>
                )}
              </div>
              <strong>{transcript}</strong>
            </div>

            <button 
              id="stop-btn"
              onClick={toggleListening} 
              className={isListening ? "btn btn-outline" : "btn btn-primary"}
              style={{ padding: '1rem 2rem', fontSize: '1.125rem', borderColor: isListening ? 'var(--c-danger)' : '', color: isListening ? 'var(--c-danger)' : '' }}
            >
              {isListening ? '⏹ Selesai Menjawab' : '🎙 Mulai Menjawab'}
            </button>
          </div>
        )}

        {status === 'feedback' && (
          <div className="animate-fade-in" style={{ textAlign: 'left' }}>
            <h2 style={{ marginBottom: 'var(--sp-md)', textAlign: 'center' }}>Evaluasi Jawaban</h2>
            
            {isProcessing ? (
              <div className="flex-center" style={{ padding: 'var(--sp-2xl) 0', flexDirection: 'column' }}>
                <span className="dot-typing" style={{ marginBottom: 'var(--sp-md)' }}></span>
                <p>Menganalisis jawaban Anda...</p>
              </div>
            ) : (
              <>
                <div style={{ background: 'rgba(244, 209, 96, 0.1)', border: '1px solid var(--c-gold-500)', padding: 'var(--sp-lg)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--sp-xl)' }}>
                  <h4 style={{ color: 'var(--c-navy-900)', marginBottom: 'var(--sp-md)' }}>💡 Feedback Panelis AI</h4>
                  <div className="markdown-content" style={{ opacity: 0.9, lineHeight: 1.6 }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{feedback}</ReactMarkdown>
                  </div>
                </div>

                <div className="flex-center">
                  <button onClick={() => {
                    let nextQ = "Bagaimana Anda menangani tekanan saat harus mengambil keputusan cepat tanpa data yang lengkap?";
                    const nextQMatch = feedback.match(/PERTANYAAN:\s*(.*)/i);
                    if (nextQMatch && nextQMatch[1]) {
                      nextQ = nextQMatch[1].trim();
                    }
                    setQuestion(nextQ);
                    startInterview(nextQ);
                  }} className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
                    Lanjut Pertanyaan Berikutnya
                  </button>
                </div>
              </>
            )}
          </div>
        )}

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
