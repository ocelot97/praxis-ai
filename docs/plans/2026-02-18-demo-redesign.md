# Praxis AI — Demo Experience Redesign

**Date:** 2026-02-18
**Approach:** Full profession-specific rewrite + React wrapper improvements + progressive profiling + ROI calculator redesign
**Status:** Approved

---

## 1. Problem Statement

The 6 HTML demo files are completely generic SaaS demos with zero relevance to the professions they serve:

| Profession | Promise | Actual Demo |
|---|---|---|
| Avvocati | Contract analysis, case law | E-commerce chatbot |
| Commercialisti | Invoice/tax automation | Generic US document extraction |
| Consulenti del Lavoro | Payroll, compliance | Sales lead routing |
| Odontoiatri | Appointments, patient comms | Enterprise knowledge search |
| Architetti/Ingegneri | Building permits, project docs | Klaviyo email analytics |
| Geometri | Cadastral forms, DOCFA | Email drag-and-drop designer |

Additionally: intro overlay is empty, login is English, translations exist but aren't wired in, no deep-linking, post-demo CTA is generic, and the ROI calculator has animation issues and lacks visual impact.

## 2. Progressive Profiling Data Layer

A lightweight client-side context store (sessionStorage + React Context) that accumulates user signals across touchpoints:

**Touchpoint 1 — AI Simulation:** Profession selection stored.
**Touchpoint 2 — ROI Calculator:** Client count, weekly hours, savings breakdown stored.
**Touchpoint 3 — Demo Viewer:** Demos viewed, completion rate, interaction data stored.
**Touchpoint 4 — Contact Form:** Hidden field pre-filled with accumulated profiling JSON on submission.

Implementation: `useProfilingContext()` hook + `ProfilingProvider` at root layout. Data in `sessionStorage` (survives navigation, not sessions). No cookies or tracking pixels.

## 3. ROI Calculator Redesign

### Custom Sliders
Replace native `<input type="range">` with Framer Motion custom sliders: navy track, draggable thumb with glow, value tooltip following thumb, smooth fill gradient, stepped markers.

### Multi-Dimensional Calculation Model
Instead of single multiplier, show breakdown by automation area. Each profession defines 3-4 specific areas with individual hour estimates that scale with client count and admin hours.

Example — Avvocati (120 clients, 25h/week admin):
- Analisi Contrattuale: 4.2h saved/week
- Ricerca Giurisprudenziale: 2.8h saved/week
- Gestione Scadenze: 1.5h saved/week
- Comunicazione Clienti: 1.3h saved/week
- Totale: 9.8h saved/week → €1,485/mese

### Visual Impact
- Animated stacked bar chart showing breakdown by automation area
- Before/After comparison: current hours (amber) vs optimized hours (navy), gap = savings with pulse animation
- Big headline number with dramatic count-up and euro symbol
- Profession-specific icons next to each line item
- Results card border glow on value change

### Info Tooltips
Each automation area gets an (i) icon revealing the estimation basis:
> "Basato su una media di 3.5 contratti/settimana per 120 clienti. L'AI riduce il tempo di revisione da 45min a 12min per contratto."

Global methodology tooltip:
> "Le stime si basano sui dati raccolti da studi professionali italiani che utilizzano soluzioni AI simili. I risultati effettivi possono variare."

### Profiling Integration
Every slider/profession change updates the profiling context with latest values and breakdown data.

## 4. HTML Demo Content — 6 Profession-Specific Rewrites

### Shared Architecture
- Progress bar at top (Step N of 4)
- Hybrid: auto-play sequences + interactive moments (user clicks pulsing highlights)
- Step transitions with smooth crossfade
- CSS animations + vanilla JS (no framework, iframe-sandboxed)
- Bilingual IT/EN via `window.__PRAXIS_LOCALE__`

### Demo 1: Avvocati — "Analisi Contrattuale Intelligente"

**Step 1 — Upload:** Contratto di Locazione Commerciale slides onto screen with realistic Italian legal text and article numbers.

**Step 2 — AI Analysis (auto-play):** Scanner line sweeps document. Clauses highlight by risk level (green=standard, amber=attention, red=risk). Sidebar builds with identified clauses and risk scores.

**Interactive:** User clicks red clause → expands: "Clausola penale eccessiva: importo €50.000 supera il 30% del valore contrattuale. Rif: Art. 1382 c.c."

**Step 3 — Jurisprudence Search (auto-play):** Flagged clause triggers animated case law search. Results: Cass. Civ. Sez. III, n. 1234/2023 with relevance scores.

**Step 4 — Report:** PDF-style report assembles: executive summary, clause-by-clause analysis, risk matrix, recommended modifications. CTA.

### Demo 2: Commercialisti — "Elaborazione Fatture Elettroniche"

**Step 1 — Invoice Stream:** 5 fatture elettroniche cascade onto screen. Italian format: P.IVA, Codice Fiscale, split payment indicators.

**Step 2 — Data Extraction (auto-play):** First invoice expands. AI highlights: Ragione Sociale, P.IVA, Codice Destinatario, importo netto, IVA, ritenuta d'acconto. Data populates table.

**Interactive:** Click anomaly flag → "Aliquota IVA 10% su servizi professionali — verificare regime IVA ordinario 22%."

**Step 3 — Reconciliation:** Data auto-matches Prima Nota. Green checkmarks. One unmatched entry pulses.

