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
    card: "sm:max-w-sm",
    header: "p-4 border-b border-border/60",
    body: "p-4",
    footer: "p-4 border-t border-border/60",
    title: "text-sm font-bold tracking-tight",
  },
  medium: {
    card: "sm:max-w-[390px]",
    header: "px-5 py-3.5 border-b border-border/60",
    body: "px-5 py-3.5",
    footer: "px-5 py-3 border-t border-border/60",
    title: "text-base font-bold tracking-tight",
  },
  md: {
    card: "sm:max-w-[390px]",
    header: "px-5 py-3.5 border-b border-border/60",
    body: "px-5 py-3.5",
    footer: "px-5 py-3 border-t border-border/60",
    title: "text-base font-bold tracking-tight",
  },
  default: {
    card: "max-w-md",
    header: "p-6 border-b border-border/60",
    body: "p-6",
    footer: "p-6 border-t border-border/60",
    title: "text-lg font-bold tracking-tight",
  },
  lg: {
    card: "max-w-md",
    header: "p-6 border-b border-border/60",
    body: "p-6",
    footer: "p-6 border-t border-border/60",
    title: "text-lg font-bold tracking-tight",
  },
  xl: {
    card: "max-w-lg",
    header: "p-6 border-b border-border/60",
    body: "p-6",
    footer: "p-6 border-t border-border/60",
    title: "text-xl font-bold tracking-tight",
  },
};

const positionClasses: Record<DialogPosition, string> = {
  center: "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  "bottom-right": "fixed left-auto top-auto right-4 bottom-4 translate-x-0 translate-y-0 sm:right-6 sm:bottom-6",
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
  const currentSize = sizeConfig[size] || sizeConfig.default;
  const currentPosition = positionClasses[position] || positionClasses.center;

  const backdropBg =
    backdrop === false || backdrop === "transparent"
      ? "bg-transparent pointer-events-none"
      : backdrop === "subtle"
        ? "bg-black/25"
        : "bg-black/50";

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 p-4 transition-opacity",
        backdropBg,
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      )}
      onClick={() => onOpenChange(false)}
      role="presentation"
    >
      <div
        className={cn(
          currentPosition,
          currentSize.card,
          "max-h-[90vh] w-[calc(100%-2rem)] overflow-y-auto rounded-2xl border border-border bg-background text-foreground shadow-2xl transition-all",
          className,
        )}
        style={style}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <div className={cn("flex items-center justify-between gap-4", currentSize.header)}>
          <h2 id="dialog-title" className={currentSize.title}>{title}</h2>
          <Button variant="ghost" size="icon" aria-label="Close dialog" onClick={() => onOpenChange(false)}>
            <CloseIcon size="sm" />
          </Button>
        </div>
        <div className={currentSize.body}>{children}</div>
        {footer ? <div className={cn("flex gap-3", currentSize.footer)}>{footer}</div> : null}
      </div>
    </div>
  );
}
