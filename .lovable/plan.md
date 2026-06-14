Vou corrigir o delay investigando o problema como interação, não só como CSS.

Plano:
1. Ajustar `AgencySwitcher` para responder no início do toque/clique:
   - usar `onPointerDown`/`onKeyDown` de forma controlada em vez de depender só de `onClick`;
   - evitar disparo duplicado entre pointer e click;
   - manter acessibilidade por teclado.

2. Remover causas visuais de sensação de atraso:
   - reduzir/remover `active:scale` no seletor;
   - manter transição curta apenas no indicador visual;
   - evitar hover sticky em mobile.

3. Reduzir re-render desnecessário no dashboard:
   - substituir múltiplas assinaturas separadas do store por um seletor único para os dados usados na home;
   - preservar os cálculos e layout atuais, sem refazer o dashboard.

4. Validar no preview:
   - testar Cordial, Morar e Todas com clique único no mobile;
   - verificar console sem erros;
   - confirmar que a troca visual acontece imediatamente e que os cards/gráficos acompanham o filtro.