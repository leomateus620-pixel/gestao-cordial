import type { Corretor } from "@/lib/mock/data";
import { brl } from "@/lib/format";
import { GlassCard } from "./glass-card";

export function BrokerCard({ broker }: { broker: Corretor }) {
  return (
    <GlassCard>
      <div className="flex items-center gap-3">
        <div className="grid size-12 shrink-0 place-items-center rounded-full bg-primary/12 text-sm font-bold text-primary">
          {broker.iniciais}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{broker.nome}</p>
          <p className="text-[11px] text-foreground/55">
            {broker.creci} · {broker.imobiliaria === "cordial" ? "Cordial" : "Morar"}
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <MiniMetric label="Atend." value={broker.atendimentosMes} />
        <MiniMetric label="Fechad." value={broker.contratosFechados} />
        <MiniMetric label="Comis." value={brl(broker.comissaoMes, { compact: true })} accent />
      </div>
    </GlassCard>
  );
}

function MiniMetric({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div className={accent ? "rounded-xl bg-primary/10 p-2" : "rounded-xl bg-white/40 p-2"}>
      <p
        className={
          accent
            ? "text-[9px] font-medium uppercase tracking-wider text-primary/80"
            : "text-[9px] font-medium uppercase tracking-wider text-foreground/50"
        }
      >
        {label}
      </p>
      <p
        className={
          accent
            ? "mt-0.5 font-mono text-base font-bold text-primary"
            : "mt-0.5 font-mono text-base font-bold"
        }
      >
        {value}
      </p>
    </div>
  );
}
