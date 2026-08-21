# Website Ulang Tahun Wulan Agustina ❤️

Versi ini sudah dibuat tanpa form nama/foto untuk pengunjung.
Nama **Wulan Agustina** dan lokasi foto sudah ditentukan di website.

## Struktur GitHub

```text
index.html
style.css
script.js
README.md
foto/
└── wulan-agustina.jpg
music/
└── lagu.mp3
```

## 1. Memasang foto

Masukkan foto Wulan ke folder `foto/` dengan nama:

`wulan-agustina.jpg`

Kalau foto memakai nama atau format lain, ubah nama file tersebut agar sama persis.

## 2. Memasang musik sendiri

Masukkan lagu MP3 pilihanmu ke folder `music/` dan beri nama:

`lagu.mp3`

Website akan membaca file itu otomatis.

Kalau ingin memakai nama file berbeda, buka `script.js` lalu ubah:

```js
const MUSIC_FILE = "music/lagu.mp3";
```

contoh:

```js
const MUSIC_FILE = "music/lagu-kita.mp3";
```

## 3. Cara kerja musik

Browser biasanya memblokir autoplay suara sebelum pengunjung berinteraksi dengan halaman.
Karena itu tombol **Putar Musik** tersedia di pojok kanan atas. Setelah pengunjung mengeklik halaman,
website juga mencoba memulai musik secara otomatis jika file musik tersedia.

## 4. Efek visual

- Hati transparan seperti gelembung melayang dari bawah ke atas.
- Hati dan sparkle bergerak dengan variasi ukuran, arah, dan kecepatan.
- Kartu kaca/glassmorphism dengan glow pink.
- Foto berbentuk lingkaran dengan ring animasi.
- Tombol musik dengan indikator saat musik sedang berjalan.
- Responsif untuk HP dan desktop.
