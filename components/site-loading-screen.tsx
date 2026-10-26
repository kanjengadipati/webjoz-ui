"use client";

import React, { useEffect, useState } from "react";
import {
  Sparkles,
  Utensils,
  Coffee,
  ShoppingBag,
  Store,
  Package,
  Heart,
  Star,
  Zap,
  Shield,
  Award,
  Smile,
  Rocket,
  Compass,
  Flame,
  CheckCircle,
  Building2,
  Briefcase,
  Camera,
  BookOpen,
  Truck,
  Scissors,
  Wrench,
  GraduationCap,
  Music,
  MapPin,
  Clock,
  type LucideIcon,
} from "lucide-react";
import type { LoadingScreenVisualConfig } from "../lib/loading-screen";

// Re-export types agar konsumen bisa import dari satu tempat
export type { LoadingScreenVisualConfig, PreloaderStyle, PreloaderContent } from "../lib/loading-screen";
export { resolvePreloaderConfig } from "../lib/loading-screen";

const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles,
  Utensils,
  Coffee,
  ShoppingBag,
  Store,
  Package,
  Heart,
  Star,
  Zap,
  Shield,
  Award,
  Smile,
  Rocket,
  Compass,
  Flame,
  CheckCircle,
  Building2,
  Briefcase,
  Camera,
  BookOpen,
  Truck,
  Scissors,
  Wrench,
  GraduationCap,
  Music,
  MapPin,
  Clock,
};

// ─── CSS Keyframes & Animation Classes ────────────────────────────────────────

