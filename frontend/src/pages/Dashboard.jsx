import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  LoaderCircle,
  PiggyBank,
  ReceiptText,
  Wallet,
  WalletCards,
} from "lucide-react";

import CategoryRankingCard from "@/components/dashboard/CategoryRankingCard";
import DashboardSummaryCard from "@/components/dashboard/DashboardSummaryCard";
import DashboardTransactionsTable from "@/components/dashboard/DashboardTransactionsTable";
import BudgetStatusCard from "@/components/dashboard/BudgetStatusCard";
import PredictedBalanceCard from "@/components/dashboard/PredictedBalanceCard";
import RecentHistoryChart from "@/components/dashboard/RecentHistoryChart";
import TrendsCard from "@/components/dashboard/TrendsCard";
import {
  formatarMoeda,
  formatarPercentual,
  nomesMeses,
  obterAlertasPorTipo,
  obterPeriodoAtual,
  paraNumero,
  resumoTemDados,
} from "@/components/dashboard/dashboard-utils";
import { NovoLancamentoDialog, HomeSidebar } from "@/pages/Home";
import { obterUsuario } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  buscarAnalisePreditiva,
  listarContas,
  listarLancamentos,
} from "@/services/api";

export default function Dashboard() {
  const usuario = obterUsuario();
  const [periodoInicial] = useState(() => obterPeriodoAtual());
  const [mes, setMes] = useState(periodoInicial.mes);
  const [ano, setAno] = useState(periodoInicial.ano);
  const [periodoHistorico, setPeriodoHistorico] = useState("6");
  const [analise, setAnalise] = useState(null);
  const [lancamentos, setLancamentos] = useState([]);
  const [contas, setContas] = useState([]);
  const [carregandoAnalise, setCarregandoAnalise] = useState(false);
  const [carregandoLancamentos, setCarregandoLancamentos] = useState(false);
  const [erroAnalise, setErroAnalise] = useState("");
  const [erroLancamentos, setErroLancamentos] = useState("");
  const [modalLancamentoAberto, setModalLancamentoAberto] = useState(false);

  const carregarAnalise = useCallback(async () => {
    setCarregandoAnalise(true);
    setErroAnalise("");

    try {
      const resultado = await buscarAnalisePreditiva({
        mes: mes || undefined,
        ano: ano || undefined,
      });

      setAnalise(resultado || null);
    } catch (error) {
      console.error("Erro ao carregar análise preditiva:", error.message);
      setErroAnalise("Não foi possível carregar a análise preditiva.");
      setAnalise(null);
    } finally {
      setCarregandoAnalise(false);
    }
  }, [ano, mes]);

  const carregarLancamentos = useCallback(async () => {
    setCarregandoLancamentos(true);
    setErroLancamentos("");

    try {
      const resultado = await listarLancamentos({ limite: 80 });
      setLancamentos(resultado || []);
    } catch (error) {
      setErroLancamentos(error.message || "Erro ao carregar lançamentos.");
      setLancamentos([]);
    } finally {
      setCarregandoLancamentos(false);
    }
  }, []);

  const carregarContas = useCallback(async () => {
    try {
      const resultado = await listarContas();
      setContas(resultado || []);
    } catch (error) {
      console.error("Erro ao carregar contas:", error.message);
      setContas([]);
    }
  }, []);

  const atualizarDados = useCallback(async () => {
    await Promise.all([
      carregarAnalise(),
      carregarLancamentos(),
      carregarContas(),
    ]);
  }, [carregarAnalise, carregarContas, carregarLancamentos]);

  useEffect(() => {
    void Promise.resolve().then(atualizarDados);
  }, [atualizarDados]);

  const resumo = analise?.resumo || {};
  const projecoes = analise?.projecoes || {};
  const saldo = analise?.saldo || {};
  const orcamento = analise?.orcamento || {};
  const categorias = analise?.categorias || [];
  const tendencias = analise?.tendencias || {};
  const alertas = analise?.alertas || [];
  const historico = analise?.historico || {};
  const insights = analise?.insights || {};
  const confiabilidade = analise?.confiabilidade || {};
  const despesaProjetada = paraNumero(
    projecoes.despesaProjetada ?? resumo.despesaProjetada,
  );
  const receitaProjetada = paraNumero(
    projecoes.receitaProjetada ?? resumo.receitaProjetada,
  );
  const rendaGasta = paraNumero(
    projecoes.percentualComprometimentoRenda ??
      resumo.percentualComprometimentoRenda,
  );
  const percentualOrcamento = paraNumero(
    orcamento.percentualProjetado ?? orcamento.percentualAtual,
  );
  const semDadosPrevisao =
    !carregandoAnalise &&
    !erroAnalise &&
    !resumoTemDados({ resumo, projecoes, saldo, categorias });
  const confiabilidadeBaixa =
    confiabilidade.qualidadeDosDados === "BAIXA" ||
    insights.dadosInsuficientes;
  const alertaDespesas = obterAlertasPorTipo(alertas, [
    "DESPESAS_ACIMA_RENDA",
    "AUMENTO_GASTOS",
  ]);
  const alertaOrcamento = obterAlertasPorTipo(alertas, [
    "ORCAMENTO_ESTOURADO",
    "ORCAMENTO_RISCO",
    "AUSENCIA_ORCAMENTO",
  ]);
  const alertaSaldo = obterAlertasPorTipo(alertas, [
    "SALDO_NEGATIVO",
    "RISCO_FINANCEIRO_FUTURO",
  ]);

  const cardsResumo = useMemo(
    () => [
      {
        titulo: "Saldo Total das Contas",
        valor: formatarMoeda(saldo.saldoAtual),
        descricao: "Somatório do saldo presente em todas as contas cadastradas.",
        icon: WalletCards,
        alerta: alertaSaldo?.descricao,
        variante: "sky",
      },
      {
        titulo: "Projeção de Despesas",
        valor: formatarMoeda(despesaProjetada),
        descricao: "Previsão de gasto até o fim do mês com base nas despesas.",
        icon: ReceiptText,
        alerta: alertaDespesas?.descricao,
        variante: "rose",
      },
      {
        titulo: "Renda Gasta",
        valor: formatarPercentual(rendaGasta),
        descricao: "Percentual da renda total gasto ou comprometido no período.",
        icon: Wallet,
        alerta:
          rendaGasta >= 90
            ? "Suas despesas previstas estão próximas ou acima da sua renda."
            : "",
        variante: "emerald",
      },
      {
        titulo: "Orçamento",
        valor: `${formatarPercentual(percentualOrcamento)} utilizado`,
        descricao: orcamento.semOrcamento
          ? "Nenhum orçamento mensal foi definido para este período."
          : `Com base no ritmo atual, você pode utilizar ${formatarPercentual(
              percentualOrcamento,
            )} do orçamento até o final do mês.`,
        icon: PiggyBank,
        alerta: alertaOrcamento?.descricao,
        variante: "orange",
      },
    ],
    [
      alertaDespesas,
      alertaOrcamento,
      alertaSaldo,
      despesaProjetada,
      orcamento.semOrcamento,
      percentualOrcamento,
      rendaGasta,
      saldo.saldoAtual,
    ],
  );

  async function atualizarAposNovoLancamento() {
    await atualizarDados();
  }

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

              <div>
                <h1 className="text-2xl font-bold leading-tight text-zinc-950 sm:text-3xl">
                  Dashboard
                </h1>
                <p className="mt-2 max-w-3xl text-sm text-zinc-950">
                  Acompanhe sua situação financeira e veja projeções com base
                  nos seus lançamentos.
                </p>
              </div>
            </div>

            <div className="grid w-full gap-3 rounded-xl bg-white p-3 shadow-sm sm:w-auto sm:grid-cols-[170px_112px]">
              <div className="space-y-1.5">
                <Label htmlFor="periodoDashboard" className="sr-only">
                  Mês
                </Label>
                <Select value={mes} onValueChange={setMes}>
                  <SelectTrigger id="periodoDashboard" className="h-10">
                    <CalendarDays className="size-4" />
                    <SelectValue placeholder="Selecione o mês" />
                  </SelectTrigger>
                  <SelectContent align="end">
                    {nomesMeses.map((nomeMes, indice) => (
                      <SelectItem key={nomeMes} value={String(indice + 1)}>
                        {nomeMes}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="anoDashboard" className="sr-only">
                  Ano
                </Label>
                <Input
                  id="anoDashboard"
                  type="number"
                  inputMode="numeric"
                  min="1900"
                  max="9999"
                  value={ano}
                  onChange={(event) => setAno(event.target.value)}
                  className="h-10"
                />
              </div>
            </div>
          </header>

          <main className="min-h-0 space-y-5 pb-2">
            {(erroAnalise || semDadosPrevisao || confiabilidadeBaixa) && (
              <Card className="rounded-2xl border border-zinc-200 bg-white py-0 shadow-sm">
                <CardContent className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-zinc-700">
                    {erroAnalise ||
                      (semDadosPrevisao
                        ? "Ainda não há lançamentos suficientes para gerar uma previsão financeira."
                        : "A confiabilidade da previsão está baixa por falta de histórico suficiente.")}
                  </p>

                  {erroAnalise && (
                    <Button
                      type="button"
                      onClick={carregarAnalise}
                      className="bg-zinc-950 text-white hover:bg-zinc-800"
                    >
                      {carregandoAnalise && (
                        <LoaderCircle className="animate-spin" size={16} />
                      )}
                      Tentar novamente
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {cardsResumo.map((card) => (
                <DashboardSummaryCard
                  key={card.titulo}
                  {...card}
                  carregando={carregandoAnalise}
                />
              ))}
            </section>

            <section className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.85fr)]">
              <RecentHistoryChart
                historico={historico}
                periodo={periodoHistorico}
                onPeriodoChange={setPeriodoHistorico}
                carregando={carregandoAnalise}
              />

              <CategoryRankingCard
                categorias={categorias}
                carregando={carregandoAnalise}
              />
            </section>

            <section className="grid gap-5 xl:grid-cols-[minmax(280px,0.8fr)_minmax(360px,1fr)_minmax(320px,0.95fr)]">
              <BudgetStatusCard
                resumo={resumo}
                orcamento={orcamento}
                alerta={alertaOrcamento}
                carregando={carregandoAnalise}
              />

              <PredictedBalanceCard
                saldo={saldo}
                projecoes={{
                  receitaProjetada,
                  despesaProjetada,
                  saldoProjetado: projecoes.saldoProjetado ?? resumo.saldoProjetado,
                }}
                alerta={alertaSaldo}
                carregando={carregandoAnalise}
              />

              <TrendsCard
                tendencias={tendencias}
                alertas={alertas}
                carregando={carregandoAnalise}
              />
            </section>

            <DashboardTransactionsTable
              lancamentos={lancamentos}
              carregando={carregandoLancamentos}
              erro={erroLancamentos}
              onNovoLancamento={() => setModalLancamentoAberto(true)}
            />
          </main>

          {modalLancamentoAberto && (
            <NovoLancamentoDialog
              aberto={modalLancamentoAberto}
              onAbertoChange={setModalLancamentoAberto}
              contas={contas}
              contaSelecionada={contas[0]?.id || ""}
              onLancamentoCriado={atualizarAposNovoLancamento}
            />
          )}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
