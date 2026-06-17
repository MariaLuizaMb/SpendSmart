import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  listarRecentesMock,
  marcarComoLidaMock,
  marcarTodasComoLidasMock,
} = vi.hoisted(() => ({
  listarRecentesMock: vi.fn(),
  marcarComoLidaMock: vi.fn(),
  marcarTodasComoLidasMock: vi.fn(),
}));

vi.mock("../src/services/notificationService.js", () => ({
  default: {
    listarRecentes: listarRecentesMock,
    marcarComoLida: marcarComoLidaMock,
    marcarTodasComoLidas: marcarTodasComoLidasMock,
  },
}));

import NotificationController from "../src/controllers/notificationController.js";

function criarResponseMock() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("NotificationController", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("GET /notifications deve listar notificações recentes do usuário autenticado", async () => {
    const notificacoes = [{ id: "n1", titulo: "Alerta" }];
    listarRecentesMock.mockResolvedValue(notificacoes);
    const res = criarResponseMock();

    await NotificationController.listar(
      { usuario: { id: "u1" }, query: { limite: "10" } },
      res,
      vi.fn(),
    );

    expect(listarRecentesMock).toHaveBeenCalledWith("u1", "10");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: notificacoes,
    });
  });

  it("PATCH /notifications/:id/read deve marcar uma notificação como lida", async () => {
    marcarComoLidaMock.mockResolvedValue({ count: 1 });
    const res = criarResponseMock();

    await NotificationController.marcarComoLida(
      { usuario: { id: "u1" }, params: { id: "n1" } },
      res,
      vi.fn(),
    );

    expect(marcarComoLidaMock).toHaveBeenCalledWith("n1", "u1");
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: { count: 1 },
    });
  });

  it("PATCH /notifications/read-all deve marcar todas como lidas", async () => {
    marcarTodasComoLidasMock.mockResolvedValue({ count: 3 });
    const res = criarResponseMock();

    await NotificationController.marcarTodasComoLidas(
      { usuario: { id: "u1" } },
      res,
      vi.fn(),
    );

    expect(marcarTodasComoLidasMock).toHaveBeenCalledWith("u1");
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: { count: 3 },
    });
  });
});
