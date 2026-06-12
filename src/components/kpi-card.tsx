import { MetricCard } from "./shared/metric-card";

export function KpiCard({
  label,
  value,
  delta,
  tone = "default",
  accent,
}: {
  label: string;
  value: string;
  delta?: string;
  tone?: "default" | "primary";
  accent?: "up" | "down" | "neutral";
}) {
  return <MetricCard label={label} value={value} delta={delta} tone={tone} accent={accent} />;
}
