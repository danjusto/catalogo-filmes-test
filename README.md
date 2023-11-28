# API Catálogo de Filmes

API desenvolvida para um teste de uma oportunidade de desenvolvedor na MKS. Trata-se de um catálago de filmes.

## 📜 Sumário

1. [Detalhes do projeto](https://github.com/danjusto/catalogo-filmes-test#1--detalhes-do-projeto)
2. [Deploy](https://github.com/danjusto/catalogo-filmes-test#2--deploy)
3. [Para rodar o projeto](https://github.com/danjusto/catalogo-filmes-test#3--para-rodar-o-projeto)
4. [Documentação](https://github.com/danjusto/catalogo-filmes-test#4--documenta%C3%A7%C3%A3o)
5. [Tecnologias usadas](https://github.com/danjusto/catalogo-filmes-test#5--tecnologias-usadas)
6. [Autor](https://github.com/danjusto/catalogo-filmes-test#6--autor)

## 1. 🔍 Detalhes do projeto

A API tem como objetivo apresentar um catálogo de filmes que apenas pode ser acessado por meio de autenticação com usuário e senha.  
Foi requisitado a utilização das ferramentas: TypeScript, Nest.js, TypeORM, Swagger, Docker, Redis e PostgreSQL.
Foi meu primeiro contato com Nest.js e TypeORM, sendo que as demais eu já possuía experiência.

#### Cenário:

-   O sistema permite o cadastro de usuário, com validação de informações;
-   O sistema permite apenas as requisições de cadastro de usuário e login sem autenticação por meio de JWT;
-   Com o usuário logado, o sistema permite a edição e deleção do usuário, bem como criação, edição, detalhamento, deleção e listagem de filmes;

## 2. ✅ Deploy

A API está rodando no servidor da Render: [Link do deploy](https://catalogo-filmes-test.onrender.com).

Para utilizá-la, basta seguir a documentação presente neste conteúdo.

## 3. 🔌 Para rodar o projeto em ambiente de desenvolvimento

1. Instale as dependências necessárias para rodar a API (relacionadas no package.json):

    ```
    npm install
    ```

2. A API utiliza o PostgreSQL como banco de dados e Redis para cache. Para subir um container com ambas as ferramentas basta rodar o arquivo docker-compose.yaml com o comando abaixo:

    ```
    docker compose up
    ```

3. Os dados das ferramentas citadas devem ser preenchidos no arquivo `.env` utilizando o `.env.example` de exemplo para os nomes das variáveis de ambiente.

4. Rode o comando `npm run typeorm migration:run` para executar as migrations e criar as tabelas no banco de dados, deixando-as prontas para uso.

5. Você precisará de uma ferramenta de teste de requisições como o [Insomnia](https://insomnia.rest/) ou pode usar o utilizar o `Swagger` com o recurso `/api` após a url do servidor, devendo seguir as orientações da documentação abaixo para utilizar o sistema.

## 4. 📖 Documentação

### Endpoints

**Login** - Autenticação de usuário <br/>

<details>
<summary><b>POST auth/login</b></summary>

Logar com um usuário por meio de `email` e `password`. Retorna um token JWT para ser utilizado nas requisições.

**Request**

| **Nome** | **Obrigatório** | **Tipo** | **Descrição**     |
| :------- | :-------------- | :------- | :---------------- |
| email    | sim             | `string` | E-mail do usuário |
| password | sim             | `string` | Senha do usuário  |

> **_NOTA:_** Não é necessário enviar Token JWT via Authorization Header.

Exemplo de requisição:

```json
{
    "email": "fulano@email.com",
    "password": "password"
}
```

**Response**

Sucesso

```json
{
    "token": "abcdefghijklmno.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnop"
}
```

`status: 201` <br /><br />

Erro comum

```json
{
    "message": "User not found",
    "error": "Not Found",
    "statusCode": 404
}
```

</details>
<br/>

**User** - Criação de um novo usuário, edição de um usuário e deleção do usuário <br/>

<details>
<summary><b>POST user</b></summary>

Criar um usuário para poder utilizar a API.

**Request**

| **Nome** | **Obrigatório** | **Tipo** | **Descrição**    |
| :------- | :-------------- | :------- | :--------------- |
| fullName | sim             | `string` | Nome do usuário  |
| email    | sim             | `string` | Email do usuário |
| password | sim             | `string` | Senha do usuário |

> **_NOTA:_** Não é necessário enviar Token JWT via Authorization Header.

Exemplo de requisição:

```json
{
    "fullName": "Fulano",
    "email": "fulano@email.com",
    "password": "password"
}
```

**Response**

Sucesso

```json
{
    "id": "753ae2c4-edd0-4d4c-8f7f-1cffa5eea4f6",
    "fullName": "Fulano",
    "email": "fulano@email.com"
}
```

`status: 201` <br /><br /> Erros comuns

```json
{
    "message": ["This email already exists"],
    "error": "Bad Request",
    "statusCode": 400
}
```

```json
{
    "message": [
        "The property \"password\" must have at least one lowercase letter, one uppercase letter, one digit, one special character and contain between 8 and 20 characters"
    ],
    "error": "Bad Request",
    "statusCode": 400
}
```

</details>

<details>
<summary><b>PUT user</b></summary>

Editar um usuário. Nenhum dos requisitos é obrigatório.

**Request**

| **Nome** | **Obrigatório** | **Tipo** | **Descrição**    |
| :------- | :-------------- | :------- | :--------------- |
| fullName | não             | `string` | Nome do usuário  |
| email    | não             | `string` | Email do usuário |
| password | não             | `string` | Senha do usuário |

> **_NOTA:_** É necessário enviar Token JWT via Authorization Header.

Exemplo de requisição:

```json
{
    "name": "Fulano Editado",
    "email": "fulano.editado@email.com",
    "password": "password"
}
```

**Response**

Sucesso

```json
{
    "id": "753ae2c4-edd0-4d4c-8f7f-1cffa5eea4f6",
    "fullName": "Fulano",
    "email": "fulano@email.com"
}
```

`status: 200` <br/><br/> Erros comuns

```json
{
    "message": "User not found",
    "error": "Not Found",
    "statusCode": 404
}
```

```json
{
    "message": ["This email already exists"],
    "error": "Bad Request",
    "statusCode": 400
}
```

</details>

<details>
<summary><b>DELETE user</b></summary>

Deletar o usuario. O `id` é enviado via JWT.

> **_NOTA:_** É necessário enviar Token JWT via Authorization Header.

**Response**

Sucesso  
`no body returned for response` <br/> `status: 204` <br/>

Erro comum

```json
{
    "message": "User not found",
    "error": "Not Found",
    "statusCode": 404
}
```

</details>
<br/>

**Movies** - Criação de um novo filme, edição de um filme, listagem de filmes, deleção de um filme e detalhamento de um filme <br/>

<details>
<summary><b>POST movies</b></summary>

Criar um filme.

**Request**

| **Nome**    | **Obrigatório** | **Tipo** | **Descrição**      |
| :---------- | :-------------- | :------- | :----------------- |
| title       | sim             | `string` | Título do filme    |
| description | sim             | `string` | Descrição do filme |
| genre       | sim             | `string` | Gênero do filme    |

> **_NOTA:_** É necessário enviar Token JWT via Authorization Header.

**Response**

Sucesso

```json
{
    "id": "3cc82790-6d52-4e21-b121-63ee4437bf6a",
    "title": "Divertidamente",
    "genre": "animation",
    "description": "Qualquer coisa"
}
```

`status: 201` <br /><br /> Erros comuns

```json
{
    "message": "The property \"genre\" must be one of \"action, adventure, animation, comedy, drama, fiction, horror, romance, suspense\"",
    "error": "Bad Request",
    "statusCode": 400
}
```

</details>

<details>
<summary><b>GET movies</b></summary>

Listar filmes. Não é necessário passar qualquer parâmetro ou dado.

> **_NOTA:_** É necessário enviar Token JWT via Authorization Header.

**Response**

Sucesso

```json
[
    {
        "id": "34507ac9-f82d-4037-b75b-d3e01e7d1298",
        "title": "Divertidamente",
        "genre": "animation",
        "description": "Qualquer coisa"
    },
    {
        "id": "1f6b505f-ff6b-40b5-b3b8-7192d72e57c0",
        "title": "Matrix",
        "genre": "fiction",
        "description": "Qualquer coisa"
    },
    {
        "id": "d12986fc-ce36-40c4-bc68-1e5aa9979dcb",
        "title": "Top Gun",
        "genre": "action",
        "description": "Qualquer coisa"
    }
]
```

`status: 200`

Sucesso sem retorno

```json
[]
```

`status: 200` <br/>

</details>

<details>
<summary><b>GET movies/id</b></summary>

Detalhar um produto. O `id` deve ser enviado na url.

**Request**

| **Nome** | **Obrigatório** | **Tipo** | **Descrição**                    |
| :------- | :-------------- | :------- | :------------------------------- |
| id       | sim             | `string` | **Enviar via parâmetro de rota** |

> **_NOTA:_** É necessário enviar Token JWT via Authorization Header.

**Response**

Sucesso

```json
{
    "id": "34507ac9-f82d-4037-b75b-d3e01e7d1298",
    "title": "Divertidamente",
    "genre": "animation",
    "description": "Qualquer coisa"
}
```

`status: 200`

Erros comuns

```json
{
    "message": "Movie not found",
    "error": "Not Found",
    "statusCode": 404
}
```

</details>

<details>
<summary><b>PUT movies/id</b></summary>

Alterar os dados do filme. O `id` deve ser enviado na url.

**Request**

| **Nome**    | **Obrigatório** | **Tipo** | **Descrição**                    |
| :---------- | :-------------- | :------- | :------------------------------- |
| id          | sim             | `string` | **Enviar via parâmetro de rota** |
| title       | não             | `string` | Título do filme                  |
| description | não             | `string` | Descrição do filme               |
| genre       | não             | `string` | Gênero do filme                  |

> **_NOTA:_** É necessário enviar Token JWT via Authorization Header.

**Response**

Sucesso

```json
{
    "id": "3cc82790-6d52-4e21-b121-63ee4437bf6a",
    "title": "Toy Story",
    "genre": "animation",
    "description": "Qualquer coisa"
}
```

`status: 200` <br/><br/>

Erro comum

```json
{
    "message": "Movie not found",
    "error": "Not Found",
    "statusCode": 404
}
```

</details>

<details>
<summary><b>DELETE movies/id</b></summary>

Deletar um filme. O `id` deve ser enviado na url.

**Request**

| **Nome** | **Obrigatório** | **Tipo** | **Descrição**                    |
| :------- | :-------------- | :------- | :------------------------------- |
| id       | sim             | `string` | **Enviar via parâmetro de rota** |

> **_NOTA:_** É necessário enviar Token JWT via Authorization Header.

**Response**

Sucesso  
`no body returned for response` <br/> `status: 204` <br/>

Erro comum

```json
{
    "message": "Movie not found",
    "error": "Not Found",
    "statusCode": 404
}
```

</details>

## 5. 💻 Tecnologias usadas

Languages, Frameworks & Librarys:  
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Nest](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white) ![Ts-node](https://img.shields.io/badge/ts--node-3178C6?style=for-the-badge&logo=ts-node&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![JSON](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white) ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white) ![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) ![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

Infra:  
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

Organization:  
![Trello](https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=trello&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

Tests:  
![Insomnia](https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white)

Database:  
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white)

IDE:  
![VSCode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)

## 6. 👨‍💻 Autor

Criado por [Daniel M. Justo](https://www.linkedin.com/in/danielmjusto/).

Obrigado pela visita!
