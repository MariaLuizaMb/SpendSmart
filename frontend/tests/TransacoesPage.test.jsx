import React from "react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockApi = vi.hoisted(() => ({
  listarCategorias: vi.fn(),
  listarContas: vi.fn(),
  listarLancamentos: vi.fn(),
  editarLancamento: vi.fn(),
  removerLancamento: vi.fn(),
  cadastrarOrcamento: vi.fn(),
}));

vi.mock("@/services/api", () => ({
  listarCategorias: mockApi.listarCategorias,
  listarContas: mockApi.listarContas,
  listarLancamentos: mockApi.listarLancamentos,
  editarLancamento: mockApi.editarLancamento,
  removerLancamento: mockApi.removerLancamento,
  cadastrarOrcamento: mockApi.cadastrarOrcamento,
}));

vi.mock("@/lib/auth", () => ({
  obterUsuario: () => ({ id: "usuario-1", nome: "Maria" }),
}));

vi.mock("@/pages/Home", () => ({
  HomeSidebar: ({ usuario, paginaAtiva }) => (
    <aside>
      {usuario.nome}-{paginaAtiva}
    </aside>
  ),
  NotificationsMenu: ({ variant }) => (
    <button type="button">Notificações {variant}</button>
  ),
  NovoLancamentoDialog: ({ aberto, onAbertoChange, onLancamentoCriado }) =>
    aberto ? (
      <section role="dialog">
        <h2>Novo lançamento mockado</h2>
        <button
          type="button"
          onClick={async () => {
            await onLancamentoCriado();
            onAbertoChange(false);
          }}
        >
          Criar lançamento mockado
        </button>
      </section>
    ) : null,
}));

vi.mock("@/components/ui/sidebar", () => ({
  SidebarProvider: ({ children }) => <div>{children}</div>,
  SidebarInset: ({ children, ...props }) => <div {...props}>{children}</div>,
  SidebarTrigger: (props) => <button type="button" {...props}>Menu</button>,
}));

vi.mock("@/components/ui/tooltip", () => ({
  TooltipProvider: ({ children }) => <div>{children}</div>,
}));

vi.mock("@/components/ui/scroll-area", () => ({
  ScrollArea: ({ children, ...props }) => <div {...props}>{children}</div>,
  ScrollBar: (props) => <div data-testid="scrollbar" {...props} />,
}));

vi.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children, open }) => (open ? <div>{children}</div> : null),
  DialogContent: ({ children, ...props }) => <div role="dialog" {...props}>{children}</div>,
  DialogDescription: ({ children }) => <p>{children}</p>,
  DialogTitle: ({ children, asChild }) => (asChild ? children : <h2>{children}</h2>),
}));

vi.mock("@/components/ui/alert-dialog", () => ({
  AlertDialog: ({ children }) => <div>{children}</div>,
  AlertDialogAction: ({ children, ...props }) => <button {...props}>{children}</button>,
  AlertDialogCancel: ({ children, ...props }) => <button {...props}>{children}</button>,
  AlertDialogContent: ({ children }) => <div role="alertdialog">{children}</div>,
  AlertDialogDescription: ({ children }) => <p>{children}</p>,
  AlertDialogFooter: ({ children }) => <footer>{children}</footer>,
  AlertDialogHeader: ({ children }) => <header>{children}</header>,
  AlertDialogTitle: ({ children }) => <h2>{children}</h2>,
  AlertDialogTrigger: ({ children }) => children,
}));

const SelectContext = React.createContext({ onValueChange: () => {}, value: "" });

vi.mock("@/components/ui/select", async () => {
  const ReactActual = await vi.importActual("react");

  return {
    Select: ({ children, value, onValueChange = () => {}, disabled }) => (
      <SelectContext.Provider value={{ value, onValueChange, disabled }}>
        <div data-testid="select" data-value={value} aria-disabled={disabled}>
          {children}
        </div>
      </SelectContext.Provider>
    ),
    SelectContent: ({ children }) => <div>{children}</div>,
    SelectItem: ({ children, value, disabled }) => {
      const contexto = ReactActual.useContext(SelectContext);

      return (
        <button
          type="button"
          disabled={disabled || contexto.disabled}
          aria-pressed={contexto.value === value}
          onClick={() => contexto.onValueChange(value)}
        >
          {children}
        </button>
      );
    },
    SelectTrigger: ({ children, ...props }) => <div {...props}>{children}</div>,
    SelectValue: ({ placeholder }) => <span>{placeholder}</span>,
  };
});

