import { cn } from "@/lib/utils";

export function LoadingSkeleton({ rows = 3, className }: { rows?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)} aria-label="Carregando">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="glass-panel rounded-2xl p-3">
          <div className="flex items-center gap-3">
            <div className="size-10 animate-pulse rounded-full bg-white/60" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-3 w-2/3 animate-pulse rounded-full bg-white/60" />
              <div className="h-2 w-1/2 animate-pulse rounded-full bg-white/45" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
