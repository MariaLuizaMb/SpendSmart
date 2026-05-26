import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarIcon,
  CircleAlert,
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
  obterAlertasPorTipo,
  obterPeriodoAtual,
  paraNumero,
  resumoTemDados,
} from "@/components/dashboard/dashboard-utils";
import { NovoLancamentoDialog, HomeSidebar } from "@/pages/Home";
import { obterUsuario } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  buscarAnalisePreditiva,
  listarContas,
  listarLancamentos,
} from "@/services/api";

export function criarDataDashboard(mes, ano) {
  const mesNumerico = Number(mes);
  const anoNumerico = Number(ano);
  const hoje = new Date();

  if (!Number.isInteger(mesNumerico) || !Number.isInteger(anoNumerico)) {
    return hoje;
  }

  const ultimoDiaDoMes = new Date(anoNumerico, mesNumerico, 0).getDate();
  const dia = Math.min(hoje.getDate(), ultimoDiaDoMes);

  return new Date(anoNumerico, mesNumerico - 1, dia);
}

export function formatarDataDashboard(data) {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

export function validarData(data) {
  return data instanceof Date && !Number.isNaN(data.getTime());
}

export function criarDataSemHorario(ano, mes, dia) {
  const data = new Date(ano, mes - 1, dia);

  if (
    data.getFullYear() !== ano ||
    data.getMonth() !== mes - 1 ||
    data.getDate() !== dia
  ) {
    return undefined;
  }

  return data;
}

export function converterTextoParaData(valor) {
  const texto = valor.trim();

  if (!texto) return undefined;

  const dataPtBr = texto.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);

  if (dataPtBr) {
    const [, dia, mes, ano] = dataPtBr.map(Number);
    return criarDataSemHorario(ano, mes, dia);
  }

  const dataIso = texto.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);

  if (dataIso) {
    const [, ano, mes, dia] = dataIso.map(Number);
    return criarDataSemHorario(ano, mes, dia);
  }

  const data = new Date(texto);

  return validarData(data) ? data : undefined;
}

export function aplicarMascaraData(valor) {
  const digitos = valor.replace(/\D/g, "").slice(0, 8);
  const partes = [
    digitos.slice(0, 2),
    digitos.slice(2, 4),
    digitos.slice(4, 8),
  ].filter(Boolean);

  return partes.join("/");
}

