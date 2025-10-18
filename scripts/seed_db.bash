#!/usr/bin/env bash

CSV_FILE="${1:-./db/movies.csv}"
DB_FILE="${2:-./db/movies.sqlite3}"

TABLE_NAME="Movie"

if [[ ! -f "$CSV_FILE" ]]; then
  echo "[ERROR]"
  echo "└── Arquivo CSV não encontrado: $CSV_FILE" >&2
  exit 1
fi

if [[ -f "$DB_FILE" ]]; then
  echo "[WARN]"
  echo "├── Base de dados já existe!"
  echo "└── Removendo arquivo antigo: $(realpath $DB_FILE)"

  rm -f "$DB_FILE"
fi

echo "[INFO]"
echo "├── Criando base de dados: $(realpath $DB_FILE)"
echo "└── Importando dados do arquivo CSV: $(realpath $CSV_FILE)"

sqlite3 "$DB_FILE" <<EOF
CREATE TABLE '$TABLE_NAME' (
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
.import --skip 1 '$CSV_FILE' '$TABLE_NAME'
EOF

count=$(sqlite3 "$DB_FILE" "SELECT COUNT(*) FROM '$TABLE_NAME';")

echo "[INFO]"
echo "├── Base de dados criada com sucesso!"
echo "└── $count registros importados para a tabela '$TABLE_NAME'."
