import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  CloudCog,
  DatabaseZap,
  DownloadCloud,
  FileWarning,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PermissionGuard } from "@/components/permission-guard";
import { SectionHeader } from "@/components/section-header";
import { brl } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/integracoes")({
  head: () => ({ meta: [{ title: "Integrações — Gestão Cordial" }] }),
  component: Page,
});

const logs = [
  {
    time: "12/06/2026 08:45",
    type: "success",
    message: "Pré-validação local concluiu 42 lançamentos mockados.",
  },
  {
    time: "12/06/2026 08:47",
    type: "warning",
    message: "3 cobranças simuladas sem CPF/CNPJ para envio futuro.",
  },
  {
    time: "12/06/2026 08:50",
    type: "info",
    message: "Nenhuma chamada externa realizada: ambiente em modo demonstração.",
  },
];

const imported = [
  { label: "Clientes importados", value: "128", detail: "cadastros prontos para conciliação" },
  { label: "Contratos mapeados", value: "34", detail: "locação, venda e administração" },
  {
    label: "Lançamentos simulados",
    value: brl(247300, { compact: true }),
    detail: "receitas, repasses e comissões",
  },
];

const errors = [
  "Token OAuth expirado (simulado): aguardando fluxo oficial Conta Azul.",
  "Webhook de baixa automática pendente de backend/Supabase Edge Functions.",
  "RLS futura deverá separar Cordial Imóveis e Morar Imóveis por imobiliária.",
];

function Page() {
  return (
    <PermissionGuard
      modules={["integracoes"]}
      fallback={
        <section className="glass-panel-strong rounded-3xl p-6 text-center">
          <ShieldCheck className="mx-auto mb-3 size-9 text-primary" />
          <h2 className="text-lg font-semibold">Integrações restritas</h2>
          <p className="mt-2 text-sm text-foreground/60">
            Este mock fica disponível para Administrador/Proprietário e Financeiro/Administrativo. A
            regra final será protegida por Supabase Auth e RLS.
          </p>
        </section>
      }
    >
      <section className="glass-panel-strong mb-5 rounded-3xl p-5">
        <div className="flex items-start gap-4">
          <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sky-500/15 text-sky-700">
            <CloudCog className="size-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-semibold tracking-tight">Conta Azul</h1>
              <Badge className="rounded-full bg-amber-500/15 text-amber-700 hover:bg-amber-500/15">
                Mock sem API real
              </Badge>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-foreground/65">
              Estrutura visual dedicada à integração financeira com Conta Azul. Os dados abaixo são
              simulados e deixam a tela preparada para uma etapa futura com Supabase, RLS, OAuth e
              sincronização oficial.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-5 grid gap-3 md:grid-cols-3">
        <div className="glass-panel rounded-3xl p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-foreground/50">
            Status
          </p>
          <div className="mt-3 flex items-center gap-2 text-emerald-700">
            <CheckCircle2 className="size-5" />
            <span className="text-sm font-semibold">Conexão simulada ativa</span>
          </div>
        </div>
        <div className="glass-panel rounded-3xl p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-foreground/50">
            Última sincronização
          </p>
          <p className="mt-3 text-sm font-semibold">12/06/2026 às 08:50</p>
          <p className="text-[11px] text-foreground/55">Registro local, sem tráfego externo.</p>
        </div>
        <div className="glass-panel rounded-3xl p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-foreground/50">
            Próxima etapa
          </p>
          <p className="mt-3 text-sm font-semibold">Conectar OAuth Conta Azul</p>
          <p className="text-[11px] text-foreground/55">Após backend e políticas RLS.</p>
        </div>
      </section>

      <section className="glass-panel mb-6 rounded-3xl p-5">
        <SectionHeader title="Ações mockadas" />
        <div className="grid gap-2 md:grid-cols-3">
          <Button className="rounded-2xl" type="button">
            <RefreshCw className="size-4" /> Sincronizar agora
          </Button>
          <Button className="rounded-2xl" variant="secondary" type="button">
            <DownloadCloud className="size-4" /> Importar lançamentos
          </Button>
          <Button className="rounded-2xl" variant="outline" type="button">
            <DatabaseZap className="size-4" /> Testar mapeamento
          </Button>
        </div>
        <p className="mt-3 text-[11px] text-foreground/55">
          Botões sem efeito externo: servem apenas para validar fluxo, cópia e layout antes da
          implementação real.
        </p>
      </section>

      <section className="mb-6">
        <SectionHeader title="Dados importados no mock" />
        <div className="grid gap-3 md:grid-cols-3">
          {imported.map((item) => (
            <div key={item.label} className="glass-panel rounded-3xl p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-foreground/50">
                {item.label}
              </p>
              <p className="mt-2 text-2xl font-bold text-primary">{item.value}</p>
              <p className="mt-1 text-[11px] text-foreground/55">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6 grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
        <div className="glass-panel rounded-3xl p-5">
          <SectionHeader title="Logs simulados" />
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.message} className="flex gap-3 rounded-2xl bg-white/45 p-3">
                <span
                  className={cn(
                    "mt-1 size-2 rounded-full",
                    log.type === "success" && "bg-emerald-500",
                    log.type === "warning" && "bg-amber-500",
                    log.type === "info" && "bg-sky-500",
                  )}
                />
                <div>
                  <p className="text-[10px] font-semibold text-foreground/45">{log.time}</p>
                  <p className="mt-0.5 text-sm text-foreground/75">{log.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-5">
          <SectionHeader title="Erros e pendências" />
          <div className="space-y-2">
            {errors.map((error) => (
              <div key={error} className="flex gap-2 rounded-2xl bg-red-500/8 p-3 text-red-800">
                <FileWarning className="mt-0.5 size-4 shrink-0" />
                <p className="text-xs leading-relaxed">{error}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-3xl p-5">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-700" />
          <p className="text-sm leading-relaxed text-foreground/65">
            Nenhuma credencial, token ou endpoint real foi adicionado. A integração efetiva com
            Conta Azul deve ser feita somente após definição de backend, armazenamento seguro de
            segredos e políticas Supabase/RLS por perfil e imobiliária.
          </p>
        </div>
      </section>
    </PermissionGuard>
  );
}
