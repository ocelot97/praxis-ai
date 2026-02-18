"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogoMark } from "@/components/ui/logo";
import { useLocale } from "@/lib/i18n";
import { getProfessionByDemoSlug, PROFESSIONS } from "@/lib/professions";
import { useProfilingContext } from "@/lib/profiling-context";

/* ------------------------------------------------------------------ */
/*  Demo ordering (derived from PROFESSIONS + other demos)            */
/* ------------------------------------------------------------------ */

const OTHER_DEMO_ORDER = [
  { slug: "klaviyo-ai-strategist", professionSlug: "" },
  { slug: "klaviyo-ai-ops", professionSlug: "" },
  { slug: "shopify-ai-strategist", professionSlug: "" },
  { slug: "shopify-ai-ops", professionSlug: "" },
];

const DEMO_ORDER = [
  ...PROFESSIONS.map((p) => ({ slug: p.demoSlug, professionSlug: p.slug })),
  ...OTHER_DEMO_ORDER,
];

/** Human-readable titles for the "other" demos (not backed by PROFESSIONS). */
const OTHER_DEMO_TITLES: Record<string, string> = {
  "klaviyo-ai-strategist": "Klaviyo AI Strategist",
  "klaviyo-ai-ops": "Klaviyo AI Ops",
  "shopify-ai-strategist": "Shopify AI Strategist",
  "shopify-ai-ops": "Shopify AI Ops",
};

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function ExpandIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
    </svg>
  );
}

function CompressIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14h6v6m10-10h-6V4m0 6l7-7M3 21l7-7" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Tooltip wrapper                                                     */
/* ------------------------------------------------------------------ */

