import bcrypt from "bcrypt";

import prisma from "../database/prisma.js";

const DEMO_EMAIL = "demo@spendsmart.com";
const DEMO_PASSWORD = "SpendSmart123";
const DEMO_USER_ID = "seed_demo_user";
const HASH_ROUNDS = 10;

const DEFAULT_CATEGORIES = [
  { key: "mercado", nome: "Mercado", tipo: "DESPESA" },
  { key: "transporte", nome: "Transporte", tipo: "DESPESA" },
  { key: "aluguel", nome: "Aluguel", tipo: "DESPESA" },
  { key: "agua", nome: "Água", tipo: "DESPESA" },
  { key: "luz", nome: "Luz", tipo: "DESPESA" },
  { key: "internet", nome: "Internet", tipo: "DESPESA" },
  { key: "telefone", nome: "Telefone", tipo: "DESPESA" },
  { key: "saude", nome: "Saúde", tipo: "DESPESA" },
  { key: "farmacia", nome: "Farmácia", tipo: "DESPESA" },
  { key: "educacao", nome: "Educação", tipo: "DESPESA" },
  { key: "lazer", nome: "Lazer", tipo: "DESPESA" },
  { key: "assinaturas", nome: "Assinaturas", tipo: "DESPESA" },
  { key: "restaurantes", nome: "Restaurantes", tipo: "DESPESA" },
  { key: "roupas", nome: "Roupas", tipo: "DESPESA" },
  { key: "pets", nome: "Pets", tipo: "DESPESA" },
  { key: "compras", nome: "Compras", tipo: "DESPESA" },
  { key: "impostos", nome: "Impostos", tipo: "DESPESA" },
  {
    key: "cartao_credito",
    nome: "Cartão de Crédito",
    tipo: "DESPESA",
  },
  { key: "salario", nome: "Salário", tipo: "RECEITA" },
  { key: "freelance", nome: "Freelance", tipo: "RECEITA" },
  { key: "renda_extra", nome: "Renda Extra", tipo: "RECEITA" },
  { key: "presente", nome: "Presente", tipo: "RECEITA" },
  { key: "reembolso", nome: "Reembolso", tipo: "RECEITA" },
  { key: "investimentos", nome: "Investimentos", tipo: "RECEITA" },
  { key: "venda", nome: "Venda", tipo: "RECEITA" },
];

const CUSTOM_CATEGORIES = [
  { key: "academia", nome: "Academia", tipo: "DESPESA" },
  { key: "viagens", nome: "Viagens", tipo: "DESPESA" },
  { key: "bonus", nome: "Bônus", tipo: "RECEITA" },
];

const ACCOUNT_SEEDS = [
  {
    key: "nubank",
    nome: "Nubank",
    tipo: "CONTA_CORRENTE",
    saldoInicial: "2400.00",
    modeloCartao: "NUBANK",
    descricao: "Conta principal para despesas do mês.",
  },
  {
    key: "caixa",
    nome: "Caixa",
    tipo: "POUPANCA",
    saldoInicial: "6800.00",
    modeloCartao: "CAIXA",
    descricao: "Reserva de emergência e objetivos de curto prazo.",
  },
  {
    key: "carteira",
    nome: "Carteira",
    tipo: "CARTEIRA_DINHEIRO",
    saldoInicial: "220.00",
    modeloCartao: "DEFAULT",
    descricao: "Dinheiro físico para pequenas despesas.",
  },
  {
    key: "mercado_pago",
    nome: "Mercado Pago",
    tipo: "CARTEIRA_DIGITAL",
    saldoInicial: "450.00",
    modeloCartao: "MERCADO_PAGO",
    descricao: "Carteira digital para compras online.",
  },
];

function currentUtcMonthStart() {
  const now = new Date();

  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
}

function addMonths(date, amount) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + amount, 1));
}

