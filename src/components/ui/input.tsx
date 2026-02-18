import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-sans font-medium text-navy mb-2"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-2xl border bg-white px-4 py-3 font-sans text-base text-navy transition-all duration-300 placeholder:text-silver placeholder:font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-light focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-500 focus-visible:ring-red-500"
              : "border-border focus-visible:border-navy-light",
            className
          )}
          id={inputId}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm font-sans text-red-500">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-2 text-sm font-sans text-silver">{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
