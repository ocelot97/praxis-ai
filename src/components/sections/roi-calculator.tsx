"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useMotionValue, useInView, animate } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { PROFESSIONS } from "@/lib/professions";
import { useLocale } from "@/lib/i18n";

// --------------------------------------------------------------------------
// Profession-specific multipliers (fraction of admin hours Praxis AI saves)
// --------------------------------------------------------------------------
const MULTIPLIERS: Record<string, number> = {
  avvocati: 0.35,
  commercialisti: 0.40,
  "consulenti-del-lavoro": 0.38,
  odontoiatri: 0.30,
  "architetti-ingegneri": 0.28,
  geometri: 0.32,
};

// --------------------------------------------------------------------------
// AnimatedNumber — smoothly counts to `value` whenever it changes.
// Unlike the hero's CountUp (which fires once on first in-view), this one
// re-animates every time `value` updates so the results feel live.
// --------------------------------------------------------------------------
function AnimatedNumber({
  value,
  format,
  containerRef,
}: {
  value: number;
  format: (n: number) => string;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const motionVal = useMotionValue(0);
  const isInView = useInView(containerRef, { once: false, margin: "-40px" });
  const [display, setDisplay] = React.useState(0);

  // When the section first comes into view kick off an initial count-up.
  // After that, whenever `value` changes while still in view, animate to it.
  React.useEffect(() => {
    if (!isInView) return;

    const controls = animate(motionVal, value, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
    // motionVal is stable — only re-run when value or isInView changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, isInView]);

  return <span>{format(display)}</span>;
}

// --------------------------------------------------------------------------
// ROI Calculation helpers
// --------------------------------------------------------------------------
function calcHoursSaved(weeklyHours: number, slug: string): number {
  const multiplier = MULTIPLIERS[slug] ?? 0.33;
  return weeklyHours * multiplier;
}

function calcMonthlySavings(hoursSaved: number): number {
  // 4.33 weeks/month × €35/hr average professional rate
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
  // Show one decimal for hours (e.g. 7.0) so the display feels precise
  return value.toFixed(1);
}

// --------------------------------------------------------------------------
// ROICalculator
// --------------------------------------------------------------------------
export function ROICalculator() {
  const { t } = useLocale();

  // Default to first profession
  const [selectedSlug, setSelectedSlug] = React.useState<string>(
    PROFESSIONS[0].slug
  );
  const [clients, setClients] = React.useState<number>(50);
  const [weeklyHours, setWeeklyHours] = React.useState<number>(20);

  // Derived results
  const hoursSaved = calcHoursSaved(weeklyHours, selectedSlug);
  const monthlySavings = calcMonthlySavings(hoursSaved);

  // Shared ref so AnimatedNumber's useInView works from the results card
  const resultsRef = React.useRef<HTMLDivElement>(null);

  return (
    <Section variant="white">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="text-center mb-12 md:mb-16"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-caveat)] font-bold text-navy leading-tight">
          {t.calculator.heading}
        </h2>
      </motion.div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* ----------------------------------------------------------------
            Left column — Inputs
        ---------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
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
                  (c) => c.slug === profession.slug
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
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="clients-slider"
                className="text-sm font-sans font-semibold text-navy-muted uppercase tracking-wide"
              >
                {t.calculator.clientsLabel}
              </label>
              <span className="text-2xl font-[family-name:var(--font-caveat)] font-bold text-navy tabular-nums">
                {clients}
              </span>
            </div>
            <input
              id="clients-slider"
              type="range"
              min={10}
              max={500}
              step={10}
              value={clients}
              onChange={(e) => setClients(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-dark accent-[#1e3a5f]"
              style={{ accentColor: "#1e3a5f" }}
            />
            <div className="flex justify-between text-xs font-sans text-silver">
              <span>10</span>
              <span>500</span>
            </div>
          </div>

          {/* Weekly admin hours slider */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="hours-slider"
                className="text-sm font-sans font-semibold text-navy-muted uppercase tracking-wide"
              >
                {t.calculator.hoursLabel}
              </label>
              <span className="text-2xl font-[family-name:var(--font-caveat)] font-bold text-navy tabular-nums">
                {weeklyHours}h
              </span>
            </div>
            <input
              id="hours-slider"
              type="range"
              min={5}
              max={60}
              step={5}
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-dark"
              style={{ accentColor: "#1e3a5f" }}
            />
            <div className="flex justify-between text-xs font-sans text-silver">
              <span>5h</span>
              <span>60h</span>
            </div>
          </div>
        </motion.div>

        {/* ----------------------------------------------------------------
            Right column — Results card
        ---------------------------------------------------------------- */}
        <motion.div
          ref={resultsRef}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
        >
          <div className="bg-surface rounded-xl p-8 border border-border shadow-soft flex flex-col gap-8">
            {/* Hours saved */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-sans font-semibold text-navy-muted uppercase tracking-widest">
                {t.calculator.resultHours}
              </p>
              <div className="text-5xl md:text-6xl font-[family-name:var(--font-caveat)] font-bold text-navy-light leading-none tabular-nums">
                <AnimatedNumber
                  value={hoursSaved}
                  format={formatDecimal}
                  containerRef={resultsRef}
                />
                <span className="text-3xl ml-1 text-navy-muted font-semibold">
                  h
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Monthly savings */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-sans font-semibold text-navy-muted uppercase tracking-widest">
                {t.calculator.resultCost}
              </p>
              <div className="text-5xl md:text-6xl font-[family-name:var(--font-caveat)] font-bold text-navy-light leading-none tabular-nums">
                <AnimatedNumber
                  value={monthlySavings}
                  format={formatEur}
                  containerRef={resultsRef}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* CTA */}
            <Link href="/demo/login" className="block">
              <Button size="lg" className="w-full">
                {t.calculator.cta}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
