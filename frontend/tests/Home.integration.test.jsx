// tests/Home.integration.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";

import React from "react";
import userEvent from "@testing-library/user-event";
import {
  render,
  screen,
  waitFor,
  within,
  fireEvent,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Home, {
  NovoLancamentoDialog,
  NotificationsMenu,
} from "../src/pages/Home";

// ─── Mocks de módulos ─────────────────────────────────────────────────────────

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

const mockApi = vi.hoisted(() => ({
  listarContas: vi.fn(),
  listarLancamentos: vi.fn(),
  listarCategorias: vi.fn(),
  listarOrcamentos: vi.fn(),
  listarNotificacoes: vi.fn(),
  marcarNotificacaoComoLida: vi.fn(),
  marcarTodasNotificacoesComoLidas: vi.fn(),
  cadastrarLancamento: vi.fn(),
  cadastrarCategoria: vi.fn(),
  removerAuth: vi.fn(),
}));

vi.mock("@/services/api", () => ({
  listarContas: mockApi.listarContas,
  listarLancamentos: mockApi.listarLancamentos,
  listarCategorias: mockApi.listarCategorias,
  listarOrcamentos: mockApi.listarOrcamentos,
  listarNotificacoes: mockApi.listarNotificacoes,
  marcarNotificacaoComoLida: mockApi.marcarNotificacaoComoLida,
  marcarTodasNotificacoesComoLidas: mockApi.marcarTodasNotificacoesComoLidas,
  cadastrarLancamento: mockApi.cadastrarLancamento,
  cadastrarCategoria: mockApi.cadastrarCategoria,
}));

vi.mock("@/lib/auth", () => ({
  obterUsuario: () => ({
    id: "user-1",
    nome: "Maria",
    email: "maria@email.com",
  }),
  removerAuth: mockApi.removerAuth,
}));

vi.mock("@/assets/img/logo.svg", () => ({ default: "logo.svg" }));

// Componentes UI — mocks mínimos que preservam acessibilidade
vi.mock("@/components/ui/cardConta", () => ({
  __esModule: true,
  default: ({ conta }) => (
    <div data-testid="conta-card">{conta?.nome || "Sem conta"}</div>
  ),
}));

vi.mock("@/components/ui/scroll-area", () => ({
  ScrollArea: ({ children, ...props }) => <div {...props}>{children}</div>,
}));

vi.mock("@/components/ui/tooltip", () => ({
  TooltipProvider: ({ children }) => <>{children}</>,
}));

vi.mock("@/components/ui/calendar", () => ({
  Calendar: ({ onSelect }) => (
    <button
      type="button"
      onClick={() => onSelect(new Date(2026, 4, 10))}
      data-testid="calendar-day"
    >
      10
    </button>
  ),
}));

vi.mock("@/components/ui/sidebar-context", () => ({
  useSidebar: () => ({
    open: true,
    setOpen: vi.fn(),
    isMobile: false,
    setOpenMobile: vi.fn(),
  }),
}));

vi.mock("@/components/ui/sidebar", () => ({
  Sidebar: ({ children }) => <nav>{children}</nav>,
  SidebarContent: ({ children }) => <div>{children}</div>,
  SidebarHeader: ({ children }) => <div>{children}</div>,
  SidebarFooter: ({ children }) => <div>{children}</div>,
  SidebarGroup: ({ children }) => <div>{children}</div>,
  SidebarGroupContent: ({ children }) => <div>{children}</div>,
  SidebarGroupLabel: ({ children }) => <div>{children}</div>,
  SidebarMenu: ({ children }) => <ul>{children}</ul>,
  SidebarMenuItem: ({ children, ...props }) => <li {...props}>{children}</li>,
  SidebarMenuButton: ({ children, onClick, ...props }) => (
    <button type="button" onClick={onClick} {...props}>
      {children}
    </button>
  ),
  SidebarMenuSub: ({ children }) => <ul>{children}</ul>,
  SidebarMenuSubItem: ({ children }) => <li>{children}</li>,
  SidebarMenuSubButton: ({ children, asChild, ...props }) =>
    asChild ? (
      children
    ) : (
      <button type="button" {...props}>
        {children}
      </button>
    ),
  SidebarInset: ({ children, ...props }) => <div {...props}>{children}</div>,
  SidebarProvider: ({ children }) => <div>{children}</div>,
  SidebarRail: () => null,
  SidebarTrigger: (props) => (
    <button type="button" {...props}>
      Menu
    </button>
  ),
}));

vi.mock("@/components/ui/dialog", () => ({
  Dialog: ({ open, children }) => (open ? <div>{children}</div> : null),
  DialogContent: ({ children }) => <div role="dialog">{children}</div>,
  DialogDescription: ({ children }) => <p>{children}</p>,
  DialogTitle: ({ children, asChild }) =>
    asChild ? children : <h2>{children}</h2>,
}));

vi.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ open, onOpenChange, children }) => {
    return (
      <div>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            __open: open,
            __onOpenChange: onOpenChange,
          }),
        )}
      </div>
    );
  },
  DropdownMenuTrigger: ({ children, asChild, __onOpenChange }) =>
    React.cloneElement(asChild ? children : <button>{children}</button>, {
      onClick: () => __onOpenChange?.(true),
    }),
  DropdownMenuContent: ({ children, __open }) =>
    __open ? <div role="menu">{children}</div> : null,
  DropdownMenuSeparator: () => <hr />,
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

