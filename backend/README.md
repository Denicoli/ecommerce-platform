# 🛒 E-commerce Platform - Backend

Este é o backend da **E-commerce Platform**, uma API RESTful desenvolvida com **NestJS** e **Prisma**, que oferece funcionalidades para autenticação de usuários, sincronização de produtos via APIs externas, criação de pedidos e persistência em banco de dados relacional.

## ✨ Funcionalidades

- Registro e login de usuários com autenticação via JWT
- Endpoint `/me` protegido para retornar dados do usuário autenticado
- Sincronização de produtos a partir de duas APIs externas (`API_BR` e `API_EU`)
- Armazenamento dos produtos no banco com validações
- Listagem e busca de produtos com filtros por nome, categoria e preço
- Criação de pedidos com associação de produtos e cálculo automático de total
- Listagem dos pedidos feitos por um usuário autenticado
- Integração com banco de dados PostgreSQL
- Organização modular utilizando boas práticas do NestJS

## 🔌 Estrutura de Integrações

Durante o sync de produtos, o sistema consome duas APIs externas:

- `API_BR`: provedor brasileiro (simulado)
- `API_EU`: provedor europeu (simulado)

Os dados são normalizados e salvos localmente no banco, evitando acoplamento direto com os formatos externos.

## 📦 Tecnologias utilizadas

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [Axios](https://axios-http.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/ecommerce-platform.git
cd ecommerce-platform/backend
```
### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

### 4. Configure o banco de dados (PostgreSQL)

```bash
npx prisma generate
npx prisma migrate dev --name init
```


### 5. Rode o servidor localmente

```bash
npm run start:dev
```

A API estará disponível em http://localhost:3000

## 📡 Rotas principais da API

### 🧑‍💼 Autenticação

- `POST /auth/register` — Cria novo usuário
- `POST /auth/login` — Retorna token JWT
- `GET /auth/me` — Retorna dados do usuário autenticado

### 📦 Produtos

- `POST /products/sync` – Sincroniza produtos das APIs externas
- `GET /products` – Lista todos os produtos (com filtros opcionais)
- `GET /products/:id` – Retorna um produto específico por ID

### 📑 Pedidos

- `POST /orders` – Cria um novo pedido com os produtos no corpo
#### 🧾 Payload esperado:

```json
{
  "products": [
    {
      "productId": "string",
      "quantity": number
    }
  ]
}
```
#### 📝 Campos:

| Campo        | Tipo    | Obrigatório | Descrição                                  |
|--------------|---------|-------------|--------------------------------------------|
| `items`      | Array   | Sim         | Lista de produtos no pedido                |
| `productId`  | String  | Sim         | ID do produto a ser adicionado ao pedido   |
| `quantity`   | Number  | Sim         | Quantidade do produto                      |

- `GET /orders` – Lista todos os pedidos do usuário autenticado

## 🛠️ Estrutura de Pastas
```txt
src/
├── auth/         ← Registro, login e JWT
├── products/     ← Produtos + sincronização com APIs externas
├── orders/       ← Criação e listagem de pedidos
├── prisma/       ← Serviço Prisma + schema.prisma
├── config/       ← Configurações de APIs externas
├── integrations/ ← Ponto futuro para serviços externos (frete, e-mail, etc)
├── .env          ← Variáveis de ambiente
├── package.json  ← Dependências e scripts
├── README.md     ← Documentação da API RESTful
└── main.ts       ← Ponto de entrada da aplicação
```

## 📌 Observações

Todos os endpoints protegidos exigem o header:
Authorization: Bearer <seu-token>

O módulo integrations está reservado para futuras integrações com:

Gateways de pagamento (ex: Mercado Pago)

APIs de frete (ex: Correios, MelhorEnvio)

E-mails transacionais (ex: SendGrid)

## 🧪 Testes

Você pode rodar os testes unitários com:

npm run test

## 📍 Próximos passos

Implementação do carrinho de compras

Integração com gateway de pagamento

Integração com serviço de frete

Interface Web (React) e App mobile (Flutter)

---

## 🧑‍💻 Autor
Desenvolvido por Tiago Denicoli com ❤️ e muita dedicação!
Entre em contato: tiagodenicoli@gmail.com

---

## Licença

Este projeto está licenciado sob a licença MIT.