import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockApi = vi.hoisted(() => ({
  cadastrarConta: vi.fn(),
  editarConta: vi.fn(),
  listarContas: vi.fn(),
  listarLancamentos: vi.fn(),
  removerConta: vi.fn(),
}));

vi.mock("@/services/api", () => ({
  cadastrarConta: mockApi.cadastrarConta,
  editarConta: mockApi.editarConta,
  listarContas: mockApi.listarContas,
  listarLancamentos: mockApi.listarLancamentos,
  removerConta: mockApi.removerConta,
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
}));

vi.mock("@/components/ui/cardConta", () => ({
  default: ({ conta }) => {
    // console.log("ContaCard mock render", conta);
    return (
      <section aria-label="Cartão da conta">
        <span>{conta?.nome || "Sem conta"}</span>
        <span>{conta?.saldoAtual ?? conta?.saldoInicial ?? 0}</span>
      </section>
    );
  },
}));

vi.mock("@/components/ui/sidebar", () => ({
  SidebarProvider: ({ children }) => <div>{children}</div>,
  SidebarInset: ({ children, ...props }) => <div {...props}>{children}</div>,
  SidebarTrigger: (props) => (
    <button type="button" {...props}>
      Menu
    </button>
  ),
}));

vi.mock("@/components/ui/tooltip", () => ({
  TooltipProvider: ({ children }) => <div>{children}</div>,
}));

vi.mock("@/components/ui/scroll-area", () => ({
  ScrollArea: ({ children, ...props }) => <div {...props}>{children}</div>,
}));

vi.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children, open }) => (open ? <div>{children}</div> : null),
  DialogContent: ({ children, ...props }) => (
    <div role="dialog" {...props}>
      {children}
    </div>
  ),
  DialogDescription: ({ children }) => <p>{children}</p>,
  DialogTitle: ({ children, asChild }) =>
    asChild ? children : <h2>{children}</h2>,
}));

vi.mock("@/components/ui/alert-dialog", async () => {
  const ReactActual = await vi.importActual("react");
  const AlertDialogContext = ReactActual.createContext({
    open: false,
    setOpen: () => {},
  });

  function useAlertDialog() {
    return ReactActual.useContext(AlertDialogContext);
  }

  return {
    AlertDialog: ({ children }) => {
      const [open, setOpen] = ReactActual.useState(false);

      return (
        <AlertDialogContext.Provider value={{ open, setOpen }}>
          <div>{children}</div>
        </AlertDialogContext.Provider>
      );
    },
    AlertDialogAction: ({ children, onClick, ...props }) => {
      const { setOpen } = useAlertDialog();

      return (
        <button
          {...props}
          onClick={async (event) => {
            await onClick?.(event);
            setOpen(false);
          }}
        >
          {children}
        </button>
      );
    },
    AlertDialogCancel: ({ children, onClick, ...props }) => {
      const { setOpen } = useAlertDialog();

      return (
        <button
          {...props}
          onClick={(event) => {
            onClick?.(event);
            setOpen(false);
          }}
        >
          {children}
        </button>
      );
    },
    AlertDialogContent: ({ children }) => {
      const { open } = useAlertDialog();

      return open ? <div role="alertdialog">{children}</div> : null;
    },
    AlertDialogDescription: ({ children }) => <p>{children}</p>,
    AlertDialogFooter: ({ children }) => <footer>{children}</footer>,
    AlertDialogHeader: ({ children }) => <header>{children}</header>,
    AlertDialogTitle: ({ children }) => <h2>{children}</h2>,
    AlertDialogTrigger: ({ children }) => {
      const { setOpen } = useAlertDialog();

      return ReactActual.cloneElement(children, {
        onClick: (event) => {
          children.props.onClick?.(event);
          setOpen(true);
        },
      });
    },
  };
});

const SelectContext = React.createContext({
  onValueChange: () => {},
  value: "",
});

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

import ContasBancarias from "../src/pages/contasBancarias";

const contas = [
  {
    id: "conta-nubank",
    nome: "Nubank",
    tipo: "CONTA_CORRENTE",
    saldoInicial: 100,
    saldoAtual: 120,
    modeloCartao: "NUBANK",
    descricao: "Conta principal",
  },
  {
    id: "conta-banco-a",
    nome: "Banco A",
    tipo: "POUPANCA",
    saldoInicial: 25,
    saldoAtual: 25,
    modeloCartao: "DEFAULT",
    descricao: "",
  },
];

function renderContas() {
  return render(<ContasBancarias />);
}

