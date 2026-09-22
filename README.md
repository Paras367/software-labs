# SOFTWARELABS

> Code. Build. Ship.

Official landing page for **SOFTWARELABS** — a developer-focused technology
company that builds and sells production-ready software, source code,
developer tools and digital products. Built to feel like an engineering
lab, not another SaaS template.

## Stack

- Next.js 14 (App Router) + React + TypeScript
- Tailwind CSS (brand tokens in `tailwind.config.ts`)
- Lucide React icons
- Self-hosted variable fonts (Inter + JetBrains Mono) — no external font CDN calls
- Zero client-side dependencies beyond React itself — fully static, prerendered output

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start       # serve the production build
npm run typecheck   # tsc --noEmit
npm run lint         # next lint
```

## Project structure

```
app/                 App Router entry, layout, metadata, sitemap
components/          Navbar, Footer, terminal panel, buttons, headings
components/sections/ One file per landing-page section (Hero, Products, ...)
lib/                 Site constants, product catalogue, section copy/content
public/              Favicon, OG image, robots.txt
```

## Brand tokens

| Token         | Hex       | Used for                          |
|---------------|-----------|------------------------------------|
| `lab-navy`    | `#0B2545` | Backgrounds, navbar, footer        |
| `lab-blue`    | `#134074` | Cards, buttons, secondary surfaces |
| `lab-accent`  | `#5B9BD5` | Highlights, glows, borders, icons  |
| `lab-ice`     | `#DCEAF7` | Text on dark, light surfaces       |

Before going live: swap the placeholder email/social links in `lib/site.ts`,
wire the product "View Details" / "Explore Products" buttons to real routes
or a checkout, and replace `public/og.svg` with a PNG/JPG for wider social-card
support (some platforms don't render SVG `og:image`).

---

Built with ❤️ in Chandigarh, India — by [Paras Dhiman (CyberVex)](https://github.com/Paras367).
