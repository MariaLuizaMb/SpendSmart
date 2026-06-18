import prisma from "../database/prisma.js";

function normalizarSeveridade(severidade) {
  return String(severidade || "BAIXA").toUpperCase();
}

function mapearAlerta(alerta) {
  if (!alerta) return null;

  const tipo = alerta.tipo || alerta.id || "ALERTA_FINANCEIRO";
  const titulo = alerta.titulo || "Alerta financeiro";
  const mensagem =
    alerta.descricao ||
    alerta.mensagem ||
    alerta.recomendacao ||
    "Há um alerta financeiro importante para revisar.";

  return {
    tipo,
    severidade: normalizarSeveridade(alerta.severidade),
    titulo,
    mensagem,
    dados: alerta,
  };
}

class FinancialAlertService {
  static mapearAlertasDaAnalise(analyticsResult = {}) {
    return (analyticsResult.alertas || []).map(mapearAlerta).filter(Boolean);
  }

  static async salvarAlertasDaAnalise({ idUsuario, analyticsResult }) {
    const alertas = this.mapearAlertasDaAnalise(analyticsResult);

    if (!alertas.length) {
      return [];
    }

    await prisma.financialAlert.createMany({
      data: alertas.map((alerta) => ({
        idUsuario,
        tipo: alerta.tipo,
        severidade: alerta.severidade,
        titulo: alerta.titulo,
        mensagem: alerta.mensagem,
        dados: alerta.dados,
      })),
    });

    return alertas;
  }
}

export default FinancialAlertService;
