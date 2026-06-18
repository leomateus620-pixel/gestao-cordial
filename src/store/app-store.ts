import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  agendaSeed,
  alugueisSeed,
  atendimentosSeed,
  campanhasMarketingSeed,
  clientesSeed,
  configuracoesSeed,
  contratosSeed,
  corretoresSeed,
  documentosSeed,
  imoveisSeed,
  integracoesContaAzulSeed,
  integracoesSeed,
  lancamentosSeed,
  permissoesSeed,
  projecoesFinanceirasSeed,
  usuariosSistemaSeed,
  vendasSeed,
  type AgencyId,
  type Aluguel,
  type CampanhaMarketing,
  type Cliente,
  type Compromisso,
  type ConfiguracaoOperacional,
  type Contrato,
  type Corretor,
  type DocumentoOperacional,
  type Imovel,
  type IntegracaoContaAzul,
  type IntegracaoOperacional,
  type Lancamento,
  type Permissao,
  type ProjecaoFinanceira,
  type UsuarioSistema,
  type Venda,
} from "@/lib/mock/data";
import { notificationsSeed, type AppNotification } from "@/lib/mock/notifications";
import { createStoreClientRecord, normalizeStoreClient } from "@/services/clients";
import {
  atendimentoToClientInput,
  createAtendimentoRecord,
  normalizeAtendimento,
} from "@/services/atendimentos";
import type { Atendimento, AtendimentoCreateInput } from "@/types/atendimento";
import type { ClientCreateInput } from "@/types/client";

type AgencyFilter = AgencyId | "todas";

type State = {
  agency: AgencyFilter;
  clientes: Cliente[];
  imoveis: Imovel[];
  corretores: Corretor[];
  atendimentos: Atendimento[];
  contratos: Contrato[];
  agenda: Compromisso[];
  lancamentos: Lancamento[];
  alugueis: Aluguel[];
  vendas: Venda[];
  campanhasMarketing: CampanhaMarketing[];
  documentos: DocumentoOperacional[];
  integracoes: IntegracaoOperacional[];
  configuracoes: ConfiguracaoOperacional[];
  integracoesContaAzul: IntegracaoContaAzul[];
  permissoes: Permissao[];
  usuariosSistema: UsuarioSistema[];
  projecoesFinanceiras: ProjecaoFinanceira[];
  notifications: AppNotification[];
  setAgency: (a: AgencyFilter) => void;
  addCliente: (c: ClientCreateInput) => void;
  addImovel: (i: Omit<Imovel, "id">) => void;
  addAtendimento: (a: AtendimentoCreateInput) => void;
  convertAtendimentoToCliente: (id: string) => string | undefined;
  addCompromisso: (c: Omit<Compromisso, "id">) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
};

const id = () => Math.random().toString(36).slice(2, 10);
const normalizedAtendimentosSeed = atendimentosSeed.map((atendimento) =>
  normalizeAtendimento(atendimento, {
    clientes: clientesSeed,
    corretores: corretoresSeed,
    imoveis: imoveisSeed,
  }),
);

