import { beforeEach, describe, expect, it } from "vitest";

import {
  estaAutenticado,
  obterToken,
  obterUsuario,
  removerAuth,
  salvarAuth,
} from "../src/lib/auth";

describe("auth lib", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("deve salvar, recuperar e remover token e usuário", () => {
    const usuario = {
      id: "u1",
      nome: "Maria",
      email: "maria@email.com",
    };

    expect(obterToken()).toBeNull();
    expect(obterUsuario()).toBeNull();
    expect(estaAutenticado()).toBe(false);

    salvarAuth("token-123", usuario);

    expect(obterToken()).toBe("token-123");
    expect(obterUsuario()).toEqual(usuario);
    expect(estaAutenticado()).toBe(true);

    removerAuth();

    expect(obterToken()).toBeNull();
    expect(obterUsuario()).toBeNull();
    expect(estaAutenticado()).toBe(false);
  });
});
