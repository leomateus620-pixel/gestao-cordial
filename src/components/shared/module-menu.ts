import {
  BarChart3,
  Building2,
  Calendar,
  FileText,
  Home,
  Inbox,
  LayoutGrid,
  UserCog,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type ModuleItem = {
  to: string;
  label: string;
  shortLabel?: string;
  desc: string;
  icon: LucideIcon;
  exact?: boolean;
  primary?: boolean;
};

export const moduleItems: ModuleItem[] = [
  {
    to: "/",
    label: "Início",
    shortLabel: "Início",
    desc: "Painel executivo",
    icon: Home,
    exact: true,
    primary: true,
  },
  {
    to: "/atendimentos",
    label: "Atendimentos",
    shortLabel: "Atend.",
    desc: "Funil e histórico",
    icon: Inbox,
    primary: true,
  },
  {
    to: "/imoveis",
    label: "Imóveis",
    shortLabel: "Imóveis",
    desc: "Portfólio ativo",
    icon: Building2,
    primary: true,
  },
  {
    to: "/agenda",
    label: "Agenda",
    shortLabel: "Agenda",
    desc: "Visitas e compromissos",
    icon: Calendar,
    primary: true,
  },
  {
    to: "/mais",
    label: "Mais",
    shortLabel: "Mais",
    desc: "Outros módulos",
    icon: LayoutGrid,
    primary: true,
  },
  { to: "/clientes", label: "Clientes", desc: "Cadastro e histórico", icon: Users },
  { to: "/corretores", label: "Corretores", desc: "Equipe e performance", icon: UserCog },
  { to: "/contratos", label: "Contratos", desc: "Vendas e aluguéis", icon: FileText },
  { to: "/financeiro", label: "Financeiro", desc: "Receita e comissões", icon: Wallet },
  { to: "/relatorios", label: "Relatórios", desc: "Indicadores e ranking", icon: BarChart3 },
];

export const primaryModuleItems = moduleItems.filter((item) => item.primary);
export const secondaryModuleItems = moduleItems.filter((item) => !item.primary);
