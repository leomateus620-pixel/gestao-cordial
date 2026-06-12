import { useApp } from "@/store/app-store";
import { cn } from "@/lib/utils";

const options = [
  { id: "todas" as const, label: "Todas", color: "var(--system-primary)" },
  { id: "cordial" as const, label: "Cordial", color: "var(--cordial-primary)" },
  { id: "morar" as const, label: "Morar", color: "var(--morar-primary)" },
];

export function AgencySwitcher() {
  const agency = useApp((s) => s.agency);
  const setAgency = useApp((s) => s.setAgency);
  return (
    <div className="glass-panel flex gap-1 rounded-full p-1">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => setAgency(o.id)}
          style={
            agency === o.id
              ? { background: o.color, color: "#fff" }
              : undefined
          }
          className={cn(
            "flex-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
            agency === o.id
              ? "shadow-[0_6px_18px_-6px_rgba(23,27,33,0.35)]"
              : "text-foreground/60 hover:text-foreground/85",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}