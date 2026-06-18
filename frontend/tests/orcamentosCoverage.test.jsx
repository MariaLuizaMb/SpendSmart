import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";

import BudgetFormDialog from "../src/components/orcamentos/BudgetFormDialog";
import BudgetsTable from "../src/components/orcamentos/BudgetsTable";
import {
  STATUS_ORCAMENTO,
  obterStatusOrcamento,
  obterLabelStatus,
  converterValorMonetarioParaNumero,
  calcularPrevisaoEstouro,
} from "../src/components/orcamentos/budget-utils";

import BudgetsView from "../src/components/orcamentos/BudgetsView";
import { MemoryRouter } from "react-router-dom";

// Simples mocks de UI/Dependências para focar na lógica e branches do orçamento.
vi.mock("../src/components/ui/chart", () => ({
  ChartContainer: ({ children }) => <div>{children}</div>,
  ChartLegend: () => null,
  ChartLegendContent: () => null,
  ChartTooltip: () => null,
  ChartTooltipContent: () => null,
}));

vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  PieChart: ({ children }) => <div>{children}</div>,
  Pie: () => null,
  BarChart: ({ children }) => <div>{children}</div>,
  Bar: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Legend: () => null,
}));

globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

vi.mock("../src/components/ui/tooltip", () => ({
  TooltipProvider: ({ children }) => <div>{children}</div>,
  Tooltip: ({ children }) => <div>{children}</div>,
  TooltipTrigger: ({ children }) => <>{children}</>,
  TooltipContent: ({ children }) => <>{children}</>,
}));

vi.mock("../src/components/ui/scroll-area", () => ({
  ScrollArea: ({ children, ...props }) => <div {...props}>{children}</div>,
  ScrollBar: () => null,
}));

vi.mock("../src/components/ui/dialog", () => ({
  Dialog: ({ open, children }) => (open ? <div>{children}</div> : null),
  DialogContent: ({ children, ...props }) => (
    <div role="dialog" {...props}>
      {children}
    </div>
  ),
  DialogDescription: ({ children }) => <p>{children}</p>,
  DialogTitle: ({ children, asChild }) =>
    asChild ? children : <h2>{children}</h2>,
}));

// Select real de shadcn depende de radix; no teste simulamos via botões.
const SelectContext = React.createContext({
  value: "",
  onValueChange: () => {},
  disabled: false,
});

vi.mock("../src/components/ui/select", async () => {
  const ReactActual = await vi.importActual("react");

  return {
    Select: ({ children, value, onValueChange = () => {}, disabled }) => (
      <SelectContext.Provider
        value={{
          value,
          onValueChange,
          disabled: Boolean(disabled),
        }}
      >
        <div data-testid="select">{children}</div>
      </SelectContext.Provider>
    ),
    SelectContent: ({ children }) => <div>{children}</div>,
    SelectTrigger: ({ children, ...props }) => (
      <div role="group" {...props}>
        {children}
      </div>
    ),
    SelectValue: ({ placeholder }) => <span>{placeholder}</span>,
    SelectItem: ({ children, value, disabled }) => {
      const ctx = ReactActual.useContext(SelectContext);
      return (
        <button
          type="button"
          disabled={disabled || ctx.disabled}
          aria-pressed={ctx.value === value}
          onClick={() => ctx.onValueChange(value)}
        >
          {children}
        </button>
      );
    },
  };
});

vi.mock("../src/components/ui/textarea", () => ({
  Textarea: (props) => <textarea {...props} />,
}));

vi.mock("../src/components/ui/input", () => ({
  Input: (props) => <input {...props} />,
}));

