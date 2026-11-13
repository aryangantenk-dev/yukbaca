# Indomaret — Landing Page

Landing page konsep untuk toko Indomaret, dibangun sebagai static site (HTML + CSS + JS vanilla, tanpa build step).

## Struktur

```
index.html                          # halaman utama
assets/css/style.css                # design tokens + komponen + responsive
assets/js/main.js                   # nav mobile, active link, reveal, demo search & store finder
assets/img/                         # foto produk (AI-generated, ganti sebelum produksi)
design-system/indomaret/MASTER.md   # design system hasil ui-ux-pro-max
design-system/indomaret/pages/landing.md  # override khusus halaman ini
```

## Menjalankan

```bash
python3 -m http.server 8000
# buka http://localhost:8000
```

## Section

Header sticky → Hero (search + 2 float card) → Statistik → Kategori (4 card) → Promo → Layanan (6 fitur) → Cara pesan (3 langkah) → Cari gerai + kartu aplikasi → Ulasan → FAQ → CTA band → Footer.

## Catatan

- Warna brand: merah `#C81E27`, kuning `#FFC629` (kontras sudah diverifikasi AA).
- Font: Rubik (heading) + Nunito Sans (body).
- Ikon: inline SVG gaya Lucide, tanpa emoji.
- Pencarian & cari gerai masih demo front-end.
