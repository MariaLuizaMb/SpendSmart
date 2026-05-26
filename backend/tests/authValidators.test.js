import { describe, expect, it } from "vitest";

import {
  emailTemFormatoValido,
  validarEmail,
  validarJwtSecret,
  validarSenha,
} from "../src/utils/authValidators.js";

describe("authValidators", () => {
  it("deve normalizar email válido sem usar validação por regex", () => {
    expect(validarEmail("  Maria@Email.COM  ")).toBe("maria@email.com");
    expect(emailTemFormatoValido("nome@dominio.com")).toBe(true);
  });

  it.each([
    ["não string", null],
    ["sem arroba", "maria-email.com"],
    ["com dois arrobas", "maria@@email.com"],
    ["local vazio", "@email.com"],
    ["domínio vazio", "maria@"],
    ["domínio sem ponto", "maria@email"],
    ["domínio começando com ponto", "maria@.email.com"],
    ["domínio terminando com ponto", "maria@email."],
    ["com espaço", "maria luiza@email.com"],
    ["curto demais", "a@b.c"],
  ])("deve rejeitar email inválido: %s", (_caso, email) => {
    expect(emailTemFormatoValido(email)).toBe(false);
    expect(() => validarEmail(email)).toThrow(
      typeof email === "string"
        ? "Informe um email válido, como nome@dominio.com."
        : "O email informado é inválido.",
    );
  });

  it("deve validar senha forte e rejeitar senha fraca preservando mensagens", () => {
    expect(validarSenha(" Senha123 ")).toBe("Senha123");
    expect(() => validarSenha("12345678")).toThrow(
      "A senha deve conter pelo menos uma letra maiúscula.",
    );
    expect(() => validarSenha("Senhaabc")).toThrow(
      "A senha deve conter pelo menos um número.",
    );
  });

  it("deve exigir JWT_SECRET configurado", () => {
    const secretOriginal = process.env.JWT_SECRET;
    delete process.env.JWT_SECRET;

    expect(() => validarJwtSecret()).toThrow(
      "A configuração de autenticação do servidor está ausente.",
    );

    process.env.JWT_SECRET = " segredo ";
    expect(validarJwtSecret()).toBe(" segredo ");

    if (secretOriginal === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = secretOriginal;
    }
  });
});
