# Studi Professionali Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform praxis-ai from a generic AI consulting site into a profession-targeted platform for Italian Studi Professionali, with a Navy & Silver color palette, interactive AI simulation, ROI calculator, 6 profession-specific pages, and improved demo CX.

**Architecture:** Surgical modification of existing Next.js 16 App Router codebase. Replace design tokens + rewrite translations + add 3 new components (ProfessionSelector/AISimulation, ROICalculator, ProfessionPage) + restructure /soluzioni as dynamic routes + update demo hub/viewer for profession context. All animations retuned to cool palette.

**Tech Stack:** Next.js 16.1, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Supabase, CVA

---

## Task 1: Color System & Design Tokens

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Replace the @theme block**

Replace the entire `@theme inline { ... }` block (lines 3-32) with the new Navy & Silver palette:

```css
@theme inline {
  /* Navy & Silver palette */
  --color-accent: #C15F3C;
  --color-accent-glow: rgba(193,95,60,0.15);
  --color-navy: #0f172a;
  --color-navy-light: #1e3a5f;
  --color-navy-muted: #334155;
  --color-silver: #94a3b8;
  --color-surface: #f0f4f8;
  --color-surface-light: #f8fafc;
  --color-surface-dark: #e2e8f0;
  --color-ice: #fafbfd;
  --color-border: #cbd5e1;

  /* Fonts */
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-display: var(--font-caveat), cursive;

  /* Shadows */
  --shadow-soft: 0 2px 8px rgba(15, 23, 42, 0.04), 0 4px 16px rgba(15, 23, 42, 0.06);
  --shadow-soft-md: 0 4px 12px rgba(15, 23, 42, 0.05), 0 8px 24px rgba(15, 23, 42, 0.08);
  --shadow-soft-lg: 0 8px 20px rgba(15, 23, 42, 0.06), 0 16px 40px rgba(15, 23, 42, 0.1);

  /* Animations */
  --animate-fade-up: fadeUp 0.6s ease-out forwards;
  --animate-fade-in: fadeIn 0.5s ease-out forwards;

  /* Spacing */
  --spacing-section: 80px;
  --spacing-section-sm: 48px;
}
```

**Step 2: Update base styles (lines 54-71)**

```css
@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-ice text-navy antialiased;
    font-feature-settings: "liga" 1, "calt" 1;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-sans font-semibold;
  }

  p {
    @apply font-sans leading-relaxed;
  }
}
```

**Step 3: Update card-base utility (line 86-88)**

```css
@utility card-base {
  @apply bg-white rounded-xl shadow-soft p-6 md:p-8 border border-border;
}
```

**Step 4: Update selection highlight (lines 90-92)**

```css
::selection {
  @apply bg-navy-light/15 text-navy;
}
```

**Step 5: Verify build**

Run: `cd "C:/Users/Lorenzo/Desktop/DEV/praxis-ai" && npm run build`

**Step 6: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: replace color palette with Navy & Silver design tokens"
```

---

## Task 2: Update UI Components for Navy Palette

**Files:**
- Modify: `src/components/ui/button.tsx`
- Modify: `src/components/ui/card.tsx`
- Modify: `src/components/ui/input.tsx`
- Modify: `src/components/ui/textarea.tsx`
- Modify: `src/components/ui/section.tsx`
- Modify: `src/components/ui/language-switcher.tsx`
- Modify: `src/components/ui/divider.tsx`

**Step 1: Update button.tsx — replace all color references**

Replace the buttonVariants CVA definition (lines 5-26):

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-sans font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-light focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-navy text-white hover:bg-navy-light shadow-soft hover:shadow-soft-md",
        outline: "border-2 border-navy bg-transparent text-navy hover:bg-navy hover:text-white",
        ghost: "bg-transparent text-navy hover:bg-surface-dark",
        secondary: "bg-navy-muted text-white hover:bg-navy shadow-soft hover:shadow-soft-md",
      },
      size: {
        default: "h-12 px-6 text-base",
        sm: "h-10 px-4 text-sm",
        lg: "h-14 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

**Step 2: Update card.tsx — replace charcoal/mid references**

CardTitle (line 30): change `text-charcoal` to `text-navy`
CardDescription (line 40): change `text-mid` to `text-silver`

**Step 3: Update input.tsx — replace color references**

Line 20 label: `text-charcoal` → `text-navy`
Line 28 input: `text-charcoal` → `text-navy`, `placeholder:text-mid` → `placeholder:text-silver`, `focus-visible:ring-terracotta` → `focus-visible:ring-navy-light`, `focus-visible:border-terracotta` → `focus-visible:border-navy-light`

**Step 4: Update textarea.tsx — same replacements as input**

Line 20 label: `text-charcoal` → `text-navy`
Line 27 textarea: `text-charcoal` → `text-navy`, `placeholder:text-mid` → `placeholder:text-silver`, `focus-visible:ring-terracotta` → `focus-visible:ring-navy-light`, `focus-visible:border-terracotta` → `focus-visible:border-navy-light`

**Step 5: Update section.tsx — replace bg variants**

Lines 12-16: `bg-cream` → `bg-surface`, `bg-white` stays `bg-white`, default → `bg-surface`

**Step 6: Update language-switcher.tsx — replace charcoal references**

Line 11: `text-charcoal` → `text-navy`, `hover:bg-charcoal/5` → `hover:bg-navy/5`
Lines 14-16: `text-charcoal/30` → `text-navy/30`

**Step 7: Update divider.tsx — replace cream references**

Lines 34-41: `text-cream` → `text-surface`, `text-cream opacity-50` → `text-surface opacity-50`

**Step 8: Commit**

```bash
git add src/components/ui/
git commit -m "feat: update all UI components to Navy & Silver palette"
```

---

## Task 3: Update Layout Components (Navbar + Footer)

**Files:**
- Modify: `src/components/layout/navbar.tsx`
- Modify: `src/components/layout/footer.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Update navbar.tsx**

