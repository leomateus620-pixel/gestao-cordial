import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useApp, useFiltered } from "@/store/app-store";
import { ContractCard } from "@/components/shared/contract-card";
import { EmptyState } from "@/components/shared/empty-state";

const tabs = ["Todos", "Venda", "Aluguel"] as const;

export const Route = createFileRoute("/_app/contratos")({
  head: () => ({ meta: [{ title: "Contratos — Gestão Cordial" }] }),
  component: Page,
});

function Page() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Todos");
  const contratos = useFiltered(useApp((s) => s.contratos));
  const clientes = useApp((s) => s.clientes);
  const imoveis = useApp((s) => s.imoveis);
  const list = contratos.filter((c) => tab === "Todos" || c.tipo === tab);

  return (
    <>
      <div className="mb-4 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              "rounded-full px-3 py-1.5 text-xs font-medium transition " +
              (tab === t
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                : "glass-panel text-foreground/65")
            }
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {list.map((c) => {
          const cli = clientes.find((x) => x.id === c.clienteId);
          const im = imoveis.find((x) => x.id === c.imovelId);
          return <ContractCard key={c.id} contract={c} client={cli} property={im} />;
        })}
        {list.length === 0 && (
          <EmptyState
            title="Nenhum contrato encontrado"
            description="Altere o filtro para visualizar outros contratos."
          />
        )}
      </div>
    </>
  );
}