function dateInMonth(monthStart, day) {
  const year = monthStart.getUTCFullYear();
  const month = monthStart.getUTCMonth();
  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

  return new Date(Date.UTC(year, month, Math.min(day, lastDay), 12));
}

function currency(value) {
  return Number(value).toFixed(2);
}

function monthKey(monthStart) {
  return `${monthStart.getUTCFullYear()}-${String(
    monthStart.getUTCMonth() + 1,
  ).padStart(2, "0")}`;
}

async function upsertUser() {
  const senhaHash = await bcrypt.hash(DEMO_PASSWORD, HASH_ROUNDS);

  return prisma.usuario.upsert({
    where: { email: DEMO_EMAIL },
    create: {
      id: DEMO_USER_ID,
      nome: "Usuária Demonstração",
      email: DEMO_EMAIL,
      senhaHash,
    },
    update: {
      nome: "Usuária Demonstração",
      senhaHash,
    },
  });
}

async function upsertDefaultCategory({ key, nome, tipo }) {
  const existente = await prisma.categoria.findFirst({
    where: {
      nome,
      tipo,
      ehPadrao: true,
      idUsuario: null,
    },
  });

  if (existente) {
    return prisma.categoria.update({
      where: { id: existente.id },
      data: {
        nome,
        tipo,
        ehPadrao: true,
        idUsuario: null,
      },
    });
  }

  return prisma.categoria.upsert({
    where: { id: `seed_cat_default_${key}` },
    create: {
      id: `seed_cat_default_${key}`,
      nome,
      tipo,
      ehPadrao: true,
      idUsuario: null,
    },
    update: {
      nome,
      tipo,
      ehPadrao: true,
      idUsuario: null,
    },
  });
}

async function upsertCustomCategory(idUsuario, { key, nome, tipo }) {
  const existente = await prisma.categoria.findFirst({
    where: {
      idUsuario,
      nome: {
        equals: nome,
        mode: "insensitive",
      },
      tipo,
      ehPadrao: false,
    },
  });

  if (existente) {
    return prisma.categoria.update({
      where: { id: existente.id },
      data: { nome, tipo, ehPadrao: false },
    });
  }

  return prisma.categoria.upsert({
    where: { id: `seed_cat_user_${key}` },
    create: {
      id: `seed_cat_user_${key}`,
      idUsuario,
      nome,
      tipo,
      ehPadrao: false,
    },
    update: {
      idUsuario,
      nome,
      tipo,
      ehPadrao: false,
    },
  });
}

async function seedCategories(idUsuario) {
  const entries = await Promise.all([
    ...DEFAULT_CATEGORIES.map(async (category) => [
      category.key,
      await upsertDefaultCategory(category),
    ]),
    ...CUSTOM_CATEGORIES.map(async (category) => [
      category.key,
      await upsertCustomCategory(idUsuario, category),
    ]),
  ]);

  return Object.fromEntries(entries);
}

async function upsertAccount(idUsuario, account) {
  const existente = await prisma.conta.findFirst({
    where: {
      idUsuario,
      nome: account.nome,
    },
  });

  if (existente) {
    return prisma.conta.update({
      where: { id: existente.id },
      data: {
        tipo: account.tipo,
        saldoInicial: account.saldoInicial,
        modeloCartao: account.modeloCartao,
        descricao: account.descricao,
        ativa: true,
      },
    });
  }

  return prisma.conta.upsert({
    where: { id: `seed_account_${account.key}` },
    create: {
      id: `seed_account_${account.key}`,
      idUsuario,
      nome: account.nome,
      tipo: account.tipo,
      saldoInicial: account.saldoInicial,
      modeloCartao: account.modeloCartao,
      descricao: account.descricao,
      ativa: true,
    },
    update: {
      idUsuario,
      nome: account.nome,
      tipo: account.tipo,
      saldoInicial: account.saldoInicial,
      modeloCartao: account.modeloCartao,
      descricao: account.descricao,
      ativa: true,
    },
  });
}

