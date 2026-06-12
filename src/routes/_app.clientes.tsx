import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useApp, useFiltered } from "@/store/app-store";
import { Fab } from "@/components/fab";
import { NovoClienteSheet } from "@/components/sheets/novo-cliente";
import { ClientCard } from "@/components/shared/client-card";
import { EmptyState } from "@/components/shared/empty-state";

export const Route = createFileRoute("/_app/clientes")({
  head: () => ({ meta: [{ title: "Clientes — Gestão Cordial" }] }),
  component: Page,
});

function Page() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const clientes = useFiltered(useApp((s) => s.clientes));

  const list = useMemo(
    () => clientes.filter((c) => c.nome.toLowerCase().includes(q.toLowerCase())),
    [clientes, q],
  );

  return (
    <>
      <div className="glass-panel mb-4 flex items-center gap-2 rounded-2xl px-3 py-2">
        <Search className="size-4 text-foreground/50" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar cliente..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/40"
        />
      </div>

      <div className="space-y-2">
        {list.map((c) => (
          <ClientCard key={c.id} client={c} />
        ))}
        {list.length === 0 && (
          <EmptyState
            title="Nenhum cliente encontrado"
            description="Tente buscar por outro nome ou cadastre um novo cliente."
          />
        )}
      </div>

      <Fab onClick={() => setOpen(true)} label="Novo cliente" />
      <NovoClienteSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
