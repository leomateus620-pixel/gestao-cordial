import edificioHarmonia from "@/assets/properties/edificio-harmonia.jpg";
import aptoJardins from "@/assets/properties/apto-jardins.jpg";
import casaBraganca from "@/assets/properties/casa-braganca.jpg";
import loftVilaMadalena from "@/assets/properties/loft-vila-madalena.jpg";
import coberturaItaim from "@/assets/properties/cobertura-itaim.jpg";
import casaVilaNova from "@/assets/properties/casa-vila-nova.jpg";

export type AgencyId = "cordial" | "morar";

export const agencies = [
  { id: "cordial" as const, nome: "Cordial Imóveis", cor: "var(--cordial)" },
  { id: "morar" as const, nome: "Morar Imóveis", cor: "var(--morar)" },
];

export type Corretor = {
  id: string;
  nome: string;
  iniciais: string;
  imobiliaria: AgencyId;
  creci: string;
  atendimentosMes: number;
  contratosFechados: number;
  comissaoMes: number;
};

export const corretoresSeed: Corretor[] = [
  {
    id: "c1",
    nome: "Marcos Lima",
    iniciais: "ML",
    imobiliaria: "cordial",
    creci: "CRECI-SP 123456",
    atendimentosMes: 18,
    contratosFechados: 4,
    comissaoMes: 12400,
  },
  {
    id: "c2",
    nome: "Paula Souza",
    iniciais: "PS",
    imobiliaria: "cordial",
    creci: "CRECI-SP 234567",
    atendimentosMes: 22,
    contratosFechados: 6,
    comissaoMes: 18900,
  },
  {
    id: "c3",
    nome: "Felipe Andrade",
    iniciais: "FA",
    imobiliaria: "morar",
    creci: "CRECI-SP 345678",
    atendimentosMes: 14,
    contratosFechados: 3,
    comissaoMes: 9200,
  },
  {
    id: "c4",
    nome: "Camila Reis",
    iniciais: "CR",
    imobiliaria: "morar",
    creci: "CRECI-SP 456789",
    atendimentosMes: 19,
    contratosFechados: 5,
    comissaoMes: 14800,
  },
];

export type Cliente = {
  id: string;
  nome: string;
  iniciais: string;
  telefone: string;
  email: string;
  tipo: "Comprador" | "Locatário" | "Vendedor" | "Proprietário";
  interesse: string;
  orcamento: number;
  imobiliaria: AgencyId;
  criadoEm: string;
};

export const clientesSeed: Cliente[] = [
  {
    id: "cl1",
    nome: "Ana Beatriz Moreira",
    iniciais: "AB",
    telefone: "(11) 98765-1234",
    email: "ana.beatriz@email.com",
    tipo: "Comprador",
    interesse: "Apartamento 2 quartos Jardins",
    orcamento: 1200000,
    imobiliaria: "cordial",
    criadoEm: "2026-05-21",
  },
  {
    id: "cl2",
    nome: "João Pedro Salles",
    iniciais: "JP",
    telefone: "(11) 99123-4567",
    email: "jp.salles@email.com",
    tipo: "Locatário",
    interesse: "Loft Vila Madalena",
    orcamento: 6500,
    imobiliaria: "cordial",
    criadoEm: "2026-06-01",
  },
  {
    id: "cl3",
    nome: "Marina Costa",
    iniciais: "MC",
    telefone: "(11) 97777-8888",
    email: "marina@email.com",
    tipo: "Comprador",
    interesse: "Casa Bragança",
    orcamento: 1800000,
    imobiliaria: "morar",
    criadoEm: "2026-06-04",
  },
  {
    id: "cl4",
    nome: "Ricardo Tavares",
    iniciais: "RT",
    telefone: "(11) 96666-5555",
    email: "rtavares@email.com",
    tipo: "Proprietário",
    interesse: "Listar cobertura Itaim",
    orcamento: 0,
    imobiliaria: "morar",
    criadoEm: "2026-05-15",
  },
  {
    id: "cl5",
    nome: "Beatriz Almeida",
    iniciais: "BA",
    telefone: "(11) 95555-4444",
    email: "bia.almeida@email.com",
    tipo: "Locatário",
    interesse: "Apto 3 quartos Pinheiros",
    orcamento: 8500,
    imobiliaria: "cordial",
    criadoEm: "2026-06-08",
  },
  {
    id: "cl6",
    nome: "Henrique Borges",
    iniciais: "HB",
    telefone: "(11) 94444-3333",
    email: "henrique.b@email.com",
    tipo: "Comprador",
    interesse: "Investimento 2 quartos",
    orcamento: 750000,
    imobiliaria: "morar",
    criadoEm: "2026-06-09",
  },
];

