export default function PrivacyPage() {
  return (
    <main className="container" style={{ padding: 'var(--sp-3xl) 0', minHeight: 'calc(100vh - 72px)' }}>
      <div className="glass-card" style={{ padding: 'var(--sp-2xl)' }}>
        <h1 style={{ marginBottom: 'var(--sp-lg)' }}>Kebijakan Privasi (Privacy Policy)</h1>
        <div className="prose">
          <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
          
          <h3 style={{ marginTop: 'var(--sp-xl)' }}>1. Pengumpulan Data</h3>
          <p>Kami mengumpulkan informasi dasar saat Anda mendaftar, seperti nama dan email. Kami juga merekam respons audio Anda saat menggunakan fitur Simulasi FGD semata-mata untuk keperluan pemrosesan AI secara real-time dan penilaian performa.</p>
          
          <h3 style={{ marginTop: 'var(--sp-xl)' }}>2. Penggunaan Data</h3>
          <p>Data metrik performa Anda dianalisis oleh AI kami (AI Personal Coach) untuk menghasilkan evaluasi kelemahan. Kami tidak pernah menjual data Anda ke pihak ketiga.</p>
          
          <h3 style={{ marginTop: 'var(--sp-xl)' }}>3. Masa Beta Testing</h3>
          <p>Mengingat platform masih berada dalam masa Beta Test, data riwayat latihan Anda mungkin tidak disimpan secara permanen dan bisa dihapus secara berkala selama pemeliharaan server.</p>
        </div>
      </div>
    </main>
  );
}
