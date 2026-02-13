import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  flip?: boolean;
}

/**
 * Divider - An organic, wave-shaped SVG divider for smooth
 * visual transitions between page sections.
 * Uses a gentle S-curve path rather than a harsh straight line.
 */
export function Divider({ className, flip = false }: DividerProps) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden leading-[0] pointer-events-none",
        flip && "rotate-180",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-[40px] md:h-[60px] lg:h-[80px]"
      >
        {/* Primary organic wave */}
        <path
          d="M0 40 C240 70, 480 10, 720 40 C960 70, 1200 10, 1440 40 L1440 80 L0 80 Z"
          fill="currentColor"
          className="text-cream"
        />
        {/* Secondary softer wave for layered depth */}
        <path
          d="M0 55 C360 30, 720 75, 1080 45 C1260 30, 1380 50, 1440 50 L1440 80 L0 80 Z"
          fill="currentColor"
          className="text-cream opacity-50"
        />
      </svg>
    </div>
  );
}