const SPLASH_CSS = `
@keyframes wj-splash-fade-up {
  0% { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes wj-splash-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.06); opacity: 0.88; }
}
@keyframes wj-splash-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes wj-splash-top-bar {
  0% { width: 0%; transform: translateX(0); }
  45% { width: 65%; }
  90% { width: 100%; opacity: 1; }
  100% { width: 100%; opacity: 0; }
}
@keyframes wj-splash-progress {
  0% { transform: translateX(-110%); }
  55% { transform: translateX(0%); }
  100% { transform: translateX(110%); }
}
@keyframes wj-splash-shimmer {
  0% { background-position: 200% center; }
  100% { background-position: -200% center; }
}
@keyframes wj-splash-dot {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.35; }
  40% { transform: scale(1); opacity: 1; }
}
@keyframes wj-splash-breath {
  0%, 100% { opacity: 0.4; transform: scale(0.98); }
  50% { opacity: 1; transform: scale(1); }
}

.wj-splash-fade-up { animation: wj-splash-fade-up 420ms cubic-bezier(0.22, 1, 0.36, 1) both; }
.wj-splash-pulse { animation: wj-splash-pulse 1400ms ease-in-out infinite; }
.wj-splash-orbit { animation: wj-splash-spin 2200ms linear infinite; }
.wj-splash-spin { animation: wj-splash-spin 700ms linear infinite; }
.wj-splash-top-bar { animation: wj-splash-top-bar 900ms cubic-bezier(0.4, 0, 0.2, 1) forwards; }
.wj-splash-progress { animation: wj-splash-progress 1200ms ease-in-out infinite; }
.wj-splash-shimmer {
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: wj-splash-shimmer 2000ms linear infinite;
}
.wj-splash-dot { animation: wj-splash-dot 950ms ease-in-out infinite; }
.wj-splash-breath { animation: wj-splash-breath 1200ms ease-in-out infinite; }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Deteksi apakah warna hex tergolong terang (untuk kontras teks). */
function isLightColor(hex: string): boolean {
  const match = /^#([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) return false;
  const int = parseInt(match[1], 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.62;
}

/** Load Google Fonts secara client-side (DOM-safe). */
function loadGoogleFont(headingFont?: string, bodyFont?: string) {
  if (typeof document === "undefined") return;
  const fonts = [headingFont, bodyFont].filter(Boolean) as string[];
  if (!fonts.length) return;
  const famStr = fonts.map((f) => f.replace(/ /g, "+")).join("&family=");
  const id = `wj-sls-font-${famStr}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${famStr}:wght@400;500;600;700;800&display=swap`;
  document.head.appendChild(link);
}

// ─── BrandMark Sub-component ──────────────────────────────────────────────────

function BrandMark({
  logoUrl,
  brandName,
  accentColor,
  icon,
  size = 56,
}: {
  logoUrl?: string;
  brandName: string;
  accentColor: string;
  icon?: string;
  size?: number;
}) {
  if (logoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logoUrl}
        alt={brandName}
        style={{ maxHeight: size, maxWidth: size * 2.2 }}
        className="object-contain"
      />
    );
  }

  const IconComp = icon && ICON_MAP[icon] ? ICON_MAP[icon] : null;

  return (
    <div
      className="flex items-center justify-center rounded-2xl font-bold shadow-sm select-none"
      style={{
        width: size,
        height: size,
        background: accentColor,
        color: isLightColor(accentColor) ? "#0f172a" : "#ffffff",
        fontSize: Math.round(size * 0.42),
      }}
      aria-hidden="true"
    >
      {IconComp ? (
        <IconComp style={{ width: Math.round(size * 0.52), height: Math.round(size * 0.52) }} />
      ) : (
        (brandName.trim().charAt(0) || "W").toUpperCase()
      )}
    </div>
  );
}

// ─── Props ─────────────────────────────────────────────────────────────────────

interface SiteLoadingScreenProps {
  visual: LoadingScreenVisualConfig;
  /**
   * Jika `true`, komponen dirender inline sebagai preview mini (h-24)
   * di dalam editor / visual picker, bukan sebagai overlay viewport penuh.
   */
  preview?: boolean;
  /** Callback yang dipanggil setelah animasi dismiss selesai. */
  onComplete?: () => void;
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * `SiteLoadingScreen` — Splash screen / loading overlay untuk Webjoz sites.
 *
 * Mendukung 9 gaya animasi yang dapat dipilih AI atau user:
 * - Minimalist: `top-bar`, `minimal-fade`, `minimal-spinner`, `minimal-counter`, `stagger-dots`
 * - Branding: `pulse-logo`, `orbit-ring`, `progress-line`, `shimmer-reveal`
 * - Off: `none`
 *
 * @example
 * ```tsx
 * import { SiteLoadingScreen, resolvePreloaderConfig } from "webjoz-ui/loading-screen";
 *
 * const visual = resolvePreloaderConfig(designToken, header, content?.preloader);
 * <SiteLoadingScreen visual={visual} />
 * ```
 */
export default function SiteLoadingScreen({
  visual,
  preview = false,
  onComplete,
}: SiteLoadingScreenProps) {
  const {
    style = "none",
    brandName,
    logoUrl,
    tagline,
    icon,
    backgroundColor,
    accentColor,
    textColor,
    headingFont,
    bodyFont,
    durationMs,
  } = visual;

  const [counter, setCounter] = useState(preview ? 78 : 0);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (headingFont) {
      loadGoogleFont(headingFont, bodyFont);
    }
  }, [headingFont, bodyFont]);

  // Counter logic untuk minimal-counter
  useEffect(() => {
    if (style !== "minimal-counter" || preview) return;
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 12) + 8;
        return Math.min(100, prev + step);
      });
    }, 60);
    return () => clearInterval(interval);
  }, [style, preview]);

  // Auto-dismiss untuk live viewport overlay
  useEffect(() => {
    if (preview || style === "none") return;
    const duration = durationMs || (style === "top-bar" ? 850 : 1200);
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, duration);

    const unmountTimer = setTimeout(() => {
      setMounted(false);
      onComplete?.();
    }, duration + 380);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
    };
  }, [preview, style, durationMs, onComplete]);

  if (style === "none" || (!preview && !mounted)) {
    return null;
  }

  const headingStyle: React.CSSProperties = {
    fontFamily: headingFont ? `'${headingFont}', sans-serif` : undefined,
    color: textColor,
  };
  const subtextStyle: React.CSSProperties = {
    fontFamily: bodyFont ? `'${bodyFont}', sans-serif` : undefined,
    color: textColor,
    opacity: 0.65,
  };

  // ── Variant: top-bar (non-blocking, fixed top line) ──────────────────────────
  if (style === "top-bar") {
    if (preview) {
      return (
        <div className="relative w-full h-16 rounded-lg bg-slate-900 border border-white/10 p-3 flex flex-col justify-between overflow-hidden">
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-2/3 rounded-full" style={{ background: accentColor }} />
          </div>
          <p className="text-[10px] text-slate-400 truncate font-mono text-center">
            {brandName}
          </p>
        </div>
      );
    }
    return (
      <div
        className={`fixed top-0 left-0 right-0 z-[9999] pointer-events-none transition-opacity duration-300 ${
          exiting ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      >
        <style>{SPLASH_CSS}</style>
        <div
          className="wj-splash-top-bar h-[3px] shadow-[0_0_8px_rgba(0,0,0,0.3)]"
          style={{
            background: `linear-gradient(90deg, ${accentColor} 0%, color-mix(in srgb, ${accentColor} 70%, #ffffff) 100%)`,
          }}
        />
      </div>
    );
  }

  // ── Content node per variant ──────────────────────────────────────────────────
  let contentNode: React.ReactNode = null;

  switch (style) {
    case "minimal-fade":
      contentNode = (
        <div className="wj-splash-breath flex flex-col items-center gap-1.5 text-center">
          <p
            className="text-base sm:text-lg font-medium tracking-[0.22em] uppercase"
            style={headingStyle}
          >
            {brandName}
          </p>
          {tagline && (
            <p className="text-[11px] tracking-[0.14em] uppercase" style={subtextStyle}>
              {tagline}
            </p>
          )}
        </div>
      );
      break;

    case "minimal-spinner":
      contentNode = (
        <div className="flex flex-col items-center gap-3">
          <div
            className="wj-splash-spin w-7 h-7 rounded-full border-[1.5px] border-current"
            style={{
              borderColor: `${accentColor}26`,
              borderTopColor: accentColor,
            }}
          />
          <p
            className="text-xs font-medium tracking-[0.16em] uppercase"
            style={headingStyle}
          >
            {brandName}
          </p>
        </div>
      );
      break;

    case "minimal-counter":
      contentNode = (
        <div className="flex flex-col items-center gap-1.5 text-center font-mono">
          <span
            className="text-2xl sm:text-3xl font-bold tracking-tight tabular-nums"
            style={{ color: accentColor }}
          >
            {String(counter).padStart(2, "0")}%
          </span>
          <p className="text-[11px] tracking-[0.18em] uppercase opacity-60" style={headingStyle}>
            {brandName}
          </p>
        </div>
      );
      break;

    case "pulse-logo":
      contentNode = (
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="wj-splash-pulse">
            <BrandMark logoUrl={logoUrl} brandName={brandName} accentColor={accentColor} icon={icon} size={64} />
          </div>
          <div className="wj-splash-fade-up space-y-1">
            <p className="text-base sm:text-lg font-semibold tracking-wide" style={headingStyle}>
              {brandName}
            </p>
            {tagline && (
              <p className="text-xs" style={subtextStyle}>
                {tagline}
              </p>
            )}
          </div>
        </div>
      );
      break;

    case "orbit-ring":
      contentNode = (
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative flex h-24 w-24 items-center justify-center">
            <div
              className="wj-splash-orbit absolute inset-0 rounded-full border"
              style={{ borderColor: `${accentColor}33` }}
            >
              <span
                className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full"
                style={{ background: accentColor }}
              />
            </div>
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: `${accentColor}14` }}
            >
              <BrandMark logoUrl={logoUrl} brandName={brandName} accentColor={accentColor} icon={icon} size={44} />
            </div>
          </div>
          <div className="wj-splash-fade-up space-y-0.5">
            <p className="text-sm font-semibold tracking-wide" style={headingStyle}>
              {brandName}
            </p>
            {tagline && (
              <p className="text-[11px]" style={subtextStyle}>
                {tagline}
              </p>
            )}
          </div>
        </div>
      );
      break;

    case "progress-line":
      contentNode = (
        <div className="w-full max-w-[220px] space-y-3">
          <div className="flex items-center gap-2.5">
            <BrandMark logoUrl={logoUrl} brandName={brandName} accentColor={accentColor} icon={icon} size={36} />
            <p className="text-sm font-semibold tracking-wide truncate" style={headingStyle}>
              {brandName}
            </p>
          </div>
          <div className="h-[2.5px] w-full overflow-hidden rounded-full" style={{ background: `${accentColor}26` }}>
            <div className="wj-splash-progress h-full w-1/2 rounded-full" style={{ background: accentColor }} />
          </div>
        </div>
      );
      break;

    case "shimmer-reveal":
      contentNode = (
        <div className="flex flex-col items-center gap-3 text-center">
          {logoUrl || icon ? (
            <div className="wj-splash-fade-up">
              <BrandMark logoUrl={logoUrl} brandName={brandName} accentColor={accentColor} icon={icon} size={50} />
            </div>
          ) : null}
          <p
            className="wj-splash-shimmer text-xl sm:text-2xl font-bold tracking-wide"
            style={{
              ...headingStyle,
              backgroundImage: `linear-gradient(100deg, ${textColor} 20%, ${accentColor} 45%, #ffffff 50%, ${accentColor} 55%, ${textColor} 80%)`,
            }}
          >
            {brandName}
          </p>
          {tagline && (
            <p className="wj-splash-fade-up text-xs font-medium" style={subtextStyle}>
              {tagline}
            </p>
          )}
        </div>
      );
      break;

    case "stagger-dots":
      contentNode = (
        <div className="flex flex-col items-center gap-3 text-center">
          <BrandMark logoUrl={logoUrl} brandName={brandName} accentColor={accentColor} icon={icon} size={48} />
          <p className="text-sm font-semibold tracking-wide" style={headingStyle}>
            {brandName}
          </p>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {[0, 1, 2].map((idx) => (
              <span
                key={idx}
                className="wj-splash-dot h-2 w-2 rounded-full"
                style={{ background: accentColor, animationDelay: `${idx * 160}ms` }}
              />
            ))}
          </div>
        </div>
      );
      break;

    default:
      return null;
  }

  // ── Preview mode: mini card inline ────────────────────────────────────────────
  if (preview) {
    return (
      <div
        className="relative flex h-24 w-full items-center justify-center overflow-hidden rounded-lg p-2 border border-white/10"
        style={{ background: backgroundColor }}
      >
        <style>{SPLASH_CSS}</style>
        <div className="scale-90 transform">{contentNode}</div>
      </div>
    );
  }

  // ── Live overlay: fixed fullscreen ────────────────────────────────────────────
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Memuat ${brandName}`}
      className={`fixed inset-0 z-[9999] flex items-center justify-center px-6 transition-opacity duration-300 ease-out ${
        exiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ background: backgroundColor }}
    >
      <style>{SPLASH_CSS}</style>
      <div className="flex w-full max-w-sm flex-col items-center justify-center">
        {contentNode}
      </div>
    </div>
  );
}
