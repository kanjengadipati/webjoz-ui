"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Dialog,
  Drawer,
  EmptyState,
  FormField,
  Input,
  Label,
  MetricCard,
  Select,
  CustomSelect,
  type CustomSelectOption,
  Separator,
  SkeletonCard,
  SkeletonTable,
  SkeletonText,
  Spinner,
  StatusBadge,
  SubtleStat,
  Switch,
  Textarea,
  Checkbox,
  DatePicker,
  BottomNavBar,
  VariantPicker,
  type VariantOption,
} from "@/components/ui";
import {
  SunIcon,
  MoonIcon,
  CheckIcon,
  MailIcon,
  WhatsAppIcon,
  LockIcon,
  AlertIcon,
  InfoIcon,
  CloseIcon,
  BookOpenIcon,
  EmptyChartIcon,
} from "@/components/icons";
import { SparkleIcon, SparkleGenAI } from "@/components/sparkle-icon";
import { Sparkles, Home, Search, User, Bell, Menu, SlidersHorizontal } from "lucide-react";

// ─── VariantPicker demo (extracted to avoid bloating page component) ───
const DEMO_VARIANTS: VariantOption[] = [
  {
    value: "full-bleed",
    label: "Full Bleed",
    group: "Visual Foto",
    description: "Latar gambar/media penuh layar dengan teks overlay.",
    preview: (
      <div className="w-full h-full rounded-md bg-gradient-to-br from-slate-900 via-primary/20 to-slate-900 p-2 flex flex-col items-center justify-center gap-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative w-2/3 h-1.5 rounded-full bg-white/80" />
        <div className="relative w-3/4 h-1 rounded-full bg-slate-200/60" />
        <div className="relative w-1/4 h-1.5 rounded-sm bg-primary" />
      </div>
    ),
  },
  {
    value: "carousel",
    label: "Carousel Gambar",
    group: "Visual Foto",
    description: "Slideshow gambar latar bergilir otomatis.",
    preview: (
      <div className="w-full h-full rounded-md bg-[#111520] flex items-center justify-between gap-1 p-1.5">
        <div className="w-3 h-full rounded bg-slate-800/40 opacity-40" />
        <div className="flex-1 h-full rounded bg-primary/15 border border-primary/30 p-1.5 flex flex-col justify-center gap-1 items-center">
          <div className="w-2/3 h-1.5 rounded-full bg-primary/80" />
          <div className="flex gap-1 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <div className="w-1 h-1 rounded-full bg-slate-600" />
            <div className="w-1 h-1 rounded-full bg-slate-600" />
          </div>
        </div>
        <div className="w-3 h-full rounded bg-slate-800/40 opacity-40" />
      </div>
    ),
  },
  {
    value: "split",
    label: "Split",
    group: "Dasar",
    description: "Dua kolom: teks di kiri, gambar di kanan.",
    preview: (
      <div className="w-full h-full rounded-md bg-[#111520] flex items-center gap-1.5 p-1.5">
        <div className="w-1/2 flex flex-col gap-1 pl-1">
          <div className="w-4/5 h-1.5 rounded-full bg-primary/70" />
          <div className="w-full h-1 rounded-full bg-slate-500/50" />
          <div className="w-2/5 h-1.5 rounded-sm bg-primary/40" />
        </div>
        <div className="w-1/2 h-full rounded bg-gradient-to-br from-primary/25 to-violet-500/10 border border-primary/30" />
      </div>
    ),
  },
  {
    value: "centered",
    label: "Centered",
    group: "Dasar",
    description: "Semua elemen rata tengah dengan CTA jelas.",
  },
  {
    value: "editorial",
    label: "Editorial Grid",
    group: "Editorial",
    description: "Layout editorial dengan grid asimetris.",
    preview: (
      <div className="w-full h-full rounded-md bg-[#111520] grid grid-cols-3 gap-1 p-1.5">
        <div className="col-span-2 rounded bg-primary/20 border border-primary/30 p-1 flex flex-col justify-between">
          <div className="w-3/4 h-1 rounded-full bg-primary/70" />
          <div className="w-full h-1 rounded-full bg-slate-500/40" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex-1 rounded bg-slate-800/60" />
          <div className="flex-1 rounded bg-slate-800/60" />
        </div>
      </div>
    ),
  },
  {
    value: "editorial-spotlight",
    label: "Editorial Spotlight",
    group: "Editorial",
    description: "Feature satu item utama dengan teks editorial besar.",
  },
  {
    value: "modern-minimal",
    label: "Modern Minimal",
    group: "Modern",
    description: "Desain bersih dengan tipografi besar dan whitespace.",
  },
  {
    value: "modern-bento",
    label: "Modern Bento",
    group: "Modern",
    description: "Grid bento asymmetric bergaya modern.",
    preview: (
      <div className="w-full h-full rounded-md bg-[#111520] grid grid-cols-3 gap-0.5 p-1">
        <div className="col-span-2 row-span-2 rounded bg-primary/20 border border-primary/30 p-1 flex flex-col justify-between">
          <div className="w-3/4 h-1 rounded-full bg-primary/70" />
          <div className="w-full h-1 rounded-full bg-slate-500/40" />
        </div>
        <div className="rounded bg-slate-800/60" />
        <div className="rounded bg-slate-800/60" />
      </div>
    ),
  },
];

function VariantPickerDemo() {
  const [val, setVal] = useState("full-bleed");
  return (
    <div className="max-w-sm space-y-4">
      <VariantPicker
        value={val}
        onChange={setVal}
        options={DEMO_VARIANTS}
        allLabel="Semua"
        hintText="Klik varian untuk pratinjau langsung di kanvas."
        doneLabel="Selesai"
      />
      <p className="text-xs text-muted-foreground">Selected: <code className="text-primary">{val}</code></p>
    </div>
  );
}

