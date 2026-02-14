"use client";

import * as React from "react";

interface VideoBackgroundProps {
  webm: string;
  mp4: string;
  poster: string;
  overlay?: string; // Tailwind classes for overlay div (e.g. "bg-cream/30")
  className?: string;
}

export function VideoBackground({
  webm,
  mp4,
  poster,
  overlay,
  className = "",
}: VideoBackgroundProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const showVideo = !prefersReducedMotion && !isMobile;

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {showVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={webm} type="video/webm" />
          <source src={mp4} type="video/mp4" />
        </video>
      ) : (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {overlay && (
        <div className={`absolute inset-0 ${overlay}`} />
      )}
    </div>
  );
}
