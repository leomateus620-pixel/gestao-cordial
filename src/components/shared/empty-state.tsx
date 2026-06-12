import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

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
    <div
      className="rounded-2xl p-8 text-center"
      style={{
        background:
          "linear-gradient(160deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.45) 100%)",
        backdropFilter: "blur(16px) saturate(140%)",
        border: "1px solid rgba(255,255,255,0.55)",
        boxShadow: "0 8px 24px -8px rgba(23,27,33,0.08)",
      }}
    >
      <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
        {icon ?? <Inbox className="size-5" />}
      </div>
      <p className="mt-3 text-sm font-semibold">{title}</p>
      {description && (
        <div className="mt-1.5 text-[11px] leading-relaxed text-foreground/50">{description}</div>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