export default function Dashboard() {
  const usuario = obterUsuario();
  const [periodoInicial] = useState(() => obterPeriodoAtual());
  const [dataDashboard, setDataDashboard] = useState(() =>
    criarDataDashboard(periodoInicial.mes, periodoInicial.ano),
  );
  const [mesCalendario, setMesCalendario] = useState(dataDashboard);
  const [valorDataDashboard, setValorDataDashboard] = useState(() =>
    formatarDataDashboard(dataDashboard),
  );
  const [calendarioAberto, setCalendarioAberto] = useState(false);
  const [periodoHistorico, setPeriodoHistorico] = useState("6");
  const [analise, setAnalise] = useState(null);
  const [lancamentos, setLancamentos] = useState([]);
  const [contas, setContas] = useState([]);
  const [carregandoAnalise, setCarregandoAnalise] = useState(false);
  const [carregandoLancamentos, setCarregandoLancamentos] = useState(false);
  const [erroAnalise, setErroAnalise] = useState("");
  const [erroLancamentos, setErroLancamentos] = useState("");
  const [modalLancamentoAberto, setModalLancamentoAberto] = useState(false);
  const seletorDataRef = useRef(null);
  const mes = String(dataDashboard.getMonth() + 1);
  const ano = String(dataDashboard.getFullYear());

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

  useEffect(() => {
    if (!calendarioAberto) return undefined;

    function fecharAoClicarFora(event) {
      if (seletorDataRef.current?.contains(event.target)) return;

      setCalendarioAberto(false);
    }

    document.addEventListener("mousedown", fecharAoClicarFora);

    return () => {
      document.removeEventListener("mousedown", fecharAoClicarFora);
    };
  }, [calendarioAberto]);

  function atualizarDataDashboard(data) {
    if (!data) return;

    setDataDashboard(data);
    setMesCalendario(data);
    setValorDataDashboard(formatarDataDashboard(data));
    setCalendarioAberto(false);
  }

  function atualizarTextoDataDashboard(event) {
    const proximoValor = aplicarMascaraData(event.target.value);
    const proximaData = converterTextoParaData(proximoValor);

    setValorDataDashboard(proximoValor);

    if (!proximaData) return;

    setDataDashboard(proximaData);
    setMesCalendario(proximaData);
  }

  function formatarTextoDataDashboard() {
    const proximaData = converterTextoParaData(valorDataDashboard);

    if (!proximaData) {
      setValorDataDashboard(formatarDataDashboard(dataDashboard));
      return;
    }

    setDataDashboard(proximaData);
    setMesCalendario(proximaData);
    setValorDataDashboard(formatarDataDashboard(proximaData));
  }

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
  const alertaOrcamento =
    obterAlertasPorTipo(alertas, [
      "ORCAMENTO_ESTOURADO",
      "ORCAMENTO_RISCO",
      "AUSENCIA_ORCAMENTO",
    ]) ||
    alertas.find((alerta) =>
      String(alerta.tipo || "").startsWith("CATEGORIA_ACIMA_ORCAMENTO"),
    ) ||
    alertas.find((alerta) =>
      String(alerta.tipo || "").startsWith("CATEGORIA_PROXIMA_LIMITE"),
    );
  const alertaSaldo = obterAlertasPorTipo(alertas, [
    "SALDO_NEGATIVO",
    "RISCO_FINANCEIRO_FUTURO",
  ]);
  const alertaCritico = alertas.find((alerta) => alerta.severidade === "ALTA");
  const avisoDados = erroAnalise
    ? {
        mensagem: erroAnalise,
        className: "text-red-600 hover:bg-red-50 focus-visible:ring-red-400",
      }
    : semDadosPrevisao
      ? {
          mensagem:
            "Ainda não há lançamentos suficientes para gerar uma previsão financeira.",
          className:
            "text-amber-600 hover:bg-amber-50 focus-visible:ring-amber-400",
        }
      : confiabilidadeBaixa
        ? {
            mensagem:
              "A confiabilidade da previsão está baixa por falta de histórico suficiente.",
            className:
              "text-amber-600 hover:bg-amber-50 focus-visible:ring-amber-400",
          }
        : null;

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
        alerta: "",
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

        <SidebarInset className="flex h-screen min-h-0 min-w-0 flex-col gap-5 overflow-y-auto bg-[#E9E9E9] p-4 sm:py-4 sm:pl-2 sm:pr-4">
          <header className="flex shrink-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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

            <div className="flex w-full items-center gap-2 sm:w-auto">
              {avisoDados && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className={`inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 ${avisoDados.className}`}
                      aria-label={avisoDados.mensagem}
                    >
                      <CircleAlert className="size-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align="end" sideOffset={8}>
                    {avisoDados.mensagem}
                  </TooltipContent>
                </Tooltip>
              )}

              <div ref={seletorDataRef} className="relative min-w-0 flex-1 sm:flex-none">
                <div className="relative w-full sm:w-[250px]">
                  <Input
                    id="periodoDashboard"
                    value={valorDataDashboard}
                    placeholder="dd/mm/aaaa"
                    inputMode="numeric"
                    maxLength={10}
                    onChange={atualizarTextoDataDashboard}
                    onBlur={formatarTextoDataDashboard}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowDown") {
                        event.preventDefault();
                        setCalendarioAberto(true);
                      }
                    }}
                    className="h-10 rounded-xl border-zinc-300 bg-white pl-4 pr-11 text-zinc-950 shadow-sm"
                    aria-label="Data do período do dashboard"
                  />

                  <Button
                    id="periodoDashboardCalendario"
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() =>
                      setCalendarioAberto((abertoAtual) => !abertoAtual)
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 active:translate-y-[-50%]"
                    aria-label="Selecionar data"
                    aria-haspopup="dialog"
                    aria-expanded={calendarioAberto}
                  >
                    <CalendarIcon className="size-4" />
                    <span className="sr-only">Selecionar data</span>
                  </Button>
                </div>

                {calendarioAberto && (
                  <div className="absolute right-0 top-12 z-50 rounded-xl border border-zinc-200 bg-white p-1 shadow-lg">
                    <Calendar
                      mode="single"
                      selected={dataDashboard}
                      month={mesCalendario}
                      onMonthChange={setMesCalendario}
                      onSelect={atualizarDataDashboard}
                      captionLayout="dropdown"
                    />
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="space-y-5">
            {alertaCritico && !carregandoAnalise && (
              <section className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800 shadow-sm">
                <CircleAlert className="mt-0.5 size-5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold">
                    {alertaCritico.titulo || "Alerta financeiro crítico"}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed">
                    {alertaCritico.descricao ||
                      "Há um risco financeiro importante na sua projeção."}
                  </p>
                </div>
              </section>
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

            <section className="grid gap-5 xl:grid-cols-[minmax(280px,0.68fr)_minmax(360px,0.85fr)_minmax(320px,0.85fr)]">
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