import Transacoes from "../src/pages/Transacoes";

const contas = [
  { id: "conta-1", nome: "Nubank", ativa: true },
  { id: "conta-2", nome: "Banco velho", ativa: false },
];

const categorias = [
  { id: "cat-despesa", nome: "Mercado", tipo: "DESPESA" },
  { id: "cat-receita", nome: "Salário", tipo: "RECEITA" },
];

const lancamentos = [
  {
    id: "l1",
    tipo: "DESPESA",
    valor: 120,
    dataTransacao: "2026-05-10T00:00:00.000Z",
    idCategoria: "cat-despesa",
    idConta: "conta-1",
    categoria: { id: "cat-despesa", nome: "Mercado" },
    conta: { id: "conta-1", nome: "Nubank", ativa: true },
    recorrencia: "NENHUMA",
    descricao: "Compra semanal",
    criadoEm: "2026-05-10T10:00:00.000Z",
    atualizadoEm: "2026-05-11T10:00:00.000Z",
  },
  {
    id: "l2",
    tipo: "RECEITA",
    valor: 3000,
    dataTransacao: "2026-05-01T00:00:00.000Z",
    nomeCategoria: "Salário",
    nomeConta: "Sem conta",
    recorrencia: "MENSAL",
    descricao: "Pagamento",
  },
  {
    id: "l3",
    tipo: "DESPESA",
    valor: 50,
    dataTransacao: "2026-04-20T00:00:00.000Z",
    categoria: { id: "cat-despesa", nome: "Mercado" },
    conta: { id: "conta-2", nome: "Banco velho", ativa: false },
    recorrencia: "NENHUMA",
    descricao: "",
  },
];

function renderTransacoes(initialEntry = "/transacoes") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Transacoes />
    </MemoryRouter>,
  );
}

