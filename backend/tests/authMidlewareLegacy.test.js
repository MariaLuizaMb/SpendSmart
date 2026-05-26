import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("jsonwebtoken", () => ({
  default: {
    verify: vi.fn(),
  },
}));

import jwt from "jsonwebtoken";
import authMidleware from "../src/middlewares/authMidleware.js";

function criarResponseMock() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("authMidleware legado", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.JWT_SECRET = "secret-test";
  });

  it("deve rejeitar ausência e formato inválido de token", () => {
    const resSemToken = criarResponseMock();
    authMidleware({ headers: {} }, resSemToken, vi.fn());

    expect(resSemToken.status).toHaveBeenCalledWith(401);
    expect(resSemToken.json).toHaveBeenCalledWith({
      erro: "Token não enviado.",
    });

    const resFormatoInvalido = criarResponseMock();
    authMidleware(
      { headers: { authorization: "Bearer" } },
      resFormatoInvalido,
      vi.fn(),
    );

    expect(resFormatoInvalido.status).toHaveBeenCalledWith(401);
    expect(resFormatoInvalido.json).toHaveBeenCalledWith({
      erro: "Formato do token inválido.",
    });
  });

  it("deve preencher usuário quando o token for válido", () => {
    jwt.verify.mockReturnValue({ sub: "u1", email: "maria@email.com" });
    const req = { headers: { authorization: "Bearer token-valido" } };
    const res = criarResponseMock();
    const next = vi.fn();

    authMidleware(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith("token-valido", "secret-test");
    expect(req.usuario).toEqual({
      id: "u1",
      email: "maria@email.com",
    });
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  it("deve rejeitar token inválido ou expirado", () => {
    jwt.verify.mockImplementation(() => {
      throw new Error("jwt expired");
    });
    const res = criarResponseMock();

    authMidleware(
      { headers: { authorization: "Bearer token-expirado" } },
      res,
      vi.fn(),
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      erro: "Token inválido ou expirado.",
    });
  });
});
