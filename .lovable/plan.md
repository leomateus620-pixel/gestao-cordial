## Objetivo
Limpar e consolidar o Gestão Cordial sem mudar identidade visual nem remover features. Foco: build verde, navegação única, store sem duplicidades, permissões cobrindo todos os módulos.

## Diagnóstico

**Conflitos encontrados durante a leitura:**

1. `src/components/app-shell.tsx` — usa ícones não importados (`KeyRound`, `BadgeDollarSign`, `Users`, `UserCog`, `FileText`, `Wallet`, `Megaphone`, `Cable`, `Settings`, `BarChart3`) e os itens do menu não preenchem o campo `module` exigido por `NavItem`.
2. **Duas listas de navegação concorrentes**: `src/components/sidebar-menu.tsx`, `src/components/shared/sidebar-menu.tsx` e `src/components/shared/module-menu.ts` — APIs diferentes, conjuntos diferentes de módulos, sem ligação com permissões.
3. `src/components/permission-guard.tsx` (modules/permissions) e `src/components/shared/permission-guard.tsx` (`allowed`) — APIs incompatíveis convivendo.
4. `src/lib/mock/permissions.ts` — `AppModule` não cobre `alugueis`, `vendas`, `marketing`, `documentos`, `configuracoes`; perfis não batem com a especificação.
5. `src/store/app-store.ts` — imports duplicados (`campanhasMarketingSeed`, `documentosSeed`, type `CampanhaMarketing`), campos duplicados em `State` (`documentos`, `campanhasMarketing`) e inicializações duplicadas no `create()`.
6. `src/components/notification-bell.tsx` — lê `state.notifications` e ações que não existem; store carrega `notificacoes` (tipo `Notificacao` do data.ts) e também tem `notificationsSeed` (tipo `AppNotification`). Duas fontes para a mesma coisa.
7. `src/lib/mock/data.ts` — chaves duplicadas em seeds (`creci`, `telefone`, `email`, `interesse`, `orcamento`…), unions duplicadas em `Cliente.origem`, `Imovel.condominio/iptu/vagas/documentos`, e seeds órfãos já parcialmente removidos. Também há duas declarações `documentosSeed`, `campanhasMarketingSeed` e `receitaMensal` (a 2ª foi renomeada como paliativo — vamos consolidar).
8. `src/routes/_app.index.tsx` — define localmente `MetricCard`, `ChartCard`, `FinancialSummaryCard` enquanto existem versões em `src/components/shared/`.
9. `src/routes/_app.mais.tsx` — lista própria de módulos, sem filtragem de permissão.
10. Sheets `novo-atendimento.tsx` e `novo-imovel.tsx` enviam tipos incompatíveis com `Atendimento.origem`, `Atendimento.historico` e `Imovel.documentos`.

## Passos de correção

### 1. Fonte única de módulos
Reescrever `src/components/shared/module-menu.ts` como a única lista de módulos do app, com 15 entradas (Dashboard, Atendimentos, Clientes, Imóveis, Aluguéis, Vendas, Contratos, Corretores, Agenda, Financeiro, Relatórios, Marketing, Documentos, Integrações, Configurações). Cada item terá: `to`, `label`, `shortLabel`, `description`, `icon`, `module: AppModule`, `exact?`, `primary?` (5 itens primários para a bottom nav: Início, Atendimentos, Imóveis, Agenda, Mais).

Adicionar helper `getVisibleModules(session)` que filtra por `session.modules`.

### 2. Permissões alinhadas
Em `src/lib/mock/permissions.ts`:
- Estender `AppModule` para incluir `alugueis`, `vendas`, `marketing`, `documentos`, `configuracoes`.
- Adicionar permissões correspondentes (`alugueis:read/write`, `vendas:read/write`, `marketing:read`, `documentos:read/write`, `configuracoes:manage`).
- Atualizar roles conforme spec:
  - **admin_owner**: tudo.
  - **secretaria**: dashboard, atendimentos, clientes, imoveis, agenda, documentos, contratos (read).
  - **corretor**: dashboard, atendimentos, clientes, imoveis, agenda, vendas, alugueis, contratos (read), comissão própria via `financeiro:read` filtrado na UI? Vamos manter sem `financeiro` no menu — comissão própria fica dentro da página de Corretores/Atendimentos.
  - **financeiro_admin**: dashboard, financeiro, contratos, relatorios, integracoes, documentos, clientes (read), cobranças.

### 3. `AppShell` consolidado
- Importar tudo de `module-menu.ts` (zero ícones soltos no arquivo).
- `SidebarMenu` (lateral desktop e drawer mobile) e bottom nav passam a consumir a mesma fonte e respeitam `session.modules`.
- Trocar o botão `Bell` placeholder do header desktop pelo `<NotificationBell />` real; adicionar também no header mobile.
- Manter shell, mesh, glass-panels e layout atuais — só corrigir o que está quebrado.

