#!/usr/bin/env pwsh

param(
    [string]$CsvFile = "./db/movies.csv",
    [string]$DbFile  = "./db/movies.sqlite3"
)

$TableName = "Movies"

function RealPath([string]$Path) {
    try {
        return (Resolve-Path $Path -ErrorAction Stop).Path
    } catch {
        return (Join-Path (Get-Location) $Path)
    }
}

if (-not (Test-Path $CsvFile)) {
    Write-Host "[ERROR]"
    Write-Host ("└── Arquivo CSV não encontrado: " + $CsvFile)
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

$SqlFile = New-TemporaryFile
Set-Content -Path $SqlFile -Value @"
CREATE TABLE '$TableName' (
  Id                     INTEGER PRIMARY KEY,
  Title                  TEXT    NOT NULL,
  Genre                  TEXT    NOT NULL,
  ReleaseYear            INTEGER NOT NULL,
  ReleaseDate            TEXT    NOT NULL,
  Country                TEXT    NOT NULL,
  BudgetUsd              REAL    NOT NULL,
  UsBoxOfficeUsd         REAL    NOT NULL,
  GlobalBoxOfficeUsd     REAL    NOT NULL,
  OpeningDaySalesUsd     REAL    NOT NULL,
  OneWeekSalesUsd        REAL    NOT NULL,
  ImdbRating             REAL    NOT NULL,
  RottenTomatoesScore    INTEGER NOT NULL,
  NumVotesImdb           INTEGER NOT NULL,
  NumVotesRottenTomatoes INTEGER NOT NULL,
  Director               TEXT    NOT NULL,
  LeadActor              TEXT    NOT NULL
);

.mode csv
.import --skip 1 '$CsvFile' '$TableName'
"@

sqlite3 $DbFile ".read '$SqlFile'"
Remove-Item $SqlFile

$count = sqlite3 $DbFile "SELECT COUNT(*) FROM '$TableName';"

Write-Host "[INFO]"
Write-Host "├── Base de dados criada com sucesso!"
Write-Host ("└── {0} registros importados para a tabela '{1}'." -f $count, $TableName)
