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

  const changeAgency = (nextAgency: (typeof options)[number]["id"]) => {
    if (agency !== nextAgency) setAgency(nextAgency);
  };

  return (
    <div className="glass-panel flex w-full min-w-0 gap-1 rounded-full p-1 sm:max-w-xs">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          aria-pressed={agency === o.id}
          onPointerDown={(event) => {
            if (event.pointerType === "mouse" && event.button !== 0) return;
            changeAgency(o.id);
          }}
          onClick={() => changeAgency(o.id)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") changeAgency(o.id);
          }}
          style={
            agency === o.id
              ? { background: o.color, color: "#fff" }
              : undefined
          }
          className={cn(
            "min-w-0 flex-1 cursor-pointer truncate rounded-full px-3 py-1.5 text-[11px] font-semibold select-none touch-manipulation [-webkit-tap-highlight-color:transparent] transition-[background-color,color,box-shadow] duration-75 ease-out sm:text-xs",
            agency === o.id
              ? "shadow-[0_6px_18px_-6px_rgba(23,27,33,0.35)]"
              : "text-foreground/60 [@media(hover:hover)]:hover:text-foreground/85",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}