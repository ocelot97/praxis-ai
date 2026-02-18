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
  preview?: string;
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
`;

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

      {/* Preview area */}
      <div className="aspect-video bg-navy/[0.03] rounded-xl mb-4 overflow-hidden relative">
        {demo.preview ? (
          <video
            src={demo.preview}
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-500"
            onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
            onMouseOut={(e) => {
              const v = e.target as HTMLVideoElement;
              v.pause();
              v.currentTime = 0;
            }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center relative"
            style={{
              background:
                "linear-gradient(135deg, rgba(30,58,95,0.06) 0%, rgba(30,58,95,0.14) 50%, rgba(30,58,95,0.06) 100%)",
            }}
          >
            {/* Shimmer sweep */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "demoShimmer 3s ease-in-out infinite",
              }}
            />
            {/* Profession SVG icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="w-16 h-16 text-navy-light/40 relative z-10"
              style={{ animation: "demoPulseIcon 2.8s ease-in-out infinite" }}
            >
              {demo.iconPaths.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </svg>
          </div>
        )}
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
        preview: `/demo/previews/${p.demoSlug}.webm`,
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
        preview: undefined,
      },
      {
        slug: "klaviyo-ai-ops",
        professionSlug: "",
        title: t.demoHub.otherDemos.klaviyoOps.title,
        description: t.demoHub.otherDemos.klaviyoOps.description,
        tag: "Klaviyo",
        iconPaths: ["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", "M22 6l-10 7L2 6"],
        preview: undefined,
      },
      {
        slug: "shopify-ai-strategist",
        professionSlug: "",
        title: t.demoHub.otherDemos.shopifyStrategist.title,
        description: t.demoHub.otherDemos.shopifyStrategist.description,
        tag: "Shopify",
        iconPaths: ["M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z", "M3 6h18", "M16 10a4 4 0 01-8 0"],
        preview: undefined,
      },
      {
        slug: "shopify-ai-ops",
        professionSlug: "",
        title: t.demoHub.otherDemos.shopifyOps.title,
        description: t.demoHub.otherDemos.shopifyOps.description,
        tag: "Shopify",
        iconPaths: ["M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2", "M12 7a4 4 0 100-8 4 4 0 000 8z", "M16 3.13a4 4 0 010 7.75", "M21 21v-2a4 4 0 00-3-3.87"],
        preview: undefined,
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
