# Movies API

Aplicação back-end desenvolvida no Framework [NestJS](https://nestjs.com) que expõe uma API Web para informações sobre filmes, e tem por finalidade demonstrar conceitos básicos de caching para aplicações back-end.

Como fonte de dados, o projeto utiliza uma versão modificada do dataset "**[Movie Dataset for Analytics & Visualization](https://www.kaggle.com/datasets/mjshubham21/movie-dataset-for-analytics-and-visualization)**", que contém uma variedade de dados sintéticos sobre filmes fictícios lançados entre 1950 e 2025.

## Dependências

Certifique-se de instalar todas as dependências para sua plataforma. As versões das ferramentas com as quais a aplicação foi testada estão listadas abaixo:

- [Node.js v24.x](https://nodejs.org) ou superior
- [SQLite3](https://sqlite.org) ou superior
- [Redis Open Source 8.2](https://redis.io) ou superior

## Pré-Requisitos

Antes de rodar o projeto, é necessário executar alguns comandos para preparar o ambiente de desenvolvimento.

### 1. Instalar as dependências da aplicação

```sh
npm install
```

### 2. Instalar a CLI do NestJS

```sh
npm install --global @nestjs/cli
```

### 3. Importar a base de dados

Devido ao seu tamanho, nem o dataset original, nem o arquivo de dados do SQLite estão versionados neste repositório e portanto, é necessário fazer o download do [arquivo CSV do dataset](https://drive.google.com/file/d/16h1s9ocrColTCrEAA0z3XqjqAceZVnCu/view?usp=drive_link) e importá-lo para um novo banco de dados SQLite.

Após o download, deixe o arquivo localizado na pasta `db/` e rode o script apropriado para sua plataforma/shell para criar a base de dados:

<details>
  <summary><strong>Windows (Windows PowerShell)</strong></summary>

  ```sh
  npm run seed-db:powershell
  ```
</details>

<p></p>

<details>
  <summary><strong>Windows (PowerShell 7+)</strong></summary>

  ```sh
  npm run seed-db:pwsh
  ```
</details>

<p></p>

<details>
  <summary><strong>Linux, MacOS, etc. (Bash)</strong></summary>

  ```sh
  npm run seed-db:bash
  ```
</details>

## Rodando o Servidor

Para rodar a aplicação em modo de desenvolvimento, execute o comando:

```sh
npm run start:dev
```

Este modo recarrega a aplicação automaticamente quando alterações são detectadas no código fonte. Para fechar a aplicação, encerre o processo no terminal com `Ctrl + C`.

Caso todos os passos descritos nos [Pré-Requisitos](#pré-requisitos) tenham sido seguidos corretamente, a aplicação deve produzir uma saída semelhante à seguinte no console durante sua inicialização:

```text/plain
[8:08:30 PM] Starting compilation in watch mode...

[8:08:31 PM] Found 0 errors. Watching for file changes.

[Nest] 108859  - dd/MM/yyyy, hh:mm:ss     LOG [NestFactory] Starting Nest application...
[Nest] 108859  - dd/MM/yyyy, hh:mm:ss     LOG [InstanceLoader] AppModule dependencies initialized +12ms
[Nest] 108859  - dd/MM/yyyy, hh:mm:ss     LOG [InstanceLoader] TypeOrmModule dependencies initialized +0ms
[Nest] 108859  - dd/MM/yyyy, hh:mm:ss     LOG [InstanceLoader] TypeOrmCoreModule dependencies initialized +10ms
[Nest] 108859  - dd/MM/yyyy, hh:mm:ss     LOG [InstanceLoader] TypeOrmModule dependencies initialized +0ms
[Nest] 108859  - dd/MM/yyyy, hh:mm:ss     LOG [InstanceLoader] MoviesModule dependencies initialized +0ms
[Nest] 108859  - dd/MM/yyyy, hh:mm:ss     LOG [RoutesResolver] MoviesController {/api/movies}: +7ms
[Nest] 108859  - dd/MM/yyyy, hh:mm:ss     LOG [RouterExplorer] Mapped {/api/movies, GET} route +3ms
[Nest] 108859  - dd/MM/yyyy, hh:mm:ss     LOG [NestApplication] Nest application successfully started +1ms
[Nest] 108859  - dd/MM/yyyy, hh:mm:ss     LOG [Environment] DATASOURCE=./db/movies.sqlite3
[Nest] 108859  - dd/MM/yyyy, hh:mm:ss     LOG [Server] HTTP server listening on port 3000
[Nest] 108859  - dd/MM/yyyy, hh:mm:ss     LOG [Server] API Reference (OpenAPI): http://localhost:3000/api/openapi
```

Com o servidor rodando, é possível acessar uma interface com a documentação da API em seu navegador através da URL http://localhost:3000/api/openapi.
