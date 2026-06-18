# Auditoria mobile — Gestão Cordial/Morar

Foco: deixar o mobile (≈390px) muito mais fluido em navegação, scroll, cliques, modais e filtros, **sem alterar o layout desktop, identidade visual premium, regras de negócio ou dados mock**.

## Gargalos identificados na auditoria

1. **Background animado pesado em todas as rotas** (`src/components/mesh-background.tsx`)
   - 3 blobs com `blur(110–130px)` em escala 70–80vw, animando `transform/scale` 22s em loop infinito → repaint contínuo de área enorme no mobile. Custo gigante de composição em GPUs móveis.

2. **Backdrop-filter em excesso** (`src/styles.css`)
   - `glass-panel`, `glass-panel-strong`, `liquid-panel`, `premium-card`, `sidebar-glass`, `bottom-nav-glass` todos com `backdrop-filter: blur(18–26px) saturate()`. Cards de cliente/atendimento/agenda usam `glass-panel` em **cada item da lista** → cada card faz blur de área atrás dele a cada frame de scroll.
   - Headers mobile e desktop adicionam `backdrop-blur-xl backdrop-saturate-150` ao rolar (`app-shell.tsx`).

3. **Listas sem memoização e sem `React.memo`** (`ClientList`, `AgendaTimeline`, `AtendimentoList`)
   - Cada filtro/busca/digitação re-renderiza todos os cards. `ClientCard`, `AtendimentoCard`, `AgendaEventCard` são pesados (≥160 linhas, vários `Badge`s, ícones lucide, classes utilitárias longas).

4. **Modais sempre montados** (`ClientFormModal` 628 linhas, `AtendimentoFormModal` 675, `AgendaFormModal` 1120)
   - Renderizados na árvore mesmo com `open=false`. Custo de mount + listeners de form state pesa, especialmente o de agenda (1120 linhas).

5. **Animações premium 3D em hover ativas no mobile**
   - `.client-create-card`, `.atendimento-create-card`, `.agenda-create-card` declaram `transform-style: preserve-3d` + `perspective(900–1000px)`. O bloco `@media (hover: none)` só zera o hover, mas o `preserve-3d` permanece — força camada de composição 3D em devices touch. Animações de modal usam `border-radius` animado, que é custoso.

6. **Scroll handler sem throttling no AppShell** — `window.scroll` dispara setState em todo scroll → re-render do header e dos botões/Link de avatar com classes condicionais.

7. **Sidebar mobile (Sheet) mantém-se na árvore com `SidebarMenu` interno** — `SidebarMenu` recomputa `visibleEntries`/`activeGroup` a cada render, e o Sheet do Radix mantém montado se controlado dessa forma.

8. **Bottom nav re-renderiza com cada mudança de pathname** chamando `getVisibleModules` sem memoização.

9. **`smooth scroll` global** (`html { scroll-behavior: smooth }`) deixa navegação entre rotas/âncoras lenta em mobile.

10. **Dashboard (`_app.index.tsx` 1162 linhas)** importa Recharts e múltiplos cards pesados no bundle inicial — atrasa hidratação no mobile.

11. **Filtros (`ClientFilters` 216, `AtendimentoFilters` 267, `AgendaFilters` 262)** com muitos chips sempre visíveis no mobile e re-render do pai a cada toggle (passados por callback inline).

## Mudanças propostas (somente otimização)

### A. CSS global — `src/styles.css`
- Adicionar bloco `@media (max-width: 768px)` que:
  - Reduz blur de `glass-panel`, `glass-panel-strong`, `liquid-panel`, `premium-card`, `bottom-nav-glass`, `sidebar-glass` para `blur(10px) saturate(120%)` (ou remove em listas).
  - Remove `transform-style: preserve-3d` e troca `perspective(...)` por `none` em `.client-create-card`, `.atendimento-create-card`, `.agenda-create-card`.
  - Reduz duração das animações de modal `client-/atendimento-/agenda-form-modal` para ≤200ms e remove animação de `border-radius`.
  - Aplica `scroll-behavior: auto` no html para mobile.
  - Adiciona `touch-action: manipulation` em botões/links principais via uma classe utilitária aplicada nos componentes-chave.
- Pausa `animate-mesh` em mobile via `@media (max-width: 768px) { .animate-mesh { animation: none; } }`.

### B. MeshBackground — `src/components/mesh-background.tsx`
- No mobile, renderizar apenas o gradiente base (sem os 3 blobs animados). Detectar via media query CSS (classes `hidden md:block` nos blobs). Mantém visual idêntico no desktop.

