import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Login from "../src/pages/Login";
import { loginUsuario } from "@/services/api";
import { salvarAuth } from "@/lib/auth";

const mockNavigate = vi.fn();

vi.mock("@/services/api", () => ({
  loginUsuario: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({
  salvarAuth: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderLogin() {
  return render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  );
}

describe("Login", () => {
  it("deve renderizar campos e link para cadastro", () => {
    renderLogin();

    expect(
      screen.getByRole("heading", { name: "Bem vindo de volta!" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Cadastrar" })).toHaveAttribute(
      "href",
      "/cadastro",
    );
  });

  it("deve validar formulário antes de chamar a API", async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(screen.getByText("O email é obrigatório.")).toBeInTheDocument();
    expect(screen.getByText("A senha é obrigatória.")).toBeInTheDocument();
    expect(loginUsuario).not.toHaveBeenCalled();

    await user.type(screen.getByLabelText("Email"), "maria-email.com");
    await user.type(screen.getByLabelText("Senha"), "123");

    expect(screen.getByText("Digite um email válido.")).toBeInTheDocument();
    expect(
      screen.getByText("A senha precisa ter pelo menos 8 caracteres."),
    ).toBeInTheDocument();
  });

  it("deve salvar autenticação e navegar para home em login válido", async () => {
    const user = userEvent.setup();
    const resultado = {
      token: "token-123",
      usuario: { id: "1", nome: "Maria", email: "maria@email.com" },
    };
    loginUsuario.mockResolvedValue(resultado);
    renderLogin();

    await user.type(screen.getByLabelText("Email"), "maria@email.com");
    await user.type(screen.getByLabelText("Senha"), "Senha123");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(loginUsuario).toHaveBeenCalledWith({
      email: "maria@email.com",
      senha: "Senha123",
    });
    await waitFor(() => {
      expect(salvarAuth).toHaveBeenCalledWith("token-123", resultado.usuario);
      expect(mockNavigate).toHaveBeenCalledWith("/home");
    });
  });

  it("deve exibir erros de credenciais retornados pela API", async () => {
    const user = userEvent.setup();
    loginUsuario.mockRejectedValue(new Error("Email e senha inválidos."));
    renderLogin();

    await user.type(screen.getByLabelText("Email"), "maria@email.com");
    await user.type(screen.getByLabelText("Senha"), "Senha123");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(await screen.findByText("Email inválido.")).toBeInTheDocument();
    expect(screen.getByText("Senha inválida.")).toBeInTheDocument();
  });

  it("deve alternar visibilidade da senha", async () => {
    const user = userEvent.setup();
    renderLogin();

    const senha = screen.getByLabelText("Senha");
    expect(senha).toHaveAttribute("type", "password");

    await user.click(screen.getByRole("button", { name: "Mostrar senha" }));
    expect(senha).toHaveAttribute("type", "text");

    await user.click(screen.getByRole("button", { name: "Ocultar senha" }));
    expect(senha).toHaveAttribute("type", "password");
  });
});
