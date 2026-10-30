# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
Baca AGENTS.md dan docs/user-stories.md bagian US-01.

Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.

Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
Fitur US-01 (Katalog dari database) telah selesai dikerjakan sesuai spesifikasi dan aturan di AGENTS.md.

File yang dibuat & diubah
server.js & index.js (dibuat)
Membuat fungsi createServerClient yang menginisialisasi klien Supabase di sisi server menggunakan process.env.SUPABASE_URL dan process.env.SUPABASE_SECRET_KEY dengan opsi persistSession: false.
page.jsx (diubah)
Mengubah komponen menjadi Server Component async yang mengambil data langsung dari tabel produk di Supabase.
Menampilkan produk menggunakan komponen KartuProduk tanpa mengubah tampilannya.
Menangani error dengan menampilkan pesan kesalahan yang jelas di halaman jika koneksi atau kueri gagal.
Menampilkan teks "Belum ada produk" jika tabel kosong.
Menghapus komponen CatatanBelumAktif dan ketergantungan pada lib/data-contoh.js.
Cara mengetes
Pastikan konfigurasi environment:
Pastikan variabel SUPABASE_URL dan SUPABASE_SECRET_KEY sudah terisi di .env.local (dan di Vercel jika dideploy).
Pastikan skema tabel produk di database Supabase sudah dieksekusi dari schema.sql.
Jalankan aplikasi:
Jalankan npm run dev di terminal.
Buka browser di http://localhost:3000.
Uji skenario:
Katalog normal: Pastikan daftar kartu produk tampil sesuai data dari tabel produk di Supabase lengkap dengan foto, kategori, nama, dan harga format rupiah (bukan dari lib/data-contoh.js).
Tabel kosong: Jika data di tabel produk dikosongkan, halaman akan menampilkan tulisan "Belum ada produk".
Error handling: Jika environment variable atau URL Supabase sengaja dibuat salah, halaman akan menampilkan pesan error yang informatif alih-alih mengalami crash/500.

**Perbaikan:**

## US-02 Detail produk

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-03 Pesan via WhatsApp

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-04 Login admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-05 Ganti password

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-06 Proteksi halaman admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
