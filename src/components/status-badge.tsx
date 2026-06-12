/**
 * StatusBadge — paleta semântica.
 * Empresa (Cordial/Morar) NÃO é status: use AgencyBadge se precisar.
 */

type Tone = {
  bg: string;
  fg: string;
};

const SUCCESS: Tone = { bg: "rgba(47,158,104,0.14)", fg: "#1f7a4d" };
const WARNING: Tone = { bg: "rgba(214,164,55,0.16)", fg: "#8a6a14" };
const DANGER: Tone = { bg: "rgba(201,76,76,0.14)", fg: "#a83838" };
const INFO: Tone = { bg: "rgba(59,130,160,0.14)", fg: "#235f7a" };
const NEUTRAL: Tone = { bg: "rgba(138,143,152,0.18)", fg: "#5a5f68" };
const SYSTEM: Tone = { bg: "rgba(30,100,125,0.14)", fg: "#174d61" };
const ACCENT: Tone = { bg: "rgba(217,120,45,0.16)", fg: "#9a4f17" };
const MORAR: Tone = { bg: "rgba(224,122,46,0.16)", fg: "#9a4f17" };
const INDIGO: Tone = { bg: "rgba(99,102,180,0.14)", fg: "#3b3f7a" };

const map: Record<string, Tone> = {
  // Imóveis
  Disponível: SUCCESS,
  Reservado: WARNING,
  Vendido: NEUTRAL,
  Alugado: NEUTRAL,
  // Atendimentos / funil
  Novo: INFO,
  "Em atendimento": SYSTEM,
  "Aguardando retorno": WARNING,
  "Visita agendada": INDIGO,
  "Proposta enviada": ACCENT,
  Negociação: MORAR,
  Proposta: ACCENT,
  Arquivado: NEUTRAL,
  Fechado: SUCCESS,
  Perdido: DANGER,
  // Contratos
  Ativo: SUCCESS,
  "Pendente assinatura": WARNING,
  Encerrado: NEUTRAL,
  // Financeiro
  Pago: SUCCESS,
  Pendente: WARNING,
  Atrasado: DANGER,
};

export function StatusBadge({ status }: { status: string }) {
  const tone = map[status] ?? NEUTRAL;
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
      style={{ background: tone.bg, color: tone.fg }}
    >
      {status}
    </span>
  );
}
