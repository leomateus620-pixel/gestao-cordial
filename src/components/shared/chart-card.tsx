import type { ReactNode } from "react";
import { SectionHeader } from "@/components/section-header";
import { GlassCard } from "./glass-card";
import { cn } from "@/lib/utils";

export function ChartCard({
  title,
  eyebrow,
  children,
  className,
  heightClassName = "h-44",
}: {
  title: string;
  eyebrow?: ReactNode;
  children: ReactNode;
  className?: string;
  heightClassName?: string;
}) {
  return (
    <GlassCard className={cn("mb-6", className)} padding="lg">
      <div className="mb-3 flex items-center justify-between">
        <SectionHeader title={title} className="mb-0" />
        {eyebrow && <span className="font-mono text-[10px] text-foreground/40">{eyebrow}</span>}
      </div>
      <div className={heightClassName}>{children}</div>
    </GlassCard>
  );
}
