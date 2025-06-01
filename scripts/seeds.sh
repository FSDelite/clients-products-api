#!/bin/bash

echo "Rodando Seeds dentro do container Docker..."

docker-compose exec app node ace db:seed

if [ $? -eq 0 ]; then
  echo "Seeds rodadas com sucesso."
else
  echo "Falha ao rodar Seeds."
  exit 1
fi
