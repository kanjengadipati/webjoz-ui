import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { DISABLED_STYLES, FOCUS_VISIBLE, MOTION } from "../../lib/ui-tokens";
import { cn } from "../../lib/utils";
import { Spinner, type SpinnerSize } from "./spinner";

type ButtonVariant = "default" | "outline" | "ghost" | "secondary" | "destructive" | "liquid-silver" | "dark-chrome" | "neon-edge" | "floating-arrow";
type ButtonSize = "default" | "sm" | "lg" | "icon" | "hero";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ReactNode;
  loading?: boolean;
  loadingText?: ReactNode;
}

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  default: "btn-primary",
  secondary: "border border-border bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border border-border bg-background/50 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground hover:border-accent",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  destructive: "bg-destructive text-white shadow-sm hover:bg-destructive/90",
  "liquid-silver": "btn-liquid-silver",
  "dark-chrome": "btn-dark-chrome",
  "neon-edge": "btn-neon-edge",
  "floating-arrow": "btn-floating-arrow",
};

const BUTTON_SIZES: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "size-10",
  hero: "btn-size-hero",
};

export function buttonClassName({ className, variant = "default", size = "default" }: Pick<ButtonProps, "className" | "variant" | "size"> = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background hover:scale-[1.02] active:scale-[0.98]",
    FOCUS_VISIBLE,
    DISABLED_STYLES,
    MOTION.standard,
    BUTTON_VARIANTS[variant],
    BUTTON_SIZES[size],
    className,
  );
}

export function Button({
  children,
  className,
  variant = "default",
  size = "default",
  loading = false,
  loadingText,
  disabled,
  ...props
}: ButtonProps) {
  const spinnerSize: SpinnerSize = size === "sm" ? "xs" : size === "lg" ? "md" : "sm";
  const spinnerVariant = variant === "default" || variant === "destructive" || variant === "dark-chrome" || variant === "neon-edge" || variant === "floating-arrow" ? "white" : "current";

  // floating-arrow: teks rata kiri, badge absolute di kanan
  if (variant === "floating-arrow") {
    const badgeBase = "absolute top-1/2 -translate-y-1/2 -right-2 flex items-center justify-center rounded-full shrink-0 pointer-events-none";
    const badgeSize = size === "hero" ? "w-14 h-14" : "w-11 h-11";
    const badgeColor = disabled
      ? "bg-muted-foreground/40 text-white"
      : "bg-foreground text-background";
    const badgeRing = disabled
      ? ""
      : "[box-shadow:0_0_0_3px_var(--background),0_2px_8px_rgba(0,0,0,.3)]";

    return (
      <button
        className={buttonClassName({ className, variant, size })}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        <span style={{ flex: 1, textAlign: "left" }}>
          {loading ? (loadingText ?? children) : children}
        </span>
        {loading ? (
          <Spinner
            size={spinnerSize}
            variant="current"
            className={cn(badgeBase, badgeSize)}
          />
        ) : (
          <span
            className={cn(badgeBase, badgeSize, badgeColor, badgeRing)}
            aria-hidden="true"
          >
            <ArrowUpRight
              className={size === "hero" ? "w-6 h-6" : "w-5 h-5"}
              strokeWidth={2.5}
            />
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      className={buttonClassName({ className, variant, size })}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <Spinner
          size={spinnerSize}
          variant={spinnerVariant}
          className="shrink-0"
        />
      )}
      {loading && loadingText !== undefined ? loadingText : children}
    </button>
  );
}
