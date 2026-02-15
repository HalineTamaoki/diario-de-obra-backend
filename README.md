# Diário de Obra Backend

Sistema backend desenvolvido em Nest.js para gerenciamento de obras, permitindo o controle de etapas, ideias, orçamentos, execuções e finalizações de projetos de construção civil.

---

## Índice

- [Descrição](#descrição)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Execução](#execução)
- [Testes](#testes)
- [Cobertura de Testes](#cobertura-de-testes)
- [Documentação da API](#documentação-da-api)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Licença](#licença)

---

## Descrição

O **Diário de Obra Backend** é uma API RESTful desenvolvida em Nest.js para auxiliar no acompanhamento e gestão de obras. O sistema permite o cadastro de usuários, gerenciamento de obras, controle de etapas (ideação, orçamento, execução, finalização), registro de ideias, orçamentos, execuções e finalizações, além de autenticação JWT.

---

## Tecnologias Utilizadas

- [Nest.js](https://nestjs.com/) — Framework Node.js para aplicações escaláveis
- [TypeORM](https://typeorm.io/) — ORM para TypeScript e JavaScript
- [PostgreSQL](https://www.postgresql.org/) — Banco de dados relacional
- [Swagger](https://swagger.io/) — Documentação interativa da API
- [Jest](https://jestjs.io/) — Testes unitários e de integração
- [bcrypt](https://www.npmjs.com/package/bcrypt) — Hash de senhas
- [Passport](http://www.passportjs.org/) — Autenticação
- [class-validator](https://github.com/typestack/class-validator) — Validação de DTOs
- [dotenv](https://www.npmjs.com/package/dotenv) — Variáveis de ambiente

---

## Instalação

# Diário de Obra Backend

Sistema backend desenvolvido em Nest.js para gerenciamento de obras, permitindo o controle de etapas, ideias, orçamentos, execuções e finalizações de projetos de construção civil.

---

## Índice

- [Descrição](#descrição)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Execução](#execução)
- [Testes](#testes)
- [Cobertura de Testes](#cobertura-de-testes)
- [Documentação da API](#documentação-da-api)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Licença](#licença)

---

## Descrição

O **Diário de Obra Backend** é uma API RESTful desenvolvida em Nest.js para auxiliar no acompanhamento e gestão de obras. O sistema permite o cadastro de usuários, gerenciamento de obras, controle de etapas (ideação, orçamento, execução, finalização), registro de ideias, orçamentos, execuções e finalizações, além de autenticação JWT.

---

## Tecnologias Utilizadas

- [Nest.js](https://nestjs.com/) — Framework Node.js para aplicações escaláveis
- [TypeORM](https://typeorm.io/) — ORM para TypeScript e JavaScript
- [PostgreSQL](https://www.postgresql.org/) — Banco de dados relacional
- [Swagger](https://swagger.io/) — Documentação interativa da API
- [Jest](https://jestjs.io/) — Testes unitários e de integração
- [bcrypt](https://www.npmjs.com/package/bcrypt) — Hash de senhas
- [Passport](http://www.passportjs.org/) — Autenticação
- [class-validator](https://github.com/typestack/class-validator) — Validação de DTOs
- [dotenv](https://www.npmjs.com/package/dotenv) — Variáveis de ambiente

---

## Instalação

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/diario-de-obra-backend.git
    cd diario-de-obra-backend
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3. **Configure as variáveis de ambiente:**

    - Renomeie `.env.example` para `.env` (caso exista) ou crie um arquivo `.env` na raiz do projeto.
    - Exemplo de variáveis necessárias:

       ```env
       DB_HOST=localhost
       DB_PORT=5432
       DB_USERNAME=postgres
       DB_PASSWORD=postgres
       DB_DATABASE=diario_obra
       JWT_SECRET=sua_chave_secreta
       ```

---

## Execução

- **Ambiente de desenvolvimento:**

   ```bash
   npm run start:dev
   # ou
   yarn start:dev
   ```

- **Ambiente de produção:**

   ```bash
   npm run start:prod
   # ou
   yarn start:prod
   ```

- **Compilar o projeto:**

   ```bash
   npm run build
   ```

---

## Testes

- **Testes unitários:**

   ```bash
   npm run test
   ```

- **Testes end-to-end:**

   ```bash
   npm run test:e2e
   ```

---

## Cobertura de Testes

- **Gerar relatório de cobertura:**

   ```bash
   npm run test:cov
   ```

- O relatório estará disponível na pasta `coverage/`.

---

## Documentação da API

- Após iniciar o projeto, acesse a documentação interativa (Swagger) em:

   ```
   http://localhost:3000/api
   ```

   *(Configure a rota conforme implementado no projeto)*

---

## Estrutura do Projeto

```text
src/
   app.module.ts
   main.ts
   modules/
      auth/
      usuario/
      obra/
      itemObra/
      ideacao/
      orcamento/
      execucao/
      finalizacao/
   dto/
test/
.env
package.json
README.md
```

---

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).