describe("ContasBancarias page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockApi.listarContas.mockResolvedValue(contas);
    mockApi.listarLancamentos.mockResolvedValue([
      { id: "l1", dataTransacao: "2026-05-10T00:00:00.000Z" },
    ]);
    mockApi.cadastrarConta.mockResolvedValue({
      id: "conta-inter",
      nome: "Inter",
      tipo: "CONTA_CORRENTE",
      saldoInicial: 0,
      saldoAtual: 0,
      modeloCartao: "DEFAULT",
      descricao: null,
    });
    mockApi.editarConta.mockResolvedValue({
      ...contas[1],
      saldoInicial: 50,
      saldoAtual: 50,
      descricao: "Atualizada",
    });
    mockApi.removerConta.mockResolvedValue({});
  });

  it("deve carregar contas ordenadas e navegar entre elas", async () => {
    const user = userEvent.setup();
    renderContas();

    expect(screen.getByText("Carregando contas...")).toBeInTheDocument();
    expect(await screen.findByText("Banco A")).toBeInTheDocument();
    expect(screen.getByText("Conta 1 de 2")).toBeInTheDocument();
    expect(screen.getByLabelText("Saldo")).toHaveValue("R$ 25,00");

    await user.click(screen.getByRole("button", { name: "Próximo" }));

    expect(screen.getByText("Nubank")).toBeInTheDocument();
    expect(screen.getByText("Conta 2 de 2")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Anterior" }));
    expect(screen.getByText("Banco A")).toBeInTheDocument();
  });

  it("deve abrir detalhes, validar, editar e refletir sucesso", async () => {
    const user = userEvent.setup();
    renderContas();

    await screen.findByText("Banco A");
    await user.click(screen.getByRole("button", { name: "Detalhes" }));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveTextContent("Detalhes da conta");
    expect(
      await within(dialog).findByDisplayValue("10/05/2026"),
    ).toBeInTheDocument();

    await user.click(
      within(dialog).getByRole("button", { name: "Editar informações" }),
    );
    await user.clear(within(dialog).getByLabelText("Nome do banco"));
    await user.type(within(dialog).getByLabelText("Nome do banco"), "A");
    await user.click(
      within(dialog).getByRole("button", { name: "Salvar alterações" }),
    );

    expect(
      await within(dialog).findByText(
        "Informe um nome com pelo menos 2 caracteres.",
      ),
    ).toBeInTheDocument();

    await user.clear(within(dialog).getByLabelText("Nome do banco"));
    await user.type(
      within(dialog).getByLabelText("Nome do banco"),
      "Banco Azul",
    );
    await user.clear(within(dialog).getByLabelText("Saldo"));
    await user.type(within(dialog).getByLabelText("Saldo"), "5000");
    await user.type(within(dialog).getByLabelText("Descrição"), "Atualizada");
    await user.click(
      within(dialog).getByRole("button", { name: "Salvar alterações" }),
    );

    await waitFor(() => {
      expect(mockApi.editarConta).toHaveBeenCalledWith(
        "conta-banco-a",
        expect.objectContaining({
          nome: "Banco Azul",
          saldoInicial: 50,
          descricao: "Atualizada",
        }),
      );
    });
    expect(
      await screen.findByText("Conta bancária atualizada com sucesso."),
    ).toBeInTheDocument();
  });

  it("deve validar e criar conta pelo modal", async () => {
    const user = userEvent.setup();
    renderContas();

    await screen.findByText("Banco A");
    await user.click(screen.getByRole("button", { name: "Criar Nova Conta" }));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveTextContent("Adicionar nova conta");
    await user.click(
      within(dialog).getByRole("button", { name: "Outro banco" }),
    );
    await user.click(
      within(dialog).getByRole("button", { name: "Salvar conta" }),
    );

    expect(
      await within(dialog).findByText(
        "Informe um nome com pelo menos 2 caracteres.",
      ),
    ).toBeInTheDocument();

    await user.type(within(dialog).getByLabelText("Nome do banco"), "Inter");
    await user.click(
      within(dialog).getByRole("button", { name: "Carteira digital" }),
    );
    await user.type(within(dialog).getByLabelText("Descrição"), "Conta nova");
    await user.click(
      within(dialog).getByRole("button", { name: "Salvar conta" }),
    );

    await waitFor(() => {
      expect(mockApi.cadastrarConta).toHaveBeenCalledWith(
        expect.objectContaining({
          nome: "Inter",
          tipo: "CARTEIRA_DIGITAL",
          saldoInicial: 0,
          modeloCartao: "DEFAULT",
          descricao: "Conta nova",
        }),
      );
    });
    expect(
      await screen.findByText("Conta bancária cadastrada com sucesso."),
    ).toBeInTheDocument();
  });

  it("deve desativar conta", async () => {
    const user = userEvent.setup();
    renderContas();

    await screen.findByText("Banco A");
    await user.click(screen.getByRole("button", { name: "Desativar" }));
    const alertDialog = await screen.findByRole("alertdialog");
    await user.click(
      within(alertDialog).getByRole("button", { name: "Desativar" }),
    );

    await waitFor(() => {
      expect(mockApi.removerConta).toHaveBeenCalledWith("conta-banco-a");
    });
    expect(await screen.findByText(/Conta 1 de 1/)).toBeInTheDocument();
    expect(await screen.findByText("Nubank")).toBeInTheDocument();
  });

  it("deve exibir erros de listagem e remoção", async () => {
    mockApi.listarContas.mockRejectedValueOnce(new Error("falha contas"));
    renderContas();
    expect(await screen.findByText("falha contas")).toBeInTheDocument();

    const user = userEvent.setup();
    mockApi.listarContas.mockResolvedValue(contas);
    mockApi.removerConta.mockRejectedValueOnce(new Error("falha remover"));
    renderContas();

    await screen.findByText("Banco A");
    await user.click(screen.getByRole("button", { name: "Desativar" }));
    const alertDialog = await screen.findByRole("alertdialog");
    await user.click(
      within(alertDialog).getByRole("button", { name: "Desativar" }),
    );

    expect(await screen.findByText("falha remover")).toBeInTheDocument();
  });
});
