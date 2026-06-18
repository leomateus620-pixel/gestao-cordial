import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import type { ReactNode } from "react";
import {
  brokerOptions,
  clientPurposeOptions,
  clientStatusOptions,
  clientTypeOptions,
  leadOriginOptions,
  propertyTypeOptions,
} from "@/types/client";
import { defaultClientFilters, type ClientFilters as ClientFiltersState } from "@/hooks/useClients";
import { cn } from "@/lib/utils";

type AgencyFilter = "todas" | "cordial" | "morar";

const agencyOptions = [
  { value: "todas", label: "Todas" },
  { value: "cordial", label: "Cordial" },
  { value: "morar", label: "Morar" },
] as const;

const budgetOptions = [
  { value: "todos", label: "Faixa de valor" },
  { value: "ate_300", label: "Até R$ 300k / 3k" },
  { value: "300_700", label: "R$ 300k-700k / 3k-7k" },
  { value: "700_1500", label: "R$ 700k-1,5M / 7k-15k" },
  { value: "acima_1500", label: "Acima de R$ 1,5M / 15k" },
] as const;

export function ClientFilters({
  query,
  onQueryChange,
  agency,
  onAgencyChange,
  filters,
  onFiltersChange,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  agency: AgencyFilter;
  onAgencyChange: (value: AgencyFilter) => void;
  filters: ClientFiltersState;
  onFiltersChange: (filters: ClientFiltersState) => void;
}) {
  const isDefaultFilters = JSON.stringify(filters) === JSON.stringify(defaultClientFilters);

  return (
    <section className="space-y-3">
      <div className="glass-panel flex gap-1 rounded-full p-1">
        {agencyOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onAgencyChange(option.value)}
            className={cn(
              "flex-1 rounded-full px-3 py-2 text-xs font-semibold transition-all",
              agency === option.value
                ? "bg-teal-700 text-white shadow-md shadow-teal-900/18"
                : "text-foreground/58 hover:bg-white/50 hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="glass-panel flex items-center gap-2 rounded-2xl px-3 py-2.5">
        <Search className="size-4 text-teal-700/65" />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Buscar cliente..."
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/40"
        />
      </div>

      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
        <FilterShell icon={<SlidersHorizontal className="size-3.5" />}>
          <Select
            value={filters.clientType}
            onChange={(value) => onFiltersChange({ ...filters, clientType: value as never })}
          >
            <option value="todos">Tipo de cliente</option>
            {clientTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FilterShell>

        <FilterShell>
          <Select
            value={filters.purpose}
            onChange={(value) => onFiltersChange({ ...filters, purpose: value as never })}
          >
            <option value="todos">Finalidade</option>
            {clientPurposeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FilterShell>

        <FilterShell>
          <Select
            value={filters.propertyType}
            onChange={(value) => onFiltersChange({ ...filters, propertyType: value as never })}
          >
            <option value="todos">Tipo de imóvel</option>
            {propertyTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FilterShell>

        <FilterShell>
          <Select
            value={filters.status}
            onChange={(value) => onFiltersChange({ ...filters, status: value as never })}
          >
            <option value="todos">Status</option>
            {clientStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FilterShell>

        <FilterShell>
          <Select
            value={filters.broker}
            onChange={(value) => onFiltersChange({ ...filters, broker: value })}
          >
            <option value="todos">Corretor</option>
            {brokerOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </Select>
        </FilterShell>

        <FilterShell>
          <Select
            value={filters.origin}
            onChange={(value) => onFiltersChange({ ...filters, origin: value as never })}
          >
            <option value="todos">Origem</option>
            {leadOriginOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FilterShell>

        <FilterShell>
          <Select
            value={filters.budget}
            onChange={(value) => onFiltersChange({ ...filters, budget: value as never })}
          >
            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FilterShell>

        <button
          type="button"
          onClick={() => onFiltersChange(defaultClientFilters)}
          disabled={isDefaultFilters}
          className="glass-panel flex shrink-0 items-center gap-1.5 rounded-full px-3 text-xs font-semibold text-foreground/58 transition hover:text-foreground disabled:opacity-35"
        >
          <RotateCcw className="size-3.5" />
          Limpar
        </button>
      </div>
    </section>
  );
}

function FilterShell({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <label className="glass-panel flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs text-foreground/65">
      {icon}
      {children}
    </label>
  );
}

function Select({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="max-w-[11rem] bg-transparent text-xs font-semibold outline-none"
    >
      {children}
    </select>
  );
}
