# LolosPCPM: Platform Edukasi & Simulasi PCPM Independen

LolosPCPM adalah platform edukasi interaktif berbasis kecerdasan buatan (AI) yang dirancang secara mandiri untuk membantu para kandidat mempersiapkan diri menghadapi seleksi Pendidikan Calon Pegawai Muda (PCPM) Bank Indonesia. 

Platform ini menggabungkan analisis performa real-time, simulasi wawancara adaptif, dan studi kasus kebijakan makroekonomi dalam satu ekosistem berbasis data.

> **Disclaimer Hukum**: LolosPCPM adalah platform edukasi independen. Kami SAMA SEKALI TIDAK berafiliasi, disponsori, atau bekerja sama dengan Bank Indonesia (BI) maupun panitia penyelenggara resmi. Seluruh materi merupakan hasil sintesis AI berdasarkan pedoman publik dan tidak menggunakan data internal/rahasia.

---

## Arsitektur Teknis

Sistem ini dibangun menggunakan *stack* teknologi modern untuk menjamin skalabilitas, keamanan, dan performa tinggi:

- **Framework**: Next.js 14+ (App Router)
- **Bahasa Pemrograman**: TypeScript
- **Database**: PostgreSQL (Di-hosting via Supabase)
- **ORM**: Prisma
- **Autentikasi**: NextAuth.js (Session & Credentials)
- **Kecerdasan Buatan**: Vercel AI SDK terintegrasi dengan HuggingFace Inference API (Qwen/Llama Models)
- **Styling**: Tailwind CSS & Glassmorphism UI Components

---

## Fitur Utama

1. **AI Policy Simulator**
   Menguji kemampuan analitik makroekonomi pengguna dengan memberikan skenario ekonomi fiktif yang *real-time*. AI akan mengevaluasi keputusan pengguna (misalnya menaikkan suku bunga saat inflasi) berdasarkan literatur resmi perbankan sentral.

2. **AI Interview Coach**
   Simulasi wawancara panel (Behavioral Event Interview & Studi Kasus) di mana AI berperan sebagai direktur penilai yang tajam, kritis, dan adaptif terhadap respons pengguna.

3. **Dashboard Analitik Presisi**
   Melacak *pace* (kecepatan per soal) dan akurasi pengguna dalam menjawab Tryout Potensi Dasar (TPD), mengidentifikasi kelemahan secara otomatis.

4. **Sistem Token & Kuota AI**
   Terintegrasi langsung ke dalam skema *database*, mengontrol penggunaan *inference* AI harian pengguna guna menekan beban *server*.

---

## Petunjuk Instalasi (Local Development)

Untuk menjalankan proyek ini secara lokal, pastikan Anda telah memasang **Node.js (v18+)** dan memiliki akses ke akun **Supabase** serta **Hugging Face**.

1. **Kloning Repositori**
   ```bash
   git clone https://github.com/kim40404/lolos-pcpm-ai.git
   cd lolos-pcpm-ai
   ```

2. **Instalasi Dependensi**
   ```bash
   npm install
   ```

3. **Pengaturan Environment Variables**
   Buat file `.env` di *root directory* dan isi dengan konfigurasi berikut:
   ```env
   DATABASE_URL="postgres://[USER]:[PASSWORD]@[HOST]:5432/postgres"
   DIRECT_URL="postgres://[USER]:[PASSWORD]@[HOST]:5432/postgres"
   NEXTAUTH_SECRET="random_string_panjang_untuk_enkripsi"
   NEXTAUTH_URL="http://localhost:3000"
   HUGGINGFACE_API_KEY="hf_xxxxxxxxxxxxxxxxxxx"
   ```

4. **Migrasi Database**
   Sinkronkan skema Prisma dengan database PostgreSQL Anda:
   ```bash
   npx prisma db push
   ```

5. **Jalankan Server**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000`.

---

## Hak Cipta & Lisensi
Penggunaan kode sumber ini ditujukan eksklusif untuk operasional platform LolosPCPM. Dilarang keras melakukan duplikasi, distribusi ulang, atau komersialisasi *source code* tanpa izin dari pengembang utama.
