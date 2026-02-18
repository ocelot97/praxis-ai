# Praxis AI — Studi Professionali Redesign

**Date:** 2026-02-18
**Approach:** Full B — Component redesign + content pivot
**Status:** Approved

---

## 1. Color System

Replace warm terracotta/cream palette with Navy & Silver. Orange accent retained on logo only.

```
Token                  Old Value      New Value
--color-accent         #C15F3C        #C15F3C (logo/atom only)
--color-navy           —              #0f172a (primary text, headings, buttons)
--color-navy-light     —              #1e3a5f (secondary, hover states)
--color-navy-muted     —              #334155 (muted text)
--color-silver         —              #94a3b8 (subtle text, icons)
--color-surface        #F4F3EE        #f0f4f8 (section backgrounds)
--color-surface-light  #faf9f5        #f8fafc (lighter surfaces)
--color-surface-dark   #e8e6dc        #e2e8f0 (darker surfaces)
--color-ice            —              #fafbfd (page background)
--color-border         #e8e6dc        #cbd5e1
--color-accent-glow    —              rgba(193,95,60,0.15) (logo hover only)
```

Removed tokens: terracotta, terracotta-light, terracotta-dark, cream, cream-light, cream-dark, charcoal, charcoal-light, mid.

## 2. Homepage (5 sections)

### 2.1 Hero
- Headline: "L'Intelligenza Artificiale per il Tuo Studio Professionale"
- Subtitle: Speaks to Italian professionals — automating pratiche, gestione documentale, comunicazione clienti
- Single CTA: "Scopri Come" smooth-scrolls to AI Simulation section
- Stats removed or replaced with profession-relevant metrics

### 2.2 AI Simulation (NEW — centerpiece)
- Phase A: 6 profession cards in grid (SVG icons, no emojis). User picks profession.
- Phase B: Animated simulation panel shows AI "working" on profession-specific documents:
  - Avvocati: contract scanning, clause highlighting, risk analysis
  - Commercialisti: invoice stream, data extraction into table
  - Dentisti: appointment calendar organizing, patient reminders
  - Consulenti del Lavoro: payroll processing, compliance checks
  - Architetti/Ingegneri: project documentation, permit tracking
  - Geometri: catasto forms, data extraction
- Entirely client-side scripted animations (Framer Motion), not real AI calls

### 2.3 ROI Calculator (NEW)
- Inputs: profession (pre-filled from simulation), client count, weekly admin hours
- Outputs: animated counters for hours saved/week and cost saved/month
- Profession-specific multipliers
- CTA: "Vedi l'AI in Azione" linking to profession-relevant demo

### 2.4 Process
- 3 steps: "Analisi dello Studio" → "Configurazione AI" → "Attivazione e Supporto"
- Same component structure, updated copy and animations

### 2.5 CTA
- Navy gradient background (from-[#0f172a] via-[#1e3a5f] to-[#0f172a])
- "Inizia Oggi" with consultation + solutions links
- Floating shapes in silver/blue tones

## 3. Solutions Hub (/soluzioni)

Grid of 6 profession cards, each linking to dedicated page. No pricing anywhere.

## 4. Profession Pages (/soluzioni/[slug])

6 dynamic routes:
- /soluzioni/avvocati
- /soluzioni/commercialisti
- /soluzioni/consulenti-del-lavoro
- /soluzioni/odontoiatri
- /soluzioni/architetti-ingegneri
- /soluzioni/geometri

Each page contains:
1. Hero with profession-specific headline and subtitle
2. Pain points section (3-4 profession-specific challenges)
3. AI Solutions section (relevant AI tools bundled)
4. Features list with profession-specific use cases
5. "Prova la Demo" CTA

## 5. Demo System Improvements

### 5.1 Auth
- Keep email + password authentication (unchanged)

### 5.2 Demo Hub
- Reorganized by profession (not by AI tool type)
- Cards show "Demo per Avvocati", "Demo per Commercialisti", etc.

### 5.3 Demo Viewer
- Profession-aware header ("Demo AI per Avvocati")
- Guided intro overlay explaining what the demo shows
- Post-demo CTA slide-up panel ("Ti piace? Prenota una consulenza")
- Contextual next-demo suggestions (most relevant for that profession)
- Deep-links from profession pages and ROI calculator

### 5.4 Demo Content
- 6 HTML demo files adapted with profession-specific scenarios and terminology

## 6. Component Redesign

### Cards
- rounded-xl (from rounded-2xl)
- Blue-tinted borders (border-slate-200)
- Cool shadow (shadow-[0_2px_8px_rgba(15,23,42,0.06)])
- Hover: navy accent border + lift

### Buttons
- Primary: bg-navy text-white, hover darker
- Outline: navy border + text, hover fills
- Ghost: transparent navy text
- No orange on any interactive element

### CTA Section
- Navy gradient background
- Silver/blue floating shapes

### Canvas Backgrounds
- HeroAmbientBg: cool blue/silver orbs
- ProcessWeaveBg: navy/silver curves
- NeuralFlowBg: cool-toned nodes

### Focus rings & selection
- ring-[#1e3a5f] (was ring-terracotta)
- selection bg-[#1e3a5f]/15 (was bg-terracotta/20)

### Logo
- Orange atom SVG + "Praxis AI" text — UNCHANGED, only orange element on site

## 7. Translations

Full rewrite of en.ts and it.ts:
- All copy repositioned for Studi Professionali
- All pricing removed
- New sections: simulation, calculator, profession pages
- Updated meta descriptions for SEO

## 8. Removed Elements

- Services section (from homepage)
- Solutions Showcase section (from homepage)
- All pricing/cost information
- Easter egg keyboard shortcut on solutions page
- Generic AI solution framing

## 9. Deployment

Git push to GitHub → Vercel auto-deploys from latest push.