export const useApp = create<State>()(
  persist(
    (set) => ({
      agency: "todas",
      clientes: clientesSeed,
      imoveis: imoveisSeed,
      corretores: corretoresSeed,
      atendimentos: normalizedAtendimentosSeed,
      contratos: contratosSeed,
      agenda: agendaSeed,
      lancamentos: lancamentosSeed,
      alugueis: alugueisSeed,
      vendas: vendasSeed,
      campanhasMarketing: campanhasMarketingSeed,
      documentos: documentosSeed,
      integracoes: integracoesSeed,
      configuracoes: configuracoesSeed,
      integracoesContaAzul: integracoesContaAzulSeed,
      permissoes: permissoesSeed,
      usuariosSistema: usuariosSistemaSeed,
      projecoesFinanceiras: projecoesFinanceirasSeed,
      notifications: notificationsSeed,
      setAgency: (agency) => set({ agency }),
      addCliente: (c) =>
        set((s) => ({
          clientes: [createStoreClientRecord(c), ...s.clientes],
        })),
      addImovel: (i) => set((s) => ({ imoveis: [{ ...i, id: id() }, ...s.imoveis] })),
      addAtendimento: (a) =>
        set((s) => ({
          atendimentos: [createAtendimentoRecord(a), ...s.atendimentos],
        })),
      convertAtendimentoToCliente: (atendimentoId) => {
        let convertedClientId: string | undefined;
        set((s) => {
          const atendimento = s.atendimentos.find((item) => item.id === atendimentoId);
          if (!atendimento) return s;

          const alreadyLinked = atendimento.clienteConvertidoId ?? atendimento.clienteId;
          if (alreadyLinked) {
            convertedClientId = alreadyLinked;
            return {
              ...s,
              atendimentos: s.atendimentos.map((item) =>
                item.id === atendimentoId
                  ? {
                      ...item,
                      convertidoEmCliente: true,
                      clienteConvertidoId: alreadyLinked,
                      atualizadoEm: new Date().toISOString(),
                    }
                  : item,
              ),
            };
          }

          const phoneDigits = atendimento.telefone.replace(/\D/g, "");
          const existingClient = s.clientes.find((cliente) => {
            const raw = cliente as Cliente & { phone?: string; fullName?: string };
            const clientPhone = (raw.telefone ?? raw.phone ?? "").replace(/\D/g, "");
            return (
              (phoneDigits.length >= 10 && clientPhone === phoneDigits) ||
              (raw.nome ?? raw.fullName ?? "").toLowerCase() ===
                atendimento.clienteNome.toLowerCase()
            );
          });

          const newClient = existingClient
            ? undefined
            : createStoreClientRecord(atendimentoToClientInput(atendimento));
          convertedClientId = existingClient?.id ?? newClient?.id;
          if (!convertedClientId) return s;

          const timestamp = new Date().toISOString();
          return {
            ...s,
            clientes: newClient ? [newClient, ...s.clientes] : s.clientes,
            atendimentos: s.atendimentos.map((item) =>
              item.id === atendimentoId
                ? {
                    ...item,
                    clienteId: convertedClientId,
                    convertidoEmCliente: true,
                    clienteConvertidoId: convertedClientId,
                    atualizadoEm: timestamp,
                    historico: [
                      ...item.historico,
                      {
                        id: `hist-${item.id}-${Date.now()}`,
                        data: timestamp,
                        descricao: newClient
                          ? "Atendimento transformado em novo cadastro de cliente."
                          : "Atendimento vinculado a um cadastro de cliente existente.",
                        responsavelId: item.corretorId,
                        tipo: "status" as const,
                      },
                    ],
                  }
                : item,
            ),
          };
        });
        return convertedClientId;
      },
      addCompromisso: (c) => set((s) => ({ agenda: [{ ...c, id: id() }, ...s.agenda] })),
      markNotificationRead: (nid) =>
        set((s) => ({
          notifications: s.notifications.map((n) => (n.id === nid ? { ...n, read: true } : n)),
        })),
      markAllNotificationsRead: () =>
        set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
    }),
    {
      name: "gc.store.v1",
      merge: (persisted, current) => {
        const persistedState = persisted as Partial<State> | undefined;
        const clientes = (persistedState?.clientes ?? current.clientes).map((cliente) =>
          normalizeStoreClient(cliente),
        );
        const corretores = persistedState?.corretores ?? current.corretores;
        const imoveis = persistedState?.imoveis ?? current.imoveis;
        const rawAtendimentos =
          (persistedState as { atendimentos?: unknown[] } | undefined)?.atendimentos ??
          current.atendimentos;

        return {
          ...current,
          ...persistedState,
          clientes,
          corretores,
          imoveis,
          atendimentos: rawAtendimentos.map((atendimento) =>
            normalizeAtendimento(atendimento, { clientes, corretores, imoveis }),
          ),
        };
      },
    },
  ),
);

export function useFiltered<T extends { imobiliaria: AgencyId | "ambas" }>(items: T[]): T[] {
  const agency = useApp((s) => s.agency);
  return agency === "todas"
    ? items
    : items.filter((i) => i.imobiliaria === agency || i.imobiliaria === "ambas");
}
