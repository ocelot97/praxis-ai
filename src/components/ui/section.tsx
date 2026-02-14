import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "cream" | "white";
  background?: React.ReactNode;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = "default", background, children, ...props }, ref) => {
    const bgClass =
      variant === "cream"
        ? "bg-cream"
        : variant === "white"
        ? "bg-white"
        : "bg-cream";

    return (
      <section
        ref={ref}
        className={cn("section-spacing relative overflow-hidden", bgClass, className)}
        {...props}
      >
        {background}
        <div className="section-container relative z-10">{children}</div>
      </section>
    );
  }
);
Section.displayName = "Section";

export { Section };
