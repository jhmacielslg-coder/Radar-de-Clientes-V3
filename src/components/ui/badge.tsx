import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "danger" | "purple" | "neutral";
}

export function Badge({
  className,
  variant = "neutral",
  children,
  ...props
}: BadgeProps) {
  const variants = {
    neutral: "bg-surface-3 text-text-2 border-border-2",
    success: "bg-green-bg text-green border-green-border",
    warning: "bg-amber-bg text-amber border-amber-border",
    danger: "bg-red-bg text-red border-red-border",
    purple: "bg-purple/15 text-purple-text border-purple/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