**Step 4 — F24 Preview:** Pre-compiled F24 form with codice tributo, periodo di riferimento, importi a debito.

### Demo 3: Consulenti del Lavoro — "Gestione Buste Paga e Adempimenti"

**Step 1 — Employee Dashboard:** Grid of 6 employee cards with CCNL indicators (Commercio, Metalmeccanico).

**Step 2 — Payroll (auto-play):** Card expands into busta paga. Fields compute: retribuzione base, straordinari, INPS 9.19%, IRPEF, detrazioni, TFR.

**Interactive:** Click warning badge → "Scadenza periodo di prova: Mario Rossi — 3 mesi scade il 15/03/2026. Azione: conferma assunzione o comunicazione recesso."

**Step 3 — Compliance Check:** Automated checklist: CCNL aggiornamento, minimali INPS, conguaglio fiscale, autoliquidazione INAIL.

**Step 4 — UniLav Generation:** Comunicazione Obbligatoria auto-populates for Centro per l'Impiego submission.

### Demo 4: Odontoiatri — "Gestione Studio Dentistico"

**Step 1 — Weekly Calendar:** Appointment grid. Filled slots, empty gaps, conflict highlights.

**Step 2 — AI Scheduling (auto-play):** Calendar reorganizes — groups procedures, optimizes chair time. Counter: "Tempo ottimizzato: +3.5 ore/settimana."

**Interactive:** Click patient name → card: treatment history, next recommended procedure, reminder status ("SMS inviato 48h prima, conferma ricevuta").

**Step 3 — Patient Communication:** Three auto-populated templates: promemoria appuntamento, richiamo semestrale, preventivo trattamento.

**Step 4 — Clinical Notes:** Voice-to-text animation → auto-structured clinical documentation (anamnesi, esame obiettivo, diagnosi, piano terapeutico).

### Demo 5: Architetti/Ingegneri — "Gestione Commesse e Pratiche Edilizie"

**Step 1 — Project Dashboard:** Multi-project kanban: Progettazione Preliminare, SCIA presentata, Cantiere in corso, Collaudo.

**Step 2 — Document Analysis (auto-play):** AI scans Relazione Tecnica. Extracts parametri urbanistici: indice fabbricabilità, altezza max, distanze. Conformità PRG, vincoli paesaggistici.

**Interactive:** Click flagged parameter → "Rapporto copertura: 42% vs 40% consentito. Suggerimento: ridurre superficie 8 mq o richiedere variante."

**Step 3 — Permit Tracking:** Timeline: SCIA → Richiesta integrazioni → Documenti integrativi → Silenzio-assenso. Status pulses. Deadline alerts.

**Step 4 — Multi-Project Timeline:** Gantt-style view with milestones, resources, AI scheduling optimizations.

### Demo 6: Geometri — "Automazione Pratiche Catastali"

**Step 1 — Survey Import:** Measurement dataset loads (coordinates, distances, angles). Points plot on minimal map.

**Step 2 — DOCFA (auto-play):** AI fills form: identificativi catastali (Foglio, Particella, Subalterno), consistenza, categoria, classe, rendita. Validation checkmarks.

**Interactive:** Click rendita warning → "Rendita €1.245 supera del 15% media zona per A/2. Verificare coerenza vani (6.5 vs media 5.0)."

**Step 3 — PREGEO:** Survey data → tipo mappale, coordinate Gauss-Boaga, superficie computations. Particella boundary on catasto map.

**Step 4 — Submission Preview:** Complete package for Agenzia del Territorio: DOCFA + PREGEO + planimetria. Validation checklist (formato, coerenza, firma digitale). Green light.

## 5. React Wrapper Improvements

### Login Page
- Full i18n via `useLocale()`: "Accesso Demo" / "Demo Access"
- Accept `?profession=avvocati` query param → personalized welcome with profession icon
- After login, redirect to `/demo?profession=avvocati`

### Demo Hub
- Replace hardcoded strings with `t.demoHub.*` translations
- Accept `?profession=avvocati` → highlight that demo card with glow + "Consigliato per te" badge
- Source card data from `PROFESSIONS` + translations (remove duplicated array)

### Demo Viewer
- Wire `t.demoViewer.introOverlayTitle` into overlay heading
- Wire `t.professions.[slug].demoIntro` into overlay description (currently empty)
- Wire `t.demoViewer.introOverlayCta` for start button
- Post-demo CTA links to `/soluzioni/[professionSlug]` (not generic `/soluzioni`)
- Wire `t.demoViewer.postDemoTitle` and `t.demoViewer.postDemoCta`
- Track demo progress + interactions in profiling context

### Profession Page Deep-Link
- Change "Prova la Demo" from `/demo/login` to `/demo/login?profession=[slug]`

### Contact Form
- Hidden field with profiling JSON on submit to Supabase

### Translations
- Add missing keys: ROI breakdown labels, demo step descriptions, login page strings, info tooltip text

## 6. Removed / Unchanged

- Demo authentication: keeps email+password via Supabase (unchanged)
- Demo HTML files remain self-contained iframe-sandboxed pages
- Demo slug URL structure unchanged (`/demo/[slug]`)
- Profession-to-demo slug mapping in `professions.ts` unchanged

## 7. Deployment

Git push to GitHub → Vercel auto-deploys.
