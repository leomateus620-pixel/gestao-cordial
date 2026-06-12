/**
 * Paleta unificada para todos os gráficos (Recharts) do sistema.
 * Cordial = azul, Morar = laranja, Sistema = azul-petróleo, semânticos para status.
 */

export const chartSystem = "#1E647D";
export const chartCordial = "#2B7FA3";
export const chartMorar = "#E07A2E";
export const chartGraphite = "#2A3038";
export const chartMuted = "#A0A6AD";
export const chartSuccess = "#2F9E68";
export const chartWarning = "#D6A437";
export const chartDanger = "#C94C4C";
export const chartAccent = "#D9782D";

export const pieSeries = [
  chartCordial,
  chartMorar,
  chartSystem,
  chartGraphite,
  chartMuted,
];

export const gridStroke = "rgba(23,27,33,0.06)";

export const axisTick = { fontSize: 10, fill: "#6B7280" } as const;

export const tooltipStyle = {
  background: "rgba(255,255,255,0.94)",
  border: "1px solid rgba(255,255,255,0.7)",
  borderRadius: 12,
  fontSize: 11,
  boxShadow: "0 18px 40px -16px rgba(23,27,33,0.18)",
} as const;
