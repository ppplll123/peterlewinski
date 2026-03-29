# PETERLEWINSKI.COM — TECHNICAL IMPLEMENTATION PLAN
## Research-Backed Tool Choices + Claude Code Execution Plan

---

## 1. FRAMEWORK DECISION: ASTRO 6.x (winner)

### Why Astro over Next.js, Hugo, or plain HTML

**Research summary:** In 2026, Astro is the consensus #1 pick for content-heavy portfolio sites. It ships zero JavaScript by default (unlike Next.js which hydrates the full React runtime), scores 100 on Lighthouse out of the box, and supports "islands architecture" — meaning you only load JS for the specific interactive components that need it (counter animations, scroll effects) while the rest stays pure static HTML.

| Factor | Astro | Next.js | Hugo | Plain HTML |
|--------|-------|---------|------|------------|
| JS shipped to client | 0 by default | Full React runtime (~85KB) | 0 | 0 |
| Lighthouse score | 100 default | ~85-95 needs tuning | 100 | 100 |
| Animation support | Islands (load Motion/GSAP only where needed) | Full React everywhere | Manual JS injection | Manual |
| Build speed | Fast | Medium | Fastest | N/A |
| Component model | .astro files + React/Vue/Svelte islands | React only | Go templates (painful) | None |
| Tailwind support | Native | Native | Plugin | Manual |
| Learning curve for Peter | Low (HTML-like syntax) | Medium (React knowledge needed) | High (Go templates) | None but no tooling |
| Image optimization | Built-in (astro:assets) | Built-in (next/image) | Manual | Manual |
| Deployment | Vercel/Cloudflare/Netlify 1-click | Vercel native | Any static host | Any |
| Claude Code compatibility | Excellent (.astro = HTML superset) | Good | Moderate | Excellent |

**Decision: Astro 6.x** — best performance, easiest for Claude Code to generate (files are basically enhanced HTML), zero JS payload for 90% of the site, islands architecture for the 10% that needs animation.

---

## 2. ANIMATION LIBRARY: MOTION (formerly Framer Motion) + CSS

### Why Motion over GSAP

**Research summary:** Motion (3.6M weekly npm downloads, MIT license, 30.7k GitHub stars) has overtaken GSAP as the most popular animation library. It's 2.5x faster than GSAP at animating from unknown values. Key advantages:

