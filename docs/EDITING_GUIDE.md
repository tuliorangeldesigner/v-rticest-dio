# Editing Guide - Lumina Creative Hub

Panduan ini menjelaskan cara mengedit komponen-komponen utama di proyek ini.

---

## Daftar Isi

1. [HeroSection](#1-herosection)
2. [WorkSection](#2-worksection)
3. [ProcessSection](#3-processsection)
4. [Footer](#4-footer)
5. [Data Projects](#5-data-projects)

---

## 1. HeroSection

**Lokasi File:** `src/components/sections/HeroSection.tsx`

### 1.1 Mengubah Headline Utama

Cari array `words` di bagian atas file:

```tsx
const words = [
  { text: 'We', number: '01' },
  { text: 'Create', number: '02' },
  { text: 'Digital', number: '03' },
  { text: 'Experience', number: '04', accent: true },
];
```

- **`text`**: Kata yang ditampilkan
- **`number`**: Nomor kecil di samping kata (e.g., '01')
- **`accent: true`**: Menandai kata dengan warna aksen (coral/oranye)

**Contoh:** Mengubah ke "We Build Amazing Websites":
```tsx
const words = [
  { text: 'We', number: '01' },
  { text: 'Build', number: '02' },
  { text: 'Amazing', number: '03' },
  { text: 'Websites', number: '04', accent: true },
];
```

### 1.2 Mengubah Label Atas

Cari teks "DIGITAL AGENCY — SINCE 2018":

```tsx
<span className="text-sm font-mono text-muted-foreground tracking-wider">
  DIGITAL AGENCY — SINCE 2018
</span>
```

Ganti teks sesuai kebutuhan.

### 1.3 Mengubah Deskripsi

Cari paragraf deskripsi:

```tsx
<p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
  A creative studio crafting immersive digital products, brands, 
  and experiences that captivate and inspire.
</p>
```

### 1.4 Mengubah Statistik

Cari array statistik:

```tsx
{[
  { number: '150+', label: 'Projects Completed' },
  { number: '50+', label: 'Happy Clients' },
  { number: '12', label: 'Team Members' },
  { number: '6+', label: 'Years Experience' },
].map((stat, i) => (
```

Edit `number` dan `label` sesuai data Anda.

### 1.5 Mengubah Gambar Latar Belakang

Ganti import di bagian atas file:

```tsx
import heroBg from '@/assets/hero-bg.jpg';
```

Atau ganti file `src/assets/hero-bg.jpg` dengan gambar baru (pastikan nama sama).

### 1.6 Menyesuaikan Kecerahan Gambar

Cari class `opacity-40` pada elemen gambar:

```tsx
<img 
  src={heroBg} 
  alt="" 
  className="w-full h-full object-cover opacity-40 scale-110"
/>
```

- `opacity-40`: 40% terlihat (lebih gelap)
- `opacity-60`: 60% terlihat (lebih terang)
- `opacity-20`: 20% terlihat (sangat gelap)

### 1.7 Mengubah Tombol CTA

Tombol pertama (View Our Work):
```tsx
<Link 
  to="/work"  // ← Ubah URL tujuan di sini
  className="..."
>
  <span className="relative z-10">View Our Work</span>  // ← Ubah teks di sini
```

Tombol kedua (Start a Project):
```tsx
<Link 
  to="/contact"  // ← Ubah URL tujuan di sini
  className="..."
>
  <span className="relative z-10">Start a Project</span>  // ← Ubah teks di sini
```

---

## 2. WorkSection

**Lokasi File:** `src/components/sections/WorkSection.tsx`

### 2.1 Mengubah Jumlah Proyek Ditampilkan

Cari `.slice(0, 4)`:

```tsx
{projects.slice(0, 4).map((project, index) => (
```

Ubah `4` ke jumlah yang diinginkan (misalnya `6` untuk 6 proyek).

### 2.2 Mengubah Judul Section

Cari teks headline:

```tsx
<h2 className="font-syne font-bold text-5xl md:text-7xl tracking-tighter leading-[0.9]">
  Crafting digital<br />
  <span className="text-accent">masterpieces.</span>
</h2>
```

### 2.3 Mengubah Warna Background

Cari class `bg-secondary/30`:

```tsx
<section id="work" ref={ref} className="section-padding bg-secondary/30 relative overflow-hidden">
```

Opsi lain:
- `bg-background`: Warna latar default
- `bg-secondary/50`: Lebih gelap
- `bg-accent/10`: Warna aksen transparan

---

## 3. ProcessSection

**Lokasi File:** `src/components/sections/ProcessSection.tsx`

### 3.1 Mengedit Langkah Proses

Cari array `steps`:

```tsx
const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We begin by understanding your vision...',
    icon: Compass,
  },
  // ... langkah lainnya
];
```

- **`number`**: Nomor langkah
- **`title`**: Judul langkah
- **`description`**: Deskripsi lengkap
- **`icon`**: Ikon dari lucide-react (Compass, Target, Palette, Code, Rocket)

### 3.2 Menambah/Menghapus Langkah

Cukup tambah atau hapus objek dari array `steps`.

### 3.3 Mengubah Judul Section

Cari headline:

```tsx
<h2 className="font-syne font-bold text-5xl md:text-7xl max-w-4xl tracking-tight leading-[0.9]">
  From concept to <span className="text-accent">reality.</span>
</h2>
```

---

## 4. Footer

**Lokasi File:** `src/components/Footer.tsx`

### 4.1 Mengubah Nama Brand

Cari teks "STUDIO":

```tsx
<span className="font-syne text-4xl font-bold tracking-tighter">
  STUDIO<span className="text-accent">.</span>
</span>
```

### 4.2 Mengubah Tagline

```tsx
<p className="text-muted-foreground font-mono text-sm leading-relaxed max-w-[200px]">
  Crafting digital experiences that defy the ordinary.
</p>
```

### 4.3 Mengubah Link Navigasi

Cari objek `footerLinks`:

```tsx
const footerLinks = {
  navigation: [
    { name: 'Work', href: '/work' },
    { name: 'About', href: '/about' },
    // ...
  ],
  services: [...],
  social: [...],
  legal: [...],
};
```

### 4.4 Mengubah Info Kontak

Cari bagian Contact:

```tsx
<a href="mailto:hello@studio.com" ...>hello@studio.com</a>
<a href="tel:+1234567890" ...>+1 (555) 000-0000</a>
```

### 4.5 Mengubah Alamat

```tsx
<address className="not-italic text-lg text-muted-foreground">
  123 Innovation Dr.<br/>
  Tech City, NY 10012
</address>
```

---

## 5. Data Projects

**Lokasi File:** `src/data/projects.ts`

### 5.1 Struktur Data Proyek

Setiap proyek memiliki struktur:

```tsx
{
  id: 'luminary',           // ID unik (untuk URL)
  title: 'Luminary',        // Nama proyek
  category: 'Brand Identity', // Kategori
  year: '2024',             // Tahun
  client: 'Luminary Tech',  // Nama klien
  heroImage: 'https://...', // Gambar utama (lebar)
  thumbnail: 'https://...', // Gambar thumbnail
  description: '...',       // Deskripsi singkat
  challenge: '...',         // Tantangan proyek
  solution: '...',          // Solusi yang diberikan
  results: [                // Array hasil/metrik
    '340% increase in brand recognition',
    '85% positive sentiment in market research',
  ],
  services: [               // Array layanan
    'Brand Strategy',
    'Visual Identity',
  ],
  gallery: [                // Array gambar galeri
    'https://...',
    'https://...',
  ],
  nextProject: 'ethereal',  // ID proyek selanjutnya
  prevProject: 'cascade',   // ID proyek sebelumnya
  keyTakeaways: '...',      // (Opsional) Pelajaran utama
}
```

### 5.2 Menambah Proyek Baru

1. Tambahkan objek baru ke array `projects`
2. Pastikan `id` unik
3. Update `nextProject` dan `prevProject` untuk navigasi yang benar

### 5.3 Mengubah Gambar Proyek

Ganti URL gambar di `heroImage`, `thumbnail`, dan `gallery`.

**Tips:** Gunakan gambar dari Unsplash dengan format:
```
https://images.unsplash.com/photo-XXXXX?auto=format&fit=crop&w=2000&q=80
```

---

## Tips Umum

### Warna

Warna utama didefinisikan di `tailwind.config.ts` dan `src/index.css`:
- `accent`: Warna aksen (coral/oranye)
- `foreground`: Warna teks utama
- `background`: Warna latar belakang
- `muted-foreground`: Warna teks sekunder

### Font

- **Syne** (`font-syne`): Untuk headline dan judul
- **Monospace** (`font-mono`): Untuk label teknis dan angka

### Responsivitas

Prefix Tailwind:
- `sm:` → 640px ke atas
- `md:` → 768px ke atas
- `lg:` → 1024px ke atas
- `xl:` → 1280px ke atas

**Contoh:**
```tsx
className="text-2xl md:text-4xl lg:text-6xl"
// 2xl di mobile, 4xl di tablet, 6xl di desktop
```

---

## Bantuan

Jika ada pertanyaan atau butuh bantuan lebih lanjut, silakan hubungi tim pengembang.
