export const nomesMeses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const opcoesOrdenacao = [
  { value: "recentes", label: "Recentes" },
  { value: "antigas", label: "Antigas" },
  { value: "maior-valor", label: "Maior valor" },
  { value: "menor-valor", label: "Menor valor" },
];

export const dashboardTypography = {
  cardTitle: "text-xl font-bold text-zinc-950",
  cardDescription: "mt-1 text-sm text-zinc-500",
  emptyState: "text-center text-sm text-zinc-500",
  body: "text-sm leading-relaxed text-zinc-600",
  itemLabel: "text-sm text-zinc-500",
  itemTitle: "text-sm font-semibold text-zinc-950",
  itemMeta: "text-sm font-medium text-zinc-700",
  detailLabel: "text-xs font-medium text-zinc-500",
  detailValue: "mt-1 text-sm font-semibold text-zinc-950",
  tableHead: "text-xs font-medium text-zinc-950",
  tableBody: "text-xs text-zinc-950",
  footer: "text-xs text-zinc-500",
  metricValue: "text-3xl font-bold tracking-normal text-zinc-950",
  metricTitle: "text-base font-semibold leading-tight text-zinc-950",
  metricDescription: "text-sm leading-snug text-zinc-900",
  subMetricValue: "text-2xl font-bold text-zinc-950",
};

export function obterPeriodoAtual() {
  const hoje = new Date();

  return {
    mes: String(hoje.getMonth() + 1),
    ano: String(hoje.getFullYear()),
  };
}

export function paraNumero(valor, fallback = 0) {
  const numero = Number(valor);

  return Number.isFinite(numero) ? numero : fallback;
}

export function formatarMoeda(valor) {
  return paraNumero(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatarPercentual(valor, casas = 0) {
  return `${paraNumero(valor).toLocaleString("pt-BR", {
    maximumFractionDigits: casas,
  })}%`;
}

export function formatarData(data) {
  if (!data) return "00/00/0000";

  return new Date(data).toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });
}

export function limitarPercentual(valor) {
  const numero = paraNumero(valor);

  if (numero <= 0) return 0;

  return Math.min(numero, 100);
}

export function obterNomeMesCurto(valorMes) {
  if (!valorMes) return "Mês";

  const partes = String(valorMes).split("-");
  const indiceMes = partes.length > 1 ? Number(partes[1]) - 1 : Number(valorMes) - 1;

  return nomesMeses[indiceMes]?.slice(0, 3) || String(valorMes);
}

export function obterNomeCategoria(lancamento) {
  return lancamento?.categoria?.nome || lancamento?.nomeCategoria || "Categoria";
}

export function obterNomeConta(lancamento) {
  if (lancamento?.conta?.nome) {
    return lancamento.conta.ativa === false
      ? `${lancamento.conta.nome} (desativada)`
      : lancamento.conta.nome;
  }

  return lancamento?.nomeConta || "Sem conta";
}

export function formatarTipo(tipo) {
  const tipoNormalizado = String(tipo || "").toUpperCase();

  return (
    {
      RECEITA: "Receita",
      DESPESA: "Despesa",
      INVESTIMENTO: "Investimento",
    }[tipoNormalizado] || "Transação"
  );
}

export function obterTimestamp(lancamento) {
  const data = new Date(lancamento?.dataTransacao).getTime();

  return Number.isFinite(data) ? data : 0;
}

export function obterValorLancamento(lancamento) {
  return paraNumero(lancamento?.valor);
}

export function ordenarLancamentos(lancamentos, ordenacao) {
  return [...(lancamentos || [])].sort((a, b) => {
    if (ordenacao === "antigas") {
      return obterTimestamp(a) - obterTimestamp(b);
    }

    if (ordenacao === "maior-valor") {
      return obterValorLancamento(b) - obterValorLancamento(a);
    }

    if (ordenacao === "menor-valor") {
      return obterValorLancamento(a) - obterValorLancamento(b);
    }

    return obterTimestamp(b) - obterTimestamp(a);
  });
}

