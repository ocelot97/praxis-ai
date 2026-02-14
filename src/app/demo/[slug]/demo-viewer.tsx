"use client";

import * as React from "react";
import Link from "next/link";
import { LogoMark } from "@/components/ui/logo";

export function DemoViewer({ html, slug }: { html: string; slug: string }) {
  const [loaded, setLoaded] = React.useState(false);

  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const srcDoc = React.useMemo(() => {
    return html.replace("<head>", '<head><base target="_blank">');
  }, [html]);

  return (
    <div className="h-screen flex flex-col bg-charcoal">
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-2.5 bg-charcoal-light border-b border-white/10">
        <Link
          href="/demo"
          className="flex items-center gap-2 text-sm font-sans text-white/70 hover:text-white transition-colors"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          All Demos
        </Link>
        <div className="flex items-center gap-2">
          <LogoMark className="w-5 h-5 text-terracotta" />
          <span className="text-sm font-sans font-medium text-white/50">
            {title}
          </span>
        </div>
        <div className="w-20" />
      </div>

      <div className="flex-1 relative">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal">
            <div className="flex flex-col items-center gap-3">
              <svg
                className="animate-spin h-6 w-6 text-terracotta"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="text-sm font-sans text-white/50">
                Loading demo...
              </span>
            </div>
          </div>
        )}
        <iframe
          srcDoc={srcDoc}
          sandbox="allow-scripts"
          className="w-full h-full border-0"
          title={`${title} Demo`}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
