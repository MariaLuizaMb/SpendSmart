import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("jsonwebtoken", () => ({
  default: {
    verify: vi.fn(),
  },
}));

import jwt from "jsonwebtoken";
import authMiddleware from "./authMiddleware.js";

function criarResponseMock() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("authMiddleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.JWT_SECRET = "teste-secret";
  });

  it("deve retornar 401 quando o token não for enviado", () => {
    const req = {
      headers: {},
    };
    const res = criarResponseMock();
    const next = vi.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      erro: "Token não enviado.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar 401 quando o header Authorization estiver mal formatado", () => {
    const req = {
      headers: {
        authorization: "Token abc123",
      },
    };
    const res = criarResponseMock();
    const next = vi.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      erro: "Tipo de autenticação inválido. Use o formato Bearer token.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar 403 quando o token for inválido", () => {
    jwt.verify.mockImplementation(() => {
      throw new Error("invalid token");
    });

    const req = {
      headers: {
        authorization: "Bearer token-invalido",
      },
    };
    const res = criarResponseMock();
    const next = vi.fn();

    authMiddleware(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith("token-invalido", "teste-secret");
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      erro: "Token inválido ou expirado.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve permitir o acesso à rota privada quando o token for válido", () => {
    jwt.verify.mockReturnValue({
      sub: "1",
      email: "maria@email.com",
    });

    const req = {
      headers: {
        authorization: "Bearer token-valido",
      },
    };
    const res = criarResponseMock();
    const next = vi.fn();

    authMiddleware(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith("token-valido", "teste-secret");
    expect(req.usuario).toEqual({
      id: "1",
      email: "maria@email.com",
    });
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});
