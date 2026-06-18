import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import AppRoutes from "../src/routes/AppRoutes";

// jsdom não implementa matchMedia por padrão.
// Alguns componentes/hooks (ex: use-mobile) exigem isso.
import { beforeAll } from "vitest";
beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    (() => ({
      matches: false,
      media: "",
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }));
});

vi.mock("@/lib/auth", () => ({
  estaAutenticado: vi.fn(),
  obterUsuario: vi.fn(() => ({ id: "u1", nome: "Maria" })),
}));

import { estaAutenticado } from "@/lib/auth";

function setAuth(value) {
  vi.mocked(estaAutenticado).mockReturnValue(value);
}

describe("AppRoutes", () => {
  it("rota pública (/) renderiza Login quando não autenticado", async () => {
    setAuth(false);

    const user = userEvent.setup();

    render(<AppRoutes />);

    expect(
      screen.getByRole("heading", { name: /Bem vindo de volta!/i }),
    ).toBeInTheDocument();

    // Navega para /cadastro pelo Link do Login (se existir no componente).
    // Se o componente não tiver link, ao menos o teste garante que Login está montado.
    const linkCadastro = screen.queryByRole("link", { name: /Cadastro/i });
    if (linkCadastro) {
      await user.click(linkCadastro);
      expect(
        await screen.findByRole("heading", { name: /Cadastro/i }),
      ).toBeInTheDocument();
    }
  });

  it("rota privada (/dashboard) redireciona para / quando não autenticado", async () => {
    setAuth(false);

    // Como BrowserRouter não permite setar location via MemoryRouter,
    // simulamos renderizando e validando o Redirect via presença de Login.
    // O RotaPrivada deve cair em <Navigate to="/" replace />.
    window.history.pushState({}, "", "/dashboard");

    render(<AppRoutes />);

    // Quando não autenticado, retorna para a rota '/' e o Login deve renderizar.
    // No componente Login, o h1 exibido é "Bem vindo de volta!".
    expect(
      screen.getByRole("heading", { name: /Bem vindo de volta!/i }),
    ).toBeInTheDocument();
  });

  it("rota privada (/contas-bancarias) renderiza ContasBancarias quando autenticado", async () => {
    setAuth(true);

    window.history.pushState({}, "", "/contas-bancarias");

    render(<AppRoutes />);

    expect(
      screen.getByRole("heading", { name: /Contas Bancárias/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Criar Nova Conta/i)).toBeInTheDocument();
  });
});
