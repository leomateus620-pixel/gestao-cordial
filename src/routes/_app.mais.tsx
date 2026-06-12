import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogOut, Building2 } from "lucide-react";
import { useSession, logout } from "@/lib/auth-mock";
import { moduleItems } from "@/components/shared/module-menu";
import { SidebarMenu } from "@/components/shared/sidebar-menu";

export const Route = createFileRoute("/_app/mais")({
  head: () => ({ meta: [{ title: "Mais — Gestão Cordial" }] }),
  component: Page,
});

function Page() {
  const session = useSession();
  const navigate = useNavigate();

  function sair() {
    logout();
    navigate({ to: "/login" });
  }

  return (
    <>
      <section className="glass-panel-strong mb-5 flex items-center gap-3 rounded-3xl p-4">
        <div className="grid size-12 place-items-center rounded-2xl bg-primary/15 text-base font-bold text-primary">
          {session?.iniciais}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{session?.nome}</p>
          <p className="text-[11px] text-foreground/55">{session?.cargo}</p>
        </div>
      </section>

      <section className="mb-5">
        <h3 className="mb-2 px-1 text-[11px] font-bold uppercase tracking-wider text-foreground/55">
          Módulos
        </h3>
        <SidebarMenu
          pathname="/mais"
          items={moduleItems.filter((item) => !item.primary)}
          variant="list"
        />
      </section>

      <section className="mb-5">
        <h3 className="mb-2 px-1 text-[11px] font-bold uppercase tracking-wider text-foreground/55">
          Imobiliárias
        </h3>
        <div className="glass-panel rounded-3xl p-4">
          <div className="flex items-center gap-3">
            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
              <Building2 className="size-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">Cordial Imóveis</p>
              <p className="text-[11px] text-foreground/55">Operação completa</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-3 border-t border-white/40 pt-3">
            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-amber-500/15 text-amber-700">
              <Building2 className="size-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">Morar Imóveis</p>
              <p className="text-[11px] text-foreground/55">Operação completa</p>
            </div>
          </div>
        </div>
      </section>

      <button
        onClick={sair}
        className="glass-panel flex w-full items-center justify-center gap-2 rounded-2xl p-3.5 text-sm font-semibold text-destructive active:scale-[0.99]"
      >
        <LogOut className="size-4" /> Sair
      </button>
    </>
  );
}
