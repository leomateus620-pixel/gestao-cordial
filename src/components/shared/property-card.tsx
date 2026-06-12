import { Bed, MapPin, Maximize2 } from "lucide-react";
import type { Imovel } from "@/lib/mock/data";
import { brl } from "@/lib/format";
import { StatusBadge } from "@/components/status-badge";

export function PropertyCard({ property }: { property: Imovel }) {
  return (
    <article
      className="group overflow-hidden rounded-3xl transition-all duration-200 hover:scale-[1.01] hover:shadow-xl"
      style={{
        background:
          "linear-gradient(160deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.55) 100%)",
        backdropFilter: "blur(18px) saturate(145%)",
        border: "1px solid rgba(255,255,255,0.62)",
        boxShadow:
          "0 10px 30px -10px rgba(23,27,33,0.12), inset 0 1px 0 rgba(255,255,255,0.85)",
      }}
    >
      <div className="relative overflow-hidden">
        <img
          src={property.foto}
          alt={property.titulo}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {/* Badge de finalidade sobre a imagem */}
        <span className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
          {property.finalidade}
        </span>
        <div className="absolute right-3 top-3">
          <StatusBadge status={property.status} />
        </div>
      </div>
      <div className="p-4">
        <p className="truncate text-sm font-semibold leading-tight">{property.titulo}</p>
        <p className="mt-1 flex items-center gap-1 truncate text-[11px] text-foreground/50">
          <MapPin className="size-3 shrink-0" />
          {property.bairro}, {property.cidade}
        </p>
        <div className="mt-3 flex items-end justify-between gap-2">
          <div className="flex flex-wrap gap-2 text-[11px] text-foreground/55">
            <span className="flex items-center gap-1">
              <Bed className="size-3" />
              {property.quartos} qts
            </span>
            <span className="flex items-center gap-1">
              <Maximize2 className="size-3" />
              {property.area} m²
            </span>
          </div>
          <p className="shrink-0 font-mono text-sm font-bold text-primary">
            {brl(property.valor)}
            {property.finalidade === "Aluguel" && (
              <span className="text-[10px] font-medium text-foreground/50">/mês</span>
            )}
          </p>
        </div>
      </div>
    </article>
  );
}
