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
Fitur US-04 (Login admin) telah selesai diimplementasikan sesuai aturan keamanan di AGENTS.md.

File yang dibuat & diubah
server.js
Menambahkan fungsi createSessionClient() yang menggunakan @supabase/ssr, cookies() dari next/headers, process.env.SUPABASE_URL, dan process.env.SUPABASE_PUBLISHABLE_KEY untuk mengelola sesi login admin berbasis cookie di server.
actions.js (dibuat)
Membuat Server Action login untuk memproses autentikasi email & password dengan supabase.auth.signInWithPassword. Jika berhasil dialihkan ke /admin, dan jika gagal mengembalikan pesan kesalahan yang jelas.
Membuat Server Action logout (alias keluar) yang memanggil supabase.auth.signOut() lalu mengalihkan pengguna kembali ke /admin/login.
page.jsx (login)
Menghubungkan formulir ke Server Action login dengan useActionState.
Menampilkan pesan error di atas formulir saat login gagal tanpa mengubah desain tata letak.
Menghapus komponen CatatanBelumAktif.
NavAdmin.jsx
Menghubungkan tombol "Keluar" ke Server Action logout sehingga mengakhiri sesi admin dan kembali ke /admin/login dengan tampilan yang tetap sama.
Cara mengetes
Buka halaman login admin di http://localhost:3000/admin/login.
Uji login gagal:
Masukkan email atau password yang salah, lalu klik tombol Masuk.
Pastikan muncul pesan kesalahan yang jelas (contoh: "Email atau password salah. Silakan coba lagi.") dan tetap berada di halaman login.
Uji login berhasil:
Masukkan email dan password admin Supabase yang valid, lalu klik Masuk.
Pastikan berhasil masuk dan dialihkan ke halaman /admin.
Uji tombol keluar:
Di halaman /admin, klik tombol Keluar pada bilah navigasi admin.
Pastikan sesi login berakhir dan halaman kembali dialihkan ke /admin/login.

**Perbaikan:**

## US-05 Ganti password

**Prompt:**
Baca docs/user-stories.md bagian US-05.

Buat Server Action ganti password di app/admin/actions.js untuk admin yang sedang login, memakai Supabase Auth. Validasi di server: password baru minimal 8 karakter dan harus sama dengan konfirmasi. Tampilkan pesan berhasil atau pesan error yang jelas di halaman. Sambungkan ke form di app/admin/password/page.jsx tanpa mengubah tampilannya. Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
Fitur US-05 (Ganti password) telah selesai diimplementasikan.

File yang diubah
actions.js
Menambahkan Server Action gantiPassword:
Memeriksa sesi admin di server menggunakan supabase.auth.getUser().
Melakukan validasi di sisi server bahwa password baru minimal 8 karakter dan sama persis dengan konfirmasi password.
Memperbarui password admin yang sedang aktif menggunakan supabase.auth.updateUser({ password }).
Mengembalikan pesan error atau pesan berhasil.
page.jsx (ganti password)
Menghubungkan form ke Server Action gantiPassword dengan useActionState.
Menampilkan notifikasi pesan berhasil atau pesan kesalahan di atas form tanpa mengubah tampilan asli.
Menghapus komponen CatatanBelumAktif.
Cara mengetes
Masuk ke halaman admin terlebih dahulu melalui http://localhost:3000/admin/login.
Buka menu Ganti password (http://localhost:3000/admin/password).
Uji validasi error:
Masukkan password baru kurang dari 8 karakter (misal: 12345) atau masukkan konfirmasi yang tidak cocok, lalu klik Simpan password. Pastikan muncul pesan kesalahan yang jelas.
Uji ganti password berhasil:
Masukkan password baru minimal 8 karakter (misal: PasswordBaru123!) dan konfirmasi yang sama, lalu klik Simpan password.
Pastikan muncul pesan sukses: "Password berhasil diperbarui."
Uji sesi login dengan password baru:
Klik Keluar di bilah navigasi admin.
Coba masuk kembali di /admin/login menggunakan password baru untuk memastikan password telah berhasil diperbarui di Supabase Auth.

**Perbaikan:**

## US-06 Proteksi halaman admin

**Prompt:**
Baca AGENTS.md aturan keamanan nomor 3 dan 4, dan docs/user-stories.md bagian US-06.

Buat file proxy.js di root proyek (Next.js 16). Semua rute /admin kecuali /admin/login wajib login dengan Supabase Auth; kalau belum login, alihkan ke /admin/login. Pastikan juga setiap Server Action yang mengubah data memeriksa login di server. Hapus CatatanBelumAktif dari halaman /admin.

**Hasil:**
Fitur US-06 (Proteksi halaman admin) telah selesai diimplementasikan sesuai aturan keamanan 3 & 4 di AGENTS.md.

File yang dibuat & diubah
proxy.js (dibuat di root proyek)
Menggunakan konvensi Next.js 16 (proxy.js) untuk memproteksi rute /admin.
Menggunakan @supabase/ssr untuk memeriksa status autentikasi admin via cookie dengan supabase.auth.getUser().
Menjaga dan memperbarui cookie sesi jika ada rotasi token.
Mengalihkan setiap akses ke rute /admin dan seluruh sub-halamannya (kecuali /admin/login) ke /admin/login jika pengguna belum login.
actions.js
Memastikan setiap Server Action yang mengubah data (seperti gantiPassword) memvalidasi sesi admin terlebih dahulu di sisi server sebelum mengeksekusi perubahan.
page.jsx (admin)
Menghapus komponen CatatanBelumAktif dari halaman utama admin.
Cara mengetes
Buka jendela browser baru dalam mode penyamaran (incognito) agar tidak ada sesi login yang tersimpan.
Uji proteksi halaman admin tanpa login:
Coba buka http://localhost:3000/admin. Pastikan langsung dialihkan ke http://localhost:3000/admin/login.
Coba buka http://localhost:3000/admin/password. Pastikan juga langsung dialihkan ke http://localhost:3000/admin/login.
Uji akses setelah login:
Masuk di http://localhost:3000/admin/login dengan akun admin yang valid.
Setelah berhasil login, pastikan halaman /admin dan /admin/password dapat dibuka secara normal.

**Perbaikan:**

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
