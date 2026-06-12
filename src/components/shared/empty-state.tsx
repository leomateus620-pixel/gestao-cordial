import type { ReactNode } from "react";
import { Inbox } from "lucide-react";
import { GlassCard } from "./glass-card";

export function EmptyState({
  title = "Nada encontrado",
  description,
  icon,
  action,
}: {
  title?: string;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <GlassCard className="rounded-2xl text-center" padding="lg">
      <div className="mx-auto grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
        {icon ?? <Inbox className="size-5" />}
      </div>
      <p className="mt-3 text-sm font-semibold">{title}</p>
      {description && <div className="mt-1 text-[11px] text-foreground/55">{description}</div>}
      {action && <div className="mt-4">{action}</div>}
    </GlassCard>
  );
}
