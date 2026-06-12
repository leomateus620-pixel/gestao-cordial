import { cn } from "@/lib/utils";

const map: Record<string, string> = {
  Disponível: "bg-emerald-500/10 text-emerald-700",
  Reservado: "bg-amber-500/15 text-amber-700",
  Vendido: "bg-stone-400/20 text-stone-700",
  Alugado: "bg-stone-400/20 text-stone-700",
  Novo: "bg-sky-500/15 text-sky-700",
  "Em atendimento": "bg-primary/15 text-primary",
  "Aguardando retorno": "bg-violet-500/15 text-violet-700",
  "Visita agendada": "bg-indigo-500/15 text-indigo-700",
  "Proposta enviada": "bg-amber-500/15 text-amber-700",
  Negociação: "bg-orange-500/15 text-orange-700",
  Arquivado: "bg-stone-400/20 text-stone-600",
  Fechado: "bg-emerald-500/15 text-emerald-700",
  Perdido: "bg-stone-400/20 text-stone-600",
  Ativo: "bg-emerald-500/15 text-emerald-700",
  "Pendente assinatura": "bg-amber-500/15 text-amber-700",
  Encerrado: "bg-stone-400/20 text-stone-700",
  Pago: "bg-emerald-500/15 text-emerald-700",
  Pendente: "bg-amber-500/15 text-amber-700",
  Atrasado: "bg-destructive/15 text-destructive",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider",
        map[status] ?? "bg-foreground/10 text-foreground/60",
      )}
    >
      {status}
    </span>
  );
}