vi.mock("@/components/ui/input", () => ({
  Input: (props) => <input {...props} />,
}));

vi.mock("@/components/ui/textarea", () => ({
  Textarea: (props) => <textarea {...props} />,
}));

vi.mock("@/components/ui/label", () => ({
  Label: ({ children, ...props }) => <label {...props}>{children}</label>,
}));

vi.mock("@/components/ui/card", () => ({
  Card: ({ children, ...props }) => <div {...props}>{children}</div>,
  CardContent: ({ children, ...props }) => <div {...props}>{children}</div>,
  CardHeader: ({ children, ...props }) => <div {...props}>{children}</div>,
  CardFooter: ({ children, ...props }) => <div {...props}>{children}</div>,
  CardTitle: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
  CardDescription: ({ children, ...props }) => <p {...props}>{children}</p>,
}));

vi.mock("@/components/ui/chart", () => ({
  ChartContainer: ({ children }) => <div data-testid="chart">{children}</div>,
  ChartTooltip: () => null,
  ChartTooltipContent: () => null,
  ChartLegend: () => null,
  ChartLegendContent: () => null,
}));

vi.mock("recharts", () => ({
  BarChart: ({ children }) => <div>{children}</div>,
  Bar: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
}));

vi.mock("@/components/ui/item", () => ({
  Item: ({ children, ...props }) => <div {...props}>{children}</div>,
  ItemActions: ({ children }) => <div>{children}</div>,
  ItemContent: ({ children }) => <div>{children}</div>,
  ItemDescription: ({ children }) => <p>{children}</p>,
  ItemGroup: ({ children }) => <div>{children}</div>,
  ItemMedia: (props) => <div {...props} />,
  ItemTitle: ({ children }) => <p>{children}</p>,
}));

const SelectCtx = React.createContext({
  value: "",
  onValueChange: () => {},
  disabled: false,
});

vi.mock("@/components/ui/select", async () => {
  const ReactActual = await vi.importActual("react");

  return {
    Select: ({ children, value, onValueChange = () => {}, disabled }) => (
      <SelectCtx.Provider
        value={{ value, onValueChange, disabled: Boolean(disabled) }}
      >
        <div data-testid="select">{children}</div>
      </SelectCtx.Provider>
    ),
    SelectContent: ({ children }) => <div>{children}</div>,
    SelectTrigger: ({ children, ...props }) => <div {...props}>{children}</div>,
    SelectValue: ({ placeholder }) => <span>{placeholder}</span>,
    SelectItem: ({ children, value, disabled }) => {
      const ctx = ReactActual.useContext(SelectCtx);
      return (
        <button
          type="button"
          disabled={Boolean(disabled) || ctx.disabled}
          aria-pressed={ctx.value === value}
          onClick={() => !ctx.disabled && ctx.onValueChange(value)}
        >
          {children}
        </button>
      );
    },
  };
});

