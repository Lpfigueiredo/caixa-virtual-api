[![Build Status](https://travis-ci.org/Lpfigueiredo/caixa-virtual-api.svg?branch=master)](https://travis-ci.org/Lpfigueiredo/caixa-virtual-api)
[![Coverage Status](https://coveralls.io/repos/github/Lpfigueiredo/caixa-virtual-api/badge.svg?branch=master)](https://coveralls.io/github/Lpfigueiredo/caixa-virtual-api?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

[![alt text](./.github/caixa-virtual-api-banner.png "Link para a documentação da API")](https://caixa-virtual-api.herokuapp.com/docs)

---

## [**Link para a documentação da API**](https://caixa-virtual-api.herokuapp.com/docs)

> ## Requisitos

1. [Cadastro](./requirements/signup.md)
2. [Login](./requirements/login.md)

> ## Resumo do projeto

* Linguagem: TypeScript/JavaScript
* Interpretador JavaScript: Node.js
* Gerenciador de pacotes: npm
* Controle de versão: Git
* Repositório: GitHub
* Banco de dados não-relacional: MongoDB
* Arquitetura: [Clean Architecture](./diagrams), API REST
* Segurança: CORS, bcrypt
* Autenticação: JWT
* Validação: Joi, Celebrate
* Testes unitários e de integração: Jest
* Integração contínua e entrega contínua (CI/CD): Jenkins, TravisCI, Coveralls
* Princípios de design e desenvolvimento: TDD, SOLID, KISS, YAGNI, DRY
* Conteinerização: Docker
* Documentação: Swagger
* Provedor de serviço de nuvem: AWS, Heroku

> ## Como rodar o projeto

Para rodar o projeto, é necessário que os seguintes recursos estejam instalados e inicializados em sua máquina:
- Git
- Docker

Em seu Terminal, digite os seguintes comandos:
```bash
$ git clone https://github.com/Lpfigueiredo/caixa-virtual-api.git
$ cd caixa-virtual-api
$ docker-compose up
```

Aguarde até que apareça a seguinte mensagem:
```bash
Server running at http://localhost:5050
```

Mantenha o Terminal aberto.

> ## Rotas

A API é composta por 7 rotas. São elas:
- `/api/signup`: Responsável por criar um novo usuário
- `/api/login`: Responsável por fazer o login do usuário
- `/api/categories`: Responsável por cadastrar ou visualizar as categorias criadas pelo usuário, de acordo com o método HTTP
- `/api/entries/{categoryId}`: Responsável por adicionar as Entradas monetárias do usuário
- `/api/exits/{categoryId}`: Responsável por adicionar as Saídas monetárias do usuário
- `/api/daily-movement`: Responsável por visualizar as movimentações diárias do usuário
- `/docs`: Responsável por visualizar a documentação detalhada com Swagger
---

<h4 align="center">Feito de 💜 por: <a href="https://www.linkedin.com/in/leonardo-paulo-figueiredo/">Leonardo Paulo Figueiredo</a></h4>
