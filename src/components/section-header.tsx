import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
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
    <div className={cn("mb-3 flex items-center justify-between gap-3", className)}>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
        {description && (
          <p className="mt-0.5 text-[11px] leading-snug text-foreground/50">{description}</p>
        )}
      </div>
      {href && (
        <Link
          to={href as never}
          className="flex shrink-0 items-center gap-1 rounded-full bg-primary/8 px-3 py-1 text-[11px] font-semibold text-primary transition-all hover:bg-primary/14"
        >
          {action}
          <ArrowRight className="size-3" />
        </Link>
      )}
    </div>
  );
}
