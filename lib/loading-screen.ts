/**
 * webjoz-ui — Loading Screen Types & Config Resolver
 *
 * Menyediakan type `PreloaderStyle`, `LoadingScreenVisualConfig`, dan
 * helper `resolvePreloaderConfig` untuk mengintegrasikan sistem loading
 * screen berbasis design token ke dalam template Webjoz.
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

export interface LoadingScreenVisualConfig {
  /** Tipe animasi loading yang ditampilkan. */
  style: PreloaderStyle;
  /** Nama brand yang tampil di tengah layar loading. */
  brandName: string;
  /** URL logo opsional (jika ada, ditampilkan sebagai gambar). */
  logoUrl?: string;
  /** Tagline singkat opsional di bawah nama brand. */
  tagline?: string;
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
}

/**
 * Membangun `LoadingScreenVisualConfig` dari design token dan data header site.
 *
 * @param designToken  - Design token Webjoz (any, karena bisa dari API atau mock)
 * @param header       - Data header site (brand_name, logo_url, tagline)
 * @param defaultBrandName - Fallback nama brand jika header tidak tersedia
 */
export function resolvePreloaderConfig(
  designToken: any,
  header?: { brand_name?: string; logo_url?: string; tagline?: string },
  defaultBrandName = "Brand Kami"
): LoadingScreenVisualConfig {
  const variant: PreloaderStyle =
    designToken?.layout?.section_variants?.preloader || "none";

  const brandName = header?.brand_name || defaultBrandName;
  const logoUrl = header?.logo_url;
  const tagline = header?.tagline;

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
    backgroundColor,
    textColor,
    accentColor,
    headingFont,
    bodyFont,
  };
}
