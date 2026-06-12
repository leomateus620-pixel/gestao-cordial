import { Mail, Phone } from "lucide-react";
import type { Cliente } from "@/lib/mock/data";
import { brl } from "@/lib/format";
import { GlassCard } from "./glass-card";

export function ClientCard({ client }: { client: Cliente }) {
  return (
    <GlassCard className="rounded-2xl" padding="sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/12 text-xs font-bold text-primary">
            {client.iniciais}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{client.nome}</p>
            <p className="truncate text-[11px] text-foreground/55">{client.interesse}</p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
          {client.tipo}
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-white/40 pt-2 text-[11px] text-foreground/60">
        <span className="flex items-center gap-1">
          <Phone className="size-3" />
          {client.telefone}
        </span>
        {client.orcamento > 0 && (
          <span className="font-mono font-semibold text-foreground/80">
            {brl(client.orcamento, { compact: true })}
          </span>
        )}
      </div>
      {client.email && (
        <div className="mt-1 flex items-center gap-1 text-[11px] text-foreground/55">
          <Mail className="size-3" />
          {client.email}
        </div>
      )}
    </GlassCard>
  );
}
