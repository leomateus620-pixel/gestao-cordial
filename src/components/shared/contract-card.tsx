import type { Cliente, Contrato, Imovel } from "@/lib/mock/data";
import { brl } from "@/lib/format";
import { StatusBadge } from "@/components/status-badge";
import { GlassCard } from "./glass-card";

export function ContractCard({
  contract,
  client,
  property,
}: {
  contract: Contrato;
  client?: Cliente;
  property?: Imovel;
}) {
  return (
    <GlassCard className="rounded-2xl">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-wider text-foreground/50">
            {contract.numero}
          </p>
          <p className="mt-0.5 truncate text-sm font-semibold">{property?.titulo}</p>
          <p className="truncate text-[11px] text-foreground/55">{client?.nome}</p>
        </div>
        <StatusBadge status={contract.status} />
      </div>
      <div className="mt-3 flex items-end justify-between border-t border-white/40 pt-3">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-foreground/45">{contract.tipo}</p>
          <p className="text-[11px] text-foreground/60">
            {new Date(contract.inicio).toLocaleDateString("pt-BR")}
            {contract.tipo === "Aluguel" && (
              <> → {new Date(contract.fim).toLocaleDateString("pt-BR")}</>
            )}
          </p>
        </div>
        <p className="font-mono text-sm font-bold text-primary">
          {brl(contract.valor)}
          {contract.tipo === "Aluguel" && (
            <span className="text-[10px] font-medium text-foreground/55">/mês</span>
          )}
        </p>
      </div>
    </GlassCard>
  );
}
