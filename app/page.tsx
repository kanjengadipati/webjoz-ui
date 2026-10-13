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
} from "@/components/icons";
import { Sparkles, ChevronRight } from "lucide-react";

const templates = [
  { id: "bold", name: "Bold", emoji: "⚡", desc: "Tegas & berenergi tinggi" },
  { id: "colorful", name: "Colorful", emoji: "🎨", desc: "Ceria & dinamis" },
  { id: "dynamic", name: "Dynamic", emoji: "🚀", desc: "Modern & high-tech" },
  { id: "elegant", name: "Elegant", emoji: "✨", desc: "Elegan & mewah" },
  { id: "futuristic", name: "Futuristic", emoji: "🤖", desc: "Futuristik & canggih" },
  { id: "minimalist", name: "Minimalist", emoji: "🪷", desc: "Bersih & tenang" },
  { id: "natural", name: "Natural", emoji: "🌿", desc: "Hangat & organik" },
  { id: "retro", name: "Retro", emoji: "🎞️", desc: "Klasik & nostalgia" },
  { id: "kuliner", name: "Kuliner", emoji: "🍜", desc: "F&B, cafe, restoran" },
  { id: "jasa", name: "Jasa", emoji: "🔧", desc: "Agensi & jasa profesional" },
  { id: "produk", name: "Produk", emoji: "📦", desc: "Katalog & e-commerce" },
];

export default function DesignSystemPage() {
  // Theme state
  const [isDark, setIsDark] = useState(false);

  // Modal demo states
  const [isBasicDialogOpen, setIsBasicDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

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
            <a href="#templates" className="px-2.5 py-1.5 rounded-lg hover:text-foreground hover:bg-muted transition-colors whitespace-nowrap">Templates</a>
          </nav>

          {/* Theme switcher & template link */}
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
            <Link href="/preview/minimalist">
              <Button size="sm" variant="default" className="text-xs whitespace-nowrap">
                Template Preview →
              </Button>
            </Link>
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
            <Badge variant="outline">5 Varian · 4 Ukuran</Badge>
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

        {/* 9. TEMPLATES SHOWCASE */}
        <section id="templates" className="scroll-mt-24 space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary">Landing Page Themes</div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Katalog Template Webjoz</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Koleksi template landing page lengkap yang dibangun di atas fondasi komponen UI ini.
              </p>
            </div>
            <Badge variant="outline">11 Template Aktif</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((t) => (
              <Link
                key={t.id}
                href={`/preview/${t.id}`}
                className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card p-5 hover:border-primary/40 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl p-2 rounded-xl bg-muted/60">{t.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base group-hover:text-primary transition-colors flex items-center justify-between">
                      <span>{t.name}</span>
                      <ChevronRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{t.desc}</p>
                    <div className="mt-3">
                      <span className="text-[11px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                        Preview /preview/{t.id}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
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
