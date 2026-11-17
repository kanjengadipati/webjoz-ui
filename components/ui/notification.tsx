"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CheckIcon, AlertIcon, InfoIcon, CloseIcon } from "../icons";
import { Button } from "./button";
import { cn } from "../../lib/utils";

export type NotificationTone = "default" | "success" | "error" | "warning" | "info";
export type NotificationPlacement =
  | "top-right"
  | "top-center"
  | "bottom-right"
  | "bottom-center";

export interface NotificationAction {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "ghost";
}

export interface NotificationOptions {
  title: string;
  description?: string;
  tone?: NotificationTone;
  placement?: NotificationPlacement;
  duration?: number;
  icon?: ReactNode;
  action?: NotificationAction;
  dismissible?: boolean;
  id?: string;
}

export interface NotificationRecord extends Required<Pick<NotificationOptions, "title" | "tone" | "placement" | "dismissible">> {
  id: string;
  description?: string;
  duration: number;
  icon?: ReactNode;
  action?: NotificationAction;
  closing: boolean;
  createdAt: number;
}

export interface NotificationApi {
  open(options: NotificationOptions): string;
  success(title: string, options?: Omit<NotificationOptions, "title" | "tone">): string;
  error(title: string, options?: Omit<NotificationOptions, "title" | "tone">): string;
  warning(title: string, options?: Omit<NotificationOptions, "title" | "tone">): string;
  info(title: string, options?: Omit<NotificationOptions, "title" | "tone">): string;
  dismiss(id: string): void;
  clear(placement?: NotificationPlacement): void;
}

const DEFAULT_DURATION = 4500;
const MAX_PER_PLACEMENT = 4;
const DEDUPE_WINDOW = 1500;

const TONE_ICON: Record<NotificationTone, (props: { className?: string }) => ReactNode> = {
  default: (p) => <InfoIcon size="md" className={p.className} />,
  success: (p) => <CheckIcon size="md" className={p.className} />,
  error: (p) => <AlertIcon size="md" className={p.className} />,
  warning: (p) => <AlertIcon size="md" className={p.className} />,
  info: (p) => <InfoIcon size="md" className={p.className} />,
};

const TONE_CHIP: Record<NotificationTone, string> = {
  default: "border-border/70 bg-muted text-foreground",
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  error: "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-300",
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-300",
  info: "border-sky-500/25 bg-sky-500/10 text-sky-600 dark:text-sky-300",
};

const TONE_LABEL: Record<NotificationTone, string> = {
  default: "INFO",
  success: "SUKSES",
  error: "GAGAL",
  warning: "PERINGATAN",
  info: "INFO",
};

const PLACEMENT_CLASS: Record<NotificationPlacement, string> = {
  "top-right": "top-4 right-4 sm:top-6 sm:right-6",
  "top-center": "top-4 left-1/2 -translate-x-1/2 sm:top-6",
  "bottom-right": "bottom-4 right-4 sm:bottom-6 sm:right-6",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6",
};

const isBottom = (p: NotificationPlacement) => p.startsWith("bottom");

const NotificationContext = createContext<NotificationApi | null>(null);

export function useNotification(): NotificationApi {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return ctx;
}

export interface NotificationProviderProps {
  children: ReactNode;
  defaultPlacement?: NotificationPlacement;
  defaultDuration?: number;
  max?: number;
}

