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
  /** Label for the "All" group chip. Default: "Semua" */
  allLabel?: string;
  /** Hint text at the bottom. Default: "Klik varian untuk pratinjau langsung di kanvas." */
  hintText?: string;
  /** Done button label. Default: "Selesai" */
  doneLabel?: string;
  className?: string;
}

// ─────────────────────────────────────────────────────────────
// Default wireframe fallback
// ─────────────────────────────────────────────────────────────

function DefaultPreview() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 p-3">
      <div className="w-3/4 h-1.5 rounded-full bg-white/20" />
      <div className="w-full h-1 rounded-full bg-white/10" />
      <div className="w-1/2 h-1 rounded-full bg-white/10" />
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

  const filteredOptions = useMemo(() => {
    if (selectedGroup === "all" || !hasGroups) return options.filter((o) => !o.disabled);
    return options.filter((o) => !o.disabled && o.group === selectedGroup);
  }, [options, selectedGroup, hasGroups]);

  const enabledOptions = options.filter((o) => !o.disabled);

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
        "rounded-2xl border border-white/[0.12] overflow-hidden",
        "bg-[#1c1c1e]",
        className
      )}
    >
      {/* ── Trigger ─────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left cursor-pointer focus:outline-none"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-white shrink-0" />
          <span className="text-[14px] font-bold text-white truncate leading-none">
            {currentOpt?.label ?? value}
          </span>
          {currentOpt?.group && (
            <>
              <span className="text-white/25 text-sm shrink-0">|</span>
              <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-white/25 text-white/70 shrink-0 whitespace-nowrap">
                {currentOpt.group}
              </span>
            </>
          )}
        </div>
        {isExpanded
          ? <ChevronUp className="w-4 h-4 text-white/60 shrink-0" />
          : <ChevronDown className="w-4 h-4 text-white/60 shrink-0" />
        }
      </button>

      {/* ── Expanded panel ──────────────────────────────────── */}
      {isExpanded && (
        <>
          {/* Filter chips */}
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
                const count = enabledOptions.filter((o) => o.group === grp).length;
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
                  onClick={() => onChange(opt.value)}
                  className={cn(
                    "group/card relative flex flex-col text-left rounded-xl overflow-hidden transition-all duration-150 cursor-pointer focus:outline-none",
                    "bg-[#2a2a2e]",
                    isActive
                      ? "ring-2 ring-white ring-offset-0"
                      : "ring-1 ring-white/10 hover:ring-white/25"
                  )}
                >
                  {/* Checkmark badge — pojok kanan atas card */}
                  {isActive && (
                    <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-lg">
                      <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                    </div>
                  )}

                  {/* Thumbnail */}
                  <div className="w-full aspect-[3/2] bg-[#111318] overflow-hidden">
                    {opt.preview ?? <DefaultPreview />}
                  </div>

                  {/* Info */}
                  <div className="p-2.5 space-y-0.5">
                    <p className="text-[13px] font-bold text-white leading-tight">
                      {opt.label}
                    </p>
                    {opt.group && (
                      <p className="text-[9px] font-bold uppercase tracking-widest text-white/35">
                        {opt.group}
                      </p>
                    )}
                    {opt.description && (
                      <p className="text-[11px] text-white/50 leading-snug line-clamp-2 pt-0.5">
                        {opt.description}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.08]">
            <p className="text-[11px] text-white/35 leading-tight">
              {hintText}
            </p>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
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