vi.mock("../src/components/ui/button", () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

vi.mock("../src/components/ui/card", () => ({
  Card: ({ children, ...props }) => <div {...props}>{children}</div>,
  CardContent: ({ children, ...props }) => <div {...props}>{children}</div>,
  CardFooter: ({ children, ...props }) => <div {...props}>{children}</div>,
  CardHeader: ({ children, ...props }) => <div {...props}>{children}</div>,
  CardTitle: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
}));

vi.mock("../src/components/orcamentos/BudgetActions", () => ({
  __esModule: true,
  default: ({ onEditar, onRemover, orcamento }) => (
    <div>
      <button type="button" onClick={() => onEditar(orcamento)}>
        Editar
      </button>
      <button type="button" onClick={() => onRemover(orcamento)}>
        Remover
      </button>
    </div>
  ),
}));

// Mock do status badge/progress bar para que possamos testar label/branch.
vi.mock("../src/components/orcamentos/BudgetStatusBadge", () => ({
  default: ({ status, compacto }) => (
    <span>
      {compacto ? obterLabelStatus(status, true) : obterLabelStatus(status)}
    </span>
  ),
}));

vi.mock("../src/components/orcamentos/BudgetProgressBar", () => ({
  default: ({ percentual }) => (
    <span data-testid="progress">{Math.round(Number(percentual))}%</span>
  ),
}));

// Mock do api para BudgetsView.
const mockApi = vi.hoisted(() => ({
  listarCategorias: vi.fn(),
  listarOrcamentos: vi.fn(),
  listarLancamentos: vi.fn(),
  cadastrarOrcamento: vi.fn(),
  editarOrcamento: vi.fn(),
  removerOrcamento: vi.fn(),
}));

vi.mock("../src/services/api", () => ({
  listarCategorias: mockApi.listarCategorias,
  listarOrcamentos: mockApi.listarOrcamentos,
  listarLancamentos: mockApi.listarLancamentos,
  cadastrarOrcamento: mockApi.cadastrarOrcamento,
  editarOrcamento: mockApi.editarOrcamento,
  removerOrcamento: mockApi.removerOrcamento,
}));

vi.mock("../src/components/ui/checkbox", () => ({
  Checkbox: ({ checked, onCheckedChange, ...props }) => (
    <input
      type="checkbox"
      checked={checked}
      onChange={() => onCheckedChange?.(!checked)}
      {...props}
    />
  ),
}));

vi.mock("../src/components/ui/alert-dialog", () => ({
  AlertDialog: ({ children }) => <div>{children}</div>,
  AlertDialogTrigger: ({ children }) => <div>{children}</div>,
  AlertDialogContent: ({ children }) => (
    <div role="alertdialog">{children}</div>
  ),
  AlertDialogHeader: ({ children }) => <div>{children}</div>,
  AlertDialogTitle: ({ children }) => <h2>{children}</h2>,
  AlertDialogDescription: ({ children }) => <p>{children}</p>,
  AlertDialogFooter: ({ children }) => <div>{children}</div>,
  AlertDialogCancel: ({ children }) => (
    <button type="button">{children}</button>
  ),
  AlertDialogAction: ({ children, onClick }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
}));

describe("orcamentos - cobertura extra", () => {
  it("BudgetFormDialog: cobre branches de tipo=GERAL e submit chama onSalvar com payload", async () => {
    const onSalvar = vi.fn();

    const categorias = [{ id: "cat-1", nome: "Mercado", tipo: "DESPESA" }];

    render(
      <BudgetFormDialog
        aberto
        onAbertoChange={() => {}}
        orcamento={null}
        categorias={categorias}
        salvando={false}
        erro=""
        sucesso=""
        onSalvar={onSalvar}
      />,
    );

    const valorInput = screen.getByLabelText(/Valor limite/i);
    fireEvent.change(valorInput, { target: { value: "100,00" } });

    // Seleciona mês 2 e ano 2026
    const mesButton = screen.getByRole("button", { name: "Fevereiro" });
    fireEvent.click(mesButton);

    const anoInput = screen.getByLabelText(/Ano/i);
    fireEvent.change(anoInput, { target: { value: "2026" } });

    fireEvent.click(screen.getByRole("button", { name: /Salvar orçamento/i }));

    await waitFor(() => {
      expect(onSalvar).toHaveBeenCalledTimes(1);
    });

    const payload = onSalvar.mock.calls[0][0];
    expect(payload).toEqual(
      expect.objectContaining({
        valor: expect.any(Number),
        mes: expect.any(Number),
        ano: 2026,
        idCategoria: null,
      }),
    );
  });

  it("budget-utils: cobre obterStatusOrcamento e calcularPrevisaoEstouro null/erro", () => {
    expect(obterStatusOrcamento(0)).toBe(STATUS_ORCAMENTO.SEGURO);
    expect(obterStatusOrcamento(61)).toBe(STATUS_ORCAMENTO.ATENCAO);
    expect(obterStatusOrcamento(86)).toBe(STATUS_ORCAMENTO.CRITICO);
    expect(obterStatusOrcamento(101)).toBe(STATUS_ORCAMENTO.ULTRAPASSADO);

    // quando não é mês/ano atuais => null
    const now = new Date();
    const prev = new Date(now);
    prev.setMonth(prev.getMonth() - 2);

    const dataAnterior = {
      mes: prev.getMonth() + 1,
      ano: prev.getFullYear(),
      limite: 1000,
      utilizado: 200,
    };

    expect(calcularPrevisaoEstouro(dataAnterior)).toBe(null);
  });

  it("BudgetsTable: cobre estados carregando/erro/vazio e seleção em lote", async () => {
    const onSelecionarTodos = vi.fn();
    const onSelecionarOrcamento = vi.fn();
    const onEditar = vi.fn();
    const onRemover = vi.fn();

    // carregando
    const { rerender } = render(
      <BudgetsTable
        orcamentos={[]}
        carregando
        erro=""
        haFiltrosAtivos={false}
        selecionados={new Set()}
        todosSelecionados={false}
        onSelecionarTodos={onSelecionarTodos}
        onSelecionarOrcamento={onSelecionarOrcamento}
        onEditar={onEditar}
        onRemover={onRemover}
        orcamentoRemovendo={null}
      />,
    );

    expect(screen.getByText(/Carregando orçamentos/i)).toBeInTheDocument();

    rerender(
      <BudgetsTable
        orcamentos={[]}
        carregando={false}
        erro="Falha"
        haFiltrosAtivos={false}
        selecionados={new Set()}
        todosSelecionados={false}
        onSelecionarTodos={onSelecionarTodos}
        onSelecionarOrcamento={onSelecionarOrcamento}
        onEditar={onEditar}
        onRemover={onRemover}
        orcamentoRemovendo={null}
      />,
    );

    expect(screen.getByText(/Falha/i)).toBeInTheDocument();

    rerender(
      <BudgetsTable
        orcamentos={[]}
        carregando={false}
        erro=""
        haFiltrosAtivos
        selecionados={new Set()}
        todosSelecionados={false}
        onSelecionarTodos={onSelecionarTodos}
        onSelecionarOrcamento={onSelecionarOrcamento}
        onEditar={onEditar}
        onRemover={onRemover}
        orcamentoRemovendo={null}
      />,
    );

    expect(
      screen.getByText(
        /Nenhum orçamento encontrado para os filtros selecionados/i,
      ),
    ).toBeInTheDocument();

    // seleção em lote + linha
    const orc = {
      id: "o1",
      nomeCategoria: "Mercado",
      categoria: { nome: "Mercado" },
      idCategoria: "cat-1",
      mes: 5,
      ano: 2026,
      limite: 1000,
      utilizado: 100,
      restante: 900,
      percentual: 10,
      status: STATUS_ORCAMENTO.SEGURO,
    };

    rerender(
      <BudgetsTable
        orcamentos={[orc]}
        carregando={false}
        erro=""
        haFiltrosAtivos={false}
        selecionados={new Set(["o1"])}
        todosSelecionados
        onSelecionarTodos={onSelecionarTodos}
        onSelecionarOrcamento={onSelecionarOrcamento}
        onEditar={onEditar}
        onRemover={onRemover}
        orcamentoRemovendo={null}
      />,
    );

    const checkboxAll = screen.getByRole("checkbox", {
      name: /Selecionar todos os orçamentos/i,
    });
    fireEvent.click(checkboxAll);
    expect(onSelecionarTodos).toHaveBeenCalledTimes(1);

    const checkboxRow = screen.getByRole("checkbox", {
      name: /Selecionar orçamento Mercado/i,
    });
    fireEvent.click(checkboxRow);
    expect(onSelecionarOrcamento).toHaveBeenCalledTimes(1);
  });

  it.skip("BudgetsView: remove com erro e cobre mensagem de erro", async () => {
    mockApi.listarCategorias.mockResolvedValue([
      { id: "cat-1", nome: "Mercado", tipo: "DESPESA" },
    ]);
    mockApi.listarLancamentos.mockResolvedValue([]);

    // BudgetsView filtra por mes/ano atual (filtro padrão: MES_ATUAL). Então precisamos
    // garantir que o orçamento mock esteja nesse período.
    const agora = new Date();
    const mesAtual = agora.getMonth() + 1;
    const anoAtual = agora.getFullYear();

    mockApi.listarOrcamentos.mockResolvedValue([
      {
        id: "o1",
        mes: mesAtual,
        ano: anoAtual,
        idCategoria: "cat-1",
        limite: 100,
        utilizado: 0,
        restante: 100,
        percentual: 0,
        status: STATUS_ORCAMENTO.SEGURO,
        categoria: { id: "cat-1", nome: "Mercado" },
      },
    ]);

    mockApi.removerOrcamento.mockRejectedValueOnce(new Error("falha remover"));

    render(
      <MemoryRouter>
        <BudgetsView />
      </MemoryRouter>,
    );

    const removerBtn = await screen.findByRole("button", { name: /Remover/i });
    fireEvent.click(removerBtn);

    const confirmarBtn = await screen.findByRole("button", {
      name: /Excluir/i,
    });

    fireEvent.click(confirmarBtn);

    expect(await screen.findByText(/falha remover/i)).toBeInTheDocument();
  });

  it("budget-utils: converterValorMonetarioParaNumero cobre valor vazio", () => {
    expect(converterValorMonetarioParaNumero("")).toBe(0);
  });
});