export function NotificationProvider({
  children,
  defaultPlacement = "top-right",
  defaultDuration = DEFAULT_DURATION,
  max = MAX_PER_PLACEMENT,
}: NotificationProviderProps) {
  const [items, setItems] = useState<NotificationRecord[]>([]);
  const recentRef = useRef<Map<string, number>>(new Map());
  const counterRef = useRef(0);

  const nextId = useCallback(() => {
    counterRef.current = counterRef.current > 1_000_000 ? 1 : counterRef.current + 1;
    return `wjn-${Date.now()}-${counterRef.current}`;
  }, []);

  const dismiss = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, closing: true } : n)),
    );
    window.setTimeout(() => {
      setItems((prev) => prev.filter((n) => n.id !== id));
    }, 200);
  }, []);

  const clear = useCallback((placement?: NotificationPlacement) => {
    setItems((prev) => {
      const target = placement ? prev.filter((n) => n.placement === placement) : prev;
      target.forEach((n) => {
        /* mark closing handled by dismiss; just schedule removal */
      });
      const ids = new Set(target.map((n) => n.id));
      ids.forEach((id) => {
        window.setTimeout(() => {
          setItems((p) => p.filter((n) => n.id !== id));
        }, 200);
      });
      return prev.map((n) =>
        ids.has(n.id) ? { ...n, closing: true } : n,
      );
    });
  }, []);

  const open = useCallback(
    (options: NotificationOptions): string => {
      const placement = options.placement ?? defaultPlacement;
      const tone = options.tone ?? "default";
      const duration = options.duration ?? defaultDuration;
      const id = options.id ?? nextId();

      const now = Date.now();
      const dedupeKey = `${tone}:${options.title}:${options.description ?? ""}`;
      const last = recentRef.current.get(dedupeKey);
      if (last && now - last < DEDUPE_WINDOW) {
        return id;
      }
      recentRef.current.set(dedupeKey, now);

      setItems((prev) => {
        // replace existing with same id
        const without = prev.filter((n) => n.id !== id);
        const samePlace = without.filter((n) => n.placement === placement);
        const trimmed =
          samePlace.length >= max
            ? without.filter((n) => !(n.placement === placement && n === samePlace[0]))
            : without;
        const record: NotificationRecord = {
          id,
          title: options.title,
          description: options.description,
          tone,
          placement,
          duration,
          icon: options.icon,
          action: options.action,
          dismissible: options.dismissible ?? true,
          closing: false,
          createdAt: now,
        };
        return [...trimmed, record];
      });

      if (duration > 0) {
        window.setTimeout(() => {
          setItems((prev) => {
            const target = prev.find((n) => n.id === id);
            if (!target || target.closing) return prev;
            return prev.map((n) =>
              n.id === id ? { ...n, closing: true } : n,
            );
          });
          window.setTimeout(() => {
            setItems((prev) => prev.filter((n) => n.id !== id));
          }, 200);
        }, duration);
      }

      return id;
    },
    [defaultDuration, defaultPlacement, max, nextId],
  );

  const make = useCallback(
    (tone: NotificationTone) =>
      (title: string, options?: Omit<NotificationOptions, "title" | "tone">) =>
        open({ ...options, title, tone }),
    [open],
  );

  const api = useMemo<NotificationApi>(
    () => ({
      open,
      success: make("success"),
      error: make("error"),
      warning: make("warning"),
      info: make("info"),
      dismiss,
      clear,
    }),
    [clear, dismiss, make, open],
  );

  const groups = useMemo(() => {
    const map = new Map<NotificationPlacement, NotificationRecord[]>();
    (["top-right", "top-center", "bottom-right", "bottom-center"] as NotificationPlacement[]).forEach(
      (p) => map.set(p, []),
    );
    items.forEach((n) => {
      map.get(n.placement)?.push(n);
    });
    return map;
  }, [items]);

  return (
    <NotificationContext.Provider value={api}>
      {children}
      {(["top-right", "top-center", "bottom-right", "bottom-center"] as NotificationPlacement[]).map(
        (placement) => {
          const list = groups.get(placement) ?? [];
          if (list.length === 0) return null;
          return (
            <div
              key={placement}
              data-placement={placement}
              className={cn(
                "pointer-events-none fixed z-[80] flex w-[min(calc(100%-2rem),24rem)] flex-col gap-2",
                PLACEMENT_CLASS[placement],
                isBottom(placement) && "flex-col-reverse",
              )}
            >
              {list.map((n) => (
                <NotificationItem
                  key={n.id}
                  record={n}
                  onDismiss={dismiss}
                />
              ))}
            </div>
          );
        },
      )}
    </NotificationContext.Provider>
  );
}

interface NotificationItemProps {
  record: NotificationRecord;
  onDismiss: (id: string) => void;
}

