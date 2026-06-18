import prisma from "../database/prisma.js";
import EmailService from "./emailService.js";

const DEFAULT_LIMIT = 20;

const ALERT_TYPES_WITH_EMAIL = [
  "ORCAMENTO_ESTOURADO",
  "ORCAMENTO_RISCO",
  "SALDO_NEGATIVO",
  "DESPESAS_ACIMA_DA_RENDA",
  "RISCO_FINANCEIRO_FUTURO",
  "CRESCIMENTO_EXCESSIVO_GASTOS",
  "REDUCAO_RECEITAS",
  "BAIXA_CAPACIDADE_ECONOMIA",
];

const PREPARED_NOTIFICATION_TYPES = [
  "CONTA_RECORRENTE_PROXIMA_VENCIMENTO",
  "DESPESA_RECORRENTE_A_PAGAR",
  "RECEITA_RECORRENTE_PREVISTA",
];

function startOfToday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function isBudgetCategoryAlert(tipo) {
  return (
    String(tipo).startsWith("CATEGORIA_ACIMA_ORCAMENTO") ||
    String(tipo).startsWith("CATEGORIA_PROXIMA_LIMITE")
  );
}

function shouldNotifyAlert(alerta) {
  const tipo = alerta?.tipo || "";
  const severidade = String(alerta?.severidade || "").toUpperCase();

  return (
    ALERT_TYPES_WITH_EMAIL.includes(tipo) ||
    isBudgetCategoryAlert(tipo) ||
    severidade === "ALTA"
  );
}

function mapAlertToNotification(alerta) {
  if (!alerta || !shouldNotifyAlert(alerta)) return null;

  return {
    tipo: alerta.tipo || "ALERTA_FINANCEIRO",
    titulo: alerta.titulo || "Alerta financeiro",
    mensagem:
      alerta.descricao ||
      alerta.mensagem ||
      alerta.recomendacao ||
      "Há um alerta financeiro importante para revisar.",
    canal: "email_and_in_app",
    dados: alerta,
  };
}

function mapInsightToNotification(insight) {
  if (!insight) return null;

  return {
    tipo: "INSIGHT_FINANCEIRO_IMPORTANTE",
    titulo: insight.titulo || insight.title || "Insight financeiro",
    mensagem:
      insight.descricao ||
      insight.description ||
      "Um insight financeiro importante foi gerado para sua conta.",
    canal: "email_and_in_app",
    dados: insight,
  };
}

function buildEmail(notification, usuario) {
  const nome = usuario?.nome ? `Olá, ${usuario.nome}.` : "Olá.";
  const text = `${nome}\n\n${notification.titulo}\n\n${notification.mensagem}\n\nAcesse o SpendSmart para acompanhar seus dados financeiros.`;

  return {
    to: usuario?.email,
    subject: `[SpendSmart] ${notification.titulo}`,
    text,
    html: `
      <p>${nome}</p>
      <h2>${notification.titulo}</h2>
      <p>${notification.mensagem}</p>
      <p>Acesse o SpendSmart para acompanhar seus dados financeiros.</p>
    `,
  };
}

class NotificationService {
  static tiposPreparados() {
    return PREPARED_NOTIFICATION_TYPES;
  }

  static async listarRecentes(idUsuario, limite = DEFAULT_LIMIT) {
    const take = Math.min(Math.max(Number(limite) || DEFAULT_LIMIT, 1), 50);

    return prisma.notification.findMany({
      where: { idUsuario },
      orderBy: { criadoEm: "desc" },
      take,
    });
  }

  static async marcarComoLida(id, idUsuario) {
    return prisma.notification.updateMany({
      where: {
        id,
        idUsuario,
        lidaEm: null,
      },
      data: {
        status: "read",
        lidaEm: new Date(),
      },
    });
  }

  static async marcarTodasComoLidas(idUsuario) {
    return prisma.notification.updateMany({
      where: {
        idUsuario,
        lidaEm: null,
      },
      data: {
        status: "read",
        lidaEm: new Date(),
      },
    });
  }

  static async criarNotificacaoSeNaoDuplicada({
    idUsuario,
    tipo,
    titulo,
    mensagem,
    canal = "email_and_in_app",
    dados = {},
  }) {
    const existente = await prisma.notification.findFirst({
      where: {
        idUsuario,
        tipo,
        titulo,
        criadoEm: {
          gte: startOfToday(),
        },
      },
      orderBy: { criadoEm: "desc" },
    });

    if (existente) {
      return { notification: existente, duplicated: true };
    }

    const notification = await prisma.notification.create({
      data: {
        idUsuario,
        tipo,
        titulo,
        mensagem,
        canal,
        status: "pending",
        dados,
      },
    });

    return { notification, duplicated: false };
  }

  static async atualizarStatusEmail(id, status, error = null) {
    return prisma.notification.update({
      where: { id },
      data: {
        status,
        enviadaEm: status === "sent" ? new Date() : undefined,
        erro: error?.message || error || null,
      },
    });
  }

  static async enviarEmailDaNotificacao(notification, usuario) {
    if (!String(notification.canal || "").includes("email")) {
      return { sent: false, skipped: true, reason: "channel_without_email" };
    }

    try {
      const result = await EmailService.enviarEmail(
        buildEmail(notification, usuario),
      );

      if (result.sent) {
        await this.atualizarStatusEmail(notification.id, "sent");
      }

      return result;
    } catch (error) {
      await this.atualizarStatusEmail(notification.id, "failed", error);
      return { sent: false, skipped: false, error };
    }
  }

  static mapearNotificacoesDaAnalise(analyticsResult = {}) {
    const alertNotifications = (analyticsResult.alertas || [])
      .map(mapAlertToNotification)
      .filter(Boolean);

    const criticalInsights = (analyticsResult.insights?.categoriasCriticas || [])
      .slice(0, 3)
      .map((categoria) =>
        mapInsightToNotification({
          tipo: "categoria_critica",
          titulo: `${categoria.nome || "Categoria"} precisa de atenção`,
          descricao:
            categoria.tendencia?.descricao ||
            "A categoria apresenta risco financeiro no período analisado.",
          dados: categoria,
        }),
      )
      .filter(Boolean);

    return [...alertNotifications, ...criticalInsights];
  }

  static async processarNotificacoesDaAnalise({ idUsuario, analyticsResult }) {
    const usuario = await prisma.usuario.findUnique({
      where: { id: idUsuario },
      select: {
        id: true,
        nome: true,
        email: true,
      },
    });

    const notificacoes = this.mapearNotificacoesDaAnalise(analyticsResult);
    const resultado = {
      created: 0,
      duplicated: 0,
      sent: 0,
      failed: 0,
      skippedEmail: 0,
    };

    for (const notificacao of notificacoes) {
      const { notification, duplicated } =
        await this.criarNotificacaoSeNaoDuplicada({
          idUsuario,
          ...notificacao,
        });

      if (duplicated) {
        resultado.duplicated += 1;
        continue;
      }

      resultado.created += 1;

      const emailResult = await this.enviarEmailDaNotificacao(
        notification,
        usuario,
      );

      if (emailResult.sent) resultado.sent += 1;
      else if (emailResult.skipped) resultado.skippedEmail += 1;
      else resultado.failed += 1;
    }

    return resultado;
  }
}

export default NotificationService;
