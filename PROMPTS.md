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
Baca docs/user-stories.md bagian US-02.

Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.

**Hasil:**
Fitur US-02 (Detail produk) telah selesai diimplementasikan.

File yang diubah
page.jsx
Mengambil data satu produk dari tabel produk di Supabase berdasarkan id di URL menggunakan createServerClient di sisi server.
Menjalankan notFound() bila produk tidak ditemukan atau terjadi kesalahan saat pencarian (misalnya format ID tidak valid).
Menampilkan foto, kategori, nama, harga, dan deskripsi dari database tanpa mengubah struktur maupun styling tampilan.
Menghapus komponen CatatanBelumAktif dan referensi ke data-contoh.js, sementara komponen TombolWhatsApp tetap dipertahankan.
Cara mengetes
Buka halaman utama katalog di http://localhost:3000.
Klik salah satu produk untuk membuka halaman detailnya (contoh: http://localhost:3000/produk/1). Pastikan foto, kategori, nama, harga format rupiah, dan deskripsi produk tampil sesuai dengan data di tabel produk Supabase.
Coba akses ID produk yang tidak ada di database (contoh: http://localhost:3000/produk/99999 atau http://localhost:3000/produk/tidak-ada). Pastikan halaman diarahkan ke tampilan "Halaman tidak ditemukan" (app/not-found.jsx).

**Perbaikan:**

## US-03 Pesan via WhatsApp

**Prompt:**
Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)".

Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.

**Hasil:**
Fitur US-03 (Pesan via WhatsApp) telah selesai diimplementasikan.

File yang diubah
TombolWhatsApp.jsx
Mengubah elemen <button> menjadi elemen tautan <a> dengan target tab baru (target="\_blank" dan rel="noopener noreferrer").
Mengarahkan tautan ke format URL https://wa.me/<nomor>?text=<pesan> menggunakan nomorWhatsApp dari lib/toko.js.
Mengisi teks pesan otomatis dengan nama produk dan harga produk berformat rupiah (menggunakan formatRupiah), serta di-encode dengan encodeURIComponent.
Menjaga tampilan tombol tetap konsisten dengan styling sebelumnya.
page.jsx (detail produk)
Memastikan komponen CatatanBelumAktif terkait US-03 sudah dihapus dari halaman detail produk.
Cara mengetes
Buka salah satu halaman detail produk di browser (misalnya http://localhost:3000/produk/1).
Klik tombol Pesan via WhatsApp.
Pastikan browser membuka tab baru menuju WhatsApp (https://wa.me/62...) dengan nomor toko sesuai konfigurasi dan teks pesan otomatis yang memuat nama produk beserta harga rupiahnya (contoh: Halo, saya ingin memesan Kopi Bubuk Robusta 250 g seharga Rp 45.000.).

**Perbaikan:**

## US-04 Login admin

**Prompt:**
Baca AGENTS.md bagian aturan keamanan dan docs/user-stories.md bagian US-04.

Buat login admin memakai Supabase Auth (email dan password) dengan @supabase/ssr dan cookie, memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY. Login diproses dengan Server Action di app/admin/actions.js dan disambungkan ke form di app/admin/login/page.jsx. Login berhasil diarahkan ke /admin; login gagal menampilkan pesan error yang jelas di halaman login. Buat juga tombol "Keluar" di components/NavAdmin.jsx berfungsi: mengakhiri sesi lalu kembali ke /admin/login. Jangan ubah tampilan. Hapus CatatanBelumAktif dari halaman login.

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
