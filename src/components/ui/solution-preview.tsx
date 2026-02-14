"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface SolutionPreviewProps {
  slug: string;
  className?: string;
}

export function SolutionPreview({ slug, className = "" }: SolutionPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Lazy-load: only set video src when card enters viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Play/pause on hover
  const play = useCallback(() => {
    if (reducedMotion) return;
    setHovering(true);
    videoRef.current?.play().catch(() => {});
  }, [reducedMotion]);

  const pause = useCallback(() => {
    setHovering(false);
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  }, []);

  const src = `/demo/previews/${slug}.webm`;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl bg-charcoal/5 cursor-pointer group ${className}`}
      onMouseEnter={play}
      onMouseLeave={pause}
    >
      {/* Shimmer placeholder — visible until video is loaded + hovering */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ opacity: loaded && hovering ? 0 : 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal/[0.03] to-charcoal/[0.08]" />
        <div className="absolute inset-0 bg-[length:200%_100%] animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        {/* Play hint */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-terracotta/90 flex items-center justify-center shadow-soft transition-transform duration-200 group-hover:scale-110">
            <svg className="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Video — only rendered after viewport entry */}
      {visible && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          onLoadedData={() => setLoaded(true)}
          className="w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: loaded && hovering ? 1 : 0 }}
        >
          <source src={src} type="video/webm" />
        </video>
      )}
    </div>
  );
}