Line 29: `bg-cream/95` → `bg-ice/95`
Line 37: `LogoMark className="text-terracotta"` stays (logo keeps orange)
Line 39: `text-charcoal` → `text-navy`
Line 51: `hover:text-terracotta` → `hover:text-navy-light`
Line 53-54: `text-terracotta` → `text-navy-light` for active state, `text-charcoal` → `text-navy`
Lines 73-87: `bg-charcoal` → `bg-navy` for hamburger lines
Line 105: same active/hover replacements for mobile links
Change nav hrefs: `/solutions` → `/soluzioni`

**Step 2: Update footer.tsx**

Line 12: `bg-charcoal` → `bg-navy`
Line 14: `border-charcoal-light` → `border-navy-light`
Line 37: `hover:text-terracotta` → `hover:text-white`
Line 57: same hover replacement
Lines 73-79: same hover replacements for privacy/terms links

**Step 3: Update layout.tsx**

Line 45: `focus:text-charcoal` → `focus:text-navy`
Update metadata (lines 8-34) with Studi Professionali description:
- title: "Praxis AI - Intelligenza Artificiale per Studi Professionali"
- description: Italian-targeted description for professional firms
- keywords: ["AI studi professionali", "intelligenza artificiale avvocati", "automazione commercialisti", ...]

**Step 4: Commit**

```bash
git add src/components/layout/ src/app/layout.tsx
git commit -m "feat: update layout components to Navy palette and Italian professional positioning"
```

---

## Task 4: Update Canvas Backgrounds

**Files:**
- Modify: `src/components/ui/animated-background.tsx`

**Step 1: Replace terracotta color constant with navy/silver**

Line 125: Replace `const TC = [193, 95, 60] as const;` with `const NC = [15, 23, 42] as const;` (navy)
Add: `const SC = [148, 163, 184] as const;` (silver)

**Step 2: Update heroOrbs array (lines 127-139)**

Replace all `TC` references in the orb definitions with `SC` (silver).
Replace neutral warm tones `[200, 195, 180]`, `[205, 200, 188]`, etc. with cool equivalents:
- `[200, 195, 180]` → `[203, 213, 225]` (slate-300-ish)
- `[205, 200, 188]` → `[210, 218, 230]`
- `[195, 190, 175]` → `[196, 208, 222]`
- `[208, 203, 193]` → `[215, 223, 235]`
- `[210, 205, 195]` → `[218, 226, 238]`
- `[215, 210, 200]` → `[225, 231, 240]`

**Step 3: Update HeroAmbientBg radial gradients (lines 172-177)**

Replace warm tints with cool blue tints:
```tsx
style={{
  background:
    "radial-gradient(ellipse 60% 50% at 20% 30%, rgba(203,213,225,0.18) 0%, transparent 70%), " +
    "radial-gradient(ellipse 50% 60% at 75% 70%, rgba(148,163,184,0.08) 0%, transparent 70%)",
}}
```

**Step 4: Update drawProcess function (lines 272-324)**

Replace all `TC` references with `NC` for the curves and `SC` for the particles/glow.

