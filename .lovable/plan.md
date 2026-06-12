## Diagnóstico

O overlay mostra `Crawling result not available` vindo de `@tanstack/start-plugin-core/.../start-router-plugin/plugin.js`. Esse erro acontece quando o crawl interno do plugin de rotas trava — o plugin não consegue servir o `routeTree.gen.ts` transformado para o cliente, o que cascateia em 504 nos pré-bundles do Vite (react, react-dom, jsx-dev-runtime) e em "Failed to fetch dynamically imported module".

Verificações já feitas:
- `bunx vite build` roda **com sucesso** (sem erro de sintaxe, imports ou tipo).
- Todos os 21 route files estão presentes e o `routeTree.gen.ts` está consistente.
- Não há código fonte com problema — é estado travado do dev server.

## Ação

1. Reiniciar o dev server (`code--restart_dev_server`) para forçar o plugin do router a refazer o crawl do diretório `src/routes/` do zero.
2. Verificar o preview em `/login` para confirmar que o overlay sumiu.

## Fora de escopo

Sem alterações em código, dependências, config do Vite ou rotas. Caso o erro reapareça após o restart, aí sim investigamos um route file específico que esteja causando o travamento do crawler.