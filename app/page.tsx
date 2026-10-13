import Link from "next/link";

const templates = [
  { id: "bold", name: "Bold", emoji: "⚡", desc: "Tegas dan berenergi tinggi" },
  { id: "colorful", name: "Colorful", emoji: "🎨", desc: "Ceria dan berwarna" },
  { id: "dynamic", name: "Dynamic", emoji: "🚀", desc: "Modern dan dinamis" },
  { id: "elegant", name: "Elegant", emoji: "✨", desc: "Elegan dan mewah" },
  { id: "futuristic", name: "Futuristic", emoji: "🤖", desc: "Futuristik dan hi-tech" },
  { id: "minimalist", name: "Minimalist", emoji: "🪷", desc: "Bersih dan minimalis" },
  { id: "natural", name: "Natural", emoji: "🌿", desc: "Hangat dan alami" },
  { id: "retro", name: "Retro", emoji: "🎞️", desc: "Klasik dan retro" },
  { id: "kuliner", name: "Kuliner", emoji: "🍜", desc: "Khusus bisnis kuliner" },
  { id: "jasa", name: "Jasa", emoji: "🔧", desc: "Khusus bisnis jasa" },
  { id: "produk", name: "Produk", emoji: "📦", desc: "Khusus bisnis produk" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-white/10 backdrop-blur-sm bg-white/5 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center font-bold text-sm">W</div>
          <span className="font-semibold text-lg">webjoz-ui</span>
          <span className="text-white/40 text-sm ml-auto">Component Library & Theme Showcase</span>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          Standard Web UX Engine for Webjoz
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-violet-200 to-pink-200 bg-clip-text text-transparent">
          Template Showcase
        </h1>
        <p className="text-white/60 text-xl max-w-2xl mx-auto">
          Kumpulan template landing page siap pakai untuk berbagai jenis bisnis.
          Pilih template untuk melihat preview langsung.
        </p>
      </div>

      {/* Template Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {templates.map((t) => (
            <Link
              key={t.id}
              href={`/preview/${t.id}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-violet-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/10"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{t.emoji}</div>
                <div>
                  <h2 className="font-semibold text-lg text-white group-hover:text-violet-300 transition-colors">
                    {t.name}
                  </h2>
                  <p className="text-white/50 text-sm mt-1">{t.desc}</p>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                <span className="text-violet-400 text-sm font-medium">Preview →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Info cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: "🧩", title: "Sections", count: "16+ sections", desc: "Hero, About, FAQ, Gallery, Contact, dll." },
            { icon: "🎨", title: "UI Components", count: "18+ components", desc: "Button, Card, Badge, Dialog, Input, dll." },
            { icon: "🛒", title: "Cart & Checkout", count: "Built-in", desc: "QRIS, Transfer, COD dengan popup modal." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="text-violet-400 text-xs font-semibold uppercase tracking-wider mb-1">{item.count}</div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-white/50 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
