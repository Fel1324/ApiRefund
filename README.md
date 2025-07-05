# 🚀 ApiRefund

API para solicitação e gestão de reembolsos corporativos.

![Badge](https://img.shields.io/badge/Node.js-18%2B-green?style=flat-square)
![Badge](https://img.shields.io/badge/Express.js-4.x-blue?style=flat-square)
![Badge](https://img.shields.io/badge/Prisma-ORM-purple?style=flat-square)
![Badge](https://img.shields.io/badge/Typescript-5.x-blue?style=flat-square)
![Badge](https://img.shields.io/badge/SQLite-lightgrey?style=flat-square)

---

## ✨ Sobre o Projeto

O **ApiRefund** é uma API RESTful desenvolvida para facilitar o processo de solicitação, aprovação e acompanhamento de reembolsos em empresas. Possui autenticação JWT, upload de comprovantes, controle de acesso por perfil e validação de dados.

---

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/) (validação)
- [JWT](https://jwt.io/) (autenticação)
- [Multer](https://github.com/expressjs/multer) (upload de arquivos)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) (hash de senhas)

---

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/Fel1324/ApiRefund.git
cd ApiRefund

# Instale as dependências
npm install

# Gere o banco de dados e as tabelas
npx prisma migrate dev

# Inicie o servidor em modo desenvolvimento
npm run dev
```

---

## ⚙️ Configuração

- As configurações de autenticação estão em [`src/configs/auth.ts`](src/configs/auth.ts).
- As configurações de upload estão em [`src/configs/upload.ts`](src/configs/upload.ts).
- O banco de dados padrão é SQLite, salvo em `prisma/dev.db`.

---

## 🗂️ Estrutura de Pastas

```
src/
 ├── app.ts
 ├── server.ts
 ├── configs/
 ├── controllers/
 ├── database/
 ├── middlewares/
 ├── providers/
 ├── routes/
 ├── types/
 └── utils/
prisma/
 ├── schema.prisma
 └── migrations/
tmp/
 └── uploads/
```

---

## 🔐 Autenticação & Perfis

- **Usuário**: `employee` (funcionário) ou `manager` (gestor)
- **Autenticação**: JWT via header `Authorization: Bearer <token>`
- **Controle de acesso**: Middlewares garantem que apenas usuários autorizados acessem cada rota.

---

## 📑 Principais Rotas

### Usuários

- `POST /users` — Cadastro de usuário

### Sessões

- `POST /sessions` — Login (retorna token JWT)

### Reembolsos

- `POST /refunds` — Criar solicitação (employee)
- `GET /refunds` — Listar solicitações (manager)
- `GET /refunds/:id` — Listar solicitação específica (employee/manager)

### Uploads

- `POST /uploads` — Upload de comprovante (employee)
- `GET /uploads/:filename` — Acessar arquivo enviado

---

## 📋 Exemplos de Uso

### Cadastro de Usuário

```json
POST /users
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "minhasenha123",
  "role": "employee"
}
```

### Login

```json
POST /sessions
{
  "email": "joao@email.com",
  "password": "minhasenha123"
}
```

### Criar Solicitação de Reembolso

```json
POST /refunds
Authorization: Bearer <token>
{
  "name": "Almoço reunião",
  "category": "food",
  "amount": 75.50,
  "filename": "<nome-do-arquivo-do-upload>"
}
```

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

> Feito com ♥ by Rocketseat :wave: [Participe da nossa comunidade!](https://discord.gg/rocketseat)
