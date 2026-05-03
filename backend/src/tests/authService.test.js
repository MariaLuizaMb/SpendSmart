import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import bcrypt from "bcrypt";

vi.mock("../database/prisma.js", () => ({
  default: {
    usuario: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

vi.mock("jsonwebtoken", () => ({
  default: {
    sign: vi.fn(() => "token-fake"),
  },
}));

import prisma from "../database/prisma.js";
import jwt from "jsonwebtoken";
import AuthService from "../services/authServices.js";

describe("AuthService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.JWT_SECRET = "teste-secret";
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("cadastrar", () => {
    it("deve cadastrar usuário quando os dados são válidos", async () => {
      vi.spyOn(bcrypt, "hash").mockResolvedValue("hash-fake");
      prisma.usuario.findUnique.mockResolvedValue(null);
      prisma.usuario.create.mockResolvedValue({
        id: "1",
        nome: "Maria",
        email: "maria@email.com",
        criadoEm: new Date("2026-04-19T10:00:00.000Z"),
      });

      const resultado = await AuthService.cadastrar({
        nome: "Maria",
        email: "maria@email.com",
        senha: "Senha123",
      });

      expect(prisma.usuario.findUnique).toHaveBeenCalledWith({
        where: { email: "maria@email.com" },
      });

      expect(bcrypt.hash).toHaveBeenCalledWith("Senha123", 10);

      expect(prisma.usuario.create).toHaveBeenCalledWith({
        data: {
          nome: "Maria",
          email: "maria@email.com",
          senhaHash: "hash-fake",
        },
        select: {
          id: true,
          nome: true,
          email: true,
          criadoEm: true,
        },
      });

      expect(resultado).toEqual({
        id: "1",
        nome: "Maria",
        email: "maria@email.com",
        criadoEm: new Date("2026-04-19T10:00:00.000Z"),
      });
    });

    it("deve falhar quando o email já existe", async () => {
      prisma.usuario.findUnique.mockResolvedValue({
        id: "1",
        email: "maria@email.com",
      });

      await expect(
        AuthService.cadastrar({
          nome: "Maria",
          email: "maria@email.com",
          senha: "Senha123",
        }),
      ).rejects.toThrow("Já existe um usuário com esse email.");

      expect(prisma.usuario.create).not.toHaveBeenCalled();
    });

    it("deve falhar quando o email for inválido", async () => {
      await expect(
        AuthService.cadastrar({
          nome: "Maria",
          email: "maria-email.com",
          senha: "Senha123",
        }),
      ).rejects.toThrow("Informe um email válido, como nome@dominio.com.");
    });

    it("não deve retornar senha nem senhaHash no resultado do cadastro", async () => {
      vi.spyOn(bcrypt, "hash").mockResolvedValue("hash-fake");

      prisma.usuario.findUnique.mockResolvedValue(null);
      prisma.usuario.create.mockResolvedValue({
        id: "1",
        nome: "Maria",
        email: "maria@email.com",
        criadoEm: new Date("2026-04-19T10:00:00.000Z"),
      });

      const resultado = await AuthService.cadastrar({
        nome: "Maria",
        email: "maria@email.com",
        senha: "Senha123",
      });

      expect(resultado).not.toHaveProperty("senha");
      expect(resultado).not.toHaveProperty("senhaHash");
    });
  });

  it("deve falhar quando a senha for fraca", async () => {
    await expect(
      AuthService.cadastrar({
        nome: "Maria",
        email: "maria@email.com",
        senha: "12345678",
      }),
    ).rejects.toThrow("A senha deve conter pelo menos uma letra maiúscula.");
  });
});

describe("login", () => {
  it("deve fazer login com credenciais válidas", async () => {
    prisma.usuario.findUnique.mockResolvedValue({
      id: "1",
      nome: "Maria",
      email: "maria@email.com",
      senhaHash: "hash-fake",
    });

    vi.spyOn(bcrypt, "compare").mockResolvedValue(true);

    const resultado = await AuthService.login({
      email: "maria@email.com",
      senha: "Senha123",
    });

    expect(prisma.usuario.findUnique).toHaveBeenCalledWith({
      where: { email: "maria@email.com" },
    });

    expect(bcrypt.compare).toHaveBeenCalledWith("Senha123", "hash-fake");

    expect(jwt.sign).toHaveBeenCalledWith(
      {
        sub: "1",
        email: "maria@email.com",
      },
      "teste-secret",
      {
        expiresIn: "1d",
      },
    );

    expect(resultado).toEqual({
      token: "token-fake",
      usuario: {
        id: "1",
        nome: "Maria",
        email: "maria@email.com",
      },
    });
  });

  it("deve falhar no login quando o email não existe", async () => {
    prisma.usuario.findUnique.mockResolvedValue(null);

    await expect(
      AuthService.login({
        email: "naoexiste@email.com",
        senha: "Senha123",
      }),
    ).rejects.toThrow("Email inválido.");
  });

  it("deve falhar no login quando a senha está incorreta", async () => {
    prisma.usuario.findUnique.mockResolvedValue({
      id: "1",
      nome: "Maria",
      email: "maria@email.com",
      senhaHash: "hash-fake",
    });

    vi.spyOn(bcrypt, "compare").mockResolvedValue(false);

    await expect(
      AuthService.login({
        email: "maria@email.com",
        senha: "SenhaErrada123",
      }),
    ).rejects.toThrow("Senha inválida.");
  });

  it("não deve retornar senha nem senhaHash no payload do login", async () => {
    prisma.usuario.findUnique.mockResolvedValue({
      id: "1",
      nome: "Maria",
      email: "maria@email.com",
      senhaHash: "hash-fake",
    });

    vi.spyOn(bcrypt, "compare").mockResolvedValue(true);

    const resultado = await AuthService.login({
      email: "maria@email.com",
      senha: "Senha123",
    });

    expect(resultado).not.toHaveProperty("senha");
    expect(resultado).not.toHaveProperty("senhaHash");

    expect(resultado.usuario).not.toHaveProperty("senha");
    expect(resultado.usuario).not.toHaveProperty("senhaHash");
  });

  it("deve falhar quando JWT_SECRET não estiver configurado", async () => {
    delete process.env.JWT_SECRET;

    prisma.usuario.findUnique.mockResolvedValue({
      id: "1",
      nome: "Maria",
      email: "maria@email.com",
      senhaHash: "hash-fake",
    });

    vi.spyOn(bcrypt, "compare").mockResolvedValue(true);

    await expect(
      AuthService.login({
        email: "maria@email.com",
        senha: "Senha123",
      }),
    ).rejects.toMatchObject({
      message: "A configuração de autenticação do servidor está ausente.",
      statusCode: 500,
      code: "INTERNAL_SERVER_ERROR",
    });
  });
});
