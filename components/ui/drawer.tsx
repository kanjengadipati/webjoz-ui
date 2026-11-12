"use client";

import React, { useEffect, useId } from "react";
import { Button } from "./button";
import { CloseIcon } from "../icons";
import { cn } from "../../lib/utils";
import { MOTION } from "../../lib/ui-tokens";

export type DrawerSide = "bottom" | "left" | "right";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  /**
   * Panel content. A header with the title and a ✕ button is rendered
   * when a title is provided.
   */
  title?: React.ReactNode;
  children: React.ReactNode;
  /** Optional action bar pinned at the panel bottom (above the safe area). */
  footer?: React.ReactNode;
  /** Edge the panel slides in from. Default "bottom". */
  side?: DrawerSide;
  /** Max height of the bottom sheet. Default "85dvh". */
  maxHeight?: string;
  /** Max width of the left/right panel. Default "20rem". */
  maxWidth?: string;
  /** Show the drag handle bar (bottom side only). Default true. */
  showHandle?: boolean;
  /** Accessible dialog label, defaults to the string title. */
  ariaLabel?: string;
  /**
   * Extra classes for the panel element. Use "!absolute" to contain the
   * drawer inside a relative preview container (e.g. a phone frame).
   */
  className?: string;
  /**
   * Extra classes for the backdrop element. Use "!absolute" to contain the
   * backdrop inside a relative preview container.
   */
  backdropClassName?: string;
  /**
   * Lock background page scroll while open. Disable when rendering inside
   * a preview container. Default true.
   */
  lockScroll?: boolean;
  /**
   * Hide the drawer on desktop-size screens (lg and up), matching the
   * dashboard mobile drawer pattern. Default true — set false to keep it
   * visible at every viewport (e.g. inside a device preview frame).
   */
  mobileOnly?: boolean;
  /**
   * Remove default horizontal/bottom padding from the scrollable body.
   * Use when children need full-width layout (e.g. horizontal scroll sections).
   * Default false.
   */
  noPadding?: boolean;
}

const SIDE_PANEL_CLASSES: Record<DrawerSide, string> = {
  bottom:
    "fixed inset-x-0 bottom-0 z-50 flex w-full flex-col rounded-t-2xl border-t border-border bg-background text-foreground shadow-2xl",
  left: "fixed left-0 top-0 bottom-0 z-50 flex h-full w-full flex-col border-r border-border bg-background text-foreground shadow-2xl",
  right:
    "fixed right-0 top-0 bottom-0 z-50 flex h-full w-full flex-col border-l border-border bg-background text-foreground shadow-2xl",
};

const SIDE_CLOSED_CLASSES: Record<DrawerSide, string> = {
  bottom: "translate-y-full",
  left: "-translate-x-full",
  right: "translate-x-full",
};

/**
 * Mobile drawer / bottom sheet with backdrop tap-to-close, Escape key
 * support, body scroll-lock while open, and iOS safe-area padding for the
 * bottom sheet variant. Hidden on lg+ viewports by default (opt out via
 * mobileOnly={false}). Can be contained inside a relative preview
 * container via the "!absolute" class overrides.
 */
export function Drawer({
  open,
  onClose,
  title,
  children,
  footer,
  side = "bottom",
  maxHeight = "85dvh",
  maxWidth = "20rem",
  showHandle = true,
  ariaLabel,
  className,
  backdropClassName,
  lockScroll = true,
  mobileOnly = true,
  noPadding = false,
}: DrawerProps) {
  const titleId = useId();
  const hasHandle = side === "bottom" && showHandle;

  // Close on Escape + lock background scroll while open
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    if (lockScroll) document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (lockScroll) document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose, lockScroll]);

  return (
    <>
      {/* Backdrop — tap to close, no dim (matches WizardSheet pattern) */}
      <div
        className={cn(
          "fixed inset-0 z-40",
          MOTION.standard,
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
          mobileOnly && "lg:hidden",
          backdropClassName,
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel ?? (typeof title === "string" ? title : undefined)}
        aria-labelledby={title ? titleId : undefined}
        className={cn(
          SIDE_PANEL_CLASSES[side],
          MOTION.transform,
          open ? "translate-y-0 translate-x-0" : SIDE_CLOSED_CLASSES[side],
          side === "bottom" && "pb-[env(safe-area-inset-bottom)]",
          mobileOnly && "lg:hidden",
          className,
        )}
        style={side === "bottom" ? { maxHeight } : { maxWidth }}
      >
        {/* Drag handle — bottom sheet only, tap to close */}
        {hasHandle && (
          <button
            type="button"
            onClick={onClose}
            className="flex flex-col items-center justify-center pt-3 pb-2 w-full shrink-0 cursor-pointer group"
            aria-label="Close drawer"
          >
            <div
              className="h-1 w-10 rounded-full bg-muted-foreground/30 group-active:bg-muted-foreground/60 transition-colors"
              aria-hidden="true"
            />
          </button>
        )}

        {/* Header */}
        {title ? (
          <div className="flex items-center gap-3 px-4 py-2 shrink-0">
            <h2 id={titleId} className="text-sm font-bold flex-1 tracking-tight">
              {title}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close drawer"
              onClick={onClose}
            >
              <CloseIcon size="sm" />
            </Button>
          </div>
        ) : null}

        {/* Scrollable body */}
        <div
          className={cn(
            "flex flex-col flex-1 min-h-0 overflow-hidden",
            !noPadding && "px-5 pb-5",
            !title && !hasHandle && !noPadding && "pt-5",
          )}
        >
          {children}
        </div>

        {/* Footer */}
        {footer ? (
          <div className="flex gap-3 border-t border-border/60 p-5">{footer}</div>
        ) : null}
      </div>
    </>
  );
}
