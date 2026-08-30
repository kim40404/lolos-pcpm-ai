'use client';

import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function FloatingDisclaimer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-red-600/20 hover:bg-red-600/40 border border-red-500/50 text-red-500 p-3 rounded-full shadow-lg backdrop-blur-md transition-all hover:scale-110 group flex items-center justify-center"
        title="Peringatan Hukum"
      >
        <AlertTriangle className="w-6 h-6" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#010408] border border-red-900/50 rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="text-red-500 w-6 h-6" />
              Disclaimer Hukum
            </h3>
            
            <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
              <p>
                LolosPCPM adalah <strong>platform edukasi independen</strong> yang dibangun secara mandiri untuk membantu para kandidat mempersiapkan diri menghadapi seleksi kepegawaian. Platform ini <strong>SAMA SEKALI TIDAK berafiliasi, tidak disponsori, tidak didukung, dan tidak memiliki hubungan kerja sama dalam bentuk apa pun dengan Bank Indonesia (BI)</strong> maupun panitia seleksi resmi PCPM.
              </p>
              <p>
                Seluruh materi pelajaran, format soal, dan analisis kecerdasan buatan (AI) di dalam aplikasi ini disusun berdasarkan <strong>literatur publik dari website resmi www.bi.go.id</strong>, pengalaman umum, dan pedoman asesmen standar. Tidak ada satupun data rahasia atau soal bocoran asli yang digunakan. Ini murni merupakan alat bantu (simulator) pembelajaran, dan kami <strong>tidak menjamin kelulusan absolut</strong> bagi para penggunanya.
              </p>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
