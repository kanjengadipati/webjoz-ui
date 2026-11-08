# Webjoz UI — Agent Guidelines

Panduan ini wajib dibaca sebelum melakukan perubahan apapun pada repositori ini.

---

## Stack

- **Framework**: Next.js 16 + React 19
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`)
- **Component library**: hand-rolled, no CVA, no styled-components
- **Class merging**: custom `cn()` di `lib/utils.ts` — **tidak** menggunakan `tailwind-merge`, jadi urutan kelas di `buttonClassName()` penting
- **Design tokens**: `lib/ui-tokens.ts` — `FOCUS_VISIBLE`, `DISABLED_STYLES`, `MOTION.standard`
- **Dark mode**: class-based via `.dark`; selector `:where(.dark, .dark *)` di CSS murni

---

## Struktur File Kunci

| File | Fungsi |
|---|---|
| `components/ui/button.tsx` | Definisi `Button`, `ButtonVariant`, `ButtonSize`, `BUTTON_VARIANTS`, `BUTTON_SIZES`, `buttonClassName` |
| `app/globals.css` | CSS class custom untuk varian berbasis `btn-*` dan `btn-size-*` |
| `app/page.tsx` | **Display / showcase page** — semua komponen harus ditampilkan di sini |
| `lib/ui-tokens.ts` | Token desain bersama |
| `index.ts` | Barrel export seluruh library |

---

## Aturan Menambah Button Variant

> ⚠️ **Setiap varian baru WAJIB ditambahkan ke 3 tempat sekaligus. Jangan hanya mengubah satu atau dua.**

### 1. `components/ui/button.tsx`

Tambahkan nama varian ke `ButtonVariant` type:

```ts
type ButtonVariant = "default" | ... | "nama-varian-baru";
```

Tambahkan entry di `BUTTON_VARIANTS`:

```ts
const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  ...
  "nama-varian-baru": "btn-nama-varian-baru",
};
```

Jika varian berwarna gelap (teks putih), tambahkan ke kondisi `spinnerVariant`:

```ts
const spinnerVariant = variant === "default" || ... || variant === "nama-varian-baru"
  ? "white"
  : "current";
```

### 2. `app/globals.css`

Buat CSS class `.btn-nama-varian-baru` dengan seluruh state:

```css
/* Light mode */
.btn-nama-varian-baru { ... }
.btn-nama-varian-baru:hover:not(:disabled) { ... }
.btn-nama-varian-baru:active:not(:disabled) { ... }

/* Dark mode */
:where(.dark, .dark *) .btn-nama-varian-baru { ... }
:where(.dark, .dark *) .btn-nama-varian-baru:hover:not(:disabled) { ... }
:where(.dark, .dark *) .btn-nama-varian-baru:active:not(:disabled) { ... }
```

Aturan styling:
- **Border radius**: jangan override — biarkan mengikuti `rounded-md` dari base class `buttonClassName()`
- **Hover**: `transform: translateY(-2px) scale(1.02)`
- **Active**: `transform: scale(0.98) translateY(0)`
- **Dark mode wajib**: setiap varian harus punya versi dark yang readable

### 3. `app/page.tsx` — Display Component ⚠️

**Ini langkah yang paling sering terlewat.**

Setelah menambahkan varian baru di button.tsx dan globals.css, **wajib** menambahkan sub-section showcase-nya di `app/page.tsx` dalam `<section id="buttons">`.

Format standar tiap sub-section:

```tsx
{/* Nama Varian */}
<div className="space-y-4">
  <h3 className="text-base font-semibold">N. Nama Variant</h3>
  <p className="text-sm text-muted-foreground">
    Deskripsi singkat: warna, shadow, kapan digunakan.
  </p>

  {/* Default size */}
  <div className="space-y-3">
    <div className="text-xs font-medium text-muted-foreground">Size default</div>
    <div className="flex flex-wrap items-center gap-3 p-6 rounded-2xl border border-border/60 bg-card/60">
      <Button variant="nama-varian-baru">Label</Button>
      <Button variant="nama-varian-baru" loading>Memproses...</Button>
      <Button variant="nama-varian-baru" disabled>Disabled</Button>
    </div>
  </div>

  {/* Hero size — tampilkan di atas background terang dan gelap */}
  <div className="space-y-3">
    <div className="text-xs font-medium text-muted-foreground">Size hero · full-width</div>
    <div className="p-6 rounded-2xl border border-border/60 bg-foreground/5">
      <Button variant="nama-varian-baru" size="hero" className="w-full">
        Label
      </Button>
    </div>
    <div className="p-6 rounded-2xl border border-border/60 bg-foreground/90">
      <Button variant="nama-varian-baru" size="hero" className="w-full">
        Label
      </Button>
    </div>
  </div>
</div>
```

Juga update badge hitungan di header section:

```tsx
<Badge variant="outline">N Varian · 5 Ukuran</Badge>
```

---

## Aturan Menambah Button Size

Sama seperti varian — 3 tempat:

1. **`button.tsx`**: tambah ke `ButtonSize` type dan `BUTTON_SIZES` record
2. **`app/globals.css`**: buat `.btn-size-nama` jika membutuhkan ukuran khusus yang tidak bisa dicapai dengan Tailwind utilities
3. **`app/page.tsx`**: tampilkan di sub-section "Button Sizes"

---

## Varian yang Ada Saat Ini

| Variant | CSS Class | Karakter | Spinner |
|---|---|---|---|
| `default` | `btn-primary` | Theme-aware gradient via CSS var | `white` |
| `secondary` | Tailwind utilities | Subtle, muted surface | `current` |
| `outline` | Tailwind utilities | Bordered, backdrop blur | `current` |
| `ghost` | Tailwind utilities | Transparent, hover only | `current` |
| `destructive` | Tailwind utilities | Merah, untuk aksi bahaya | `white` |
| `liquid-silver` | `btn-liquid-silver` | Putih→silver gradient, inner highlight | `current` |
| `dark-chrome` | `btn-dark-chrome` | Charcoal gradient, silver border | `white` |
| `neon-edge` | `btn-neon-edge` | Near-black, bright white border glow | `white` |
| `floating-arrow` | `btn-floating-arrow` | Minimal pill + `↗` circular badge | `white` |

## Ukuran yang Ada Saat Ini

| Size | Kelas | Keterangan |
|---|---|---|
| `sm` | `h-9 rounded-md px-3` | Tombol kecil |
| `default` | `h-10 px-4 py-2` | Ukuran standar |
| `lg` | `h-11 rounded-md px-8` | Tombol besar |
| `icon` | `size-10` | Square, icon-only |
| `hero` | `btn-size-hero` | 80px tall, pill, CTA utama |

---

## Hal Lain yang Perlu Diperhatikan

- `cn()` **tidak** melakukan dedup Tailwind — jangan mengandalkan override class; berikan set kelas lengkap di setiap varian
- Varian berbasis `btn-*` (CSS murni) digunakan ketika styling terlalu kompleks untuk Tailwind utilities (gradient multi-layer, `::after` pseudo-element, dll.)
- Border radius **tidak** di-override di CSS varian — selalu mengikuti `rounded-md` dari base class
- Setiap perubahan wajib lolos `npx tsc --noEmit` sebelum commit
