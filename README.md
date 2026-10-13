# webjoz-ui

**Standard Web UX, Component Library & Theme Engine for Webjoz**

[![Demo](https://img.shields.io/badge/Live%20Demo-webjoz--ui.vercel.app-6366f1?style=flat-square&logo=vercel&logoColor=white)](https://webjoz-ui.vercel.app/)
[![License](https://img.shields.io/badge/License-Internal-gray?style=flat-square)](.)

> 🎨 **[Live Demo → https://webjoz-ui.vercel.app/](https://webjoz-ui.vercel.app/)**  
> Showcase interaktif seluruh komponen UI, design tokens, moods, templates, dan icons.

A standalone UI package extracted from the Giwangan Web Generator project. This library provides reusable templates, section variants, shopping cart components, design tokens, and utilities for building Webjoz-powered landing pages.

---

## Contents

### Templates (`components/templates/`)
Multi-variant landing page templates:
- `bold`, `colorful`, `dynamic`, `elegant`, `futuristic`
- `minimalist`, `natural`, `retro`, `kuliner`, `jasa`, `produk`
- `shared.tsx` — Shared section renderers used by all templates
- `editor.tsx` — Section editor wrapper
- `helpers.ts` — Styling utilities (mood/color helpers)

### Sections (`components/sections/`)
Individual page section components with variant registries:
- `hero`, `about`, `benefits`, `catalog`, `contact`, `cta`
- `faq`, `footer`, `gallery`, `header`, `menu`, `partners`
- `pricing`, `stats`, `testimonials`, `works`

### Cart (`components/cart.tsx`)
Full-featured shopping cart drawer with:
- Cart item management
- Payment method info (QRIS, Transfer, COD)
- QRIS popup modal
- Shipping info

### UI Components (`components/ui/`)
Reusable base UI components: `Button`, `Card`, `Badge`, `Input`, `Dialog`, `Skeleton`, `Spinner`, etc.

### Lib (`lib/`)
- `template-defaults.ts` — Default content/config for each template
- `template-registry.ts` — Template metadata registry
- `payment-methods.ts` — Payment method definitions
- `design-assets-config.ts` — Typography, color, and design asset management
- `landing-showcase-data.ts` — Landing page showcase/demo data
- `utils.ts` — Class name utilities
- `ui-tokens.ts` — Design tokens
- `i18n/` — Internationalization context

---

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Usage as a Library

Import components directly:

```ts
import { TemplateRegistry, getTemplateDefaults } from 'webjoz-ui';
import { CartDrawer } from 'webjoz-ui/components/cart';
```

---

## API Client

The `lib/api/client.ts` is a minimal stub. Replace it in your consuming app with the real Webjoz API client by providing a compatible `request<T>()` function.

---

## License

Internal — Webjoz / Kanjeng Adipati
