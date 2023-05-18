# Handle Miles

> Projeto de Gestor de Milhas

Esse projeto tem o objetivo de gerar um sistema que auxilie o usuário a gerenciar sua milhas aéreas e pontos nas principais companhias aéreas brasileiras e programa de pontos.


* [Ambientes](#ambientes)
* [Começando](#começando)
* [Estrutura do projeto](#estrutura-do-projeto)
* [Staging](#staging)
* [Produção](#produção)
* [Imagens da Aplicação](#imagens-da-aplicação)

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
__tests__/          # Testes unitários
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

## Imagens da Aplicação

Tela de Login

![image](https://github.com/LeoFuna/handle-miles/assets/80538553/e4d9d925-536d-43ce-8b52-4ce0066d49b0)

Tela de Início

![image](https://github.com/LeoFuna/handle-miles/assets/80538553/3bbe1c89-d43a-4cbd-86b4-b809eae6b60f)

Menu de Opções

![image](https://github.com/LeoFuna/handle-miles/assets/80538553/88a419c8-2b51-4c3f-988b-a5cdcdf09ac8)

Tela de Movimentações

![image](https://github.com/LeoFuna/handle-miles/assets/80538553/c004da9a-d784-4fa4-b22d-761e024d5aaa)

Janela de Criar Movimentação

![image](https://github.com/LeoFuna/handle-miles/assets/80538553/5cf495d6-f65c-422b-8abc-b438d8ccfa67)
