import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CircleDollarSign } from "lucide-react";
import { describe, expect, it, vi } from "vitest";

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

import BudgetStatusCard from "../src/components/dashboard/BudgetStatusCard";
import CategoryRankingCard from "../src/components/dashboard/CategoryRankingCard";
import DashboardSummaryCard from "../src/components/dashboard/DashboardSummaryCard";
import DashboardTransactionsTable from "../src/components/dashboard/DashboardTransactionsTable";
import PredictedBalanceCard from "../src/components/dashboard/PredictedBalanceCard";
import RecentHistoryChart from "../src/components/dashboard/RecentHistoryChart";
import TrendsCard from "../src/components/dashboard/TrendsCard";
import { TooltipProvider } from "../src/components/ui/tooltip";

globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

function renderComTooltip(ui) {
  return render(<TooltipProvider>{ui}</TooltipProvider>);
}

const lancamentos = [
  {
    id: "l1",
    tipo: "RECEITA",
    valor: 3000,
    dataTransacao: "2026-05-05T00:00:00.000Z",
    categoria: { nome: "Salário" },
    conta: { nome: "Nubank" },
    descricao: "Pagamento mensal",
  },
  {
    id: "l2",
    tipo: "DESPESA",
    valor: 120.5,
    dataTransacao: "2026-05-10T00:00:00.000Z",
    categoria: { nome: "Mercado" },
    conta: { nome: "Carteira" },
  },
];

describe("dashboard components", () => {
  it("deve renderizar card resumo em estado carregando e carregado", () => {
    const { rerender } = renderComTooltip(
      <DashboardSummaryCard
        titulo="Receitas"
        valor="R$ 3.000,00"
        descricao="Projetadas para maio"
        icon={CircleDollarSign}
        alerta="Receita recorrente detectada"
        variante="emerald"
      />,
    );

    expect(screen.getByText("Receitas")).toBeInTheDocument();
    expect(screen.getByText("R$ 3.000,00")).toBeInTheDocument();
    expect(screen.getByLabelText("Receita recorrente detectada")).toBeInTheDocument();

    rerender(
      <TooltipProvider>
        <DashboardSummaryCard
          titulo="Despesas"
          valor="R$ 0,00"
          descricao="Carregando"
          icon={CircleDollarSign}
          carregando
        />
      </TooltipProvider>,
    );

    expect(screen.getByText("Despesas")).toBeInTheDocument();
    expect(screen.queryByText("R$ 0,00")).not.toBeInTheDocument();
  });

  it("deve exibir status de orçamento, ranking e saldo previsto", () => {
    renderComTooltip(
      <>
        <BudgetStatusCard
          resumo={{ percentualComprometimentoRenda: 82 }}
          orcamento={{
            percentualProjetado: 82,
            limiteMensal: 1000,
            mensagem: "Despesas próximas do limite.",
            mensagemTemporal: "Pode esgotar antes do fim do mês.",
            esgotaDentroDoMes: true,
          }}
        />
        <CategoryRankingCard
          categorias={[
            {
              idCategoria: "cat-1",
              nome: "Mercado",
              total: 500,
              percentual: 75,
              risco: "MEDIO",
            },
            { idCategoria: "cat-2", nome: "Lazer", total: 100, risco: "BAIXO" },
          ]}
        />
        <PredictedBalanceCard
          saldo={{ saldoAtual: 1500 }}
          projecoes={{
            receitaProjetada: 3000,
            despesaProjetada: 1800,
            saldoProjetado: 2700,
          }}
          alerta={{ descricao: "Saldo pode variar." }}
        />
      </>,
    );

    expect(screen.getByText("Status do Orçamento")).toBeInTheDocument();
    expect(screen.getByText("Atenção")).toBeInTheDocument();
    expect(screen.getByText("Despesas próximas do limite.")).toBeInTheDocument();
    expect(screen.getByText("Ranking de categorias")).toBeInTheDocument();
    expect(screen.getByText("Mercado")).toBeInTheDocument();
    expect(screen.getByText("Lazer")).toBeInTheDocument();
    expect(screen.getByText("Saldo previsto")).toBeInTheDocument();
  });

  it("deve renderizar estados vazios dos cards de gráfico e tendências", () => {
    renderComTooltip(
      <>
        <RecentHistoryChart historico={[]} periodo="6" onPeriodoChange={vi.fn()} />
        <PredictedBalanceCard saldo={{ saldoAtual: 0 }} projecoes={{}} />
        <TrendsCard tendencias={null} alertas={[]} />
      </>,
    );

    expect(
      screen.getByText("Sem histórico suficiente para montar o gráfico."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Sem dados suficientes para projetar o saldo."),
    ).toBeInTheDocument();
    expect(screen.getByText("Tendências")).toBeInTheDocument();
    expect(screen.getAllByText("Estável").length).toBeGreaterThanOrEqual(4);
  });

  it("deve filtrar transações, selecionar itens e disparar novo lançamento", async () => {
    const user = userEvent.setup();
    const onNovoLancamento = vi.fn();
    renderComTooltip(
      <DashboardTransactionsTable
        lancamentos={lancamentos}
        onNovoLancamento={onNovoLancamento}
      />,
    );

    expect(screen.getByText("Transações")).toBeInTheDocument();
    expect(screen.getByText("Salário")).toBeInTheDocument();
    expect(screen.getByText("Mercado")).toBeInTheDocument();

    await user.type(screen.getByPlaceholderText("Pesquisar"), "mercado");

    expect(screen.queryByText("Salário")).not.toBeInTheDocument();
    expect(screen.getByText("Mercado")).toBeInTheDocument();

    await user.click(screen.getByLabelText(/Selecionar transação D01/i));
    expect(screen.getByText("1 de 1 transação selecionada.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Novo Lançamento/i }));
    expect(onNovoLancamento).toHaveBeenCalledTimes(1);
  });

  it("deve exibir carregamento e erro na tabela de transações", () => {
    const { rerender } = renderComTooltip(
      <DashboardTransactionsTable lancamentos={[]} carregando />,
    );

    expect(screen.getByText("Carregando lançamentos...")).toBeInTheDocument();

    rerender(
      <TooltipProvider>
        <DashboardTransactionsTable
          lancamentos={[]}
          erro="Falha ao carregar lançamentos."
        />
      </TooltipProvider>,
    );

    expect(screen.getByText("Falha ao carregar lançamentos.")).toBeInTheDocument();

    rerender(
      <TooltipProvider>
        <DashboardTransactionsTable lancamentos={[]} />
      </TooltipProvider>,
    );

    const tabela = screen.getByRole("table");
    expect(within(tabela).getByText("Nenhum lançamento encontrado.")).toBeInTheDocument();
  });
});