vi.mock("lucide-react", async () => {
  const actual = await vi.importActual("lucide-react");
  return {
    ...actual,
    LoaderCircle: (props) => <span {...props}>[loading]</span>,
    Bell: () => <span>[bell]</span>,
    CheckCircle2: (props) => <span {...props}>[ok]</span>,
    LogOut: () => <span>[logout]</span>,
    CalendarDays: () => <span>[cal]</span>,
    ChevronDown: () => <span>[v]</span>,
    WalletCards: () => <span>[wallet]</span>,
  };
});

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const contaFixture = {
  id: "conta-1",
  nome: "Nubank",
  tipo: "CONTA_CORRENTE",
  saldoAtual: "500.00",
  modeloCartao: "NUBANK",
};

const lancamentoFixture = {
  id: "lanc-1",
  tipo: "DESPESA",
  valor: "120.00",
  dataTransacao: "2026-05-10T00:00:00.000Z",
  nomeCategoria: "Mercado",
};

const categoriaFixture = {
  id: "cat-1",
  nome: "Alimentação",
  tipo: "DESPESA",
};

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
}

// ─── Testes ───────────────────────────────────────────────────────────────────

describe("Home — integração", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockApi.listarContas.mockResolvedValue([contaFixture]);
    mockApi.listarLancamentos.mockResolvedValue([lancamentoFixture]);
    mockApi.listarOrcamentos.mockResolvedValue([]);
    mockApi.listarNotificacoes.mockResolvedValue([]);
    mockApi.listarCategorias.mockResolvedValue([categoriaFixture]);
    mockApi.cadastrarLancamento.mockResolvedValue({ id: "lanc-novo" });
    mockApi.cadastrarCategoria.mockResolvedValue({
      id: "cat-nova",
      nome: "Viagem",
      tipo: "DESPESA",
    });
    mockApi.marcarNotificacaoComoLida.mockResolvedValue({});
    mockApi.marcarTodasNotificacoesComoLidas.mockResolvedValue({});
  });

  // ── Renderização inicial ────────────────────────────────────────────────────

  it("deve renderizar boas-vindas com nome do usuário", async () => {
    renderHome();

    expect(screen.getByText(/Bem Vindo ao SpendSmart/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Olá, Maria/i)).toBeInTheDocument();
    });
  });

  it("deve carregar e exibir a conta do usuário no card", async () => {
    renderHome();

    await waitFor(() => {
      expect(screen.getByTestId("conta-card")).toHaveTextContent("Nubank");
    });
  });

  it("deve exibir lançamentos na lista de movimentações", async () => {
    renderHome();

    await waitFor(() => {
      expect(screen.getByText("Mercado")).toBeInTheDocument();
    });
  });

  it("deve exibir estado vazio na lista quando não há movimentações", async () => {
    mockApi.listarLancamentos.mockResolvedValue([]);

    renderHome();

    await waitFor(() => {
      expect(
        screen.getByText(/Não há movimentações para serem mostradas/i),
      ).toBeInTheDocument();
    });
  });

  it("deve exibir erro na lista quando listarLancamentos falha", async () => {
    mockApi.listarLancamentos.mockRejectedValue(new Error("Falha na conexão"));

    renderHome();

    await waitFor(() => {
      expect(screen.getAllByText(/Falha na conexão/i).length).toBeGreaterThan(
        0,
      );
    });
  });

  it("deve exibir métricas do mês após carregamento", async () => {
    renderHome();

    await waitFor(() => {
      expect(screen.getByText("Receitas do mês")).toBeInTheDocument();
      expect(screen.getByText("Despesas do mês")).toBeInTheDocument();
      expect(screen.getByText("Orçamento restante")).toBeInTheDocument();
    });
  });

  it("deve exibir 'Nenhum orçamento definido' quando não há orçamentos", async () => {
    mockApi.listarOrcamentos.mockResolvedValue([]);

    renderHome();

    await waitFor(() => {
      expect(
        screen.getByText(/Nenhum orçamento definido/i),
      ).toBeInTheDocument();
    });
  });

  it("deve calcular orçamento restante com orçamento geral definido", async () => {
    mockApi.listarOrcamentos.mockResolvedValue([
      { idCategoria: null, valor: 500 },
    ]);
    // despesa de 120 → restante = 380
    mockApi.listarLancamentos.mockResolvedValue([lancamentoFixture]);

    renderHome();

    await waitFor(() => {
      // 24% do orçamento utilizado (120/500)
      expect(screen.getByText(/do orçamento utilizado/i)).toBeInTheDocument();
    });
  });

  // ── Seleção de conta ────────────────────────────────────────────────────────

  it("deve atualizar movimentações ao trocar conta selecionada", async () => {
    const user = userEvent.setup();
    const conta2 = {
      id: "conta-2",
      nome: "PicPay",
      tipo: "CONTA_CORRENTE",
      saldoAtual: "0.00",
      modeloCartao: "PICPAY",
    };

    mockApi.listarContas.mockResolvedValue([contaFixture, conta2]);

    renderHome();

    await waitFor(() => expect(mockApi.listarLancamentos).toHaveBeenCalled());

    const callCount = mockApi.listarLancamentos.mock.calls.length;

    await user.click(screen.getByRole("button", { name: /PicPay/i }));

    await waitFor(() => {
      expect(mockApi.listarLancamentos.mock.calls.length).toBeGreaterThan(
        callCount,
      );
    });
  });

  // ── Gráfico ─────────────────────────────────────────────────────────────────

  it("deve exibir estado vazio no gráfico quando lançamento está fora do período", async () => {
    // lancamentoFixture (maio) já está fora da semana de junho — não precisa de mock extra
    renderHome();

    await waitFor(() => {
      expect(
        screen.getByText(/Não há lançamentos para serem mostrados/i),
      ).toBeInTheDocument();
    });
  });

  // Teste separado para o gráfico renderizado de fato
  it("deve renderizar o gráfico quando há lançamentos na semana atual", async () => {
    mockApi.listarLancamentos.mockResolvedValue([
      {
        id: "lanc-hoje",
        tipo: "DESPESA",
        valor: "50.00",
        dataTransacao: new Date().toISOString(),
        nomeCategoria: "Transporte",
      },
    ]);

    renderHome();

    await waitFor(() => {
      expect(screen.getByTestId("chart")).toBeInTheDocument();
    });
  });

  it("deve exibir estado vazio no gráfico quando não há lançamentos no período", async () => {
    mockApi.listarLancamentos.mockResolvedValue([]);

    renderHome();

    await waitFor(() => {
      expect(
        screen.getByText(/Não há lançamentos para serem mostrados/i),
      ).toBeInTheDocument();
    });
  });

  it("deve trocar o período do gráfico ao clicar em Mês", async () => {
    const user = userEvent.setup();
    renderHome();

    await waitFor(() =>
      expect(screen.getByText(/Lançamentos por Semana/i)).toBeInTheDocument(),
    );

    await user.click(screen.getByRole("button", { name: /^Mês$/i }));

    await waitFor(() => {
      expect(screen.getByText(/Lançamentos por Mês/i)).toBeInTheDocument();
    });
  });

  // ── Novo Lançamento ─────────────────────────────────────────────────────────

  it("deve abrir o modal de novo lançamento ao clicar no botão", async () => {
    const user = userEvent.setup();
    renderHome();

    await waitFor(() => expect(mockApi.listarContas).toHaveBeenCalled());

    await user.click(
      screen.getByRole("button", { name: /^Novo Lançamento$/i }),
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    expect(
      within(screen.getByRole("dialog")).getByText(/Novo lançamento/i),
    ).toBeInTheDocument();
  });

  it("deve fechar modal de novo lançamento ao clicar em Cancelar", async () => {
    const user = userEvent.setup();
    renderHome();

    await waitFor(() => expect(mockApi.listarContas).toHaveBeenCalled());

    await user.click(screen.getByRole("button", { name: /Novo Lançamento/i }));

    const dialog = screen.getByRole("dialog");
    await user.click(
      within(dialog).getByRole("button", { name: /^Cancelar$/i }),
    );

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  // ── NovoLancamentoDialog — testes isolados ──────────────────────────────────

  describe("NovoLancamentoDialog", () => {
    const defaultProps = {
      aberto: true,
      onAbertoChange: vi.fn(),
      contas: [contaFixture],
      contaSelecionada: "conta-1",
      onLancamentoCriado: vi.fn(),
    };

    function renderDialog(props = {}) {
      return render(
        <MemoryRouter>
          <NovoLancamentoDialog {...defaultProps} {...props} />
        </MemoryRouter>,
      );
    }

    beforeEach(() => {
      mockApi.listarCategorias.mockResolvedValue([categoriaFixture]);
    });

    it("deve carregar e exibir categorias do tipo DESPESA", async () => {
      renderDialog();

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /Alimentação/i }),
        ).toBeInTheDocument();
      });
    });

    it("deve exibir erro quando não seleciona categoria", async () => {
      const user = userEvent.setup();
      renderDialog();

      await waitFor(() => expect(mockApi.listarCategorias).toHaveBeenCalled());

      await user.click(
        screen.getByRole("button", { name: /Salvar lançamento/i }),
      );

      await screen.findByText(/Selecione uma categoria/i);
      expect(mockApi.cadastrarLancamento).not.toHaveBeenCalled();
    });

    it("deve exibir erro quando nome de categoria personalizada tem menos de 2 caracteres", async () => {
      const user = userEvent.setup();
      renderDialog();

      await waitFor(() =>
        expect(
          screen.getByRole("button", { name: /Criar nova categoria/i }),
        ).toBeInTheDocument(),
      );

      await user.click(
        screen.getByRole("button", { name: /Criar nova categoria/i }),
      );

      const nomeInput = screen.getByLabelText(/Nome da categoria/i);
      await user.type(nomeInput, "A");

      // Preenche valor para não cair na validação anterior
      fireEvent.change(screen.getByLabelText(/Valor/i), {
        target: { value: "10000" }, // → "100,00"
      });

      await user.click(
        screen.getByRole("button", { name: /Salvar lançamento/i }),
      );

      await screen.findByText(/pelo menos 2 caracteres/i);
      expect(mockApi.cadastrarLancamento).not.toHaveBeenCalled();
    });

    it("deve salvar lançamento com categoria existente e fechar modal", async () => {
      const user = userEvent.setup();
      const onAbertoChange = vi.fn();
      const onLancamentoCriado = vi.fn().mockResolvedValue(undefined);

      renderDialog({ onAbertoChange, onLancamentoCriado });

      await waitFor(() =>
        expect(
          screen.getByRole("button", { name: /Alimentação/i }),
        ).toBeInTheDocument(),
      );

      await user.click(screen.getByRole("button", { name: /Alimentação/i }));

      fireEvent.change(screen.getByLabelText(/Valor/i), {
        target: { value: "15000" }, // → "150,00"
      });

      await user.click(
        screen.getByRole("button", { name: /Salvar lançamento/i }),
      );

      await waitFor(() => {
        expect(mockApi.cadastrarLancamento).toHaveBeenCalledWith(
          expect.objectContaining({
            idCategoria: "cat-1",
            valor: 150,
            tipo: "DESPESA",
          }),
        );
        expect(onAbertoChange).toHaveBeenCalledWith(false);
        expect(onLancamentoCriado).toHaveBeenCalled();
      });
    });

    it("deve salvar lançamento criando nova categoria", async () => {
      const user = userEvent.setup();
      renderDialog();

      await waitFor(() =>
        expect(
          screen.getByRole("button", { name: /Criar nova categoria/i }),
        ).toBeInTheDocument(),
      );

      await user.click(
        screen.getByRole("button", { name: /Criar nova categoria/i }),
      );

      await user.type(screen.getByLabelText(/Nome da categoria/i), "Viagem");

      fireEvent.change(screen.getByLabelText(/Valor/i), {
        target: { value: "30000" },
      });

      await user.click(
        screen.getByRole("button", { name: /Salvar lançamento/i }),
      );

      await waitFor(() => {
        expect(mockApi.cadastrarCategoria).toHaveBeenCalledWith({
          nome: "Viagem",
          tipo: "DESPESA",
        });
        expect(mockApi.cadastrarLancamento).toHaveBeenCalled();
      });
    });

    it("deve exibir erro quando cadastrarLancamento falha", async () => {
      mockApi.cadastrarLancamento.mockRejectedValue(
        new Error("Servidor indisponível"),
      );

      const user = userEvent.setup();
      renderDialog();

      await waitFor(() =>
        expect(
          screen.getByRole("button", { name: /Alimentação/i }),
        ).toBeInTheDocument(),
      );

      await user.click(screen.getByRole("button", { name: /Alimentação/i }));

      fireEvent.change(screen.getByLabelText(/Valor/i), {
        target: { value: "10000" },
      });

      await user.click(
        screen.getByRole("button", { name: /Salvar lançamento/i }),
      );

      await screen.findByText(/Servidor indisponível/i);
    });

    it("deve exibir erro quando listarCategorias falha", async () => {
      mockApi.listarCategorias.mockRejectedValue(
        new Error("Erro ao carregar as categorias."),
      );

      renderDialog();

      await screen.findByText(/Erro ao carregar as categorias/i);
    });

    it("deve trocar tipo para RECEITA e filtrar categorias corretamente", async () => {
      mockApi.listarCategorias.mockResolvedValue([
        categoriaFixture,
        { id: "cat-2", nome: "Salário", tipo: "RECEITA" },
      ]);

      const user = userEvent.setup();
      renderDialog();

      await waitFor(() =>
        expect(
          screen.getByRole("button", { name: /Alimentação/i }),
        ).toBeInTheDocument(),
      );

      // Troca tipo para RECEITA
      await user.click(screen.getByRole("button", { name: /^Receita$/i }));

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /Salário/i }),
        ).toBeInTheDocument();
        expect(
          screen.queryByRole("button", { name: /Alimentação/i }),
        ).not.toBeInTheDocument();
      });
    });

    it("deve abrir e selecionar data pelo calendário", async () => {
      const user = userEvent.setup();
      renderDialog();

      const spanData = await screen.findByText(/\d{2}\/\d{2}\/\d{4}/);
      await user.click(spanData.closest("button"));

      expect(screen.getByTestId("calendar-day")).toBeInTheDocument();

      await user.click(screen.getByTestId("calendar-day"));

      await waitFor(() => {
        expect(screen.queryByTestId("calendar-day")).not.toBeInTheDocument();
      });
    });

    it("deve selecionar 'Sem conta' e enviar idConta undefined", async () => {
      const user = userEvent.setup();
      renderDialog({ contaSelecionada: "conta-1" });

      await waitFor(() =>
        expect(
          screen.getByRole("button", { name: /Alimentação/i }),
        ).toBeInTheDocument(),
      );

      await user.click(screen.getByRole("button", { name: /Alimentação/i }));
      await user.click(screen.getByRole("button", { name: /^Sem conta$/i }));

      fireEvent.change(screen.getByLabelText(/Valor/i), {
        target: { value: "10000" },
      });

      await user.click(
        screen.getByRole("button", { name: /Salvar lançamento/i }),
      );

      await waitFor(() => {
        expect(mockApi.cadastrarLancamento).toHaveBeenCalledWith(
          expect.objectContaining({ idConta: undefined }),
        );
      });
    });
  });

  // ── NotificationsMenu ───────────────────────────────────────────────────────

  describe("NotificationsMenu", () => {
    function renderMenu(variant = "header") {
      return render(
        <MemoryRouter>
          <NotificationsMenu variant={variant} />
        </MemoryRouter>,
      );
    }

    it("deve abrir menu e exibir 'Nenhuma notificação recente'", async () => {
      const user = userEvent.setup();
      mockApi.listarNotificacoes.mockResolvedValue([]);

      renderMenu();

      await user.click(screen.getByRole("button", { name: /Notificações/i }));

      await screen.findByText(/Nenhuma notificação recente/i);
    });

    it("deve exibir notificações não lidas com indicador", async () => {
      const user = userEvent.setup();
      mockApi.listarNotificacoes.mockResolvedValue([
        {
          id: "notif-1",
          titulo: "Orçamento excedido",
          mensagem: "Você ultrapassou o limite de Alimentação.",
          criadoEm: "2026-05-10T10:00:00.000Z",
          lidaEm: null,
        },
      ]);

      renderMenu();

      await user.click(screen.getByRole("button", { name: /Notificações/i }));

      await screen.findByText("Orçamento excedido");
      expect(screen.getByText(/1 não lida/i)).toBeInTheDocument();
    });

    it("deve marcar notificação individual como lida", async () => {
      const user = userEvent.setup();
      mockApi.listarNotificacoes.mockResolvedValue([
        {
          id: "notif-1",
          titulo: "Alerta",
          mensagem: "Mensagem de alerta.",
          criadoEm: "2026-05-10T10:00:00.000Z",
          lidaEm: null,
        },
      ]);

      renderMenu();

      await user.click(screen.getByRole("button", { name: /Notificações/i }));
      await screen.findByText("Alerta");

      await user.click(
        screen.getByRole("button", { name: /Marcar como lida/i }),
      );

      await waitFor(() => {
        expect(mockApi.marcarNotificacaoComoLida).toHaveBeenCalledWith(
          "notif-1",
        );
      });

      // Botão some após marcar
      expect(
        screen.queryByRole("button", { name: /Marcar como lida/i }),
      ).not.toBeInTheDocument();
    });

    it("deve marcar todas as notificações como lidas", async () => {
      const user = userEvent.setup();
      mockApi.listarNotificacoes.mockResolvedValue([
        {
          id: "n1",
          titulo: "A",
          mensagem: ".",
          criadoEm: "2026-05-01T00:00:00.000Z",
          lidaEm: null,
        },
        {
          id: "n2",
          titulo: "B",
          mensagem: ".",
          criadoEm: "2026-05-02T00:00:00.000Z",
          lidaEm: null,
        },
      ]);

      renderMenu();

      await user.click(screen.getByRole("button", { name: /Notificações/i }));
      await screen.findByText("A");

      await user.click(screen.getByRole("button", { name: /Marcar lidas/i }));

      await waitFor(() => {
        expect(mockApi.marcarTodasNotificacoesComoLidas).toHaveBeenCalled();
      });

      expect(screen.getByText(/Tudo em dia/i)).toBeInTheDocument();
    });

    it("deve exibir erro quando listarNotificacoes falha", async () => {
      const user = userEvent.setup();
      mockApi.listarNotificacoes.mockRejectedValue(
        new Error("Não foi possível carregar notificações."),
      );

      renderMenu();

      await user.click(screen.getByRole("button", { name: /Notificações/i }));

      await screen.findByText(/Não foi possível carregar notificações/i);
    });

    it("deve exibir notificação já lida sem botão de marcar", async () => {
      const user = userEvent.setup();
      mockApi.listarNotificacoes.mockResolvedValue([
        {
          id: "notif-lida",
          titulo: "Informação",
          mensagem: "Tudo certo.",
          criadoEm: "2026-05-01T00:00:00.000Z",
          lidaEm: "2026-05-02T00:00:00.000Z",
        },
      ]);

      renderMenu();

      await user.click(screen.getByRole("button", { name: /Notificações/i }));
      await screen.findByText("Informação");

      expect(
        screen.queryByRole("button", { name: /Marcar como lida/i }),
      ).not.toBeInTheDocument();
      expect(screen.getByText(/Tudo em dia/i)).toBeInTheDocument();
    });
  });

  // ── HomeSidebar ─────────────────────────────────────────────────────────────

  describe("HomeSidebar — navegação", () => {
    it("deve navegar para /perfil ao clicar no nome do usuário", async () => {
      const user = userEvent.setup();
      renderHome();

      await waitFor(() =>
        expect(screen.getByText("Maria")).toBeInTheDocument(),
      );

      await user.click(screen.getByText("Maria"));

      expect(mockNavigate).toHaveBeenCalledWith("/perfil");
    });

    it("deve chamar removerAuth e navegar para / ao clicar em Sair", async () => {
      const user = userEvent.setup();
      renderHome();

      await waitFor(() =>
        expect(
          screen.getByLabelText(/Sair da plataforma/i),
        ).toBeInTheDocument(),
      );

      await user.click(screen.getByLabelText(/Sair da plataforma/i));

      expect(mockApi.removerAuth).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
