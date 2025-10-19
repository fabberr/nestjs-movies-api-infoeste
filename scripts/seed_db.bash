#!/usr/bin/env bash

CSV_FILE="${1:-./db/movies.csv}"
DB_FILE="${2:-./db/movies.sqlite3}"

TABLE_NAME="Movies"

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
.import --skip 1 '$CSV_FILE' '$TABLE_NAME'
EOF

count=$(sqlite3 "$DB_FILE" "SELECT COUNT(*) FROM '$TABLE_NAME';")

echo "[INFO]"
echo "├── Base de dados criada com sucesso!"
echo "└── $count registros importados para a tabela '$TABLE_NAME'."
