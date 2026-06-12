import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useApp, useFiltered } from "@/store/app-store";
import { Fab } from "@/components/fab";
import { NovoImovelSheet } from "@/components/sheets/novo-imovel";
import { PropertyCard } from "@/components/shared/property-card";
import { EmptyState } from "@/components/shared/empty-state";

const filters = ["Todos", "Venda", "Aluguel"] as const;

export const Route = createFileRoute("/_app/imoveis")({
  head: () => ({ meta: [{ title: "Imóveis — Gestão Cordial" }] }),
  component: Page,
});

function Page() {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState<(typeof filters)[number]>("Todos");
  const imoveis = useFiltered(useApp((s) => s.imoveis));

  const list = useMemo(
    () => imoveis.filter((i) => f === "Todos" || i.finalidade === f),
    [imoveis, f],
  );

  return (
    <>
      <div className="mb-4 flex gap-2">
        {filters.map((x) => (
          <button
            key={x}
            onClick={() => setF(x)}
            className={
              "rounded-full px-3 py-1.5 text-xs font-medium transition " +
              (f === x
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                : "glass-panel text-foreground/65")
            }
          >
            {x}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {list.map((im) => (
          <PropertyCard key={im.id} property={im} />
        ))}
        {list.length === 0 && (
          <EmptyState
            title="Nenhum imóvel encontrado"
            description="Ajuste o filtro ou cadastre um novo imóvel."
          />
        )}
      </div>

      <Fab onClick={() => setOpen(true)} label="Novo imóvel" />
      <NovoImovelSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
