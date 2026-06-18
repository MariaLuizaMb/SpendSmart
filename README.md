<p align="center">
  <img src="https://img.icons8.com/fluency/96/money-box.png" width="100" alt="Logo SpendSmart"/>
</p>

<h1 align="center">💰 SpendSmart</h1>

<p align="center">
  <i>Disciplina: GCC267 - Projeto Integrador I</i><br>
  <i>Universidade Federal de Lavras (UFLA)</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-em%20desenvolvimento-blue" alt="Status do Projeto"/>
  <img src="https://img.shields.io/badge/Sprint-1-green" alt="Sprint Status"/>
  <a href="https://github.com/MariaLuizaMb/SpendSmart/actions/workflows/ci.yml">
    <img src="https://github.com/MariaLuizaMb/SpendSmart/actions/workflows/ci.yml/badge.svg" alt="Actions Status"/>
  </a>
  <a href="https://sonarcloud.io/summary/new_code?id=MariaLuizaMb_SpendSmart">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=MariaLuizaMb_SpendSmart&metric=alert_status" alt="Quality Gate Status"/>
  </a>
</p>

---

## 🎯 Objetivo do Produto

O **SpendSmart** é uma plataforma de gestão financeira pessoal desenvolvida para indivíduos que buscam sair do controle reativo e migrar para uma análise estratégica de seus gastos. 

Diferente de uma simples planilha, o sistema utiliza **análise comportamental e preditiva** para identificar padrões de consumo, projetar gastos futuros e emitir alertas inteligentes. O objetivo central é promover a consciência financeira através de indicadores de desempenho e visualizações interativas de dados.

---

## 👩‍💻 Equipe e Responsabilidades

- **Professor:** Dr. Rafael S. Durelli
- **Integrantes:**
  - **Érika Mara de Morais Machado:** Gerente de Projeto & Product Manager/Product Owner. Responsável pela gestão do board, documentações, planejamento de Sprints, visão do produto e engenharia de requisitos.
  - **Maria Luiza Bernardo Madeira:** Designer, Fullstack Developer & Data Specialist. Responsável pelo design de interfaces (UI/UX), implementação de funcionalidades e arquitetura do módulo analítico de dados.
  - **João Vitor Garcia Moreira:** Fullstack Developer, QA & DevOps. Responsável pelo desenvolvimento de ponta a ponta, garantia de qualidade (testes automatizados) e infraestrutura de CI/CD e Deploy.

---

## 🛠️ Tecnologias e Stack - SPRINT 1

A arquitetura foi desenhada para garantir isolamento de responsabilidades e alta performance:

### 🔹 Backend
- **Node.js (LTS)**
- **Express v5.2.x**
- **Prisma ORM v7.7.x** (com suporte a Neon/PostgreSQL)
- **JWT v9.0.x & Bcrypt v6.0.x** (Segurança)
- **Vitest v4.1.x** (Testes Unitários e de Integração)

### 🔹 Frontend
- **React v19.0**
- **Vite v8.0.x**
- **Tailwind CSS v4.0**
- **Shadcn/UI & Radix UI** (Componentização)
- **React Router Dom v7.14.x** (Navegação)

### 🔹 Infraestrutura
- **Docker + Docker Compose**

---

## 📈 Gestão do Projeto

Acompanhamos o desenvolvimento através de metodologias ágeis (Scrum), utilizando o quadro Kanban para rastreabilidade de User Stories e Milestones.

