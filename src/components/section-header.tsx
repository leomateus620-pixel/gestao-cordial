import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  description,
  href,
  action = "Ver tudo",
  className,
}: {
  title: string;
  description?: string;
  href?: string;
  action?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-3 flex items-start justify-between gap-3", className)}>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
        {description && (
          <p className="mt-0.5 text-[11px] leading-snug text-foreground/55">{description}</p>
        )}
      </div>
      {href && (
        <Link
          to={href as never}
          className="shrink-0 text-xs font-medium text-primary hover:underline"
        >
          {action}
        </Link>
      )}
    </div>
  );
}
