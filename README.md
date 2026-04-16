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

## 🛠️ Tecnologias e Stack

A arquitetura foi desenhada para garantir isolamento de responsabilidades e alta performance:

- **Frontend:** React com Tailwind CSS (Interfaces responsivas e gráficos interativos).
- **Backend:** Node.js (API RESTful para regras de negócio operacionais).
- **Módulo Analítico:** Python com Pandas (Processamento estatístico e insights).
- **Banco de Dados:** PostgreSQL (Persistência relacional com integridade financeira).
- **Mensageria:** Redis (Processamento assíncrono de alertas e relatórios pesados).
- **Infraestrutura:** Docker & Docker Compose (Containerização completa).

---

## 📈 Gestão do Projeto

Acompanhamos o desenvolvimento através de metodologias ágeis (Scrum), utilizando o quadro Kanban para rastreabilidade de User Stories e Milestones.

🔗 **[Link para o Board do GitHub Projects](https://github.com/users/MariaLuizaMb/projects/2)**

---

## 🚀 Como Usar?

### 📥 Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina:
- [Git](https://git-scm.com)
- [Docker](https://www.docker.com/products/docker-desktop) e [Docker Compose](https://docs.docker.com/compose/)

### 🛠️ Instalação e Execução (Passo a Passo)

2.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto (ou dentro das pastas `backend` e `analytics`, conforme sua estrutura) baseando-se no arquivo de exemplo:
    ```bash
    cp .env.example .env
    ```
    Certifique-se de preencher as chaves de conexão do Banco de Dados e o `JWT_SECRET`.

3.  **Suba a aplicação via Docker:**
    O comando abaixo orquestra todos os containers (Frontend, Backend, Banco de Dados, Redis e Módulo Python) de forma automatizada:
    ```bash
    docker-compose up --build
    ```

4.  **Acesse a aplicação:**
    Após os containers iniciarem, os serviços estarão disponíveis em:
    * **Frontend:** [http://localhost:3000](http://localhost:3000)
    * **API Backend:** [http://localhost:5000](http://localhost:5000)
    * **Documentação API (Swagger):** [http://localhost:5000/docs](http://localhost:5000/docs)

---

## 📂 Estrutura do Projeto

```bash
📁 SpendSmart/
│
├── 📁 .github/             # Workflows do CI/CD (GitHub Actions)
├── 📁 src/
│   ├── 📁 backend/         # API RESTful em Node.js (Express + Prisma/Sequelize)
│   ├── 📁 frontend/        # Aplicação Web em React (Tailwind + Vite)
│   └── 📁 analytics/       # Engine de análise em Python (Pandas + Redis Consumer)
├── 📁 tests/               # Suítes de testes automatizados (Jest/PyTest)
├── 📁 docs/                # Retrospectivas, Diagramas ER e Backlog de Requisitos
├── 📄 docker-compose.yml   # Arquivo de orquestração da stack completa
└── 📄 README.md            # Documentação principal do projeto

```
---

## 💬 Considerações Finais

O desenvolvimento do SpendSmart representa a consolidação de nossa jornada acadêmica, servindo como o ponto de convergência de diversos conhecimentos adquiridos ao longo da graduação. Este projeto consolida pilares fundamentais da Ciência da Computação e Engenharia de Software, tais como:

- **Algoritmos e Estruturas de Dados:** Aplicados no processamento eficiente de grandes volumes de registros financeiros.

- **Engenharia de Software:** Através do uso de metodologias ágeis, padrões de projeto (Design Patterns) e ciclo de vida de desenvolvimento.

- **Banco de Dados:** Na modelagem relacional complexa e garantia da integridade e segurança da informação.

- **Sistemas Distribuídos e DevOps: Com a containerização em Docker e o uso de mensageria para processamento assíncrono.

- **Inteligência de Dados:** No uso de ferramentas analíticas para transformar dados brutos em conhecimento estratégico.

Em suma, este projeto não apenas visa atender aos requisitos da disciplina GCC267, mas materializa nossa capacidade técnica de projetar e implementar soluções robustas, escaláveis e prontas para o mercado real.
