# Trivia Club

Recriação do Trivia Game com **React 19, TypeScript e Vite**, em português e com layout responsivo.

## Executar

Requer Node.js 20.19+ ou 22.12+.

```sh
npm install
npm run dev
```

- `npm run build`: verifica os tipos e gera a versão de produção em `dist/`.
- `npm run preview`: serve o build localmente.
- `npm test`: verifica pontuação, integridade das respostas, filtros e embaralhamento.

## Funcionalidades

- Perfil com apelido e avatar Gravatar opcional.
- Perguntas em português no banco local, sem necessidade de API durante a partida.
- Integração opcional com Open Trivia DB (perguntas em inglês), com timeout e mensagens de erro.
- Categoria, dificuldade, formato e quantidade configuráveis (1–50).
- 30 segundos por pergunta, calculados por prazo real, inclusive ao trocar de aba.
- Pontuação original: `10 + segundos restantes × dificuldade` (1, 2 ou 3).
- Feedback das respostas, resultado, ranking ordenável e histórico persistente.
- Atalhos 1–4 para responder, som opcional e confirmação antes de sair ou limpar dados.
- Importação do ranking antigo na primeira execução, preservando o armazenamento original.

O banco local limita a rodada às perguntas disponíveis para os filtros escolhidos e informa quando a quantidade solicitada não pode ser atendida. Ranking, perfil e preferências são armazenados no navegador. Não há servidor, contas ou ranking global. A fonte web e o Gravatar precisam de internet; o funcionamento do banco local não depende deles.

A implementação anterior está em `legacy/` para consulta e não é usada pelo build. O arquivo `package-lock.json` é o lockfile da nova versão; use npm na raiz.

## Deploy no Netlify

O `netlify.toml` executa `npm ci --include=dev && npm run build`, publica `dist/` e usa Node.js 22. A instalação limpa no início do build garante as versões do `package-lock.json`, incluindo os tipos necessários ao TypeScript, mesmo quando há dependências antigas no cache. Use a raiz do repositório como diretório base; `legacy/` contém a versão anterior.

Depois de enviar alterações na configuração ou nas dependências, faça um novo deploy com o cache limpo no Netlify para descartar dependências antigas.
