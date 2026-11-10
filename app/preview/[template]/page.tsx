import Link from "next/link";
import { notFound } from "next/navigation";
import {
  TemplateBold,
  TemplateColorful,
  TemplateDynamic,
  TemplateElegant,
  TemplateFuturistic,
  TemplateMinimalist,
  TemplateNatural,
  TemplateRetro,
  TemplateKuliner,
  TemplateJasa,
  TemplateProduk,
} from "@/components/templates";
import type { TemplateProps } from "@/components/templates";
import { TEMPLATE_DEFAULT_DESIGN_TOKENS } from "@/lib/template-defaults";
import { findShowcaseSample } from "@/lib/landing-showcase-data";

type TemplateCtor = React.ComponentType<TemplateProps>;

const TEMPLATE_MAP: Record<string, { component: TemplateCtor; businessType: string }> = {
  bold:       { component: TemplateBold,       businessType: "produk" },
  colorful:   { component: TemplateColorful,   businessType: "kuliner" },
  dynamic:    { component: TemplateDynamic,    businessType: "jasa" },
  elegant:    { component: TemplateElegant,    businessType: "jasa" },
  futuristic: { component: TemplateFuturistic, businessType: "jasa" },
  minimalist: { component: TemplateMinimalist, businessType: "produk" },
  natural:    { component: TemplateNatural,    businessType: "kuliner" },
  retro:      { component: TemplateRetro,      businessType: "kuliner" },
  kuliner:    { component: TemplateKuliner,    businessType: "kuliner" },
  jasa:       { component: TemplateJasa,       businessType: "jasa" },
  produk:     { component: TemplateProduk,     businessType: "produk" },
};

export function generateStaticParams() {
  return Object.keys(TEMPLATE_MAP).map((template) => ({ template }));
}

export default async function PreviewPage({ params }: { params: Promise<{ template: string }> }) {
  const { template } = await params;
  const entry = TEMPLATE_MAP[template];
  if (!entry) notFound();

  const { component: TemplateComponent, businessType } = entry;
  const sample = findShowcaseSample(businessType, template);
  const designToken = TEMPLATE_DEFAULT_DESIGN_TOKENS[template] ?? TEMPLATE_DEFAULT_DESIGN_TOKENS["minimalist"];

  return (
    <div className="relative">
      {/* Floating nav bar */}
      <div className="fixed top-4 left-0 right-0 flex justify-center z-[9999] pointer-events-none">
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-sm shadow-xl pointer-events-auto">
          <Link href="/" className="hover:text-violet-300 transition-colors">
            ← Daftar Template
          </Link>
          <span className="text-white/30">|</span>
          <span className="font-semibold capitalize text-violet-300">{template}</span>
        </div>
      </div>

      {/* Template preview */}
      <TemplateComponent
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        content={sample.content as any}
        design_token={designToken}
        isEditorMode={false}
        language="id"
      />
    </div>
  );
}
