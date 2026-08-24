# DEKA ERP — Marketing Landing Page

Marketing landing page for **DEKA ERP** (`dekaerp.com`), built with **Vue 3 + Vite** and optimized for deployment to **Cloudflare Pages**.

---

## 🎨 Brand Design System

Built strictly following the official DEKA ERP brand guide and palette:

| Token | Hex | Usage |
|---|---|---|
| **Dark / Charcoal** | `#1F2933` | Primary text, dark backgrounds, headers |
| **Warm Gray** | `#7C7A73` | Secondary text, subtle borders |
| **Amber** | `#FF9F1C` | Primary brand accent, CTAs, interactive highlights |
| **Sand / Cream** | `#E6E2DA` | Section backgrounds, contrast blocks |
| **Off-White** | `#F5F6F8` | Page background |

Brand assets are located in:
- `SVG/logo-full-light.svg` & `public/logos/logo-full-light.svg` (for light backgrounds)
- `SVG/logo-full-dark.svg` & `public/logos/logo-full-dark.svg` (for dark backgrounds)
- `SVG/logo.svg` & `public/logos/logo.svg` (icon mark)
- `landing-page-brief.md` (official project specification & copy guidelines)

---

## 🚀 Sections & Features

1. **Header**: Responsive navbar with DEKA logo, smooth anchor scrolling, mobile drawer menu with blur backdrop, and direct links to application portal.
2. **Hero Section**: Value proposition headline, amber gradient highlights, quick meta pills (Hosted/Self-Hosted, 5 Languages, Built-in Multi-Company), and modular ERP hub visual.
3. **Problem Section**: Side-by-side comparison ("Without DEKA" vs "With DEKA") highlighting the transition from spreadsheet chaos to unified single-system operations.
4. **Modules Section**: 4 categorized capability cards:
   - **Sell**: Sales, Invoicing, Contacts, Customer Portal
   - **Buy**: Purchasing, Accounting, Payments
   - **Make & Move**: Inventory, Manufacturing, Products, Barcode
   - **Run the Business**: Projects & Timesheets, Employees, Time Off, Maintenance
5. **Benefits Section**: Outcome-focused benefits (Quotation to payment with zero re-keying, stock matching reality, transaction-based month-end close, discussion threads on records, granular role-based permissions).
6. **Multi-Company Differentiator**: Dark container spotlighting DEKA's core differentiator — multi-company data separation with one-click company switcher mockup.
7. **Deployment Options**: Side-by-side comparison between **Cloud Hosted** and **Self-Hosted** deployment models, plus 5 language support badges (English, Arabic RTL, French, Spanish, Brazilian Portuguese).
8. **Closing CTA**: High-impact closing call-to-action with amber glow.
9. **Footer**: Brand mark, quick links, copyright, and technology credit (Laravel & Filament).

---

## 🔗 Action Destination Routing

Per the project brief:
- **Get Started / CTAs**: `https://cloud.dekaerp.com`
- **Sign In**: `https://cloud.dekaerp.com` (the app routes unauthenticated visitors to its login screen)

---

## 📚 User Guide (`/guide`)

The documentation at `/guide` has two sources:

| Source | File | Maintained by |
|---|---|---|
| DEKA-specific walkthroughs | `src/data/guideData.js` | Hand-written — edit directly |
| Module reference (69 pages) | `src/data/aureusGuides.js` | **Generated** — do not edit |

DEKA ERP is a fork of [AureusERP](https://github.com/aureuserp/aureuserp), so the
functional documentation is the same product. `scripts/build-guide.cjs` imports the
upstream user guide, rebrands it, strips the upstream (Aureus-branded) screenshots,
normalises the HTML to our design system, and writes stable slugs such as
`/guide/sales-orders-quotations`.

```bash
# Regenerate from the upstream docs (clones into .docs-source on first run)
npm run build:guide

# Pull upstream changes first, then regenerate
npm run build:guide:refresh

# Regenerate public/sitemap.xml from the routes + guide data
npm run build:sitemap
```

The generator also emits two small companion modules so the marketing pages can
link to and count the documentation without loading the whole corpus:
`src/data/guideStats.js` (totals, used by the homepage stats band) and
`src/data/guideIndex.js` (titles only, used by `/sitemap`). The guide route itself
is lazy-loaded, so the documentation never lands in the landing-page bundle.

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## ☁️ Deploying to Cloudflare Pages

### Option 1: Git Integration (Recommended)
1. Push this repository to **GitHub** or **GitLab**.
2. Log into the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select this repository and configure build settings:
   - **Framework preset**: `Vite` (or `Vue`)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js version**: `18` or `20` (add environment variable `NODE_VERSION = 20` if prompted)
4. Click **Save and Deploy**.

### Option 2: Direct Upload via Wrangler CLI
```bash
# Install Wrangler globally or use npx
npx wrangler pages deploy dist --project-name=deka-landing
```

> **Note on SPA Routing:** The repository includes `public/_redirects` with `/* /index.html 200` to ensure proper routing on Cloudflare Pages.