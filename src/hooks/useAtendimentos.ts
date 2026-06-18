import { useMemo } from "react";
import { useApp } from "@/store/app-store";
import { atendimentoMatchesAgency, atendimentoMatchesSearch } from "@/services/atendimentos";
import type {
  Atendimento,
  AtendimentoFinalidade,
  AtendimentoStatus,
  OrigemLeadAtendimento,
  PrioridadeAtendimento,
  TipoImovelInteresse,
} from "@/types/atendimento";

export type AtendimentoPeriodFilter = "todos" | "hoje" | "sete_dias" | "mes";

export type AtendimentoFilters = {
  status: "todos" | AtendimentoStatus;
  finalidade: "todos" | AtendimentoFinalidade;
  tipoImovel: "todos" | TipoImovelInteresse;
  origem: "todos" | OrigemLeadAtendimento;
  corretor: "todos" | string;
  prioridade: "todos" | PrioridadeAtendimento;
  periodo: AtendimentoPeriodFilter;
};

export const defaultAtendimentoFilters: AtendimentoFilters = {
  status: "todos",
  finalidade: "todos",
  tipoImovel: "todos",
  origem: "todos",
  corretor: "todos",
  prioridade: "todos",
  periodo: "todos",
};

export function useAtendimentos(query: string, filters: AtendimentoFilters) {
  const agency = useApp((state) => state.agency);
  const atendimentos = useApp((state) => state.atendimentos);
  const addAtendimento = useApp((state) => state.addAtendimento);
  const convertAtendimentoToCliente = useApp((state) => state.convertAtendimentoToCliente);

  const agencyAtendimentos = useMemo(
    () => atendimentos.filter((item) => atendimentoMatchesAgency(item, agency)),
    [agency, atendimentos],
  );

  const filteredAtendimentos = useMemo(
    () =>
      agencyAtendimentos.filter((item) => {
        if (!atendimentoMatchesSearch(item, query)) return false;
        if (filters.status !== "todos" && item.status !== filters.status) return false;
        if (filters.finalidade !== "todos" && item.finalidade !== filters.finalidade) return false;
        if (filters.tipoImovel !== "todos" && item.tipoImovel !== filters.tipoImovel) return false;
        if (filters.origem !== "todos" && item.origem !== filters.origem) return false;
        if (filters.prioridade !== "todos" && item.prioridade !== filters.prioridade) return false;
        if (filters.corretor !== "todos" && !matchesBroker(item, filters.corretor)) return false;
        if (!matchesPeriod(item, filters.periodo)) return false;
        return true;
      }),
    [agencyAtendimentos, filters, query],
  );

  const stats = useMemo(() => getAtendimentoStats(agencyAtendimentos), [agencyAtendimentos]);

  return {
    agency,
    atendimentos: agencyAtendimentos,
    filteredAtendimentos,
    stats,
    addAtendimento,
    convertAtendimentoToCliente,
  };
}

function getAtendimentoStats(atendimentos: Atendimento[]) {
  const status = atendimentos.reduce<Partial<Record<AtendimentoStatus, number>>>((acc, item) => {
    acc[item.status] = (acc[item.status] ?? 0) + 1;
    return acc;
  }, {});
  const budgetValues = atendimentos
    .map((item) => {
      if (item.orcamentoMin && item.orcamentoMax) {
        return (item.orcamentoMin + item.orcamentoMax) / 2;
      }
      return item.orcamentoMax ?? item.orcamentoMin;
    })
    .filter((value): value is number => typeof value === "number" && value > 0);
  const now = new Date();

  return {
    status,
    compra: atendimentos.filter(
      (item) => item.finalidade === "compra" || item.finalidade === "ambos",
    ).length,
    aluguel: atendimentos.filter(
      (item) => item.finalidade === "aluguel" || item.finalidade === "ambos",
    ).length,
    ticketMedio: budgetValues.length
      ? budgetValues.reduce((total, value) => total + value, 0) / budgetValues.length
      : 0,
    leadsMes: atendimentos.filter((item) => {
      const created = new Date(item.criadoEm);
      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
    }).length,
  };
}

function matchesBroker(item: Atendimento, broker: string) {
  if (item.corretorId === broker) return true;
  const name = normalizeText(item.corretorNome ?? "");
  return name.startsWith(normalizeText(broker));
}

function matchesPeriod(item: Atendimento, period: AtendimentoPeriodFilter) {
  if (period === "todos") return true;
  const created = new Date(item.criadoEm);
  if (Number.isNaN(created.getTime())) return false;
  const now = new Date();

  if (period === "hoje") return created.toDateString() === now.toDateString();
  if (period === "sete_dias") return now.getTime() - created.getTime() <= 7 * 24 * 60 * 60 * 1000;
  return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
}

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}
