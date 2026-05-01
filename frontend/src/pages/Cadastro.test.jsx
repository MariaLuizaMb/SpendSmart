import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Cadastro from "./Cadastro";
import { cadastrarUsuario } from "@/services/api";

const mockNavigate = vi.fn();

vi.mock("@/services/api", () => ({
  cadastrarUsuario: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderCadastro() {
  return render(
    <MemoryRouter>
      <Cadastro />
    </MemoryRouter>,
  );
}

async function preencherFormulario(user, dados = {}) {
  const valores = {
    nome: "Maria Luiza",
    email: "maria@email.com",
    senha: "Senha123",
    confirmarSenha: "Senha123",
    ...dados,
  };

  await user.type(screen.getByLabelText("Nome"), valores.nome);
  await user.type(screen.getByLabelText("Email"), valores.email);
  await user.type(screen.getByLabelText("Senha"), valores.senha);
  await user.type(
    screen.getByLabelText("Confirmar Senha"),
    valores.confirmarSenha,
  );
}

describe("Cadastro", () => {
  it("deve renderizar os campos e o link para login", () => {
    renderCadastro();

    expect(
      screen.getByRole("heading", { name: "Crie Sua Conta" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirmar Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Criar Conta" })).toBeEnabled();
    expect(screen.getByRole("link", { name: "Entre aqui!" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("deve exibir erros obrigatórios ao tentar enviar formulário vazio", async () => {
    const user = userEvent.setup();
    renderCadastro();

    await user.click(screen.getByRole("button", { name: "Criar Conta" }));

    expect(screen.getByText("O nome é obrigatório.")).toBeInTheDocument();
    expect(screen.getByText("O email é obrigatório.")).toBeInTheDocument();
    expect(screen.getByText("A senha é obrigatória.")).toBeInTheDocument();
    expect(screen.getByText("Confirme sua senha.")).toBeInTheDocument();
    expect(cadastrarUsuario).not.toHaveBeenCalled();
  });

  it("deve validar email, tamanho de senha e confirmação de senha", async () => {
    const user = userEvent.setup();
    renderCadastro();

    await user.type(screen.getByLabelText("Nome"), "Ma");
    await user.type(screen.getByLabelText("Email"), "maria-email.com");
    await user.type(screen.getByLabelText("Senha"), "123");
    await user.type(screen.getByLabelText("Confirmar Senha"), "456");

    expect(
      screen.getByText("O nome deve ter pelo menos 3 caracteres."),
    ).toBeInTheDocument();
    expect(screen.getByText("Digite um email válido.")).toBeInTheDocument();
    expect(
      screen.getAllByText("A senha precisa ter pelo menos 8 caracteres."),
    ).toHaveLength(2);

    await user.clear(screen.getByLabelText("Senha"));
    await user.type(screen.getByLabelText("Senha"), "Senha123");
    await user.clear(screen.getByLabelText("Confirmar Senha"));
    await user.type(screen.getByLabelText("Confirmar Senha"), "Senha456");

    expect(screen.getByText("As senhas não coincidem.")).toBeInTheDocument();
  });

  it("deve cadastrar usuário válido, mostrar sucesso e navegar para login", async () => {
    const user = userEvent.setup();

    cadastrarUsuario.mockResolvedValue({ id: "1" });
    renderCadastro();

    await preencherFormulario(user);
    await user.click(screen.getByRole("button", { name: "Criar Conta" }));

    expect(cadastrarUsuario).toHaveBeenCalledWith({
      nome: "Maria Luiza",
      email: "maria@email.com",
      senha: "Senha123",
    });
    expect(
      await screen.findByText("Usuário cadastrado com sucesso."),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    }, { timeout: 2000 });
  });

  it("deve mostrar carregamento enquanto envia o cadastro", async () => {
    const user = userEvent.setup();
    let resolverCadastro;
    const cadastroPendente = new Promise((resolve) => {
      resolverCadastro = resolve;
    });

    cadastrarUsuario.mockReturnValue(cadastroPendente);
    renderCadastro();

    await preencherFormulario(user);
    await user.click(screen.getByRole("button", { name: "Criar Conta" }));

    expect(
      screen.getByRole("button", { name: "Criando conta..." }),
    ).toBeDisabled();

    resolverCadastro({ id: "1" });
    await screen.findByText("Usuário cadastrado com sucesso.");
  });

  it("deve exibir mensagem de erro quando a API rejeitar o cadastro", async () => {
    const user = userEvent.setup();
    cadastrarUsuario.mockRejectedValue(
      new Error("Já existe um usuário com esse email."),
    );

    renderCadastro();

    await preencherFormulario(user);
    await user.click(screen.getByRole("button", { name: "Criar Conta" }));

    expect(
      await screen.findByText("Já existe um usuário com esse email."),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Criar Conta" })).toBeEnabled();
    });
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
