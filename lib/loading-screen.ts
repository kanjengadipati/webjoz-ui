/**
 * webjoz-ui — Loading Screen Types & Config Resolver
 *
 * Menyediakan type `PreloaderStyle`, `PreloaderContent`, `LoadingScreenVisualConfig`,
 * dan helper `resolvePreloaderConfig` untuk mengintegrasikan sistem loading
 * screen berbasis design token & custom content ke dalam template Webjoz.
 */

export type PreloaderStyle =
  | "none"
  | "top-bar"
  | "minimal-fade"
  | "minimal-spinner"
  | "minimal-counter"
  | "pulse-logo"
  | "orbit-ring"
  | "progress-line"
  | "shimmer-reveal"
  | "stagger-dots";

/**
 * Konfigurasi custom content untuk preloader yang bisa diatur user di editor.
 * Semua field bersifat opsional — jika kosong, otomatis fallback ke data Header & Design Token.
 */
export interface PreloaderContent {
  /** Override teks nama brand / judul pada preloader. */
  brand_name?: string;
  /** Override teks tagline / pesan singkat di bawah judul. */
  tagline?: string;
  /** Nama icon Lucide khusus (misal: "Utensils", "Coffee", "Sparkles", "ShoppingBag"). */
  icon?: string;
  /** URL logo gambar khusus untuk preloader (opsional). */
  logo_url?: string;
  /** Durasi preloader tampil dalam milidetik (misal: 800, 1200, 1800). */
  duration_ms?: number;
}

export interface LoadingScreenVisualConfig {
  /** Tipe animasi loading yang ditampilkan. */
  style: PreloaderStyle;
  /** Nama brand / teks utama yang tampil di tengah layar loading. */
  brandName: string;
  /** URL logo opsional (jika ada, ditampilkan sebagai gambar). */
  logoUrl?: string;
  /** Tagline / pesan singkat opsional di bawah nama brand. */
  tagline?: string;
  /** Nama icon Lucide (jika user memilih icon tertentu). */
  icon?: string;
  /** Warna latar belakang layar loading (hex). */
  backgroundColor: string;
  /** Warna teks utama (hex). */
  textColor: string;
  /** Warna aksen / primary brand (hex). */
  accentColor: string;
  /** Nama Google Font untuk heading (opsional). */
  headingFont?: string;
  /** Nama Google Font untuk body (opsional). */
  bodyFont?: string;
  /** Durasi tampilan overlay dalam ms sebelum dismiss animation. */
  durationMs?: number;
}

/**
 * Membangun `LoadingScreenVisualConfig` dari design token, data header, dan custom content preloader.
 *
 * Prioritas teks & visual:
 * 1. `preloaderContent` (jika user mengisi custom override di editor)
 * 2. `header` (nama brand, logo, tagline dari identitas bisnis)
 * 3. Fallback default
 */
export function resolvePreloaderConfig(
  designToken: any,
  header?: { brand_name?: string; logo_url?: string; tagline?: string },
  preloaderContent?: PreloaderContent,
  defaultBrandName = "Brand Kami"
): LoadingScreenVisualConfig {
  const variant: PreloaderStyle =
    designToken?.layout?.section_variants?.preloader || "none";

  const customText = preloaderContent?.brand_name?.trim();
  const brandName = customText || header?.brand_name || defaultBrandName;

  const logoUrl =
    preloaderContent?.logo_url !== undefined && preloaderContent?.logo_url !== ""
      ? preloaderContent.logo_url
      : header?.logo_url;

  const tagline =
    preloaderContent?.tagline !== undefined && preloaderContent?.tagline !== ""
      ? preloaderContent.tagline
      : header?.tagline;

  const icon = preloaderContent?.icon?.trim() || undefined;
  const durationMs = preloaderContent?.duration_ms;

  const palette = designToken?.palette || {};
  const backgroundColor = palette.background || "#ffffff";
  const textColor = palette.text || "#0f172a";
  const accentColor = palette.primary || "#2563eb";

  const headingFont = designToken?.typography?.heading_font;
  const bodyFont = designToken?.typography?.body_font;

  return {
    style: variant,
    brandName,
    logoUrl,
    tagline,
    icon,
    backgroundColor,
    textColor,
    accentColor,
    headingFont,
    bodyFont,
    durationMs,
  };
}
