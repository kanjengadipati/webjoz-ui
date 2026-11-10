"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown, LayoutGrid } from "lucide-react";
import { cn } from "../../lib/utils";

export interface BottomNavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}

export interface BottomNavProps {
  items: BottomNavItem[];
  activeId?: string;
  onMenuClick?: () => void;
  menuOpen?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function BottomNav({
  items,
  activeId,
  onMenuClick,
  menuOpen = false,
  className,
  ariaLabel,
}: BottomNavProps) {
  return (
    <nav
      className={cn(
        "fixed bottom-0 inset-x-0 z-60 lg:hidden bg-card/95 dark:bg-background/90 backdrop-blur-2xl border-t border-border/60 py-2 pb-3 shadow-2xl shadow-black/20",
        className
      )}
      aria-label={ariaLabel}
    >
      <div className="flex items-center justify-around max-w-lg mx-auto px-2">
        {items.map((item) => {
          const active = activeId === item.id;
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={item.href}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex items-center justify-center h-10 w-12 rounded-2xl transition-all duration-200",
                active
                  ? "bg-primary/15 text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              )}
            >
              <Icon
                className={cn(
                  "size-5 transition-transform duration-200",
                  active ? "stroke-[2.25] scale-110" : "stroke-[1.75]"
                )}
                aria-hidden={true}
              />
            </Link>
          );
        })}

        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            aria-label={menuOpen ? "Tutup Menu" : "Menu & Fitur"}
            aria-expanded={menuOpen}
            className="relative flex flex-col items-center -mt-5 group cursor-pointer active:scale-95 transition-transform"
          >
            <div
              className={cn(
                "size-12 rounded-full flex items-center justify-center ring-4 ring-card dark:ring-background transition-all duration-200 group-hover:scale-105",
                menuOpen
                  ? "bg-primary text-primary-foreground shadow-[0_0_22px_rgba(0,0,0,0.40)] scale-105"
                  : "bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(0,0,0,0.30)]"
              )}
            >
              {menuOpen ? (
                <ChevronDown className="size-6 stroke-[2] transition-transform duration-200" />
              ) : (
                <LayoutGrid className="size-6 stroke-[1.75]" />
              )}
            </div>
          </button>
        )}
      </div>
    </nav>
  );
}