### 4. Reduzir duplicidade de `SidebarMenu`
- Manter **um** componente `SidebarMenu` em `src/components/sidebar-menu.tsx` (usa `module-menu.ts`, suporta `compact`, `onNavigate`, `variant?: "sidebar" | "list"`).
- Deletar `src/components/shared/sidebar-menu.tsx` (e remover qualquer import dele — nenhum hoje além do próprio app-shell, que será atualizado).

### 5. `PermissionGuard` único
- Manter `src/components/permission-guard.tsx` (modules/permissions + fallback). Já é o que as rotas importam.
- Deletar `src/components/shared/permission-guard.tsx`. Não há outros consumidores em rotas além de `_app.financeiro.tsx`, que continua usando a versão central.

### 6. Store sem duplicidades
Em `src/store/app-store.ts`:
- Limpar imports: cada símbolo entra **uma vez**.
- Tipo `State`: remover campos duplicados; manter `documentos: DocumentoOperacional[]` e `campanhasMarketing: CampanhaMarketing[]` apenas uma vez; renomear `notificacoes` → `notifications: AppNotification[]` (fonte única vinda de `mock/notifications`).
- Inicialização: remover linhas duplicadas; deixar uma única chave por campo.
- Adicionar ações `markNotificationRead(id)` e `markAllNotificationsRead()` (alteram `notifications[].read`).
- `useFiltered` continua igual.

### 7. `NotificationBell`
- Tipar `priorityTone` como `Record<NotificationPriority, string>` e indexar com cast seguro.
- Tipar `notificationTone` (ícones por `NotificationType`) idem com `Record<NotificationType, string>`.
- Consumir `notifications`, `markNotificationRead`, `markAllNotificationsRead` da store já corrigida.

### 8. `mock/data.ts` — limpeza de tipos e seeds
- `Cliente`: deixar apenas **uma** declaração de `origem` (a `OrigemLead`). Remover a segunda união literal.
- `Imovel`: remover duplicatas de `condominio`, `iptu`, `vagas`, `documentos` no type. `documentos` deve permanecer como `ImovelDocumento[]`.
- `Corretor`: nos seeds, remover a segunda chave `creci` em cada objeto (mantendo a CRECI-RS, mais coerente com Santa Rosa).
- `Cliente` seeds (cl1 etc.): remover linhas duplicadas (`telefone`, `email`, `tipo`, `interesse`, `orcamento`); preservar os valores mais completos (Santa Rosa).
- Remover o segundo bloco `documentosSeed`/`Documento` (linhas 1601–1640) e usar apenas `documentosSeed: DocumentoOperacional[]` da linha 1350. Atualizar `Notificacao`/`notificacoesSeed` legados: como o store passou a usar `AppNotification`, podemos remover `notificacoesSeed` e o type `Notificacao` daqui para não confundir; manter apenas se algum outro arquivo importar (nenhum hoje).
- Deletar o sufixo `Legado` introduzido como paliativo (`documentosLegadoSeed`, `campanhasMarketingLegadoSeed`, `receitaMensalLegado`) — substituídos pelas declarações originais.

### 9. Sheets
- `novo-atendimento.tsx`: tipar `origem` como `OrigemLead` (importar do data.ts) e `historico: []` (array vazio em vez de `string[]`); a string “Atendimento criado pelo formulário” vai como `observacoes` quando não preenchida.
- `novo-imovel.tsx`: mapear `documentos.split(',')` para `ImovelDocumento[]` (`{ id, nome, status: "Recebido" }`).

### 10. `_app.index.tsx` — usar shared
- Trocar `MetricCard`, `ChartCard`, `FinancialSummaryCard` locais pelas versões em `src/components/shared/`.
- Adaptar props (a shared `ChartCard` usa `eyebrow`, não `subtitle` — usar `subtitle` como `eyebrow` ou reapresentar como `SectionHeader`).
- Remover funções locais duplicadas.

### 11. `_app.mais.tsx`
- Substituir lista local por `getVisibleModules(session)` da fonte única e renderizar com o mesmo visual atual (glass panel + ícones).

### 12. `_app.financeiro.tsx`
- Re-envolver bloco "Integração Conta Azul" em `<PermissionGuard modules={["integracoes","financeiro"]}>` (a tag órfã foi simplificada no fix anterior; vamos restaurar a intenção correta).

### 13. `routeTree.gen.ts`
- É autogerado. Após criar/remover rotas (nenhuma rota nova nesta etapa), o plugin regenera. Verificar que todas as 15 páginas presentes em `src/routes/` continuam registradas após o build.

### 14. Build + lint direcionado
- Rodar `bun run build` até passar.
- Rodar `bunx prettier --write` nos arquivos tocados.
- Rodar `bunx eslint` nos arquivos tocados (relatar erros remanescentes, não corrigir fora do escopo).

## Fora de escopo (não vou mexer)
- Tokens visuais, mesh, glass utilities.
- Backend real, Lovable Cloud, Conta Azul real.
- Zustand/localStorage (mantido).
- Erros de TS/prettier antigos em arquivos não tocados.

## Entrega
Resumo final no chat com: arquivos alterados, conflitos encontrados/resolvidos, resultado do `bun run build`, resultado do lint direcionado, pendências.
