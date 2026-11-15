import type { ReactNode } from "react";
import { Button } from "./button";
import { CloseIcon } from "../icons";
import { cn } from "../../lib/utils";

export type DialogSize = "sm" | "medium" | "md" | "default" | "lg" | "xl";
export type DialogPosition = "center" | "bottom-right";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string | ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: DialogSize;
  position?: DialogPosition;
  backdrop?: boolean | "dim" | "subtle" | "transparent";
  className?: string;
  style?: React.CSSProperties;
}

const sizeConfig: Record<DialogSize, { card: string; header: string; body: string; footer: string; title: string }> = {
  sm: {
    card: "max-w-sm",
    header: "px-5 pt-5 pb-3",
    body: "px-5 pb-3",
    footer: "px-5 py-4",
    title: "text-sm font-bold tracking-tight",
  },
  medium: {
    card: "max-w-[390px]",
    header: "px-6 pt-6 pb-4",
    body: "px-6 pb-4",
    footer: "px-6 py-5",
    title: "text-base font-bold tracking-tight",
  },
  md: {
    card: "max-w-[390px]",
    header: "px-6 pt-6 pb-4",
    body: "px-6 pb-4",
    footer: "px-6 py-5",
    title: "text-base font-bold tracking-tight",
  },
  default: {
    card: "max-w-sm",
    header: "px-6 pt-6 pb-4",
    body: "px-6 pb-4",
    footer: "px-6 py-5",
    title: "text-base font-bold tracking-tight",
  },
  lg: {
    card: "max-w-md",
    header: "px-6 pt-6 pb-4",
    body: "px-6 pb-4",
    footer: "px-6 py-5",
    title: "text-lg font-bold tracking-tight",
  },
  xl: {
    card: "max-w-lg",
    header: "px-7 pt-7 pb-5",
    body: "px-7 pb-5",
    footer: "px-7 py-6",
    title: "text-xl font-bold tracking-tight",
  },
};

const positionClasses: Record<DialogPosition, string> = {
  center: "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  "bottom-right": "fixed right-4 bottom-4 sm:right-6 sm:bottom-6",
};

export function Dialog({
  open,
  onOpenChange,
  title,
  children,
  footer,
  size = "default",
  position = "center",
  backdrop = true,
  className,
  style,
}: DialogProps) {
  const cfg = sizeConfig[size] ?? sizeConfig.default;
  const posClass = positionClasses[position] ?? positionClasses.center;

  const backdropBg =
    backdrop === false || backdrop === "transparent"
      ? "bg-transparent pointer-events-none"
      : backdrop === "subtle"
        ? "bg-foreground/15 backdrop-blur-sm"
        : backdrop === "dim"
          ? "bg-black/60 backdrop-blur-sm"
          : "bg-foreground/20 backdrop-blur-sm";

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        backdropBg,
        "transition-opacity duration-200",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      )}
      onClick={() => onOpenChange(false)}
      role="presentation"
    >
      <div
        className={cn(
          posClass,
          cfg.card,
          "w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto",
          "rounded-3xl bg-background text-foreground",
          "shadow-[0_32px_64px_rgba(0,0,0,0.18),0_8px_24px_rgba(0,0,0,0.1)]",
          "transition-all duration-200",
          open ? "scale-100 opacity-100" : "scale-95 opacity-0",
          className,
        )}
        style={style}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        {/* Header — no border-b, clean look */}
        <div className={cn("flex items-center justify-between gap-4", cfg.header)}>
          <span id="dialog-title" className={cfg.title}>{title}</span>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Tutup dialog"
            onClick={() => onOpenChange(false)}
          >
            <CloseIcon size="sm" />
          </Button>
        </div>

        {/* Body */}
        <div className={cfg.body}>{children}</div>

        {/* Footer — separator + justify-end */}
        {footer && (
          <div className={cn(
            "flex justify-end gap-3",
            "border-t border-border/60",
            cfg.footer,
          )}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
