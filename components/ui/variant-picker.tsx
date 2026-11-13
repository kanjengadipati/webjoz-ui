"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../lib/utils";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

export interface VariantOption {
  value: string;
  label: string;
  /** Category/group label shown as a badge (e.g. "Visual Foto", "Editorial") */
  group?: string;
  /** Short description shown inside the card */
  description?: string;
  /** Custom wireframe preview rendered inside the card thumbnail area */
  preview?: React.ReactNode;
  disabled?: boolean;
}

export interface VariantPickerProps {
  value: string;
  onChange: (value: string) => void;
  options: VariantOption[];
  /**
   * Label shown for the "All" group filter chip.
   * Default: "Semua"
   */
  allLabel?: string;
  /**
   * Hint text shown at the bottom of the expanded panel.
   * Default: "Klik varian untuk pratinjau langsung di kanvas."
   */
  hintText?: string;
  /**
   * Label for the close / done button.
   * Default: "Selesai"
   */
  doneLabel?: string;
  className?: string;
}

// ─────────────────────────────────────────────────────────────
// Default wireframe fallback
// ─────────────────────────────────────────────────────────────

function DefaultPreview() {
  return (
    <div className="w-full h-full rounded-md bg-[#111520] flex flex-col items-center justify-center gap-1 p-2">
      <div className="w-3/4 h-1.5 rounded-full bg-white/20" />
      <div className="w-full h-1 rounded-full bg-white/10" />
      <div className="w-1/2 h-1 rounded-full bg-white/10" />
      <div className="w-1/3 h-2 rounded-sm bg-white/15 mt-0.5" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────

export function VariantPicker({
  value,
  onChange,
  options,
  allLabel = "Semua",
  hintText = "Klik varian untuk pratinjau langsung di kanvas.",
  doneLabel = "Selesai",
  className,
}: VariantPickerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const containerRef = useRef<HTMLDivElement>(null);

  const currentOpt = options.find((o) => o.value === value) ?? options[0];

  // Collect unique groups
  const groups = useMemo(() => {
    const seen = new Set<string>();
    const result: string[] = [];
    for (const o of options) {
      if (o.group && !seen.has(o.group)) {
        seen.add(o.group);
        result.push(o.group);
      }
    }
    return result;
  }, [options]);

  const hasGroups = groups.length > 1;

  // Filtered options
  const filteredOptions = useMemo(() => {
    if (selectedGroup === "all" || !hasGroups) return options.filter((o) => !o.disabled);
    return options.filter((o) => !o.disabled && o.group === selectedGroup);
  }, [options, selectedGroup, hasGroups]);

  const enabledOptions = options.filter((o) => !o.disabled);

  // Close on outside click
  useEffect(() => {
    if (!isExpanded) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [isExpanded]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "rounded-2xl border transition-all",
        isExpanded
          ? "border-primary/50 bg-[#0c0f16]/95 shadow-md ring-1 ring-primary/20"
          : "border-border/70 bg-[#0c0f16]/80 hover:border-primary/40 hover:bg-[#10141e]",
        className
      )}
    >
      {/* ── Trigger pill ────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 text-left cursor-pointer transition-colors focus:outline-none group"
      >
        {/* Left — active variant info */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
          <span className="text-[12px] font-bold text-slate-100 truncate">
            {currentOpt?.label ?? value}
          </span>
          {currentOpt?.group && (
            <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/40 shrink-0">
              {currentOpt.group}
            </span>
          )}
        </div>

        {/* Right — count + chevron */}
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[10px] font-semibold text-slate-300 group-hover:text-white transition-colors">
            {isExpanded
              ? doneLabel
              : `Pilih Varian (${enabledOptions.length})`}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5 text-sky-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-slate-300 group-hover:text-white transition-colors" />
          )}
        </div>
      </button>

      {/* ── Expanded panel ──────────────────────────────────── */}
      {isExpanded && (
        <div className="px-2.5 pb-2.5 pt-1 border-t border-border/60 space-y-2.5">

          {/* Category filter chips */}
          {hasGroups && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none]">
              <button
                type="button"
                onClick={() => setSelectedGroup("all")}
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-[10px] font-medium transition whitespace-nowrap cursor-pointer shrink-0",
                  selectedGroup === "all"
                    ? "bg-sky-500 text-slate-950 font-bold shadow-xs"
                    : "bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/50"
                )}
              >
                {allLabel} ({enabledOptions.length})
              </button>
              {groups.map((grp) => {
                const count = enabledOptions.filter((o) => o.group === grp).length;
                return (
                  <button
                    key={grp}
                    type="button"
                    onClick={() => setSelectedGroup(grp)}
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[10px] font-medium transition whitespace-nowrap cursor-pointer shrink-0",
                      selectedGroup === grp
                        ? "bg-sky-500 text-slate-950 font-bold shadow-xs"
                        : "bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/50"
                    )}
                  >
                    {grp} ({count})
                  </button>
                );
              })}
            </div>
          )}

          {/* Cards grid */}
          <div className="grid grid-cols-2 gap-2 max-h-[360px] overflow-y-auto pr-0.5 [scrollbar-width:thin]">
            {filteredOptions.map((opt) => {
              const isActive = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                  }}
                  className={cn(
                    "group/card relative flex flex-col text-left rounded-xl border p-1.5 transition-all duration-150 cursor-pointer focus:outline-none",
                    isActive
                      ? "border-sky-500/60 bg-sky-500/5 ring-1 ring-sky-500/30 shadow-md"
                      : "border-border/50 bg-slate-900/60 hover:border-sky-500/30 hover:bg-slate-800/60"
                  )}
                >
                  {/* Wireframe preview thumbnail */}
                  <div className="w-full aspect-[2/1] rounded-md overflow-hidden mb-1.5 bg-[#0a0d14] border border-white/[0.06]">
                    {opt.preview ?? <DefaultPreview />}
                  </div>

                  {/* Checkmark badge */}
                  {isActive && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center shadow-md">
                      <Check className="w-3 h-3 text-white stroke-[3]" />
                    </div>
                  )}

                  {/* Info */}
                  <div className="px-0.5 space-y-0.5">
                    <p className={cn(
                      "text-[11px] font-bold leading-tight truncate",
                      isActive ? "text-sky-300" : "text-slate-100"
                    )}>
                      {opt.label}
                    </p>
                    {opt.group && (
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 truncate">
                        {opt.group}
                      </p>
                    )}
                    {opt.description && (
                      <p className="text-[9px] text-slate-400 leading-tight line-clamp-2 mt-0.5">
                        {opt.description}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer — hint + done */}
          <div className="flex items-center justify-between pt-1 border-t border-white/[0.06]">
            <p className="text-[9px] text-slate-500 leading-tight">
              {hintText}
            </p>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-[11px] font-semibold text-sky-400 hover:text-sky-300 transition-colors cursor-pointer shrink-0 ml-3"
            >
              {doneLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