async function seedAccounts(idUsuario) {
  const entries = await Promise.all(
    ACCOUNT_SEEDS.map(async (account) => [
      account.key,
      await upsertAccount(idUsuario, account),
    ]),
  );

  return Object.fromEntries(entries);
}

function createLaunchSeed({
  id,
  idUsuario,
  category,
  account,
  valor,
  date,
  tipo,
  descricao,
  recorrencia = "NENHUMA",
}) {
  return {
    id,
    idUsuario,
    idCategoria: category.id,
    idConta: account?.id || null,
    valor: currency(valor),
    dataTransacao: date,
    tipo,
    descricao,
    recorrencia,
  };
}

function buildLaunches(idUsuario, categories, accounts) {
  const currentMonth = currentUtcMonthStart();
  const launches = [];

  for (let offset = -6; offset <= 0; offset += 1) {
    const month = addMonths(currentMonth, offset);
    const key = monthKey(month);
    const seasonal = offset + 6;

    launches.push(
      createLaunchSeed({
        id: `seed_launch_salary_${key}`,
        idUsuario,
        category: categories.salario,
        account: accounts.nubank,
        valor: 5600,
        date: dateInMonth(month, 5),
        tipo: "RECEITA",
        descricao: "Salário mensal",
        recorrencia: "MENSAL",
      }),
      createLaunchSeed({
        id: `seed_launch_rent_${key}`,
        idUsuario,
        category: categories.aluguel,
        account: accounts.nubank,
        valor: 1650,
        date: dateInMonth(month, 6),
        tipo: "DESPESA",
        descricao: "Aluguel do apartamento",
        recorrencia: "MENSAL",
      }),
      createLaunchSeed({
        id: `seed_launch_internet_${key}`,
        idUsuario,
        category: categories.internet,
        account: accounts.nubank,
        valor: 119.9,
        date: dateInMonth(month, 10),
        tipo: "DESPESA",
        descricao: "Internet residencial",
        recorrencia: "MENSAL",
      }),
      createLaunchSeed({
        id: `seed_launch_subscriptions_${key}`,
        idUsuario,
        category: categories.assinaturas,
        account: accounts.mercado_pago,
        valor: 92.8,
        date: dateInMonth(month, 12),
        tipo: "DESPESA",
        descricao: "Streaming e ferramentas digitais",
        recorrencia: "MENSAL",
      }),
      createLaunchSeed({
        id: `seed_launch_market_main_${key}`,
        idUsuario,
        category: categories.mercado,
        account: accounts.nubank,
        valor: 430 + seasonal * 18,
        date: dateInMonth(month, 7),
        tipo: "DESPESA",
        descricao: "Compra principal de mercado",
      }),
      createLaunchSeed({
        id: `seed_launch_transport_${key}`,
        idUsuario,
        category: categories.transporte,
        account: accounts.nubank,
        valor: 260 + seasonal * 9,
        date: dateInMonth(month, 14),
        tipo: "DESPESA",
        descricao: "Transporte e aplicativos",
      }),
      createLaunchSeed({
        id: `seed_launch_light_${key}`,
        idUsuario,
        category: categories.luz,
        account: accounts.caixa,
        valor: 170 + seasonal * 7,
        date: dateInMonth(month, 18),
        tipo: "DESPESA",
        descricao: "Conta de luz",
      }),
      createLaunchSeed({
        id: `seed_launch_restaurants_${key}`,
        idUsuario,
        category: categories.restaurantes,
        account: accounts.nubank,
        valor: 210 + seasonal * 24,
        date: dateInMonth(month, 20),
        tipo: "DESPESA",
        descricao: "Restaurantes e cafés",
      }),
      createLaunchSeed({
        id: `seed_launch_health_${key}`,
        idUsuario,
        category: categories.saude,
        account: accounts.caixa,
        valor: offset >= -1 ? 260 : 120,
        date: dateInMonth(month, 23),
        tipo: "DESPESA",
        descricao: "Consultas e medicamentos",
      }),
    );

    if (offset % 2 === 0) {
      launches.push(
        createLaunchSeed({
          id: `seed_launch_freelance_${key}`,
          idUsuario,
          category: categories.freelance,
          account: accounts.mercado_pago,
          valor: 750 + seasonal * 35,
          date: dateInMonth(month, 15),
          tipo: "RECEITA",
          descricao: "Projeto freelance",
        }),
      );
    }

    if (offset < 0) {
      launches.push(
        createLaunchSeed({
          id: `seed_launch_savings_${key}`,
          idUsuario,
          category: categories.investimentos,
          account: accounts.caixa,
          valor: 350,
          date: dateInMonth(month, 26),
          tipo: "RECEITA",
          descricao: "Rendimento de investimento",
        }),
      );
    }
  }

  launches.push(
    createLaunchSeed({
      id: "seed_launch_current_market_extra_1",
      idUsuario,
      category: categories.mercado,
      account: accounts.nubank,
      valor: 280,
      date: dateInMonth(currentMonth, 13),
      tipo: "DESPESA",
      descricao: "Reposição de mercado",
    }),
    createLaunchSeed({
      id: "seed_launch_current_market_extra_2",
      idUsuario,
      category: categories.mercado,
      account: accounts.nubank,
      valor: 240,
      date: dateInMonth(currentMonth, 16),
      tipo: "DESPESA",
      descricao: "Compra de hortifruti",
    }),
    createLaunchSeed({
      id: "seed_launch_current_restaurant_extra",
      idUsuario,
      category: categories.restaurantes,
      account: accounts.nubank,
      valor: 185,
      date: dateInMonth(currentMonth, 16),
      tipo: "DESPESA",
      descricao: "Jantar com amigos",
    }),
    createLaunchSeed({
      id: "seed_launch_current_gym",
      idUsuario,
      category: categories.academia,
      account: accounts.nubank,
      valor: 139.9,
      date: dateInMonth(currentMonth, 8),
      tipo: "DESPESA",
      descricao: "Mensalidade da academia",
      recorrencia: "MENSAL",
    }),
    createLaunchSeed({
      id: "seed_launch_current_bonus",
      idUsuario,
      category: categories.bonus,
      account: accounts.caixa,
      valor: 600,
      date: dateInMonth(currentMonth, 17),
      tipo: "RECEITA",
      descricao: "Bônus por meta entregue",
    }),
    createLaunchSeed({
      id: "seed_launch_current_credit_card_due",
      idUsuario,
      category: categories.cartao_credito,
      account: accounts.nubank,
      valor: 780,
      date: dateInMonth(currentMonth, 25),
      tipo: "DESPESA",
      descricao: "Fatura do cartão prevista",
      recorrencia: "MENSAL",
    }),
    createLaunchSeed({
      id: "seed_launch_current_reimbursement_due",
      idUsuario,
      category: categories.reembolso,
      account: accounts.mercado_pago,
      valor: 320,
      date: dateInMonth(currentMonth, 28),
      tipo: "RECEITA",
      descricao: "Reembolso previsto",
      recorrencia: "MENSAL",
    }),
  );

  return launches;
}

