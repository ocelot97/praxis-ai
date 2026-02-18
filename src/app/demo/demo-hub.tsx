"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useCallback, useMemo, useState } from "react";
import { LogoMark } from "@/components/ui/logo";
import { logout } from "./login/actions";
import { useLocale } from "@/lib/i18n";
import { PROFESSIONS } from "@/lib/professions";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Demo {
  slug: string;
  professionSlug: string;
  title: string;
  description: string;
  tag: string;
  iconPaths: string[];
}

/* ------------------------------------------------------------------ */
/*  Formatted date                                                     */
/* ------------------------------------------------------------------ */

function formattedDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/* ------------------------------------------------------------------ */
/*  CSS keyframes (injected via <style>)                               */
/* ------------------------------------------------------------------ */

const keyframesCSS = `
@keyframes demoFadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes demoPulseIcon {
  0%, 100% { transform: scale(1);    opacity: 0.85; }
  50%      { transform: scale(1.12); opacity: 1; }
}
@keyframes demoShimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}
@keyframes scanLine {
  0%   { top: 10%; opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { top: 85%; opacity: 0; }
}
@keyframes mockFadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes mockPulse {
  0%, 100% { opacity: 0.6; }
  50%      { opacity: 1; }
}
`;

/* ------------------------------------------------------------------ */
/*  Demo preview illustrations                                         */
/* ------------------------------------------------------------------ */

