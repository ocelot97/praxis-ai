"use client";

import { useRef, useEffect } from "react";

interface SolutionPreviewProps {
  slug: string;
  className?: string;
}

export function SolutionPreview({ slug, className = "" }: SolutionPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <div className={`relative overflow-hidden rounded-xl bg-charcoal/5 ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={`/demo/previews/${slug}.webm`}
        className="w-full h-full object-cover"
      >
        <source src={`/demo/previews/${slug}.webm`} type="video/webm" />
      </video>
    </div>
  );
}