async function seedLaunches(idUsuario, categories, accounts) {
  const launches = buildLaunches(idUsuario, categories, accounts);

  for (const launch of launches) {
    await prisma.lancamento.upsert({
      where: { id: launch.id },
      create: launch,
      update: {
        idUsuario,
        idCategoria: launch.idCategoria,
        idConta: launch.idConta,
        valor: launch.valor,
        dataTransacao: launch.dataTransacao,
        tipo: launch.tipo,
        descricao: launch.descricao,
        recorrencia: launch.recorrencia,
      },
    });
  }

  return launches.length;
}

function buildBudgets(idUsuario, categories) {
  const currentMonth = currentUtcMonthStart();
  const nextMonth = addMonths(currentMonth, 1);

  return [
    {
      id: "seed_budget_current_general",
      idUsuario,
      idCategoria: null,
      valor: "4200.00",
      mes: currentMonth.getUTCMonth() + 1,
      ano: currentMonth.getUTCFullYear(),
      descricao: "Limite geral para o mês atual.",
    },
    {
      id: "seed_budget_current_market",
      idUsuario,
      idCategoria: categories.mercado.id,
      valor: "700.00",
      mes: currentMonth.getUTCMonth() + 1,
      ano: currentMonth.getUTCFullYear(),
      descricao: "Controle de compras de mercado.",
    },
    {
      id: "seed_budget_current_restaurants",
      idUsuario,
      idCategoria: categories.restaurantes.id,
      valor: "520.00",
      mes: currentMonth.getUTCMonth() + 1,
      ano: currentMonth.getUTCFullYear(),
      descricao: "Restaurantes, cafés e delivery.",
    },
    {
      id: "seed_budget_current_transport",
      idUsuario,
      idCategoria: categories.transporte.id,
      valor: "380.00",
      mes: currentMonth.getUTCMonth() + 1,
      ano: currentMonth.getUTCFullYear(),
      descricao: "Transporte público, combustível e apps.",
    },
    {
      id: "seed_budget_current_health",
      idUsuario,
      idCategoria: categories.saude.id,
      valor: "250.00",
      mes: currentMonth.getUTCMonth() + 1,
      ano: currentMonth.getUTCFullYear(),
      descricao: "Saúde e farmácia.",
    },
    {
      id: "seed_budget_current_leisure",
      idUsuario,
      idCategoria: categories.lazer.id,
      valor: "300.00",
      mes: currentMonth.getUTCMonth() + 1,
      ano: currentMonth.getUTCFullYear(),
      descricao: "Lazer e entretenimento.",
    },
    {
      id: "seed_budget_next_general",
      idUsuario,
      idCategoria: null,
      valor: "4500.00",
      mes: nextMonth.getUTCMonth() + 1,
      ano: nextMonth.getUTCFullYear(),
      descricao: "Planejamento geral do próximo mês.",
    },
  ];
}

