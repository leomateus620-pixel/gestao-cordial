import { createFileRoute } from "@tanstack/react-router";
import { useApp, useFiltered } from "@/store/app-store";
import { BrokerCard } from "@/components/shared/broker-card";
import { EmptyState } from "@/components/shared/empty-state";

export const Route = createFileRoute("/_app/corretores")({
  head: () => ({ meta: [{ title: "Corretores — Gestão Cordial" }] }),
  component: Page,
});

function Page() {
  const corretores = useFiltered(useApp((s) => s.corretores));
  return (
    <div className="space-y-3">
      {corretores.map((c) => (
        <BrokerCard key={c.id} broker={c} />
      ))}
      {corretores.length === 0 && (
        <EmptyState
          title="Nenhum corretor encontrado"
          description="Selecione outra imobiliária para ver a equipe."
        />
      )}
    </div>
  );
}
