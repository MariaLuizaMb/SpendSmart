import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../src/services/authServices.js", () => ({
  default: {
    cadastrar: vi.fn(),
    login: vi.fn(),
  },
}));

vi.mock("../src/services/bankAccountService.js", () => ({
  default: {
    listarPorUsuario: vi.fn(),
    cadastrar: vi.fn(),
    editar: vi.fn(),
    remover: vi.fn(),
  },
}));

vi.mock("../src/services/categoryService.js", () => ({
  default: {
    listarPorUsuario: vi.fn(),
    cadastrarPersonalizada: vi.fn(),
    editar: vi.fn(),
    remover: vi.fn(),
  },
}));

vi.mock("../src/services/launchService.js", () => ({
  default: {
    cadastrar: vi.fn(),
    editar: vi.fn(),
    remover: vi.fn(),
    listar: vi.fn(),
  },
}));

vi.mock("../src/services/orcamentoService.js", () => ({
  default: {
    cadastrar: vi.fn(),
    listar: vi.fn(),
    buscarPorId: vi.fn(),
    editar: vi.fn(),
    remover: vi.fn(),
  },
}));

vi.mock("../src/services/analyticsService.js", () => ({
  default: {
    obterAnalisePreditiva: vi.fn(),
  },
}));

import AnalyticsController from "../src/controllers/analyticsController.js";
import AuthController from "../src/controllers/authController.js";
import BankAccountController from "../src/controllers/bankAccountController.js";
import CategoryController from "../src/controllers/categoryController.js";
import LaunchController from "../src/controllers/launchController.js";
import OrcamentoController from "../src/controllers/orcamentoController.js";
import AnalyticsService from "../src/services/analyticsService.js";
import AuthService from "../src/services/authServices.js";
import BankAccountService from "../src/services/bankAccountService.js";
import CategoryService from "../src/services/categoryService.js";
import LaunchService from "../src/services/launchService.js";
import OrcamentoService from "../src/services/orcamentoService.js";

function criarResponseMock() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

function criarReq({ body = {}, params = {}, query = {}, usuario = { id: "u1" } } = {}) {
  return { body, params, query, usuario };
}

