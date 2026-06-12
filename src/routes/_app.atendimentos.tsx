import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  CalendarPlus,
  CheckCircle2,
  Clock3,
  History,
  Inbox,
  Link2,
  Search,
  UserPlus,
  UserRoundCog,
  XCircle,
} from "lucide-react";
import { useApp, useFiltered } from "@/store/app-store";
import { StatusBadge } from "@/components/status-badge";
import { Fab } from "@/components/fab";
import { NovoAtendimentoSheet } from "@/components/sheets/novo-atendimento";
import { timeAgo } from "@/lib/format";
import { EmptyState } from "@/components/shared/empty-state";
import { cn } from "@/lib/utils";

const statuses = [
  "Todos",
  "Novo",
  "Em atendimento",
  "Aguardando retorno",
  "Visita agendada",
  "Proposta enviada",
  "Negociação",
  "Fechado",
  "Perdido",
  "Arquivado",
] as const;

const actions = [
  { label: "Transformar em cliente", icon: UserPlus },
  { label: "Vincular corretor", icon: UserRoundCog },
  { label: "Criar visita", icon: CalendarPlus },
  { label: "Criar tarefa de retorno", icon: Clock3 },
  { label: "Registrar histórico", icon: History },
  { label: "Marcar motivo de perda", icon: XCircle },
] as const;

export const Route = createFileRoute("/_app/atendimentos")({
  head: () => ({ meta: [{ title: "Atendimentos — Gestão Cordial" }] }),
  component: Page,
});