describe("Transacoes page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockApi.listarContas.mockResolvedValue(contas);
    mockApi.listarCategorias.mockResolvedValue(categorias);
    mockApi.listarLancamentos.mockResolvedValue(lancamentos);
    mockApi.editarLancamento.mockResolvedValue({
      ...lancamentos[0],
      valor: 200,
    });
    mockApi.removerLancamento.mockResolvedValue({});
    mockApi.cadastrarOrcamento.mockResolvedValue({ id: "orc-1" });
  });

  it("deve carregar transações, aplicar filtros, limpar query e abrir modal de novo lançamento", async () => {
    const user = userEvent.setup();
    renderTransacoes("/transacoes?categoriaId=cat-despesa");

    expect(screen.getByText("Carregando lançamentos...")).toBeInTheDocument();
    expect(await screen.findByText("Mercado")).toBeInTheDocument();
    expect(mockApi.listarLancamentos).toHaveBeenCalledWith({
      semConta: undefined,
      idCategoria: "cat-despesa",
    });

    await user.type(screen.getByPlaceholderText("Buscar na listagem"), "salário");
    expect(screen.getByText("Salário")).toBeInTheDocument();
    expect(screen.queryByText("Compra semanal")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Limpar filtros" }));
    await waitFor(() => {
      expect(mockApi.listarLancamentos).toHaveBeenLastCalledWith({
        semConta: undefined,
        idCategoria: undefined,
      });
    });

    await user.click(screen.getByRole("button", { name: "Sem conta" }));
    await waitFor(() => {
      expect(mockApi.listarLancamentos).toHaveBeenLastCalledWith({
        semConta: true,
        idCategoria: undefined,
      });
    });

    await user.click(screen.getByRole("button", { name: "Conta desativada" }));
    expect(await screen.findByText("Banco velho (desativada)")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Novo Lançamento" }));
    expect(screen.getByText("Novo lançamento mockado")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Criar lançamento mockado" }));
    await waitFor(() => {
      expect(mockApi.listarLancamentos).toHaveBeenCalled();
    });
  });

  it("deve selecionar e remover transações individualmente e em lote", async () => {
    const user = userEvent.setup();
    renderTransacoes();

    await screen.findByText("Mercado");

    await user.click(screen.getByLabelText("Selecionar transação D02"));
    expect(screen.getByText(/1 de 3 transações selecionada/)).toBeInTheDocument();

    const linhaMercado = screen.getByText("D02").closest("tr");
    await user.click(within(linhaMercado).getByRole("button", { name: "Remover" }));

    await waitFor(() => {
      expect(mockApi.removerLancamento).toHaveBeenCalledWith("l1");
    });
    expect(await screen.findByText("Transação removida com sucesso.")).toBeInTheDocument();

    await user.click(screen.getByLabelText("Selecionar todas as transações"));
    await user.click(screen.getAllByRole("button", { name: "Remover" })[0]);

    await waitFor(() => {
      expect(mockApi.removerLancamento).toHaveBeenCalledWith("l2");
      expect(mockApi.removerLancamento).toHaveBeenCalledWith("l3");
    });
    expect(await screen.findByText("Transações removidas com sucesso.")).toBeInTheDocument();
  });

  it("deve abrir detalhes, editar lançamento, tratar erro e excluir pelo modal", async () => {
    const user = userEvent.setup();
    renderTransacoes();

    await screen.findByText("Mercado");
    await user.click(screen.getAllByRole("button", { name: "Detalhes" })[0]);
    expect(screen.getByRole("dialog")).toHaveTextContent("Detalhes da transação");
    expect(await screen.findByText("Atualizado em")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Editar" }));
    await screen.findByLabelText("Valor");
    await user.click(screen.getByRole("button", { name: "Salvar alterações" }));

    await waitFor(() => {
      expect(mockApi.editarLancamento).toHaveBeenCalledWith(
        "l1",
        expect.objectContaining({
          idCategoria: "cat-despesa",
          idConta: "conta-1",
          valor: 120,
          tipo: "DESPESA",
        }),
      );
    });
    expect(await screen.findByText("Transação atualizada com sucesso.")).toBeInTheDocument();

    await user.click(screen.getAllByRole("button", { name: "Detalhes" })[0]);
    await user.click(screen.getByRole("button", { name: "Editar" }));
    mockApi.editarLancamento.mockRejectedValueOnce(new Error("falha editar"));
    await user.click(screen.getByRole("button", { name: "Salvar alterações" }));
    expect(await screen.findByText("falha editar")).toBeInTheDocument();

    mockApi.removerLancamento.mockRejectedValueOnce(new Error("falha excluir"));
    await user.click(screen.getAllByRole("button", { name: "Remover" }).at(-1));
    expect(await screen.findByText("falha excluir")).toBeInTheDocument();
  });

  it("deve validar e cadastrar orçamento pelo modal", async () => {
    const user = userEvent.setup();
    renderTransacoes();

    await screen.findByText("Mercado");
    await user.click(screen.getByRole("button", { name: "Definir orçamento" }));
    expect(screen.getByRole("dialog")).toHaveTextContent("Definir orçamento");

    await user.click(screen.getByRole("button", { name: "Salvar orçamento" }));
    expect(await screen.findByText("Informe um valor maior que zero.")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Valor"), "10000");
    await user.click(screen.getByRole("button", { name: "Mercado" }));
    await user.click(screen.getByRole("button", { name: "Salvar orçamento" }));

    await waitFor(() => {
      expect(mockApi.cadastrarOrcamento).toHaveBeenCalledWith(
        expect.objectContaining({
          valor: 100,
          idCategoria: "cat-despesa",
        }),
      );
    });
    expect(await screen.findByText("Orçamento cadastrado com sucesso.")).toBeInTheDocument();
  });

  it("deve exibir erros de metadados, listagem, remoção individual e lote", async () => {
    const user = userEvent.setup();
    mockApi.listarContas.mockRejectedValueOnce(new Error("falha contas"));
    mockApi.listarLancamentos.mockRejectedValueOnce(new Error("falha lançamentos"));

    renderTransacoes();

    expect(await screen.findByText("falha lançamentos")).toBeInTheDocument();

    mockApi.listarLancamentos.mockResolvedValue(lancamentos);
    await user.click(screen.getByRole("button", { name: "Limpar filtros" }));
    await screen.findByText("Mercado");

    mockApi.removerLancamento.mockRejectedValueOnce(new Error("falha remover"));
    await user.click(screen.getByLabelText("Selecionar transação D02"));
    const linhaMercado = screen.getByText("D02").closest("tr");
    await user.click(within(linhaMercado).getByRole("button", { name: "Remover" }));
    expect(await screen.findByText("falha remover")).toBeInTheDocument();

    mockApi.removerLancamento.mockRejectedValueOnce(new Error("falha lote"));
    await user.click(screen.getByLabelText("Selecionar todas as transações"));
    await user.click(screen.getAllByRole("button", { name: "Remover" })[0]);
    expect(await screen.findByText("falha lote")).toBeInTheDocument();
  });
});
