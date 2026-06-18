## Validação Agenda PR — Polimento final

### O que está OK (validado por leitura de código)

- **Sidebar**: `Agenda` é item principal direto (`type: "item"`) em `sidebar-menu.tsx`, com ícone `CalendarCheck2` e descrição "Visitas, retornos e compromissos". Não aparece dentro de Painel nem Relacionamento. Tooltip funciona no modo colapsado. Drawer mobile herda do mesmo componente.
- **Bottom nav / mais**: `module-menu.ts` lista Agenda como `primary: true`, no mesmo nível de Início/Atendimentos/Imóveis/Mais.
- **Rota `/agenda`**: registrada via `createFileRoute("/_app/agenda")`, head com title. Header com gradient teal + chips "Equipe coordenada" / "Integrações preparadas". Subtítulo correto.
- **Sem FAB**: não há `<Fab>` na rota — ação principal é o `AgendaCreateCard`.
- **CreateCard**: gradient teal premium, chips Visita/Fotos/Retorno/Assinatura, animação 3D em `.agenda-create-card`, dim ao abrir via `opacity-65 pointer-events-none`.
- **Animação Dynamic Island**: keyframes `agenda-form-island-in/out` (380ms/170ms cubic-bezier), `transform-origin` adaptado para mobile (`50% 100%`), `--closing` aplicado via `requestClose` com setTimeout 170ms.
- **Formulário**: 5 blocos (Tipo/título, Data/horário, Vínculos, Responsáveis, Lembretes+checklist) com `fieldset disabled={!canEdit}`, validação via `validateAgendaEvent`, sugestão automática de título por tipo (`agendaTitleSuggestion`).
- **Edição**: mesmo modal reabre com `event` populado em `initialForm`, QuickActions Concluir/Reagendar/Cancelar disponíveis para `isEditing && canEdit`.
- **Permissão**: `canEditAgendaEvent` — admin sempre pode; corretor pode próprio/participante (estruturado, sem quebrar UX).
- **Lembretes/Checklist**: interno (gera lembrete real), e-mail/WhatsApp marcados como futuros (`canalFuturo: true`), checklist seed com os 6 itens sugeridos, salvamento local.
- **Integrações futuras**: `googleCalendarSyncStatus: "preparado"`, sem chamadas externas.
- **Normalização legada**: `normalizeAgendaEvent` mapeia `agendaEvents` brutos do store com fallback seguro de clientes/corretores/imóveis.
- **Adapter**: `addCompromisso` no store permanece (consumido por código legado), `NovoCompromissoSheet` ainda existe mas hoje não é importado em nenhuma rota — não atrapalha.
- **Card de evento**: horário em coluna fixa, badges tipo/status/prioridade, info grid (cliente, imóvel, local, responsável, participantes, lembrete), badge imobiliária, observação truncada, lock icon quando sem permissão.
- **Filtros**: chips de período (Hoje/7d/Mês/Todos/Personalizado), botão "Filtros" sempre visível com chevron, secundários colapsados por padrão, "Limpar" presente. Mobile compacto.
- **Summary cards**: 7 indicadores (Hoje, 7d, Visitas, Retornos, Fotos/Vídeos, Assinaturas, A confirmar) com scroll horizontal mobile + grid 7-col desktop.

### Polimentos a aplicar

1. **`AgendaCreateCard` — CTA mobile invisível**
   - O pill "Agendar" está em `hidden sm:flex`. No mobile, o usuário não vê call-to-action explícito.
   - Adicionar um botão-seta compacto (`grid size-10 rounded-full bg-white/14 ring-1 ring-white/20`) visível em mobile (`sm:hidden`), igual ao usado em `AtendimentoCreateCard`. O pill "Agendar" continua em `sm:flex` no desktop.

2. **`AgendaFormModal` — glass no desktop**
   - O `<form>` usa `bg-background` opaco. No desktop perde a sensação glass do resto do app.
   - Adicionar `sm:bg-background/96 sm:backdrop-blur-xl` ao container do form, alinhando com o que aplicamos em Clientes/Atendimentos.

3. **`AgendaFormModal` — QuickActions Concluir/Reagendar/Cancelar acessíveis no mobile**
   - Hoje o bloco está em `hidden lg:flex`, escondendo as ações no mobile/tablet durante edição.
   - Trocar para `flex flex-wrap` sem o `hidden lg:flex` e ajustar gap/padding para caber no rodapé mobile. Em viewports muito pequenos, manter ícones com label compacto.

4. **`AgendaFormModal` — `if (!open) return null` impede animação de saída**
   - Como `requestClose` aguarda 170ms antes de `onOpenChange(false)`, o componente fica montado durante o fade-out — mas se o pai fechar diretamente (Escape sendo intercept fora, por ex.), o modal desmonta seco. Implementar padrão `mounted`+`closing` igual ao `AtendimentoFormModal` para garantir animação consistente em qualquer fonte de fechamento.
   - Bônus: adicionar listener `Escape` para fechar com `requestClose`.

5. **Checklist `key` colidindo em adição rápida**
   - `check-${Date.now()}` pode colidir se o usuário adicionar dois itens no mesmo tick. Trocar por `check-${Date.now()}-${Math.random().toString(36).slice(2,6)}`. Bug raro mas trivial de blindar.

6. **`AgendaFilters` período personalizado no mobile**
   - Os dois inputs date ocupam coluna inteira no grid `grid-cols-2`. Garantir `col-span-1` em cada para ficarem lado a lado, e que o botão "Limpar" continue na linha final como `col-span-2`.

### Não fazer
- Sem remoção de `NovoCompromissoSheet` ou do legado `addCompromisso` no store (mantém adapter, conforme escopo).
- Sem mudanças em rotas vizinhas, identidade visual, cores ou layout do hero.
- Sem alterações em store, types ou services.

### Arquivos a alterar
- `src/components/agenda/AgendaCreateCard.tsx`
- `src/components/agenda/AgendaFormModal.tsx`
- `src/components/agenda/AgendaFilters.tsx`