export default function DesignSystemPage() {
  // Theme state
  const [isDark, setIsDark] = useState(false);

  // Modal demo states
  const [isBasicDialogOpen, setIsBasicDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  // Drawer demo states
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);

  // Form states
  const [inputVal, setInputVal] = useState("webjoz.id");
  const [selectVal, setSelectVal] = useState("id");
  const [customSelectVal, setCustomSelectVal] = useState("pro");
  const [switchEmerald, setSwitchEmerald] = useState(true);
  const [switchPrimary, setSwitchPrimary] = useState(false);
  const [switchSm, setSwitchSm] = useState(true);
  const [checkboxVal, setCheckboxVal] = useState(true);
  const [dateVal, setDateVal] = useState("2026-10-15");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDark(document.documentElement.classList.contains("dark"));
    }
  }, []);

  const toggleTheme = () => {
    if (typeof document !== "undefined") {
      const isCurrentlyDark = document.documentElement.classList.contains("dark");
      if (isCurrentlyDark) {
        document.documentElement.classList.remove("dark");
        setIsDark(false);
      } else {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      }
    }
  };

  const customSelectOptions: CustomSelectOption[] = [
    { value: "starter", label: "Starter Plan", sublabel: "Gratis untuk 1 website", badge: "Free" },
    { value: "pro", label: "Pro Merchant", sublabel: "Custom domain & integrasi QRIS", badge: "Populer" },
    { value: "enterprise", label: "Enterprise Scale", sublabel: "Dedicated SLA & priority support" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <Image
              src="/logo-transparent.png"
              alt="Webjoz"
              width={112}
              height={36}
              className="h-7 sm:h-8 w-auto object-contain dark:invert transition-transform group-hover:scale-105"
              priority
            />
            <span className="hidden sm:inline-flex items-center rounded-full border border-border/80 bg-muted/60 px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground tracking-wider uppercase">
              UI System
            </span>
          </Link>

          {/* Quick jump navigation */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-medium text-muted-foreground shrink-0">
            <a href="#dialogs" className="px-2.5 py-1.5 rounded-lg hover:text-foreground hover:bg-muted transition-colors whitespace-nowrap">Dialog & Modal</a>
            <a href="#buttons" className="px-2.5 py-1.5 rounded-lg hover:text-foreground hover:bg-muted transition-colors whitespace-nowrap">Buttons</a>
            <a href="#typography" className="px-2.5 py-1.5 rounded-lg hover:text-foreground hover:bg-muted transition-colors whitespace-nowrap">Typography</a>
            <a href="#tokens" className="px-2.5 py-1.5 rounded-lg hover:text-foreground hover:bg-muted transition-colors whitespace-nowrap">Tokens</a>
            <a href="#forms" className="px-2.5 py-1.5 rounded-lg hover:text-foreground hover:bg-muted transition-colors whitespace-nowrap">Forms</a>
            <a href="#badges" className="px-2.5 py-1.5 rounded-lg hover:text-foreground hover:bg-muted transition-colors whitespace-nowrap">Badges</a>
            <a href="#feedback" className="px-2.5 py-1.5 rounded-lg hover:text-foreground hover:bg-muted transition-colors whitespace-nowrap">Feedback</a>
            <a href="#cards" className="px-2.5 py-1.5 rounded-lg hover:text-foreground hover:bg-muted transition-colors whitespace-nowrap">Cards</a>
            <a href="#icons" className="px-2.5 py-1.5 rounded-lg hover:text-foreground hover:bg-muted transition-colors whitespace-nowrap">Icons</a>
          </nav>

          {/* Theme switcher */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="gap-2 text-xs font-medium whitespace-nowrap"
              title="Toggle Light / Dark Mode"
            >
              {isDark ? <SunIcon size="sm" /> : <MoonIcon size="sm" />}
              <span className="hidden sm:inline">{isDark ? "Light Mode" : "Dark Mode"}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative border-b border-border/60 bg-gradient-to-b from-muted/30 via-background to-background py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/60 px-3.5 py-1 text-xs font-medium text-foreground">
              <Sparkles className="size-3.5 text-primary" />
              <span>Webjoz Component Architecture & Design System</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Katalog UI & Komponen Resmi Webjoz
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Showcase interaktif komponen UX inti Webjoz: Modal/Dialog, ragam Tombol, Tipografi terstandar,
              Palet warna OKLCH, Kontrol Formulir, Status Indikator, dan Kartu Metrik.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button size="lg" onClick={() => setIsBasicDialogOpen(true)}>
                Buka Live Modal Demo
              </Button>
              <a href="#tokens">
                <Button variant="outline" size="lg">
                  Eksplorasi Token Warna
                </Button>
              </a>
              <a href="#buttons">
                <Button variant="secondary" size="lg">
                  Lihat Semua Tombol
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">

        {/* 1. MODAL & DIALOG SHOWCASE */}
        <section id="dialogs" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary">Interactivity & Overlay</div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Modal & Dialog Component</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Dialog pop-up dengan backdrop blur, animasi transisi, tombol close, dan kontrol keyboard/backdrop.
              </p>
            </div>
            <Badge variant="secondary">3 Demo Interaktif</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Demo 1: Basic Dialog */}
            <Card className="flex flex-col justify-between">
              <CardHeader>
                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold mb-2">
                  01
                </div>
                <CardTitle className="text-xl">Standard Dialog</CardTitle>
                <CardDescription>
                  Dialog modal standar dengan title, konten informasi, dan aksi konfirmasi.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-xs text-muted-foreground">
                  Gunakan untuk pengumuman, detail item, atau preview ringkas tanpa meninggalkan halaman.
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button className="w-full" onClick={() => setIsBasicDialogOpen(true)}>
                  Buka Standard Dialog
                </Button>
              </CardFooter>
            </Card>

            {/* Demo 2: Confirmation / Danger Dialog */}
            <Card className="flex flex-col justify-between">
              <CardHeader>
                <div className="size-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center font-bold mb-2">
                  02
                </div>
                <CardTitle className="text-xl">Destructive Dialog</CardTitle>
                <CardDescription>
                  Dialog konfirmasi tindakan kritis seperti menghapus data atau membatalkan sesi.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-xs text-muted-foreground">
                  Menyediakan feedback visual merah dengan perlindungan double-confirmation.
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button variant="destructive" className="w-full" onClick={() => setIsConfirmDialogOpen(true)}>
                  Buka Destructive Dialog
                </Button>
              </CardFooter>
            </Card>

            {/* Demo 3: Form Dialog */}
            <Card className="flex flex-col justify-between">
              <CardHeader>
                <div className="size-10 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center font-bold mb-2">
                  03
                </div>
                <CardTitle className="text-xl">Form Inside Dialog</CardTitle>
                <CardDescription>
                  Modal berisi input form interaktif lengkap dengan validasi dan switch toggle.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-xs text-muted-foreground">
                  Ideal untuk pembuatan situs baru, penambahan domain, atau konfigurasi cepat.
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button variant="outline" className="w-full" onClick={() => setIsFormDialogOpen(true)}>
                  Buka Form Dialog
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Code example card for Dialog */}
          <div className="rounded-2xl border border-border/70 bg-muted/20 p-5">
            <div className="text-xs font-semibold text-muted-foreground mb-2">Contoh Penggunaan Komponen Dialog:</div>
            <pre className="text-xs font-mono bg-background p-4 rounded-xl border border-border/50 overflow-x-auto text-foreground/90">
{`<Dialog
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Konfigurasi Website"
  footer={
    <>
      <Button variant="outline" onClick={() => setIsOpen(false)}>Batal</Button>
      <Button variant="default" onClick={handleSave}>Simpan Perubahan</Button>
    </>
  }
>
  <p>Isi konten dialog dengan form atau komponen apa pun...</p>
</Dialog>`}
            </pre>
          </div>
        </section>

        {/* 2. BUTTONS & ACTIONS */}
        <section id="buttons" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary">Interactivity</div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Buttons & Action States</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Semua varian tombol, ukuran, loading states, dan integrasi icon.
              </p>
            </div>
            <Badge variant="outline">10 Varian · 5 Ukuran</Badge>
          </div>

          {/* Variants Showcase */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">1. Button Variants</h3>
            <div className="flex flex-wrap items-center gap-3 p-6 rounded-2xl border border-border/60 bg-card/60">
              <Button variant="default">Default (btn-primary)</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="default" disabled>Disabled State</Button>
            </div>
          </div>

          {/* Sizes Showcase */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">2. Button Sizes</h3>
            <div className="flex flex-wrap items-center gap-4 p-6 rounded-2xl border border-border/60 bg-card/60">
              <Button size="sm">Small (sm)</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large (lg)</Button>
              <Button size="icon" variant="outline" aria-label="Icon only button">
                <SunIcon size="sm" />
              </Button>
              <Button size="icon" variant="default" aria-label="WhatsApp icon">
                <WhatsAppIcon size="sm" />
              </Button>
            </div>
          </div>

          {/* Loading States */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">3. Loading & Async States</h3>
            <div className="flex flex-wrap items-center gap-4 p-6 rounded-2xl border border-border/60 bg-card/60">
              <Button loading={true}>Menyimpan...</Button>
              <Button loading={true} loadingText="Memproses Transaksi" variant="secondary" />
              <Button loading={true} loadingText="Menghapus Situs..." variant="destructive" />
              <Button loading={true} variant="outline" size="sm" loadingText="Sync..." />
              <Button
                variant="default"
                loading={isSubmitting}
                onClick={() => {
                  setIsSubmitting(true);
                  setTimeout(() => setIsSubmitting(false), 2000);
                }}
              >
                {isSubmitting ? "Mengunggah..." : "Klik Untuk Tes Async (2s)"}
              </Button>
            </div>
          </div>

          {/* With Icons */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">4. Buttons with Icons</h3>
            <div className="flex flex-wrap items-center gap-4 p-6 rounded-2xl border border-border/60 bg-card/60">
              <Button variant="default">
                <WhatsAppIcon size="sm" />
                <span>Hubungi via WhatsApp</span>
              </Button>
              <Button variant="outline">
                <MailIcon size="sm" />
                <span>Kirim Email</span>
              </Button>
              <Button variant="secondary">
                <LockIcon size="sm" />
                <span>Kunci Domain</span>
              </Button>
              <Button variant="outline">
                <CheckIcon size="sm" />
                <span>Verifikasi Sekarang</span>
              </Button>
            </div>
          </div>

          {/* Liquid Silver Variant */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">5. Liquid Silver Variant</h3>
            <p className="text-sm text-muted-foreground">
              Metallic gradient (#fff → #e5e5e5), inner highlight, outer glow. Dark mode otomatis bergeser ke dark chrome.
            </p>

            {/* Default size */}
            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground">Size default</div>
              <div className="flex flex-wrap items-center gap-3 p-6 rounded-2xl border border-border/60 bg-card/60">
                <Button variant="liquid-silver">Create Website Now →</Button>
                <Button variant="liquid-silver" loading>Memproses...</Button>
                <Button variant="liquid-silver" disabled>Disabled</Button>
              </div>
            </div>

            {/* Hero size — full width on dark bg to mimic real usage */}
            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground">Size hero (80px · pill · full-width)</div>
              <div className="p-6 rounded-2xl border border-border/60 bg-foreground/5">
                <Button variant="liquid-silver" size="hero" className="w-full">
                  Create Website Now →
                </Button>
              </div>
              <div className="p-6 rounded-2xl border border-border/60 bg-foreground/90">
                <Button variant="liquid-silver" size="hero" className="w-full">
                  Create Website Now →
                </Button>
              </div>
            </div>
          </div>

          {/* Dark Chrome Variant */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">6. Dark Chrome Variant</h3>
            <p className="text-sm text-muted-foreground">
              Charcoal gradient (#3d3d3d → #1a1a1a), silver border, deep shadow. Cocok di atas background terang.
            </p>
            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground">Size default</div>
              <div className="flex flex-wrap items-center gap-3 p-6 rounded-2xl border border-border/60 bg-card/60">
                <Button variant="dark-chrome">Create Website Now →</Button>
                <Button variant="dark-chrome" loading>Memproses...</Button>
                <Button variant="dark-chrome" disabled>Disabled</Button>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground">Size hero · full-width</div>
              <div className="p-6 rounded-2xl border border-border/60 bg-foreground/5">
                <Button variant="dark-chrome" size="hero" className="w-full">
                  Create Website Now →
                </Button>
              </div>
              <div className="p-6 rounded-2xl border border-border/60 bg-foreground/90">
                <Button variant="dark-chrome" size="hero" className="w-full">
                  Create Website Now →
                </Button>
              </div>
            </div>
          </div>

          {/* Neon Edge Variant */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">7. Neon Edge Variant</h3>
            <p className="text-sm text-muted-foreground">
              Near-black surface, bright white border, outer white glow yang makin intens saat hover.
            </p>
            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground">Size default</div>
              <div className="flex flex-wrap items-center gap-3 p-6 rounded-2xl border border-border/60 bg-card/60">
                <Button variant="neon-edge">Create Website Now →</Button>
                <Button variant="neon-edge" loading>Memproses...</Button>
                <Button variant="neon-edge" disabled>Disabled</Button>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground">Size hero · full-width</div>
              <div className="p-6 rounded-2xl border border-border/60 bg-foreground/5">
                <Button variant="neon-edge" size="hero" className="w-full">
                  Create Website Now →
                </Button>
              </div>
              <div className="p-6 rounded-2xl border border-border/60 bg-foreground/90">
                <Button variant="neon-edge" size="hero" className="w-full">
                  Create Website Now →
                </Button>
              </div>
            </div>
          </div>

          {/* Floating Arrow Variant */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">8. Floating Arrow Variant</h3>
            <p className="text-sm text-muted-foreground">
              Minimal pill body dengan floating circular arrow badge di kanan. Dark mode: pill gelap, badge putih.
            </p>
            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground">Size default</div>
              <div className="flex flex-wrap items-center gap-3 p-6 rounded-2xl border border-border/60 bg-card/60">
                <Button variant="floating-arrow">Create Website Now</Button>
                <Button variant="floating-arrow" disabled>Disabled</Button>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground">Size hero · full-width</div>
              <div className="p-6 rounded-2xl border border-border/60 bg-foreground/5">
                <Button variant="floating-arrow" size="hero" className="w-full">
                  Create Website Now
                </Button>
              </div>
              <div className="p-6 rounded-2xl border border-border/60 bg-foreground/90">
                <Button variant="floating-arrow" size="hero" className="w-full">
                  Create Website Now
                </Button>
              </div>
            </div>
          </div>

          {/* Floating Arrow Right */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">10. Floating Arrow Right</h3>
            <p className="text-sm text-muted-foreground">
              Identik dengan Floating Arrow tapi badge lingkaran pakai panah → (kanan) bukan ↗.
              Cocok untuk CTA navigasi lurus seperti "Lanjut", "Mulai", "Next Step".
            </p>
            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground">Size default</div>
              <div className="flex flex-wrap items-center gap-3 p-6 rounded-2xl border border-border/60 bg-card/60">
                <Button variant="floating-arrow-right">Get Started</Button>
                <Button variant="floating-arrow-right" loading>Memproses...</Button>
                <Button variant="floating-arrow-right" disabled>Disabled</Button>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground">Size hero · full-width</div>
              <div className="p-6 rounded-2xl border border-border/60 bg-foreground/5">
                <Button variant="floating-arrow-right" size="hero" className="w-full">
                  Get Started
                </Button>
              </div>
              <div className="p-6 rounded-2xl border border-border/60 bg-foreground/90">
                <Button variant="floating-arrow-right" size="hero" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 3. TYPOGRAPHY */}
        <section id="typography" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary">Hierarchy</div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Typography Scale & Weights</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Hirarki tipografi berbasis Inter font dengan skala perbandingan yang harmonis.
              </p>
            </div>
            <Badge variant="outline">Inter Family</Badge>
          </div>

          <Card>
            <CardContent className="p-6 sm:p-8 space-y-8 divide-y divide-border/60">
              {/* Display / Hero */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>Display Hero (text-5xl font-extrabold tracking-tight)</span>
                  <span>48px / 3rem</span>
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                  Kekuatan Kreatif Digital untuk UMKM Indonesia
                </div>
              </div>

              {/* H1 */}
              <div className="pt-6 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>Heading 1 (text-3xl sm:text-4xl font-bold tracking-tight)</span>
                  <span>36px / 2.25rem</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Kelola Situs Webjoz Anda dari Satu Dashboard Terpadu
                </h1>
              </div>

              {/* H2 */}
              <div className="pt-6 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>Heading 2 (text-2xl sm:text-3xl font-bold tracking-tight)</span>
                  <span>30px / 1.875rem</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Integrasi Otomatis Pembayaran QRIS & Pesan WhatsApp
                </h2>
              </div>

              {/* H3 */}
              <div className="pt-6 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>Heading 3 (text-xl sm:text-2xl font-semibold)</span>
                  <span>24px / 1.5rem</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold">
                  Kustomisasi Section & Komponen Sesuai Identitas Brand
                </h3>
              </div>

              {/* H4 */}
              <div className="pt-6 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>Heading 4 (text-lg font-semibold)</span>
                  <span>18px / 1.125rem</span>
                </div>
                <h4 className="text-lg font-semibold">
                  Analitik Pengunjung Real-Time & Laporan Penjualan
                </h4>
              </div>

              {/* Body & Muted */}
              <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-xs font-mono text-muted-foreground">Body Text (text-base leading-relaxed)</div>
                  <p className="text-base leading-relaxed text-foreground">
                    Webjoz dirancang khusus untuk mempermudah pembuatan landing page dan katalog produk tanpa kerumitan teknis. Desain modern, performa tinggi, dan ramah SEO.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-mono text-muted-foreground">Muted / Secondary (text-sm text-muted-foreground)</div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Data transaksi diperbarui setiap 15 menit. Anda dapat mengekspor riwayat order ke format CSV atau menghubungkannya langsung ke spreadsheet eksternal.
                  </p>
                </div>
              </div>

              {/* Weights row */}
              <div className="pt-6 space-y-2">
                <div className="text-xs font-mono text-muted-foreground">Font Weights Demonstration</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                    <div className="text-xs text-muted-foreground">Normal (400)</div>
                    <div className="text-sm font-normal">Inter Regular 400</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                    <div className="text-xs text-muted-foreground">Medium (500)</div>
                    <div className="text-sm font-medium">Inter Medium 500</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                    <div className="text-xs text-muted-foreground">Semibold (600)</div>
                    <div className="text-sm font-semibold">Inter Semibold 600</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                    <div className="text-xs text-muted-foreground">Bold (700)</div>
                    <div className="text-sm font-bold">Inter Bold 700</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 4. DESIGN TOKENS & COLOR PALETTE */}
        <section id="tokens" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary">Color Engine</div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">OKLCH Design Tokens</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Sistem palet warna OKLCH Webjoz yang mendukung transisi mulus antara Light dan Dark mode.
              </p>
            </div>
            <Button size="sm" variant="outline" onClick={toggleTheme} className="gap-2 text-xs">
              {isDark ? <SunIcon size="sm" /> : <MoonIcon size="sm" />}
              <span>Ubah ke {isDark ? "Light" : "Dark"} Mode</span>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Primary */}
            <div className="rounded-2xl border border-border/80 bg-card p-4 space-y-3 shadow-sm">
              <div className="h-16 w-full rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-mono text-xs font-bold shadow-inner">
                primary
              </div>
              <div>
                <div className="font-semibold text-sm">Primary</div>
                <div className="text-xs text-muted-foreground">Aksi utama, tombol CTA</div>
              </div>
            </div>

            {/* Secondary */}
            <div className="rounded-2xl border border-border/80 bg-card p-4 space-y-3 shadow-sm">
              <div className="h-16 w-full rounded-xl bg-secondary flex items-center justify-center text-secondary-foreground font-mono text-xs font-bold border border-border/40">
                secondary
              </div>
              <div>
                <div className="font-semibold text-sm">Secondary</div>
                <div className="text-xs text-muted-foreground">Aksi sekunder & filter</div>
              </div>
            </div>

            {/* Accent */}
            <div className="rounded-2xl border border-border/80 bg-card p-4 space-y-3 shadow-sm">
              <div className="h-16 w-full rounded-xl bg-accent flex items-center justify-center text-accent-foreground font-mono text-xs font-bold border border-border/40">
                accent
              </div>
              <div>
                <div className="font-semibold text-sm">Accent</div>
                <div className="text-xs text-muted-foreground">Highlight & item aktif</div>
              </div>
            </div>

            {/* Muted */}
            <div className="rounded-2xl border border-border/80 bg-card p-4 space-y-3 shadow-sm">
              <div className="h-16 w-full rounded-xl bg-muted flex items-center justify-center text-muted-foreground font-mono text-xs font-bold border border-border/40">
                muted
              </div>
              <div>
                <div className="font-semibold text-sm">Muted</div>
                <div className="text-xs text-muted-foreground">Background elemen pudar</div>
              </div>
            </div>

            {/* Destructive */}
            <div className="rounded-2xl border border-border/80 bg-card p-4 space-y-3 shadow-sm">
              <div className="h-16 w-full rounded-xl bg-destructive flex items-center justify-center text-white font-mono text-xs font-bold shadow-inner">
                destructive
              </div>
              <div>
                <div className="font-semibold text-sm">Destructive</div>
                <div className="text-xs text-muted-foreground">Error, bahaya, hapus</div>
              </div>
            </div>

            {/* Card & Border */}
            <div className="rounded-2xl border border-border/80 bg-card p-4 space-y-3 shadow-sm">
              <div className="h-16 w-full rounded-xl border-2 border-border bg-card flex items-center justify-center text-card-foreground font-mono text-xs font-bold">
                border / card
              </div>
              <div>
                <div className="font-semibold text-sm">Card & Border</div>
                <div className="text-xs text-muted-foreground">Struktur kontainer</div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. FORM CONTROLS */}
        <section id="forms" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary">Inputs & Selection</div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Form Controls & Inputs</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Komponen formulir: Input, Select, Textarea, Checkbox, Switch, dan DatePicker.
              </p>
            </div>
            <Badge variant="outline">Interactive Controls</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Text inputs & selects */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Input & Select Elements</CardTitle>
                <CardDescription>Input fields dengan variasi status validasi & helper text.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <FormField label="Nama Domain / Subdomain" required helperText="Gunakan huruf kecil tanpa spasi">
                  <Input
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="nama-toko.webjoz.id"
                  />
                </FormField>

                <FormField label="Input dengan Status Error" error="Format email tidak valid atau sudah terdaftar">
                  <Input defaultValue="wrong-email-format" error="Format email tidak valid" />
                </FormField>

                <FormField label="Pilih Bahasa Sistem">
                  <CustomSelect
                    value={selectVal}
                    onChange={setSelectVal}
                    options={[
                      { value: "id", label: "Bahasa Indonesia", sublabel: "ID" },
                      { value: "en", label: "English", sublabel: "US" },
                      { value: "jv", label: "Basa Jawa", sublabel: "JV" },
                    ]}
                  />
                </FormField>

                <FormField label="Custom Select Component" helperText="Dukungan icon, sublabel & badge">
                  <CustomSelect
                    value={customSelectVal}
                    onChange={setCustomSelectVal}
                    options={customSelectOptions}
                  />
                </FormField>

                {/* CustomSelect full showcase */}
                <div className="space-y-3 pt-2 border-t border-border/40">
                  <div>
                    <p className="text-sm font-semibold">CustomSelect — Semua Varian</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Tanpa icon, dengan icon, dengan sublabel & badge, disabled, error, size sm/default/lg.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {/* No icon */}
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground">Tanpa icon</p>
                      <CustomSelect
                        value={customSelectVal}
                        onChange={setCustomSelectVal}
                        options={[
                          { value: "starter", label: "Starter Plan", sublabel: "Gratis untuk 1 website", badge: "Free" },
                          { value: "pro", label: "Pro Merchant", sublabel: "Custom domain & QRIS", badge: "Populer" },
                          { value: "enterprise", label: "Enterprise", sublabel: "Unlimited websites" },
                        ]}
                      />
                    </div>

                    {/* With icon */}
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground">Dengan icon</p>
                      <CustomSelect
                        value={selectVal}
                        onChange={setSelectVal}
                        options={[
                          { value: "id", label: "Indonesia", icon: <span className="text-sm">🇮🇩</span> },
                          { value: "en", label: "English", icon: <span className="text-sm">🇺🇸</span> },
                          { value: "ar", label: "العربية", icon: <span className="text-sm">🇸🇦</span> },
                        ]}
                      />
                    </div>

                    {/* Size sm */}
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground">Size sm</p>
                      <CustomSelect
                        value={customSelectVal}
                        onChange={setCustomSelectVal}
                        options={customSelectOptions}
                        size="sm"
                      />
                    </div>

                    {/* Size lg */}
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground">Size lg</p>
                      <CustomSelect
                        value={customSelectVal}
                        onChange={setCustomSelectVal}
                        options={customSelectOptions}
                        size="lg"
                      />
                    </div>

                    {/* Error state */}
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground">Error state</p>
                      <CustomSelect
                        value=""
                        onChange={() => {}}
                        options={customSelectOptions}
                        placeholder="Pilih paket..."
                        error="Paket harus dipilih"
                      />
                    </div>

                    {/* Disabled */}
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground">Disabled</p>
                      <CustomSelect
                        value="pro"
                        onChange={() => {}}
                        options={customSelectOptions}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <FormField label="Catatan Tambahan (Textarea)">
                  <Textarea placeholder="Tulis instruksi khusus untuk pembuatan situs Anda di sini..." rows={3} />
                </FormField>
              </CardContent>
            </Card>

            {/* Right: Toggles, Checkbox, DatePicker */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Toggles, Switch & Pickers</CardTitle>
                <CardDescription>Kontrol biner dan pemilihan tanggal interaktif.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Switch Controls */}
                <div className="space-y-4">
                  <Label>Switch Component (Varian Emerald & Primary)</Label>
                  
                  <div className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/20">
                    <div>
                      <div className="text-sm font-medium">Auto-Renew Domain</div>
                      <div className="text-xs text-muted-foreground">Perpanjang domain otomatis sebelum kedaluwarsa</div>
                    </div>
                    <Switch checked={switchEmerald} onCheckedChange={setSwitchEmerald} variant="emerald" />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/20">
                    <div>
                      <div className="text-sm font-medium">Mode Pemeliharaan (Maintenance)</div>
                      <div className="text-xs text-muted-foreground">Tampilkan halaman maintenance untuk publik</div>
                    </div>
                    <Switch checked={switchPrimary} onCheckedChange={setSwitchPrimary} variant="primary" />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/20">
                    <div>
                      <div className="text-sm font-medium">Ukuran Small (size="sm")</div>
                      <div className="text-xs text-muted-foreground">Compact switch untuk tabel atau baris rapat</div>
                    </div>
                    <Switch size="sm" checked={switchSm} onCheckedChange={setSwitchSm} />
                  </div>
                </div>

                <Separator />

                {/* Checkbox */}
                <div className="space-y-3">
                  <Label>Checkbox Control</Label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <Checkbox checked={checkboxVal} onChange={(e) => setCheckboxVal(e.target.checked)} />
                    <span className="text-sm select-none">
                      Saya menyetujui Ketentuan Layanan & Kebijakan Privasi Webjoz
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-not-allowed opacity-60">
                    <Checkbox disabled checked={false} />
                    <span className="text-sm select-none">Opsi yang dinonaktifkan (Disabled Checkbox)</span>
                  </label>
                </div>

                <Separator />

                {/* Date Picker */}
                <div className="space-y-2">
                  <Label>DatePicker Component</Label>
                  <DatePicker value={dateVal} onChange={setDateVal} label="Pilih Tanggal Publikasi" />
                  <div className="text-xs text-muted-foreground mt-1">Tanggal terpilih: {dateVal}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 6. BADGES & STATUS INDICATORS */}
        <section id="badges" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary">Indicators</div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Badges & Status Types</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Label penanda status, tag kategori, dan indikator kesehatan sistem.
              </p>
            </div>
            <Badge variant="secondary">StatusTone Engine</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Standard Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Standard Badges</CardTitle>
                <CardDescription>Varian badge standar untuk tag dan kategori.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </CardContent>
            </Card>

            {/* StatusBadges with Tones */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">StatusBadge (Tone-Mapped)</CardTitle>
                <CardDescription>Otomatis memetakan status ke tone warna (good, warning, danger, neutral).</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2.5">
                <StatusBadge status="active" />
                <StatusBadge status="verified" />
                <StatusBadge status="sales" />
                <StatusBadge status="admin" />
                <StatusBadge status="success" />
                <StatusBadge status="warning" />
                <StatusBadge status="medium" />
                <StatusBadge status="failed" />
                <StatusBadge status="critical" />
                <StatusBadge status="error" />
                <StatusBadge status="unknown" />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 7. FEEDBACK, LOADERS & SKELETONS */}
        <section id="feedback" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary">Feedback & Loaders</div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Spinners & Shimmer Skeletons</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Indikator loading progresif dan placeholder konten saat fetch asynchronous.
              </p>
            </div>
            <Badge variant="outline">Smooth Shimmer</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Spinners */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Spinner Sizes & Colors</CardTitle>
                <CardDescription>Spinner putar berbasis Lucide Loader2.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <Spinner size="xs" />
                    <span className="text-[10px] text-muted-foreground block mt-1">xs</span>
                  </div>
                  <div className="text-center">
                    <Spinner size="sm" />
                    <span className="text-[10px] text-muted-foreground block mt-1">sm</span>
                  </div>
                  <div className="text-center">
                    <Spinner size="md" />
                    <span className="text-[10px] text-muted-foreground block mt-1">md</span>
                  </div>
                  <div className="text-center">
                    <Spinner size="lg" />
                    <span className="text-[10px] text-muted-foreground block mt-1">lg</span>
                  </div>
                  <div className="text-center">
                    <Spinner size="xl" />
                    <span className="text-[10px] text-muted-foreground block mt-1">xl</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Badge variant="outline" className="gap-2">
                    <Spinner size="xs" variant="primary" /> Primary
                  </Badge>
                  <Badge variant="outline" className="gap-2">
                    <Spinner size="xs" variant="muted" /> Muted
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Skeleton Text */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">SkeletonText</CardTitle>
                <CardDescription>Placeholder paragraf dengan animasi shimmer.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <SkeletonText lines={4} />
              </CardContent>
            </Card>

            {/* Skeleton Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">SkeletonCard</CardTitle>
                <CardDescription>Placeholder kartu konten utuh.</CardDescription>
              </CardHeader>
              <CardContent>
                <SkeletonCard />
              </CardContent>
            </Card>
          </div>

          {/* Skeleton Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">SkeletonTable (Simulasi Load Tabel Transaksi)</CardTitle>
              <CardDescription>Placeholder grid/tabel saat memuat data pesanan.</CardDescription>
            </CardHeader>
            <CardContent>
              <SkeletonTable rows={3} cols={4} />
            </CardContent>
          </Card>
        </section>

        {/* 9. BOTTOM NAVIGATION */}
        <section id="bottom-nav" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary">Navigation</div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">BottomNavBar (Mobile)</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Navigasi bawah gelap dengan FAB Plus di tengah, badge notifikasi, state aktif,
                mode ikon-saja, dan dukungan konten tengah kustom. Preview dirender dalam frame
                ponsel seperti tampilannya di halaman mobile sungguhan.
              </p>
            </div>
            <Badge variant="outline">Mobile Only</Badge>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {/* Frame 1 — 4 item · label · badge · state aktif */}
            <div className="space-y-2">
              <div className="text-center text-xs font-medium text-muted-foreground">4 item · label tampil · badge &amp; state aktif</div>
              <div className="relative w-full max-w-[375px] h-[560px] rounded-[2.5rem] border-[6px] border-foreground/15 bg-background shadow-2xl overflow-hidden">
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[10px] font-semibold text-foreground/60">
                  <span>9:41</span>
                  <span className="tracking-tighter">●●● ●●</span>
                </div>
                {/* Fake mobile page content */}
                <div className="space-y-4 px-5 pt-4">
                  <div className="h-28 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 border border-border/40" />
                  <div className="h-4 w-2/3 rounded-lg bg-muted" />
                  <div className="grid grid-cols-2 gap-3">
                    <SkeletonCard />
                    <SkeletonCard />
                  </div>
                  <SkeletonText lines={3} />
                </div>
                {/* Nav pinned at the frame bottom, FAB floats above it */}
                <BottomNavBar
                  items={[
                    { id: "home", label: "Home", href: "#", icon: Home, active: true },
                    { id: "search", label: "Search", href: "#", icon: Search },
                    { id: "alerts", label: "Alerts", href: "#", icon: Bell, badge: 12 },
                    { id: "profile", label: "Profile", href: "#", icon: User },
                  ]}
                  centerLabel="Buat"
                  onCenterPress={() => {}}
                  className="!absolute !block"
                />
              </div>
            </div>

            {/* Frame 2 — 2 item · ikon saja · FAB aktif */}
            <div className="space-y-2">
              <div className="text-center text-xs font-medium text-muted-foreground">2 item · ikon saja (showLabels=false) · centerActive</div>
              <div className="relative w-full max-w-[375px] h-[560px] rounded-[2.5rem] border-[6px] border-foreground/15 bg-background shadow-2xl overflow-hidden">
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[10px] font-semibold text-foreground/60">
                  <span>9:41</span>
                  <span className="tracking-tighter">●●● ●●</span>
                </div>
                {/* Fake mobile page content */}
                <div className="space-y-4 px-5 pt-4">
                  <div className="h-9 w-40 rounded-xl bg-muted" />
                  <SkeletonCard />
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-16 rounded-xl bg-muted/70" />
                    <div className="h-16 rounded-xl bg-muted/70" />
                    <div className="h-16 rounded-xl bg-muted/70" />
                  </div>
                </div>
                {/* Nav pinned at the frame bottom, FAB floats above it */}
                <BottomNavBar
                  showLabels={false}
                  centerLabel="Buat"
                  onCenterPress={() => {}}
                  centerActive
                  items={[
                    { id: "home", label: "Home", href: "#", icon: Home },
                    { id: "profile", label: "Profile", href: "#", icon: User },
                  ]}
                  className="!absolute !block"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 10. DRAWER (MOBILE) */}
        <section id="drawers" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary">Overlay</div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Drawer (Mobile)</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Drawer mobile — bottom sheet dengan handle bar &amp; safe-area, nav drawer dari kiri, dan drawer
                aksi dari kanan. Backdrop tap-to-close, tombol Escape, dan scroll-lock otomatis. Default
                <code className="mx-1 text-xs">mobileOnly</code> — otomatis tersembunyi di layar lg ke atas; set
                <code className="mx-1 text-xs">mobileOnly=&#123;false&#125;</code> agar tetap tampil (seperti preview
                frame ini). Preview dirender dalam frame ponsel seperti tampilannya di halaman mobile sungguhan.
              </p>
            </div>
            <Badge variant="outline">Mobile Only · Default</Badge>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {/* Frame 1 — Bottom sheet */}
            <div className="space-y-2">
              <div className="text-center text-xs font-medium text-muted-foreground">Bottom sheet · handle bar · footer aksi</div>
              <div className="relative isolate w-full max-w-[375px] h-[560px] rounded-[2.5rem] border-[6px] border-foreground/15 bg-background shadow-2xl overflow-hidden">
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[10px] font-semibold text-foreground/60">
                  <span>9:41</span>
                  <span className="tracking-tighter">●●● ●●</span>
                </div>
                {/* Fake mobile page content */}
                <div className="space-y-4 px-5 pt-4">
                  <div className="h-28 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 border border-border/40" />
                  <SkeletonText lines={3} />
                  <div className="grid grid-cols-2 gap-3">
                    <SkeletonCard />
                    <SkeletonCard />
                  </div>
                </div>
                {/* Sheet trigger */}
                <div className="px-5 pt-4">
                  <Button size="sm" className="w-full" onClick={() => setIsBottomSheetOpen(true)}>
                    Buka Bottom Sheet
                  </Button>
                </div>
                {/* Bottom sheet contained in the frame */}
                <Drawer
                  open={isBottomSheetOpen}
                  onClose={() => setIsBottomSheetOpen(false)}
                  title="Detail Pesanan #WJ-2841"
                  maxHeight="75%"
                  lockScroll={false}
                  mobileOnly={false}
                  backdropClassName="!absolute"
                  className="!absolute"
                  footer={
                    <div className="flex items-center justify-end gap-3 w-full">
                      <Button variant="outline" size="sm" onClick={() => setIsBottomSheetOpen(false)}>
                        Tutup
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => {
                          alert("Pesanan ditandai selesai!");
                          setIsBottomSheetOpen(false);
                        }}
                      >
                        Tandai Selesai
                      </Button>
                    </div>
                  }
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Side: bottom</Badge>
                      <Badge variant="outline">Handle bar</Badge>
                      <Badge variant="default">Safe-area</Badge>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-muted/40 p-3.5 flex items-start gap-3">
                      <InfoIcon className="size-4 text-primary shrink-0 mt-0.5" />
                      <div className="text-[11px] leading-relaxed text-muted-foreground">
                        Sheet menempel ke dasar layar dengan rounded-t-2xl, tap backdrop untuk tutup, dan konten scrollable.
                        Tutup dengan tap handle bar, tap backdrop, tombol ✕, atau Escape.
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-xs font-semibold text-muted-foreground">Ringkasan Item</div>
                      <SkeletonText lines={2} />
                      <SkeletonCard />
                    </div>
                  </div>
                </Drawer>
              </div>
            </div>

            {/* Frame 2 — Left drawer */}
            <div className="space-y-2">
              <div className="text-center text-xs font-medium text-muted-foreground">Left drawer · menu navigasi</div>
              <div className="relative isolate w-full max-w-[375px] h-[560px] rounded-[2.5rem] border-[6px] border-foreground/15 bg-background shadow-2xl overflow-hidden">
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[10px] font-semibold text-foreground/60">
                  <span>9:41</span>
                  <span className="tracking-tighter">●●● ●●</span>
                </div>
                {/* Fake app bar with menu trigger */}
                <div className="flex items-center justify-between px-4 pt-2">
                  <Button variant="ghost" size="icon" aria-label="Buka menu" onClick={() => setIsLeftDrawerOpen(true)}>
                    <Menu className="size-5" aria-hidden="true" />
                  </Button>
                  <div className="h-7 w-28 rounded-lg bg-muted" />
                </div>
                {/* Fake mobile page content */}
                <div className="space-y-4 px-5 pt-4">
                  <SkeletonText lines={4} />
                  <SkeletonCard />
                </div>
                {/* Left drawer contained in the frame */}
                <Drawer
                  open={isLeftDrawerOpen}
                  onClose={() => setIsLeftDrawerOpen(false)}
                  title="Menu Navigasi"
                  side="left"
                  lockScroll={false}
                  mobileOnly={false}
                  backdropClassName="!absolute"
                  className="!absolute"
                >
                  <nav className="flex flex-col gap-1" aria-label="Drawer navigation demo">
                    {[
                      { label: "Dashboard", icon: Home },
                      { label: "Pencarian", icon: Search },
                      { label: "Notifikasi", icon: Bell },
                      { label: "Profil Akun", icon: User },
                    ].map(({ label, icon: Icon }) => (
                      <button
                        key={label}
                        type="button"
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground transition-colors text-left"
                      >
                        <Icon className="size-4 shrink-0" aria-hidden="true" />
                        {label}
                      </button>
                    ))}
                  </nav>
                  <div className="mt-4 rounded-xl border border-border/60 bg-muted/20 p-3 text-[11px] leading-relaxed text-muted-foreground">
                    Drawer kiri slide dari tepi kiri layar dengan lebar maksimum 20rem dan border sisi kanan.
                  </div>
                </Drawer>
              </div>
            </div>

            {/* Frame 3 — Right drawer */}
            <div className="space-y-2">
              <div className="text-center text-xs font-medium text-muted-foreground">Right drawer · panel aksi · tanpa handle</div>
              <div className="relative isolate w-full max-w-[375px] h-[560px] rounded-[2.5rem] border-[6px] border-foreground/15 bg-background shadow-2xl overflow-hidden">
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[10px] font-semibold text-foreground/60">
                  <span>9:41</span>
                  <span className="tracking-tighter">●●● ●●</span>
                </div>
                {/* Fake app bar with filter trigger */}
                <div className="flex items-center justify-between px-4 pt-2">
                  <div className="h-7 w-28 rounded-lg bg-muted" />
                  <Button variant="ghost" size="icon" aria-label="Buka filter" onClick={() => setIsRightDrawerOpen(true)}>
                    <SlidersHorizontal className="size-5" aria-hidden="true" />
                  </Button>
                </div>
                {/* Fake mobile page content */}
                <div className="space-y-4 px-5 pt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <SkeletonCard />
                    <SkeletonCard />
                  </div>
                  <SkeletonText lines={3} />
                </div>
                {/* Right drawer contained in the frame */}
                <Drawer
                  open={isRightDrawerOpen}
                  onClose={() => setIsRightDrawerOpen(false)}
                  title="Filter Tampilan"
                  side="right"
                  showHandle={false}
                  lockScroll={false}
                  mobileOnly={false}
                  backdropClassName="!absolute"
                  className="!absolute"
                  footer={
                    <div className="flex items-center justify-end gap-3 w-full">
                      <Button variant="outline" size="sm" onClick={() => setIsRightDrawerOpen(false)}>
                        Batal
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => {
                          alert("Filter diterapkan!");
                          setIsRightDrawerOpen(false);
                        }}
                      >
                        Terapkan
                      </Button>
                    </div>
                  }
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Side: right</Badge>
                      <Badge variant="outline">Tanpa handle</Badge>
                    </div>
                    <FormField label="Kategori Produk">
                      <Select defaultValue="makanan">
                        <option value="makanan">Makanan &amp; Minuman</option>
                        <option value="fashion">Fashion &amp; Aksesori</option>
                        <option value="jasa">Jasa &amp; Layanan</option>
                      </Select>
                    </FormField>
                    <div className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/20">
                      <div>
                        <div className="text-xs font-semibold">Hanya Buka Sekarang</div>
                        <div className="text-[11px] text-muted-foreground">Sembunyikan toko yang tutup</div>
                      </div>
                      <Switch checked={true} size="sm" />
                    </div>
                  </div>
                </Drawer>
              </div>
            </div>
          </div>
        </section>

        {/* 8. CARDS, METRICS & STATS */}
        <section id="cards" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary">Data Presentation</div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Cards & Metric Displays</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Komponen metrik performa, kartu analitik, dan tampilan status kosong (EmptyState).
              </p>
            </div>
            <Badge variant="outline">Metric Tones</Badge>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              label="TOTAL PENGUNJUNG"
              value="42,850"
              helper="+18.4% dibandingkan minggu lalu"
              tone="good"
              signal="+18.4%"
            />
            <MetricCard
              label="TRANSAKSI QRIS"
              value="Rp 12.4M"
              helper="182 pesanan berhasil dibayar"
              tone="good"
              signal="Active"
            />
            <MetricCard
              label="KONSUMSI BANDWIDTH"
              value="78.2%"
              helper="Mendekati batas kuota paket Starter"
              tone="warning"
              signal="78%"
            />
            <MetricCard
              label="GAGAL INTEGRASI"
              value="3"
              helper="Perlu pengecekan webhook WhatsApp"
              tone="danger"
              signal="Perlu Cek"
            />
          </div>

          {/* Subtle Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <SubtleStat label="UPTIME SERVER" value="99.98%" helper="30 hari terakhir" />
            <SubtleStat label="RESPONS TIME" value="142 ms" helper="Edge CDN Jakarta" />
            <SubtleStat label="TOTAL PRODUK" value="84 Item" helper="12 kategori aktif" />
            <SubtleStat label="DOMISILI PEMBELI" value="34 Kota" helper="Terbanyak: DIY & Jateng" />
          </div>

          {/* Empty State */}
          <Card>
            <CardContent className="p-8">
              <EmptyState
                title="Belum Ada Pesanan Masuk Hari Ini"
                text="Semua pesanan baru yang masuk lewat website akan otomatis muncul di sini lengkap dengan notifikasi WhatsApp."
                action={
                  <Button size="sm" onClick={() => setIsBasicDialogOpen(true)}>
                    Buat Pesanan Manual Demo
                  </Button>
                }
              />
            </CardContent>
          </Card>
        </section>

        {/* 11. VARIANT PICKER */}
        <section id="variant-picker" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary">Selection</div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Variant Picker</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Komponen pemilih varian dengan pill trigger, filter chip per kategori, dan grid card dengan wireframe preview.
                Cocok untuk editor sidebar section.
              </p>
            </div>
            <Badge variant="outline">VariantPicker</Badge>
          </div>

          <VariantPickerDemo />
        </section>

        {/* 9. ICONS & SPARKLE SHOWCASE */}
        <section id="icons" className="scroll-mt-24 space-y-6">
          <div className="border-b border-border/60 pb-5">
            <div className="text-xs font-bold uppercase tracking-wider text-primary">Icons &amp; Sparkle</div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Icon Components</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Custom SVG icons (<code className="text-xs bg-muted px-1 py-0.5 rounded">size: sm | md | lg</code>) dan AI Sparkle components yang diekspor dari{" "}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">webjoz-ui</code>.
            </p>
          </div>

          {/* Icon grid helper */}
          {(() => {
            const ALL_ICONS: { icon: React.ReactNode; label: string }[] = [
              { icon: <SunIcon />, label: "SunIcon" },
              { icon: <MoonIcon />, label: "MoonIcon" },
              { icon: <CheckIcon />, label: "CheckIcon" },
              { icon: <MailIcon />, label: "MailIcon" },
              { icon: <WhatsAppIcon />, label: "WhatsAppIcon" },
              { icon: <LockIcon />, label: "LockIcon" },
              { icon: <AlertIcon />, label: "AlertIcon" },
              { icon: <InfoIcon />, label: "InfoIcon" },
              { icon: <CloseIcon />, label: "CloseIcon" },
              { icon: <BookOpenIcon />, label: "BookOpenIcon" },
              { icon: <EmptyChartIcon />, label: "EmptyChartIcon" },
            ];
            return (
              <Card className="border-border/40 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">1. Custom Icon Set</CardTitle>
                  <CardDescription>
                    Semua icon dari <code className="text-xs">webjoz-ui</code> — tiga ukuran:{" "}
                    <code className="text-xs">sm</code> / <code className="text-xs">md</code> / <code className="text-xs">lg</code>.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {(["sm", "md", "lg"] as const).map((sz) => (
                    <div key={sz} className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        size=&quot;{sz}&quot;{sz === "md" ? " — default" : ""}
                      </p>
                      <div className="flex flex-wrap items-end gap-4">
                        {ALL_ICONS.map(({ label }) => {
                          const IconComponent = { SunIcon, MoonIcon, CheckIcon, MailIcon, WhatsAppIcon, LockIcon, AlertIcon, InfoIcon, CloseIcon, BookOpenIcon, EmptyChartIcon }[label] as React.ComponentType<{ size?: "sm" | "md" | "lg" }>;
                          return (
                            <div key={label} className="flex flex-col items-center gap-1.5">
                              <div className="p-2.5 rounded-lg bg-muted/60 border border-border/40">
                                <IconComponent size={sz} />
                              </div>
                              <span className="text-[10px] text-muted-foreground font-mono">{label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })()}

          {/* SparkleIcon */}
          <Card className="border-border/40 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">2. SparkleIcon — AI Badge Indicator</CardTitle>
              <CardDescription>
                Ikon sparkle untuk menandakan fitur AI. Gunakan <code className="text-xs">className</code> untuk ukuran dan warna.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-end gap-6">
                {[
                  { cls: "size-4", label: "size-4" },
                  { cls: "size-5", label: "size-5" },
                  { cls: "size-6", label: "size-6" },
                  { cls: "size-8", label: "size-8" },
                ].map(({ cls, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div className="p-3 rounded-xl bg-muted/60 border border-border/40">
                      <SparkleIcon className={cls} />
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">{label}</span>
                  </div>
                ))}
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <SparkleIcon className="size-5 text-primary" />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">text-primary</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 rounded-xl bg-muted/60 border border-border/40 flex items-center gap-2">
                    <SparkleIcon className="size-4 text-primary" />
                    <span className="text-sm font-medium">Generate AI</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">inline usage</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SparkleGenAI */}
          <Card className="border-border/40 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">3. SparkleGenAI — AI Generate Mascot Icon</CardTitle>
              <CardDescription>
                Versi kedua sparkle mascot AI — dipakai sebagai ilustrasi atau penanda fitur generate.
                Props: <code className="text-xs">className</code> untuk ukuran &amp; warna.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-end gap-6">
                {[
                  { cls: "size-4", label: "size-4" },
                  { cls: "size-5", label: "size-5" },
                  { cls: "size-6", label: "size-6" },
                  { cls: "size-8", label: "size-8" },
                  { cls: "size-10", label: "size-10" },
                ].map(({ cls, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div className="p-3 rounded-xl bg-muted/60 border border-border/40">
                      <SparkleGenAI className={cls} />
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">{label}</span>
                  </div>
                ))}
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <SparkleGenAI className="size-6 text-primary" />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">text-primary</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 rounded-xl bg-muted/60 border border-border/40 flex items-center gap-2">
                    <SparkleGenAI className="size-5 text-primary" />
                    <span className="text-sm font-medium">Generate Website</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">inline button label</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-border/80 bg-muted/30 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-transparent.png"
              alt="Webjoz"
              width={90}
              height={30}
              className="h-6 w-auto object-contain dark:invert opacity-80"
            />
            <span className="text-border">|</span>
            <span>Standard UX Engine for Webjoz Applications</span>
          </div>
          <div>
            Built with React 19, Next.js, OKLCH Tokens & Tailwind v4
          </div>
        </div>
      </footer>

      {/* =========================================================================
          LIVE DIALOG MODALS
      ========================================================================= */}

      {/* 1. Basic Standard Dialog */}
      <Dialog
        open={isBasicDialogOpen}
        onOpenChange={setIsBasicDialogOpen}
        title="Webjoz Design System Dialog"
        footer={
          <div className="flex items-center justify-end gap-3 w-full">
            <Button variant="outline" onClick={() => setIsBasicDialogOpen(false)}>
              Tutup
            </Button>
            <Button
              variant="default"
              onClick={() => {
                alert("Aksi berhasil dijalankan!");
                setIsBasicDialogOpen(false);
              }}
            >
              Konfirmasi
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="rounded-xl border border-border/60 bg-muted/40 p-3.5 flex items-start gap-3">
            <InfoIcon className="size-5 text-primary shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-muted-foreground">
              Komponen Dialog ini murni dibangun tanpa library pihak ketiga, terikat langsung dengan CSS tokens tema Anda.
            </div>
          </div>
          <p className="text-sm leading-relaxed text-foreground/90">
            Ini adalah contoh modal dialog standar. Anda dapat memasukkan teks penjelasan, rincian transaksi, atau panduan singkat di sini.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Badge variant="secondary">Accessible</Badge>
            <Badge variant="outline">Backdrop Click Close</Badge>
            <Badge variant="default">Clean Typography</Badge>
          </div>
        </div>
      </Dialog>

      {/* 2. Destructive Confirmation Dialog */}
      <Dialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
        title="Konfirmasi Hapus Data"
        footer={
          <div className="flex items-center justify-end gap-3 w-full">
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
              Batalkan
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                alert("Data simulasi dihapus.");
                setIsConfirmDialogOpen(false);
              }}
            >
              Ya, Hapus Sekarang
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 flex items-start gap-3">
            <AlertIcon className="size-5 text-destructive shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-destructive font-medium">
              Tindakan ini tidak dapat dibatalkan. Semua data konfigurasi domain dan riwayat webhook akan dihapus permanen.
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Apakah Anda yakin ingin melanjutkan proses penghapusan situs ini dari akun Webjoz Anda?
          </p>
        </div>
      </Dialog>

      {/* 3. Form Inside Dialog */}
      <Dialog
        open={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        title="Tambah Website Baru"
        footer={
          <div className="flex items-center justify-end gap-3 w-full">
            <Button variant="outline" onClick={() => setIsFormDialogOpen(false)}>
              Batal
            </Button>
            <Button
              variant="default"
              onClick={() => {
                alert("Situs berhasil ditambahkan!");
                setIsFormDialogOpen(false);
              }}
            >
              Simpan & Buat Situs
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <FormField label="Nama Brand / Bisnis" required>
            <Input placeholder="Contoh: Kopi Nusantara" defaultValue="Warung Berkah" />
          </FormField>

          <FormField label="Pilih Paket Layanan">
            <Select defaultValue="pro">
              <option value="starter">Starter — Gratis</option>
              <option value="pro">Pro Merchant — Rp 49.000/bln</option>
              <option value="enterprise">Enterprise — Kustom</option>
            </Select>
          </FormField>

          <div className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/20">
            <div>
              <div className="text-xs font-semibold">Aktifkan Notifikasi WhatsApp</div>
              <div className="text-[11px] text-muted-foreground">Kirim order langsung ke nomor pemilik</div>
            </div>
            <Switch checked={true} size="sm" />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
