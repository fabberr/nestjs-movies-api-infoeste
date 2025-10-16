#!/usr/bin/env bash

CSV="${1:-./db/movies.csv}"
DB="${2:-./db/movies.sqlite3}"

if [[ ! -f "$CSV" ]]; then
  echo "Arquivo não encontrado: $CSV" >&2
  exit 1
fi

rm -f "$DB"

sqlite3 "$DB" <<EOF
CREATE TABLE Movies (
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
.import --skip 1 "$CSV" Movies
EOF

echo "CSV importado com sucesso"