function Page() {
  const [open, setOpen] = useState(false);
  const [filtro, setFiltro] = useState<(typeof statuses)[number]>("Todos");
  const [q, setQ] = useState("");
  const atendimentos = useFiltered(useApp((s) => s.atendimentos));
  const clientes = useApp((s) => s.clientes);
  const corretores = useApp((s) => s.corretores);
  const imoveis = useApp((s) => s.imoveis);

  const list = useMemo(() => {
    return atendimentos.filter((a) => {
      if (filtro !== "Todos" && a.status !== filtro) return false;
      if (!q) return true;
      const query = q.toLowerCase();
      const cli = clientes.find((c) => c.id === a.clienteId)?.nome.toLowerCase() ?? "";
      const im = imoveis.find((i) => i.id === a.imovelId)?.titulo.toLowerCase() ?? "";
      return cli.includes(query) || im.includes(query) || a.status.toLowerCase().includes(query);
    });
  }, [atendimentos, filtro, q, clientes, imoveis]);

  const totals = statuses.slice(1).map((status) => ({
    status,
    total: atendimentos.filter((a) => a.status === status).length,
  }));

  return (
    <>
      {/* Hero */}
      <section
        className="mb-4 overflow-hidden rounded-3xl p-5 text-white"
        style={{
          background: "linear-gradient(135deg, #174d61 0%, #1e647d 45%, #2a3038 100%)",
          boxShadow:
            "0 24px 60px -20px rgba(23,27,33,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="grid size-12 shrink-0 place-items-center rounded-2xl"
            style={{ background: "rgba(95,175,199,0.2)" }}
          >
            <Inbox className="size-6" style={{ color: "#f0a86d" }} />
          </div>
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-[0.24em]"
              style={{ color: "#f0a86d" }}
            >
              Funil de atendimento
            </p>
            <h1 className="text-xl font-semibold tracking-tight">Atendimentos</h1>
            <p className="mt-0.5 text-[12px] text-white/60">
              {list.length} resultado{list.length !== 1 ? "s" : ""} encontrado
              {list.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </section>

      {/* Barra de busca */}
      <div
        className="mb-3 flex items-center gap-2 rounded-2xl px-3 py-2.5"
        style={{
          background: "rgba(255,255,255,0.65)",
          backdropFilter: "blur(18px) saturate(145%)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 4px 16px -8px rgba(23,27,33,0.08)",
        }}
      >
        <Search className="size-4 shrink-0 text-foreground/40" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar cliente, imóvel ou status..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/35"
        />
      </div>

      {/* Filtros de status */}
      <div className="no-scrollbar -mx-4 mb-4 flex gap-2 overflow-x-auto px-4">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFiltro(s)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
              filtro === s
                ? "bg-primary text-white shadow-md shadow-primary/25"
                : "bg-white/60 text-foreground/60 hover:bg-white/80",
            )}
            style={
              filtro !== s
                ? {
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.55)",
                  }
                : undefined
            }
          >
            {s}
          </button>
        ))}
      </div>

      {/* Totais por status */}
      <div className="mb-4 grid grid-cols-3 gap-2 md:grid-cols-9">
        {totals.map((item) => (
          <button
            key={item.status}
            onClick={() => setFiltro(item.status as (typeof statuses)[number])}
            className={cn(
              "rounded-2xl p-2.5 text-center transition-all hover:scale-[1.02]",
              filtro === item.status ? "bg-primary/12 ring-1 ring-primary/30" : "",
            )}
            style={{
              background:
                filtro === item.status
                  ? "rgba(30,100,125,0.1)"
                  : "rgba(255,255,255,0.55)",
              backdropFilter: "blur(14px) saturate(140%)",
              border: "1px solid rgba(255,255,255,0.55)",
              boxShadow: "0 4px 12px -6px rgba(23,27,33,0.08)",
            }}
          >
            <p className="text-base font-bold text-primary">{item.total}</p>
            <p className="mt-0.5 truncate text-[9px] font-semibold uppercase tracking-tighter text-foreground/45">
              {item.status}
            </p>
          </button>
        ))}
      </div>

      {/* Lista de atendimentos */}
      <div className="space-y-3">
        {list.map((a) => {
          const cli = clientes.find((c) => c.id === a.clienteId);
          const cor = corretores.find((c) => c.id === a.corretorId);
          const im = imoveis.find((i) => i.id === a.imovelId);
          return (
            <div
              key={a.id}
              className="rounded-2xl p-4 transition-all hover:scale-[1.005]"
              style={{
                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.52) 100%)",
                backdropFilter: "blur(18px) saturate(145%)",
                border: "1px solid rgba(255,255,255,0.6)",
                boxShadow:
                  "0 8px 24px -8px rgba(23,27,33,0.1), inset 0 1px 0 rgba(255,255,255,0.8)",
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/12 text-[11px] font-bold text-primary">
                    {cli?.iniciais}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{cli?.nome}</p>
                    <p className="truncate text-[11px] text-foreground/55">{im?.titulo}</p>
                    <p className="mt-0.5 text-[10px] text-foreground/40">
                      Corretor: {cor?.nome} · Origem: {a.origem ?? "WhatsApp"}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <StatusBadge status={a.status} />
                  <p className="mt-1 font-mono text-[9px] text-foreground/40">
                    {timeAgo(a.criadoEm)}
                  </p>
                </div>
              </div>

              {a.observacoes && (
                <p className="mt-3 rounded-xl bg-white/45 p-2.5 text-[11px] leading-relaxed text-foreground/60">
                  {a.observacoes}
                </p>
              )}

              <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3">
                {actions.map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    className="flex items-center gap-1.5 rounded-xl bg-white/50 px-2.5 py-2 text-left text-[10px] font-semibold text-foreground/60 transition-all hover:bg-primary/10 hover:text-primary hover:scale-[1.02]"
                  >
                    <Icon className="size-3.5 shrink-0" />
                    <span className="truncate">{label}</span>
                  </button>
                ))}
              </div>

              {a.status === "Perdido" && (
                <div className="mt-3 flex items-center gap-1.5 rounded-xl bg-destructive/8 px-3 py-2 text-[10px] font-medium text-destructive">
                  <Link2 className="size-3 shrink-0" />
                  Motivo: {a.motivoPerda ?? "Preço acima do orçamento"}
                </div>
              )}
              {a.status === "Fechado" && (
                <div className="mt-3 flex items-center gap-1.5 rounded-xl bg-emerald-500/8 px-3 py-2 text-[10px] font-medium text-emerald-700">
                  <CheckCircle2 className="size-3 shrink-0" />
                  Cliente pronto para contrato e comissão.
                </div>
              )}
            </div>
          );
        })}
        {list.length === 0 && (
          <EmptyState
            title="Nenhum atendimento encontrado"
            description="Ajuste a busca ou o status selecionado."
            icon={<Inbox className="size-5" />}
          />
        )}
      </div>

      <Fab onClick={() => setOpen(true)} label="Novo atendimento" />
      <NovoAtendimentoSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
