# Api RESTful para Cadastro de Clientes e Produtos Favoritados

Esta API RESTful foi desenvolvida como um serviço interno para cadastro de clientes, produtos e seus respectivos favoritos.
O projeto utiliza o framework AdonisJS 6, com PostgreSQL como banco de dados relacional, e está totalmente containerizado com Docker e Docker Compose.
A estrutura inicial do projeto foi baseada em um boilerplate que desenvolvi e mantenho em repositório privado. Esse template contém as configurações essenciais do AdonisJS 6 com suporte a Docker, otimizando o setup inicial e acelerando o desenvolvimento de novos serviços. Basicamente ele pula rodar o comando npm para baixar o adonis e a criacao do dockerfile e docker-compose.yml, que já estão prontos para uso.

## Tecnologias Utilizadas

- **AdonisJS 6**: Framework Node.js para construção de aplicações web. Escolhi esse framework por conta da robustez e facilidade de uso. Como ele encapsula muitas funcionalidades comuns em APIs, por exemplo autenticação, validação (VineJS), manipulação de requisições e banco de dados (Lucid), pude me concenterar mais na lógica de negócio do serviço.

- **PostgreSQL**: Banco de dados relacional utilizado para armazenar os dados dos clientes, produtos e favoritos. A escolha do PostgreSQL se deu pela sua confiabilidade e facilidade de escalabilidade, visto que o projeto receberá um volume grande de dados e requisições.

- **Docker**: Utilizado para containerizar a aplicação, garantindo que ela rode de forma consistente em qualquer ambiente. O Docker permite que a aplicação seja facilmente implantada e escalada.

## Instalação e Setup

### Pré-requisitos

- Docker e Docker Compose instalados na máquina.
- Git instalado para clonar o repositório.

### Passos

```sh
git clone <https://github.com/FSDelite/clients-products-api>
cd clients-products-api
cp .env.example .env
docker-compose up --build
```

A partir deste ponto, a aplicação estará rodando em `http://localhost:3333`.
Para rodar as migrações e seeds iniciais, você pode executar o seguinte comando:

```sh
docker-compose exec app node ace migration:run
docker-compose exec app node ace db:seed
```

Ou utilizar os scripts configurados na pasta `/scripts`:

```sh
sh scripts/migrations.sh
sh scripts/seeds.sh
```

## Autenticação

A autenticação da API utiliza tokens (`auth_access_tokens`) gerados automaticamente após o login com um usuário válido.

Após seguir os passos de instalação e seed, você poderá acessar a API utilizando as credenciais padrão:

- **Usuário:** `first_user`  
- **Senha:** `admin`  
*(caso não tenha alterado o conteúdo do `.env.example`)*

Para acessar endpoints protegidos, envie **os seguintes métodos de autenticação**:

- O token JWT no header:  
  `Authorization: Bearer <token>`

- A chave da API no header:  
  `x-api-key: <valor_da_chave>`

> A `x-api-key` está configurada no arquivo `.env` com o valor padrão `supersecretapikey`.  
> Requisições sem autenticação válida retornarão erro **401 Unauthorized**.

## Documentação da API

A documentação completa da API está disponível no Postman, contendo todos os endpoints, parâmetros, exemplos de requisição e resposta.

