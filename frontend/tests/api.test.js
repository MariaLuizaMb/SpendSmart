import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth", () => ({
  obterToken: vi.fn(),
}));

import { obterToken } from "@/lib/auth";
import {
  buscarAnalisePreditiva,
  cadastrarCategoria,
  cadastrarConta,
  cadastrarLancamento,
  cadastrarOrcamento,
  cadastrarUsuario,
  editarConta,
  editarLancamento,
  listarCategorias,
  listarContas,
  listarLancamentos,
  listarNotificacoes,
  listarOrcamentos,
  loginUsuario,
  marcarNotificacaoComoLida,
  marcarTodasNotificacoesComoLidas,
  removerConta,
  removerLancamento,
} from "../src/services/api";

function jsonResponse(body, init = {}) {
  return {
    ok: init.ok ?? true,
    status: init.status ?? 200,
    headers: {
      get: vi.fn(() => "application/json"),
    },
    json: vi.fn().mockResolvedValue(body),
    text: vi.fn().mockResolvedValue(JSON.stringify(body)),
  };
}

describe("api service", () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue(jsonResponse({ data: [] }));
    obterToken.mockReturnValue("");
  });

  it("deve enviar token quando existir e retornar JSON", async () => {
    obterToken.mockReturnValue("token-123");
    global.fetch.mockResolvedValueOnce(jsonResponse({ ok: true }));

    await expect(listarCategorias()).resolves.toEqual({ ok: true });

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/categorias",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer token-123",
          "Content-Type": "application/json",
        }),
      }),
    );
  });

  it("deve lançar erro com mensagem vinda da API", async () => {
    global.fetch.mockResolvedValueOnce(
      jsonResponse({ erro: "Dados inválidos." }, { ok: false, status: 400 }),
    );

    await expect(loginUsuario({ email: "maria@email.com" })).rejects.toThrow(
      "Dados inválidos.",
    );
  });

  it("deve montar chamadas de criação, edição e remoção", async () => {
    await cadastrarUsuario({ nome: "Maria" });
    await loginUsuario({ email: "maria@email.com" });
    await cadastrarCategoria({ nome: "Mercado" });
    await cadastrarLancamento({ valor: 100 });
    await cadastrarOrcamento({ valor: 1000 });
    await cadastrarConta({ nome: "Carteira" });
    await editarLancamento("l1", { valor: 120 });
    await removerLancamento("l1");
    await editarConta("c1", { nome: "Banco" });
    await removerConta("c1");
    await marcarNotificacaoComoLida("n1");
    await marcarTodasNotificacoesComoLidas();

    const chamadas = global.fetch.mock.calls.map(([url, options]) => ({
      url,
      method: options?.method || "GET",
    }));

    expect(chamadas).toEqual(
      expect.arrayContaining([
        { url: "http://localhost:3000/auth/cadastro", method: "POST" },
        { url: "http://localhost:3000/auth/login", method: "POST" },
        { url: "http://localhost:3000/categorias", method: "POST" },
        {
          url: "http://localhost:3000/lancamentos/cadastrar",
          method: "POST",
        },
        { url: "http://localhost:3000/orcamentos", method: "POST" },
        { url: "http://localhost:3000/contas", method: "POST" },
        {
          url: "http://localhost:3000/lancamentos/editar/l1",
          method: "PUT",
        },
        {
          url: "http://localhost:3000/lancamentos/remover/l1",
          method: "DELETE",
        },
        { url: "http://localhost:3000/contas/editar/c1", method: "PUT" },
        { url: "http://localhost:3000/contas/remover/c1", method: "DELETE" },
        {
          url: "http://localhost:3000/notifications/n1/read",
          method: "PATCH",
        },
        {
          url: "http://localhost:3000/notifications/read-all",
          method: "PATCH",
        },
      ]),
    );
  });

  it("deve montar query strings apenas com filtros preenchidos", async () => {
    await listarOrcamentos({ mes: 5, ano: 2026, idCategoria: "" });
    await buscarAnalisePreditiva({ mes: 5, ano: 2026 });
    await listarLancamentos({
      periodo: "mes",
      idConta: "conta-1",
      semConta: false,
      tipo: "DESPESA",
      idCategoria: "cat-1",
      valorMinimo: 10,
      valorMaximo: 100,
      limite: 6,
      dataInicio: "2026-05-01",
      dataFim: "2026-06-01",
    });
    await listarLancamentos({ semConta: true, idConta: "conta-1" });
    await listarContas();
    await listarNotificacoes(10);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/orcamentos?mes=5&ano=2026",
      expect.any(Object),
    );
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/analytics/preditiva?mes=5&ano=2026",
      expect.any(Object),
    );
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/lancamentos/listar?periodo=mes&dataInicio=2026-05-01&dataFim=2026-06-01&idConta=conta-1&tipo=DESPESA&idCategoria=cat-1&valorMinimo=10&valorMaximo=100&limite=6",
      expect.any(Object),
    );
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/lancamentos/listar?semConta=true",
      expect.any(Object),
    );
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/contas",
      expect.any(Object),
    );
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/notifications?limite=10",
      expect.any(Object),
    );
  });
});
