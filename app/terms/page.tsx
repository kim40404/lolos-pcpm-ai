export default function TermsPage() {
  return (
    <main className="container" style={{ padding: 'var(--sp-3xl) 0', minHeight: 'calc(100vh - 72px)' }}>
      <div className="glass-card" style={{ padding: 'var(--sp-2xl)' }}>
        <h1 style={{ marginBottom: 'var(--sp-lg)' }}>Syarat dan Ketentuan (Terms of Service)</h1>
        <div className="prose">
          <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
          
          <h3 style={{ marginTop: 'var(--sp-xl)' }}>1. Penerimaan Syarat</h3>
          <p>Dengan mengakses atau menggunakan platform LolosPCPM.ai, Anda menyetujui untuk terikat oleh Syarat dan Ketentuan ini. Selama masa Beta Test, layanan ini disediakan "sebagaimana adanya".</p>
          
          <h3 style={{ marginTop: 'var(--sp-xl)' }}>2. Peringatan & Disclaimer Hukum (SANGAT PENTING)</h3>
          <div style={{ padding: '16px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', color: '#ff8a8a', fontWeight: 'bold' }}>
            <p>LolosPCPM adalah platform simulasi pelatihan independen dan TIDAK berafiliasi, didukung, disponsori, atau bekerja sama dengan Bank Indonesia (BI) maupun panitia seleksi resmi manapun.</p>
            <p style={{ marginTop: '8px' }}>Seluruh materi, soal ujian, dan analisis pada platform ini merupakan hasil sintesis kecerdasan buatan (AI) yang disusun berdasarkan literatur publik dan tidak menggunakan data internal yang bersifat rahasia. Platform ini murni bertujuan sebagai sarana berlatih dan kami tidak memberikan jaminan kelulusan apa pun terhadap penggunanya.</p>
          </div>

          <h3 style={{ marginTop: 'var(--sp-xl)' }}>3. Penggunaan Layanan</h3>
          <p>Anda setuju untuk menggunakan layanan ini hanya untuk persiapan seleksi secara pribadi dan tidak membagikan token akses, menduplikasi, atau menjual ulang fitur-fitur di dalam platform.</p>
          
          <h3 style={{ marginTop: 'var(--sp-xl)' }}>3. Beta Testing & Kuota</h3>
          <p>Selama fase Beta, pengguna diberikan kuota terbatas berupa Token AI. Kami berhak mengubah jumlah token, membatasi akses, atau mereset data pengguna sewaktu-waktu untuk keperluan perbaikan sistem tanpa pemberitahuan sebelumnya.</p>
        </div>
      </div>
    </main>
  );
}
