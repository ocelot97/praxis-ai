import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-sans font-medium text-charcoal mb-2"
          >
            {label}
          </label>
        )}
        <textarea
          className={cn(
            "flex min-h-[120px] w-full resize-vertical rounded-2xl border bg-white px-4 py-3 font-sans text-base text-charcoal transition-all duration-300 placeholder:text-mid placeholder:font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-500 focus-visible:ring-red-500"
              : "border-border focus-visible:border-terracotta",
            className
          )}
          id={textareaId}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm font-sans text-red-500">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-2 text-sm font-sans text-mid">{helperText}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
