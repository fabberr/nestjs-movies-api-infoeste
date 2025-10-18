#!/usr/bin/env pwsh

param(
    [string]$CsvFile = "./db/movies.csv",
    [string]$DbFile  = "./db/movies.sqlite3"
)

$TableName = "Movie"

function RealPath([string]$Path) {
    try {
        return (Resolve-Path $Path -ErrorAction Stop).Path
    } catch {
        return (Join-Path (Get-Location) $Path)
    }
}

if (-not (Test-Path $CsvFile)) {
    Write-Host "[ERROR]"
    Write-Host "└── Arquivo CSV não encontrado: $CsvFile"
    exit 1
}

if (Test-Path $DbFile) {
    Write-Host "[WARN]"
    Write-Host "├── Base de dados já existe!"
    Write-Host ("└── Removendo arquivo antigo: " + (RealPath $DbFile))

    Remove-Item $DbFile -Force
}

Write-Host "[INFO]"
Write-Host ("├── Criando base de dados: " + (RealPath $DbFile))
Write-Host ("└── Importando dados do arquivo CSV: " + (RealPath $CsvFile))

$SqlCmd = @"
CREATE TABLE '$TableName' (
  Id                     INTEGER PRIMARY KEY,
  Title                  TEXT NOT NULL,
  Genre                  TEXT,
  ReleaseYear            INTEGER,
  ReleaseDate            TEXT,
  Country                TEXT,
  BudgetUsd              REAL,
  UsBoxOfficeUsd         REAL,
  GlobalBoxOfficeUsd     REAL,
  OpeningDaySalesUsd     REAL,
  OneWeekSalesUsd        REAL,
  ImdbRating             REAL,
  RottenTomatoesScore    INTEGER,
  NumVotesImdb           INTEGER,
  NumVotesRottenTomatoes INTEGER,
  Director               TEXT,
  LeadActor              TEXT
);

.mode csv
.import --skip 1 '$CsvFile' '$TableName'
"@

sqlite3 $DbFile $SqlCmd | Out-Null

$count = sqlite3 $DbFile "SELECT COUNT(*) FROM '$TableName';"

Write-Host "[INFO]"
Write-Host "├── Base de dados criada com sucesso!"
Write-Host "└── $count registros importados para a tabela '$TableName'."
