import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TimelineItem = {
  id: string;
  marker?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  tone?: "primary" | "success" | "warning" | "neutral";
};

const toneClass = {
  primary: "bg-primary",
  success: "bg-emerald-500",
  warning: "bg-amber-400",
  neutral: "bg-foreground/30",
};

export function Timeline({ items, className }: { items: TimelineItem[]; className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => (
        <div key={item.id} className="relative flex gap-3">
          {index < items.length - 1 && (
            <span className="absolute left-4 top-8 h-[calc(100%+0.25rem)] w-px bg-white/60" />
          )}
          <div
            className={cn(
              "relative z-10 grid size-8 shrink-0 place-items-center rounded-full text-white",
              toneClass[item.tone ?? "primary"],
            )}
          >
            {item.marker ?? index + 1}
          </div>
          <div className="min-w-0 flex-1 rounded-2xl bg-white/40 p-3">
            <div className="flex items-start justify-between gap-2">
              <p className="truncate text-sm font-semibold">{item.title}</p>
              {item.meta && (
                <span className="shrink-0 text-[10px] text-foreground/50">{item.meta}</span>
              )}
            </div>
            {item.description && (
              <div className="mt-1 text-[11px] text-foreground/60">{item.description}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