describe("controllers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("AuthController deve cadastrar e fazer login com respostas esperadas", async () => {
    const resCadastro = criarResponseMock();
    const usuario = { id: "u1", email: "maria@email.com" };
    AuthService.cadastrar.mockResolvedValue(usuario);

    await AuthController.cadastrar(
      criarReq({ body: { nome: "Maria", email: "maria@email.com", senha: "Senha123" } }),
      resCadastro,
    );

    expect(AuthService.cadastrar).toHaveBeenCalledWith({
      nome: "Maria",
      email: "maria@email.com",
      senha: "Senha123",
    });
    expect(resCadastro.status).toHaveBeenCalledWith(201);
    expect(resCadastro.json).toHaveBeenCalledWith({
      mensagem: "Usuário cadastrado com sucesso.",
      usuario,
    });

    const resLogin = criarResponseMock();
    AuthService.login.mockResolvedValue({ token: "jwt", usuario });

    await AuthController.login(
      criarReq({ body: { email: "maria@email.com", senha: "Senha123" } }),
      resLogin,
    );

    expect(resLogin.status).toHaveBeenCalledWith(200);
    expect(resLogin.json).toHaveBeenCalledWith({
      mensagem: "Login realizado com sucesso.",
      token: "jwt",
      usuario,
    });
  });

  it("AuthController deve transformar erros em JSON com status e código", async () => {
    const res = criarResponseMock();
    const erro = new Error("Email já cadastrado.");
    erro.statusCode = 409;
    erro.code = "EMAIL_ALREADY_EXISTS";
    AuthService.cadastrar.mockRejectedValue(erro);

    await AuthController.cadastrar(criarReq({ body: {} }), res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      erro: "Email já cadastrado.",
      codigo: "EMAIL_ALREADY_EXISTS",
    });
  });

  it("BankAccountController deve delegar listar, cadastrar, editar e remover", async () => {
    const conta = { id: "c1", nome: "Nubank" };
    BankAccountService.listarPorUsuario.mockResolvedValue([conta]);
    BankAccountService.cadastrar.mockResolvedValue(conta);
    BankAccountService.editar.mockResolvedValue({ ...conta, nome: "Carteira" });
    BankAccountService.remover.mockResolvedValue({ id: "c1" });

    const resListar = criarResponseMock();
    await BankAccountController.listar(criarReq(), resListar, vi.fn());
    expect(BankAccountService.listarPorUsuario).toHaveBeenCalledWith("u1");
    expect(resListar.status).toHaveBeenCalledWith(200);

    const body = {
      nome: "Nubank",
      tipo: "CONTA_CORRENTE",
      saldoInicial: 100,
      modeloCartao: "NUBANK",
      descricao: "Principal",
    };
    const resCadastrar = criarResponseMock();
    await BankAccountController.cadastrar(criarReq({ body }), resCadastrar, vi.fn());
    expect(BankAccountService.cadastrar).toHaveBeenCalledWith({
      idUsuario: "u1",
      ...body,
    });
    expect(resCadastrar.status).toHaveBeenCalledWith(201);

    const resEditar = criarResponseMock();
    await BankAccountController.editar(
      criarReq({ params: { id: "c1" }, body: { nome: "Carteira" } }),
      resEditar,
      vi.fn(),
    );
    expect(BankAccountService.editar).toHaveBeenCalledWith("c1", "u1", {
      nome: "Carteira",
    });
    expect(resEditar.status).toHaveBeenCalledWith(200);

    const resRemover = criarResponseMock();
    await BankAccountController.remover(
      criarReq({ params: { id: "c1" } }),
      resRemover,
      vi.fn(),
    );
    expect(BankAccountService.remover).toHaveBeenCalledWith("c1", "u1");
    expect(resRemover.status).toHaveBeenCalledWith(200);
  });

  it("CategoryController deve delegar sucesso e encaminhar erros ao next", async () => {
    const categoria = { id: "cat1", nome: "Mercado", tipo: "DESPESA" };
    CategoryService.listarPorUsuario.mockResolvedValue([categoria]);
    CategoryService.cadastrarPersonalizada.mockResolvedValue(categoria);
    CategoryService.editar.mockResolvedValue({ ...categoria, nome: "Feira" });
    CategoryService.remover.mockResolvedValue({ id: "cat1" });

    const resListar = criarResponseMock();
    await CategoryController.listar(criarReq(), resListar, vi.fn());
    expect(CategoryService.listarPorUsuario).toHaveBeenCalledWith("u1");
    expect(resListar.json).toHaveBeenCalledWith({ success: true, data: [categoria] });

    const resCadastrar = criarResponseMock();
    await CategoryController.cadastrar(
      criarReq({ body: { nome: "Mercado", tipo: "despesa" } }),
      resCadastrar,
      vi.fn(),
    );
    expect(CategoryService.cadastrarPersonalizada).toHaveBeenCalledWith({
      idUsuario: "u1",
      nome: "Mercado",
      tipo: "despesa",
    });
    expect(resCadastrar.status).toHaveBeenCalledWith(201);

    const resEditar = criarResponseMock();
    await CategoryController.editar(
      criarReq({ params: { id: "cat1" }, body: { nome: "Feira" } }),
      resEditar,
      vi.fn(),
    );
    expect(CategoryService.editar).toHaveBeenCalledWith("cat1", "u1", {
      nome: "Feira",
    });

    const next = vi.fn();
    const erro = new Error("falha");
    CategoryService.remover.mockRejectedValueOnce(erro);
    await CategoryController.remover(
      criarReq({ params: { id: "cat1" } }),
      criarResponseMock(),
      next,
    );
    expect(next).toHaveBeenCalledWith(erro);
  });

  it("LaunchController deve montar dados do usuário e filtros de consulta", async () => {
    const lancamento = { id: "l1", valor: 120 };
    LaunchService.cadastrar.mockResolvedValue(lancamento);
    LaunchService.editar.mockResolvedValue({ ...lancamento, valor: 150 });
    LaunchService.remover.mockResolvedValue({ id: "l1" });
    LaunchService.listar.mockResolvedValue([lancamento]);

    const body = {
      idCategoria: "cat1",
      idConta: "conta1",
      valor: 120,
      dataTransacao: "2026-05-10",
      tipo: "DESPESA",
      descricao: "Mercado",
      recorrencia: "NENHUMA",
    };
    const resCadastrar = criarResponseMock();
    await LaunchController.cadastrar(criarReq({ body }), resCadastrar, vi.fn());
    expect(LaunchService.cadastrar).toHaveBeenCalledWith({
      idUsuario: "u1",
      ...body,
    });
    expect(resCadastrar.status).toHaveBeenCalledWith(201);

    const resListar = criarResponseMock();
    await LaunchController.listar(
      criarReq({ query: { tipo: "DESPESA" } }),
      resListar,
      vi.fn(),
    );
    expect(LaunchService.listar).toHaveBeenCalledWith("u1", { tipo: "DESPESA" });
    expect(resListar.json).toHaveBeenCalledWith({
      success: true,
      message: "Lançamentos recuperados com sucesso.",
      data: [lancamento],
    });

    await LaunchController.editar(
      criarReq({ params: { id: "l1" }, body: { valor: 150 } }),
      criarResponseMock(),
      vi.fn(),
    );
    expect(LaunchService.editar).toHaveBeenCalledWith("l1", "u1", { valor: 150 });

    await LaunchController.remover(
      criarReq({ params: { id: "l1" } }),
      criarResponseMock(),
      vi.fn(),
    );
    expect(LaunchService.remover).toHaveBeenCalledWith("l1", "u1");
  });

  it("OrcamentoController deve cobrir cadastro, busca, edição, listagem e remoção", async () => {
    const orcamento = { id: "o1", valor: 1000 };
    OrcamentoService.cadastrar.mockResolvedValue(orcamento);
    OrcamentoService.listar.mockResolvedValue([orcamento]);
    OrcamentoService.buscarPorId.mockResolvedValue(orcamento);
    OrcamentoService.editar.mockResolvedValue({ ...orcamento, valor: 1200 });
    OrcamentoService.remover.mockResolvedValue({ id: "o1" });

    await OrcamentoController.cadastrar(
      criarReq({ body: { valor: 1000, mes: 5, ano: 2026, idCategoria: null } }),
      criarResponseMock(),
      vi.fn(),
    );
    expect(OrcamentoService.cadastrar).toHaveBeenCalledWith({
      idUsuario: "u1",
      valor: 1000,
      mes: 5,
      ano: 2026,
      idCategoria: null,
      descricao: undefined,
    });

    await OrcamentoController.listar(
      criarReq({ query: { mes: "5" } }),
      criarResponseMock(),
      vi.fn(),
    );
    expect(OrcamentoService.listar).toHaveBeenCalledWith("u1", { mes: "5" });

    await OrcamentoController.buscarPorId(
      criarReq({ params: { id: "o1" } }),
      criarResponseMock(),
      vi.fn(),
    );
    expect(OrcamentoService.buscarPorId).toHaveBeenCalledWith("o1", "u1");

    await OrcamentoController.editar(
      criarReq({ params: { id: "o1" }, body: { valor: 1200 } }),
      criarResponseMock(),
      vi.fn(),
    );
    expect(OrcamentoService.editar).toHaveBeenCalledWith("o1", "u1", {
      valor: 1200,
    });

    await OrcamentoController.remover(
      criarReq({ params: { id: "o1" } }),
      criarResponseMock(),
      vi.fn(),
    );
    expect(OrcamentoService.remover).toHaveBeenCalledWith("o1", "u1");
  });

  it("AnalyticsController deve validar query e usar período padrão quando ausente", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-26T12:00:00.000Z"));
    AnalyticsService.obterAnalisePreditiva.mockResolvedValue({ resumo: {} });

    const res = criarResponseMock();
    await AnalyticsController.obterAnalisePreditiva(criarReq(), res, vi.fn());

    expect(AnalyticsService.obterAnalisePreditiva).toHaveBeenCalledWith({
      idUsuario: "u1",
      mes: 5,
      ano: 2026,
    });
    expect(res.status).toHaveBeenCalledWith(200);

    const nextMes = vi.fn();
    await AnalyticsController.obterAnalisePreditiva(
      criarReq({ query: { mes: "13", ano: "2026" } }),
      criarResponseMock(),
      nextMes,
    );
    expect(nextMes).toHaveBeenCalledWith(expect.objectContaining({
      message: "O mês deve estar entre 1 e 12.",
    }));

    const nextAno = vi.fn();
    await AnalyticsController.obterAnalisePreditiva(
      criarReq({ query: { mes: "5", ano: "1800" } }),
      criarResponseMock(),
      nextAno,
    );
    expect(nextAno).toHaveBeenCalledWith(expect.objectContaining({
      message: "O ano informado é inválido.",
    }));
  });
});
