import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Eye,
  PiggyBank,
  Plus,
  TrendingDown,
  Wallet,
} from "lucide-react";

import BudgetDetailsDialog from "@/components/orcamentos/BudgetDetailsDialog";
import BudgetFilters, {
  FILTRO_MOVIMENTACAO_TODOS,
  FILTRO_PERIODO_MES_ANTERIOR,
  FILTRO_PERIODO_MES_ATUAL,
  FILTRO_PERIODO_TODOS,
  FILTRO_PERIODO_ULTIMOS_3_MESES,
  FILTRO_STATUS_TODOS,
  FILTRO_TIPO_TODOS,
} from "@/components/orcamentos/BudgetFilters";
import BudgetFormDialog from "@/components/orcamentos/BudgetFormDialog";
import BudgetInsightsCard from "@/components/orcamentos/BudgetInsightsCard";
import BudgetSummaryCard from "@/components/orcamentos/BudgetSummaryCard";
import BudgetUsageCard from "@/components/orcamentos/BudgetUsageCard";
import BudgetsTable from "@/components/orcamentos/BudgetsTable";
import {
  STATUS_ORCAMENTO,
  calcularUsoOrcamento,
  formatarMoeda,
  obterMesAnoAtual,
  obterNomeOrcamento,
  obterTipoOrcamento,
  paraNumero,
} from "@/components/orcamentos/budget-utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  cadastrarOrcamento,
  editarOrcamento,
  listarCategorias,
  listarLancamentos,
  listarOrcamentos,
  removerOrcamento,
} from "@/services/api";

function obterMesAnoAnterior() {
  const atual = obterMesAnoAtual();
  const data = new Date(atual.ano, atual.mes - 2, 1);

  return {
    mes: data.getMonth() + 1,
    ano: data.getFullYear(),
  };
}

function estaNoFiltroPeriodo(orcamento, filtroPeriodo) {
  const mes = Number(orcamento?.mes);
  const ano = Number(orcamento?.ano);
  const atual = obterMesAnoAtual();
  const anterior = obterMesAnoAnterior();

  if (filtroPeriodo === FILTRO_PERIODO_TODOS) return true;
  if (filtroPeriodo === FILTRO_PERIODO_MES_ATUAL) {
    return mes === atual.mes && ano === atual.ano;
  }
  if (filtroPeriodo === FILTRO_PERIODO_MES_ANTERIOR) {
    return mes === anterior.mes && ano === anterior.ano;
  }
  if (filtroPeriodo === FILTRO_PERIODO_ULTIMOS_3_MESES) {
    return Array.from({ length: 3 }).some((_, indice) => {
      const data = new Date(atual.ano, atual.mes - 1 - indice, 1);

      return mes === data.getMonth() + 1 && ano === data.getFullYear();
    });
  }

  return true;
}

function criarOrcamentoGeralGrafico(orcamentosMes) {
  const geralReal = orcamentosMes.find((orcamento) => !orcamento.idCategoria);

  if (geralReal) return { ...geralReal, id: "grafico-geral" };
  if (orcamentosMes.length === 0) return null;

  const limite = orcamentosMes.reduce(
    (total, orcamento) => total + paraNumero(orcamento.limite),
    0,
  );
  const utilizado = orcamentosMes.reduce(
    (total, orcamento) => total + paraNumero(orcamento.utilizado),
    0,
  );
  const percentual = limite ? (utilizado / limite) * 100 : 0;

  return {
    id: "grafico-geral",
    idCategoria: null,
    categoria: null,
    mes: orcamentosMes[0]?.mes,
    ano: orcamentosMes[0]?.ano,
    valor: limite,
    limite,
    utilizado,
    restante: limite - utilizado,
    percentual,
    status:
      percentual > 100
        ? STATUS_ORCAMENTO.ULTRAPASSADO
        : percentual > 85
          ? STATUS_ORCAMENTO.CRITICO
          : percentual > 60
            ? STATUS_ORCAMENTO.ATENCAO
            : STATUS_ORCAMENTO.SEGURO,
    lancamentosAssociados: orcamentosMes.flatMap(
      (orcamento) => orcamento.lancamentosAssociados || [],
    ),
  };
}

