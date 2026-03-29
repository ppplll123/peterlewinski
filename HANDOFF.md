# HANDOFF: Claude Code Continuation Guide

## Status: Foundation Complete

The entire project scaffold, design system, all 13 section components, data files, and React islands are built. This is a working Astro 6 project that Claude Code needs to install, refine, and deploy.

---

## IMMEDIATE NEXT STEPS (in order)

### Step 1: Install dependencies & verify build
```bash
cd peterlewinski
npm install
npm run dev
# Should start on http://localhost:4321
# Fix any TypeScript or import errors
```

### Step 2: Fix Tailwind v4 compatibility
Tailwind CSS v4 uses a different config approach than v3. You may need to:
- Switch to `@tailwindcss/vite` plugin instead of `@astrojs/tailwind`
- Or pin to `tailwindcss@3.4.x` which uses the traditional config file
- Test and pick whichever compiles cleanly

```bash
# Option A: Pin to Tailwind v3 (stable, proven)
npm install tailwindcss@3.4.17 @astrojs/tailwind@5.5.4

# Option B: Use Tailwind v4 with Vite plugin
npm install tailwindcss@4 @tailwindcss/vite
# Then update astro.config.mjs to use vite plugin instead of integration
```

### Step 3: Add scroll reveal (CSS IntersectionObserver)
Add this script to `Layout.astro` before closing `</body>`:
```html
<script>
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
</script>
```
Then add `class="reveal"` to section wrappers that should animate in on scroll.

### Step 4: Add Peter's photos
Copy uploaded images to proper locations:
```bash
# Hero photo
cp /path/to/cvpicpeterlewinski.jpg src/assets/images/hero.jpg

# Travel screenshots
cp IMG_7306.png src/assets/images/travel/hyatt-globalist.png
cp IMG_7307.png src/assets/images/travel/hotels-overview.png
cp IMG_7308.png src/assets/images/travel/airlines-status.png
cp IMG_7309.png src/assets/images/travel/hyatt-awards.png

# Then update components to use <Image> from astro:assets
```

Replace photo placeholders in these files:
- `src/components/Hero.astro` — add hero background image
- `src/components/Lifestyle.astro` — replace placeholder divs with actual screenshots
- `src/components/Watches.astro` — replace placeholder with AP photo
- `src/components/Cars.astro` — replace placeholder with G63 photo
- `src/components/Sports.astro` — replace placeholder with judo photo

### Step 5: Polish animations
Add staggered reveal animations to cards. In each section, wrap card grids:
```astro
<div class="reveal" style="animation-delay: 0.1s">
  <!-- card content -->
</div>
```

### Step 6: Formspree setup
1. Go to formspree.io, create free account
2. Create new form, get form ID
3. Replace `YOUR_FORM_ID` in `src/components/Contact.astro`

### Step 7: Build & deploy
```bash
npm run build
# Output goes to dist/

# Deploy to Vercel:
npx vercel

# Or push to GitHub and connect to Vercel dashboard
```

---

## PROJECT STRUCTURE REFERENCE

```
peterlewinski/
├── astro.config.mjs          # Astro + React + Tailwind + Sitemap
├── tailwind.config.mjs       # Custom gold/dark theme, fonts, animations
├── tsconfig.json             # Strict mode, path aliases
├── package.json              # All deps listed
├── .prettierrc               # Astro-compatible formatting
├── .gitignore
│
├── public/
│   └── evidence/             # Static PDFs (diplomas, certificates)
│
├── src/
│   ├── layouts/
│   │   └── Layout.astro      # Base HTML, SEO, Person schema, fonts
│   │
│   ├── pages/
│   │   └── index.astro       # Main page, imports all sections
│   │
│   ├── components/
│   │   ├── Nav.astro          # ✅ Sticky nav, mobile hamburger
│   │   ├── Hero.astro         # ✅ Full viewport, animated counters
│   │   ├── About.astro        # ✅ Three-column positioning
│   │   ├── Transformations.astro  # ✅ 7 achievement cards
│   │   ├── Career.astro       # ✅ Vertical timeline, 6 roles
│   │   ├── Research.astro     # ✅ Publications list, metrics, awards
│   │   ├── Education.astro    # ✅ 9 degrees, language bars
│   │   ├── Sports.astro       # ✅ Judo, athletics
│   │   ├── Lifestyle.astro    # ✅ Travel statuses (hotel + airline)
│   │   ├── Watches.astro      # ✅ AP Royal Oak showcase
│   │   ├── Cars.astro         # ✅ G63 Brabus showcase
│   │   ├── Contact.astro      # ✅ Form + contact info
│   │   ├── Footer.astro       # ✅ Links, copyright
│   │   └── ui/
│   │       ├── SectionTitle.astro   # ✅ Reusable section header
│   │       ├── Card.astro           # ✅ Transformation card
│   │       ├── TimelineItem.astro   # ✅ Career timeline entry
│   │       └── EvidenceLink.astro   # ✅ Small proof link badge
│   │
│   ├── islands/
│   │   └── StatCounter.tsx    # ✅ Animated number counter (React)
│   │
│   ├── data/
│   │   ├── publications.json  # ✅ 10 publications with citations
│   │   └── travel.json        # ✅ Hotel + airline statuses
│   │
│   ├── styles/
│   │   └── global.css         # ✅ Custom utilities, scrollbar, noise
│   │
│   └── assets/
│       └── images/            # Peter's photos go here
│           └── travel/        # Loyalty app screenshots
│
└── HANDOFF.md                 # This file
```