function DemoPreviewScene({ slug }: { slug: string }) {
  const scenes: Record<string, React.ReactNode> = {
    "customer-agents": (
      /* Avvocati: Contract with highlighted clauses */
      <>
        <div className="absolute inset-3 rounded-lg bg-white/80 shadow-sm border border-navy/10 flex flex-col p-3 gap-1.5">
          <div className="h-2.5 w-3/4 rounded bg-navy/20" />
          <div className="h-1.5 w-full rounded bg-navy/8" />
          <div className="h-1.5 w-full rounded bg-navy/8" />
          <div className="h-1.5 w-5/6 rounded bg-emerald-500/25 border-l-2 border-emerald-500" />
          <div className="h-1.5 w-full rounded bg-navy/8" />
          <div className="h-1.5 w-11/12 rounded bg-red-500/25 border-l-2 border-red-500 group-hover:animate-pulse" />
          <div className="h-1.5 w-full rounded bg-navy/8" />
          <div className="h-1.5 w-4/5 rounded bg-amber-500/25 border-l-2 border-amber-500" />
          <div className="h-1.5 w-2/3 rounded bg-navy/8" />
        </div>
        <div className="absolute top-3 bottom-3 left-3 w-0.5 bg-gradient-to-b from-navy-light/0 via-navy-light/60 to-navy-light/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ animation: "scanLine 2.5s ease-in-out infinite" }} />
      </>
    ),
    "document-intelligence": (
      /* Commercialisti: Invoice cards cascading */
      <>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute rounded-md bg-white/90 shadow-sm border border-navy/10 transition-transform duration-500 group-hover:translate-x-1"
            style={{
              width: "55%",
              height: "28%",
              top: `${8 + i * 14}%`,
              left: `${6 + i * 6}%`,
              zIndex: 5 - i,
            }}
          >
            <div className="p-2 flex flex-col gap-1">
              <div className="flex justify-between">
                <div className="h-1.5 w-12 rounded bg-navy/20" />
                <div className="h-1.5 w-8 rounded bg-emerald-500/30" />
              </div>
              <div className="h-1 w-full rounded bg-navy/6" />
              <div className="h-1 w-3/4 rounded bg-navy/6" />
            </div>
          </div>
        ))}
        <div className="absolute right-3 top-1/4 bottom-1/4 w-[35%] rounded-md bg-white/70 border border-navy/10 p-2 flex flex-col gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40 flex-shrink-0" />
              <div className="h-1 flex-1 rounded bg-navy/10" />
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40 flex-shrink-0 group-hover:animate-pulse" />
            <div className="h-1 flex-1 rounded bg-navy/10" />
          </div>
        </div>
      </>
    ),
    "workflow-automation": (
      /* Consulenti del Lavoro: Employee cards grid */
      <>
        <div className="absolute inset-3 grid grid-cols-3 gap-1.5">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="rounded-md bg-white/85 border border-navy/10 p-1.5 flex flex-col gap-1 transition-all duration-300 group-hover:shadow-sm"
            >
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-navy/15" />
                <div className="h-1.5 flex-1 rounded bg-navy/15" />
              </div>
              <div className={`h-1 w-3/4 rounded ${i === 0 ? "bg-blue-500/30" : i < 3 ? "bg-emerald-500/25" : "bg-amber-500/25"}`} />
              <div className="h-1 w-1/2 rounded bg-navy/6" />
              {i === 0 && <div className="h-1 w-full rounded bg-amber-500/30 group-hover:animate-pulse" />}
            </div>
          ))}
        </div>
      </>
    ),
    "knowledge-systems": (
      /* Odontoiatri: Weekly calendar grid */
      <>
        <div className="absolute inset-3 flex flex-col gap-1">
          <div className="flex gap-1">
            {["L", "M", "M", "G", "V"].map((d, i) => (
              <div key={i} className="flex-1 text-center text-[7px] font-sans font-semibold text-navy/40">{d}</div>
            ))}
          </div>
          <div className="flex-1 grid grid-cols-5 gap-1">
            {Array.from({ length: 15 }).map((_, i) => {
              const filled = [0, 1, 2, 3, 5, 6, 8, 9, 10, 12, 13].includes(i);
              const conflict = i === 7;
              const empty = !filled && !conflict;
              return (
                <div
                  key={i}
                  className={`rounded-sm transition-all duration-300 ${
                    conflict
                      ? "bg-red-500/20 border border-red-500/30 group-hover:animate-pulse"
                      : filled
                      ? "bg-navy-light/15 group-hover:bg-navy-light/25"
                      : empty
                      ? "bg-navy/[0.03] border border-dashed border-navy/10"
                      : ""
                  }`}
                />
              );
            })}
          </div>
        </div>
      </>
    ),
    "email-strategist": (
      /* Architetti/Ingegneri: Project kanban */
      <>
        <div className="absolute inset-3 flex gap-1.5">
          {[
            { color: "bg-blue-500/20", items: 2 },
            { color: "bg-amber-500/20", items: 1 },
            { color: "bg-emerald-500/20", items: 2 },
            { color: "bg-purple-500/20", items: 1 },
          ].map((col, ci) => (
            <div key={ci} className="flex-1 flex flex-col gap-1">
              <div className={`h-1 w-full rounded-full ${col.color}`} />
              {Array.from({ length: col.items }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-md bg-white/80 border border-navy/8 p-1 flex flex-col gap-0.5 transition-shadow duration-300 group-hover:shadow-sm"
                >
                  <div className="h-1 w-3/4 rounded bg-navy/15" />
                  <div className="h-0.5 w-full rounded bg-navy/6" />
                  <div className="h-0.5 w-2/3 rounded bg-navy/6" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </>
    ),
    "email-designer": (
      /* Geometri: Survey map + data */
      <>
        <div className="absolute inset-3 flex gap-2">
          <div className="flex-1 rounded-md bg-white/80 border border-navy/10 p-2 flex flex-col gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-1.5 items-center">
                <div className="w-3 h-1.5 rounded bg-navy/15 text-[5px] font-mono" />
                <div className="h-1 flex-1 rounded bg-navy/8" />
                <div className="h-1 w-6 rounded bg-navy/8" />
              </div>
            ))}
          </div>
          <div className="flex-1 rounded-md bg-emerald-50/60 border border-navy/10 relative overflow-hidden">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
              <polygon points="25,20 75,15 85,70 45,85 15,50" fill="none" stroke="#1e3a5f" strokeWidth="1" opacity="0.25" className="group-hover:opacity-50 transition-opacity duration-500" />
              {[[25, 20], [75, 15], [85, 70], [45, 85], [15, 50]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="2.5" fill="#1e3a5f" opacity="0.4" />
              ))}
            </svg>
          </div>
        </div>
      </>
    ),
    "klaviyo-ai-strategist": (
      /* Klaviyo Strategist: Campaign metrics table */
      <>
        <div className="absolute inset-3 rounded-md bg-white/80 border border-navy/10 p-2 flex flex-col gap-1.5">
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex-1 rounded bg-navy/[0.04] p-1.5 flex flex-col gap-0.5">
                <div className="h-1 w-1/2 rounded bg-navy/10" />
                <div className="h-2.5 w-3/4 rounded bg-navy/20" />
              </div>
            ))}
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-1.5 flex-1 rounded bg-navy/8" />
              <div className={`h-1.5 w-6 rounded ${i === 0 ? "bg-emerald-500/30" : i === 1 ? "bg-amber-500/30" : "bg-emerald-500/30"}`} />
              <div className="h-1.5 w-8 rounded bg-navy/10" />
            </div>
          ))}
        </div>
      </>
    ),
    "klaviyo-ai-ops": (
      /* Klaviyo Ops: Email builder workspace */
      <>
        <div className="absolute inset-3 flex gap-1.5">
          <div className="w-[20%] rounded-md bg-white/70 border border-navy/10 p-1 flex flex-col gap-1">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-4 rounded bg-navy/[0.06] border border-dashed border-navy/10" />
            ))}
          </div>
          <div className="flex-1 rounded-md bg-white/90 border border-navy/10 p-2 flex flex-col gap-1 items-center">
            <div className="h-3 w-full rounded bg-navy/15" />
            <div className="h-8 w-3/4 rounded bg-navy/[0.06]" />
            <div className="flex gap-1 w-full">
              <div className="flex-1 h-6 rounded bg-navy/[0.05]" />
              <div className="flex-1 h-6 rounded bg-navy/[0.05]" />
            </div>
            <div className="h-3 w-1/2 rounded-full bg-accent/30 group-hover:bg-accent/50 transition-colors duration-500" />
          </div>
        </div>
      </>
    ),
    "shopify-ai-strategist": (
      /* Shopify Strategist: Store dashboard metrics */
      <>
        <div className="absolute inset-3 flex flex-col gap-1.5">
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex-1 rounded-md bg-white/85 border border-navy/10 p-1.5 flex flex-col gap-0.5">
                <div className="h-1 w-2/3 rounded bg-navy/10" />
                <div className="h-2 w-1/2 rounded bg-navy/20" />
              </div>
            ))}
          </div>
          <div className="flex-1 rounded-md bg-white/80 border border-navy/10 p-2 relative overflow-hidden">
            <svg viewBox="0 0 200 60" className="w-full h-full">
              <path d="M0,50 C30,45 50,30 80,35 C110,40 130,15 160,20 C180,22 195,10 200,8" fill="none" stroke="#1e3a5f" strokeWidth="1.5" opacity="0.3" className="group-hover:opacity-60 transition-opacity duration-500" />
              <path d="M0,50 C30,45 50,30 80,35 C110,40 130,15 160,20 C180,22 195,10 200,8 L200,60 L0,60 Z" fill="#1e3a5f" opacity="0.05" className="group-hover:opacity-10 transition-opacity duration-500" />
            </svg>
          </div>
        </div>
      </>
    ),
    "shopify-ai-ops": (
      /* Shopify Ops: Order queue + inventory */
      <>
        <div className="absolute inset-3 flex gap-1.5">
          <div className="flex-1 flex flex-col gap-1">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex-1 rounded-md bg-white/85 border border-navy/10 p-1 flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  i === 0 ? "bg-amber-500/50" : i === 1 ? "bg-blue-500/50" : i === 2 ? "bg-emerald-500/50" : "bg-emerald-500/50"
                }`} />
                <div className="h-1 flex-1 rounded bg-navy/10" />
                <div className="h-1 w-5 rounded bg-navy/8" />
              </div>
            ))}
          </div>
          <div className="w-[40%] flex flex-col gap-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex-1 rounded-md bg-white/80 border border-navy/10 p-1 flex flex-col gap-0.5">
                <div className="h-1 w-3/4 rounded bg-navy/10" />
                <div className={`h-1 w-1/2 rounded ${i === 0 ? "bg-red-500/25" : i === 1 ? "bg-amber-500/25" : "bg-emerald-500/25"}`} />
              </div>
            ))}
          </div>
        </div>
      </>
    ),
  };

  return (
    <div
      className="w-full h-full relative"
      style={{
        background:
          "linear-gradient(135deg, rgba(30,58,95,0.04) 0%, rgba(30,58,95,0.12) 50%, rgba(30,58,95,0.04) 100%)",
      }}
    >
      {scenes[slug] ?? (
        /* Fallback for unknown slugs */
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-navy/10" />
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section divider                                                    */
/* ------------------------------------------------------------------ */

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="flex-1 h-px bg-navy/10" />
      <span className="text-[11px] font-sans font-semibold tracking-[0.15em] uppercase text-silver/70 select-none">
        {label}
      </span>
      <div className="flex-1 h-px bg-navy/10" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Demo card                                                          */
/* ------------------------------------------------------------------ */

interface DemoCardProps {
  demo: Demo;
  globalIndex: number;
  total: number;
  focused: boolean;
  highlighted: boolean;
  recommendedBadge: string;
  launchDemo: string;
  cardRef: (el: HTMLAnchorElement | null) => void;
  onFocus: () => void;
}

function DemoCard({
  demo,
  globalIndex,
  total,
  focused,
  highlighted,
  recommendedBadge,
  launchDemo,
  cardRef,
  onFocus,
}: DemoCardProps) {
  return (
    <Link
      ref={cardRef}
      href={`/demo/${demo.slug}`}
      data-demo-index={globalIndex}
      onFocus={onFocus}
      className={[
        "group card-base flex flex-col relative",
        "hover:shadow-soft-lg hover:-translate-y-1",
        "transition-all duration-300 outline-none",
        focused
          ? "ring-2 ring-navy-light/60 ring-offset-2 ring-offset-ice shadow-soft-lg -translate-y-0.5"
          : "",
        highlighted
          ? "border-navy-light shadow-soft-lg"
          : "",
      ].join(" ")}
      style={{
        opacity: 0,
        animation: `demoFadeUp 0.5s ease-out ${globalIndex * 0.08}s forwards`,
      }}
    >
      {/* Recommended badge */}
      {highlighted && (
        <div className="absolute -top-3 left-4 z-20">
          <span className="text-[10px] font-sans font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-navy-light text-white select-none shadow-sm">
            {recommendedBadge}
          </span>
        </div>
      )}

      {/* Category pill */}
      <span className="absolute top-4 right-4 md:top-5 md:right-5 z-10 text-[10px] font-sans font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-navy/[0.04] text-silver/80 border border-navy/[0.06] select-none">
        {demo.tag}
      </span>

      {/* Preview area — mini mockup illustration */}
      <div className="aspect-video rounded-xl mb-4 overflow-hidden relative">
        <DemoPreviewScene slug={demo.slug} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-sans font-semibold text-navy mb-2 pr-16">
        {demo.title}
      </h3>

      {/* Description */}
      <p className="text-sm font-sans text-silver leading-relaxed flex-1">
        {demo.description}
      </p>

      {/* Card footer */}
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-navy-light font-sans font-semibold text-sm">
          {launchDemo}
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-sans text-silver/50 tabular-nums select-none">
            {globalIndex + 1} of {total}
          </span>
          <span
            className={[
              "text-[10px] font-sans text-silver/40 hidden sm:inline-flex items-center gap-1 select-none",
              "transition-opacity duration-200",
              focused
                ? "opacity-100 text-silver/60"
                : "opacity-0 group-hover:opacity-70",
            ].join(" ")}
          >
            <kbd className="inline-flex items-center justify-center w-4 h-4 rounded border border-navy/10 bg-navy/[0.03] text-[9px] font-mono leading-none">
              {"\u23CE"}
            </kbd>
            Launch
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function DemoHub({
  userEmail,
  profession,
}: {
  userEmail: string;
  profession?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLocale();
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const focusedRef = useRef(-1);
  const highlightedCardRef = useRef<HTMLAnchorElement | null>(null);

  const dateStr = useMemo(() => formattedDate(), []);

  /* ------ Derive demos from PROFESSIONS + translations ------ */

  const demos: Demo[] = useMemo(
    () =>
      PROFESSIONS.map((p, i) => ({
        slug: p.demoSlug,
        professionSlug: p.slug,
        title: t.simulation.cards[i].title,
        description: t.simulation.cards[i].tagline,
        tag: t.simulation.cards[i].title,
        iconPaths: p.iconPaths,
      })),
    [t],
  );

  /* ------ Other demos (Klaviyo / Shopify) ------ */

  const otherDemos: Demo[] = useMemo(
    () => [
      {
        slug: "klaviyo-ai-strategist",
        professionSlug: "",
        title: t.demoHub.otherDemos.klaviyoStrategist.title,
        description: t.demoHub.otherDemos.klaviyoStrategist.description,
        tag: "Klaviyo",
        iconPaths: ["M3 8l4-4 4 4M7 4v13a4 4 0 004 4h9", "M21 12l-4 4-4-4M17 16V3"],
      },
      {
        slug: "klaviyo-ai-ops",
        professionSlug: "",
        title: t.demoHub.otherDemos.klaviyoOps.title,
        description: t.demoHub.otherDemos.klaviyoOps.description,
        tag: "Klaviyo",
        iconPaths: ["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", "M22 6l-10 7L2 6"],
      },
      {
        slug: "shopify-ai-strategist",
        professionSlug: "",
        title: t.demoHub.otherDemos.shopifyStrategist.title,
        description: t.demoHub.otherDemos.shopifyStrategist.description,
        tag: "Shopify",
        iconPaths: ["M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z", "M3 6h18", "M16 10a4 4 0 01-8 0"],
      },
      {
        slug: "shopify-ai-ops",
        professionSlug: "",
        title: t.demoHub.otherDemos.shopifyOps.title,
        description: t.demoHub.otherDemos.shopifyOps.description,
        tag: "Shopify",
        iconPaths: ["M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2", "M12 7a4 4 0 100-8 4 4 0 000 8z", "M16 3.13a4 4 0 010 7.75", "M21 21v-2a4 4 0 00-3-3.87"],
      },
    ],
    [t],
  );

  /* ------ All demos combined (for keyboard nav) ------ */

  const allDemos = useMemo(() => [...demos, ...otherDemos], [demos, otherDemos]);

  /* ------ Resolve which profession (if any) is highlighted ------ */

  const highlightProfession =
    searchParams?.get("profession") ?? profession ?? null;

  const highlightedIndex = useMemo(() => {
    if (!highlightProfession) return -1;
    return demos.findIndex((d) => d.professionSlug === highlightProfession);
  }, [demos, highlightProfession]);

  /* ------ Auto-scroll to highlighted card on mount ------ */

  useEffect(() => {
    if (highlightedIndex < 0) return;
    const el = cardRefs.current[highlightedIndex];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlightedIndex]);

  /* ------ Focus helpers ------ */

  const moveFocus = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= allDemos.length) return;
      focusedRef.current = idx;
      setFocusedIndex(idx);
      cardRefs.current[idx]?.focus({ preventScroll: false });
      cardRefs.current[idx]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    },
    [allDemos.length],
  );

  /* ------ Global keyboard handler ------ */

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      const cols = window.innerWidth >= 640 ? 2 : 1;
      const cur = focusedRef.current;

      switch (e.key) {
        case "ArrowRight": {
          e.preventDefault();
          const next = cur + 1;
          if (next < allDemos.length) moveFocus(next);
          break;
        }
        case "ArrowLeft": {
          e.preventDefault();
          const prev = cur - 1;
          if (prev >= 0) moveFocus(prev);
          break;
        }
        case "ArrowDown": {
          e.preventDefault();
          const down = cur + cols;
          if (down < allDemos.length) moveFocus(down);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const up = cur - cols;
          if (up >= 0) moveFocus(up);
          break;
        }
        case "Enter": {
          if (cur >= 0 && cur < allDemos.length) {
            e.preventDefault();
            router.push(`/demo/${allDemos[cur].slug}`);
          }
          break;
        }
        case "Escape": {
          e.preventDefault();
          router.push("/");
          break;
        }
        default: {
          const num = parseInt(e.key, 10);
          if (num >= 1 && num <= demos.length) {
            e.preventDefault();
            moveFocus(num - 1);
          }
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [moveFocus, router, allDemos, demos.length]);

  /* ------ Card focus callback factory ------ */

  const makeOnFocus = useCallback(
    (idx: number) => () => {
      focusedRef.current = idx;
      setFocusedIndex(idx);
    },
    [],
  );

  /* ------ Render ------ */

  return (
    <div className="min-h-screen bg-ice flex flex-col">
      {/* Keyframe injection */}
      <style dangerouslySetInnerHTML={{ __html: keyframesCSS }} />

      {/* ---- Header ---- */}
      <header className="sticky top-0 z-50 bg-ice/95 backdrop-blur-sm border-b border-border">
        <div className="section-container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="transition-all duration-300 group-hover:opacity-80"
              style={{ animation: "spin 20s linear infinite" }}
            >
              <LogoMark className="w-8 h-8 text-accent" />
            </div>
            <span className="text-lg font-sans font-semibold text-navy">
              <span className="font-[family-name:var(--font-caveat)] text-xl">
                Praxis
              </span>{" "}
              AI
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="text-xs font-sans text-silver/50 hidden md:inline select-none">
              {dateStr}
            </span>

            <div className="h-4 w-px bg-navy/10 hidden md:block" />

            <span className="text-sm font-sans text-silver hidden sm:inline">
              {userEmail}
            </span>

            <div className="flex items-center gap-2.5">
              <form action={logout}>
                <button
                  type="submit"
                  className="text-sm font-sans font-medium text-navy-light hover:text-navy transition-colors"
                >
                  {t.demoHub.signOut}
                </button>
              </form>
              <span className="text-[10px] font-sans text-silver/40 hidden sm:inline-flex items-center gap-1 select-none">
                <kbd className="inline-flex items-center justify-center px-1.5 h-4 rounded border border-navy/10 bg-navy/[0.03] text-[9px] font-mono leading-none">
                  Esc
                </kbd>
                exit
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ---- Main ---- */}
      <main className="section-container py-12 md:py-16 flex-1">
        {/* Page heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-caveat)] font-bold text-navy mb-3">
            {t.demoHub.title}
          </h1>
          <p className="text-lg font-sans text-silver">
            {t.demoHub.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-14">
          {/* ---- Demo per Professione section ---- */}
          <section>
            <SectionLabel label={t.demoHub.professionGroup} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {demos.map((demo, i) => (
                <DemoCard
                  key={demo.slug}
                  demo={demo}
                  globalIndex={i}
                  total={allDemos.length}
                  focused={focusedIndex === i}
                  highlighted={highlightedIndex === i}
                  recommendedBadge={t.demoHub.recommendedBadge}
                  launchDemo={t.demoHub.launchDemo}
                  onFocus={makeOnFocus(i)}
                  cardRef={(el) => {
                    cardRefs.current[i] = el;
                    if (highlightedIndex === i) {
                      highlightedCardRef.current = el;
                    }
                  }}
                />
              ))}
            </div>
          </section>

          {/* ---- Altro section ---- */}
          <section>
            <SectionLabel label={t.demoHub.otherGroup} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherDemos.map((demo, i) => (
                <DemoCard
                  key={demo.slug}
                  demo={demo}
                  globalIndex={demos.length + i}
                  total={allDemos.length}
                  focused={focusedIndex === demos.length + i}
                  highlighted={false}
                  recommendedBadge=""
                  launchDemo={t.demoHub.launchDemo}
                  onFocus={makeOnFocus(demos.length + i)}
                  cardRef={(el) => {
                    cardRefs.current[demos.length + i] = el;
                  }}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* ---- Footer ---- */}
      <footer className="border-t border-border py-5">
        <div className="section-container flex items-center justify-center gap-6 flex-wrap">
          {[
            { keys: "\u2190 \u2192 \u2191 \u2193", label: "Navigate" },
            { keys: "\u23CE", label: "Launch" },
            { keys: "1\u20136", label: "Jump" },
            { keys: "Esc", label: "Exit" },
          ].map((hint) => (
            <span
              key={hint.label}
              className="text-[11px] font-sans text-silver/45 flex items-center gap-1.5 select-none"
            >
              <kbd className="inline-flex items-center justify-center px-1.5 h-4 rounded border border-navy/[0.08] bg-navy/[0.03] text-[10px] font-mono leading-none text-silver/60">
                {hint.keys}
              </kbd>
              {hint.label}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
