"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useCallback, useMemo, useState } from "react";
import { LogoMark } from "@/components/ui/logo";
import { logout } from "./login/actions";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Demo {
  slug: string;
  title: string;
  description: string;
  tag: string;
  icon?: string;
  preview?: string;
  group: "core" | "email";
}

const demos: Demo[] = [
  {
    slug: "customer-agents",
    title: "AI Customer Agents",
    tag: "NLP",
    description:
      "Interactive chatbot with simulated AI responses, sentiment analysis, language detection, and quick actions.",
    preview: "/demo/previews/customer-agents.webm",
    group: "core",
  },
  {
    slug: "document-intelligence",
    title: "Document Intelligence",
    tag: "Vision",
    description:
      "Simulated document processing with field extraction, confidence scores, and scanning animation.",
    preview: "/demo/previews/document-intelligence.webm",
    group: "core",
  },
  {
    slug: "workflow-automation",
    title: "Workflow Automation",
    tag: "Automation",
    description:
      "Visual workflow builder with animated execution, decision nodes, and real-time processing stats.",
    preview: "/demo/previews/workflow-automation.webm",
    group: "core",
  },
  {
    slug: "knowledge-systems",
    title: "Knowledge Systems",
    tag: "Search",
    description:
      "Semantic search with AI-generated answers, source ranking, highlighted excerpts, and query analytics.",
    preview: "/demo/previews/knowledge-systems.webm",
    group: "core",
  },
  {
    slug: "email-strategist",
    icon: "\ud83d\udcca",
    title: "Email Strategy AI",
    tag: "Strategy",
    description:
      "AI-powered email campaign strategist. Connects to Klaviyo & Shopify data, analyzes segments, and generates campaign strategies with operational briefings.",
    group: "email",
  },
  {
    slug: "email-designer",
    icon: "\ud83c\udfa8",
    title: "Email Design AI",
    tag: "Design",
    description:
      "AI Ops email builder with drag-and-drop editor. Transforms campaign briefs into branded, editable emails ready for Klaviyo export.",
    group: "email",
  },
];

const coreDemos = demos.filter((d) => d.group === "core");
const emailDemos = demos.filter((d) => d.group === "email");

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
      <div className="flex-1 h-px bg-charcoal/10" />
      <span className="text-[11px] font-sans font-semibold tracking-[0.15em] uppercase text-mid/70 select-none">
        {label}
      </span>
      <div className="flex-1 h-px bg-charcoal/10" />
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
  cardRef: (el: HTMLAnchorElement | null) => void;
  onFocus: () => void;
}

function DemoCard({
  demo,
  globalIndex,
  total,
  focused,
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
          ? "ring-2 ring-terracotta/60 ring-offset-2 ring-offset-cream shadow-soft-lg -translate-y-0.5"
          : "",
      ].join(" ")}
      style={{
        opacity: 0,
        animation: `demoFadeUp 0.5s ease-out ${globalIndex * 0.08}s forwards`,
      }}
    >
      {/* Category pill */}
      <span className="absolute top-4 right-4 md:top-5 md:right-5 z-10 text-[10px] font-sans font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-charcoal/[0.04] text-mid/80 border border-charcoal/[0.06] select-none">
        {demo.tag}
      </span>

      {/* Preview area */}
      <div className="aspect-video bg-charcoal/[0.03] rounded-xl mb-4 overflow-hidden relative">
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
                "linear-gradient(135deg, rgba(193,108,75,0.06) 0%, rgba(193,108,75,0.14) 50%, rgba(193,108,75,0.06) 100%)",
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
            <span
              className="text-5xl select-none relative z-10"
              style={{ animation: "demoPulseIcon 2.8s ease-in-out infinite" }}
            >
              {demo.icon}
            </span>
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl font-sans font-semibold text-charcoal mb-2 pr-16">
        {demo.title}
      </h3>

      {/* Description */}
      <p className="text-sm font-sans text-mid leading-relaxed flex-1">
        {demo.description}
      </p>

      {/* Card footer */}
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-terracotta font-sans font-semibold text-sm">
          Launch Demo
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
          <span className="text-[11px] font-sans text-mid/50 tabular-nums select-none">
            {globalIndex + 1} of {total}
          </span>
          <span
            className={[
              "text-[10px] font-sans text-mid/40 hidden sm:inline-flex items-center gap-1 select-none",
              "transition-opacity duration-200",
              focused
                ? "opacity-100 text-mid/60"
                : "opacity-0 group-hover:opacity-70",
            ].join(" ")}
          >
            <kbd className="inline-flex items-center justify-center w-4 h-4 rounded border border-charcoal/10 bg-charcoal/[0.03] text-[9px] font-mono leading-none">
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

