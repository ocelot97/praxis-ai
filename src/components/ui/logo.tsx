import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

/**
 * LogoMark - Stylized atom icon with electron orbits
 * A hand-crafted atom symbol: central nucleus, three elliptical orbit paths
 * at different angles, and three electron dots positioned on the orbits.
 * Designed to feel elegant and artistic for an AI brand.
 * Uses currentColor for flexible styling with Tailwind.
 */
export function LogoMark({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-10 h-10", className)}
      aria-label="Praxis AI logo mark"
    >
      {/* Orbit 1 - tilted left (-30deg) */}
      <ellipse
        cx="20"
        cy="20"
        rx="16"
        ry="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.6"
        transform="rotate(-30 20 20)"
      />

      {/* Orbit 2 - tilted right (30deg) */}
      <ellipse
        cx="20"
        cy="20"
        rx="15"
        ry="7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.85"
        opacity="0.7"
        transform="rotate(30 20 20)"
      />

      {/* Orbit 3 - near vertical (82deg) */}
      <ellipse
        cx="20"
        cy="20"
        rx="16.5"
        ry="6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.8"
        transform="rotate(82 20 20)"
      />

      {/* Nucleus - solid circle at center */}
      <circle
        cx="20"
        cy="20"
        r="3.2"
        fill="currentColor"
        opacity="0.9"
      />

      {/* Electron 1 - on orbit 1 (top-right area) */}
      {/* Position: point on ellipse(rx=16, ry=7) at angle ~60deg, then rotated -30deg around center */}
      <circle
        cx="30.4"
        cy="10.8"
        r="1.8"
        fill="currentColor"
        opacity="1"
      />

      {/* Electron 2 - on orbit 2 (bottom-left area) */}
      {/* Position: point on ellipse(rx=15, ry=7.5) at angle ~210deg, then rotated 30deg around center */}
      <circle
        cx="7.5"
        cy="23.8"
        r="1.6"
        fill="currentColor"
        opacity="1"
      />

      {/* Electron 3 - on orbit 3 (bottom area) */}
      {/* Position: point on ellipse(rx=16.5, ry=6.5) at angle ~160deg, then rotated 82deg around center */}
      <circle
        cx="22.5"
        cy="36.2"
        r="1.5"
        fill="currentColor"
        opacity="1"
      />
    </svg>
  );
}

/**
 * Logo - Full logo with atom mark and "Praxis AI" text
 * "Praxis" uses the Caveat handwriting font for an artisanal feel.
 * "AI" stays in Inter sans-serif for contrast.
 */
export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="text-terracotta" />
      <span className="text-xl text-charcoal leading-none">
        <span className="font-[family-name:var(--font-caveat)] text-[1.65rem] font-bold">
          Praxis
        </span>{" "}
        <span className="font-sans text-sm font-medium tracking-[0.2em] uppercase opacity-70">
          AI
        </span>
      </span>
    </div>
  );
}
