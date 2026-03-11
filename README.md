<div align="center">

# 🍵 Pu'er Tea Wiki

**An Interactive Encyclopedia of Yunnan Pu'er Tea**

*Region Maps · Mountain Profiles · Glossary · Historical Timeline*

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0050?logo=framer)](https://www.framer.com/motion/)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel)](https://vercel.com/)

**[简体中文](./README.zh-CN.md)** | English

</div>

---

## About

**Pu'er Tea Wiki** is a beginner-friendly educational website dedicated to Yunnan Pu'er tea. Through stunning visuals and engaging interactions, it helps users easily understand the history, terminology, production regions, and famous mountains of Pu'er tea.

The project adopts a **Neo-Chinese** design aesthetic — not the traditional red-and-gold "old Chinese" style, but a modern reinterpretation of Eastern aesthetics: rice paper textures, ink wash effects, tea smoke particle animations, generous whitespace, and immersive storytelling layouts.

> Pure knowledge sharing. No e-commerce.

## Features

| Module | Route | Description |
|--------|-------|-------------|
| **Home** | `/` | Full-screen Hero with tea smoke animation, Bento Grid navigation cards, and scroll-triggered animated statistics |
| **History** | `/history` | Horizontal/vertical scrolling timeline spanning from the Eastern Han Dynasty to modern day |
| **Glossary** | `/glossary` | Categorized tabs with search filtering and expandable cards covering tea basics, tree types, processing terms, and tasting vocabulary |
| **Region Map** | `/regions` | Interactive Yunnan map built with real GeoJSON data, covering 4 major tea regions (Xishuangbanna, Lincang, Pu'er, Baoshan) |
| **Mountains** | `/mountains` | Masonry card layout with filters, featuring 20+ renowned tea mountains |
| **Mountain Detail** | `/mountains/[slug]` | Six-dimensional flavor radar chart (SVG animated), tasting notes, and similar mountain recommendations |
| **About** | `/about` | Project introduction and data sources |

## Design Highlights

- **Neo-Chinese Color Palette** — Tea Green `#2D5016` · Amber Gold `#8B6914` · Rice Paper White `#F5F0E8` · Cinnabar Red `#C4451C`
- **Tea Smoke Particles** — Canvas-rendered rising smoke effect on the Hero section
- **Ink Wash Hover Effects** — Ink diffusion animations on card hover interactions
- **Flavor Radar Chart** — Six-axis radar (Bitterness, Astringency, Sweetness, Aroma, Huigan, Chaqi) with viewport-triggered drawing animation
- **Interactive Region Map** — SVG path highlighting, click-to-expand details, smooth transitions
- **Dark / Light Mode** — Default rice paper light theme with optional ink-dark theme
- **Responsive** — Fully optimized for desktop and mobile

## Featured Mountains

20+ renowned tea mountains included in the first release:

| Region | Mountains |
|--------|-----------|
| **Xishuangbanna** | Lao Banzhang, Xin Banzhang, Lao Man'e, Yiwu, Guafengzhai, Bohetang, Wangong, Tongqinghe, Nannuo, Hekai, Naka, Mansong |
| **Lincang** | Bingdao, Xigui, Xiaohusai, Daxueshan |
| **Pu'er** | Jingmai, Kunlu |
| **Baoshan** | Gaoligong, Huangjiazhai |

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, SSG) |
| UI | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Animation | [Framer Motion 12](https://www.framer.com/motion/) |
| Map | [react-simple-maps](https://www.react-simple-maps.io/) + GeoJSON |
| Icons | [Lucide React](https://lucide.dev/) |
| Fonts | Noto Serif SC (headings) + Noto Sans SC (body) |
| Deployment | [Vercel](https://vercel.com/) |

## Project Structure

```
puer-tea-wiki/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Home
│   │   ├── history/            # Historical Timeline
│   │   ├── glossary/           # Glossary
│   │   ├── regions/            # Region Map
│   │   ├── mountains/          # Mountain List
│   │   │   └── [slug]/         # Mountain Detail
│   │   └── about/              # About
│   ├── components/
│   │   ├── layout/             # Header, Footer, Navigation
│   │   ├── home/               # Hero, BentoGrid, StatsCounter
│   │   ├── history/            # Timeline, TimelineNode
│   │   ├── glossary/           # GlossaryCard, SearchBar, CategoryTabs
│   │   ├── regions/            # YunnanMap, RegionPanel
│   │   ├── mountains/          # MountainCard, FlavorRadar, MountainFilter
│   │   └── ui/                 # Shared UI components
│   ├── data/                   # JSON data files
│   │   ├── history.json
│   │   ├── glossary.json
│   │   ├── regions.json
│   │   └── mountains/          # One JSON per mountain
│   ├── lib/                    # Utility functions
│   └── styles/                 # Global styles & CSS variables
├── public/                     # Static assets
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm / bun

### Local Development

```bash
git clone https://github.com/midasism/puer-tea-wiki.git
cd puer-tea-wiki
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Deploy

```bash
npm run build
npm start
```

#### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmidasism%2Fpuer-tea-wiki)

## Contributing

All tea mountain data is stored as JSON files in `src/data/mountains/`. PRs to add more mountain profiles are welcome.

Mountain JSON structure:

```json
{
  "id": "lao-ban-zhang",
  "name": "老班章",
  "region": "xishuangbanna",
  "subRegion": "勐海·布朗山",
  "altitude": "1700-1900m",
  "treeType": "古树乔木",
  "flavor": {
    "bitter": 8, "astringent": 6, "sweet": 7,
    "aroma": 8, "huigan": 9, "chaqi": 10
  },
  "description": "Known as the 'King of Pu'er Tea', famous for its bold character...",
  "tags": ["Bold", "Bulang Mountain", "Ancient Tree"]
}
```

## License

[MIT](LICENSE)

## Acknowledgments

Data sourced from publicly available Pu'er tea knowledge resources, for educational purposes only.
