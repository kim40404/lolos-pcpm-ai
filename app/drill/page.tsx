import Link from 'next/link';

export default function DrillHub() {
  const drills = [
    {
      id: 'verbal',
      title: 'Verbal Sprint',
      desc: 'Latih insting logika bahasamu. Analisis teks pendek dan tentukan kesimpulannya dalam 30 detik.',
      icon: '📖',
      color: '#2C74B3'
    },
    {
      id: 'numerikal',
      title: 'Numerikal Sprint',
      desc: 'Asah ketajaman pola angkamu. Temukan deret angka yang hilang dengan cepat di bawah 20 detik.',
      icon: '🔢',
      color: '#10B981'
    },
    {
      id: 'digitsimbol',
      title: 'Digit Simbol Sprint',
      desc: 'Tantang memori visualmu. Cocokkan urutan sandi abstrak dengan kecepatan kilat.',
      icon: '🔣',
      color: '#F59E0B'
    },
    {
      id: 'diagram',
      title: 'Diagrammatical Sprint',
      desc: 'Latih spasial analitikmu. Temukan pola dan klasifikasikan gambar ke dalam kategori X atau Y.',
      icon: '🔷',
      color: '#8B5CF6'
    }
  ];

  return (
    <main style={{ padding: 'var(--sp-2xl) 0', minHeight: 'calc(100vh - 72px)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--sp-2xl)' }}>
          <h1 className="animate-fade-in text-gradient">Speed Drill Hub</h1>
          <p className="animate-fade-in stagger-1" style={{ color: 'var(--c-slate-900)', opacity: 0.7, marginTop: 'var(--sp-sm)', fontSize: '1.125rem' }}>
            Pilih kategori untuk memulai latihan kilat. Tiap sesi berisi 10 soal acak.
          </p>
        </div>

        <div className="grid-3 animate-fade-in stagger-2">
          {drills.map((drill) => (
            <div key={drill.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', borderTop: `4px solid ${drill.color}` }}>
              <div style={{ fontSize: '3rem', marginBottom: 'var(--sp-sm)' }}>{drill.icon}</div>
              <h3 style={{ marginBottom: 'var(--sp-xs)' }}>{drill.title}</h3>
              <p style={{ color: 'var(--c-slate-800)', opacity: 0.8, flexGrow: 1, marginBottom: 'var(--sp-lg)' }}>
                {drill.desc}
              </p>
              <Link href={`/drill/${drill.id}`} className="btn btn-outline" style={{ width: '100%' }}>
                Mulai {drill.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
