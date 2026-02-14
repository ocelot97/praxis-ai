"use client";

import Link from "next/link";
import { LogoMark } from "@/components/ui/logo";
import { logout } from "./login/actions";

const demos = [
  {
    slug: "customer-agents",
    title: "AI Customer Agents",
    description:
      "Interactive chatbot with simulated AI responses, sentiment analysis, language detection, and quick actions.",
    preview: "/demo/previews/customer-agents.webm",
  },
  {
    slug: "document-intelligence",
    title: "Document Intelligence",
    description:
      "Simulated document processing with field extraction, confidence scores, and scanning animation.",
    preview: "/demo/previews/document-intelligence.webm",
  },
  {
    slug: "workflow-automation",
    title: "Workflow Automation",
    description:
      "Visual workflow builder with animated execution, decision nodes, and real-time processing stats.",
    preview: "/demo/previews/workflow-automation.webm",
  },
  {
    slug: "knowledge-systems",
    title: "Knowledge Systems",
    description:
      "Semantic search with AI-generated answers, source ranking, highlighted excerpts, and query analytics.",
    preview: "/demo/previews/knowledge-systems.webm",
  },
];

export function DemoHub({ userEmail }: { userEmail: string }) {
  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border">
        <div className="section-container flex h-16 items-center justify-between">
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
          <div className="flex items-center gap-4">
            <span className="text-sm font-sans text-mid hidden sm:inline">
              {userEmail}
            </span>
            <form action={logout}>
              <button
                type="submit"
                className="text-sm font-sans font-medium text-terracotta hover:text-terracotta-dark transition-colors"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="section-container py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-caveat)] font-bold text-charcoal mb-3">
            Solution Demos
          </h1>
          <p className="text-lg font-sans text-mid">
            Interactive demos for client presentations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {demos.map((demo) => (
            <Link
              key={demo.slug}
              href={`/demo/${demo.slug}`}
              className="group card-base flex flex-col hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-video bg-charcoal/5 rounded-xl mb-4 overflow-hidden">
                <video
                  src={demo.preview}
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  onMouseOver={(e) =>
                    (e.target as HTMLVideoElement).play()
                  }
                  onMouseOut={(e) => {
                    const v = e.target as HTMLVideoElement;
                    v.pause();
                    v.currentTime = 0;
                  }}
                />
              </div>
              <h2 className="text-xl font-sans font-semibold text-charcoal mb-2">
                {demo.title}
              </h2>
              <p className="text-sm font-sans text-mid leading-relaxed flex-1">
                {demo.description}
              </p>
              <div className="mt-5 flex items-center gap-1.5 text-terracotta font-sans font-semibold text-sm">
                Launch Demo
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