export default function BudgetsView() {
  const [categorias, setCategorias] = useState([]);
  const [orcamentos, setOrcamentos] = useState([]);
  const [lancamentos, setLancamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState(FILTRO_STATUS_TODOS);
  const [filtroTipo, setFiltroTipo] = useState(FILTRO_TIPO_TODOS);
  const [filtroMovimentacao, setFiltroMovimentacao] = useState(
    FILTRO_MOVIMENTACAO_TODOS,
  );
  const [filtroPeriodo, setFiltroPeriodo] = useState(FILTRO_PERIODO_MES_ATUAL);
  const [selecionados, setSelecionados] = useState(() => new Set());
  const [orcamentoGraficoId, setOrcamentoGraficoId] = useState("");
  const [dialogFormularioAberto, setDialogFormularioAberto] = useState(false);
  const [orcamentoEmEdicao, setOrcamentoEmEdicao] = useState(null);
  const [salvandoOrcamento, setSalvandoOrcamento] = useState(false);
  const [erroFormulario, setErroFormulario] = useState("");
  const [orcamentoRemovendo, setOrcamentoRemovendo] = useState("");
  const [orcamentoDetalhes, setOrcamentoDetalhes] = useState(null);

  const carregarDados = useCallback(async () => {
    setCarregando(true);
    setErro("");

    try {
      const [categoriasResultado, orcamentosResultado, lancamentosResultado] =
        await Promise.all([
          listarCategorias(),
          listarOrcamentos(),
          listarLancamentos(),
        ]);

      setCategorias(categoriasResultado || []);
      setOrcamentos(orcamentosResultado || []);
      setLancamentos(lancamentosResultado || []);
    } catch (error) {
      setErro(error.message || "Não foi possível carregar os orçamentos.");
      setOrcamentos([]);
      setLancamentos([]);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(carregarDados);
  }, [carregarDados]);

  useEffect(() => {
    if (!mensagemSucesso) return undefined;

    const timeout = window.setTimeout(() => {
      setMensagemSucesso("");
    }, 4000);

    return () => window.clearTimeout(timeout);
  }, [mensagemSucesso]);

  const orcamentosEnriquecidos = useMemo(
    () =>
      (orcamentos || []).map((orcamento) =>
        calcularUsoOrcamento(orcamento, lancamentos),
      ),
    [lancamentos, orcamentos],
  );

  const atual = obterMesAnoAtual();
  const orcamentosMesAtual = useMemo(
    () =>
      orcamentosEnriquecidos.filter(
        (orcamento) =>
          Number(orcamento.mes) === atual.mes &&
          Number(orcamento.ano) === atual.ano,
      ),
    [atual.ano, atual.mes, orcamentosEnriquecidos],
  );
  const orcamentoGeralGrafico = useMemo(
    () => criarOrcamentoGeralGrafico(orcamentosMesAtual),
    [orcamentosMesAtual],
  );
  const opcoesGrafico = useMemo(() => {
    const categoriasComOrcamento = orcamentosMesAtual.filter(
      (orcamento) => orcamento.idCategoria,
    );

    return [
      ...(orcamentoGeralGrafico ? [orcamentoGeralGrafico] : []),
      ...categoriasComOrcamento,
    ];
  }, [orcamentoGeralGrafico, orcamentosMesAtual]);

  const orcamentoGraficoIdEfetivo = opcoesGrafico.some(
    (orcamento) => orcamento.id === orcamentoGraficoId,
  )
    ? orcamentoGraficoId
    : opcoesGrafico[0]?.id || "";
  const orcamentoGrafico =
    opcoesGrafico.find((orcamento) => orcamento.id === orcamentoGraficoIdEfetivo) ||
    opcoesGrafico[0] ||
    null;

  const resumo = useMemo(() => {
    const total = orcamentosMesAtual.reduce(
      (soma, orcamento) => soma + paraNumero(orcamento.limite),
      0,
    );
    const utilizado = orcamentosMesAtual.reduce(
      (soma, orcamento) => soma + paraNumero(orcamento.utilizado),
      0,
    );
    const restante = total - utilizado;
    const alertas = orcamentosMesAtual.filter(
      (orcamento) => orcamento.status !== STATUS_ORCAMENTO.SEGURO,
    ).length;

    return { total, utilizado, restante, alertas };
  }, [orcamentosMesAtual]);

  const orcamentosFiltrados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");

    return orcamentosEnriquecidos.filter((orcamento) => {
      const nome = obterNomeOrcamento(orcamento).toLocaleLowerCase("pt-BR");
      const tipo = obterTipoOrcamento(orcamento).toUpperCase();
      const possuiMovimentacao = (orcamento.lancamentosAssociados || []).length > 0;

      if (termo && !nome.includes(termo)) return false;
      if (filtroStatus !== FILTRO_STATUS_TODOS && orcamento.status !== filtroStatus) {
        return false;
      }
      if (filtroTipo !== FILTRO_TIPO_TODOS && tipo !== filtroTipo) return false;
      if (filtroMovimentacao === "com" && !possuiMovimentacao) return false;
      if (filtroMovimentacao === "sem" && possuiMovimentacao) return false;
      if (!estaNoFiltroPeriodo(orcamento, filtroPeriodo)) return false;

      return true;
    });
  }, [
    busca,
    filtroMovimentacao,
    filtroPeriodo,
    filtroStatus,
    filtroTipo,
    orcamentosEnriquecidos,
  ]);

  const idsOrcamentosFiltrados = useMemo(
    () => new Set(orcamentosFiltrados.map((orcamento) => orcamento.id)),
    [orcamentosFiltrados],
  );
  const selecionadosVisiveis = useMemo(() => {
    const proximos = new Set();

    selecionados.forEach((id) => {
      if (idsOrcamentosFiltrados.has(id)) proximos.add(id);
    });

    return proximos;
  }, [idsOrcamentosFiltrados, selecionados]);
  const todosSelecionados =
    orcamentosFiltrados.length > 0 &&
    orcamentosFiltrados.every((orcamento) =>
      selecionadosVisiveis.has(orcamento.id),
    );
  const orcamentoSelecionadoUnico = useMemo(() => {
    if (selecionadosVisiveis.size !== 1) return null;

    const [idSelecionado] = Array.from(selecionadosVisiveis);

    return (
      orcamentosEnriquecidos.find((orcamento) => orcamento.id === idSelecionado) ||
      null
    );
  }, [orcamentosEnriquecidos, selecionadosVisiveis]);
  const haFiltrosAtivos =
    Boolean(busca.trim()) ||
    filtroStatus !== FILTRO_STATUS_TODOS ||
    filtroTipo !== FILTRO_TIPO_TODOS ||
    filtroMovimentacao !== FILTRO_MOVIMENTACAO_TODOS ||
    filtroPeriodo !== FILTRO_PERIODO_MES_ATUAL;

  function limparFiltros() {
    setBusca("");
    setFiltroStatus(FILTRO_STATUS_TODOS);
    setFiltroTipo(FILTRO_TIPO_TODOS);
    setFiltroMovimentacao(FILTRO_MOVIMENTACAO_TODOS);
    setFiltroPeriodo(FILTRO_PERIODO_MES_ATUAL);
  }

  function alternarTodosSelecionados() {
    setSelecionados((selecionadosAtuais) => {
      const proximos = new Set(selecionadosAtuais);

      if (todosSelecionados) {
        orcamentosFiltrados.forEach((orcamento) => proximos.delete(orcamento.id));
        return proximos;
      }

      orcamentosFiltrados.forEach((orcamento) => proximos.add(orcamento.id));

      return proximos;
    });
  }

  function alternarOrcamentoSelecionado(idOrcamento) {
    setSelecionados((selecionadosAtuais) => {
      const proximos = new Set(selecionadosAtuais);

      if (proximos.has(idOrcamento)) {
        proximos.delete(idOrcamento);
      } else {
        proximos.add(idOrcamento);
      }

      return proximos;
    });
  }

  function abrirCriacao() {
    setOrcamentoEmEdicao(null);
    setErroFormulario("");
    setDialogFormularioAberto(true);
  }

  function abrirEdicao(orcamento) {
    setOrcamentoEmEdicao(orcamento);
    setErroFormulario("");
    setDialogFormularioAberto(true);
  }

  function abrirDetalhes(orcamento) {
    setOrcamentoDetalhes(orcamento);
  }

  async function salvarOrcamento(dados) {
    setErroFormulario("");

    if (!Number.isFinite(dados.valor) || dados.valor <= 0) {
      setErroFormulario("Informe um valor maior que zero.");
      return;
    }

    if (!Number.isInteger(dados.mes) || dados.mes < 1 || dados.mes > 12) {
      setErroFormulario("Selecione um mês válido.");
      return;
    }

    if (!Number.isInteger(dados.ano) || dados.ano < 1900 || dados.ano > 9999) {
      setErroFormulario("Informe um ano válido.");
      return;
    }

    if (dados.idCategoria === "__orcamento_geral__" || dados.idCategoria === "__sem_categorias__") {
      setErroFormulario("Selecione uma categoria de despesa para este orçamento.");
      return;
    }

    setSalvandoOrcamento(true);

    try {
      if (orcamentoEmEdicao) {
        await editarOrcamento(orcamentoEmEdicao.id, dados);
        setMensagemSucesso("Orçamento atualizado com sucesso.");
      } else {
        await cadastrarOrcamento(dados);
        setMensagemSucesso("Orçamento cadastrado com sucesso.");
      }

      setDialogFormularioAberto(false);
      setOrcamentoEmEdicao(null);
      await carregarDados();
    } catch (error) {
      setErroFormulario(error.message || "Não foi possível salvar o orçamento.");
    } finally {
      setSalvandoOrcamento(false);
    }
  }

  async function excluirOrcamento(orcamento) {
    if (!orcamento?.id) return;

    setOrcamentoRemovendo(orcamento.id);
    setErro("");

    try {
      await removerOrcamento(orcamento.id);
      setSelecionados((selecionadosAtuais) => {
        const proximos = new Set(selecionadosAtuais);
        proximos.delete(orcamento.id);
        return proximos;
      });
      setMensagemSucesso("Orçamento removido com sucesso.");
      await carregarDados();
    } catch (error) {
      setErro(error.message || "Não foi possível excluir o orçamento.");
    } finally {
      setOrcamentoRemovendo("");
    }
  }

  return (
    <>
      <section className="grid shrink-0 gap-4 xl:grid-cols-[minmax(0,380px)_minmax(420px,1fr)] xl:items-stretch">
        <BudgetUsageCard
          orcamentos={opcoesGrafico}
          orcamentoSelecionado={orcamentoGrafico}
          onOrcamentoSelecionadoChange={setOrcamentoGraficoId}
          carregando={carregando}
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:h-full xl:grid-cols-2 xl:grid-rows-2">
          <BudgetSummaryCard
            titulo="Orçamento Total"
            valor={formatarMoeda(resumo.total)}
            descricao="Total definido para este mês"
            icon={PiggyBank}
            variante="blue"
            carregando={carregando}
          />
          <BudgetSummaryCard
            titulo="Total Utilizado"
            valor={formatarMoeda(resumo.utilizado)}
            descricao="Valor consumido até o momento"
            icon={TrendingDown}
            variante="red"
            carregando={carregando}
          />
          <BudgetSummaryCard
            titulo="Valor Restante"
            valor={formatarMoeda(resumo.restante)}
            descricao="Disponível até o fim do período"
            icon={Wallet}
            variante="emerald"
            carregando={carregando}
          />
          <BudgetSummaryCard
            titulo="Orçamentos em Alerta"
            valor={resumo.alertas}
            descricao="Categorias precisam de atenção"
            icon={AlertTriangle}
            variante="amber"
            carregando={carregando}
          />
        </div>
      </section>

      <BudgetInsightsCard
        orcamentoGeral={orcamentoGeralGrafico}
        orcamentos={orcamentosMesAtual}
      />

      <Card className="flex min-h-[560px] flex-1 flex-col gap-0 rounded-2xl border-0 bg-white shadow-none ring-0">
        <CardHeader className="gap-3 px-4 pb-3 pt-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <CardTitle className="text-base font-bold text-zinc-950">
              Orçamentos criados
            </CardTitle>

            <BudgetFilters
              busca={busca}
              status={filtroStatus}
              tipo={filtroTipo}
              movimentacao={filtroMovimentacao}
              periodo={filtroPeriodo}
              onBuscaChange={setBusca}
              onStatusChange={setFiltroStatus}
              onTipoChange={setFiltroTipo}
              onMovimentacaoChange={setFiltroMovimentacao}
              onPeriodoChange={setFiltroPeriodo}
            />
          </div>

          {mensagemSucesso && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {mensagemSucesso}
            </div>
          )}
        </CardHeader>

        <CardContent className="min-h-0 flex-1 px-4 pb-0">
          <BudgetsTable
            orcamentos={orcamentosFiltrados}
            carregando={carregando}
            erro={erro}
            haFiltrosAtivos={haFiltrosAtivos}
            selecionados={selecionadosVisiveis}
            todosSelecionados={todosSelecionados}
            onSelecionarTodos={alternarTodosSelecionados}
            onSelecionarOrcamento={alternarOrcamentoSelecionado}
            onVerDetalhes={abrirDetalhes}
            onEditar={abrirEdicao}
            onRemover={excluirOrcamento}
            orcamentoRemovendo={orcamentoRemovendo}
          />
        </CardContent>

        <CardFooter className="justify-between gap-3 border-0 bg-white px-4 py-4 text-xs text-zinc-500">
          <span>
            {selecionadosVisiveis.size} de {orcamentosFiltrados.length} orçamento
            {orcamentosFiltrados.length === 1 ? "" : "s"} selecionado
            {selecionadosVisiveis.size === 1 ? "" : "s"}.
          </span>

          <div className="flex shrink-0 flex-wrap justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={limparFiltros}
              disabled={!haFiltrosAtivos}
              className="border-zinc-200 bg-white text-xs text-zinc-950 hover:bg-zinc-50"
            >
              Limpar filtros
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => abrirDetalhes(orcamentoSelecionadoUnico)}
              disabled={!orcamentoSelecionadoUnico}
              className="border-zinc-200 bg-white text-xs text-zinc-950 hover:bg-zinc-50"
            >
              <Eye size={14} />
              Ver detalhes
            </Button>

            <Button
              type="button"
              onClick={abrirCriacao}
              className="bg-zinc-950 text-xs text-white hover:bg-zinc-800"
            >
              <Plus size={14} />
              Novo Orçamento
            </Button>
          </div>
        </CardFooter>
      </Card>

      {dialogFormularioAberto && (
        <BudgetFormDialog
          key={orcamentoEmEdicao?.id || "novo-orcamento"}
          aberto={dialogFormularioAberto}
          onAbertoChange={(aberto) => {
            setDialogFormularioAberto(aberto);
            if (!aberto) setOrcamentoEmEdicao(null);
          }}
          orcamento={orcamentoEmEdicao}
          categorias={categorias}
          salvando={salvandoOrcamento}
          erro={erroFormulario}
          sucesso=""
          onSalvar={salvarOrcamento}
        />
      )}

      <BudgetDetailsDialog
        aberto={Boolean(orcamentoDetalhes)}
        orcamento={orcamentoDetalhes}
        onAbertoChange={(aberto) => {
          if (!aberto) setOrcamentoDetalhes(null);
        }}
      />
    </>
  );
}
