## Problema

No mobile, alternar entre Todas / Cordial / Morar exige dois toques e parece lento. Causas no `src/components/agency-switcher.tsx`:

1. **Double-tap** — o botão tem estado `hover:text-foreground/85`. Em iOS Safari, o primeiro toque dispara o hover (sticky hover); só o segundo dispara o click. Sem alvo `:hover` separado do estilo ativo, o tap precisa de duas interações.
2. **Lentidão percebida** — `transition-all` anima TODAS as propriedades (incluindo `background`, `color`, `box-shadow`, layout) com o default ~150ms, e o `box-shadow` pesado no estado ativo amplifica a sensação de delay. Não há feedback imediato no toque.
3. Falta `touch-action: manipulation` (remove o atraso de 300ms de "double-tap to zoom" em alguns contextos) e `-webkit-tap-highlight-color` transparente.

## Mudanças (apenas `src/components/agency-switcher.tsx`)

1. Trocar `transition-all` por `transition-[background-color,color,box-shadow] duration-150 ease-out` para animar só o necessário.
2. Adicionar `touch-action: manipulation`, `select-none`, `-webkit-tap-highlight-color: transparent` (via classe `[-webkit-tap-highlight-color:transparent]` e `touch-manipulation`).
3. Trocar `hover:text-foreground/85` por `hover:text-foreground/85 active:scale-[0.98]` e envolver a regra de hover em `@media (hover: hover)` usando a variante Tailwind `[@media(hover:hover)]:hover:text-foreground/85` para não disparar hover sticky em touch devices.
4. Adicionar `type="button"` já existe; garantir que o `onClick` é instantâneo (já é). Nenhuma mudança em estado/store.

Resultado: um único toque alterna a aba imediatamente, com transição curta e suave (~150ms) e sem hover preso em telas touch.

## Fora de escopo

Sem alterações em store, layout do dashboard, AppShell ou outros componentes.
