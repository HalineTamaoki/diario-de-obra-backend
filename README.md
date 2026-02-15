# Diário de Obra 🚧 - Backend

O Diário de Obra é uma aplicação Nest.js, projetada para suportar a interface de diário de obra, incluindo gerenciar os dados do banco de dados.es de projetos de construção civil. O sistema permite o cadastro de usuários, gerenciamento de obras, controle de etapas (ideação, orçamento, execução, finalização), registro de ideias, orçamentos, execuções e finalizações, além de autenticação JWT.

---

## **Pré-requisitos**

- **Node.js** (v18 ou maior)
- **npm** (v9+) ou **yarn** (v1+)

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

Renomeie `.env.example` para `.env` (caso exista) ou crie um arquivo `.env` na raiz do projeto.
Exemplo de variáveis necessárias:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=diario_obra
JWT_SECRET=sua_chave_secreta
```
       
---

## **Executando o Projeto**

### Iniciar Servidor de Desenvolvimento

```bash
npm run start
# ou
yarn start
```

### Gerar Build para Produção

```bash
npm run build
```


### Executar testes unitários

- **Testes unitários:**

```bash
npm run test
```
   
---

## Cobertura de Testes

**Gerar relatório de cobertura:**

```bash
npm run test:cov
```

O relatório estará disponível na pasta `coverage/`.


---

## Estrutura do Projeto

```
diario-de-obra-backend/
src/                  # Código-fonte principal da aplicação
   app.module.ts      # Módulo raiz do Nest.js
   main.ts            # Ponto de entrada da aplicação
   modules/           # Módulos de domínio do sistema
      auth/           # Autenticação e autorização (JWT, guards, etc.)
      usuario/        # Gerenciamento de usuários
      obra/           # Gerenciamento de obras
      itemObra/       # Itens relacionados à obra
      ideacao/        # Etapa de ideação do projeto
      orcamento/      # Etapa de orçamento do projeto
      execucao/       # Etapa de execução do projeto
      finalizacao/    # Etapa de finalização do projeto
   dto/               # Data Transfer Objects compartilhados
test/                 # Testes automatizados (unitários e e2e)
.env                  # Variáveis de ambiente (não versionado)
package.json          # Gerenciador de dependências e scripts
README.md             # Documentação do projeto
```

---

## Tecnologias Utilizadas

- 🦩 [Nest.js](https://nestjs.com/) — Framework Node.js para aplicações escaláveis
- 🗄️ [TypeORM](https://typeorm.io/) — ORM para TypeScript e JavaScript
- 🐘 [PostgreSQL](https://www.postgresql.org/) — Banco de dados relacional
- 🃏 [Jest](https://jestjs.io/) — Testes unitários e de integração
- 🔒 [bcrypt](https://www.npmjs.com/package/bcrypt) — Hash de senhas
- 🛂 [Passport](http://www.passportjs.org/) — Autenticação
- ✅ [class-validator](https://github.com/typestack/class-validator) — Validação de DTOs
- 🌱 [dotenv](https://www.npmjs.com/package/dotenv) — Variáveis de ambiente

---

## Licença

Este projeto está sob a licença **MIT**.  
Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido por Haline Tamaoki**
