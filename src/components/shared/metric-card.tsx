import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { GlassCard } from "./glass-card";
import { cn } from "@/lib/utils";

type MetricTone = "default" | "primary" | "success" | "danger";
type MetricAccent = "up" | "down" | "neutral";

const toneClass: Record<MetricTone, string> = {
  default: "text-foreground",
  primary: "text-primary",
  success: "text-[color:var(--success)]",
  danger: "text-[color:var(--danger)]",
};

export function MetricCard({
  label,
  value,
  delta,
  tone = "default",
  accent = "neutral",
  icon,
  description,
  className,
}: {
  label: string;
  value: ReactNode;
  delta?: ReactNode;
  tone?: MetricTone;
  accent?: MetricAccent;
  icon?: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  const TrendIcon = accent === "up" ? ArrowUpRight : accent === "down" ? ArrowDownRight : null;

  return (
    <GlassCard className={cn("min-w-0", className)} padding="md">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[10px] font-medium uppercase tracking-wider text-foreground/50">
          {label}
        </p>
        {icon && (
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
            {icon}
          </span>
        )}
      </div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className={cn("truncate text-2xl font-bold leading-none", toneClass[tone])}>
          {value}
        </span>
        {delta && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-mono text-[10px] font-medium",
              accent === "up" && "text-[color:var(--success)]",
              accent === "down" && "text-[color:var(--danger)]",
              accent === "neutral" && "text-foreground/40",
            )}
          >
            {TrendIcon && <TrendIcon className="size-3" />}
            {delta}
          </span>
        )}
      </div>
      {description && <p className="mt-2 text-[11px] text-foreground/55">{description}</p>}
    </GlassCard>
  );
}
