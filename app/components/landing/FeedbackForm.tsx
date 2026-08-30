"use client";

import { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

export default function FeedbackForm() {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    
    setStatus('loading');
    
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, email }),
      });
      
      if (res.ok) {
        setStatus('success');
        setMessage('');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-slate-900/80 backdrop-blur-md rounded-[2rem] p-10 shadow-2xl border border-emerald-500/30 flex flex-col items-center justify-center text-center h-full min-h-[350px]">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Terima Kasih!</h3>
        <p className="text-slate-400 text-lg">Masukan Anda sangat berharga dan telah tersimpan di sistem kami.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors font-semibold"
        >
          Kirim Masukan Lain
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/80 backdrop-blur-md rounded-[2rem] p-10 shadow-2xl border border-slate-700/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>
      <h3 className="text-3xl font-bold text-white mb-2">Bantu Kami Berkembang</h3>
      <p className="text-slate-400 mb-8 text-lg">Kami membaca setiap masukan yang masuk.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Email (Opsional)</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com" 
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Pesan & Masukan</label>
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4} 
            placeholder="Ceritakan pengalaman Anda, fitur apa yang kurang, atau bug apa yang Anda temukan..." 
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
            required
          ></textarea>
        </div>
        
        {status === 'error' && (
          <p className="text-red-400 text-sm">Gagal mengirim masukan. Silakan coba lagi.</p>
        )}

        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="w-full bg-blue-600 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-xl hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Mengirim...</>
          ) : (
            <><Send className="w-5 h-5" /> Kirim Feedback Langsung</>
          )}
        </button>
      </form>
    </div>
  );
}