**Step 5: Update ProcessWeaveBg radial gradient (lines 337-341)**

```tsx
style={{
  background:
    "radial-gradient(ellipse 80% 40% at 50% 80%, rgba(148,163,184,0.06) 0%, transparent 70%)",
}}
```

**Step 6: Update drawNeural function (lines 396-481)**

Replace all `TC` with `NC` for connections and node dots, use `SC` for glow gradients.

**Step 7: Update NeuralFlowBg radial gradients (lines 494-500)**

Replace `rgba(193,95,60,...)` with `rgba(15,23,42,...)`.

**Step 8: Commit**

```bash
git add src/components/ui/animated-background.tsx
git commit -m "feat: retune canvas backgrounds to cool navy/silver palette"
```

---

## Task 5: Update Remaining Section Components

**Files:**
- Modify: `src/components/sections/hero.tsx`
- Modify: `src/components/sections/process.tsx`
- Modify: `src/components/sections/cta.tsx`
- Modify: `src/components/sections/services.tsx`
- Modify: `src/components/sections/solutions-showcase.tsx`
- Modify: `src/components/sections/contact-form.tsx`

**Step 1: Update hero.tsx**

Lines 57-68 (HeroIllustration SVG paths): `stroke="#C15F3C"` → `stroke="#1e3a5f"`, `fill="#C15F3C"` → `fill="#1e3a5f"`
Lines 101-119 (circles/lines): same fill/stroke replacements
Lines 122-137 (floating dots): `bg-terracotta/20` → `bg-navy-light/20`, `bg-terracotta/15` → `bg-navy-light/15`, `bg-terracotta/10` → `bg-navy-light/10`
Line 153: `bg-gradient-to-b from-cream via-cream-light to-white` → `bg-gradient-to-b from-surface via-surface-light to-white`
Lines 157-158: `bg-terracotta/5` → `bg-navy-light/5`, `bg-terracotta-light/5` → `bg-silver/5`
Line 171: `text-charcoal` → `text-navy`
Line 174: `text-terracotta` → `text-accent` (keep orange on hero accent word)
Line 181: `text-mid` → `text-silver`
Lines 209-228 (stats): `text-terracotta` → `text-navy-light`, `text-mid` → `text-silver`

**Step 2: Update process.tsx**

Lines 21-41 (TimelineCurve): `stroke="#C15F3C"` → `stroke="#1e3a5f"`, `fill="#C15F3C"` → `fill="#1e3a5f"`
Line 52: `overlay="bg-cream/40"` → `overlay="bg-surface/40"`
Line 60: `text-charcoal` → `text-navy`
Lines 80-81: `bg-terracotta/10` → `bg-navy-light/10`, `text-terracotta` → `text-navy-light`
Line 87: `text-charcoal` → `text-navy`
Line 90: `text-mid` → `text-silver`

**Step 3: Update cta.tsx**

Line 69: `bg-gradient-to-br from-terracotta to-terracotta-light` → `bg-gradient-to-br from-navy to-navy-light`
Line 97: `hover:text-terracotta` → `hover:text-navy`

**Step 4: Update services.tsx icons**

Lines 10-33: `text-terracotta` → `text-navy-light` on all 4 icon divs
Line 57: `text-charcoal` → `text-navy`

**Step 5: Update solutions-showcase.tsx**

Line 67: `text-terracotta` → `text-navy-light` on checkmark icons

**Step 6: Update contact-form.tsx**

Line 123: `bg-terracotta` → `bg-navy` on success icon circle
Line 140: `text-charcoal` → `text-navy`
Line 143: `text-mid` → `text-silver`

**Step 7: Commit**

```bash
git add src/components/sections/
git commit -m "feat: update all section components to Navy palette"
```

---

## Task 6: Rewrite Italian Translation File

**Files:**
- Modify: `src/lib/i18n/translations/it.ts`

**Step 1: Complete rewrite**

Rewrite the entire it.ts file with Studi Professionali positioning. Remove all pricing. Add new keys for:
- `simulation` section (profession selector, simulation descriptions)
- `calculator` section (labels, outputs)
- `soluzioniHub` (profession cards for /soluzioni hub)
- `professions` object with data for each of the 6 professions
- Updated `nav`, `hero`, `process`, `cta`, `footer`, `contactForm`, `contactPage`

Remove: `services`, `solutionsShowcase`, `solutionsPage` (replaced by profession structure)

