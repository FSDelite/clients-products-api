# ReadME Base

Este projeto é um template para iniciar rapidamente um projeto AdonisJS 6 utilizando Docker. Siga as instruções abaixo para configurar e executar o projeto.

## Pré-requisitos

- Git
- Docker
- Docker Compose

## Como usar

1. Clone o repositório:

    ```sh
    git clone <URL_DO_REPOSITORIO>
    cd adonis6-docker
    ```

2. Crie um arquivo `.env` com base no arquivo `.env.example`:

    ```sh
    cp .env.example .env
    ```

3. Execute o Docker Compose:

    ```sh
    docker-compose up --build
    ```

4. Acesse a api:

    ```
    http://localhost:3333
    ```

## Estrutura do Projeto

- `start/`: Arquivos de inicialização do AdonisJS.
- `app/`: Contém os controladores, modelos e serviços.
- `config/`: Arquivos de configuração do AdonisJS.
- `database/`: Arquivos de migração e seeds.

## Comandos Úteis

- Parar os containers:

    ```sh
    docker-compose down
    ```

- Ver logs dos containers:

    ```sh
    docker-compose logs -f
    ```
