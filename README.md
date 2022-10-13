# Handle Miles

> Projeto de Gestor de Milhas

Esse projeto tem o objetivo de gerar um sistema que auxilie o usuário a gerenciar sua milhas aéreas e pontos nas principais companhias aéreas brasileiras e programa de pontos.


* [Ambientes](#ambientes)
* [Começando](#começando)
* [Estrutura do projeto](#estrutura-do-projeto)
* [Staging](#staging)
* [Produção](#produção)

## Ambientes
| Ambiente | URL |
| - | - |
| Produção | https://handle-miles.vercel.app/ |
| Desenvolvimento | https://handle-miles-staging.vercel.app/ |

## Começando

Instalando as dependências

```bash
npm install
```

Copie o arquivo `.env.sample` e chame-o de  `.env.local` e altere os valores das credenciais para os seus valores locais

Inicie o projeto

```bash
npm run dev
```

Acesse [localhost:3000](localhost:3000)

## Estrutura do projeto

```bash
components/         # Componentes
  auth/             # Componentes de autenticação
  core/             # Componentes compartilhados
  home/             # Componentes da página principal
  settings/         # Componentes de configurações
  transactions/     # Componentes das transações
db/
  firebase.js       # Conexão com o Firebase e seus serviços
hooks/              # Hooks da aplicação
pages/              # Rotas das páginas React e api
  api/              # Rotas de api
  auth/
  settings/
  transactions/
  index.tsx         # Entrypoint da aplicação
services/           # Serviços usados pelas rotas de api
styles/             # Estilização da aplicação
utils/              # Funções úteis para a aplicação
```

## Staging

A aplicação é atualizada quando existe um push na branch `staging`. Para disponibilizar o código que gostaria de testar na aplicação de staging, basta realizar um push pra branch `staging`.

Exemplo:

```sh
git checkout <sua-branch>
git push origin <sua-branch>:staging -f
```

_Essa branch é utilizada como gatilho para o ambiente de `staging` e não precisa se manter atualizada, é utilizada para receber códigos que queremos enviar para `staging`._

## Produção

O código será disponibilizado automaticamente em produção quando um commit for enviado para a branch `main`.
