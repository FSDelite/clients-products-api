#!/bin/bash

echo "Rodando migrações dentro do container Docker..."

docker-compose exec app node ace migration:run

if [ $? -eq 0 ]; then
  echo "Migrações rodadas com sucesso."
else
  echo "Falha ao rodar migrações."
  exit 1
fi
