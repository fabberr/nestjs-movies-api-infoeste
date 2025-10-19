# Movies API

Aplicação back-end desenvolvida com o framework [NestJS](https://nestjs.com) que expõe uma API para informações sobre filmes. O projeto tem como objetivo demonstrar conceitos básicos de caching para performance em aplicações back-end, utilizando o Redis como armazenamento.

Como fonte de dados, o projeto usa uma versão modificada do dataset "[Movie Dataset for Analytics & Visualization](https://www.kaggle.com/datasets/mjshubham21/movie-dataset-for-analytics-and-visualization)", que contém dados sintéticos sobre filmes fictícios lançados entre 1950 e 2025.

O armazenamento primário é feito em uma base de dados SQL. O SGBD escolhido foi o SQLite; por ser leve, armazenar os dados localmente (`./db/movies.sqlite3`) e de fácil uso para desenvolvimento e testes.

A estrutura do projeto segue uma arquiterura modular proveniente do NestJS, disposta em camadas. Cada camada encapsula diferentes responsabilidades como processamento de chamadas via API Web (_controllers_), regras de negócio (_services_), e acesso a dados (_repositories_). A integração com o Redis é implementada como um módulo separado, preservando responsabilidade única por módulo e facilitando testes e manutenção.

## Tecnologias Utilizadas

### Bancos de Dados
- **Armazenamento Primário:** [SQLite](https://sqlite.org)
- **Cache**: [Redis](https://redis.io)

### Aplicação
- **Linguagem:** [TypeScript](https://www.typescriptlang.org)
- **Runtime:** [Node.js](https://nodejs.org)
- **Framework:** [NestJS](https://nestjs.com)
- **ORM:** [TypeORM](https://typeorm.io)

### API
- **Servidor HTTP:** [Express](https://expressjs.com)
- **Documentação:** [OpenAPI](https://www.openapis.org)
- **Documentação (Interface):** [Scalar](https://scalar.com)

## Dependências

Certifique-se de instalar todas as dependências para sua plataforma. As versões das ferramentas com as quais a aplicação foi testada estão listadas abaixo:

- Node.js 24.x ou superior
- SQLite 3.x ou superior
- Redis Open Source 8.x ou superior

## Pré-Requisitos

Antes de rodar o projeto, é preciso executar alguns passos para preparar o ambiente de desenvolvimento.

### 1. Instalar as dependências da aplicação

```sh
npm install
```

### 2. Instalar a CLI do NestJS

```sh
npm install --global @nestjs/cli
```

### 3. Importar a base de dados

Pelo tamanho do dataset, nem o CSV original nem o arquivo SQLite estão versionados neste repositório; portanto é necessário baixar o [arquivo CSV do dataset](https://drive.google.com/file/d/16h1s9ocrColTCrEAA0z3XqjqAceZVnCu/view?usp=drive_link) e importá‑lo para uma nova base SQLite.

Após o download, coloque o arquivo na pasta `./db/` e execute o script apropriado para sua plataforma/shell para criar a base de dados:

<details>
  <summary><strong>Windows (com Windows PowerShell)</strong></summary>

  ```sh
  npm run seed-db:powershell
  ```
</details>
<br>

<details>
  <summary><strong>Windows (com PowerShell 7+)</strong></summary>

  ```sh
  npm run seed-db:pwsh
  ```
</details>
<br>

<details>
  <summary><strong>Linux, MacOS, etc. (com Bash)</strong></summary>

  ```sh
  npm run seed-db:bash
  ```
</details>

## Rodando o Servidor

Para rodar a aplicação em modo de desenvolvimento:

```sh
npm run start:dev
```

Este modo reinicia automaticamente a aplicação quando o código fonte for alterado. Para encerrar, pressione `Ctrl + C` no terminal.

Caso todos os passos descritos nos [Pré-Requisitos](#pré-requisitos) tenham sido seguidos corretamente, a aplicação deve gerar uma saída semelhante à exibida abaixo no console durante sua inicialização:

```text/plain
[8:08:30 PM] Starting compilation in watch mode...

[8:08:31 PM] Found 0 errors. Watching for file changes.

[Nest] 000000  - dd/MM/yyyy, hh:mm:ss PM     LOG [NestFactory] Starting Nest application...
[Nest] 000000  - dd/MM/yyyy, hh:mm:ss PM     LOG [InstanceLoader] AppModule dependencies initialized +12ms
[Nest] 000000  - dd/MM/yyyy, hh:mm:ss PM     LOG [InstanceLoader] TypeOrmModule dependencies initialized +0ms
[Nest] 000000  - dd/MM/yyyy, hh:mm:ss PM     LOG [InstanceLoader] TypeOrmCoreModule dependencies initialized +10ms
[Nest] 000000  - dd/MM/yyyy, hh:mm:ss PM     LOG [InstanceLoader] TypeOrmModule dependencies initialized +0ms
[Nest] 000000  - dd/MM/yyyy, hh:mm:ss PM     LOG [InstanceLoader] MoviesModule dependencies initialized +0ms
[Nest] 000000  - dd/MM/yyyy, hh:mm:ss PM     LOG [RoutesResolver] MoviesController {/api/movies}: +7ms
[Nest] 000000  - dd/MM/yyyy, hh:mm:ss PM     LOG [RouterExplorer] Mapped {/api/movies, GET} route +3ms
[Nest] 000000  - dd/MM/yyyy, hh:mm:ss PM     LOG [NestApplication] Nest application successfully started +1ms
[Nest] 000000  - dd/MM/yyyy, hh:mm:ss PM     LOG [Environment] DATASOURCE=./db/movies.sqlite3
[Nest] 000000  - dd/MM/yyyy, hh:mm:ss PM     LOG [Server] HTTP server listening on port 3000
[Nest] 000000  - dd/MM/yyyy, hh:mm:ss PM     LOG [Server] API Reference (OpenAPI): http://localhost:3000/api/openapi
```

Com o servidor rodando, é possível acessar a interface com a documentação da API em seu navegador através da URL http://localhost:3000/api/openapi.