export function DemoHub({ userEmail }: { userEmail: string }) {
  const router = useRouter();
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const focusedRef = useRef(-1);

  const dateStr = useMemo(() => formattedDate(), []);

  /* ------ Focus helpers ------ */

  const moveFocus = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= demos.length) return;
      focusedRef.current = idx;
      setFocusedIndex(idx);
      cardRefs.current[idx]?.focus({ preventScroll: false });
      cardRefs.current[idx]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    },
    [],
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
          if (next < demos.length) moveFocus(next);
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
          if (down < demos.length) moveFocus(down);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const up = cur - cols;
          if (up >= 0) moveFocus(up);
          break;
        }
        case "Enter": {
          if (cur >= 0 && cur < demos.length) {
            e.preventDefault();
            router.push(`/demo/${demos[cur].slug}`);
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
  }, [moveFocus, router]);

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
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Keyframe injection */}
      <style dangerouslySetInnerHTML={{ __html: keyframesCSS }} />

      {/* ---- Header ---- */}
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border">
        <div className="section-container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="transition-all duration-300 group-hover:opacity-80"
              style={{ animation: "spin 20s linear infinite" }}
            >
              <LogoMark className="w-8 h-8 text-terracotta" />
            </div>
            <span className="text-lg font-sans font-semibold text-charcoal">
              <span className="font-[family-name:var(--font-caveat)] text-xl">
                Praxis
              </span>{" "}
              AI
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="text-xs font-sans text-mid/50 hidden md:inline select-none">
              {dateStr}
            </span>

            <div className="h-4 w-px bg-charcoal/10 hidden md:block" />

            <span className="text-sm font-sans text-mid hidden sm:inline">
              {userEmail}
            </span>

            <div className="flex items-center gap-2.5">
              <form action={logout}>
                <button
                  type="submit"
                  className="text-sm font-sans font-medium text-terracotta hover:text-terracotta-dark transition-colors"
                >
                  Sign Out
                </button>
              </form>
              <span className="text-[10px] font-sans text-mid/40 hidden sm:inline-flex items-center gap-1 select-none">
                <kbd className="inline-flex items-center justify-center px-1.5 h-4 rounded border border-charcoal/10 bg-charcoal/[0.03] text-[9px] font-mono leading-none">
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
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-caveat)] font-bold text-charcoal mb-3">
            Solution Demos
          </h1>
          <p className="text-lg font-sans text-mid">
            Interactive demos for client presentations
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-14">
          {/* ---- Core Platform section ---- */}
          <section>
            <SectionLabel label="Core Platform" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {coreDemos.map((demo, i) => {
                const gi = i;
                return (
                  <DemoCard
                    key={demo.slug}
                    demo={demo}
                    globalIndex={gi}
                    total={demos.length}
                    focused={focusedIndex === gi}
                    onFocus={makeOnFocus(gi)}
                    cardRef={(el) => {
                      cardRefs.current[gi] = el;
                    }}
                  />
                );
              })}
            </div>
          </section>

          {/* ---- Email AI Suite section ---- */}
          <section>
            <SectionLabel label="Email AI Suite" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {emailDemos.map((demo, i) => {
                const gi = coreDemos.length + i;
                return (
                  <DemoCard
                    key={demo.slug}
                    demo={demo}
                    globalIndex={gi}
                    total={demos.length}
                    focused={focusedIndex === gi}
                    onFocus={makeOnFocus(gi)}
                    cardRef={(el) => {
                      cardRefs.current[gi] = el;
                    }}
                  />
                );
              })}
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
              className="text-[11px] font-sans text-mid/45 flex items-center gap-1.5 select-none"
            >
              <kbd className="inline-flex items-center justify-center px-1.5 h-4 rounded border border-charcoal/[0.08] bg-charcoal/[0.03] text-[10px] font-mono leading-none text-mid/60">
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
