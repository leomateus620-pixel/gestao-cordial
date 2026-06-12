import type { ReactNode } from "react";
import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";
import { brl } from "@/lib/format";
import { GlassCard } from "./glass-card";

export function FinancialSummaryCard({
  title = "Resumo financeiro",
  entradas,
  saidas,
  pendente = 0,
  footer,
}: {
  title?: string;
  entradas: number;
  saidas: number;
  pendente?: number;
  footer?: ReactNode;
}) {
  const saldo = entradas - saidas;

  return (
    <GlassCard variant="strong" className="rounded-3xl" padding="lg">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{title}</p>
          <p className="mt-1 font-mono text-2xl font-bold text-foreground">
            {brl(saldo, { compact: true })}
          </p>
        </div>
        <div className="grid size-11 place-items-center rounded-2xl bg-primary/15 text-primary">
          <Wallet className="size-5" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <SummaryPill
          icon={<ArrowUpRight className="size-3" />}
          label="Entradas"
          value={entradas}
          tone="text-[color:var(--success)]"
        />
        <SummaryPill
          icon={<ArrowDownLeft className="size-3" />}
          label="Saídas"
          value={saidas}
          tone="text-foreground/70"
        />
        <SummaryPill label="Pend." value={pendente} tone="text-[color:var(--danger)]" />
      </div>
      {footer && (
        <div className="mt-4 border-t border-white/40 pt-3 text-[11px] text-foreground/60">
          {footer}
        </div>
      )}
    </GlassCard>
  );
}

function SummaryPill({
  icon,
  label,
  value,
  tone,
}: {
  icon?: ReactNode;
  label: string;
  value: number;
  tone: string;
}) {
  return (
    <div className="rounded-2xl bg-white/40 p-2">
      <p className="flex items-center gap-1 text-[9px] font-medium uppercase tracking-wider text-foreground/50">
        {icon}
        {label}
      </p>
      <p className={`mt-1 font-mono text-xs font-bold ${tone}`}>{brl(value, { compact: true })}</p>
    </div>
  );
}
