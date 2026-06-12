import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Building2,
  Clock3,
  FileText,
  HandCoins,
  Receipt,
  UsersRound,
} from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import { useApp } from "@/store/app-store";
import { brl } from "@/lib/format";

export const Route = createFileRoute("/_app/contratos/$contratoId")({ component: Page });

function Page() {
  const { contratoId } = Route.useParams();
  const contrato = useApp((s) => s.contratos.find((c) => c.id === contratoId));
  const clientes = useApp((s) => s.clientes);
  const imoveis = useApp((s) => s.imoveis);
  const corretores = useApp((s) => s.corretores);
  const lancamentos = useApp((s) => s.lancamentos);
  if (!contrato)
    return (
      <p className="glass-panel rounded-2xl p-6 text-center text-sm text-foreground/55">
        Contrato não encontrado.
      </p>
    );
  const cliente = clientes.find((c) => c.id === contrato.clienteId);
  const proprietario =
    clientes.find(
      (c) =>
        c.id ===
        (contrato.proprietarioId ??
          imoveis.find((i) => i.id === contrato.imovelId)?.proprietarioId),
    ) ?? clientes.find((c) => c.tipo === "Proprietário");
  const imovel = imoveis.find((i) => i.id === contrato.imovelId);
  const corretor = corretores.find((c) => c.id === contrato.corretorId);
  const comissao =
    contrato.tipo === "Venda"
      ? contrato.valor * ((contrato.comissaoPercentual ?? 5) / 100)
      : contrato.valor;
  const relacionados = lancamentos.filter((l) =>
    l.descricao
      .toLowerCase()
      .includes(imovel?.titulo.toLowerCase().split(" ")[0] ?? contrato.numero.toLowerCase()),
  );
  return (
    <div className="space-y-4">
      <Link
        to="/contratos"
        className="inline-flex items-center gap-2 text-xs font-semibold text-foreground/55"
      >
        <ArrowLeft className="size-4" /> Contratos
      </Link>
      <section className="glass-panel rounded-3xl p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-foreground/45">
              {contrato.numero}
            </p>
            <h2 className="text-2xl font-bold">Contrato de {contrato.tipo}</h2>
            <p className="text-sm text-foreground/55">{imovel?.titulo}</p>
          </div>
          <StatusBadge status={contrato.status} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
          <Metric label="Valor" value={brl(contrato.valor)} />
          <Metric label="Início" value={new Date(contrato.inicio).toLocaleDateString("pt-BR")} />
          <Metric label="Fim" value={new Date(contrato.fim).toLocaleDateString("pt-BR")} />
          <Metric
            label="Vencimento"
            value={contrato.diaVencimento ? `Dia ${contrato.diaVencimento}` : "Na assinatura"}
          />
        </div>
      </section>
      <Section title="Partes envolvidas" icon={UsersRound}>
        <Row title={cliente?.nome ?? "Cliente"} meta="Comprador/locatário" />
        <Row title={proprietario?.nome ?? "Proprietário a definir"} meta="Proprietário/vendedor" />
        <Row title={corretor?.nome ?? "Corretor"} meta={corretor?.creci ?? "CRECI"} />
      </Section>
      <Section title="Imóvel" icon={Building2}>
        <Link
          to="/imoveis/$imovelId"
          params={{ imovelId: contrato.imovelId }}
          className="block rounded-2xl bg-white/45 p-3 text-sm font-semibold"
        >
          {imovel?.titulo}
          <span className="block text-xs font-normal text-foreground/55">
            {imovel?.endereco} · {imovel?.area} m²
          </span>
        </Link>
      </Section>
      <Section title="Valores" icon={HandCoins}>
        <div className="grid grid-cols-2 gap-2">
          <Metric label="Sinal" value={brl(contrato.sinal ?? contrato.valor * 0.1)} />
          <Metric label="Comissão" value={brl(comissao)} />
          <Metric label="Repasse" value={brl(Math.max(contrato.valor - comissao, 0))} />
          <Metric label="Tipo" value={contrato.tipo} />
        </div>
      </Section>
      <Section title="Documentos" icon={FileText}>
        {(
          contrato.documentos ?? [
            "Minuta do contrato",
            "Documentos das partes",
            "Matrícula do imóvel",
            "Comprovantes de pagamento",
          ]
        ).map((d) => (
          <Row key={d} title={d} meta="mock anexado" />
        ))}
      </Section>
      <Section title="Histórico" icon={Clock3}>
        {(
          contrato.historico ?? [
            "Minuta criada",
            "Enviado para assinatura",
            "Conferência financeira pendente",
          ]
        ).map((h) => (
          <Row key={h} title={h} meta="linha do tempo" />
        ))}
      </Section>
      <Section title="Recebimentos e comissões" icon={Receipt}>
        {(relacionados.length
          ? relacionados
          : [
              {
                id: "mock",
                descricao: `Recebimento ${contrato.numero}`,
                valor: contrato.valor,
                status: "Pendente",
              },
            ]
        ).map((l) => (
          <Row key={l.id} title={l.descricao} meta={`${brl(l.valor)} · ${l.status}`} />
        ))}
      </Section>
    </div>
  );
}
function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof UsersRound;
  children: React.ReactNode;
}) {
  return (
    <section className="glass-panel rounded-3xl p-4">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-bold">
        <Icon className="size-4 text-primary" />
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/45 p-3">
      <p className="text-[10px] uppercase tracking-wider text-foreground/45">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
function Row({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="rounded-2xl bg-white/45 p-3 text-sm font-semibold">
      {title}
      <span className="block text-xs font-normal text-foreground/55">{meta}</span>
    </div>
  );
}
