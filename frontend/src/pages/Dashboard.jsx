import { createElement, useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  CalendarRange,
  Gauge,
  Landmark,
  LineChart,
  LoaderCircle,
  PiggyBank,
  ShieldCheck,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import { HomeSidebar } from "@/pages/Home";
import { obterUsuario } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TooltipProvider } from "@/components/ui/tooltip";
import { buscarAnalisePreditiva } from "@/services/api";

const meses = [
  { value: "1", label: "Janeiro" },
  { value: "2", label: "Fevereiro" },
  { value: "3", label: "Março" },
  { value: "4", label: "Abril" },
  { value: "5", label: "Maio" },
  { value: "6", label: "Junho" },
  { value: "7", label: "Julho" },
  { value: "8", label: "Agosto" },
  { value: "9", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

const statusOrcamento = {
  DENTRO_DO_ORCAMENTO: {
    label: "Dentro do orçamento",
    icon: Target,
    badgeClassName: "border-emerald-200 bg-emerald-50 text-emerald-700",
    panelClassName: "border-emerald-200 bg-emerald-50",
    textClassName: "text-emerald-700",
  },
  ATENCAO: {
    label: "Atenção",
    icon: AlertCircle,
    badgeClassName: "border-amber-200 bg-amber-50 text-amber-700",
    panelClassName: "border-amber-200 bg-amber-50",
    textClassName: "text-amber-700",
  },
  RISCO: {
    label: "Risco",
    icon: AlertCircle,
    badgeClassName: "border-red-200 bg-red-50 text-red-700",
    panelClassName: "border-red-200 bg-red-50",
    textClassName: "text-red-700",
  },
};

const severidadeAlerta = {
  ALTA: "border-red-200 bg-red-50 text-red-700",
  MEDIA: "border-amber-200 bg-amber-50 text-amber-700",
  BAIXA: "border-zinc-200 bg-zinc-50 text-zinc-700",
};

const direcaoTendencia = {
  AUMENTO: { icon: ArrowUpRight, className: "text-red-600" },
  REDUCAO: { icon: ArrowDownRight, className: "text-emerald-600" },
  MELHORA: { icon: ArrowUpRight, className: "text-emerald-600" },
  PIORA: { icon: ArrowDownRight, className: "text-red-600" },
  ESTAVEL: { icon: LineChart, className: "text-zinc-600" },
  ESTABILIDADE: { icon: LineChart, className: "text-zinc-600" },
};

function obterPeriodoAtual() {
  const hoje = new Date();

  return {
    mes: String(hoje.getMonth() + 1),
    ano: String(hoje.getFullYear()),
  };
}

function formatarMoeda(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarPercentual(valor, casas = 1) {
  const numero = Number(valor || 0);

  return `${numero.toLocaleString("pt-BR", {
    maximumFractionDigits: casas,
  })}%`;
}

function limitarPercentualBarra(valor) {
  const numero = Number(valor || 0);

  if (!Number.isFinite(numero) || numero <= 0) return 0;

  return Math.min(numero, 100);
}

function MetricCard({ titulo, valor, descricao, icon, carregando }) {
  return (
    <Card className="rounded-2xl border-0 bg-white py-0 shadow-none ring-0">
      <CardHeader className="flex-row items-start justify-between gap-3 px-4 pb-2 pt-4">
        <div className="min-w-0">
          <CardDescription className="text-xs font-medium text-zinc-500">
            {titulo}
          </CardDescription>
          <CardTitle className="mt-2 truncate text-2xl font-bold text-zinc-950">
            {carregando ? <Skeleton className="h-8 w-28" /> : valor}
          </CardTitle>
        </div>

        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-950">
          {createElement(icon, { size: 18 })}
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        {carregando ? (
          <Skeleton className="h-4 w-full max-w-52" />
        ) : (
          <p className="text-xs text-zinc-500">{descricao}</p>
        )}
      </CardContent>
    </Card>
  );
}

function EstadoVazio({ children }) {
  return (
    <div className="flex min-h-44 items-center justify-center rounded-lg border border-dashed border-zinc-300 p-4 text-center text-sm text-zinc-500">
      {children}
    </div>
  );
}

function CategoryRanking({ categorias, carregando, semDados }) {
  const principaisCategorias = useMemo(
    () =>
      [...(categorias || [])]
        .sort((categoriaA, categoriaB) => {
          const valorA = Number(
            categoriaA.projecaoFutura ?? categoriaA.total ?? 0,
          );
          const valorB = Number(
            categoriaB.projecaoFutura ?? categoriaB.total ?? 0,
          );

          return valorB - valorA;
        })
        .slice(0, 5),
    [categorias],
  );

  return (
    <Card className="rounded-2xl border-0 bg-white py-0 shadow-none ring-0">
      <CardHeader className="px-4 pb-3 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg font-bold text-zinc-950">
              Ranking de categorias
            </CardTitle>
            <CardDescription>
              Principais despesas do período selecionado.
            </CardDescription>
          </div>

          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-950">
            <BarChart3 size={18} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        {carregando && (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="space-y-2">
                <div className="flex justify-between gap-3">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        )}

        {!carregando && semDados && (
          <EstadoVazio>
            Não há dados financeiros suficientes para este período.
          </EstadoVazio>
        )}

        {!carregando && !semDados && principaisCategorias.length === 0 && (
          <EstadoVazio>
            Nenhuma despesa por categoria encontrada para este período.
          </EstadoVazio>
        )}

        {!carregando && !semDados && principaisCategorias.length > 0 && (
          <div className="space-y-4">
            {principaisCategorias.map((categoria) => {
              const percentual = Number(categoria.percentual || 0);
              const percentualOrcamento = Number(
                categoria.percentualOrcamento || 0,
              );
              const projecao = Number(
                categoria.projecaoFutura ?? categoria.total ?? 0,
              );
              const temLimite = Number(categoria.limite || 0) > 0;
              const risco =
                categoria.risco === "ALTO"
                  ? "text-red-600"
                  : categoria.risco === "MEDIO"
                    ? "text-amber-600"
                    : "text-zinc-500";

              return (
                <div
                  key={categoria.idCategoria || categoria.nome}
                  className="space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-zinc-950">
                        {categoria.nome || "Categoria"}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {formatarMoeda(projecao)} projetados ·{" "}
                        {formatarPercentual(percentual)} dos gastos
                      </p>
                      <p className={`mt-1 text-xs font-medium ${risco}`}>
                        {categoria.status || "NORMAL"}
                      </p>
                    </div>

                    {temLimite && (
                      <span className="shrink-0 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-600">
                        {formatarPercentual(percentualOrcamento)} do limite
                      </span>
                    )}
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className="h-full rounded-full bg-zinc-950"
                      style={{
                        width: `${limitarPercentualBarra(percentual)}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function BudgetStatusCard({ resumo, orcamento, carregando }) {
  const limiteMensal = Number(orcamento?.limiteMensal || 0);
  const percentualProjetado = Number(orcamento?.percentualProjetado || 0);
  const config =
    statusOrcamento[orcamento?.status] || statusOrcamento.DENTRO_DO_ORCAMENTO;
  const Icon = config.icon;

  return (
    <Card className="rounded-2xl border-0 bg-white py-0 shadow-none ring-0">
      <CardHeader className="px-4 pb-3 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg font-bold text-zinc-950">
              Status do orçamento
            </CardTitle>
            <CardDescription>Projeção até o fim do mês.</CardDescription>
          </div>

          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-950">
            <Gauge size={18} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        {carregando ? (
          <div className="space-y-3">
            <Skeleton className="h-7 w-36" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : limiteMensal <= 0 ? (
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-950">
              Nenhum orçamento mensal foi definido para este período.
            </p>
            <p className="mt-2 text-sm text-zinc-600">
              Defina um orçamento para acompanhar riscos de estouro.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <span
              className={`inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs font-semibold ${config.badgeClassName}`}
            >
              <Icon size={14} />
              {config.label}
            </span>

            <div className={`rounded-lg border p-4 ${config.panelClassName}`}>
              <p className={`text-sm font-semibold ${config.textClassName}`}>
                {orcamento?.mensagem ||
                  "Acompanhe sua projeção para manter o orçamento sob controle."}
              </p>
              <p className="mt-2 text-sm text-zinc-700">
                Com base no seu ritmo atual, você pode utilizar{" "}
                <strong>{formatarPercentual(percentualProjetado)}</strong> do
                orçamento até o final do mês.
              </p>
            </div>

            <dl className="grid gap-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-zinc-500">Limite mensal</dt>
                <dd className="font-semibold text-zinc-950">
                  {formatarMoeda(limiteMensal)}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-3">
                <dt className="text-zinc-500">Projeção mensal</dt>
                <dd className="font-semibold text-zinc-950">
                  {formatarMoeda(resumo?.projecaoGastoMensal)}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function InsightCard({ insights, carregando }) {
  const categoria = insights?.categoriaMaiorGasto;
  const dadosInsuficientes = Boolean(insights?.dadosInsuficientes);

  return (
    <Card className="rounded-2xl border-0 bg-white py-0 shadow-none ring-0">
      <CardHeader className="px-4 pb-3 pt-4">
        <CardTitle className="text-lg font-bold text-zinc-950">
          Insight principal
        </CardTitle>
        <CardDescription>Leitura rápida do período.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 px-4 pb-4">
        {carregando ? (
          <>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </>
        ) : (
          <>
            <p className="text-sm text-zinc-700">
              {categoria ? (
                <>
                  Sua maior categoria de gasto neste período foi{" "}
                  <strong>{categoria.nome}</strong>, representando{" "}
                  <strong>{formatarPercentual(categoria.percentual)}</strong>{" "}
                  das despesas.
                </>
              ) : (
                "Você ainda não possui despesas suficientes para gerar um insight de categoria."
              )}
            </p>

            {dadosInsuficientes && (
              <p className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-600">
                Ainda existem poucos dados para uma projeção mais confiável.
                Continue registrando seus lançamentos para melhorar a análise.
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

function AlertasCard({ alertas, carregando }) {
  const principaisAlertas = (alertas || []).slice(0, 5);

  return (
    <Card className="rounded-2xl border-0 bg-white py-0 shadow-none ring-0">
      <CardHeader className="px-4 pb-3 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg font-bold text-zinc-950">
              Alertas financeiros
            </CardTitle>
            <CardDescription>Riscos detectados pela previsão.</CardDescription>
          </div>

          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-950">
            <Bell size={18} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 px-4 pb-4">
        {carregando ? (
          [1, 2, 3].map((item) => (
            <div key={item} className="space-y-2">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))
        ) : principaisAlertas.length === 0 ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-700">
              Nenhum alerta crítico encontrado.
            </p>
            <p className="mt-2 text-sm text-zinc-700">
              A previsão atual não indica riscos financeiros relevantes.
            </p>
          </div>
        ) : (
          principaisAlertas.map((alerta) => (
            <div
              key={alerta.id || alerta.tipo}
              className="rounded-lg border border-zinc-200 p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-zinc-950">
                  {alerta.titulo}
                </p>
                <span
                  className={`shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-semibold ${
                    severidadeAlerta[alerta.severidade] ||
                    severidadeAlerta.BAIXA
                  }`}
                >
                  {alerta.severidade}
                </span>
              </div>
              <p className="mt-2 text-sm text-zinc-600">{alerta.descricao}</p>
              {alerta.recomendacao && (
                <p className="mt-2 text-xs font-medium text-zinc-950">
                  {alerta.recomendacao}
                </p>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

function TendenciasCard({ tendencias, carregando }) {
  const itens = [
    ["Receitas", tendencias?.tendenciaReceitas],
    ["Despesas", tendencias?.tendenciaDespesas],
    ["Saldo", tendencias?.tendenciaSaldo],
    ["Geral", tendencias?.tendenciaGeral],
  ];

  return (
    <Card className="rounded-2xl border-0 bg-white py-0 shadow-none ring-0">
      <CardHeader className="px-4 pb-3 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg font-bold text-zinc-950">
              Tendências
            </CardTitle>
            <CardDescription>Comparação com a média histórica.</CardDescription>
          </div>

          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-950">
            <LineChart size={18} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-3 px-4 pb-4 sm:grid-cols-2">
        {carregando
          ? [1, 2, 3, 4].map((item) => (
              <Skeleton key={item} className="h-24 w-full" />
            ))
          : itens.map(([titulo, tendencia]) => {
              const config =
                direcaoTendencia[tendencia?.direcao] ||
                direcaoTendencia.ESTAVEL;
              const Icon = config.icon;

              return (
                <div key={titulo} className="rounded-lg border border-zinc-200 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-medium text-zinc-500">{titulo}</p>
                    <Icon className={config.className} size={16} />
                  </div>
                  <p className="mt-2 text-sm font-semibold text-zinc-950">
                    {tendencia?.direcao || "ESTAVEL"} ·{" "}
                    {formatarPercentual(tendencia?.percentual)}
                  </p>
                  <p className="mt-2 text-xs text-zinc-600">
                    {tendencia?.descricao || "Sem tendência calculada."}
                  </p>
                </div>
              );
            })}
      </CardContent>
    </Card>
  );
}

function SaldoPrevistoCard({ saldo, carregando }) {
  const previsoes = [
    ["Atual", saldo?.saldoAtual],
    ["30 dias", saldo?.saldoPrevisto30Dias],
    ["60 dias", saldo?.saldoPrevisto60Dias],
    ["90 dias", saldo?.saldoPrevisto90Dias],
  ];

  return (
    <Card className="rounded-2xl border-0 bg-white py-0 shadow-none ring-0">
      <CardHeader className="px-4 pb-3 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg font-bold text-zinc-950">
              Saldo previsto
            </CardTitle>
            <CardDescription>Projeção baseada nas contas e lançamentos.</CardDescription>
          </div>

          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-950">
            <Landmark size={18} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 px-4 pb-4">
        {carregando
          ? [1, 2, 3, 4].map((item) => (
              <Skeleton key={item} className="h-8 w-full" />
            ))
          : previsoes.map(([label, valor]) => (
              <div key={label} className="flex items-center justify-between gap-3">
                <span className="text-sm text-zinc-500">{label}</span>
                <span
                  className={`text-sm font-semibold ${
                    Number(valor || 0) < 0 ? "text-red-600" : "text-zinc-950"
                  }`}
                >
                  {formatarMoeda(valor)}
                </span>
              </div>
            ))}
      </CardContent>
    </Card>
  );
}

function HistoricoChartCard({ historico, carregando }) {
  const dados = useMemo(
    () =>
      (historico?.meses || []).map((item) => ({
        mes: item.mes?.slice(5) || item.mes,
        receitas: Number(item.receitas || 0),
        despesas: Number(item.despesas || 0),
      })),
    [historico],
  );

  return (
    <Card className="rounded-2xl border-0 bg-white py-0 shadow-none ring-0">
      <CardHeader className="px-4 pb-3 pt-4">
        <CardTitle className="text-lg font-bold text-zinc-950">
          Histórico recente
        </CardTitle>
        <CardDescription>Receitas e despesas dos últimos meses.</CardDescription>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        {carregando ? (
          <Skeleton className="h-64 w-full" />
        ) : dados.length === 0 ? (
          <EstadoVazio>Sem histórico suficiente para o gráfico.</EstadoVazio>
        ) : (
          <ChartContainer
            config={{
              receitas: { label: "Receitas", color: "#059669" },
              despesas: { label: "Despesas", color: "#dc2626" },
            }}
            className="h-64 w-full"
          >
            <BarChart data={dados}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="mes" tickLine={false} axisLine={false} />
              <YAxis hide />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="receitas"
                fill="var(--color-receitas)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="despesas"
                fill="var(--color-despesas)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

function ConfiabilidadeCard({ confiabilidade, carregando }) {
  const score = Number(confiabilidade?.confiabilidadeAnalise || 0);

  return (
    <Card className="rounded-2xl border-0 bg-white py-0 shadow-none ring-0">
      <CardHeader className="px-4 pb-3 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg font-bold text-zinc-950">
              Confiabilidade
            </CardTitle>
            <CardDescription>Qualidade dos dados usados na previsão.</CardDescription>
          </div>

          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-950">
            <ShieldCheck size={18} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        {carregando ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-2xl font-bold text-zinc-950">{score}%</p>
            <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
              <div
                className="h-full rounded-full bg-zinc-950"
                style={{ width: `${limitarPercentualBarra(score)}%` }}
              />
            </div>
            <p className="text-sm text-zinc-600">
              Dados com qualidade{" "}
              <strong>{confiabilidade?.qualidadeDosDados || "BAIXA"}</strong>.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const usuario = obterUsuario();
  const [periodoAtual] = useState(() => obterPeriodoAtual());
  const [mes, setMes] = useState(periodoAtual.mes);
  const [ano, setAno] = useState(periodoAtual.ano);
  const [analise, setAnalise] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const carregarAnalise = useCallback(async () => {
    setCarregando(true);
    setErro("");

    try {
      const resultado = await buscarAnalisePreditiva({
        mes: mes || undefined,
        ano: ano || undefined,
      });

      setAnalise(resultado || null);
    } catch (error) {
      console.error("Erro ao carregar análise preditiva:", error.message);
      setErro("Não foi possível carregar a análise preditiva.");
      setAnalise(null);
    } finally {
      setCarregando(false);
    }
  }, [ano, mes]);

  useEffect(() => {
    void Promise.resolve().then(carregarAnalise);
  }, [carregarAnalise]);

  const resumo = analise?.resumo || {};
  const orcamento = analise?.orcamento || {};
  const projecoes = analise?.projecoes || {};
  const saldo = analise?.saldo || {};
  const categorias = analise?.categorias || [];
  const tendencias = analise?.tendencias || {};
  const alertas = analise?.alertas || [];
  const confiabilidade = analise?.confiabilidade || {};
  const historico = analise?.historico || {};
  const insights = analise?.insights || {};
  const totalGastoAtual = Number(resumo.totalGastoAtual || 0);
  const receitaProjetada = Number(
    projecoes.receitaProjetada ?? resumo.receitaProjetada ?? 0,
  );
  const despesaProjetada = Number(
    projecoes.despesaProjetada ?? resumo.despesaProjetada ?? resumo.projecaoGastoMensal ?? 0,
  );
  const saldoProjetado = Number(
    saldo.saldoProjetado ?? projecoes.saldoProjetado ?? resumo.saldoProjetado ?? 0,
  );
  const semDados =
    !carregando &&
    !erro &&
    totalGastoAtual === 0 &&
    receitaProjetada === 0 &&
    despesaProjetada === 0 &&
    categorias.length === 0;

  const metricas = [
    {
      titulo: "Receita projetada",
      valor: formatarMoeda(receitaProjetada),
      descricao: "Estimativa de entradas no período.",
      icon: Wallet,
    },
    {
      titulo: "Despesa projetada",
      valor: formatarMoeda(despesaProjetada),
      descricao: "Estimativa de saídas no período.",
      icon: TrendingUp,
    },
    {
      titulo: "Saldo projetado",
      valor: formatarMoeda(saldoProjetado),
      descricao: "Previsão considerando contas e movimentações.",
      icon: PiggyBank,
    },
    {
      titulo: "Renda comprometida",
      valor: formatarPercentual(
        projecoes.percentualComprometimentoRenda ??
          resumo.percentualComprometimentoRenda,
      ),
      descricao: "Percentual previsto da renda consumido por despesas.",
      icon: CalendarRange,
    },
  ];

  return (
    <TooltipProvider>
      <SidebarProvider
        data-ui="dashboard-sidebar-provider"
        className="h-screen overflow-hidden bg-[#E9E9E9]"
        style={{
          "--sidebar-width": "17.5rem",
          "--sidebar-width-icon": "4rem",
          "--sidebar-floating-offset": "1rem",
        }}
      >
        <HomeSidebar usuario={usuario} paginaAtiva="dashboard" />

        <SidebarInset className="grid h-screen min-h-0 min-w-0 grid-rows-[auto_minmax(0,1fr)] gap-5 overflow-y-auto bg-[#E9E9E9] p-4 sm:py-4 sm:pl-2 sm:pr-4">
          <header className="flex shrink-0 flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <SidebarTrigger className="mt-1 size-9 shrink-0 md:hidden" />

              <div className="min-w-0">
                <h1 className="text-2xl font-bold leading-tight text-zinc-950 sm:text-3xl">
                  Dashboard
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-zinc-950">
                  Acompanhe sua situação financeira e veja projeções com base
                  nos seus lançamentos.
                </p>
              </div>
            </div>

            <div className="grid gap-3 rounded-2xl bg-white p-3 shadow-none ring-0 sm:grid-cols-[180px_120px]">
              <div className="space-y-1.5">
                <Label htmlFor="mesDashboard" className="text-xs">
                  Mês
                </Label>
                <Select value={mes} onValueChange={setMes}>
                  <SelectTrigger id="mesDashboard" className="h-10">
                    <SelectValue placeholder="Mês" />
                  </SelectTrigger>
                  <SelectContent align="end">
                    {meses.map((opcao) => (
                      <SelectItem key={opcao.value} value={opcao.value}>
                        {opcao.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="anoDashboard" className="text-xs">
                  Ano
                </Label>
                <Input
                  id="anoDashboard"
                  type="number"
                  inputMode="numeric"
                  min="2000"
                  max="2100"
                  value={ano}
                  onChange={(event) => setAno(event.target.value)}
                  className="h-10"
                />
              </div>
            </div>
          </header>

          <main className="min-h-0 space-y-5 pb-2">
            {erro && (
              <Card className="rounded-2xl border-0 bg-white py-0 shadow-none ring-0">
                <CardContent className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-red-600">{erro}</p>
                  <Button
                    type="button"
                    onClick={carregarAnalise}
                    className="w-full bg-zinc-950 text-white hover:bg-zinc-800 sm:w-auto"
                  >
                    {carregando && (
                      <LoaderCircle className="animate-spin" size={16} />
                    )}
                    Tentar novamente
                  </Button>
                </CardContent>
              </Card>
            )}

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {metricas.map((metrica) => (
                <MetricCard
                  key={metrica.titulo}
                  titulo={metrica.titulo}
                  valor={metrica.valor}
                  descricao={metrica.descricao}
                  icon={metrica.icon}
                  carregando={carregando}
                />
              ))}
            </section>

            <section className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)]">
              <CategoryRanking
                categorias={categorias}
                carregando={carregando}
                semDados={semDados}
              />

              <div className="space-y-5">
                <BudgetStatusCard
                  resumo={resumo}
                  orcamento={orcamento}
                  carregando={carregando}
                />
                <SaldoPrevistoCard saldo={saldo} carregando={carregando} />
                <InsightCard insights={insights} carregando={carregando} />
              </div>
            </section>

            <section className="grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,1fr)]">
              <HistoricoChartCard
                historico={historico}
                carregando={carregando}
              />
              <AlertasCard alertas={alertas} carregando={carregando} />
            </section>

            <section className="grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.8fr)]">
              <TendenciasCard
                tendencias={tendencias}
                carregando={carregando}
              />
              <ConfiabilidadeCard
                confiabilidade={confiabilidade}
                carregando={carregando}
              />
            </section>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
