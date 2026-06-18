## Polimento visual — Comparativo Cordial × Morar

Refinar o card "Comparativo das operações" no Dashboard (`src/routes/_app.index.tsx`, função `ComparativoCard` + helper `MiniStat`) para um visual mais premium, com hierarquia mais clara e identidade Cordial/Morar mais marcada — sem alterar dados, fonte (`dashboardComparativoCordialMorar`) ou layout responsivo (scroll mobile, grid 2 cols desktop).

### Mudanças visuais

**Container externo**
- Trocar o eyebrow "CORDIAL X MORAR" por um chip pequeno com ponto bicolor (azul Cordial + laranja Morar) + label, alinhado com o padrão dos outros cards do dashboard.
- Subtítulo "Atendimentos · conversão · receita" vira badge discreta com ícone (TrendingUp) à direita.
- Reduzir ruído do gradient externo (já glass) e padronizar com os ChartCards vizinhos.

**Cards Cordial / Morar**
- Header: nome da imobiliária maior (text-lg, font-bold) com um dot colorido antes; badge de conversão à direita ganha micro-sparkline visual (barra de progresso fina sob o valor, largura = conversão%).
- Trocar borda lateral 3px por um "rail" vertical com gradient (color → transparent) na lateral esquerda, mais elegante.
- MiniStats: aumentar contraste do número (text-xl, tabular-nums), label menor e mais clara; remover bg branco semi-opaco — usar apenas separadores verticais sutis entre as 3 stats (estilo "split row") para visual mais limpo e menos "caixinha dentro de caixinha".
- Receita prevista: virar destaque principal — número maior (text-2xl), com label "Receita prevista" + delta vs outra imobiliária (ex: Cordial mostra "+R$ 200k vs Morar" em verde/cinza). Origem dos contatos vira chip pequeno com ícone (Instagram/Users).
- Hover: leve elevação (translate-y + shadow intensificado), em vez de scale.

**Comparação cruzada (novo, sutil)**
- Pequena linha-resumo no rodapé do container externo: "Cordial lidera em atendimentos (+46) · Morar lidera em aluguéis (+6)" calculada a partir dos dados, em text-[11px] muted. Reforça o propósito "comparativo".

### Implementação técnica

- Edição única em `src/routes/_app.index.tsx`, escopo restrito a `ComparativoCard` e `MiniStat` (renomear para `StatCell`).
- Reutilizar `contextColors`, `brl`, `chartSystem` já importados; adicionar ícones do `lucide-react` (`TrendingUp`, `Instagram`, `Users`) — já usados no arquivo, sem novas deps.
- Manter `dashboardComparativoCordialMorar` intacto; deltas calculados inline via `reduce`.
- Sem alterar responsividade (snap horizontal mobile, `md:grid-cols-2` desktop) nem o slot `lg:col-span-2` no grid pai.
- Sem mexer em tokens globais nem em outros componentes.

### Validação

- Conferir render em 390px (mobile) e 1366px (desktop) no preview.
- Console sem erros; TS build limpo.