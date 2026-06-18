import { Clock3, Home, ShoppingBag, Users, UserRoundCheck } from "lucide-react";

type ClientStats = {
  total: number;
  newThisMonth: number;
  rental: number;
  purchase: number;
  waiting: number;
};

const items = [
  { key: "total", label: "Total", icon: Users },
  { key: "newThisMonth", label: "Novos mês", icon: UserRoundCheck },
  { key: "rental", label: "Aluguel", icon: Home },
  { key: "purchase", label: "Compra", icon: ShoppingBag },
  { key: "waiting", label: "Retorno", icon: Clock3 },
] as const;

export function ClientSummaryCards({ stats }: { stats: ClientStats }) {
  return (
    <section className="grid grid-cols-2 gap-2 sm:grid-cols-5">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.key} className="glass-panel rounded-2xl px-3 py-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-foreground/48">
                {item.label}
              </span>
              <Icon className="size-3.5 text-teal-700/70" />
            </div>
            <p className="mt-1 font-mono text-lg font-semibold text-foreground">
              {stats[item.key]}
            </p>
          </div>
        );
      })}
    </section>
  );
}
