import { Bell } from "lucide-react";
import { LiquidButton } from "./liquid-button";

export function NotificationBell({ count = 0 }: { count?: number }) {
  return (
    <LiquidButton
      variant="glass"
      size="icon"
      aria-label={count ? `${count} notificações` : "Notificações"}
    >
      <span className="relative">
        <Bell className="size-4" />
        {count > 0 && (
          <span className="absolute -right-1 -top-1 grid size-3 place-items-center rounded-full bg-destructive text-[7px] font-bold text-destructive-foreground">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </span>
    </LiquidButton>
  );
}
