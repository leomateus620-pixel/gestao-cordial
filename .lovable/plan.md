
# Parte 2 — Aplicação da identidade visual nos módulos

Continuação visual da Parte 1. Sem mudar lógica, rotas, store, mocks ou framework. Foco: gráficos, badges/status, dashboard hero, notificações e componentes compartilhados que ainda usam paleta antiga.

## Estratégia

A maioria das telas (clientes, imóveis, contratos, vendas, aluguéis, agenda, corretores, documentos, integrações, configurações, marketing, relatórios, atendimentos, mais e detalhes) **já herda automaticamente** a nova identidade — usam `glass-panel`/`GlassCard`/`text-primary`/`bg-primary/*`/`<StatusBadge>`/`<MetricCard>`/`<Fab>`, todos remapeados na Parte 1.

Resta atualizar o que **não herda**:
1. cores hardcoded de gráfico (`hsl(...)` literais)
2. `StatusBadge` com paleta semântica explícita
3. `NotificationBell` com pílula de prioridade nova + badge cobre
4. `Fab` em cobre (ação comercial)
5. dashboard: hero premium + bloco Cordial×Morar usando cores contextuais (sem repintar a tela)
6. revisar 3-4 detalhes residuais (`text-amber-700`, `border-white/60`, etc.) onde a antiga paleta terracotta deixou rastro

## Mudanças por arquivo

### 1. Paleta única de gráficos — novo `src/lib/chart-palette.ts`

Constantes exportadas:
```ts
chartSystem   = "#1E647D"
chartCordial  = "#2B7FA3"
chartMorar    = "#E07A2E"
chartGraphite = "#2A3038"
chartMuted    = "#A0A6AD"
chartSuccess  = "#2F9E68"
chartWarning  = "#D6A437"
chartDanger   = "#C94C4C"
chartAccent   = "#D9782D"     // cobre
pieSeries     = [Cordial, Morar, system, graphite, muted]
gridStroke    = "rgba(23,27,33,0.06)"
axisTick      = { fontSize: 10, fill: "#6B7280" }
tooltipStyle  = { glass branco translúcido + border sistema + radius 12 + sombra suave }
```

### 2. `src/routes/_app.index.tsx` (dashboard)

- importar `chart-palette`; remover `chartColors`/`pieColors` locais
- Linhas/áreas/barras: Cordial → `chartCordial`, Morar → `chartMorar`, Total/Sistema/Receita → `chartSystem`, Comissão → `chartSuccess`, Em aberto → `chartDanger`
- Pie de origem dos leads: `pieSeries`
- `CartesianGrid stroke="rgba(80,40,20,0.06)"` → `gridStroke`
- Bloco Cordial×Morar: cada card recebe acento contextual (`context-cordial`/`context-morar`), badge de conversão muda de cor por imobiliária
- **Novo hero topo** (acima dos KPIs): card horizontal full-width com `system-gradient`, texto branco, título "Olá, {nome}", subtítulo, mini-resumo do dia (visitas hoje, atendimentos pendentes, contratos vencendo, previsão de entrada). Calcular tudo a partir de dados já presentes no componente — sem mudar `store`.

### 3. `src/routes/_app.financeiro.tsx`

Substituir os 3 `hsl(18 55% 50%)` por `chartSystem` (receita prevista) e revisar paleta interna do AreaChart para usar `chartSuccess` (recebido), `chartWarning` (pendente), `chartDanger` (atrasado).

### 4. `src/components/status-badge.tsx`

Reescrever mapa com paleta semântica:

```
Novo                 → info       (azul claro)
Em atendimento       → systemPrimary
Aguardando retorno   → warning    (âmbar)
Visita agendada      → indigo/cinza azulado (manter)
Proposta enviada     → accent     (cobre)
Negociação           → morar/laranja queimado
Fechado / Ativo / Pago / Disponível → success
Perdido / Atrasado   → danger
Arquivado / Encerrado / Vendido / Alugado → neutral
Pendente assinatura / Pendente / Reservado → warning
```

Implementar via tokens CSS já criados (`--success`, `--warning`, `--danger`, `--info`, `--neutral`, `--system-primary`, `--system-accent`, `--morar-primary`) com `style` inline para `background`/`color` (tom suave 14% opacidade no fundo + texto na cor cheia) — evita criar 9 classes Tailwind novas.

### 5. `src/components/notification-bell.tsx`

- contador no canto: vermelho → **cobre** (`var(--system-accent)`)
- mapa `priorityTone`:
  - alta → danger
  - media → accent (cobre)
  - baixa → info
- painel: `premium-card` (mais alinhado à Parte 1)
- ícone por tipo via `notificationLabels` (já existe) — sem mudar lógica

### 6. `src/components/fab.tsx`

`bg-primary` → `accent-button` (cobre). É ação comercial.

### 7. `src/components/section-header.tsx`

Adicionar variante de header de página com `description?: string` opcional renderizada abaixo do título. Listing pages que ainda renderizam um `<h1>` manual ganham consistência sem refactor. **Não vou trocar todas** — só deixar a prop pronta. Telas que já têm header próprio ficam intactas.

### 8. Ajustes pontuais residuais

`rg "text-amber-|text-orange-|text-red-|bg-red-500|border-white/60"` nos componentes shared/route — trocar onde for trivialmente substituível por token semântico. Limite: apenas componentes shared + dashboard + financeiro nesta etapa (resto fica para uma faxina futura, não bloqueia visual).

### 9. `src/components/shared/financial-summary-card.tsx`

- `text-emerald-700` → `var(--success)`
- `text-destructive` → `var(--danger)` (mantém o token shadcn que já remapeei)
- `text-foreground/70` para saídas: ok

### 10. `src/components/shared/metric-card.tsx`

`success`/`danger` tones já mapeados via classes Tailwind. Trocar `text-emerald-700`/`text-emerald-600` por classes baseadas em token (`text-[color:var(--success)]`).

## Validação

1. `bunx vite build` — corrigir tipagens
2. `rg "hsl\(18|hsl\(35|hsl\(160|hsl\(4 75"` — confirmar zero ocorrências residuais da paleta antiga
3. `rg "chartColors|pieColors" src/` — confirmar uso apenas via `chart-palette.ts`
4. Probe `/` e `/financeiro` via curl
5. Verificar que `routeTree.gen.ts` não foi tocado

## Arquivos a editar / criar

```
NEW  src/lib/chart-palette.ts
EDIT src/components/status-badge.tsx
EDIT src/components/notification-bell.tsx
EDIT src/components/fab.tsx
EDIT src/components/section-header.tsx
EDIT src/components/shared/metric-card.tsx
EDIT src/components/shared/financial-summary-card.tsx
EDIT src/components/shared/empty-state.tsx        (apenas ajuste do círculo do ícone)
EDIT src/routes/_app.index.tsx                    (hero + paleta gráfica + contexto)
EDIT src/routes/_app.financeiro.tsx               (paleta gráfica)
```

Total: 9 arquivos editados, 1 novo. Nenhuma rota tocada, nenhuma lógica mudada, nenhum mock alterado.

## Fora desta etapa (Parte 3, se necessário)

- Logo gráfica autoral (símbolo)
- Dark mode revisado para a nova paleta
- Refactor visual profundo das telas de detalhe (cliente, imóvel, contrato) — já funcionam com a Parte 1
- Aplicar `context-cordial`/`context-morar` automaticamente em cada card por `imobiliaria` (passa por mudança em vários cards de listagem — pode entrar em etapa dedicada)
- Faxina geral de `text-emerald-*`/`text-amber-*` espalhados em todas as 21 rotas