export type Imovel = {
  id: string;
  titulo: string;
  endereco: string;
  bairro: string;
  cidade: string;
  tipo: "Apartamento" | "Casa" | "Cobertura" | "Loft" | "Terreno";
  finalidade: "Venda" | "Aluguel";
  valor: number;
  quartos: number;
  area: number;
  status: "Disponível" | "Reservado" | "Vendido" | "Alugado";
  imobiliaria: AgencyId;
  foto: string;
};

export const imoveisSeed: Imovel[] = [
  {
    id: "im1",
    titulo: "Edifício Harmonia",
    endereco: "Rua Oscar Freire, 1200",
    bairro: "Jardins",
    cidade: "São Paulo",
    tipo: "Apartamento",
    finalidade: "Venda",
    valor: 2450000,
    quartos: 3,
    area: 142,
    status: "Disponível",
    imobiliaria: "cordial",
    foto: edificioHarmonia,
  },
  {
    id: "im2",
    titulo: "Apto Jardins Vista",
    endereco: "Al. Casa Branca, 450",
    bairro: "Jardins",
    cidade: "São Paulo",
    tipo: "Apartamento",
    finalidade: "Venda",
    valor: 1850000,
    quartos: 2,
    area: 98,
    status: "Disponível",
    imobiliaria: "cordial",
    foto: aptoJardins,
  },
  {
    id: "im3",
    titulo: "Casa de Campo Bragança",
    endereco: "Estrada do Campo, 88",
    bairro: "Condomínio Itahyê",
    cidade: "Bragança Paulista",
    tipo: "Casa",
    finalidade: "Venda",
    valor: 1980000,
    quartos: 4,
    area: 320,
    status: "Reservado",
    imobiliaria: "morar",
    foto: casaBraganca,
  },
  {
    id: "im4",
    titulo: "Loft Vila Madalena",
    endereco: "Rua Harmonia, 320",
    bairro: "Vila Madalena",
    cidade: "São Paulo",
    tipo: "Loft",
    finalidade: "Aluguel",
    valor: 6500,
    quartos: 1,
    area: 72,
    status: "Disponível",
    imobiliaria: "cordial",
    foto: loftVilaMadalena,
  },
  {
    id: "im5",
    titulo: "Cobertura Itaim",
    endereco: "Rua Bandeira Paulista, 760",
    bairro: "Itaim Bibi",
    cidade: "São Paulo",
    tipo: "Cobertura",
    finalidade: "Venda",
    valor: 4200000,
    quartos: 4,
    area: 280,
    status: "Disponível",
    imobiliaria: "morar",
    foto: coberturaItaim,
  },
  {
    id: "im6",
    titulo: "Casa Vila Nova",
    endereco: "Rua das Hortênsias, 145",
    bairro: "Vila Nova",
    cidade: "São Paulo",
    tipo: "Casa",
    finalidade: "Aluguel",
    valor: 9800,
    quartos: 3,
    area: 220,
    status: "Disponível",
    imobiliaria: "morar",
    foto: casaVilaNova,
  },
];

export type Atendimento = {
  id: string;
  clienteId: string;
  imovelId: string;
  corretorId: string;
  imobiliaria: AgencyId;
  status: "Aberto" | "Em visita" | "Proposta" | "Fechado" | "Perdido";
  observacoes: string;
  criadoEm: string;
};