The profession data object should include for each slug:
- `title`, `subtitle`, `headline`
- `painPoints`: array of { title, description }
- `solutions`: array of { title, description, features[] }
- `demoDescription` (for the demo intro overlay)

**Step 2: Commit**

```bash
git add src/lib/i18n/translations/it.ts
git commit -m "feat: rewrite Italian translations for Studi Professionali"
```

---

## Task 7: Rewrite English Translation File

**Files:**
- Modify: `src/lib/i18n/translations/en.ts`

**Step 1: Complete rewrite**

Mirror the structure from Task 6 but in English. Ensure the `Translations` type export matches the new structure.

**Step 2: Commit**

```bash
git add src/lib/i18n/translations/en.ts
git commit -m "feat: rewrite English translations for Studi Professionali"
```

---

## Task 8: Create Profession Data & Types

**Files:**
- Create: `src/lib/professions.ts`

**Step 1: Create the professions data module**

Define a `Profession` interface and export a `PROFESSIONS` array with the 6 profession slugs, SVG icon paths, and demo slug mappings:

```ts
export interface Profession {
  slug: string;
  demoSlug: string;  // maps to existing demo content
  icon: string;      // SVG path data for the profession icon
}

export const PROFESSIONS: Profession[] = [
  { slug: "avvocati", demoSlug: "customer-agents", icon: "M..." /* scale/balance */ },
  { slug: "commercialisti", demoSlug: "document-intelligence", icon: "M..." /* calculator */ },
  { slug: "consulenti-del-lavoro", demoSlug: "workflow-automation", icon: "M..." /* briefcase */ },
  { slug: "odontoiatri", demoSlug: "knowledge-systems", icon: "M..." /* tooth/medical */ },
  { slug: "architetti-ingegneri", demoSlug: "email-strategist", icon: "M..." /* drafting */ },
  { slug: "geometri", demoSlug: "email-designer", icon: "M..." /* map/survey */ },
];

export function getProfession(slug: string): Profession | undefined {
  return PROFESSIONS.find(p => p.slug === slug);
}
```

**Step 2: Commit**

```bash
git add src/lib/professions.ts
git commit -m "feat: add profession data module with 6 categories"
```

---

## Task 9: Build AI Simulation Component

**Files:**
- Create: `src/components/sections/ai-simulation.tsx`

**Step 1: Create the component**

This is the homepage centerpiece. Two phases:
- Phase A: Grid of 6 profession cards (using PROFESSIONS data + translation keys). User clicks one.
- Phase B: AnimatePresence transition to a simulation panel. The simulation shows a scripted Framer Motion sequence of "AI working" — document shapes appearing, text highlighting, data flowing. Each profession has a different animation variant.

Use `motion.div` for all transitions. The simulation panel should be ~500px tall with a dark navy background (`bg-navy/[0.03]`), showing animated SVG elements.

Each profession's simulation sequence:
- Avvocati: document icon slides in → clauses highlight in sequence → risk badge appears
- Commercialisti: invoice rows stream in → data extracts into table columns
- Odontoiatri: calendar grid appears → appointments auto-fill → reminder notifications pop
- Consulenti del Lavoro: payroll form fills → checkmarks cascade → compliance badge
- Architetti/Ingegneri: blueprint outline draws → measurements annotate → permit stamp
- Geometri: cadastral form appears → fields auto-populate → map pins drop

Component accepts a `onProfessionSelect` callback to pass the selected profession to the ROI calculator.

**Step 2: Commit**

```bash
git add src/components/sections/ai-simulation.tsx
git commit -m "feat: add interactive AI simulation component with 6 profession animations"
```

---

## Task 10: Build ROI Calculator Component

**Files:**
- Create: `src/components/sections/roi-calculator.tsx`

**Step 1: Create the component**

Props: `selectedProfession?: string` (pre-filled from simulation)

Layout:
- Profession selector (6 buttons, pre-selected if passed)
- Two range sliders with numeric input: "Quanti clienti gestisci?" (10-500), "Ore settimanali in attivita amministrative?" (5-60)
- Results panel with animated CountUp: "Ore risparmiate/settimana", "Risparmio stimato/mese"
- CTA button: "Vedi l'AI in Azione" → links to `/demo/login`

Multiplier logic (profession-specific):
- Avvocati: 0.35 hours saved per client-hour
- Commercialisti: 0.40
- Consulenti del Lavoro: 0.38
- Odontoiatri: 0.30
- Architetti/Ingegneri: 0.28
- Geometri: 0.32

Cost calculation: hours_saved * 35 (average hourly rate for Italian professionals)

