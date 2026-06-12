import { Bed, Maximize2 } from "lucide-react";
import type { Imovel } from "@/lib/mock/data";
import { brl } from "@/lib/format";
import { StatusBadge } from "@/components/status-badge";

export function PropertyCard({ property }: { property: Imovel }) {
  return (
    <article className="glass-panel overflow-hidden rounded-3xl">
      <img
        src={property.foto}
        alt={property.titulo}
        loading="lazy"
        className="aspect-[16/10] w-full object-cover"
      />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{property.titulo}</p>
            <p className="truncate text-[11px] text-foreground/55">
              {property.endereco} · {property.bairro}, {property.cidade}
            </p>
          </div>
          <StatusBadge status={property.status} />
        </div>
        <div className="mt-3 flex items-end justify-between">
          <div className="flex gap-3 text-[11px] text-foreground/60">
            <span className="flex items-center gap-1">
              <Bed className="size-3" />
              {property.quartos} qts
            </span>
            <span className="flex items-center gap-1">
              <Maximize2 className="size-3" />
              {property.area} m²
            </span>
            <span className="rounded-full bg-foreground/8 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-foreground/60">
              {property.finalidade}
            </span>
          </div>
          <p className="font-mono text-sm font-bold text-primary">
            {brl(property.valor)}
            {property.finalidade === "Aluguel" && (
              <span className="text-[10px] font-medium text-foreground/55">/mês</span>
            )}
          </p>
        </div>
      </div>
    </article>
  );
}