---

## DESIGN SYSTEM QUICK REFERENCE

### Colors
- Background: `bg-bg-primary` (#0A0A0A), `bg-bg-card` (#161616)
- Gold accent: `text-gold-500` (#C9A96E), `border-gold-500`
- Text: `text-text-primary` (#F5F5F0), `text-text-secondary` (#9A9A9A)

### Fonts
- Display/headings: `font-display` (Cormorant Garamond)
- Body text: `font-body` (DM Sans)
- Code/stats: `font-mono` (JetBrains Mono)

### Key CSS classes (from global.css)
- `.text-gold-gradient` — shimmering gold text
- `.gold-underline` — underline that grows on hover
- `.card-glow` — subtle gold glow on hover
- `.section-divider` — thin centered gold line
- `.evidence-badge` — small link to proof
- `.reveal` / `.visible` — scroll-triggered fade-in

---

## KNOWN ISSUES / TODO

1. **Tailwind v4 config** — May need adjustment depending on which version installs
2. **Image placeholders** — 4 sections have placeholder divs needing real photos
3. **Formspree ID** — Needs to be set up and replaced in Contact.astro
4. **Hero photo** — Currently no background image, just gradient
5. **Mobile testing** — Nav hamburger menu needs testing
6. **Lighthouse audit** — Run after images are added
7. **OG image** — Create a 1200x630 social share image for `/public/og-image.jpg`
8. **Font preload paths** — Update paths in Layout.astro after `npm install` resolves @fontsource

---

## CODE REVIEW SETUP (CodeRabbit / Similar)

The project is structured for easy review:
- **One component per file** — each section is independently reviewable
- **Data separated from presentation** — JSON files in `/src/data/`
- **No business logic in components** — purely presentational
- **TypeScript strict mode** — catches issues at build time
- **Path aliases** — `@components/`, `@data/`, `@islands/`
- **Consistent naming** — PascalCase components, camelCase data

Recommended `.coderabbit.yaml`:
```yaml
reviews:
  auto_review:
    enabled: true
    base_branches:
      - main
  path_filters:
    - "src/**"
    - "!node_modules/**"
    - "!dist/**"
  path_instructions:
    - path: "src/components/*.astro"
      instructions: "Review for accessibility (alt tags, ARIA labels, semantic HTML), responsive design, and consistent use of the design system (gold-500 accents, bg-bg-card backgrounds)."
    - path: "src/islands/*.tsx"
      instructions: "Review for React best practices, cleanup in useEffect, and performance (should only load via client:visible)."
    - path: "src/data/*.json"
      instructions: "Verify all URLs are active and data is accurate."
```

---

## GITHUB PUSH STRATEGY

### Option A: Push all at once (recommended for v1)
```bash
git init
git add .
git commit -m "feat: initial scaffold - all 13 sections, design system, data files"
git remote add origin git@github.com:ppplll123/peterlewinski.git
git push -u origin main
```

### Option B: Push in logical PRs (for code review)
```bash
# PR 1: Scaffold + design system
git add astro.config.mjs tailwind.config.mjs tsconfig.json package.json .prettierrc .gitignore
git add src/layouts/ src/styles/ src/pages/index.astro
git commit -m "feat: project scaffold, design system, layout"

# PR 2: Core sections
git add src/components/Nav.astro src/components/Hero.astro src/components/About.astro
git add src/components/ui/ src/islands/
git commit -m "feat: nav, hero, about, UI components, stat counter island"

# PR 3: Content sections
git add src/components/Career.astro src/components/Research.astro src/components/Education.astro
git add src/data/
git commit -m "feat: career timeline, research publications, education"

# PR 4: Lifestyle sections
git add src/components/Sports.astro src/components/Lifestyle.astro
git add src/components/Watches.astro src/components/Cars.astro
git commit -m "feat: sports, travel statuses, watches, cars"

# PR 5: Contact + footer
git add src/components/Contact.astro src/components/Footer.astro
git commit -m "feat: contact form, footer"
```

---

## REFERENCE FILES

These files contain the full content brief and were used to build this project:
- `PETERLEWINSKI_WEBSITE_BUILD_SPEC.md` — Full content for every section
- `PETERLEWINSKI_TECHNICAL_PLAN.md` — Tool choices and architecture decisions
- `HANDOFF.md` — This file (continuation guide for Claude Code)

All three should be in the project root for Claude Code context.
