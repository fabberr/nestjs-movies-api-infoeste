# Movies API

Aplicação back-end que expõe uma API para consultas de dados analíticos sobre filmes. O projeto tem como objetivo demonstrar conceitos básicos de caching para performance em aplicações back-end.

Como fonte de dados, o projeto usa uma versão modificada do dataset "[Movie Dataset for Analytics & Visualization](https://www.kaggle.com/datasets/mjshubham21/movie-dataset-for-analytics-and-visualization)", que contém dados sintéticos de filmes fictícios lançados entre 1950 e 2025.

A estrutura do projeto segue uma arquiterura modular proveniente do Framework NestJS, disposta em camadas. Cada camada encapsula diferentes responsabilidades como servir requisições HTTP (_controllers_), regras de negócio (_services_), e acesso a dados (_repositories_). A integração com o Redis é implementada como um módulo separado, preservando responsabilidade única por módulo e facilitando testes e manutenção.

## Tecnologias Utilizadas

### Banco de Dados
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

## Rodando a Aplicação

Para rodar a aplicação em modo de desenvolvimento:

```sh
npm run start:dev
```

Este modo reinicia automaticamente a aplicação quando o código fonte for alterado. Para encerrar, pressione `Ctrl + C` no terminal.

Caso todos os passos descritos nos [Pré-Requisitos](#pré-requisitos) tenham sido seguidos corretamente, a aplicação deve gerar uma saída semelhante à exibida abaixo no console durante sua inicialização:

```text/plain
[TIMESTAMP] Starting compilation in watch mode...

[TIMESTAMP] Found 0 errors. Watching for file changes.

[Nest] <PID>  - <TIMESTAMP>     LOG [NestFactory] Starting Nest application...
[Nest] <PID>  - <TIMESTAMP>     LOG [InstanceLoader] AppModule dependencies initialized +12ms
[Nest] <PID>  - <TIMESTAMP>     LOG [InstanceLoader] TypeOrmModule dependencies initialized +0ms
[Nest] <PID>  - <TIMESTAMP>     LOG [InstanceLoader] TypeOrmCoreModule dependencies initialized +10ms
[Nest] <PID>  - <TIMESTAMP>     LOG [InstanceLoader] TypeOrmModule dependencies initialized +0ms
[Nest] <PID>  - <TIMESTAMP>     LOG [InstanceLoader] MoviesModule dependencies initialized +0ms
[Nest] <PID>  - <TIMESTAMP>     LOG [RoutesResolver] MoviesController {/api/movies}: +7ms
[Nest] <PID>  - <TIMESTAMP>     LOG [RouterExplorer] Mapped {/api/movies, GET} route +3ms
[Nest] <PID>  - <TIMESTAMP>     LOG [NestApplication] Nest application successfully started +1ms
[Nest] <PID>  - <TIMESTAMP>     LOG [Environment] DATASOURCE=./db/movies.sqlite3
[Nest] <PID>  - <TIMESTAMP>     LOG [Server] HTTP server listening on port 3000
[Nest] <PID>  - <TIMESTAMP>     LOG [Server] API Reference (OpenAPI): http://localhost:3000/docs
```

Com o servidor rodando, é possível acessar uma interface com a documentação da API em seu navegador através da URL: http://localhost:3000/docs