export const atendimentosSeed: Atendimento[] = [
  {
    id: "a1",
    clienteId: "cl1",
    imovelId: "im1",
    corretorId: "c1",
    imobiliaria: "cordial",
    status: "Em visita",
    observacoes: "Visita marcada para sábado às 10h",
    criadoEm: "2026-06-10T13:50:00",
  },
  {
    id: "a2",
    clienteId: "cl2",
    imovelId: "im4",
    corretorId: "c2",
    imobiliaria: "cordial",
    status: "Proposta",
    observacoes: "Cliente fez proposta de R$ 6.000",
    criadoEm: "2026-06-11T09:15:00",
  },
  {
    id: "a3",
    clienteId: "cl3",
    imovelId: "im3",
    corretorId: "c3",
    imobiliaria: "morar",
    status: "Aberto",
    observacoes: "Primeiro contato via WhatsApp",
    criadoEm: "2026-06-11T11:30:00",
  },
  {
    id: "a4",
    clienteId: "cl5",
    imovelId: "im2",
    corretorId: "c2",
    imobiliaria: "cordial",
    status: "Fechado",
    observacoes: "Contrato assinado, comissão lançada",
    criadoEm: "2026-06-09T16:00:00",
  },
  {
    id: "a5",
    clienteId: "cl6",
    imovelId: "im6",
    corretorId: "c4",
    imobiliaria: "morar",
    status: "Em visita",
    observacoes: "Aguardando confirmação do cliente",
    criadoEm: "2026-06-11T08:45:00",
  },
];

export type Contrato = {
  id: string;
  numero: string;
  tipo: "Venda" | "Aluguel";
  clienteId: string;
  imovelId: string;
  corretorId: string;
  imobiliaria: AgencyId;
  valor: number;
  inicio: string;
  fim: string;
  status: "Ativo" | "Pendente assinatura" | "Encerrado";
};

export const contratosSeed: Contrato[] = [
  {
    id: "ct1",
    numero: "CRD-2026-001",
    tipo: "Venda",
    clienteId: "cl5",
    imovelId: "im2",
    corretorId: "c2",
    imobiliaria: "cordial",
    valor: 1850000,
    inicio: "2026-06-09",
    fim: "2026-06-09",
    status: "Ativo",
  },
  {
    id: "ct2",
    numero: "MOR-2026-014",
    tipo: "Aluguel",
    clienteId: "cl6",
    imovelId: "im6",
    corretorId: "c4",
    imobiliaria: "morar",
    valor: 9800,
    inicio: "2026-06-01",
    fim: "2027-06-01",
    status: "Ativo",
  },
  {
    id: "ct3",
    numero: "CRD-2026-002",
    tipo: "Aluguel",
    clienteId: "cl2",
    imovelId: "im4",
    corretorId: "c2",
    imobiliaria: "cordial",
    valor: 6500,
    inicio: "2026-06-15",
    fim: "2027-06-15",
    status: "Pendente assinatura",
  },
  {
    id: "ct4",
    numero: "MOR-2026-009",
    tipo: "Venda",
    clienteId: "cl3",
    imovelId: "im3",
    corretorId: "c3",
    imobiliaria: "morar",
    valor: 1980000,
    inicio: "2026-05-20",
    fim: "2026-05-20",
    status: "Pendente assinatura",
  },
];

export type Compromisso = {
  id: string;
  titulo: string;
  tipo: "Visita" | "Reunião" | "Vistoria" | "Assinatura";
  data: string; // ISO
  duracaoMin: number;
  clienteId?: string;
  imovelId?: string;
  corretorId: string;
  imobiliaria: AgencyId;
};

export const agendaSeed: Compromisso[] = [
  {
    id: "ag1",
    titulo: "Visita Edifício Harmonia",
    tipo: "Visita",
    data: "2026-06-13T10:00:00",
    duracaoMin: 60,
    clienteId: "cl1",
    imovelId: "im1",
    corretorId: "c1",
    imobiliaria: "cordial",
  },
  {
    id: "ag2",
    titulo: "Reunião proposta João Pedro",
    tipo: "Reunião",
    data: "2026-06-12T14:30:00",
    duracaoMin: 45,
    clienteId: "cl2",
    imovelId: "im4",
    corretorId: "c2",
    imobiliaria: "cordial",
  },
  {
    id: "ag3",
    titulo: "Vistoria Casa Bragança",
    tipo: "Vistoria",
    data: "2026-06-12T09:00:00",
    duracaoMin: 90,
    clienteId: "cl3",
    imovelId: "im3",
    corretorId: "c3",
    imobiliaria: "morar",
  },
  {
    id: "ag4",
    titulo: "Assinatura contrato MOR-2026-014",
    tipo: "Assinatura",
    data: "2026-06-11T17:00:00",
    duracaoMin: 30,
    clienteId: "cl6",
    imovelId: "im6",
    corretorId: "c4",
    imobiliaria: "morar",
  },
  {
    id: "ag5",
    titulo: "Visita Cobertura Itaim",
    tipo: "Visita",
    data: "2026-06-14T15:00:00",
    duracaoMin: 60,
    clienteId: "cl4",
    imovelId: "im5",
    corretorId: "c4",
    imobiliaria: "morar",
  },
];