### C. AppShell — `src/components/app-shell.tsx`
- Memorizar `bottomNav` com `useMemo`.
- Throttle do scroll: usar `requestAnimationFrame` + early-return se valor não mudou.
- Render condicional do `<SheetContent>` (já é, mas garantir `forceMount` desligado) e desmontar `SidebarMenu` quando `mobileMenuOpen` for false (renderizar children apenas dentro de `{mobileMenuOpen && ...}` na prop `children` do Sheet — Radix Sheet já desmonta por padrão; só remover dependências caras).
- Reduzir blur do header mobile rolado para `backdrop-blur-md`.
- Adicionar `touch-action: manipulation` nos botões do header e bottom nav.

### D. Cards de lista — memoizar
- `React.memo` em `ClientCard`, `AtendimentoCard`, `AgendaEventCard`.
- `ClientList`, `AgendaTimeline`, lista de atendimentos: extrair `Link`+card como componente memoizado; passar `client`/`event` como prop estável.
- Hooks `useClients`, `useAgenda`, `useAtendimentos`: garantir que `filteredX`/`stats` venham de `useMemo` com dependências corretas (verificar e ajustar onde faltar).

### E. Modais — montar sob demanda
- Em `_app.clientes.tsx`, `_app.agenda.tsx`, `_app.atendimentos.tsx`: renderizar `<XFormModal />` apenas quando `open` (ou via `{open && <Modal .../>}`) para evitar carregar/montar formulário pesado em cada navegação para a rota.
- Lazy-load os modais grandes com `React.lazy` + `Suspense` (especialmente `AgendaFormModal` 1120 linhas).

### F. Filtros mobile
- Em `ClientFilters`, `AtendimentoFilters`, `AgendaFilters`: no mobile, manter visíveis somente busca + chip de status principal; demais filtros entram em um `<Sheet>` "Mais filtros". Já existe `filter-sheet.tsx` reutilizável.
- `useCallback` nos handlers de toggle para que `React.memo` nos componentes filhos surta efeito.

### G. Bottom nav
- Memoizar `bottomNav` items e a função de `active` por item. Substituir `pathname.startsWith` por checagem memoizada.

### H. Dashboard (`_app.index.tsx`)
- Lazy-load das seções pesadas com gráficos (Recharts) usando `React.lazy` + `Suspense` com skeleton leve. Não alterar conteúdo/layout — apenas split.

### I. Scroll containers
- Auditar e remover `overflow-y` aninhado dentro do `<main>` em rotas mobile. Garantir que apenas o body/main role.
- Trocar `min-h-screen` por `min-h-dvh` no container principal de `AppShell` para evitar pulo com barra de URL do iOS.

## Não será alterado

- Identidade visual, paletas, tipografia, animações desktop, layout dos cards.
- Lógica de Clientes/Atendimentos/Agenda, store Zustand (apenas leitura/escrita preservadas), mocks, integrações.
- Estrutura de rotas, sidebar desktop, formulários, regras de permissão.

## Arquivos previstos para edição

```
src/styles.css
src/components/mesh-background.tsx
src/components/app-shell.tsx
src/components/sidebar-menu.tsx              (memoização leve)
src/components/clients/ClientCard.tsx        (React.memo wrapper)
src/components/clients/ClientList.tsx
src/components/clients/ClientFilters.tsx     (mobile: agrupar em sheet)
src/components/atendimentos/AtendimentoCard.tsx
src/components/atendimentos/AtendimentoFilters.tsx
src/components/agenda/AgendaEventCard.tsx
src/components/agenda/AgendaTimeline.tsx
src/components/agenda/AgendaFilters.tsx
src/routes/_app.clientes.tsx                 (modal sob demanda)
src/routes/_app.atendimentos.tsx             (modal sob demanda)
src/routes/_app.agenda.tsx                   (modal sob demanda + lazy)
src/routes/_app.index.tsx                    (lazy de seções com Recharts)
src/hooks/useClients.ts | useAgenda.ts | useAtendimentos.ts  (garantir useMemo)
```

## Validação final

- Build passa, sem novos erros TS/ESLint.
- Preview mobile 390px: navegação, scroll, abrir/fechar drawer, bottom nav, abrir/fechar modais de Novo Cliente/Atendimento/Compromisso, filtros — todos com resposta visível mais rápida.
- Desktop ≥1280px: header, sidebar expandida/recolhida, cards e modais permanecem com efeitos premium e 3D originais.
- Console sem warnings novos.
- Relatório final listando: gargalos encontrados, arquivos alterados, otimizações aplicadas, estado do desktop e do mobile.
