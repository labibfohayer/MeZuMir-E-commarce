# MeZuMir - Regional Culinary E-Commerce Platform & Digital Storefront

A modern, high-performance web application and digital food ordering platform designed for regional culinary specialties, traditional snacks, bakery items, and local delicacies from Mirsharai, Bangladesh. Built with React 19, TypeScript, Vite, and Tailwind CSS.

---

## Project Overview

MeZuMir provides local food producers and consumers with an intuitive, responsive ordering platform. The application combines an interactive menu catalog, an animated sliding cart drawer with real-time price calculations, multiple payment option workflows, and an embedded administrative dashboard (`/admin`) for fast product and inventory management. The platform is optimized for performance and deployed on Cloudflare Pages.

---

## Key Features

- Interactive Digital Menu: Dynamic product grid with category filtering (Traditional Snacks, Bakery, Savory Dishes, Desserts, and Drinks) and fast search capabilities.
- Sliding Cart Drawer: Responsive side-sheet displaying selected items, unit pricing, quantity adjustments, and dynamic delivery fee calculations in Bangladeshi Taka (BDT).
- Embedded Admin Dashboard: Built-in administrative interface (`src/components/admin/AdminDashboard.tsx`) enabling store managers to add products, adjust pricing, toggle inventory availability, and update descriptions directly in the client.
- Pre-Publish Verification Modal: Operational safety checklist verifying product data integrity, required images, and contact endpoints before publishing catalog updates.
- Mobile-First Ergonomics: Floating sticky navigation bar (`FloatingMobileBar.tsx`) providing thumb-accessible cart toggles, quick menu navigation, and checkout access on mobile screens.
- Trust and Assurance Modules: Dedicated sections for customer testimonials, hygiene standards, delivery radius information, and an FAQ accordion.
- Edge CDN Ready: Production-ready configuration including single-page application redirect rules (`public/_redirects`), caching headers (`public/_headers`), and Node runtime version specification (`.node-version`).

---

## Tech Stack

- Frontend Framework: React 19
- Programming Language: TypeScript 5.7
- Build Tool and Dev Server: Vite 6
- Styling: Tailwind CSS 3.4, PostCSS, Autoprefixer
- Iconography: Lucide React
- Deployment Target: Cloudflare Pages (Edge CDN, SSL, Custom Domains)

---

## Project Structure

```
MeZuMir-E-commarce/
├── public/
│   ├── _headers               # HTTP security and cache headers
│   ├── _redirects             # SPA client-side routing fallback rules
│   └── images/                # Product photography and banners
├── src/
│   ├── components/            # Reusable UI component modules
│   │   ├── admin/
│   │   │   └── AdminDashboard.tsx   # Catalog management dashboard
│   │   ├── ui/
│   │   │   └── Reveal.tsx           # Scroll reveal animation wrapper
│   │   ├── CartDrawer.tsx           # Sliding cart and order drawer
│   │   ├── Hero.tsx                 # Hero showcase and call-to-action
│   │   ├── MenuSection.tsx          # Categorized product listings
│   │   ├── ProductCard.tsx          # Individual product display card
│   │   ├── DeliveryPaymentSection.tsx # Payment methods and delivery terms
│   │   ├── FloatingMobileBar.tsx    # Mobile-optimized bottom toolbar
│   │   └── PrePublishChecklistModal.tsx # Pre-flight release check modal
│   ├── data/
│   │   └── products.ts        # Default product catalog data and schema
│   ├── types.ts               # Core TypeScript definitions (Product, CartItem)
│   ├── App.tsx                # Main view router and state coordinator
│   ├── main.tsx               # Application mounting point
│   └── index.css              # Global styles and Tailwind imports
├── .node-version              # Pinned Node.js version for CI/CD builds
├── package.json               # Node.js dependencies and script definitions
├── postcss.config.js          # PostCSS plugins configuration
├── tailwind.config.js         # Tailwind theme customizations
├── tsconfig.json              # TypeScript compiler settings
└── vite.config.ts             # Vite bundler configuration
```

---

## Installation and Setup Guide

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, or pnpm

### 1. Clone the Repository
```bash
git clone https://github.com/labibfohayer/MeZuMir-E-commarce.git
cd MeZuMir-E-commarce
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173` to test the live storefront with Hot Module Replacement (HMR).

### 4. Build and Typecheck
```bash
npm run build
```
This runs the TypeScript compiler (`tsc`) followed by Vite's production bundler, generating the static distribution output inside `dist/`.

---

## Cloudflare Pages Deployment

This repository is optimized for zero-configuration deployment to Cloudflare Pages:

1. Log in to the Cloudflare Dashboard and navigate to **Workers & Pages**.
2. Select **Create application** > **Pages** > **Connect to Git**.
3. Authorize your GitHub account and select `labibfohayer/MeZuMir-E-commarce`.
4. Configure the build parameters:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Build Output Directory: `dist`
   - Root Directory: `/`
5. Click **Save and Deploy**.

The application will be built and distributed globally across Cloudflare's edge network. Client-side routes are automatically resolved via `public/_redirects`.

---

## Author and Contact

Developed by **Labib Fohayer**.

- GitHub: [https://github.com/labibfohayer](https://github.com/labibfohayer)
- Portfolio: [https://labibfohayer.github.io](https://labibfohayer.github.io)

---

## License

This project is licensed under the MIT License.