function Tooltip({
  label,
  side = "bottom",
  children,
}: {
  label: string;
  side?: "bottom" | "top";
  children: React.ReactNode;
}) {
  return (
    <div className="relative group/tip">
      {children}
      <div
        className={`
          pointer-events-none absolute left-1/2 -translate-x-1/2 z-50
          px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/10
          text-xs font-sans text-white/80 whitespace-nowrap
          opacity-0 group-hover/tip:opacity-100
          transition-all duration-200 ease-out
          scale-95 group-hover/tip:scale-100
          ${side === "bottom" ? "top-full mt-2" : "bottom-full mb-2"}
        `}
      >
        {label}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export function DemoViewer({ html, slug }: { html: string; slug: string }) {
  const router = useRouter();
  const { t } = useLocale();
  const profiling = useProfilingContext();

  /* ---------- profession-derived data ---------- */
  const profession = getProfessionByDemoSlug(slug);
  const professionSlug = profession?.slug ?? "";
  const isOtherDemo = !profession && slug in OTHER_DEMO_TITLES;

  /* ---------- demo index & neighbours ---------- */
  const currentIndex = DEMO_ORDER.findIndex((d) => d.slug === slug);
  const prevDemo = DEMO_ORDER[(currentIndex - 1 + DEMO_ORDER.length) % DEMO_ORDER.length];
  const nextDemo = DEMO_ORDER[(currentIndex + 1) % DEMO_ORDER.length];

  const currentProfessionSlug = DEMO_ORDER[currentIndex]?.professionSlug;
  const currentCard = t.simulation.cards.find((c) => c.slug === currentProfessionSlug);
  const currentTitle = currentCard
    ? `Demo ${currentCard.title}`
    : (OTHER_DEMO_TITLES[slug] ?? slug);

  /* ---------- prev/next titles for tooltips ---------- */
  const prevCard = t.simulation.cards.find((c) => c.slug === prevDemo?.professionSlug);
  const prevTitle = prevCard
    ? `Demo ${prevCard.title}`
    : (OTHER_DEMO_TITLES[prevDemo?.slug ?? ""] ?? prevDemo?.slug ?? "");
  const nextCard = t.simulation.cards.find((c) => c.slug === nextDemo?.professionSlug);
  const nextTitle = nextCard
    ? `Demo ${nextCard.title}`
    : (OTHER_DEMO_TITLES[nextDemo?.slug ?? ""] ?? nextDemo?.slug ?? "");

  /* ---------- profession intro text ---------- */
  const professionData = professionSlug
    ? (t.professions as Record<string, { demoIntro?: string }>)[professionSlug]
    : null;
  const demoIntroText = professionData?.demoIntro ?? "";

  /* ---------- state ---------- */
  const [loaded, setLoaded] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [showIntro, setShowIntro] = React.useState(true);

  const progressTimerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  /* ---------- reset intro when slug changes ---------- */
  React.useEffect(() => {
    setShowIntro(true);
    setLoaded(false);
    setProgress(0);
  }, [slug]);

  /* ---------- track demo viewed in profiling ---------- */
  React.useEffect(() => {
    if (profiling && slug) {
      profiling.addDemoViewed(slug);
    }
  }, [slug]);

  /* ---------- srcDoc injection (preserved from original) ---------- */
  const srcDoc = React.useMemo(() => {
    const locale =
      (typeof window !== "undefined" && localStorage.getItem("praxis-locale")) ||
      "it";
    const localeScript = `<script>window.__PRAXIS_LOCALE__="${locale}";</script>`;
    return html.replace("<head>", `<head><base target="_blank">${localeScript}`);
  }, [html]);

  /* ---------- simulated progress bar ---------- */
  React.useEffect(() => {
    if (loaded) {
      // Jump to 100% then clear
      setProgress(100);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      return;
    }

    // Animate from 0 toward 90% with diminishing increments
    setProgress(0);
    let current = 0;
    progressTimerRef.current = setInterval(() => {
      const remaining = 90 - current;
      const increment = Math.max(0.3, remaining * 0.06);
      current = Math.min(90, current + increment);
      setProgress(current);
    }, 80);

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [loaded]);

  /* ---------- keyboard shortcuts ---------- */
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        router.push("/demo");
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        router.push(`/demo/${prevDemo.slug}`);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        router.push(`/demo/${nextDemo.slug}`);
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, prevDemo.slug, nextDemo.slug]);

  /* ---------- fullscreen sync ---------- */
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = React.useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  /* ---------- iframe loaded handler ---------- */
  const handleIframeLoad = React.useCallback(() => {
    setLoaded(true);
  }, []);

  /* ---------- render ---------- */
  return (
    <div className="h-screen flex flex-col bg-navy overflow-hidden">
      {/* ============================================================ */}
      {/*  TOOLBAR                                                      */}
      {/* ============================================================ */}
      <div className="flex-shrink-0 z-30">
        <div className="flex items-center justify-between px-3 py-2 bg-navy-light/95 backdrop-blur-md border-b border-white/[0.06]">
          {/* --- Left: Back + Prev nav --- */}
          <div className="flex items-center gap-1 min-w-[180px]">
            <Tooltip label="All Demos (Esc)">
              <Link
                href="/demo"
                className="flex items-center gap-1.5 text-xs font-sans text-white/50 hover:text-white/90 transition-colors px-2 py-1.5 rounded-md hover:bg-white/[0.06]"
              >
                <ArrowLeftIcon className="w-3.5 h-3.5" />
                <span>Demos</span>
              </Link>
            </Tooltip>

            <div className="w-px h-4 bg-white/[0.08] mx-1" />

            <Tooltip label={prevTitle}>
              <Link
                href={`/demo/${prevDemo.slug}`}
                className="flex items-center justify-center w-7 h-7 rounded-md text-white/40 hover:text-white/90 hover:bg-white/[0.06] transition-all"
                aria-label={`Previous demo: ${prevTitle}`}
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </Link>
            </Tooltip>
          </div>

          {/* --- Center: Logo + Title + Dots --- */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-2">
              <LogoMark className="w-4 h-4 text-accent" />
              <span className="text-sm font-sans font-medium text-white/70 tracking-wide">
                {currentTitle}
              </span>
            </div>

            {/* Carousel dots */}
            <div className="flex items-center gap-1.5">
              {DEMO_ORDER.map((demo, i) => {
                const dotCard = t.simulation.cards.find((c) => c.slug === demo.professionSlug);
                const dotTitle = dotCard
                  ? `Demo ${dotCard.title}`
                  : (OTHER_DEMO_TITLES[demo.slug] ?? demo.slug);
                return (
                  <Link
                    key={demo.slug}
                    href={`/demo/${demo.slug}`}
                    aria-label={dotTitle}
                    className="group/dot"
                  >
                    <div
                      className={`
                        rounded-full transition-all duration-300 ease-out
                        ${
                          i === currentIndex
                            ? "w-5 h-1.5 bg-accent"
                            : "w-1.5 h-1.5 bg-white/20 group-hover/dot:bg-white/40"
                        }
                      `}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* --- Right: Next nav + Fullscreen --- */}
          <div className="flex items-center gap-1 min-w-[180px] justify-end">
            <Tooltip label={nextTitle}>
              <Link
                href={`/demo/${nextDemo.slug}`}
                className="flex items-center justify-center w-7 h-7 rounded-md text-white/40 hover:text-white/90 hover:bg-white/[0.06] transition-all"
                aria-label={`Next demo: ${nextTitle}`}
              >
                <ChevronRightIcon className="w-4 h-4" />
              </Link>
            </Tooltip>

            <div className="w-px h-4 bg-white/[0.08] mx-1" />

            <Tooltip label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
              <button
                onClick={toggleFullscreen}
                className="flex items-center justify-center w-7 h-7 rounded-md text-white/40 hover:text-white/90 hover:bg-white/[0.06] transition-all"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? (
                  <CompressIcon className="w-3.5 h-3.5" />
                ) : (
                  <ExpandIcon className="w-3.5 h-3.5" />
                )}
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  CONTENT AREA                                                 */}
      {/* ============================================================ */}
      <div className="flex-1 relative min-h-0">
        {/* --- Loading overlay --- */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center bg-navy transition-opacity duration-500 ease-out pointer-events-none"
          style={{
            opacity: loaded ? 0 : 1,
          }}
        >
          <div className="flex flex-col items-center gap-5">
            {/* Pulsing Praxis logo */}
            <div className="relative">
              <LogoMark className="w-12 h-12 text-accent animate-pulse" />
              {/* Glow ring behind logo */}
              <div className="absolute inset-0 -m-2 rounded-full bg-accent/10 animate-ping" style={{ animationDuration: "2s" }} />
            </div>

            {/* Demo title */}
            <span className="text-sm font-sans font-medium text-white/40 tracking-wide">
              {currentTitle}
            </span>

            {/* Progress bar */}
            <div className="w-48 h-0.5 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full bg-accent transition-all ease-out"
                style={{
                  width: `${progress}%`,
                  transitionDuration: loaded ? "300ms" : "80ms",
                }}
              />
            </div>

            {/* Keyboard hint */}
            <div className="flex items-center gap-3 mt-2">
              {[
                { key: "\u2190", label: "Prev" },
                { key: "\u2192", label: "Next" },
                { key: "Esc", label: "Back" },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center gap-1.5">
                  <kbd className="inline-flex items-center justify-center min-w-[22px] h-5 px-1.5 rounded bg-white/[0.06] border border-white/[0.08] text-[10px] font-sans font-medium text-white/30">
                    {key}
                  </kbd>
                  <span className="text-[10px] font-sans text-white/20">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Intro overlay --- */}
        {loaded && showIntro && (
          <div className="absolute inset-0 z-15 flex flex-col items-center justify-center bg-navy/80 backdrop-blur-sm">
            <h3 className="text-2xl font-[family-name:var(--font-caveat)] font-bold text-white mb-3">
              {t.demoViewer.introOverlayTitle}
            </h3>
            <p className="text-base text-white/80 max-w-md text-center mb-6 px-4">
              {demoIntroText}
            </p>
            <button
              onClick={() => setShowIntro(false)}
              className="px-6 py-3 bg-white text-navy font-semibold rounded-xl hover:bg-white/90 transition-colors"
            >
              {t.demoViewer.introOverlayCta}
            </button>
          </div>
        )}

        {/* --- Iframe --- */}
        <iframe
          srcDoc={srcDoc}
          sandbox="allow-scripts"
          className="w-full h-full border-0 transition-opacity duration-300 ease-out"
          style={{ opacity: loaded ? 1 : 0 }}
          title={`${currentTitle} Demo`}
          onLoad={handleIframeLoad}
        />

        {/* --- Bottom bar — always visible --- */}
        {loaded && !showIntro && (
          <div className="absolute bottom-0 left-0 right-0 z-15">
            <div className="bg-navy-light/95 backdrop-blur-sm border-t border-white/10 px-6 py-3 flex items-center justify-between">
              <span className="text-white/80 text-sm">{t.demoViewer.postDemoTitle}</span>
              <div className="flex items-center gap-3">
                <Link
                  href={isOtherDemo ? "/contact" : `/soluzioni/${professionSlug}`}
                  className="text-white/70 text-sm hover:text-white transition-colors"
                >
                  {t.demoViewer.postDemoBack}
                </Link>
                <Link
                  href="/contact"
                  className="px-4 py-2 bg-white text-navy text-sm font-semibold rounded-lg hover:bg-white/90 transition-colors"
                >
                  {t.demoViewer.postDemoCta}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
