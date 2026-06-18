import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("recharts", () => {
  const ChartPrimitive = ({ children }) => (
    <div data-testid="chart-primitive">{children}</div>
  );

  return {
    ResponsiveContainer: ({ children }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
    Area: ChartPrimitive,
    AreaChart: ChartPrimitive,
    Bar: ChartPrimitive,
    BarChart: ChartPrimitive,
    CartesianGrid: ChartPrimitive,
    Cell: ChartPrimitive,
    Legend: ChartPrimitive,
    Pie: ChartPrimitive,
    PieChart: ChartPrimitive,
    Tooltip: ChartPrimitive,
    XAxis: ChartPrimitive,
    YAxis: ChartPrimitive,
  };
});

vi.mock("@/lib/auth", () => ({
  obterUsuario: vi.fn(() => ({
    id: "u1",
    nome: "Maria",
    email: "maria@email.com",
  })),
  removerAuth: vi.fn(),
}));

vi.mock("@/services/api", () => ({
  buscarAnalisePreditiva: vi.fn(),
  cadastrarCategoria: vi.fn(),
  cadastrarLancamento: vi.fn(),
  listarCategorias: vi.fn(),
  listarContas: vi.fn(),
  listarLancamentos: vi.fn(),
  listarOrcamentos: vi.fn(),
}));

import Dashboard from "../src/pages/Dashboard";
import {
  buscarAnalisePreditiva,
  listarContas,
  listarLancamentos,
} from "@/services/api";

// evita warning e torna determinístico em testes
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

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

const analise = {
  resumo: {
    receitaProjetada: 3000,
    despesaProjetada: 1500,
    percentualComprometimentoRenda: 50,
  },
  projecoes: {
    receitaProjetada: 3000,
    despesaProjetada: 1500,
    saldoProjetado: 2500,
  },
  saldo: {
    saldoAtual: 1000,
  },
  orcamento: {
    percentualProjetado: 75,
    limiteMensal: 2000,
    mensagem: "Dentro do orçamento.",
  },
  categorias: [
    {
      idCategoria: "cat-1",
      nome: "Mercado",
      total: 700,
      percentual: 70,
      risco: "MEDIO",
    },
  ],
  tendencias: {
    tendenciaReceitas: {
      direcao: "AUMENTO",
      percentual: 10,
      descricao: "Receitas em alta.",
    },
    tendenciaDespesas: {
      direcao: "ESTABILIDADE",
      percentual: 2,
      descricao: "Despesas estáveis.",
    },
    tendenciaSaldo: {
      direcao: "MELHORA",
      percentual: 8,
      descricao: "Saldo melhorando.",
    },
    tendenciaGeral: {
      direcao: "MELHORA",
      percentual: 7,
      descricao: "Cenário positivo.",
    },
  },
  alertas: [
    {
      tipo: "CATEGORIA_PROXIMA_LIMITE",
      severidade: "MEDIA",
      descricao: "Mercado próximo do limite.",
    },
  ],
  historico: {
    meses: [
      { mes: "2026-04", receitas: 2800, despesas: 1200 },
      { mes: "2026-05", receitas: 3000, despesas: 1500 },
    ],
  },
  insights: {},
  confiabilidade: { qualidadeDosDados: "ALTA" },
};

const lancamentos = [
  {
    id: "l1",
    tipo: "DESPESA",
    valor: 120,
    dataTransacao: "2026-05-10T00:00:00.000Z",
    categoria: { nome: "Mercado" },
  },
];

function renderDashboard() {
  return render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>,
  );
}

describe("Dashboard page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    buscarAnalisePreditiva.mockResolvedValue(analise);
    listarLancamentos.mockResolvedValue(lancamentos);
    listarContas.mockResolvedValue([{ id: "conta-1", nome: "Nubank" }]);
  });

  it("deve carregar análise, lançamentos e contas do período atual", async () => {
    const hoje = new Date();

    renderDashboard();

    // O título do Dashboard atual é "Análises Financeiras"
    expect(
      screen.getByRole("heading", { name: /Análises Financeiras/i }),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(buscarAnalisePreditiva).toHaveBeenCalledWith({
        mes: String(hoje.getMonth() + 1),
        ano: String(hoje.getFullYear()),
      });
      expect(listarLancamentos).toHaveBeenCalledWith({ limite: 80 });
      expect(listarContas).toHaveBeenCalled();
    });

    expect(screen.getByText("Saldo Total das Contas")).toBeInTheDocument();
    expect(screen.getByText("Projeção de Despesas")).toBeInTheDocument();
    expect(screen.getByText("Ranking de categorias")).toBeInTheDocument();
    expect(screen.getAllByText("Mercado").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Transações").length).toBeGreaterThanOrEqual(1);
  });

  it("deve atualizar a data pelo input e restaurar texto inválido no blur", async () => {
    const user = userEvent.setup();
    renderDashboard();

    const inputData = screen.getByLabelText("Data do período do dashboard");
    await user.clear(inputData);
    await user.type(inputData, "01062026");

    expect(inputData).toHaveValue("01/06/2026");
    await waitFor(() => {
      expect(buscarAnalisePreditiva).toHaveBeenCalledWith({
        mes: "6",
        ano: "2026",
      });
    });

    await user.tab();
    expect(inputData).toHaveValue("01/06/2026");
  });

  it("deve exibir erros observáveis quando APIs falham", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    buscarAnalisePreditiva.mockRejectedValue(new Error("analytics fora"));
    listarLancamentos.mockRejectedValue(new Error("falha lançamentos"));
    listarContas.mockRejectedValue(new Error("falha contas"));

    renderDashboard();

    expect(await screen.findByText("falha lançamentos")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Não foi possível carregar a análise preditiva."),
    ).toBeInTheDocument();
  });
});
