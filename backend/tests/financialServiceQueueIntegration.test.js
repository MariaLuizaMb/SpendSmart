import { beforeEach, describe, expect, it, vi } from "vitest";

const { prismaMock, enqueueFinancialAnalysisJobMock, enqueueBudgetAlertJobMock } =
  vi.hoisted(() => ({
    prismaMock: {
      usuario: { findUnique: vi.fn() },
      categoria: { findFirst: vi.fn() },
      conta: { findFirst: vi.fn() },
      lancamento: {
        create: vi.fn(),
        findFirst: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
      orcamento: {
        create: vi.fn(),
        findFirst: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
    },
    enqueueFinancialAnalysisJobMock: vi.fn(),
    enqueueBudgetAlertJobMock: vi.fn(),
  }));

vi.mock("../src/database/prisma.js", () => ({
  default: prismaMock,
}));

vi.mock("../src/jobs/producers/financialAnalysisProducer.js", () => ({
  enqueueFinancialAnalysisJob: enqueueFinancialAnalysisJobMock,
}));

vi.mock("../src/jobs/producers/budgetAlertProducer.js", () => ({
  enqueueBudgetAlertJob: enqueueBudgetAlertJobMock,
}));

import LaunchService from "../src/services/launchService.js";
import OrcamentoService from "../src/services/orcamentoService.js";

describe("integração de services com filas financeiras", () => {
  const idUsuario = "usuario-1";
  const categoria = {
    id: "categoria-1",
    idUsuario,
    tipo: "DESPESA",
    ehPadrao: false,
  };
  const usuario = { id: idUsuario, nome: "Maria", email: "maria@email.com" };

  beforeEach(() => {
    vi.clearAllMocks();
    enqueueFinancialAnalysisJobMock.mockResolvedValue({ enqueued: true });
    enqueueBudgetAlertJobMock.mockResolvedValue({ enqueued: true });
  });

  it("deve enfileirar jobs ao criar, editar e remover lançamento", async () => {
    prismaMock.usuario.findUnique.mockResolvedValue(usuario);
    prismaMock.categoria.findFirst.mockResolvedValue(categoria);
    prismaMock.lancamento.create.mockResolvedValue({ id: "l1" });

    await LaunchService.cadastrar({
      idUsuario,
      idCategoria: categoria.id,
      valor: 100,
      dataTransacao: "2026-05-01",
      tipo: "DESPESA",
    });

    prismaMock.lancamento.findFirst.mockResolvedValue({
      id: "l1",
      idUsuario,
      idCategoria: categoria.id,
      tipo: "DESPESA",
    });
    prismaMock.lancamento.update.mockResolvedValue({ id: "l1" });

    await LaunchService.editar("l1", idUsuario, { valor: 120 });

    prismaMock.lancamento.delete.mockResolvedValue({});

    await LaunchService.remover("l1", idUsuario);

    expect(enqueueFinancialAnalysisJobMock).toHaveBeenCalledWith(
      expect.objectContaining({ eventType: "created", entityType: "launch", entityId: "l1" }),
    );
    expect(enqueueFinancialAnalysisJobMock).toHaveBeenCalledWith(
      expect.objectContaining({ eventType: "updated", entityType: "launch", entityId: "l1" }),
    );
    expect(enqueueFinancialAnalysisJobMock).toHaveBeenCalledWith(
      expect.objectContaining({ eventType: "deleted", entityType: "launch", entityId: "l1" }),
    );
    expect(enqueueBudgetAlertJobMock).toHaveBeenCalledTimes(3);
  });

  it("deve enfileirar jobs ao criar, editar e remover orçamento", async () => {
    prismaMock.usuario.findUnique.mockResolvedValue(usuario);
    prismaMock.orcamento.findFirst.mockResolvedValue(null);
    prismaMock.orcamento.create.mockResolvedValue({
      id: "o1",
      idUsuario,
      idCategoria: null,
      valor: "1000.00",
      mes: 5,
      ano: 2026,
    });

    await OrcamentoService.cadastrar({
      idUsuario,
      valor: 1000,
      mes: 5,
      ano: 2026,
    });

    prismaMock.orcamento.findFirst
      .mockResolvedValueOnce({
        id: "o1",
        idUsuario,
        idCategoria: null,
        valor: "1000.00",
        mes: 5,
        ano: 2026,
      })
      .mockResolvedValueOnce(null);
    prismaMock.orcamento.update.mockResolvedValue({ id: "o1" });

    await OrcamentoService.editar("o1", idUsuario, { valor: 1200 });

    prismaMock.orcamento.findFirst.mockReset();
    prismaMock.orcamento.findFirst.mockResolvedValue({ id: "o1", idUsuario });
    prismaMock.orcamento.delete.mockResolvedValue({});

    await OrcamentoService.remover("o1", idUsuario);

    expect(enqueueFinancialAnalysisJobMock).toHaveBeenCalledWith(
      expect.objectContaining({ eventType: "created", entityType: "budget", entityId: "o1" }),
    );
    expect(enqueueFinancialAnalysisJobMock).toHaveBeenCalledWith(
      expect.objectContaining({ eventType: "updated", entityType: "budget", entityId: "o1" }),
    );
    expect(enqueueFinancialAnalysisJobMock).toHaveBeenCalledWith(
      expect.objectContaining({ eventType: "deleted", entityType: "budget", entityId: "o1" }),
    );
    expect(enqueueBudgetAlertJobMock).toHaveBeenCalledTimes(3);
  });
});
