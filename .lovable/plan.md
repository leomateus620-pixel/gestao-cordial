# Polimento do módulo Agenciamentos

Revisão focada, sem reescrever módulos nem tocar em integrações externas (Drive, WhatsApp, banco real seguem fora). Mantém arquitetura, 3D e identidade visual atuais.

## 1. Hero `Agenciamentos` vira o ponto de entrada do cadastro
Arquivo: `src/routes/_app.agenciamentos.tsx`

- Adicionar CTA `Cadastrar agenciamento` (ícone `ClipboardCheck`/`Plus`) dentro do próprio `<section>` hero, ao lado dos `HeroPill` no desktop e abaixo dos pills no mobile (largura total confortável).
- CTA chama `openCreate`. Respeita permissão: se `!canCreate`, renderiza desabilitado (admin sempre vê; corretor sem permissão fica disabled; financeiro nem entra na rota).
- Botão com `bg-white text-[#174d61]`, hover/active sutis, `touch-action: manipulation`, foco acessível com `ring-cyan-200/55`. Sem clique no hero inteiro.

## 2. Remover card dedicado `Novo agenciamento`
- Remover render de `<AgenciamentoCreateCard />` em `_app.agenciamentos.tsx` e remover o import.
- Deletar `src/components/agenciamentos/AgenciamentoCreateCard.tsx` (sem outros consumidores) para evitar código morto.

## 3. Repaginar `AgenciamentoFormModal` (legibilidade premium)
Arquivo: `src/components/agenciamentos/AgenciamentoFormModal.tsx`

- Background do modal: trocar `bg-[#f7f3ed]` apagado por uma superfície mais quente e nítida (`bg-[#f4ece1]`/`#f1ebe0` + ring `ring-foreground/8`) com sombra mantida.
- Header: aumentar contraste do título (`text-foreground`), subtítulo `text-foreground/65`, eyebrow `text-primary`, divisor `border-foreground/10`, fundo `bg-white/75`.
- `inputClassName`: trocar `bg-white/[0.72]` por `bg-white`, borda `border-foreground/12`, texto `text-foreground`, placeholder `text-foreground/45`, foco `ring-2 ring-[color:var(--system-accent,#1e647d)]/30 border-primary/50`. Aplicar o mesmo padrão aos `SelectTrigger` (remover `bg-white/[0.72]`).
- `FormSection`: virar bloco branco (`bg-white`), `rounded-2xl`, `ring-1 ring-foreground/8`, sombra leve, com cabeçalho `step` em pill teal e título `text-foreground font-bold`. Manter ordem: 01 Imóvel, 02 Proprietário, 03 Responsável e data, 04 Checklist operacional, 05 Links e observações.
- `Field`: label `text-[11px] uppercase tracking-[0.16em] text-foreground/65 font-semibold`. Mensagem de erro `text-[var(--system-accent-dark)]`.
- Rodapé: barra sticky inferior com `bg-white/90 backdrop-blur border-t border-foreground/10`, padding seguro `pb-[max(env(safe-area-inset-bottom),1rem)]`. Botão principal teal (`bg-[#174d61] text-white hover:bg-[#1e647d]`) com loading e ícone `Save`. Cancelar `variant="ghost"`.
- Mobile: bottom-sheet mantém, header compacto, rodapé fixo sempre visível.

## 4. Checklist operacional mais claro
Mesmo modal + `AgenciamentoCard`/Drawer onde aparece resumo:

- Cada linha do checklist vira card branco com ícone à esquerda, switch à direita, label `text-foreground` e estado concluído com leve background verde-teal (`bg-emerald-500/8 ring-emerald-500/20`).
- Item `validado`: pill `Admin` ao lado do título; switch `disabled` quando `!canManage`, com tooltip/aria explicando.
- Atualizar resumo do checklist no `AgenciamentoCard` (barra de progresso com `bg-foreground/10` + preenchimento teal e texto `x/6`).

## 5. Cards e filtros — limpeza
- `AgenciamentoCard`: revisar hierarquia (título maior, status badge com contraste, proprietário em linha separada, ações em rodapé sem sobrepor checklist). Mover detalhes secundários (origem, observações longas) para o Drawer.
- `AgenciamentoFilters`: reduzir altura/spacing, agrupar avançados (checklist/tipo/período) atrás de um botão `Filtros` no mobile (`Sheet`), manter busca + status + corretor visíveis. Botão `Limpar` discreto.

## 6. Ranking, Dashboard e Corretores — não regredir
- `AgenciamentosRanking`: garantir compactação, sem truncar nomes, só admin.
- `_app.index.tsx`: confirmar que o resumo de agenciamentos só aparece para admin (`isAdminOwner`) e mantém o `skipDashboard` do passo anterior; números devem casar com `useAgenciamentos`.
- `useCorretores`: validar que métricas de agenciamentos não geram `undefined`; fallback para `0` quando ausente. Sem reescrever Corretores.

## 7. Permissões e normalização
- Reconfirmar em `useAgenciamentos`/`services/agenciamentos.ts`: admin (tudo + validar), corretor (próprios, sem validar final), financeiro (sem menu/rota), secretaria (segue regra atual).
- `app-store.ts`: ao reidratar, garantir fallback `agenciamentos: []`, `checklist` default completo, `links` opcionais como string vazia.

## 8. Performance e textos
- Manter `useMemo`/`useCallback` já presentes; adicionar `React.memo` em `AgenciamentoCard` se ainda não estiver.
- Reduzir `backdrop-blur` em overlays mobile (`sm:backdrop-blur-sm` apenas em ≥sm).
- Revisar textos visíveis no módulo para acentuação correta (imóvel, validação, proprietário, observações, descrição, região, formulário, gestão, mês) em hero, modal, checklist, cards, filtros, drawer e empty state.

## Validação final
- Rota `/agenciamentos` abre sem tela branca; CTA do hero abre modal; sem card dedicado.
- Modal legível, rodapé sempre visível mobile, checklist claro, validado bloqueado para corretor.
- Dashboard admin com resumo correto; Corretores sem regressão.
- Desktop 1366px e mobile 390px ok; console limpo.
