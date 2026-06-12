import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { MeshBackground } from "./mesh-background";
import { AgencySwitcher } from "./agency-switcher";
import { MobileDrawer } from "./shared/mobile-drawer";
import { NotificationBell } from "./shared/notification-bell";
import { SidebarMenu } from "./shared/sidebar-menu";
import { useSession } from "@/lib/auth-mock";

export function AppShell() {
  const session = useSession();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (session === null) navigate({ to: "/login" });
  }, [session, navigate]);

  if (!session) return null;

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-[480px] flex-col font-sans text-foreground">
      <MeshBackground />

      <header className="sticky top-0 z-30 flex flex-col gap-3 px-5 pt-6 pb-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <MobileDrawer pathname={pathname} />
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                Gestão Cordial
              </span>
              <h1 className="truncate text-xl font-semibold tracking-tight">Olá, {session.nome}</h1>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <NotificationBell count={2} />
            <Link
              to="/mais"
              className="glass-panel grid size-10 place-items-center rounded-full text-sm font-semibold text-primary"
              aria-label="Perfil"
            >
              {session.iniciais}
            </Link>
          </div>
        </div>
        <AgencySwitcher />
      </header>

      <main className="flex-1 px-5 pb-32">
        <Outlet />
      </main>

      <SidebarMenu pathname={pathname} />
    </div>
  );
}
