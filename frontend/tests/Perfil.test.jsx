import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockNavigate = vi.fn();

vi.mock("@/lib/auth", () => ({
  obterToken: vi.fn(),
  obterUsuario: vi.fn(),
  removerAuth: vi.fn(),
  salvarAuth: vi.fn(),
}));

vi.mock("@/services/api", () => ({
  listarCategorias: vi.fn(),
  listarContas: vi.fn(),
  listarLancamentos: vi.fn(),
  listarOrcamentos: vi.fn(),
  excluirContaUsuario: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import Perfil from "../src/pages/Perfil";
import { obterToken, obterUsuario, removerAuth, salvarAuth } from "@/lib/auth";
import {
  listarCategorias,
  listarContas,
  listarLancamentos,
  listarOrcamentos,
  excluirContaUsuario,
} from "@/services/api";

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
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    obterToken.mockReturnValue("token");
    listarContas.mockResolvedValue([{ id: "conta-1" }, { id: "conta-2" }]);
    listarCategorias.mockResolvedValue([{ id: "categoria-1" }]);
    listarLancamentos.mockResolvedValue([
      { id: "lancamento-1" },
      { id: "lancamento-2" },
      { id: "lancamento-3" },
    ]);
    listarOrcamentos.mockResolvedValue([{ id: "orcamento-1" }]);
    excluirContaUsuario.mockResolvedValue({});
  });

  it("deve exibir a tela de perfil sem breadcrumb e com dados seguros do usuario", async () => {
    obterUsuario.mockReturnValue({
      nome: "Maria Luiza",
      email: "maria@email.com",
      criadoEm: "2026-04-19T12:00:00.000Z",
      atualizadoEm: "2026-05-18T12:00:00.000Z",
    });

    renderPerfil();

    expect(screen.getByRole("heading", { name: "Perfil" })).toBeInTheDocument();
    expect(
      screen.getByText(/Gerencie suas informações pessoais/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/SpendSmart > Perfil/i)).not.toBeInTheDocument();
    expect(screen.getAllByText("Maria Luiza")).toHaveLength(2);
    expect(screen.getAllByText("maria@email.com")).toHaveLength(2);
    expect(
      screen.getByText(/Conta criada em 19\/04\/2026/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Última atualização 18\/05\/2026/i),
    ).toBeInTheDocument();
    expect(screen.queryByText("Preferências")).not.toBeInTheDocument();
    expect(screen.queryByText("senhaHash")).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Contas cadastradas")).toBeInTheDocument();
      expect(screen.getByText("Lançamentos")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
    });
  });

  it("deve salvar alteracoes pessoais na sessao local", async () => {
    const user = userEvent.setup();
    obterUsuario.mockReturnValue({
      id: "user-1",
      nome: "Maria Luiza",
      email: "maria@email.com",
    });

    renderPerfil();

    await user.clear(screen.getByLabelText("Nome completo"));
    await user.type(screen.getByLabelText("Nome completo"), "Maria Madeira");
    await user.click(screen.getByRole("button", { name: "Salvar" }));

    expect(salvarAuth).toHaveBeenCalledWith(
      "token",
      expect.objectContaining({
        id: "user-1",
        nome: "Maria Madeira",
        email: "maria@email.com",
      }),
    );
    expect(
      screen.getByText("Informações pessoais atualizadas nesta sessão."),
    ).toBeInTheDocument();
  });

  it("deve confirmar antes de executar a acao de excluir conta", async () => {
    const user = userEvent.setup();
    obterUsuario.mockReturnValue({
      nome: "Maria Luiza",
      email: "maria@email.com",
    });

    renderPerfil();

    await user.click(screen.getByRole("button", { name: "Excluir conta" }));

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(removerAuth).not.toHaveBeenCalled();

    await user.click(
      screen.getAllByRole("button", { name: "Excluir conta" }).at(-1),
    );

    await waitFor(() => {
      expect(removerAuth).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("deve permitir desconectar sem abrir confirmacao de exclusao", async () => {
    const user = userEvent.setup();
    obterUsuario.mockReturnValue({
      nome: "Maria Luiza",
      email: "maria@email.com",
    });

    renderPerfil();

    await user.click(screen.getByRole("button", { name: "Desconectar" }));

    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    expect(removerAuth).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
