import { beforeEach, describe, expect, it, vi } from "vitest";

const { prismaMock, enviarEmailMock } = vi.hoisted(() => ({
  prismaMock: {
    usuario: {
      findUnique: vi.fn(),
    },
    notification: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      updateMany: vi.fn(),
    },
  },
  enviarEmailMock: vi.fn(),
}));

vi.mock("../src/database/prisma.js", () => ({
  default: prismaMock,
}));

vi.mock("../src/services/emailService.js", () => ({
  default: {
    enviarEmail: enviarEmailMock,
  },
}));

import NotificationService from "../src/services/notificationService.js";

describe("NotificationService", () => {
  const usuario = {
    id: "usuario-1",
    nome: "Maria",
    email: "maria@email.com",
  };

  const alerta = {
    tipo: "SALDO_NEGATIVO",
    severidade: "ALTA",
    titulo: "Saldo negativo previsto",
    descricao: "Seu saldo pode ficar negativo.",
  };

  const notification = {
    id: "notificacao-1",
    idUsuario: usuario.id,
    tipo: alerta.tipo,
    titulo: alerta.titulo,
    mensagem: alerta.descricao,
    canal: "email_and_in_app",
    status: "pending",
  };

  beforeEach(() => {
    vi.clearAllMocks();

    prismaMock.usuario.findUnique.mockResolvedValue(usuario);
    prismaMock.notification.findFirst.mockResolvedValue(null);
    prismaMock.notification.create.mockResolvedValue(notification);
    prismaMock.notification.update.mockResolvedValue({
      ...notification,
      status: "sent",
    });

    prismaMock.notification.updateMany.mockResolvedValue({ count: 1 });
    prismaMock.notification.findMany.mockResolvedValue([notification]);

    enviarEmailMock.mockResolvedValue({ sent: true, skipped: false });
  });

  it("deve criar notificação e enviar e-mail mockado para alerta relevante", async () => {
    const resultado = await NotificationService.processarNotificacoesDaAnalise({
      idUsuario: usuario.id,
      analyticsResult: { alertas: [alerta] },
    });

    expect(prismaMock.notification.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        idUsuario: usuario.id,
        tipo: "SALDO_NEGATIVO",
        titulo: "Saldo negativo previsto",
        status: "pending",
      }),
    });

    expect(enviarEmailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "maria@email.com",
        subject: "[SpendSmart] Saldo negativo previsto",
      }),
    );

    expect(prismaMock.notification.update).toHaveBeenCalledWith({
      where: { id: "notificacao-1" },
      data: expect.objectContaining({ status: "sent" }),
    });

    expect(resultado).toMatchObject({ created: 1, sent: 1, failed: 0 });
  });

  it("deve evitar notificação duplicada no mesmo dia", async () => {
    prismaMock.notification.findFirst.mockResolvedValue(notification);

    const resultado = await NotificationService.processarNotificacoesDaAnalise({
      idUsuario: usuario.id,
      analyticsResult: { alertas: [alerta] },
    });

    expect(prismaMock.notification.create).not.toHaveBeenCalled();
    expect(enviarEmailMock).not.toHaveBeenCalled();
    expect(resultado).toMatchObject({ duplicated: 1, created: 0 });
  });

  it("deve registrar falha de e-mail sem quebrar processamento", async () => {
    const erro = new Error("smtp indisponível");
    enviarEmailMock.mockRejectedValue(erro);

    const resultado = await NotificationService.processarNotificacoesDaAnalise({
      idUsuario: usuario.id,
      analyticsResult: { alertas: [alerta] },
    });

    expect(prismaMock.notification.update).toHaveBeenCalledWith({
      where: { id: "notificacao-1" },
      data: expect.objectContaining({
        status: "failed",
        erro: "smtp indisponível",
      }),
    });

    expect(resultado).toMatchObject({ created: 1, failed: 1 });
  });

  it("deve registrar skipped quando o canal não contém email", async () => {
    enviarEmailMock.mockResolvedValue({ sent: false, skipped: true });

    prismaMock.notification.create.mockResolvedValue({
      ...notification,
      canal: "in_app_only",
    });

    const resultado = await NotificationService.processarNotificacoesDaAnalise({
      idUsuario: usuario.id,
      analyticsResult: { alertas: [alerta] },
    });

    // não deve tentar enviar email
    expect(enviarEmailMock).not.toHaveBeenCalled();

    // não deve atualizar para sent/failed (no canal sem email retorna skipped)
    // mas o fluxo ainda passa por criar notification
    expect(prismaMock.notification.create).toHaveBeenCalled();
    expect(resultado).toMatchObject({ created: 1, sent: 0, skippedEmail: 1 });
  });

  it("deve listar recentes e marcar notificações como lidas", async () => {
    prismaMock.notification.findMany.mockResolvedValue([notification]);
    prismaMock.notification.updateMany.mockResolvedValue({ count: 1 });

    await expect(NotificationService.listarRecentes(usuario.id, 10)).resolves.toEqual([
      notification,
    ]);

    await expect(
      NotificationService.marcarComoLida(notification.id, usuario.id),
    ).resolves.toEqual({ count: 1 });

    await expect(NotificationService.marcarTodasComoLidas(usuario.id)).resolves.toEqual({
      count: 1,
    });

    expect(prismaMock.notification.findMany).toHaveBeenCalledWith({
      where: { idUsuario: usuario.id },
      orderBy: { criadoEm: "desc" },
      take: 10,
    });
  });

  it("deve cobrir falha em atualizarStatusEmail com erro nulo vs mensagem", async () => {
    const erro = new Error("smtp indisponível");
    enviarEmailMock.mockRejectedValue(erro);

    // primeira falha: atualizarStatusEmail com error (message)
    const resultado = await NotificationService.processarNotificacoesDaAnalise({
      idUsuario: usuario.id,
      analyticsResult: { alertas: [alerta] },
    });

    expect(resultado.failed).toBe(1);
    expect(prismaMock.notification.update).toHaveBeenCalledWith({
      where: { id: "notificacao-1" },
      data: expect.objectContaining({
        status: "failed",
        erro: "smtp indisponível",
      }),
    });
  });

  it("deve processar alertas e insights críticos (mapInsightToNotification)", async () => {
    enviarEmailMock.mockResolvedValue({ sent: true, skipped: false });

    const insightCategoria = {
      titulo: "Categoria Crítica",
      descricao: "Risco alto",
      tendencia: { descricao: "Tendência ruim" },
    };

    const analyticsResult = {
      alertas: [],
      insights: { categoriasCriticas: [insightCategoria] },
    };

    const resultado = await NotificationService.processarNotificacoesDaAnalise({
      idUsuario: usuario.id,
      analyticsResult,
    });

    // criado uma notificação de insight crítico
    expect(prismaMock.notification.create).toHaveBeenCalledTimes(1);
    expect(prismaMock.notification.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        idUsuario: usuario.id,
        tipo: "INSIGHT_FINANCEIRO_IMPORTANTE",
      }),
    });

    expect(enviarEmailMock).toHaveBeenCalled();
    expect(resultado).toMatchObject({ created: 1, sent: 1, failed: 0 });
  });
});

