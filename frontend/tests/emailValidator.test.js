import { describe, expect, it } from "vitest";

import { emailTemFormatoValido } from "../src/utils/emailValidator";

describe("emailTemFormatoValido", () => {
  it("deve aceitar emails simples válidos", () => {
    expect(emailTemFormatoValido("maria@email.com")).toBe(true);
    expect(emailTemFormatoValido("  maria.luiza@spendsmart.com.br  ")).toBe(
      true,
    );
  });

  it.each([
    null,
    "",
    "a@b.c",
    "maria-email.com",
    "maria@@email.com",
    "@email.com",
    "maria@",
    "maria@email",
    "maria@.email.com",
    "maria@email.",
    "maria luiza@email.com",
    "maria\t@email.com",
  ])("deve rejeitar email inválido %s", (email) => {
    expect(emailTemFormatoValido(email)).toBe(false);
  });
});
