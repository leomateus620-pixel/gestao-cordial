import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { moduleItems, primaryModuleItems, type ModuleItem } from "./module-menu";

function isModuleActive(pathname: string, item: ModuleItem) {
  return item.exact ? pathname === item.to : pathname.startsWith(item.to);
}

export function SidebarMenu({
  pathname,
  items = primaryModuleItems,
  variant = "bottom",
  onNavigate,
}: {
  pathname: string;
  items?: ModuleItem[];
  variant?: "bottom" | "list";
  onNavigate?: () => void;
}) {
  if (variant === "list") {
    return (
      <nav
        className="glass-panel divide-y divide-white/50 overflow-hidden rounded-3xl"
        aria-label="Módulos"
      >
        {items.map((item) => {
          const active = isModuleActive(pathname, item);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to as never}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 active:bg-white/50",
                active && "bg-white/45 text-primary",
              )}
            >
              <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.label}</p>
                <p className="truncate text-[11px] text-foreground/55">{item.desc}</p>
              </div>
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav
      className="fixed bottom-5 left-1/2 z-40 flex h-16 w-[calc(100%-2rem)] max-w-[448px] -translate-x-1/2 items-center justify-around rounded-full glass-panel-strong px-2"
      aria-label="Navegação principal"
    >
      {items.map((item) => {
        const active = isModuleActive(pathname, item);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to as never}
            className={cn(
              "relative flex flex-1 flex-col items-center justify-center gap-1 py-1 transition-colors",
              active ? "text-primary" : "text-foreground/45",
            )}
          >
            <Icon
              className={cn("size-5", active && "drop-shadow-sm")}
              strokeWidth={active ? 2.4 : 1.8}
            />
            <span className="text-[9px] font-bold uppercase tracking-tighter">
              {item.shortLabel ?? item.label}
            </span>
            {active && <span className="absolute -bottom-1 size-1 rounded-full bg-primary" />}
          </Link>
        );
      })}
    </nav>
  );
}