export type Lancamento = {
  id: string;
  descricao: string;
  categoria: "Comissão" | "Aluguel recebido" | "Repasse" | "Despesa" | "Venda";
  valor: number;
  data: string;
  tipo: "entrada" | "saida";
  imobiliaria: AgencyId;
  status: "Pago" | "Pendente" | "Atrasado";
};

export const lancamentosSeed: Lancamento[] = [
  {
    id: "l1",
    descricao: "Comissão venda Apto Jardins Vista",
    categoria: "Comissão",
    valor: 92500,
    data: "2026-06-09",
    tipo: "entrada",
    imobiliaria: "cordial",
    status: "Pago",
  },
  {
    id: "l2",
    descricao: "Aluguel recebido — Loft Vila Madalena",
    categoria: "Aluguel recebido",
    valor: 6500,
    data: "2026-06-05",
    tipo: "entrada",
    imobiliaria: "cordial",
    status: "Pago",
  },
  {
    id: "l3",
    descricao: "Repasse proprietário — Casa Vila Nova",
    categoria: "Repasse",
    valor: 8820,
    data: "2026-06-07",
    tipo: "saida",
    imobiliaria: "morar",
    status: "Pago",
  },
  {
    id: "l4",
    descricao: "Comissão aluguel Casa Vila Nova",
    categoria: "Comissão",
    valor: 9800,
    data: "2026-06-01",
    tipo: "entrada",
    imobiliaria: "morar",
    status: "Pago",
  },
  {
    id: "l5",
    descricao: "Aluguel — Apto Pinheiros (cl5)",
    categoria: "Aluguel recebido",
    valor: 8500,
    data: "2026-06-10",
    tipo: "entrada",
    imobiliaria: "cordial",
    status: "Pendente",
  },
  {
    id: "l6",
    descricao: "Aluguel — Sala Comercial Faria Lima",
    categoria: "Aluguel recebido",
    valor: 12000,
    data: "2026-05-28",
    tipo: "entrada",
    imobiliaria: "morar",
    status: "Atrasado",
  },
];

export const receitaMensal = [
  { mes: "Jan", vendas: 28, alugueis: 14 },
  { mes: "Fev", vendas: 35, alugueis: 18 },
  { mes: "Mar", vendas: 22, alugueis: 16 },
  { mes: "Abr", vendas: 48, alugueis: 22 },
  { mes: "Mai", vendas: 62, alugueis: 24 },
  { mes: "Jun", vendas: 84, alugueis: 28 },
];
export type CampanhaMarketing = {
  id: string;
  nome: string;
  canal: "Instagram" | "Portais" | "E-mail" | "WhatsApp";
  objetivo: "Leads" | "Visitas" | "Captação";
  investimento: number;
  leads: number;
  status: "Ativa" | "Pausada" | "Planejada";
  imobiliaria: AgencyId;
};

export const campanhasMarketingSeed: CampanhaMarketing[] = [
  {
    id: "mk1",
    nome: "Open house Jardins",
    canal: "Instagram",
    objetivo: "Visitas",
    investimento: 1800,
    leads: 42,
    status: "Ativa",
    imobiliaria: "cordial",
  },
  {
    id: "mk2",
    nome: "Captação proprietários premium",
    canal: "E-mail",
    objetivo: "Captação",
    investimento: 950,
    leads: 18,
    status: "Planejada",
    imobiliaria: "cordial",
  },
  {
    id: "mk3",
    nome: "Casas em condomínio",
    canal: "Portais",
    objetivo: "Leads",
    investimento: 2400,
    leads: 56,
    status: "Ativa",
    imobiliaria: "morar",
  },
  {
    id: "mk4",
    nome: "Remarketing locação",
    canal: "WhatsApp",
    objetivo: "Leads",
    investimento: 620,
    leads: 31,
    status: "Pausada",
    imobiliaria: "morar",
  },
];

