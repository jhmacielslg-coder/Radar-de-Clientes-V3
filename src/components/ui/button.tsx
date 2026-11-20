import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "white" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 select-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple";

    const variants = {
      primary:
        "bg-surface-3 hover:bg-surface-4 text-text-1 border border-border-2 hover:border-border-strong shadow-sm",
      white:
        "bg-white text-bg hover:bg-neutral-200 font-semibold shadow-md hover:shadow-lg",
      gradient:
        "bg-gradient-to-r from-orange to-purple text-white font-semibold shadow-lg shadow-purple/20 hover:brightness-110",
      outline:
        "bg-transparent hover:bg-surface text-text-2 hover:text-text-1 border border-border hover:border-border-2",
      ghost:
        "bg-transparent hover:bg-surface-2 text-text-3 hover:text-text-1",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

