"use client";

import {
  useState,
  useRef,
  useEffect,
  useId,
  useMemo,
  type CSSProperties,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { cn } from "../../lib/utils";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

export interface CustomSelectOption<T extends string = string> {
  value: T;
  label: string;
  sublabel?: string;
  icon?: ReactNode;
  badge?: string;
  disabled?: boolean;
  /** Visual picker extras — only used when variant="visual" */
  group?: string;
  description?: string;
  preview?: ReactNode;
}

export interface CustomSelectProps<T extends string = string> {
  value: T;
  onChange: (value: T) => void;
  options: CustomSelectOption<T>[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  size?: "sm" | "default" | "lg";
  error?: boolean | string;
  id?: string;
  /**
   * "default" — dropdown list biasa (default)
   * "visual"  — expanded grid card dengan thumbnail preview, group filter, dan deskripsi
   */
  variant?: "default" | "visual";
  /** Visual mode: label chip "All". Default: "Semua" */
  allLabel?: string;
  /** Visual mode: hint teks di footer. */
  hintText?: string;
  /** Visual mode: label tombol done. Default: "Selesai" */
  doneLabel?: string;
}

// ─────────────────────────────────────────────────────────────
// Visual mode — default preview fallback
// ─────────────────────────────────────────────────────────────

function DefaultPreview() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 p-3 bg-[#111318]">
      <div className="w-3/4 h-1.5 rounded-full bg-white/20" />
      <div className="w-full h-1 rounded-full bg-white/10" />
      <div className="w-1/2 h-1 rounded-full bg-white/10" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────

export function CustomSelect<T extends string = string>({
  value,
  onChange,
  options,
  placeholder = "Pilih opsi...",
  disabled = false,
  className,
  triggerClassName,
  menuClassName,
  size = "default",
  error,
  id,
  variant = "default",
  allLabel = "Semua",
  hintText = "Klik varian untuk pratinjau langsung di kanvas.",
  doneLabel = "Selesai",
}: CustomSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({});
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const selectedOption = options.find(o => o.value === value);
  const isVisual = variant === "visual";

  // ── Visual mode: group list ──────────────────────────────
  const groups = useMemo(() => {
    if (!isVisual) return [];
    const seen = new Set<string>();
    const result: string[] = [];
    for (const o of options) {
      if (o.group && !seen.has(o.group)) {
        seen.add(o.group);
        result.push(o.group);
      }
    }
    return result;
  }, [options, isVisual]);

  const hasGroups = groups.length > 1;
  const enabledOptions = options.filter(o => !o.disabled);

  const filteredOptions = useMemo(() => {
    if (!isVisual || selectedGroup === "all" || !hasGroups) return enabledOptions;
    return enabledOptions.filter(o => o.group === selectedGroup);
  }, [enabledOptions, selectedGroup, hasGroups, isVisual]);

  // ── Default mode: portal position ───────────────────────
  useEffect(() => {
    if (!open || !containerRef.current || isVisual) return;
    const updatePosition = () => {
      const rect = containerRef.current!.getBoundingClientRect();
      setMenuStyle({
        position: "fixed" as const,
        top: rect.bottom + 6,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      });
    };
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, isVisual]);

  // ── Close on outside click ───────────────────────────────
  useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      const menuEl = menuRef.current;
      if (
        containerRef.current && !containerRef.current.contains(target) &&
        (!menuEl || !menuEl.contains(target))
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [open]);

  // ── Default mode: keyboard + sync highlighted ────────────
  useEffect(() => {
    if (open && !isVisual) {
      const idx = options.findIndex(o => o.value === value);
      setHighlightedIndex(idx >= 0 ? idx : 0);
    }
  }, [open, value, options, isVisual]);

  useEffect(() => {
    if (!open || highlightedIndex < 0 || !menuRef.current || isVisual) return;
    const item = menuRef.current.children[highlightedIndex] as HTMLElement | undefined;
    if (item) item.scrollIntoView({ block: "nearest" });
  }, [open, highlightedIndex, isVisual]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled || isVisual) return;
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex(prev => {
          let next = prev + 1;
          while (next < options.length && options[next]?.disabled) next++;
          return next < options.length ? next : prev;
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex(prev => {
          let next = prev - 1;
          while (next >= 0 && options[next]?.disabled) next--;
          return next >= 0 ? next : prev;
        });
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (highlightedIndex >= 0 && options[highlightedIndex] && !options[highlightedIndex].disabled) {
          onChange(options[highlightedIndex].value as T);
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  const sizeClasses = {
    sm: "min-h-[36px] px-3 py-1.5 text-xs",
    default: "min-h-[42px] px-3.5 py-2 text-sm",
    lg: "min-h-[48px] px-4 py-2.5 text-base",
  };

  // ═══════════════════════════════════════════════════════════
  // VISUAL VARIANT
  // ═══════════════════════════════════════════════════════════

  if (isVisual) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "rounded-2xl border border-white/[0.12] overflow-hidden bg-[#1c1c1e]",
          className
        )}
      >
        {/* Trigger */}
        <button
          id={id}
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setOpen(prev => !prev)}
          className={cn(
            "w-full flex items-center justify-between gap-3 px-4 py-3 text-left cursor-pointer focus:outline-none",
            disabled && "opacity-50 cursor-not-allowed pointer-events-none"
          )}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-white shrink-0" />
            <span className="text-[14px] font-bold text-white truncate leading-none">
              {selectedOption?.label ?? placeholder}
            </span>
            {selectedOption?.group && (
              <>
                <span className="text-white/25 text-sm shrink-0">|</span>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-white/25 text-white/70 shrink-0 whitespace-nowrap">
                  {selectedOption.group}
                </span>
              </>
            )}
          </div>
          {open
            ? <ChevronUp className="w-4 h-4 text-white/60 shrink-0" />
            : <ChevronDown className="w-4 h-4 text-white/60 shrink-0" />
          }
        </button>

        {/* Expanded panel */}
        {open && (
          <>
            {/* Group filter chips */}
            {hasGroups && (
              <div className="flex items-center gap-2 px-3 py-2 overflow-x-auto [scrollbar-width:none] border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setSelectedGroup("all")}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0",
                    selectedGroup === "all"
                      ? "bg-white text-black"
                      : "bg-transparent text-white/55 border border-white/[0.18] hover:text-white/80 hover:border-white/30"
                  )}
                >
                  {allLabel} ({enabledOptions.length})
                </button>
                {groups.map((grp) => {
                  const count = enabledOptions.filter(o => o.group === grp).length;
                  return (
                    <button
                      key={grp}
                      type="button"
                      onClick={() => setSelectedGroup(grp)}
                      className={cn(
                        "px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0",
                        selectedGroup === grp
                          ? "bg-white text-black"
                          : "bg-transparent text-white/55 border border-white/[0.18] hover:text-white/80 hover:border-white/30"
                      )}
                    >
                      {grp} ({count})
                    </button>
                  );
                })}
              </div>
            )}

            {/* Cards grid */}
            <div className="grid grid-cols-2 gap-2.5 p-3 max-h-[420px] overflow-y-auto [scrollbar-width:thin]">
              {filteredOptions.map((opt) => {
                const isActive = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => { onChange(opt.value as T); }}
                    className={cn(
                      "group/card relative flex flex-col text-left rounded-xl overflow-hidden transition-all duration-150 cursor-pointer focus:outline-none bg-[#2a2a2e]",
                      isActive
                        ? "ring-2 ring-white ring-offset-0"
                        : "ring-1 ring-white/10 hover:ring-white/25"
                    )}
                  >
                    {isActive && (
                      <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-lg">
                        <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                      </div>
                    )}
                    <div className="w-full aspect-[3/2] overflow-hidden">
                      {opt.preview ?? <DefaultPreview />}
                    </div>
                    <div className="p-2.5 space-y-0.5">
                      <p className="text-[13px] font-bold text-white leading-tight">{opt.label}</p>
                      {opt.group && (
                        <p className="text-[9px] font-bold uppercase tracking-widest text-white/35">{opt.group}</p>
                      )}
                      {opt.description && (
                        <p className="text-[11px] text-white/50 leading-snug line-clamp-2 pt-0.5">{opt.description}</p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.08]">
              <p className="text-[11px] text-white/35 leading-tight">{hintText}</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-[13px] font-bold text-white hover:text-white/70 transition-colors cursor-pointer shrink-0 ml-4"
              >
                {doneLabel}
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // DEFAULT VARIANT (dropdown list)
  // ═══════════════════════════════════════════════════════════

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <button
        id={id}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        disabled={disabled}
        onClick={() => !disabled && setOpen(prev => !prev)}
        onKeyDown={handleKeyDown}
        className={cn(
          "group flex w-full items-center justify-between gap-3 rounded-xl border border-border/80 bg-background/80 hover:bg-background text-left font-medium text-foreground transition-all duration-200 outline-none cursor-pointer shadow-2xs",
          "hover:border-foreground/30 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20",
          open && "border-primary ring-2 ring-primary/20 bg-background shadow-sm",
          error && "border-destructive focus-visible:ring-destructive",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          sizeClasses[size],
          triggerClassName
        )}
      >
        <div className={cn("flex items-center min-w-0 flex-1", selectedOption?.icon ? "gap-2.5" : "gap-0")}>
          {selectedOption ? (
            <>
              {selectedOption.icon && (
                <span className="shrink-0 text-muted-foreground transition-colors group-hover:text-foreground">
                  {selectedOption.icon}
                </span>
              )}
              <div className="flex items-baseline gap-2 min-w-0 truncate">
                <span className="font-semibold text-foreground truncate">{selectedOption.label}</span>
                {selectedOption.sublabel && (
                  <span className="text-[11px] text-muted-foreground font-mono truncate px-1.5 py-0.5 rounded-md bg-muted/60 dark:bg-white/5 border border-border/40">
                    {selectedOption.sublabel}
                  </span>
                )}
              </div>
            </>
          ) : (
            <span className="text-muted-foreground text-sm font-normal">{placeholder}</span>
          )}
        </div>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180 text-foreground"
          )}
          aria-hidden="true"
        />
      </button>

      {open && typeof document !== "undefined" && createPortal(
        <div
          id={listboxId}
          role="listbox"
          style={menuStyle}
          className={cn(
            "rounded-2xl border border-border/80 bg-popover/98 text-popover-foreground p-1.5 shadow-2xl backdrop-blur-xl animate-in fade-in-0 zoom-in-95 duration-150",
            menuClassName
          )}
        >
          <div ref={menuRef} className="max-h-60 overflow-y-auto space-y-1 p-0.5 overscroll-contain focus:outline-none">
            {options.length === 0 ? (
              <div className="px-3 py-3 text-center text-xs text-muted-foreground">
                Tidak ada opsi tersedia
              </div>
            ) : (
              options.map((opt, idx) => {
                const isSelected = opt.value === value;
                const isHighlighted = idx === highlightedIndex;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    disabled={opt.disabled}
                    onClick={() => { onChange(opt.value as T); setOpen(false); }}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    className={cn(
                      "group/item relative flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors cursor-pointer select-none",
                      isSelected
                        ? "bg-primary/10 text-primary font-semibold"
                        : isHighlighted
                        ? "bg-muted/70 dark:bg-white/10 text-foreground"
                        : "text-foreground hover:bg-muted/60 dark:hover:bg-white/5",
                      opt.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
                    )}
                  >
                    <div className={cn("flex items-center min-w-0 flex-1", opt.icon ? "gap-2.5" : "gap-0")}>
                      {opt.icon && (
                        <span className={cn("shrink-0 transition-colors", isSelected ? "text-primary" : "text-muted-foreground group-hover/item:text-foreground")}>
                          {opt.icon}
                        </span>
                      )}
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="truncate">{opt.label}</span>
                          {opt.badge && (
                            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full bg-primary/10 text-primary">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        {opt.sublabel && (
                          <span className={cn("text-[11px] font-mono truncate mt-0.5", isSelected ? "text-primary/70" : "text-muted-foreground")}>
                            {opt.sublabel}
                          </span>
                        )}
                      </div>
                    </div>
                    {isSelected && <Check className="size-4 shrink-0 text-primary animate-in zoom-in-50 duration-150" />}
                  </button>
                );
              })
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