Reuse the `CountUp` pattern from hero.tsx.

**Step 2: Commit**

```bash
git add src/components/sections/roi-calculator.tsx
git commit -m "feat: add ROI calculator component with profession-specific multipliers"
```

---

## Task 11: Rebuild Homepage

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/sections/hero.tsx`

**Step 1: Update hero.tsx**

Remove the stats grid (lines 202-232). Remove the "Explore Solutions" button. Change the single CTA to smooth-scroll to `#ai-simulation`. Update the gradient/illustration for navy palette (already done in Task 5, but verify hero copy uses new translation keys).

**Step 2: Rewrite page.tsx**

Replace the 5-section layout with:

```tsx
import { Hero } from "@/components/sections/hero";
import { AISimulation } from "@/components/sections/ai-simulation";
import { ROICalculator } from "@/components/sections/roi-calculator";
import { Process } from "@/components/sections/process";
import { CTA } from "@/components/sections/cta";
import { Divider } from "@/components/ui/divider";

export default function Home() {
  return (
    <>
      <Hero />
      <Divider className="text-white bg-surface-light -mt-px" />
      <section id="ai-simulation">
        <AISimulation />
      </section>
      <Divider className="text-surface bg-white" />
      <ROICalculator />
      <Divider className="text-white bg-surface" flip />
      <Process />
      <Divider className="text-white bg-white" flip />
      <CTA />
    </>
  );
}
```

Remove imports for Services and SolutionsShowcase.

**Step 3: Commit**

```bash
git add src/app/page.tsx src/components/sections/hero.tsx
git commit -m "feat: rebuild homepage with AI simulation and ROI calculator"
```

---

## Task 12: Build Solutions Hub Page (/soluzioni)

**Files:**
- Create: `src/app/soluzioni/page.tsx`
- Create: `src/app/soluzioni/layout.tsx`

**Step 1: Create layout.tsx with metadata**

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soluzioni AI per Studi Professionali - Praxis AI",
  description: "Soluzioni di intelligenza artificiale per avvocati, commercialisti, dentisti, architetti e altri studi professionali italiani.",
};

export default function SoluzioniLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

**Step 2: Create page.tsx**

Client component with NeuralFlowBg hero, heading from translations, then a grid of 6 profession cards (using PROFESSIONS data + translations). Each card has:
- SVG icon
- Profession title
- Brief tagline
- Link to `/soluzioni/[slug]`

Stagger animation on scroll into view.

**Step 3: Commit**

```bash
git add src/app/soluzioni/
git commit -m "feat: add solutions hub page with 6 profession cards"
```

---

## Task 13: Build Dynamic Profession Pages (/soluzioni/[slug])

**Files:**
- Create: `src/app/soluzioni/[slug]/page.tsx`
- Create: `src/app/soluzioni/[slug]/profession-page.tsx`

**Step 1: Create page.tsx (server component)**

Validates slug against the 6 profession slugs. Returns `notFound()` for invalid slugs. Generates metadata dynamically. Renders `ProfessionPage` client component.

**Step 2: Create profession-page.tsx (client component)**

Uses `useLocale()` to get profession-specific translations. Renders 5 sections:
1. Hero with NeuralFlowBg, profession title and subtitle
2. Pain points: 3-4 cards with pain point title + description
3. AI Solutions: list of relevant AI tools with features
4. Feature highlights with checkmarks
5. CTA: "Prova la Demo" linking to `/demo/login`, "Contattaci" linking to `/contact`

All data comes from the translations file via the profession slug key.

**Step 3: Generate dynamic metadata**

Use `generateMetadata` in page.tsx to create SEO-optimized titles like "AI per Avvocati - Praxis AI".

**Step 4: Commit**

```bash
git add src/app/soluzioni/
git commit -m "feat: add 6 dynamic profession pages with pain points and AI solutions"
```

---

## Task 14: Update Demo Hub for Profession Context

**Files:**
- Modify: `src/app/demo/demo-hub.tsx`

**Step 1: Reorganize demos by profession**

Replace the `demos` array (lines 23-78) with profession-mapped demos. Change group labels from "Core Platform" / "Email AI Suite" to profession names. Map each demo to its profession:
- "Demo per Avvocati" (customer-agents)
- "Demo per Commercialisti" (document-intelligence)
- "Demo per Consulenti del Lavoro" (workflow-automation)
- "Demo per Odontoiatri" (knowledge-systems)
- "Demo per Architetti e Ingegneri" (email-strategist)
- "Demo per Geometri" (email-designer)