🔗 **[Link para o Board do GitHub Projects](https://github.com/users/MariaLuizaMb/projects/2)**

---

## 🚀 Como Executar o Projeto

### 📥 Pré-requisitos
- Git instalado
- Docker + Docker Compose instalados

---

### 🛠️ Passo a Passo

#### 1. Clone o repositório
```bash
git clone https://github.com/MariaLuizaMb/SpendSmart.git
cd SpendSmart

```
#### 2. Configure os arquivos .env

#### 3. Suba os containers
```
docker-compose up --build
```
#### 4. Acesse a aplicação

🌐 Frontend: http://localhost:5173
🔗 Backend API: http://localhost:3000

## Filas, Redis e Notificações

O backend possui processamento assíncrono complementar com Redis e BullMQ. As rotas existentes continuam funcionando de forma síncrona; após criação, edição ou remoção de lançamentos e orçamentos, o backend tenta enfileirar jobs sem interromper a operação principal caso o Redis esteja indisponível.

Filas configuradas:
- `financial-analysis`: recalcula insights e alertas com apoio do serviço Python/FastAPI.
- `budget-alerts`: processa alertas financeiros, persiste notificações e tenta enviar e-mails.

Workers:
```bash
cd backend
npm run worker:financial
npm run worker:budget-alerts
```

Variáveis principais:
```env
REDIS_URL=redis://redis:6379
QUEUE_PREFIX=spendsmart
QUEUE_DISABLED=false
MAIL_HOST=
MAIL_PORT=587
MAIL_USER=
MAIL_PASS=
MAIL_FROM="SpendSmart <no-reply@spendsmart.local>"
MAIL_SECURE=false
MAIL_DISABLED=true
```

Em desenvolvimento e teste, o envio real de e-mail pode permanecer desativado com `MAIL_DISABLED=true`. As notificações persistidas podem ser consultadas pelos endpoints protegidos `GET /notifications`, `PATCH /notifications/:id/read` e `PATCH /notifications/read-all`. O frontend possui um dropdown simples de notificações na sidebar para listar as últimas notificações e marcar itens como lidos, sem criar uma página completa nesta etapa.

## 📁 Estrutura de Pastas

```
📁 SpendSmart/
│
├── 📁 backend/
│   ├── 📁 prisma/
│   │   ├── 📁 migrations/
│   │   └── 📄 schema.prisma
│   │
│   ├── 📁 generated/           # Cliente gerado pelo Prisma
│   │
│   ├── 📁 src/
│   │   ├── 📁 controllers/     # Camada de controle (req/res)
│   │   ├── 📁 services/        # Regras de negócio
│   │   ├── 📁 routes/          # Definição de rotas
│   │   ├── 📁 middlewares/     # Autenticação, etc
│   │   ├── 📁 database/        # Configuração do Prisma
│   │   ├── 📁 errors/          # Erros customizados
│   │   ├── 📁 utils/           # Funções auxiliares
│   │   ├── 📁 scripts/         # Scripts auxiliares
│   │   ├── 📄 app.js           # Configuração do Express
│   │   └── 📄 server.js        # Inicialização do servidor
│   │
│   ├── 📁 tests/               # Testes com Vitest
│   ├── 📄 Dockerfile
│   ├── 📄 package.json
│   └── 📄 vitest.config.js
│
├── 📁 frontend/
│   ├── 📁 public/              # Arquivos estáticos
│   │
│   ├── 📁 src/
│   │   ├── 📁 assets/          # Imagens e recursos
│   │   ├── 📁 components/
│   │   │   └── 📁 ui/          # Componentes (Shadcn/Radix)
│   │   ├── 📁 pages/           # Páginas
│   │   ├── 📁 routes/          # Rotas da aplicação
│   │   ├── 📁 services/        # Comunicação com API
│   │   ├── 📁 lib/             # Helpers/utilitários
│   │   ├── 📄 App.jsx
│   │   └── 📄 main.jsx
│   │
│   ├── 📄 index.html
│   ├── 📄 Dockerfile
│   ├── 📄 package.json
│   └── 📄 vite.config.js
│
├── 📄 docker-compose.yml       # Orquestração dos serviços
└── 📄 .gitignore

```
---

## 💬 Considerações Finais

O desenvolvimento do SpendSmart representa a consolidação de nossa jornada acadêmica, servindo como o ponto de convergência de diversos conhecimentos adquiridos ao longo da graduação. Este projeto consolida pilares fundamentais da Ciência da Computação e Engenharia de Software, tais como:

- **Algoritmos e Estruturas de Dados:** Aplicados no processamento eficiente de grandes volumes de registros financeiros.

- **Engenharia de Software:** Através do uso de metodologias ágeis, padrões de projeto (Design Patterns) e ciclo de vida de desenvolvimento.

- **Banco de Dados:** Na modelagem relacional complexa e garantia da integridade e segurança da informação.

- **Sistemas Distribuídos e DevOps**: Com a containerização em Docker e o uso de mensageria para processamento assíncrono.

- **Inteligência de Dados:** No uso de ferramentas analíticas para transformar dados brutos em conhecimento estratégico.

Em suma, este projeto não apenas visa atender aos requisitos da disciplina GCC267, mas materializa nossa capacidade técnica de projetar e implementar soluções robustas, escaláveis e prontas para o mercado real.
