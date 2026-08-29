"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { generateVerbal, generateNumerikal, generateDigitSimbol, generateDiagram, Question } from '@/lib/generators';

// We need to unwrap params in Next.js 15+ App Router if it's dynamic
export default function DrillSession({ params }: { params: Promise<{ category: string }> }) {
  const router = useRouter();
  const { category } = use(params);
  
  const [status, setStatus] = useState<'start' | 'playing' | 'finished'>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{q: Question, ans: string, isCorrect: boolean}[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const config = {
    'verbal': { title: 'Verbal Sprint', timePerQ: 30, generator: generateVerbal, color: 'var(--c-blue-400)' },
    'numerikal': { title: 'Numerikal Sprint', timePerQ: 20, generator: generateNumerikal, color: 'var(--c-success)' },
    'digitsimbol': { title: 'Digit Simbol Sprint', timePerQ: 5, generator: generateDigitSimbol, color: 'var(--c-warning)' },
    'diagram': { title: 'Diagrammatical Sprint', timePerQ: 25, generator: generateDiagram, color: '#8B5CF6' }
  };

  const currConfig = config[category as keyof typeof config];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (status === 'playing' && timeLeft === 0) {
      // Time is up
      handleAnswer('');
    }
    return () => clearTimeout(timer);
  }, [timeLeft, status]);

  if (!isClient) return null;

  if (!currConfig) {
    return (
      <div className="container flex-center" style={{ minHeight: '60vh', flexDirection: 'column' }}>
        <h2>Kategori tidak ditemukan</h2>
        <Link href="/drill" className="btn btn-primary" style={{ marginTop: 'var(--sp-md)' }}>Kembali</Link>
      </div>
    );
  }

  const startGame = () => {
    // Generate 10 questions
    const qs = [];
    for(let i=0; i<10; i++) {
      qs.push(currConfig.generator());
    }
    setQuestions(qs);
    setCurrentIndex(0);
    setScore(0);
    setUserAnswers([]);
    setStatus('playing');
    setTimeLeft(currConfig.timePerQ);
  };

  const handleAnswer = (ans: string) => {
    const q = questions[currentIndex];
    const isCorrect = ans === q.answer;
    if (isCorrect) setScore(s => s + 1);
    
    setUserAnswers(prev => [...prev, { q, ans, isCorrect }]);

    if (currentIndex < 9) {
      setCurrentIndex(curr => curr + 1);
      setTimeLeft(currConfig.timePerQ);
    } else {
      setStatus('finished');
    }
  };

  if (status === 'start') {
    return (
      <main className="container flex-center" style={{ minHeight: 'calc(100vh - 72px)' }}>
        <div className="glass-card animate-fade-in" style={{ textAlign: 'center', maxWidth: '600px', borderTop: `4px solid ${currConfig.color}` }}>
          <h1 style={{ marginBottom: 'var(--sp-md)' }}>{currConfig.title}</h1>
          <p style={{ fontSize: '1.125rem', marginBottom: 'var(--sp-sm)', opacity: 0.8 }}>
            Sesi latihan ini berisi 10 soal acak.
          </p>
          <div style={{ background: 'rgba(0,0,0,0.05)', padding: 'var(--sp-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--sp-xl)' }}>
            <strong>⏱️ Batas Waktu:</strong> {currConfig.timePerQ} detik per soal
          </div>
          <button onClick={startGame} className="btn btn-primary" style={{ width: '100%', fontSize: '1.25rem', padding: '1rem' }}>
            MULAI LATIHAN
          </button>
          <Link href="/drill" style={{ display: 'block', marginTop: 'var(--sp-md)', color: 'var(--c-navy-800)' }}>
            ← Kembali ke Hub
          </Link>
        </div>
      </main>
    );
  }

  if (status === 'finished') {
    const accuracy = Math.round((score / 10) * 100);
    return (
      <main className="container" style={{ padding: 'var(--sp-2xl) 0' }}>
        <div className="glass-card animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--sp-xl)' }}>
            <h2>Sesi Selesai!</h2>
            <div style={{ fontSize: '4rem', fontWeight: 800, color: accuracy >= 80 ? 'var(--c-success)' : accuracy >= 50 ? 'var(--c-warning)' : 'var(--c-danger)' }}>
              {score}/10
            </div>
            <p style={{ opacity: 0.7 }}>Akurasi: {accuracy}%</p>
          </div>

          <h3 style={{ marginBottom: 'var(--sp-md)' }}>Review Jawaban:</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)' }}>
            {userAnswers.map((ua, i) => (
              <div key={i} style={{ padding: 'var(--sp-md)', background: ua.isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)', borderLeft: `4px solid ${ua.isCorrect ? 'var(--c-success)' : 'var(--c-danger)'}` }}>
                <div style={{ fontSize: '0.875rem', opacity: 0.7, marginBottom: '4px' }}>Soal {i+1}</div>
                <div style={{ whiteSpace: 'pre-wrap', fontWeight: 600, marginBottom: 'var(--sp-sm)' }}>{ua.q.question}</div>
                <div style={{ fontSize: '0.875rem' }}>
                  <strong>Jawabanmu:</strong> {ua.ans || '(Waktu Habis)'} <br/>
                  {!ua.isCorrect && <><strong style={{ color: 'var(--c-success)' }}>Kunci:</strong> {ua.q.answer}</>}
                </div>
                {ua.q.explanation && (
                  <div style={{ marginTop: '8px', fontSize: '0.875rem', opacity: 0.8, fontStyle: 'italic' }}>
                    💡 {ua.q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex-center" style={{ marginTop: 'var(--sp-xl)', gap: 'var(--sp-md)' }}>
            <button onClick={startGame} className="btn btn-primary">Ulangi Kategori Ini</button>
            <Link href="/drill" className="btn btn-outline">Kategori Lain</Link>
          </div>
        </div>
      </main>
    );
  }

  const q = questions[currentIndex];
  const progressPercent = (timeLeft / currConfig.timePerQ) * 100;
  
  return (
    <main className="container" style={{ padding: 'var(--sp-2xl) 0', maxWidth: '800px' }}>
      
      {/* Header Info */}
      <div className="flex-between" style={{ marginBottom: 'var(--sp-md)' }}>
        <div style={{ fontWeight: 600, fontSize: '1.25rem' }}>Soal {currentIndex + 1} <span style={{ opacity: 0.5 }}>/ 10</span></div>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: timeLeft <= 5 ? 'var(--c-danger)' : 'inherit' }}>
          00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
        </div>
      </div>
      
      {/* Timer Bar */}
      <div style={{ width: '100%', height: '8px', background: 'var(--c-slate-100)', borderRadius: '4px', overflow: 'hidden', marginBottom: 'var(--sp-xl)' }}>
        <div style={{ 
          width: `${progressPercent}%`, 
          height: '100%', 
          background: timeLeft <= 5 ? 'var(--c-danger)' : currConfig.color,
          transition: 'width 1s linear, background-color 0.3s ease'
        }}></div>
      </div>

      {/* Question Card */}
      <div className="glass-card animate-fade-in" key={q.id}>
        <div style={{ whiteSpace: 'pre-wrap', fontSize: '1.25rem', fontWeight: 500, marginBottom: 'var(--sp-xl)', lineHeight: 1.6 }}>
          {q.question}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-sm)' }}>
          {q.options.map((opt, idx) => (
            <button 
              key={idx} 
              onClick={() => handleAnswer(opt)}
              className="btn btn-outline" 
              style={{ justifyContent: 'flex-start', padding: '1rem', width: '100%', fontSize: '1rem', border: '1px solid var(--c-slate-800)' }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

    </main>
  );
}