function obterPrefixoCodigoTransacao(tipo) {
  const tipoNormalizado = String(tipo || "").toUpperCase();

  if (tipoNormalizado === "RECEITA") return "R";
  if (tipoNormalizado === "DESPESA") return "D";

  return "T";
}

export function criarMapaCodigosTransacao(lancamentos) {
  const contadores = {
    RECEITA: 0,
    DESPESA: 0,
    OUTRO: 0,
  };
  const mapaCodigos = new Map();

  ordenarLancamentos(lancamentos, "antigas").forEach((lancamento) => {
    const tipoNormalizado = String(lancamento.tipo || "").toUpperCase();
    const chaveContador = ["RECEITA", "DESPESA"].includes(tipoNormalizado)
      ? tipoNormalizado
      : "OUTRO";
    const prefixo = obterPrefixoCodigoTransacao(tipoNormalizado);

    contadores[chaveContador] += 1;
    mapaCodigos.set(
      lancamento.id,
      `${prefixo}${String(contadores[chaveContador]).padStart(2, "0")}`,
    );
  });

  return mapaCodigos;
}

export function obterCodigoTransacao(lancamento, mapaCodigos) {
  return (
    mapaCodigos.get(lancamento.id) ||
    `${obterPrefixoCodigoTransacao(lancamento.tipo)}00`
  );
}

export function filtrarLancamentos(lancamentos, filtro) {
  const termo = filtro.trim().toLocaleLowerCase("pt-BR");

  if (!termo) return lancamentos;

  return lancamentos.filter((lancamento) => {
    const campos = [
      lancamento.id,
      lancamento.descricao,
      formatarTipo(lancamento.tipo),
      obterNomeCategoria(lancamento),
      obterNomeConta(lancamento),
      formatarMoeda(lancamento.valor),
      formatarData(lancamento.dataTransacao),
    ];

    return campos.some((campo) =>
      String(campo || "").toLocaleLowerCase("pt-BR").includes(termo),
    );
  });
}

export function mapearHistorico(historico, limite = 6) {
  return [...(historico?.meses || [])].slice(-limite).map((item) => ({
    mes: obterNomeMesCurto(item.mes),
    receitas: paraNumero(item.receitas),
    despesas: paraNumero(item.despesas),
  }));
}

export function criarDadosSaldoPrevisto(saldo, projecoes) {
  return [
    {
      mes: "Atual",
      receitas: paraNumero(projecoes?.receitaProjetada),
      despesas: paraNumero(projecoes?.despesaProjetada),
      saldo: paraNumero(saldo?.saldoAtual),
    },
    {
      mes: "30 dias",
      receitas: paraNumero(projecoes?.receitaProjetada),
      despesas: paraNumero(projecoes?.despesaProjetada),
      saldo: paraNumero(saldo?.saldoPrevisto30Dias),
    },
    {
      mes: "60 dias",
      receitas: paraNumero(projecoes?.receitaProjetada),
      despesas: paraNumero(projecoes?.despesaProjetada),
      saldo: paraNumero(saldo?.saldoPrevisto60Dias),
    },
    {
      mes: "90 dias",
      receitas: paraNumero(projecoes?.receitaProjetada),
      despesas: paraNumero(projecoes?.despesaProjetada),
      saldo: paraNumero(saldo?.saldoPrevisto90Dias),
    },
  ];
}

export function obterAlertasPorTipo(alertas, tipos) {
  return (alertas || []).find((alerta) => tipos.includes(alerta.tipo));
}

export function resumoTemDados({ resumo, projecoes, saldo, categorias }) {
  return Boolean(
    paraNumero(resumo?.totalGastoAtual) ||
      paraNumero(resumo?.totalReceitaAtual) ||
      paraNumero(projecoes?.receitaProjetada) ||
      paraNumero(projecoes?.despesaProjetada) ||
      paraNumero(saldo?.saldoAtual) ||
      (categorias || []).length,
  );
}