**Step 2: Update all color references**

Replace all `text-terracotta` → `text-accent` (logo only) or `text-navy-light` (interactive).
Replace `bg-cream` → `bg-ice`, `text-charcoal` → `text-navy`, `text-mid` → `text-silver`, `border-charcoal` → `border-navy`.
Replace `ring-terracotta` → `ring-navy-light`.

**Step 3: Update heading and description**

"Solution Demos" → "Demo AI per Studi Professionali"
"Interactive demos for client presentations" → "Demo interattive delle nostre soluzioni AI"

**Step 4: Commit**

```bash
git add src/app/demo/demo-hub.tsx
git commit -m "feat: reorganize demo hub by profession with navy palette"
```

---

## Task 15: Update Demo Viewer with Profession CX

**Files:**
- Modify: `src/app/demo/[slug]/demo-viewer.tsx`
- Modify: `src/app/demo/[slug]/page.tsx`

**Step 1: Update DEMO_ORDER with profession titles**

Replace generic titles with profession context:
```ts
const DEMO_ORDER = [
  { slug: "customer-agents", title: "Demo Avvocati" },
  { slug: "document-intelligence", title: "Demo Commercialisti" },
  // ...etc
];
```

**Step 2: Add intro overlay**

After the loading overlay, add a guided intro overlay that shows for 3 seconds (or until clicked) with a brief description of what the demo shows (from translations).

**Step 3: Add post-demo CTA panel**

Add a slide-up panel component that appears when user closes or finishes the demo. Shows "Ti piace quello che hai visto?" with links to contact page and back to profession page.

**Step 4: Update color references**

Replace `text-terracotta` → `text-accent` (logo only), `bg-terracotta` → `bg-accent` (progress bar).
Replace `bg-charcoal` → `bg-navy`, `bg-charcoal-light` → `bg-navy-light`.

**Step 5: Commit**

```bash
git add src/app/demo/
git commit -m "feat: add profession context, intro overlay, and post-demo CTA to viewer"
```

---

## Task 16: Remove Old Solutions Route + Redirect

**Files:**
- Delete content from: `src/app/solutions/page.tsx` (replace with redirect)
- Modify: `src/app/solutions/layout.tsx`

**Step 1: Replace solutions page with redirect**

```tsx
import { redirect } from "next/navigation";
export default function SolutionsPage() {
  redirect("/soluzioni");
}
```

**Step 2: Commit**

```bash
git add src/app/solutions/
git commit -m "feat: redirect /solutions to /soluzioni"
```

---

## Task 17: Update Contact, Privacy, Terms Pages

**Files:**
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/contact/layout.tsx`
- Modify: `src/app/privacy/page.tsx`
- Modify: `src/app/terms/page.tsx`

**Step 1: Update contact page color references**

Replace `text-charcoal` → `text-navy`, `bg-cream` → `bg-surface` in overlay.

**Step 2: Update contact layout metadata**

Retarget for Studi Professionali.

**Step 3: Update privacy and terms pages**

Replace `text-charcoal` → `text-navy`, `text-mid` → `text-silver`, `bg-cream` → `bg-surface`, `text-terracotta` → `text-navy-light` on all links.

**Step 4: Commit**

```bash
git add src/app/contact/ src/app/privacy/ src/app/terms/
git commit -m "feat: update contact, privacy, terms pages for navy palette"
```

---

## Task 18: Update Demo Login Page

**Files:**
- Modify: `src/app/demo/login/page.tsx`

**Step 1: Replace all color references**

Update gradient backgrounds, button colors, focus rings, and error states from terracotta/cream/charcoal to navy/silver/ice.

**Step 2: Commit**

```bash
git add src/app/demo/login/
git commit -m "feat: update demo login page to navy palette"
```

---

## Task 19: Update Middleware Route

**Files:**
- Modify: `src/middleware.ts`

No changes needed — the middleware only handles /demo routes which remain unchanged.

---

## Task 20: Final Build Verification & Deploy

**Step 1: Install dependencies (if not already)**

```bash
cd "C:/Users/Lorenzo/Desktop/DEV/praxis-ai" && npm install
```

**Step 2: Build and verify**

```bash
npm run build
```

Fix any TypeScript or build errors.

**Step 3: Final commit**

```bash
git add -A
git commit -m "fix: resolve any remaining build issues"
```

**Step 4: Set up git remote and push**

```bash
git remote add origin <github-repo-url>
git push -u origin master
```

Vercel auto-deploys from the push.
