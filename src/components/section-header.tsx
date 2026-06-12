import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  href,
  action = "Ver tudo",
  className,
}: {
  title: string;
  href?: string;
  action?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-3 flex items-center justify-between", className)}>
      <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
      {href && (
        <Link to={href as never} className="text-xs font-medium text-primary">
          {action}
        </Link>
      )}
    </div>
  );
}
