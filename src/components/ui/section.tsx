import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "cream" | "white";
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const bgClass =
      variant === "cream"
        ? "bg-cream"
        : variant === "white"
        ? "bg-white"
        : "bg-cream";

    return (
      <section
        ref={ref}
        className={cn("section-spacing", bgClass, className)}
        {...props}
      >
        <div className="section-container">{children}</div>
      </section>
    );
  }
);
Section.displayName = "Section";

export { Section };