async function upsertBudget(budget) {
  const existente = await prisma.orcamento.findFirst({
    where: {
      idUsuario: budget.idUsuario,
      mes: budget.mes,
      ano: budget.ano,
      idCategoria: budget.idCategoria,
    },
  });

  if (existente) {
    return prisma.orcamento.update({
      where: { id: existente.id },
      data: {
        valor: budget.valor,
        descricao: budget.descricao,
      },
    });
  }

  return prisma.orcamento.upsert({
    where: { id: budget.id },
    create: budget,
    update: {
      idUsuario: budget.idUsuario,
      idCategoria: budget.idCategoria,
      valor: budget.valor,
      mes: budget.mes,
      ano: budget.ano,
      descricao: budget.descricao,
    },
  });
}

async function seedBudgets(idUsuario, categories) {
  const budgets = buildBudgets(idUsuario, categories);

  for (const budget of budgets) {
    await upsertBudget(budget);
  }

  return budgets.length;
}

function sampleAnalyticsResult(categories) {
  const currentMonth = currentUtcMonthStart();
  const mes = currentMonth.getUTCMonth() + 1;
  const ano = currentMonth.getUTCFullYear();

  return {
    periodo: {
      mes,
      ano,
      tipoPeriodo: "ATUAL",
      historicoMeses: 6,
    },
    resumo: {
      totalGastoAtual: 4477.5,
      totalReceitaAtual: 6200,
      projecaoGastoMensal: 5350,
      receitaProjetada: 6500,
      despesaProjetada: 5350,
      saldoProjetado: 1150,
      economiaProjetada: 1150,
      percentualComprometimentoRenda: 82.31,
    },
    orcamento: {
      limiteMensal: 4200,
      percentualAtual: 106.61,
      percentualProjetado: 127.38,
      status: "RISCO",
      mensagem: "Existem alertas financeiros de alta severidade para este período.",
      semOrcamento: false,
    },
    categorias: [
      {
        idCategoria: categories.mercado.id,
        nome: "Mercado",
        totalAtual: 842,
        projecaoFutura: 980,
        limite: 700,
        percentualOrcamento: 140,
        status: "ACIMA_DO_ORCAMENTO",
        risco: "ALTO",
      },
      {
        idCategoria: categories.restaurantes.id,
        nome: "Restaurantes",
        totalAtual: 539,
        projecaoFutura: 610,
        limite: 520,
        percentualOrcamento: 117.31,
        status: "ACIMA_DO_ORCAMENTO",
        risco: "ALTO",
      },
    ],
    alertas: [
      {
        tipo: "ORCAMENTO_RISCO",
        severidade: "ALTA",
        titulo: "Orçamento mensal em risco",
        descricao: "A projeção indica uso acima do limite mensal definido.",
        recomendacao: "Revise gastos variáveis ainda esta semana.",
      },
      {
        tipo: `CATEGORIA_ACIMA_ORCAMENTO_${categories.mercado.id}`,
        severidade: "ALTA",
        titulo: "Mercado acima do orçamento",
        descricao: "A categoria Mercado ultrapassou o limite planejado.",
        recomendacao: "Reduza novas compras e acompanhe reposições.",
      },
      {
        tipo: "BAIXA_CAPACIDADE_ECONOMIA",
        severidade: "MEDIA",
        titulo: "Baixa capacidade de economia",
        descricao: "A economia projetada está abaixo do nível saudável para o mês.",
        recomendacao: "Reserve parte da próxima receita antes de novos gastos.",
      },
    ],
    insights: {
      categoriaMaiorGasto: {
        idCategoria: categories.aluguel.id,
        nome: "Aluguel",
        projecaoFutura: 1650,
      },
      categoriasCriticas: [
        {
          idCategoria: categories.mercado.id,
          nome: "Mercado",
          risco: "ALTO",
          tendencia: {
            descricao: "Mercado aumentou em relação à média dos últimos meses.",
          },
        },
        {
          idCategoria: categories.restaurantes.id,
          nome: "Restaurantes",
          risco: "ALTO",
          tendencia: {
            descricao:
              "Restaurantes aumentaram em relação à média dos últimos meses.",
          },
        },
      ],
      categoriasMaisCresceram: [],
      dadosInsuficientes: false,
    },
    confiabilidade: {
      confiabilidadeAnalise: 86,
      qualidadeDosDados: "ALTA",
      historicoSuficiente: true,
      mesesComDados: 6,
      quantidadeLancamentos: 70,
    },
  };
}