- **MIT open source** — GSAP is now owned by Webflow with restrictive licensing
- **Tree-shakable** — only include what you use (Astro's island model benefits hugely)
- **Now framework-agnostic** — works with React, Vue, vanilla JS (not React-only anymore)
- **Smaller bundle** — ~32KB gzipped for full library, but tree-shaking brings it much lower
- **Scroll animations built-in** — no separate plugin needed (GSAP needs ScrollTrigger)

**What we'll use Motion for (loaded as islands):**
- Hero counter animations (numbers counting up on scroll)
- Section fade-in/slide-in on scroll
- Card hover effects
- Timeline reveal animations
- Parallax scroll on hero image

**What we'll use pure CSS for (zero JS):**
- Navigation transitions
- Hover states on buttons/links
- Gold accent glows
- Smooth scrolling between sections
- Simple opacity transitions

**Decision: Motion for interactive islands + CSS for everything else** — this means 90% of the site loads with literally zero JavaScript.

---

## 3. STYLING: TAILWIND CSS 4.x

No debate here. Tailwind is the standard for 2026 utility-first CSS. Astro has native Tailwind integration.

**Additional CSS tools:**
- **@fontsource** — self-hosted fonts (no Google Fonts external requests)
- **tailwindcss-animate** — pre-built animation utilities
- **Custom CSS variables** — for the luxury dark theme (gold accents, matte blacks)

**Font stack (self-hosted via @fontsource):**
- Display: **Playfair Display** (serif, luxury feel) or **Cormorant Garamond** 
- Body: **DM Sans** (clean, modern sans-serif)
- Mono: **JetBrains Mono** (for any code/stats display)

---

## 4. IMAGE HANDLING

**Astro's built-in image optimization:**
- Auto WebP/AVIF conversion
- Responsive srcsets
- Lazy loading
- Blur-up placeholders

**For Peter's uploaded evidence screenshots:**
- Store originals in `/src/assets/evidence/`
- Astro auto-optimizes at build time
- No need for external image CDN

**Photo treatment:**
- Hero photos: full-bleed with CSS gradient overlay (dark bottom fade for text readability)
- Evidence screenshots: lightbox modal (use a simple Astro island with Motion for open/close)
- Watch/car photos: large format with subtle zoom on hover

---

## 5. DEPLOYMENT: VERCEL (recommended) or CLOUDFLARE PAGES

**Vercel:**
- Native Astro support (1-click deploy)
- Global CDN
- Free tier handles personal portfolio easily
- Custom domain support
- Analytics built-in

**Cloudflare Pages (alternative):**
- Even faster CDN (closer edge nodes)
- Free tier is more generous
- Slightly more manual setup

**Decision: Vercel** — simplest path, best DX, Peter can connect his domain in 2 minutes.

---

## 6. CONTACT FORM

Options for static site forms:
- **Formspree** — free tier (50 submissions/month), no backend needed, just a form action URL
- **Netlify Forms** — if deploying on Netlify
- **Resend + Astro API route** — if Peter wants email sent from his own domain

**Decision: Formspree** — zero code, works immediately, free tier is plenty for a portfolio.

---

## 7. ANALYTICS

- **Vercel Analytics** — privacy-friendly, built into Vercel dashboard
- **Plausible** (self-hosted or cloud) — lightweight, GDPR-compliant, no cookies
- **Or nothing** — it's a portfolio, not a business. Analytics optional.

---

## 8. SEO & METADATA

Astro handles this natively:
- Auto-generated sitemap (`@astrojs/sitemap`)
- RSS feed if blog is added later
- OpenGraph + Twitter Card meta tags per page
- JSON-LD structured data (Person schema for Google Knowledge Panel)
- robots.txt

**Important for Peter's Google presence:**
- Implement `Person` schema with sameAs links to Google Scholar, LinkedIn, ResearchGate
- This helps Google connect the website to his academic profile
- Meta description should include "Dr. Peter Lewinski" + key credentials

---

## 9. PROJECT STRUCTURE

```
peterlewinski.com/
├── public/
│   ├── favicon.ico
│   ├── og-image.jpg          # OpenGraph share image
│   └── evidence/             # PDFs, certificates (not optimized, served as-is)
│       ├── diplomas/
│       ├── publications/
│       └── press/
├── src/
│   ├── assets/
│   │   └── images/           # Photos (Astro optimizes these)
│   │       ├── hero-blue-shirt.webp
│   │       ├── hero-dark-suit.webp
│   │       ├── ap-royal-oak.webp
│   │       ├── g63-brabus.webp
│   │       ├── judo-oxford.webp
│   │       └── travel/       # Loyalty app screenshots
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Transformations.astro
│   │   ├── Career.astro
│   │   ├── Research.astro
│   │   ├── Education.astro
│   │   ├── Sports.astro
│   │   ├── Lifestyle.astro
│   │   ├── Watches.astro
│   │   ├── Cars.astro
│   │   ├── Contact.astro
│   │   ├── Footer.astro
│   │   └── ui/               # Reusable small components
│   │       ├── SectionTitle.astro
│   │       ├── Card.astro
│   │       ├── TimelineItem.astro
│   │       ├── StatCounter.astro   # ← This is a React island
│   │       ├── EvidenceLink.astro
│   │       └── Lightbox.astro      # ← This is a React island
│   ├── islands/              # React components (loaded with client:visible)
│   │   ├── AnimatedCounter.tsx
│   │   ├── ScrollReveal.tsx
│   │   └── ImageLightbox.tsx
│   ├── layouts/
│   │   └── Layout.astro      # Base HTML layout with fonts, meta, etc.
│   ├── pages/
│   │   └── index.astro       # Single-page site (all sections)
│   ├── data/
│   │   ├── publications.json
│   │   ├── education.json
│   │   ├── career.json
│   │   ├── transformations.json
│   │   ├── travel.json
│   │   └── evidence-links.json
│   └── styles/
│       └── global.css         # Custom CSS variables, fonts, base styles
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── tsconfig.json
```

---

## 10. CLAUDE CODE EXECUTION PLAN

### Phase 1: Scaffold (15 min)
```bash
# Initialize Astro project
npm create astro@latest peterlewinski -- --template minimal
cd peterlewinski

# Install dependencies
npx astro add tailwind
npx astro add sitemap
npm install @fontsource/playfair-display @fontsource/dm-sans
npm install motion                    # Animation library
npm install @astrojs/react react react-dom  # For islands

# Create directory structure
mkdir -p src/{components/ui,islands,data,styles,assets/images}
mkdir -p public/evidence/{diplomas,publications,press}
```

### Phase 2: Design System (20 min)
- Set up Tailwind config with custom colors (gold, matte black palette)
- Create global.css with CSS variables and font imports
- Build Layout.astro with meta tags, Person schema, font loading
- Build Nav.astro (sticky, transparent → solid on scroll, pure CSS)
- Build reusable components: SectionTitle, Card, TimelineItem, EvidenceLink

### Phase 3: Content Sections — Static (45 min)
Build each section as a .astro component (zero JS):
1. Hero.astro — full-viewport with gradient overlay, stats bar
2. About.astro — three-column positioning grid
3. Transformations.astro — card grid with CSS-only expand/collapse (details/summary)
4. Career.astro — vertical timeline
5. Research.astro — publication list with citation counts
6. Education.astro — degree timeline with university logos
7. Sports.astro — judo section
8. Lifestyle.astro — travel statuses with program logos
9. Watches.astro — AP Royal Oak showcase
10. Cars.astro — G63 Brabus showcase
11. Contact.astro — Formspree form
12. Footer.astro

### Phase 4: Interactive Islands (20 min)
Build React islands (loaded only when visible via `client:visible`):
1. AnimatedCounter.tsx — numbers count up when scrolled into view
2. ScrollReveal.tsx — wrapper that fades/slides children on scroll
3. ImageLightbox.tsx — click to expand evidence screenshots

### Phase 5: Data Files (15 min)
Populate JSON data files so content is separated from presentation:
- publications.json (title, journal, year, citations, doi, scholar_url)
- education.json (degree, institution, years, notes, logo)
- career.json (company, title, dates, location, bullets)
- travel.json (program, status, detail, logo_url)
- evidence-links.json (claim_id, evidence_type, url, description)

### Phase 6: Images & Evidence (15 min)
- Copy Peter's uploaded photos to src/assets/images/
- Copy evidence files to public/evidence/
- Create placeholder images for items Peter still needs to upload

### Phase 7: Polish & Deploy (20 min)
- Run Lighthouse audit, fix any issues
- Test responsive design (mobile, tablet, desktop)
- Add OpenGraph image
- Deploy to Vercel
- Connect custom domain

**Total estimated build time: ~2.5 hours in Claude Code**

---

## 11. KEY TECHNICAL DECISIONS SUMMARY

| Decision | Choice | Reason |
|----------|--------|--------|
| Framework | Astro 6.x | Zero JS default, islands for interactivity, 100 Lighthouse |
| Styling | Tailwind CSS 4.x | Utility-first, native Astro integration |
| Animation | Motion (ex-Framer Motion) + CSS | MIT license, tree-shakable, 2.5x faster than GSAP |
| Fonts | Playfair Display + DM Sans (self-hosted) | Luxury serif + clean sans, no external requests |
| Images | Astro built-in optimization | Auto WebP/AVIF, lazy loading, blur placeholders |
| Hosting | Vercel | 1-click Astro deploy, global CDN, free tier |
| Contact form | Formspree | Zero backend, free tier, instant setup |
| Analytics | Vercel Analytics or Plausible | Privacy-friendly, lightweight |
| SEO | Astro sitemap + JSON-LD Person schema | Google Knowledge Panel potential |

---

## 12. WHAT PETER NEEDS TO DO

**Before build:**
1. Register domain (peterlewinski.com or similar)
2. Create Vercel account (free, sign up with GitHub)
3. Create Formspree account (free)

**During build:**
1. Upload high-res photos (hero, judo, watch, car)
2. Upload diploma scans as PDFs
3. Review content in data JSON files

**After build:**
1. Connect domain to Vercel
2. Share on LinkedIn / Instagram
3. Add Google Search Console for indexing

---

## END OF TECHNICAL PLAN
