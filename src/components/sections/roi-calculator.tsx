"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { PROFESSIONS } from "@/lib/professions";
import { useLocale } from "@/lib/i18n";

// ---------------------------------------------------------------------------
// Profiling context — safe hook that never throws.
// useProfilingContext throws when the provider is absent, so we wrap it.
// The hook is always invoked (unconditionally) to satisfy Rules of Hooks;
// only the *throw* is caught.
// ---------------------------------------------------------------------------
import { useProfilingContext } from "@/lib/profiling-context";

type ProfilingSafe = { update: (partial: Record<string, unknown>) => void };

function useProfilingSafe(): ProfilingSafe | null {
  try {
    return useProfilingContext() as unknown as ProfilingSafe;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Profession-specific multipliers (fraction of admin hours Praxis AI saves)
// Calibrated at BASE_CLIENTS. Client count modulates via log scaling.
// ---------------------------------------------------------------------------
const BASE_CLIENTS = 100;

const MULTIPLIERS: Record<string, number> = {
  avvocati: 0.35,
  commercialisti: 0.4,
  "consulenti-del-lavoro": 0.38,
  odontoiatri: 0.3,
  "architetti-ingegneri": 0.28,
  geometri: 0.32,
};

// Per-area client sensitivity: how much each breakdown area scales with
// client count (0 = fixed overhead, 1 = fully linear with clients).
// Order matches the breakdown areas in translations.
const AREA_CLIENT_SENSITIVITY: Record<string, number[]> = {
  avvocati: [0.75, 0.2, 0.85, 0.9],           // contracts scale, jurisprudence less
  commercialisti: [0.85, 0.7, 0.9, 0.3],       // invoices/reconciliation scale, F24 less
  "consulenti-del-lavoro": [0.9, 0.6, 0.25, 0.8], // payroll scales, compliance is overhead
  odontoiatri: [0.8, 0.85, 0.9, 0.15],         // scheduling/comms scale, clinical notes less
  "architetti-ingegneri": [0.7, 0.5, 0.65, 0.8],
  geometri: [0.75, 0.3, 0.4, 0.7],             // surveys scale, DOCFA/PREGEO less
};

// Suggested weekly admin hours per profession based on client count.
// Returns [low, high] range for the hint text.
function suggestedHours(slug: string, clients: number): [number, number] {
  // Base minutes-per-client-per-week by profession (empirical averages)
  const baseMinutes: Record<string, number> = {
    avvocati: 12,
    commercialisti: 10,
    "consulenti-del-lavoro": 11,
    odontoiatri: 8,
    "architetti-ingegneri": 14,
    geometri: 13,
  };
  const perClient = baseMinutes[slug] ?? 11;
  // Diminishing returns: not perfectly linear, sqrt-ish scaling
  const rawHours = (perClient * Math.pow(clients, 0.85)) / 60;
  const low = Math.max(5, Math.round(rawHours * 0.8 / 5) * 5);
  const high = Math.max(low + 5, Math.round(rawHours * 1.2 / 5) * 5);
  return [Math.min(low, 55), Math.min(high, 60)];
}

// ---------------------------------------------------------------------------
// ROI Calculation helpers
// ---------------------------------------------------------------------------
function calcHoursSaved(weeklyHours: number, clients: number, slug: string): number {
  const multiplier = MULTIPLIERS[slug] ?? 0.33;
  // Client count modulates savings via log scaling centered on BASE_CLIENTS.
  // At 100 clients: factor = 1.0; at 200: ~1.10; at 50: ~0.90; at 500: ~1.24
  const clientFactor = 1 + Math.log(Math.max(clients, 10) / BASE_CLIENTS) * 0.15;
  return weeklyHours * multiplier * clientFactor;
}

function calcMonthlySavings(hoursSaved: number): number {
  // 4.33 weeks/month x EUR 35/hr average professional rate
  return hoursSaved * 4.33 * 35;
}

function formatEur(value: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDecimal(value: number): string {
  return value.toFixed(1);
}

// ---------------------------------------------------------------------------
// AnimatedNumber — rAF-based counter that interpolates smoothly.
// Avoids Framer Motion animate / useInView issues.
// ---------------------------------------------------------------------------
function AnimatedNumber({
  value,
  format,
}: {
  value: number;
  format: (n: number) => string;
}) {
  const [display, setDisplay] = React.useState(value);
  const prevRef = React.useRef(value);

  React.useEffect(() => {
    const from = prevRef.current;
    const to = value;
    if (from === to) return;

    const duration = 600; // ms
    let start: number | null = null;
    let rafId: number;

    function tick(ts: number) {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * eased;
      setDisplay(current);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        prevRef.current = to;
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [value]);

  return <span>{format(display)}</span>;
}

// ---------------------------------------------------------------------------
// Tooltip component — reusable hover/click info popover
// ---------------------------------------------------------------------------
function InfoTooltip({ text }: { text: string }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative inline-flex items-center">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-navy-muted/20 text-navy-muted text-[10px] font-bold hover:bg-navy-muted/40 transition-colors cursor-help"
        aria-label="Info"
      >
        i
      </button>
      {open && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 p-3 text-xs font-sans text-navy bg-white rounded-lg shadow-lg border border-border">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-border rotate-45 -mt-1" />
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Custom slider styles (injected inline via style element)
// ---------------------------------------------------------------------------
const SLIDER_STYLES = `
  .praxis-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 8px;
    border-radius: 9999px;
    outline: none;
    cursor: pointer;
  }
  .praxis-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #0f172a;
    border: 2px solid white;
    box-shadow: 0 2px 6px rgba(15,23,42,0.25);
    cursor: grab;
    position: relative;
    z-index: 2;
  }
  .praxis-slider::-webkit-slider-thumb:active {
    cursor: grabbing;
    transform: scale(1.1);
  }
  .praxis-slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #0f172a;
    border: 2px solid white;
    box-shadow: 0 2px 6px rgba(15,23,42,0.25);
    cursor: grab;
  }
  .praxis-slider::-moz-range-thumb:active {
    cursor: grabbing;
  }
  .praxis-slider::-moz-range-track {
    height: 8px;
    border-radius: 9999px;
    background: transparent;
  }
`;

// ---------------------------------------------------------------------------
// Custom Slider component
// ---------------------------------------------------------------------------
function CustomSlider({
  id,
  min,
  max,
  step,
  value,
  onChange,
  formatLabel,
}: {
  id: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  formatLabel?: (v: number) => string;
}) {
  const fillPercent = ((value - min) / (max - min)) * 100;
  const fmt = formatLabel ?? ((v: number) => String(v));

  // Generate step markers
  const stepCount = Math.floor((max - min) / step);
  const markerInterval = stepCount > 20 ? Math.ceil(stepCount / 10) : 1;
  const markers: number[] = [];
  for (let i = 0; i <= stepCount; i += markerInterval) {
    markers.push((i / stepCount) * 100);
  }

  return (
    <div className="relative pt-7 pb-1">
      {/* Value tooltip above thumb */}
      <div
        className="absolute top-0 -translate-x-1/2 pointer-events-none"
        style={{ left: `${fillPercent}%` }}
      >
        <div className="bg-navy text-white text-xs font-sans font-semibold px-2 py-1 rounded-md shadow-md whitespace-nowrap">
          {fmt(value)}
        </div>
        <div className="w-2 h-2 bg-navy rotate-45 mx-auto -mt-1" />
      </div>

      {/* Track container */}
      <div className="relative">
        {/* Step markers */}
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="relative w-full h-2">
            {markers.map((pct) => (
              <div
                key={pct}
                className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-navy-muted/30"
                style={{ left: `${pct}%` }}
              />
            ))}
          </div>
        </div>

        {/* Actual range input */}
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="praxis-slider"
          style={{
            background: `linear-gradient(to right, #1e3a5f 0%, #1e3a5f ${fillPercent}%, #e2e8f0 ${fillPercent}%, #e2e8f0 100%)`,
          }}
        />
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between text-xs font-sans text-silver mt-1">
        <span>{fmt(min)}</span>
        <span>{fmt(max)}</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Breakdown bar animation variants
// ---------------------------------------------------------------------------
const barContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
} as const;

const barItemVariants = {
  hidden: { width: "0%", opacity: 0 },
  visible: {
    width: "100%",
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
} as const;

// ---------------------------------------------------------------------------
// ROICalculator
// ---------------------------------------------------------------------------
export function ROICalculator() {
  const { t } = useLocale();

  // Profiling (safe — returns null if provider is absent)
  const profiling = useProfilingSafe();

  // State
  const [selectedSlug, setSelectedSlug] = React.useState<string>(
    PROFESSIONS[0].slug,
  );
  const [clients, setClients] = React.useState<number>(50);
  const [weeklyHours, setWeeklyHours] = React.useState<number>(20);

  // Derived
  const hoursSaved = calcHoursSaved(weeklyHours, clients, selectedSlug);
  const monthlySavings = calcMonthlySavings(hoursSaved);

  // Suggested hours hint
  const [sugLow, sugHigh] = React.useMemo(
    () => suggestedHours(selectedSlug, clients),
    [selectedSlug, clients],
  );

  // Breakdown areas from translations — client-adjusted weights
  const breakdownRaw = (
    t.calculatorBreakdown as Record<
      string,
      { area: string; tooltip: string; weight: number }[]
    >
  )[selectedSlug];
  const sensitivities = AREA_CLIENT_SENSITIVITY[selectedSlug] ?? [];
  const breakdownAreas = React.useMemo(() => {
    if (!breakdownRaw) return [];
    const clientRatio = clients / BASE_CLIENTS;
    // Compute client-adjusted raw weights
    const adjusted = breakdownRaw.map((b, i) => {
      const sens = sensitivities[i] ?? 0.5;
      // Sensitivity modulates how much this area grows/shrinks with client count
      const factor = 1 + (clientRatio - 1) * sens;
      return { ...b, adjustedWeight: b.weight * Math.max(0.4, factor) };
    });
    // Normalize so adjusted weights sum to 1.0
    const totalWeight = adjusted.reduce((s, a) => s + a.adjustedWeight, 0);
    return adjusted.map((a) => {
      const normalizedWeight = totalWeight > 0 ? a.adjustedWeight / totalWeight : a.weight;
      return {
        area: a.area,
        tooltip: a.tooltip,
        weight: normalizedWeight,
        hours: hoursSaved * normalizedWeight,
      };
    });
  }, [breakdownRaw, sensitivities, hoursSaved, clients]);

  const maxBreakdownHours = React.useMemo(() => {
    if (breakdownAreas.length === 0) return 1;
    return Math.max(...breakdownAreas.map((a) => a.hours));
  }, [breakdownAreas]);

  // Profiling integration
  React.useEffect(() => {
    if (!profiling) return;
    profiling.update({
      profession: selectedSlug,
      clients,
      weeklyHours,
      estimatedSavingsHours: hoursSaved,
      estimatedSavingsEur: monthlySavings,
      savingsBreakdown: breakdownAreas.map((a) => ({
        area: a.area,
        hours: a.hours,
      })),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSlug, clients, weeklyHours, hoursSaved, monthlySavings]);

  // Before/after bar widths
  const afterHours = weeklyHours - hoursSaved;
  const afterPercent = weeklyHours > 0 ? (afterHours / weeklyHours) * 100 : 100;

  return (
    <Section variant="white">
      {/* Inject slider styles */}
      <style dangerouslySetInnerHTML={{ __html: SLIDER_STYLES }} />

      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: "easeOut" as const }}
        className="text-center mb-12 md:mb-16"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-caveat)] font-bold text-navy leading-tight">
          {t.calculator.heading}
        </h2>
      </motion.div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* ---------------------------------------------------------------
            Left column -- Inputs
        --------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" as const, delay: 0.1 }}
          className="flex flex-col gap-8"
        >
          {/* Profession selector */}
          <fieldset>
            <legend className="text-sm font-sans font-semibold text-navy-muted uppercase tracking-wide mb-4">
              {t.simulation.selectProfession}
            </legend>
            <div className="flex flex-wrap gap-2">
              {PROFESSIONS.map((profession) => {
                const card = t.simulation.cards.find(
                  (c) => c.slug === profession.slug,
                );
                const label = card?.title ?? profession.slug;
                const isSelected = profession.slug === selectedSlug;

                return (
                  <button
                    key={profession.slug}
                    type="button"
                    onClick={() => setSelectedSlug(profession.slug)}
                    className={[
                      "px-4 py-2 rounded-full text-sm font-sans font-medium transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-light focus-visible:ring-offset-2",
                      isSelected
                        ? "bg-navy text-white border-navy shadow-soft"
                        : "bg-surface text-navy-muted border-border hover:border-navy-muted hover:text-navy",
                    ].join(" ")}
                    aria-pressed={isSelected}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Client count slider */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="clients-slider"
              className="text-sm font-sans font-semibold text-navy-muted uppercase tracking-wide"
            >
              {t.calculator.clientsLabel}
            </label>
            <CustomSlider
              id="clients-slider"
              min={10}
              max={500}
              step={10}
              value={clients}
              onChange={setClients}
            />
          </div>

          {/* Weekly admin hours slider */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="hours-slider"
              className="text-sm font-sans font-semibold text-navy-muted uppercase tracking-wide"
            >
              {t.calculator.hoursLabel}
            </label>
            <CustomSlider
              id="hours-slider"
              min={5}
              max={60}
              step={5}
              value={weeklyHours}
              onChange={setWeeklyHours}
              formatLabel={(v) => `${v}h`}
            />
            {/* Suggested hours hint based on client count */}
            <p className="text-xs font-sans text-silver italic mt-1">
              {t.calculator.suggestedHint
                ?.replace("{clients}", String(clients))
                .replace("{low}", String(sugLow))
                .replace("{high}", String(sugHigh)) ??
                `Per ${clients} clienti, le ore tipiche sono ${sugLow}-${sugHigh}h/settimana`}
            </p>
          </div>
        </motion.div>

        {/* ---------------------------------------------------------------
            Right column -- Results card
        --------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" as const, delay: 0.2 }}
        >
          <motion.div
            key={`${selectedSlug}-${clients}-${weeklyHours}`}
            animate={{
              borderColor: ["#cbd5e1", "#1e3a5f", "#cbd5e1"],
            }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="bg-surface rounded-xl p-8 border border-border shadow-soft flex flex-col gap-6"
          >
            {/* ---- Top: Big headline savings ---- */}
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-[family-name:var(--font-caveat)] font-bold text-navy-light leading-none tabular-nums">
                <AnimatedNumber value={monthlySavings} format={formatEur} />
                <span className="text-xl md:text-2xl font-semibold text-navy-muted ml-1">
                  {t.calculator.perMonth}
                </span>
              </div>
              <p className="mt-2 text-base font-sans text-navy-muted">
                <AnimatedNumber value={hoursSaved} format={formatDecimal} />
                <span className="ml-1">
                  h {t.calculator.resultHours?.toLowerCase?.() ?? t.calculator.resultHours}
                </span>
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* ---- Middle: Breakdown stacked bar chart ---- */}
            <div>
              <div className="flex items-center gap-1 mb-4">
                <p className="text-xs font-sans font-semibold text-navy-muted uppercase tracking-widest">
                  {t.calculator.breakdownHeading}
                </p>
                <InfoTooltip text={t.calculator.methodologyText} />
              </div>

              <motion.div
                className="flex flex-col gap-3"
                variants={barContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-40px" }}
                key={`breakdown-${selectedSlug}-${weeklyHours}`}
              >
                {breakdownAreas.map((area, idx) => {
                  const barWidthPercent =
                    maxBreakdownHours > 0
                      ? (area.hours / maxBreakdownHours) * 100
                      : 0;
                  const opacityLevel = 1 - idx * 0.15;

                  return (
                    <div key={area.area} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-xs font-sans">
                        <div className="flex items-center text-navy-muted font-medium">
                          <span>{area.area}</span>
                          <InfoTooltip text={area.tooltip} />
                        </div>
                        <span className="text-navy font-semibold tabular-nums">
                          {formatDecimal(area.hours)}h
                        </span>
                      </div>
                      <div className="w-full h-3 bg-surface-dark rounded-full overflow-hidden">
                        <motion.div
                          variants={barItemVariants}
                          className="h-full rounded-full"
                          style={{
                            maxWidth: `${barWidthPercent}%`,
                            backgroundColor: `rgba(30, 58, 95, ${opacityLevel})`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* ---- Bottom: Before/After comparison ---- */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-sans font-semibold text-navy-muted uppercase tracking-widest">
                {t.calculator.beforeLabel} vs {t.calculator.afterLabel}
              </p>

              {/* Current (Before) bar */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-navy-muted font-medium">
                    {t.calculator.beforeLabel}
                  </span>
                  <span className="text-navy font-semibold tabular-nums">
                    {weeklyHours}h{t.calculator.perWeek}
                  </span>
                </div>
                <div className="w-full h-4 rounded-full bg-amber-400/30 overflow-hidden">
                  <div className="h-full rounded-full bg-amber-500/80 w-full" />
                </div>
              </div>

              {/* After bar */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-navy-muted font-medium">
                    {t.calculator.afterLabel}
                  </span>
                  <span className="text-navy font-semibold tabular-nums">
                    {formatDecimal(afterHours)}h{t.calculator.perWeek}
                  </span>
                </div>
                <div className="w-full h-4 rounded-full bg-surface-dark overflow-hidden relative">
                  <motion.div
                    className="h-full rounded-full bg-navy-light"
                    initial={{ width: "100%" }}
                    animate={{ width: `${afterPercent}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" as const }}
                  />
                  {/* Savings indicator in the gap */}
                  {afterPercent < 95 && (
                    <motion.div
                      className="absolute top-0 h-full flex items-center justify-center"
                      style={{
                        left: `${afterPercent}%`,
                        right: "0%",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      <span className="text-[10px] font-sans font-bold text-emerald-600 whitespace-nowrap px-1">
                        -{formatDecimal(hoursSaved)}h
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Savings summary */}
              <div className="flex items-center justify-center mt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-sans font-semibold">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  {t.calculator.savingsLabel}: {formatDecimal(hoursSaved)}h
                  {t.calculator.perWeek} = {formatEur(monthlySavings)}
                  {t.calculator.perMonth}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* CTA */}
            <Link href={`/demo/login?profession=${selectedSlug}`} className="block">
              <Button size="lg" className="w-full">
                {t.calculator.cta}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
