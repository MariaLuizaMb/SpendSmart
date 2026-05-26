import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockNavigate = vi.fn();

vi.mock("@/lib/auth", () => ({
  obterUsuario: vi.fn(),
  removerAuth: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import Perfil from "../src/pages/Perfil";
import { obterUsuario, removerAuth } from "@/lib/auth";

function renderPerfil() {
  return render(
    <MemoryRouter>
      <Perfil />
    </MemoryRouter>,
  );
}

describe("Perfil", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve exibir dados do usuário autenticado", () => {
    obterUsuario.mockReturnValue({
      nome: "Maria Luiza",
      email: "maria@email.com",
    });

    renderPerfil();

    expect(screen.getByRole("heading", { name: "Perfil" })).toBeInTheDocument();
    expect(screen.getByText("Maria Luiza")).toBeInTheDocument();
    expect(screen.getByText("maria@email.com")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Voltar/i })).toHaveAttribute(
      "href",
      "/home",
    );
  });

  it("deve usar textos padrão e sair limpando autenticação", async () => {
    const user = userEvent.setup();
    obterUsuario.mockReturnValue(null);

    renderPerfil();

    expect(screen.getByText("Usuário")).toBeInTheDocument();
    expect(screen.getByText("m@example.com")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Sair/i }));

    expect(removerAuth).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
