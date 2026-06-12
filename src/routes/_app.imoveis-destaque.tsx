import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Bed, Building2, Filter, Maximize2, MapPin, Search, Star } from "lucide-react";
import { useApp, useFiltered } from "@/store/app-store";
import { StatusBadge } from "@/components/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { brl } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/imoveis-destaque")({
  head: () => ({ meta: [{ title: "Imóveis em Destaque — Gestão Cordial" }] }),
  component: Page,
});

const finalidades = ["Todos", "Venda", "Aluguel"] as const;
const statusFiltros = ["Todos", "Disponível", "Reservado", "Em negociação"] as const;

function Page() {
  const [finalidade, setFinalidade] = useState<(typeof finalidades)[number]>("Todos");
  const [statusFiltro, setStatusFiltro] = useState<(typeof statusFiltros)[number]>("Todos");
  const [q, setQ] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const imoveis = useFiltered(useApp((s) => s.imoveis));

  const destaques = useMemo(() => {
    return imoveis
      .filter((i) => {
        if (finalidade !== "Todos" && i.finalidade !== finalidade) return false;
        if (statusFiltro !== "Todos" && i.status !== statusFiltro) return false;
        if (q) {
          const query = q.toLowerCase();
          return (
            i.titulo.toLowerCase().includes(query) ||
            i.bairro.toLowerCase().includes(query) ||
            i.cidade.toLowerCase().includes(query)
          );
        }
        return true;
      })
      .slice(0, 24);
  }, [imoveis, finalidade, statusFiltro, q]);

  return (
    <>
      {/* Hero da seção */}
      <section
        className="mb-5 overflow-hidden rounded-3xl p-5 text-white"
        style={{
          background: "linear-gradient(135deg, #174d61 0%, #1e647d 45%, #2a3038 100%)",
          boxShadow:
            "0 24px 60px -20px rgba(23,27,33,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="grid size-12 shrink-0 place-items-center rounded-2xl"
            style={{ background: "rgba(95,175,199,0.2)" }}
          >
            <Star className="size-6" style={{ color: "#f0a86d" }} />
          </div>
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-[0.24em]"
              style={{ color: "#f0a86d" }}
            >
              Carteira selecionada
            </p>
            <h1 className="text-xl font-semibold tracking-tight">Imóveis em Destaque</h1>
            <p className="mt-0.5 text-[12px] text-white/60">
              {destaques.length} imóvel{destaques.length !== 1 ? "is" : ""} encontrado
              {destaques.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </section>

      {/* Barra de busca */}
      <div
        className="mb-3 flex items-center gap-2 rounded-2xl px-3 py-2.5"
        style={{
          background: "rgba(255,255,255,0.65)",
          backdropFilter: "blur(18px) saturate(145%)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 4px 16px -8px rgba(23,27,33,0.08)",
        }}
      >
        <Search className="size-4 shrink-0 text-foreground/40" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por título, bairro ou cidade..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/35"
        />
        <button
          onClick={() => setShowFilters((v) => !v)}
          className={cn(
            "flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[11px] font-semibold transition-all",
            showFilters
              ? "bg-primary text-white"
              : "bg-foreground/6 text-foreground/60 hover:bg-foreground/10",
          )}
        >
          <Filter className="size-3.5" />
          Filtros
        </button>
      </div>

      {/* Filtros expandíveis */}
      {showFilters && (
        <div
          className="mb-4 rounded-2xl p-4"
          style={{
            background: "rgba(255,255,255,0.65)",
            backdropFilter: "blur(18px) saturate(145%)",
            border: "1px solid rgba(255,255,255,0.6)",
            boxShadow: "0 4px 16px -8px rgba(23,27,33,0.08)",
          }}
        >
          <div className="mb-3">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-foreground/50">
              Finalidade
            </p>
            <div className="flex flex-wrap gap-2">
              {finalidades.map((f) => (
                <button
                  key={f}
                  onClick={() => setFinalidade(f)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
                    finalidade === f
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "bg-white/60 text-foreground/60 hover:bg-white/80",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-foreground/50">
              Status
            </p>
            <div className="flex flex-wrap gap-2">
              {statusFiltros.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFiltro(s)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
                    statusFiltro === s
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "bg-white/60 text-foreground/60 hover:bg-white/80",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Grid de imóveis */}
      {destaques.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destaques.map((im) => (
            <Link
              key={im.id}
              to="/imoveis/$imovelId"
              params={{ imovelId: im.id }}
              className="group block"
            >
              <article
                className="overflow-hidden rounded-3xl transition-all duration-200 hover:scale-[1.01] hover:shadow-xl"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.58) 100%)",
                  backdropFilter: "blur(18px) saturate(145%)",
                  border: "1px solid rgba(255,255,255,0.65)",
                  boxShadow:
                    "0 10px 30px -10px rgba(23,27,33,0.12), inset 0 1px 0 rgba(255,255,255,0.85)",
                }}
              >
                {/* Imagem */}
                <div className="relative overflow-hidden">
                  <img
                    src={im.foto}
                    alt={im.titulo}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                  {/* Badges sobre a imagem */}
                  <div className="absolute left-3 top-3 flex gap-1.5">
                    <span className="rounded-full bg-black/40 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                      {im.finalidade}
                    </span>
                    {im.tipo && (
                      <span className="rounded-full bg-black/30 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                        {im.tipo}
                      </span>
                    )}
                  </div>
                  <div className="absolute right-3 top-3">
                    <StatusBadge status={im.status} />
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-4">
                  <p className="truncate text-sm font-semibold leading-tight">{im.titulo}</p>
                  <p className="mt-1 flex items-center gap-1 truncate text-[11px] text-foreground/50">
                    <MapPin className="size-3 shrink-0" />
                    {im.bairro}, {im.cidade}
                  </p>

                  {/* Características */}
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-foreground/55">
                    {im.quartos > 0 && (
                      <span className="flex items-center gap-1">
                        <Bed className="size-3" />
                        {im.quartos} qts
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Maximize2 className="size-3" />
                      {im.area} m²
                    </span>
                    <span className="flex items-center gap-1">
                      <Building2 className="size-3" />
                      {im.tipo}
                    </span>
                  </div>

                  {/* Preço */}
                  <div className="mt-3 flex items-end justify-between gap-2">
                    <p className="font-mono text-base font-bold text-primary">
                      {brl(im.valor)}
                      {im.finalidade === "Aluguel" && (
                        <span className="text-[11px] font-medium text-foreground/50">/mês</span>
                      )}
                    </p>
                    <span className="rounded-xl bg-primary/8 px-2.5 py-1 text-[10px] font-semibold text-primary">
                      Ver detalhes →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Nenhum imóvel encontrado"
          description="Ajuste os filtros ou a busca para ver mais resultados."
          icon={<Building2 className="size-5" />}
        />
      )}
    </>
  );
}
