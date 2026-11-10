# Digital Wedding Invitation - Aditya & Anindya

Website Undangan Pernikahan Digital (Digital Wedding Invitation) yang elegan, modern, minimalis, dan premium menggunakan **HTML5**, **CSS3**, dan **Vanilla JavaScript** murni tanpa framework tambahan.

---

## 🎨 Konsep & Tema Desain
- **Tema:** *Elegant Modern Wedding*
- **Gaya Visual:** Minimalist, romantic, clean, dan luxurious
- **Color Palette:**
  - Background Utama: Warm Alabaster / Ivory (`#FAF8F5`)
  - Permukaan Alternatif: Soft Champagne Beige (`#F4EFEB`)
  - Aksen Mewah: Muted Warm Gold (`#C5A880`, `#A68758`)
  - Teks: Deep Charcoal Espresso (`#2C2723`) & Warm Taupe (`#6B635B`)
- **Tipografi:**
  - Heading: *Cormorant Garamond* (Serif Elegan)
  - Monogram & Aksen: *Great Vibes* (Romantic Cursive)
  - Body & UI: *Plus Jakarta Sans* (Clean, Modern Sans-Serif)

---

## 📂 Struktur Proyek
```
wedding-invitation/
├── index.html                  # Halaman utama & seluruh section
├── css/
│   └── style.css              # Styling responsif, animasi, & tema warna
├── js/
│   └── script.js              # Interaktivitas, countdown, audio, lightbox, RSVP
├── assets/
│   ├── images/
│   │   └── floral-divider.svg # Ornamen botanical floral SVG
│   └── music/
│       └── wedding-song.wav   # Musik latar romantis akustik
└── README.md
```

---

## 🌟 Fitur Utama

1. **Opening Screen / Cover Fullscreen:**
   - Background cinematic prewedding dengan overlay halus.
   - Ornamen floral tipis dan nama pasangan *"Aditya & Anindya"*.
   - **Dynamic Guest Name:** Otomatis mendeteksi nama tamu dari parameter URL:
     - Contoh: `index.html?to=Bapak+Bambang+Sutrisno`
     - Contoh: `index.html?to=Sarah+Kurnia`
   - Tombol *"Buka Undangan"* dengan transisi tirai (*curtain slide-up*) yang lembut.

2. **Hero Section:**
   - Portrait pasangan dengan bingkai lengkung arsitektural (*arch frame*) dan aksen emas.
   - Informasi tanggal dan lokasi kota.
   - Indikator gulir halus (*scroll prompt*).

3. **Quote Suci & Mempelai (Couple Section):**
   - Kutipan QS. Ar-Rum: 21 dengan kaligrafi Basmalah.
   - Kartu profil Mempelai Pria (*Aditya Pratama, S.T.*) dan Mempelai Wanita (*Anindya Kirana, S.I.Kom.*).
   - Informasi orang tua dan tautan profil Instagram.
   - Monogram emas di tengah (*A & A*).

4. **Rangkaian Acara (Wedding Event):**
   - **Akad Nikah** & **Resepsi Pernikahan**.
   - Dilengkapi waktu, nama lokasi, alamat lengkap, tombol navigasi Google Maps, dan tombol simpan ke Google Calendar.

5. **Live Countdown Timer:**
   - Menghitung mundur secara real-time menuju tanggal 24 Oktober 2026 (Hari, Jam, Menit, Detik).

6. **Love Story Timeline:**
   - Perjalanan cinta mulai dari *First Meet (2021)*, *In a Relationship (2022)*, *The Proposal (2025)*, hingga *Wedding Day (2026)*.

7. **Galeri Prewedding & Lightbox Modal:**
   - Grid foto responsif dengan efek zoom dan overlay judul.
   - Lightbox interaktif layar penuh dengan navigasi Next, Prev, tombol Tutup, counter foto, serta navigasi keyboard (*Arrow Left/Right* dan *Escape*).

8. **Tanda Kasih (Digital Gift):**
   - Nomor rekening BCA dan Mandiri dengan fitur 1-klik *"Salin Rekening"* berserta notifikasi toast.

9. **RSVP & Live Doa Restu (Wishes Feed):**
   - Form konfirmasi kehadiran (Hadir / Tidak Hadir), jumlah tamu, dan textarea doa restu.
   - Validasi form tanpa reload halaman.
   - Penyimpanan data permanen di peramban menggunakan `localStorage`.
   - Menampilkan feed doa secara dinamis dilengkapi inisial avatar tamu, waktu, dan badge status kehadiran.

10. **Dual-Engine Background Audio:**
    - Tombol piringan hitam mengambang (*floating vinyl disc*) dengan animasi putar saat audio aktif.
    - Dilengkapi fallback audio synthesizer romantis (Web Audio API) yang menjamin alunan melodi lembut tetap berputar meskipun tanpa koneksi internet.

11. **Floating Bottom Navigation & Scroll Reveal:**
    - Bilah navigasi melayang ramah smartphone yang berpindah aktif mengikuti posisi scroll (*ScrollSpy*).
    - Animasi kemunculan elemen yang halus menggunakan `IntersectionObserver`.

---

## 🚀 Cara Menjalankan
Buka file `index.html` secara langsung di browser apa pun (Google Chrome, Mozilla Firefox, Safari, Microsoft Edge).

Untuk mencoba nama tamu khusus, tambahkan parameter `?to=Nama+Tamu` di akhir URL file, contoh:
```
index.html?to=Budi+Santoso
```
