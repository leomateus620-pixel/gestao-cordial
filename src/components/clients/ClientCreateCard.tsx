import { ArrowUpRight, Sparkles, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

export function ClientCreateCard({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Criar cadastro"
      className={cn(
        "client-create-card group relative w-full overflow-hidden rounded-3xl p-4 text-left",
        "bg-[linear-gradient(135deg,rgba(11,84,88,0.96),rgba(13,108,103,0.92))] text-white",
        "shadow-xl shadow-teal-900/18 ring-1 ring-white/45",
        "transition-[opacity,transform,box-shadow] duration-300 ease-out",
        isOpen && "scale-[0.985] opacity-70",
      )}
    >
      <span className="absolute -right-7 -top-8 size-24 rounded-full bg-white/12 blur-2xl" />
      <span className="absolute bottom-0 left-8 h-1 w-20 rounded-full bg-amber-300/80 shadow-[0_0_22px_rgba(252,211,77,0.55)] transition-all duration-300 group-hover:w-32" />

      <div className="relative flex items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/16 shadow-inner ring-1 ring-white/20 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-3">
          <UserPlus className="size-5" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-teal-50/70">
            <Sparkles className="size-3 text-amber-200" />
            Central comercial
          </span>
          <span className="mt-1 block text-lg font-semibold tracking-tight">Criar cadastro</span>
          <span className="mt-1 block max-w-[34rem] text-xs leading-5 text-teal-50/78">
            Registre um novo cliente e entenda o perfil de busca para alimentar os relatórios
            comerciais.
          </span>
        </span>

        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/14 ring-1 ring-white/20 transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-amber-200 group-hover:text-teal-950">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </button>
  );
}
