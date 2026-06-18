export const OPCAO_ORCAMENTO_GERAL = "__orcamento_geral__";

export const STATUS_ORCAMENTO = {
  SEGURO: "seguro",
  ATENCAO: "atencao",
  CRITICO: "critico",
  ULTRAPASSADO: "ultrapassado",
};

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

export function paraNumero(valor) {
  const numero = Number(valor || 0);

  return Number.isFinite(numero) ? numero : 0;
}

export function formatarMoeda(valor) {
  return paraNumero(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatarValorMonetarioInput(valor) {
  const digitos = String(valor || "").replace(/\D/g, "");

  if (!digitos) return "";

  return (Number(digitos) / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function converterValorMonetarioParaNumero(valor) {
  if (!valor) return 0;

  const valorNormalizado = String(valor)
    .replaceAll(".", "")
    .replace(",", ".")
    .replace(/[^\d.]/g, "");

  return Number(valorNormalizado);
}

export function formatarPercentual(valor) {
  return `${Math.round(paraNumero(valor))}%`;
}

export function obterMesAnoAtual() {
  const hoje = new Date();

  return {
    mes: hoje.getMonth() + 1,
    ano: hoje.getFullYear(),
  };
}

export function obterPeriodoMes(mes, ano) {
  const inicio = new Date(ano, mes - 1, 1);
  const fim = new Date(ano, mes, 0);

  return { inicio, fim };
}

export function formatarPeriodo(orcamento) {
  const mes = Number(orcamento?.mes);
  const ano = Number(orcamento?.ano);

  if (!mes || !ano) return "Período não informado";

  const atual = obterMesAnoAtual();
  if (mes === atual.mes && ano === atual.ano) return "Mês atual";

  return `${nomesMeses[mes - 1] || "Mês"} de ${ano}`;
}

export function obterTipoOrcamento(orcamento) {
  return orcamento?.idCategoria ? "Categoria" : "Geral";
}

export function obterNomeOrcamento(orcamento) {
  return orcamento?.categoria?.nome || orcamento?.nomeCategoria || "Geral";
}

export function obterValorLancamento(lancamento) {
  return paraNumero(lancamento?.valor);
}

export function obterIdCategoriaLancamento(lancamento) {
  return lancamento?.idCategoria || lancamento?.categoria?.id || "";
}

export function lancamentoNoMes(lancamento, mes, ano) {
  if (!lancamento?.dataTransacao) return false;

  const data = new Date(lancamento.dataTransacao);

  return (
    data.getUTCMonth() + 1 === Number(mes) &&
    data.getUTCFullYear() === Number(ano)
  );
}

export function lancamentoEhDespesa(lancamento) {
  return String(lancamento?.tipo || "").toUpperCase() === "DESPESA";
}

export function calcularUsoOrcamento(orcamento, lancamentos) {
  const limite = paraNumero(orcamento?.valor);
  const mes = Number(orcamento?.mes);
  const ano = Number(orcamento?.ano);
  const idCategoria = orcamento?.idCategoria || "";
  const lancamentosAssociados = (lancamentos || []).filter((lancamento) => {
    if (!lancamentoEhDespesa(lancamento)) return false;
    if (!lancamentoNoMes(lancamento, mes, ano)) return false;
    if (!idCategoria) return true;

    return obterIdCategoriaLancamento(lancamento) === idCategoria;
  });
  const utilizado = lancamentosAssociados.reduce(
    (total, lancamento) => total + obterValorLancamento(lancamento),
    0,
  );
  const restante = limite - utilizado;
  const percentual = limite > 0 ? (utilizado / limite) * 100 : 0;

  return {
    ...orcamento,
    limite,
    utilizado,
    restante,
    percentual,
    lancamentosAssociados,
    status: obterStatusOrcamento(percentual),
  };
}

export function obterStatusOrcamento(percentual) {
  const uso = paraNumero(percentual);

  if (uso > 100) return STATUS_ORCAMENTO.ULTRAPASSADO;
  if (uso > 85) return STATUS_ORCAMENTO.CRITICO;
  if (uso > 60) return STATUS_ORCAMENTO.ATENCAO;

  return STATUS_ORCAMENTO.SEGURO;
}

export function obterLabelStatus(status, compacto = false) {
  if (status === STATUS_ORCAMENTO.ULTRAPASSADO) return "Ultrapassado";
  if (status === STATUS_ORCAMENTO.CRITICO) return "Crítico";
  if (status === STATUS_ORCAMENTO.ATENCAO)
    return compacto ? "Atenção" : "Em atenção";

  return "Seguro";
}

export function obterStatusPorLabel(label) {
  const valor = String(label || "").toLowerCase();

  if (valor.includes("ultrapass")) return STATUS_ORCAMENTO.ULTRAPASSADO;
  if (valor.includes("cr")) return STATUS_ORCAMENTO.CRITICO;
  if (valor.includes("aten")) return STATUS_ORCAMENTO.ATENCAO;
  if (valor.includes("seg")) return STATUS_ORCAMENTO.SEGURO;

  return "";
}

export function criarFormularioOrcamentoInicial(orcamento) {
  const atual = obterMesAnoAtual();
  const ehGeral = !orcamento?.idCategoria;

  return {
    tipo: ehGeral ? "GERAL" : "CATEGORIA",
    idCategoria: orcamento?.idCategoria || OPCAO_ORCAMENTO_GERAL,
    valor: orcamento
      ? formatarValorMonetarioInput(String(paraNumero(orcamento.valor) * 100))
      : "",
    mes: String(orcamento?.mes || atual.mes),
    ano: String(orcamento?.ano || atual.ano),
    descricao: orcamento?.descricao || "",
  };
}

export function criarPayloadOrcamento(formulario) {
  return {
    valor: converterValorMonetarioParaNumero(formulario.valor),
    mes: Number(formulario.mes),
    ano: Number(formulario.ano),
    idCategoria: formulario.tipo === "GERAL" ? null : formulario.idCategoria,
    descricao: formulario.descricao?.trim() || undefined,
  };
}

export function calcularDiasRestantesMes(mes, ano) {
  const hoje = new Date();
  const fim = new Date(ano, mes, 0);

  if (
    hoje.getMonth() + 1 !== Number(mes) ||
    hoje.getFullYear() !== Number(ano)
  ) {
    return 0;
  }

  return Math.max(fim.getDate() - hoje.getDate(), 0);
}

export function calcularRitmoConsumo(orcamento) {
  const mes = Number(orcamento?.mes);
  const ano = Number(orcamento?.ano);
  const limite = paraNumero(orcamento?.limite ?? orcamento?.valor);
  const utilizado = paraNumero(orcamento?.utilizado);
  const percentual = limite ? (utilizado / limite) * 100 : 0;
  const hoje = new Date();
  const diasNoMes = new Date(ano, mes, 0).getDate();
  const diaAtual =
    hoje.getMonth() + 1 === mes && hoje.getFullYear() === ano
      ? hoje.getDate()
      : diasNoMes;
  const percentualEsperado = diasNoMes ? (diaAtual / diasNoMes) * 100 : 0;

  return {
    percentual,
    diasRestantes: calcularDiasRestantesMes(mes, ano),
    consumoAcelerado: percentual > percentualEsperado + 10,
  };
}

export function calcularPrevisaoEstouro(orcamento) {
  const mes = Number(orcamento?.mes);
  const ano = Number(orcamento?.ano);
  const limite = paraNumero(orcamento?.limite ?? orcamento?.valor);
  const utilizado = paraNumero(orcamento?.utilizado);
  const hoje = new Date();

  if (
    !limite ||
    !utilizado ||
    hoje.getMonth() + 1 !== mes ||
    hoje.getFullYear() !== ano
  ) {
    return null;
  }

  const gastoDiario = utilizado / Math.max(hoje.getDate(), 1);
  const restante = limite - utilizado;

  if (restante <= 0)
    return { dias: 0, mensagem: "O orçamento definido já foi ultrapassado." };
  if (gastoDiario <= 0) return null;

  const dias = Math.ceil(restante / gastoDiario);
  const diasRestantes = calcularDiasRestantesMes(mes, ano);

  if (dias > diasRestantes) return null;

  return {
    dias,
    mensagem: `Mantendo o ritmo atual, o orçamento pode ser ultrapassado em ${dias} ${dias === 1 ? "dia" : "dias"}.`,
  };
}

export function ordenarLancamentosPorValor(lancamentos) {
  return [...(lancamentos || [])].sort(
    (a, b) => obterValorLancamento(b) - obterValorLancamento(a),
  );
}