function NotificationItem({ record, onDismiss }: NotificationItemProps) {
  const [paused, setPaused] = useState(false);
  const remainingRef = useRef(record.duration);
  const startedRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const arm = useCallback(() => {
    if (record.duration <= 0 || record.closing) return;
    startedRef.current = Date.now();
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      onDismiss(record.id);
    }, remainingRef.current);
  }, [record.closing, record.duration, record.id, onDismiss]);

  useEffect(() => {
    arm();
    return () => clearTimer();
  }, [arm, clearTimer]);

  const handleEnter = useCallback(() => {
    if (record.duration <= 0) return;
    if (startedRef.current !== null) {
      remainingRef.current = Math.max(
        0,
        remainingRef.current - (Date.now() - startedRef.current),
      );
      startedRef.current = null;
    }
    clearTimer();
    setPaused(true);
  }, [clearTimer, record.duration]);

  const handleLeave = useCallback(() => {
    if (record.duration <= 0 || remainingRef.current <= 0 || record.closing) return;
    setPaused(false);
    arm();
  }, [arm, record.closing, record.duration]);

  const Icon = TONE_ICON[record.tone];
  const iconChip = TONE_CHIP[record.tone];
  const hasBody = Boolean(record.description || record.action);
  const progressPercent =
    record.duration > 0 ? (remainingRef.current / record.duration) * 100 : 0;

  return (
    <div
      data-placement={record.placement}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={cn(
        "wj-notify-enter pointer-events-auto relative w-full overflow-hidden rounded-2xl border border-border/70 bg-card/95 p-3.5 pr-2.5 text-card-foreground shadow-[0_18px_50px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl",
        record.closing && "wj-notify-exit",
      )}
      role={record.tone === "error" ? "alert" : "status"}
      aria-live={record.tone === "error" ? "assertive" : "polite"}
      aria-atomic="true"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/25 to-transparent"
      />

      <div className={cn("flex gap-3", hasBody ? "items-start" : "items-center")}>
        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-xl border",
            hasBody && "mt-0.5",
            iconChip,
          )}
        >
          <Icon className="size-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className="truncate text-[13px] font-semibold tracking-tight text-foreground">
              {record.title}
            </div>
            <span className="shrink-0 rounded-full border border-border/60 bg-muted/60 px-1.5 py-0.5 font-mono text-[8.5px] font-bold tracking-[0.16em] text-muted-foreground">
              {TONE_LABEL[record.tone]}
            </span>
          </div>
          {record.description && (
            <div className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">
              {record.description}
            </div>
          )}
          {record.action && (
            <div className="mt-2.5">
              {record.action.href ? (
                <a
                  href={record.action.href}
                  onClick={() => onDismiss(record.id)}
                  className="inline-flex h-7 items-center rounded-lg border border-border/60 bg-muted/40 px-2.5 text-[11.5px] font-medium text-foreground transition-all hover:bg-muted/70 active:scale-[0.98]"
                >
                  {record.action.label}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    record.action?.onClick?.();
                    onDismiss(record.id);
                  }}
                  className="inline-flex h-7 items-center rounded-lg border border-border/60 bg-muted/40 px-2.5 text-[11.5px] font-medium text-foreground transition-all hover:bg-muted/70 active:scale-[0.98]"
                >
                  {record.action.label}
                </button>
              )}
            </div>
          )}
        </div>

        {record.dismissible && (
          <button
            type="button"
            onClick={() => onDismiss(record.id)}
            aria-label="Tutup notifikasi"
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              hasBody && "mt-0.5",
            )}
          >
            <CloseIcon size="sm" />
          </button>
        )}
      </div>

      {record.duration > 0 && (
        <div className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden bg-foreground/[0.06]">
          <div
            data-paused={paused ? "true" : "false"}
            className="wj-notify-progress h-full w-full bg-foreground/40"
            style={{
              animationDuration: `${record.duration}ms`,
              animationPlayState: paused ? "paused" : "running",
            }}
          />
        </div>
      )}
    </div>
  );
}

export interface NotificationCardProps {
  title: string;
  description?: string;
  tone?: NotificationTone;
  action?: NotificationAction;
  onClose?: () => void;
  className?: string;
  children?: ReactNode;
  duration?: number;
}

export function NotificationCard({
  title,
  description,
  tone = "default",
  action,
  onClose,
  className,
  children,
  duration,
}: NotificationCardProps) {
  const Icon = TONE_ICON[tone];
  const iconChip = TONE_CHIP[tone];
  const hasBody = Boolean(description || children || action);
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-border/70 bg-card/95 p-3.5 pr-2.5 text-card-foreground shadow-[0_18px_50px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/25 to-transparent"
      />
      <div className={cn("flex gap-3", hasBody ? "items-start" : "items-center")}>
        <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl border", hasBody && "mt-0.5", iconChip)}>
          <Icon className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className="truncate text-[13px] font-semibold tracking-tight text-foreground">{title}</div>
            <span className="shrink-0 rounded-full border border-border/60 bg-muted/60 px-1.5 py-0.5 font-mono text-[8.5px] font-bold tracking-[0.16em] text-muted-foreground">
              {TONE_LABEL[tone]}
            </span>
          </div>
          {description && (
            <div className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">{description}</div>
          )}
          {children && <div className="mt-2 space-y-2">{children}</div>}
          {action && (
            <div className="mt-2.5">
              {action.href ? (
                <a href={action.href} className="inline-flex h-7 items-center rounded-lg border border-border/60 bg-muted/40 px-2.5 text-[11.5px] font-medium text-foreground transition-all hover:bg-muted/70 active:scale-[0.98]">
                  {action.label}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={action.onClick}
                  className="inline-flex h-7 items-center rounded-lg border border-border/60 bg-muted/40 px-2.5 text-[11.5px] font-medium text-foreground transition-all hover:bg-muted/70 active:scale-[0.98]"
                >
                  {action.label}
                </button>
              )}
            </div>
          )}
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup notifikasi"
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              hasBody && "mt-0.5",
            )}
          >
            <CloseIcon size="sm" />
          </button>
        )}
      </div>

      {duration && duration > 0 && (
        <div className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden bg-foreground/[0.06]">
          <div className="wj-notify-progress h-full w-full bg-foreground/40" style={{ animationDuration: `${duration}ms` }} />
        </div>
      )}
    </div>
  );
}
