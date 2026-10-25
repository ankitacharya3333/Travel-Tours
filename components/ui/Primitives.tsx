import * as React from "react";
import { cn } from "@/lib/utils";

// Minimal variant helper if cva is not installed, or self-contained:
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-sm select-none cursor-pointer";

    const variantStyles = {
      primary: "bg-[#1e3328] text-[#fbf9f5] hover:bg-[#15241c] active:bg-[#0e1913]",
      secondary: "bg-[#efece5] text-[#1e3328] hover:bg-[#e4dfd5] active:bg-[#dbd5c9]",
      outline: "border border-[#1e3328]/30 text-[#1e3328] hover:bg-[#1e3328]/5",
      ghost: "text-[#1e3328] hover:bg-[#1e3328]/10",
      accent: "bg-[#b85a3a] text-white hover:bg-[#9e4a2d] active:bg-[#853c23]",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2.5 gap-2",
      lg: "text-base px-6 py-3.5 gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export function Badge({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline" | "subtle";
  className?: string;
}) {
  const styles = {
    default: "bg-[#1e3328]/10 text-[#1e3328] border border-[#1e3328]/15",
    accent: "bg-[#b85a3a]/10 text-[#b85a3a] border border-[#b85a3a]/20",
    outline: "border border-[#d1cbc2] text-[#4d5c53]",
    subtle: "bg-[#efece5] text-[#2d3e33]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-sm tracking-wide",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function Container({
  children,
  className = "",
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const maxW = {
    narrow: "max-w-4xl",
    default: "max-w-7xl",
    wide: "max-w-[1400px]",
  };

  return (
    <div className={cn("mx-auto px-4 sm:px-6 lg:px-8 w-full", maxW[size], className)}>
      {children}
    </div>
  );
}
