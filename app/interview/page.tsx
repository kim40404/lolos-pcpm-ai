"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Send, Bot, User, ArrowLeft } from 'lucide-react';

export default function AIChatbotPage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    { role: 'assistant', content: 'Halo! Saya AI Chatbot khusus persiapan PCPM BI. Ada yang bisa saya bantu terkait tes potensi dasar, wawasan kebanksentralan, atau tips belajar hari ini?' }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  useEffect(() => {
    if (sessionStatus === 'unauthenticated') {
      router.push('/pricing');
    }
  }, [sessionStatus, session, router]);

  if (sessionStatus === 'loading') return <div className="container flex-center" style={{ height: '100vh' }}><div className="dot-typing"></div></div>;
  if (sessionStatus === 'unauthenticated') return null;

  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMsg = input.trim();
    setInput('');
    const newHistory = [...messages, { role: 'user', content: userMsg }];
    setMessages(newHistory);
    setIsProcessing(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory,
          contextType: 'general'
        })
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessages([...newHistory, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages([...newHistory, { role: 'assistant', content: `[ERROR] ${data.error}` }]);
      }
    } catch (err) {
      setMessages([...newHistory, { role: 'assistant', content: '[ERROR] Gagal terhubung ke AI.' }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="bg-slate-50 dark:bg-slate-950 min-h-[calc(100vh-72px)] py-8 px-4">
      <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 relative z-10">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border border-blue-200 dark:border-blue-800 overflow-hidden">
                <img src="/bi-icon-color.svg" className="w-6 h-6 object-contain" alt="BI Bot" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">PCPM BI Chatbot</h1>
                <p className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Online
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-slate-950/50 scroll-smooth relative">
          <img src="/bi-logo-white.png" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 opacity-5 pointer-events-none" alt="" />
          
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 max-w-[85%] relative z-10 ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
              <div className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full overflow-hidden ${msg.role === 'user' ? 'bg-slate-800 text-white' : 'bg-blue-100 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <img src="/bi-icon-color.svg" className="w-5 h-5 object-contain" alt="BI Bot" />}
              </div>
              
              <div className={`p-4 rounded-2xl shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-slate-900 dark:bg-slate-800 text-white rounded-tr-none' 
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
              }`}>
                {msg.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  <div className="markdown-body text-sm leading-relaxed prose dark:prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex gap-4 max-w-[85%]">
              <div className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl rounded-tl-none flex items-center gap-1 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <form onSubmit={sendMessage} className="relative max-w-4xl mx-auto flex items-end gap-2">
            <div className="relative w-full">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Tanyakan strategi TPD, wawasan BI, dll..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32 min-h-[52px] text-slate-900 dark:text-white"
                rows={1}
                disabled={isProcessing}
                style={{ overflow: 'hidden' }}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isProcessing}
              className="shrink-0 w-[52px] h-[52px] flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-2xl transition-colors shadow-md disabled:shadow-none"
            >
              <Send className="w-5 h-5 ml-1" />
            </button>
          </form>
          <div className="text-center mt-2 text-xs text-slate-400 font-medium">
            Shift + Enter untuk baris baru. AI dapat membuat kesalahan, mohon verifikasi informasi penting.
          </div>
        </div>

      </div>

      <style jsx global>{`
        .markdown-body p { margin-bottom: 0.75em; }
        .markdown-body p:last-child { margin-bottom: 0; }
        .markdown-body ul, .markdown-body ol { margin-bottom: 0.75em; padding-left: 1.5em; }
        .markdown-body li { margin-bottom: 0.25em; }
        .markdown-body strong { font-weight: 600; color: inherit; }
      `}</style>
    </main>
  );
}