async function seedAnalyticsArtifacts(idUsuario, categories) {
  const now = new Date();
  const result = sampleAnalyticsResult(categories);

  const insights = [
    {
      id: "seed_insight_market_attention",
      tipo: "categoria_critica",
      titulo: "Mercado exige atenção",
      descricao:
        "A categoria Mercado está acima do orçamento e em tendência de crescimento.",
      dados: result.insights.categoriasCriticas[0],
    },
    {
      id: "seed_insight_restaurants_attention",
      tipo: "categoria_critica",
      titulo: "Restaurantes exige atenção",
      descricao:
        "Gastos com restaurantes cresceram acima da média recente.",
      dados: result.insights.categoriasCriticas[1],
    },
    {
      id: "seed_insight_biggest_category",
      tipo: "categoria_maior_gasto",
      titulo: "Categoria com maior gasto",
      descricao: "Aluguel concentra a maior projeção de despesas do mês.",
      dados: result.insights.categoriaMaiorGasto,
    },
  ];

  const alerts = [
    {
      id: "seed_alert_budget_risk",
      tipo: "ORCAMENTO_RISCO",
      severidade: "ALTA",
      titulo: "Orçamento mensal em risco",
      mensagem: "A projeção indica uso acima do limite mensal definido.",
      dados: result.alertas[0],
    },
    {
      id: "seed_alert_market_over_budget",
      tipo: `CATEGORIA_ACIMA_ORCAMENTO_${categories.mercado.id}`,
      severidade: "ALTA",
      titulo: "Mercado acima do orçamento",
      mensagem: "A categoria Mercado ultrapassou o limite planejado.",
      dados: result.alertas[1],
    },
    {
      id: "seed_alert_low_savings",
      tipo: "BAIXA_CAPACIDADE_ECONOMIA",
      severidade: "MEDIA",
      titulo: "Baixa capacidade de economia",
      mensagem: "A economia projetada está abaixo do nível saudável para o mês.",
      dados: result.alertas[2],
    },
  ];

  const notifications = [
    {
      id: "seed_notification_budget_risk",
      tipo: "ORCAMENTO_RISCO",
      titulo: "Orçamento mensal em risco",
      mensagem: "A projeção indica uso acima do limite mensal definido.",
      canal: "email_and_in_app",
      status: "pending",
      dados: result.alertas[0],
      enviadaEm: null,
      lidaEm: null,
      erro: null,
    },
    {
      id: "seed_notification_market_over_budget",
      tipo: `CATEGORIA_ACIMA_ORCAMENTO_${categories.mercado.id}`,
      titulo: "Mercado acima do orçamento",
      mensagem: "A categoria Mercado ultrapassou o limite planejado.",
      canal: "email_and_in_app",
      status: "sent",
      dados: result.alertas[1],
      enviadaEm: now,
      lidaEm: null,
      erro: null,
    },
    {
      id: "seed_notification_recurring_expense",
      tipo: "DESPESA_RECORRENTE_A_PAGAR",
      titulo: "Fatura recorrente próxima",
      mensagem: "A fatura do cartão está prevista para os próximos dias.",
      canal: "in_app",
      status: "pending",
      dados: {
        valor: 780,
        vencimento: dateInMonth(currentUtcMonthStart(), 25),
        categoria: "Cartão de Crédito",
      },
      enviadaEm: null,
      lidaEm: null,
      erro: null,
    },
    {
      id: "seed_notification_income_expected",
      tipo: "RECEITA_RECORRENTE_PREVISTA",
      titulo: "Receita prevista",
      mensagem: "Um reembolso recorrente está previsto para entrar na conta.",
      canal: "in_app",
      status: "read",
      dados: {
        valor: 320,
        previsao: dateInMonth(currentUtcMonthStart(), 28),
        categoria: "Reembolso",
      },
      enviadaEm: null,
      lidaEm: now,
      erro: null,
    },
    {
      id: "seed_notification_email_failed",
      tipo: "BAIXA_CAPACIDADE_ECONOMIA",
      titulo: "Baixa capacidade de economia",
      mensagem: "A economia projetada está abaixo do nível saudável para o mês.",
      canal: "email_and_in_app",
      status: "failed",
      dados: result.alertas[2],
      enviadaEm: null,
      lidaEm: null,
      erro: "Envio de e-mail desativado no ambiente local.",
    },
  ];

  const jobs = [
    {
      id: "seed_job_financial_analysis_completed",
      tipo: "financial-analysis",
      status: "completed",
      payload: {
        userId: idUsuario,
        eventType: "seed",
        entityType: "demo",
      },
      resultado: {
        analyticsResult: result,
        insightsPersistidos: insights.length,
        alertasPersistidos: alerts.length,
      },
      erro: null,
      iniciadoEm: new Date(now.getTime() - 1000 * 60 * 8),
      finalizadoEm: new Date(now.getTime() - 1000 * 60 * 7),
    },
    {
      id: "seed_job_budget_alerts_completed",
      tipo: "budget-alerts",
      status: "completed",
      payload: {
        userId: idUsuario,
        eventType: "seed",
        entityType: "demo",
      },
      resultado: {
        alertasPersistidos: alerts.length,
        notificacoes: {
          created: 4,
          duplicated: 0,
          sent: 1,
          failed: 1,
          skippedEmail: 2,
        },
      },
      erro: null,
      iniciadoEm: new Date(now.getTime() - 1000 * 60 * 6),
      finalizadoEm: new Date(now.getTime() - 1000 * 60 * 5),
    },
    {
      id: "seed_job_email_failed",
      tipo: "budget-alerts",
      status: "failed",
      payload: {
        userId: idUsuario,
        eventType: "seed-email-check",
        entityType: "notification",
      },
      resultado: null,
      erro: "MAIL_DISABLED=true no ambiente local.",
      iniciadoEm: new Date(now.getTime() - 1000 * 60 * 4),
      finalizadoEm: new Date(now.getTime() - 1000 * 60 * 3),
    },
  ];

  for (const insight of insights) {
    await prisma.insight.upsert({
      where: { id: insight.id },
      create: {
        ...insight,
        idUsuario,
      },
      update: {
        idUsuario,
        tipo: insight.tipo,
        titulo: insight.titulo,
        descricao: insight.descricao,
        dados: insight.dados,
      },
    });
  }

  for (const alert of alerts) {
    await prisma.financialAlert.upsert({
      where: { id: alert.id },
      create: {
        ...alert,
        idUsuario,
      },
      update: {
        idUsuario,
        tipo: alert.tipo,
        severidade: alert.severidade,
        titulo: alert.titulo,
        mensagem: alert.mensagem,
        dados: alert.dados,
      },
    });
  }

  for (const notification of notifications) {
    await prisma.notification.upsert({
      where: { id: notification.id },
      create: {
        ...notification,
        idUsuario,
      },
      update: {
        idUsuario,
        tipo: notification.tipo,
        titulo: notification.titulo,
        mensagem: notification.mensagem,
        canal: notification.canal,
        status: notification.status,
        dados: notification.dados,
        enviadaEm: notification.enviadaEm,
        lidaEm: notification.lidaEm,
        erro: notification.erro,
      },
    });
  }

  for (const job of jobs) {
    await prisma.analyticJob.upsert({
      where: { id: job.id },
      create: {
        ...job,
        idUsuario,
      },
      update: {
        idUsuario,
        tipo: job.tipo,
        status: job.status,
        payload: job.payload,
        resultado: job.resultado,
        erro: job.erro,
        iniciadoEm: job.iniciadoEm,
        finalizadoEm: job.finalizadoEm,
      },
    });
  }

  return {
    insights: insights.length,
    alertas: alerts.length,
    notificacoes: notifications.length,
    jobs: jobs.length,
  };
}

async function main() {
  console.log("Preparando dados de demonstração do SpendSmart...");

  const usuario = await upsertUser();
  const categories = await seedCategories(usuario.id);
  const accounts = await seedAccounts(usuario.id);
  const lancamentos = await seedLaunches(usuario.id, categories, accounts);
  const orcamentos = await seedBudgets(usuario.id, categories);
  const analytics = await seedAnalyticsArtifacts(usuario.id, categories);

  console.log("Seed de demonstração finalizada.");
  console.log(`Usuário: ${DEMO_EMAIL}`);
  console.log(`Senha: ${DEMO_PASSWORD}`);
  console.log(`Categorias disponíveis: ${Object.keys(categories).length}`);
  console.log(`Contas ativas: ${Object.keys(accounts).length}`);
  console.log(`Lançamentos criados/atualizados: ${lancamentos}`);
  console.log(`Orçamentos criados/atualizados: ${orcamentos}`);
  console.log(
    `Artefatos analíticos: ${analytics.insights} insights, ${analytics.alertas} alertas, ${analytics.notificacoes} notificações, ${analytics.jobs} jobs.`,
  );
}

main()
  .catch((error) => {
    console.error("Erro ao executar seed de demonstração:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