🔗 **Acesse aqui:**  
[https://documenter.getpostman.com/view/18159761/2sB2qi7HF7](https://documenter.getpostman.com/view/18159761/2sB2qi7HF7)

Você pode explorar a API diretamente pela interface web ou importar para o Postman Desktop, se preferir.

---

## Banco de dados

### `users`

Armazena os usuários que podem se autenticar na API (usuários do sistema).

| Coluna      | Tipo     | Restrições           |
|-------------|----------|----------------------|
| id          | INTEGER  | PK, Auto Increment   |
| description | STRING   | Nullable             |
| username    | STRING   | Not Null, Unique     |
| password    | STRING   | Not Null             |
| created_at  | TIMESTAMP| Not Null             |
| updated_at  | TIMESTAMP| Nullable             |

---

### `auth_access_tokens`

Tokens de autenticação associados aos usuários. Criada pelo AdonisJS.

| Coluna         | Tipo      | Restrições                              |
|----------------|-----------|-----------------------------------------|
| id             | INTEGER   | PK, Auto Increment                      |
| tokenable_id   | INTEGER   | FK → users.id, Not Null, OnDelete CASCADE |
| type           | STRING    | Not Null                                |
| name           | STRING    | Nullable                                |
| hash           | STRING    | Not Null                                |
| abilities      | TEXT      | Not Null                                |
| created_at     | TIMESTAMP | Nullable                                |
| updated_at     | TIMESTAMP | Nullable                                |
| last_used_at   | TIMESTAMP | Nullable                                |
| expires_at     | TIMESTAMP | Nullable                                |

---

### `clients`

Tabela que representa os clientes da aplicação, que podem marcar produtos como favoritos.

| Coluna     | Tipo     | Restrições           |
|------------|----------|----------------------|
| id         | INTEGER  | PK, Auto Increment   |
| name       | STRING   | Not Null             |
| email      | STRING   | Not Null, Unique     |
| created_at | TIMESTAMP| Nullable             |
| updated_at | TIMESTAMP| Nullable             |

---

### `products`

Produtos disponíveis para serem favoritados pelos clientes. Os dados vêm de uma API externa.

| Coluna         | Tipo      | Restrições                      |
|----------------|-----------|---------------------------------|
| id             | INTEGER   | PK, Auto Increment              |
| title          | STRING    | Not Null                        |
| external_id    | STRING    | Not Null                        |
| price          | DECIMAL   | Not Null (10,2)                 |
| image_url      | STRING    | Nullable                        |
| average_rating | DECIMAL   | Not Null (3,2), Default: 0      |
| rating_count   | INTEGER   | Not Null, Default: 0            |
| origin_service | STRING    | Not Null                        |
| created_at     | TIMESTAMP | Nullable                        |
| updated_at     | TIMESTAMP | Nullable                        |
| 🔗 Index       | `external_id + origin_service` | |

---

### `client_product_favorites`

Tabela intermediária entre clientes e produtos, representando os favoritos.

| Coluna     | Tipo     | Restrições                                      |
|------------|----------|-------------------------------------------------|
| id         | INTEGER  | PK, Auto Increment                              |
| client_id  | INTEGER  | FK → clients.id, Not Null, OnDelete CASCADE     |
| product_id | INTEGER  | FK → products.id, Not Null, OnDelete CASCADE    |
| created_at | TIMESTAMP| Nullable                                        |
| updated_at | TIMESTAMP| Nullable                                        |
| 🔗 Index   | `client_id + product_id`           | |

## Arquitetura interna

A aplicação foi estruturada com foco em escalabilidade, reuso de código e substituibilidade de integrações externas. Abaixo estão os principais componentes internos:

![Arquitetura](https://i.imgur.com/X5l3iQk.png)

### ProductService

Responsável pela lógica de persistência e validação de produtos favoritos.

- Ao cadastrar um produto como favorito, verifica se ele já existe no banco de dados.

- Se não existir, consome a API externa, normaliza os dados e persiste localmente.

- Atua como camada intermediária entre o domínio interno e os serviços externos.

### AbstractProductApiService

Uma classe abstrata que define o contrato para integração com APIs de produtos.

- Facilita a substituição ou adição de novos fornecedores de produtos no futuro.

- Garante consistência nas implementações de serviços externos.

### FakeStoreApiService

Implementação concreta de AbstractProductApiService, usando a Fake Store API.

- Realiza chamadas HTTP usando Axios, encapsulado no HttpService.

- Converte a resposta externa para o formato usado internamente.

### HttpService

Um utilitário para encapsular requisições HTTP (GET, POST, etc.).

- Reduz acoplamento com bibliotecas externas como Axios.

- Facilita tratamento de erros e substituição futura por outro client (ex: fetch, got).

### Helpers Reutilizáveis (rowExists)

Funções auxiliares como rowExists() foram criadas para evitar duplicação de lógica de verificação em banco de dados.

- Melhoram a legibilidade dos controllers.

- Centralizam padrões de checagem.

## Melhorias Futuras

- Implementar testes unitários e de integração. Devido à agenda apertada, não foi possível incluir testes automatizados nesta versão. No entanto, a estrutura do projeto foi pensada para facilitar a adição de testes no futuro.

- Adicionar suporte a cache para reduzir chamadas à API externa e melhorar performance.

- Implementar uma camada de logs para monitoramento e auditoria das operações.

## Considerações Finais

Este projeto foi desenvolvido com foco em clareza, organização e facilidade de manutenção. Optei por utilizar o AdonisJS 6 pela produtividade que oferece no desenvolvimento de APIs modernas, especialmente em cenários com autenticação, validação e relacionamentos complexos.

Busquei aplicar boas práticas de modelagem, desacoplamento entre serviços internos e externos, e uma arquitetura preparada para expansão futura.

A estrutura atual permite evoluir facilmente nesse sentido. O projeto também está preparado para receber novos serviços externos de produtos, bastando criar novas implementações a partir do contrato abstrato existente.

Fico aberto a feedbacks técnicos e sugestões de melhorias. Obrigado por ler até aqui!
