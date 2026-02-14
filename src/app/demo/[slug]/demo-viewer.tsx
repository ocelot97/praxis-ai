"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogoMark } from "@/components/ui/logo";

/* ------------------------------------------------------------------ */
/*  Demo ordering                                                      */
/* ------------------------------------------------------------------ */

const DEMO_ORDER = [
  { slug: "customer-agents", title: "Customer Agents" },
  { slug: "document-intelligence", title: "Document Intelligence" },
  { slug: "workflow-automation", title: "Workflow Automation" },
  { slug: "knowledge-systems", title: "Knowledge Systems" },
  { slug: "email-strategist", title: "Email Strategy AI" },
  { slug: "email-designer", title: "Email Design AI" },
] as const;

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

  /* ---------- demo index & neighbours ---------- */
  const currentIndex = DEMO_ORDER.findIndex((d) => d.slug === slug);
  const prevDemo = DEMO_ORDER[(currentIndex - 1 + DEMO_ORDER.length) % DEMO_ORDER.length];
  const nextDemo = DEMO_ORDER[(currentIndex + 1) % DEMO_ORDER.length];
  const currentTitle = DEMO_ORDER[currentIndex]?.title ?? slug;

  /* ---------- state ---------- */
  const [loaded, setLoaded] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [toolbarVisible, setToolbarVisible] = React.useState(true);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const hideTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressTimerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

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

  /* ---------- toolbar auto-hide ---------- */
  const resetHideTimer = React.useCallback(() => {
    setToolbarVisible(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setToolbarVisible(false);
    }, 3000);
  }, []);

  // Start initial auto-hide timer
  React.useEffect(() => {
    resetHideTimer();
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [resetHideTimer]);

  // Mouse movement: show toolbar when mouse is in top 60px
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 60) {
        resetHideTimer();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [resetHideTimer]);

  /* ---------- keyboard shortcuts ---------- */
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Any key press shows the toolbar
      resetHideTimer();

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
  }, [router, prevDemo.slug, nextDemo.slug, resetHideTimer]);

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
    <div className="h-screen flex flex-col bg-charcoal overflow-hidden">
      {/* ============================================================ */}
      {/*  TOOLBAR                                                      */}
      {/* ============================================================ */}
      <div
        className="flex-shrink-0 z-30 transition-all duration-300 ease-out"
        style={{
          transform: toolbarVisible ? "translateY(0)" : "translateY(-100%)",
          opacity: toolbarVisible ? 1 : 0,
        }}
        onMouseEnter={resetHideTimer}
      >
        <div className="flex items-center justify-between px-3 py-2 bg-charcoal-light/95 backdrop-blur-md border-b border-white/[0.06]">
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

            <Tooltip label={prevDemo.title}>
              <Link
                href={`/demo/${prevDemo.slug}`}
                className="flex items-center justify-center w-7 h-7 rounded-md text-white/40 hover:text-white/90 hover:bg-white/[0.06] transition-all"
                aria-label={`Previous demo: ${prevDemo.title}`}
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </Link>
            </Tooltip>
          </div>

          {/* --- Center: Logo + Title + Dots --- */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-2">
              <LogoMark className="w-4 h-4 text-terracotta" />
              <span className="text-sm font-sans font-medium text-white/70 tracking-wide">
                {currentTitle}
              </span>
            </div>

            {/* Carousel dots */}
            <div className="flex items-center gap-1.5">
              {DEMO_ORDER.map((demo, i) => (
                <Link
                  key={demo.slug}
                  href={`/demo/${demo.slug}`}
                  aria-label={demo.title}
                  className="group/dot"
                >
                  <div
                    className={`
                      rounded-full transition-all duration-300 ease-out
                      ${
                        i === currentIndex
                          ? "w-5 h-1.5 bg-terracotta"
                          : "w-1.5 h-1.5 bg-white/20 group-hover/dot:bg-white/40"
                      }
                    `}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* --- Right: Next nav + Fullscreen --- */}
          <div className="flex items-center gap-1 min-w-[180px] justify-end">
            <Tooltip label={nextDemo.title}>
              <Link
                href={`/demo/${nextDemo.slug}`}
                className="flex items-center justify-center w-7 h-7 rounded-md text-white/40 hover:text-white/90 hover:bg-white/[0.06] transition-all"
                aria-label={`Next demo: ${nextDemo.title}`}
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
          className="absolute inset-0 z-20 flex items-center justify-center bg-charcoal transition-opacity duration-500 ease-out pointer-events-none"
          style={{
            opacity: loaded ? 0 : 1,
          }}
        >
          <div className="flex flex-col items-center gap-5">
            {/* Pulsing Praxis logo */}
            <div className="relative">
              <LogoMark className="w-12 h-12 text-terracotta animate-pulse" />
              {/* Glow ring behind logo */}
              <div className="absolute inset-0 -m-2 rounded-full bg-terracotta/10 animate-ping" style={{ animationDuration: "2s" }} />
            </div>

            {/* Demo title */}
            <span className="text-sm font-sans font-medium text-white/40 tracking-wide">
              {currentTitle}
            </span>

            {/* Progress bar */}
            <div className="w-48 h-0.5 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full bg-terracotta transition-all ease-out"
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

        {/* --- Iframe --- */}
        <iframe
          srcDoc={srcDoc}
          sandbox="allow-scripts"
          className="w-full h-full border-0 transition-opacity duration-300 ease-out"
          style={{ opacity: loaded ? 1 : 0 }}
          title={`${currentTitle} Demo`}
          onLoad={handleIframeLoad}
        />
      </div>
    </div>
  );
}