export type DocumentoOperacional = {
  id: string;
  titulo: string;
  categoria: "Contrato" | "Vistoria" | "Proposta" | "Cadastro";
  responsavel: string;
  atualizadoEm: string;
  status: "Assinado" | "Pendente" | "Em revisão";
  imobiliaria: AgencyId;
};

export const documentosSeed: DocumentoOperacional[] = [
  {
    id: "doc1",
    titulo: "Contrato CRD-2026-002",
    categoria: "Contrato",
    responsavel: "Paula Souza",
    atualizadoEm: "2026-06-11",
    status: "Pendente",
    imobiliaria: "cordial",
  },
  {
    id: "doc2",
    titulo: "Laudo Loft Vila Madalena",
    categoria: "Vistoria",
    responsavel: "Marcos Lima",
    atualizadoEm: "2026-06-10",
    status: "Em revisão",
    imobiliaria: "cordial",
  },
  {
    id: "doc3",
    titulo: "Proposta Casa Bragança",
    categoria: "Proposta",
    responsavel: "Felipe Andrade",
    atualizadoEm: "2026-06-08",
    status: "Assinado",
    imobiliaria: "morar",
  },
  {
    id: "doc4",
    titulo: "Cadastro proprietário Itaim",
    categoria: "Cadastro",
    responsavel: "Camila Reis",
    atualizadoEm: "2026-06-07",
    status: "Pendente",
    imobiliaria: "morar",
  },
];

export type IntegracaoOperacional = {
  id: string;
  nome: string;
  categoria: "Financeiro" | "Portais" | "Assinatura" | "Comunicação";
  sincronizacoes: number;
  ultimaSync: string;
  status: "Conectada" | "Atenção" | "Disponível";
  imobiliaria: AgencyId;
};

export const integracoesSeed: IntegracaoOperacional[] = [
  {
    id: "int1",
    nome: "Conta Azul",
    categoria: "Financeiro",
    sincronizacoes: 128,
    ultimaSync: "2026-06-12T08:30:00",
    status: "Conectada",
    imobiliaria: "cordial",
  },
  {
    id: "int2",
    nome: "Zap Imóveis",
    categoria: "Portais",
    sincronizacoes: 84,
    ultimaSync: "2026-06-12T07:45:00",
    status: "Conectada",
    imobiliaria: "cordial",
  },
  {
    id: "int3",
    nome: "DocuSign",
    categoria: "Assinatura",
    sincronizacoes: 23,
    ultimaSync: "2026-06-11T17:20:00",
    status: "Atenção",
    imobiliaria: "morar",
  },
  {
    id: "int4",
    nome: "WhatsApp Business",
    categoria: "Comunicação",
    sincronizacoes: 0,
    ultimaSync: "2026-06-01T09:00:00",
    status: "Disponível",
    imobiliaria: "morar",
  },
];

export type ConfiguracaoOperacional = {
  id: string;
  grupo: "Equipe" | "Comercial" | "Financeiro" | "Sistema";
  nome: string;
  valor: string;
  status: "Ativo" | "Revisar";
  imobiliaria: AgencyId;
};

export const configuracoesSeed: ConfiguracaoOperacional[] = [
  {
    id: "cfg1",
    grupo: "Equipe",
    nome: "Meta mensal de atendimentos",
    valor: "80 atendimentos",
    status: "Ativo",
    imobiliaria: "cordial",
  },
  {
    id: "cfg2",
    grupo: "Comercial",
    nome: "SLA para novos leads",
    valor: "15 minutos",
    status: "Ativo",
    imobiliaria: "cordial",
  },
  {
    id: "cfg3",
    grupo: "Financeiro",
    nome: "Dia padrão de repasse",
    valor: "Todo dia 7",
    status: "Revisar",
    imobiliaria: "morar",
  },
  {
    id: "cfg4",
    grupo: "Sistema",
    nome: "Assinatura digital obrigatória",
    valor: "Contratos de venda",
    status: "Ativo",
    imobiliaria: "morar",
  },
];
