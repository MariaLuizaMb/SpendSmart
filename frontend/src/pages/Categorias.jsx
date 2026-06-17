import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FolderKanban,
  Layers3,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import CategoryFilters, {
  FILTRO_ORIGEM_SISTEMA,
  FILTRO_ORIGEM_TODAS,
  FILTRO_ORIGEM_USUARIO,
  FILTRO_USO_COM_LANCAMENTOS,
  FILTRO_USO_NAO_RECENTE,
  FILTRO_USO_RECENTE,
  FILTRO_USO_SEM_LANCAMENTOS,
  FILTRO_USO_TODAS,
} from "@/components/categorias/CategoryFilters";
import CategoryFormDialog from "@/components/categorias/CategoryFormDialog";
import CategorySummaryCard from "@/components/categorias/CategorySummaryCard";
import CategoriesTable from "@/components/categorias/CategoriesTable";
import {
  categoriaEhSistema,
  normalizarTipoCategoria,
} from "@/components/categorias/category-utils";
import ManagementSwitcher, {
  VISAO_CATEGORIAS,
  VISAO_ORCAMENTOS,
} from "@/components/gerenciamento/ManagementSwitcher";
import BudgetsView from "@/components/orcamentos/BudgetsView";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { obterUsuario } from "@/lib/auth";
import { HomeSidebar, NotificationsMenu } from "@/pages/Home";
import {
  cadastrarCategoria,
  editarCategoria,
  listarCategorias,
  listarLancamentos,
  removerCategoria,
} from "@/services/api";

const DIAS_USO_RECENTE = 30;

function obterIdCategoriaLancamento(lancamento) {
  return lancamento?.idCategoria || lancamento?.categoria?.id || "";
}

function obterTimestampLancamento(lancamento) {
  const data = new Date(lancamento?.dataTransacao).getTime();

  return Number.isFinite(data) ? data : 0;
}

function categoriaUsadaRecentemente(categoria) {
  if (!categoria.ultimaMovimentacao) return false;

  const limite = new Date();
  limite.setDate(limite.getDate() - DIAS_USO_RECENTE);

  return categoria.ultimaMovimentacao >= limite.getTime();
}

function ordenarCategorias(categorias) {
  return [...categorias].sort((categoriaA, categoriaB) => {
    const tipoA = normalizarTipoCategoria(categoriaA.tipo);
    const tipoB = normalizarTipoCategoria(categoriaB.tipo);
    const diferencaTipo = tipoA.localeCompare(tipoB, "pt-BR");

    if (diferencaTipo !== 0) return diferencaTipo;

    return String(categoriaA.nome || "").localeCompare(
      String(categoriaB.nome || ""),
      "pt-BR",
    );
  });
}

function enriquecerCategorias(categorias, lancamentos) {
  const resumoPorCategoria = lancamentos.reduce((resumo, lancamento) => {
    const idCategoria = obterIdCategoriaLancamento(lancamento);

    if (!idCategoria) return resumo;

    const dados = resumo.get(idCategoria) || {
      quantidadeLancamentos: 0,
      ultimaMovimentacao: 0,
    };

    dados.quantidadeLancamentos += 1;
    dados.ultimaMovimentacao = Math.max(
      dados.ultimaMovimentacao,
      obterTimestampLancamento(lancamento),
    );

    resumo.set(idCategoria, dados);

    return resumo;
  }, new Map());

  return ordenarCategorias(
    categorias.map((categoria) => {
      const resumo = resumoPorCategoria.get(categoria.id) || {};

      return {
        ...categoria,
        tipo: normalizarTipoCategoria(categoria.tipo),
        quantidadeLancamentos: resumo.quantidadeLancamentos || 0,
        ultimaMovimentacao: resumo.ultimaMovimentacao || 0,
      };
    }),
  );
}

function criarMapaCodigosCategoria(categorias) {
  const contadores = {
    RECEITA: 0,
    DESPESA: 0,
  };

  return ordenarCategorias(categorias).reduce((mapa, categoria) => {
    const tipo = normalizarTipoCategoria(categoria.tipo);
    const prefixo = tipo === "RECEITA" ? "R" : "D";

    contadores[tipo] += 1;
    mapa.set(categoria.id, `${prefixo}${String(contadores[tipo]).padStart(2, "0")}`);

    return mapa;
  }, new Map());
}

export default function Categorias() {
  const usuario = obterUsuario();
  const navigate = useNavigate();
  const location = useLocation();
  const visaoAtiva =
    location.pathname === "/orcamentos" ? VISAO_ORCAMENTOS : VISAO_CATEGORIAS;
  const [categorias, setCategorias] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtroOrigem, setFiltroOrigem] = useState(FILTRO_ORIGEM_TODAS);
  const [filtroUso, setFiltroUso] = useState(FILTRO_USO_TODAS);
  const [selecionados, setSelecionados] = useState(() => new Set());
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [dialogAberto, setDialogAberto] = useState(false);
  const [categoriaEmEdicao, setCategoriaEmEdicao] = useState(null);
  const [salvandoCategoria, setSalvandoCategoria] = useState(false);
  const [erroFormulario, setErroFormulario] = useState("");
  const [categoriaRemovendo, setCategoriaRemovendo] = useState("");

  const carregarDados = useCallback(async () => {
    setCarregando(true);
    setErro("");

    try {
      const [categoriasResultado, lancamentosResultado] = await Promise.all([
        listarCategorias(),
        listarLancamentos(),
      ]);
      const categoriasEnriquecidas = enriquecerCategorias(
        categoriasResultado || [],
        lancamentosResultado || [],
      );

      setCategorias(categoriasEnriquecidas);
      setSelecionados((selecionadosAtuais) => {
        const idsDisponiveis = new Set(
          categoriasEnriquecidas.map((categoria) => categoria.id),
        );
        const proximos = new Set();

        selecionadosAtuais.forEach((id) => {
          if (idsDisponiveis.has(id)) proximos.add(id);
        });

        return proximos;
      });
    } catch (error) {
      setErro(error.message || "Não foi possível carregar as categorias.");
      setCategorias([]);
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

    return () => {
      window.clearTimeout(timeout);
    };
  }, [mensagemSucesso]);

  const categoriasFiltradas = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");

    return categorias.filter((categoria) => {
      const ehSistema = categoriaEhSistema(categoria);
      const possuiLancamentos = categoria.quantidadeLancamentos > 0;
      const usadaRecentemente = categoriaUsadaRecentemente(categoria);

      if (
        termo &&
        !String(categoria.nome || "").toLocaleLowerCase("pt-BR").includes(termo)
      ) {
        return false;
      }

      if (filtroOrigem === FILTRO_ORIGEM_USUARIO && ehSistema) return false;
      if (filtroOrigem === FILTRO_ORIGEM_SISTEMA && !ehSistema) return false;
      if (filtroUso === FILTRO_USO_COM_LANCAMENTOS && !possuiLancamentos) {
        return false;
      }
      if (filtroUso === FILTRO_USO_SEM_LANCAMENTOS && possuiLancamentos) {
        return false;
      }
      if (filtroUso === FILTRO_USO_RECENTE && !usadaRecentemente) return false;
      if (filtroUso === FILTRO_USO_NAO_RECENTE && usadaRecentemente) {
        return false;
      }

      return true;
    });
  }, [busca, categorias, filtroOrigem, filtroUso]);

  const resumo = useMemo(
    () => ({
      total: categorias.length,
      usuario: categorias.filter((categoria) => !categoriaEhSistema(categoria))
        .length,
      sistema: categorias.filter(categoriaEhSistema).length,
      semLancamentos: categorias.filter(
        (categoria) => categoria.quantidadeLancamentos === 0,
      ).length,
    }),
    [categorias],
  );

  const codigosCategoria = useMemo(
    () => criarMapaCodigosCategoria(categorias),
    [categorias],
  );

  const categoriaSelecionadaUnica = useMemo(() => {
    if (selecionados.size !== 1) return null;

    const [idSelecionado] = Array.from(selecionados);

    return categorias.find((categoria) => categoria.id === idSelecionado) || null;
  }, [categorias, selecionados]);

  const haFiltrosAtivos =
    Boolean(busca.trim()) ||
    filtroOrigem !== FILTRO_ORIGEM_TODAS ||
    filtroUso !== FILTRO_USO_TODAS;

  const todosSelecionados =
    categoriasFiltradas.length > 0 &&
    categoriasFiltradas.every((categoria) => selecionados.has(categoria.id));

  function abrirCriacao() {
    setCategoriaEmEdicao(null);
    setErroFormulario("");
    setDialogAberto(true);
  }

  function abrirEdicao(categoria) {
    setCategoriaEmEdicao(categoria);
    setErroFormulario("");
    setDialogAberto(true);
  }

  function alternarTodasSelecionadas() {
    setSelecionados((selecionadosAtuais) => {
      const proximos = new Set(selecionadosAtuais);

      if (todosSelecionados) {
        categoriasFiltradas.forEach((categoria) => proximos.delete(categoria.id));
        return proximos;
      }

      categoriasFiltradas.forEach((categoria) => proximos.add(categoria.id));

      return proximos;
    });
  }

  function alternarCategoriaSelecionada(idCategoria) {
    setSelecionados((selecionadosAtuais) => {
      const proximos = new Set(selecionadosAtuais);

      if (proximos.has(idCategoria)) {
        proximos.delete(idCategoria);
      } else {
        proximos.add(idCategoria);
      }

      return proximos;
    });
  }

  function limparFiltros() {
    setBusca("");
    setFiltroOrigem(FILTRO_ORIGEM_TODAS);
    setFiltroUso(FILTRO_USO_TODAS);
  }

  function verLancamentosAssociados(categoria) {
    if (!categoria?.id) return;

    navigate(`/transacoes?categoriaId=${encodeURIComponent(categoria.id)}`);
  }

  function alterarVisao(novaVisao) {
    if (novaVisao === VISAO_ORCAMENTOS) {
      navigate("/orcamentos");
      return;
    }

    navigate("/categorias");
  }

  async function salvarCategoria(dados) {
    setErroFormulario("");

    if (dados.nome.length < 2) {
      setErroFormulario("Informe um nome com pelo menos 2 caracteres.");
      return;
    }

    setSalvandoCategoria(true);

    try {
      if (categoriaEmEdicao) {
        await editarCategoria(categoriaEmEdicao.id, dados);
        setMensagemSucesso("Categoria atualizada com sucesso.");
      } else {
        await cadastrarCategoria(dados);
        setMensagemSucesso("Categoria cadastrada com sucesso.");
      }

      setDialogAberto(false);
      setCategoriaEmEdicao(null);
      await carregarDados();
    } catch (error) {
      setErroFormulario(error.message || "Não foi possível salvar a categoria.");
    } finally {
      setSalvandoCategoria(false);
    }
  }

  async function excluirCategoria(categoria) {
    if (!categoria?.id) return;

    setCategoriaRemovendo(categoria.id);
    setErro("");

    try {
      await removerCategoria(categoria.id);
      setSelecionados((selecionadosAtuais) => {
        const proximos = new Set(selecionadosAtuais);
        proximos.delete(categoria.id);
        return proximos;
      });
      setMensagemSucesso("Categoria removida com sucesso.");
      await carregarDados();
    } catch (error) {
      setErro(error.message || "Não foi possível excluir a categoria.");
    } finally {
      setCategoriaRemovendo("");
    }
  }

  return (
    <TooltipProvider>
      <SidebarProvider
        data-ui="categorias-sidebar-provider"
        className="h-screen overflow-hidden bg-[#E9E9E9]"
        style={{
          "--sidebar-width": "17.5rem",
          "--sidebar-width-icon": "4rem",
          "--sidebar-floating-offset": "1rem",
        }}
      >
        <HomeSidebar usuario={usuario} paginaAtiva="categorias" />

        <SidebarInset className="flex h-screen min-h-0 min-w-0 flex-col gap-5 overflow-y-auto bg-[#E9E9E9] p-4 sm:py-4 sm:pl-2 sm:pr-4">
          <header className="flex shrink-0 flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <SidebarTrigger className="mt-1 size-9 shrink-0 md:hidden" />

              <div>
                <h1 className="text-2xl font-bold leading-tight text-zinc-950 sm:text-3xl">
                  {visaoAtiva === VISAO_ORCAMENTOS ? "Orçamentos" : "Categorias"}
                </h1>
                <p className="mt-2 text-sm text-zinc-950">
                  {visaoAtiva === VISAO_ORCAMENTOS
                    ? "Acompanhe seus limites de gastos e veja quanto ainda pode utilizar."
                    : "Cadastre e acompanhe as categorias dentro do sistema"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <NotificationsMenu variant="header" />
              <ManagementSwitcher
                value={visaoAtiva}
                onValueChange={alterarVisao}
              />
            </div>
          </header>

          <main
            className={
              visaoAtiva === VISAO_ORCAMENTOS
                ? "space-y-5"
                : "grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] gap-5"
            }
          >
            {visaoAtiva === VISAO_ORCAMENTOS ? (
              <BudgetsView />
            ) : (
              <>
                <section className="grid shrink-0 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <CategorySummaryCard
                    titulo="Total de Categorias"
                    valor={resumo.total}
                    descricao="Categorias disponíveis para organizar melhor seus lançamentos."
                    icon={Layers3}
                    variante="blue"
                    carregando={carregando}
                  />
                  <CategorySummaryCard
                    titulo="Criadas por Você"
                    valor={resumo.usuario}
                    descricao="Categorias personalizadas criadas e vinculadas à sua conta."
                    icon={FolderKanban}
                    variante="emerald"
                    carregando={carregando}
                  />
                  <CategorySummaryCard
                    titulo="Categorias do Sistema"
                    valor={resumo.sistema}
                    descricao="Categorias padrão do SpendSmart disponíveis para lançamentos."
                    icon={ShieldCheck}
                    variante="amber"
                    carregando={carregando}
                  />
                  <CategorySummaryCard
                    titulo="Sem Lançamentos"
                    valor={resumo.semLancamentos}
                    descricao="Categorias sem histórico de lançamentos associados no sistema."
                    icon={Tag}
                    variante="red"
                    carregando={carregando}
                  />
                </section>

                <Card className="flex h-full min-h-0 flex-col gap-0 rounded-2xl border-0 bg-white shadow-none ring-0">
                  <CardHeader className="gap-3 px-4 pb-3 pt-4">
                    <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                      <CardTitle className="text-base font-bold text-zinc-950">
                        Categorias de lançamentos
                      </CardTitle>

                      <CategoryFilters
                        busca={busca}
                        origem={filtroOrigem}
                        uso={filtroUso}
                        onBuscaChange={setBusca}
                        onOrigemChange={setFiltroOrigem}
                        onUsoChange={setFiltroUso}
                      />
                    </div>

                    {mensagemSucesso && (
                      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                        {mensagemSucesso}
                      </div>
                    )}
                  </CardHeader>

                  <CardContent className="min-h-0 flex-1 px-4 pb-0">
                    <CategoriesTable
                      categorias={categoriasFiltradas}
                      carregando={carregando}
                      erro={erro}
                      haFiltrosAtivos={haFiltrosAtivos}
                      selecionados={selecionados}
                      todosSelecionados={todosSelecionados}
                      codigosCategoria={codigosCategoria}
                      onSelecionarTodas={alternarTodasSelecionadas}
                      onSelecionarCategoria={alternarCategoriaSelecionada}
                      onEditar={abrirEdicao}
                      onRemover={excluirCategoria}
                      onVerLancamentos={verLancamentosAssociados}
                      categoriaRemovendo={categoriaRemovendo}
                    />
                  </CardContent>

                  <CardFooter className="justify-between gap-3 border-0 bg-white px-4 py-4 text-xs text-zinc-500">
                    <span>
                      {selecionados.size} de {categoriasFiltradas.length} categoria
                      {categoriasFiltradas.length === 1 ? "" : "s"} selecionada
                      {selecionados.size === 1 ? "" : "s"}.
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

                      {categoriaSelecionadaUnica && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            verLancamentosAssociados(categoriaSelecionadaUnica)
                          }
                          className="border-zinc-200 bg-white text-xs text-zinc-950 hover:bg-zinc-50"
                        >
                          Ver lançamentos associados
                        </Button>
                      )}

                      <Button
                        type="button"
                        onClick={abrirCriacao}
                        className="bg-zinc-950 text-xs text-white hover:bg-zinc-800"
                      >
                        Nova Categoria
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </>
            )}
          </main>

          {dialogAberto && (
            <CategoryFormDialog
              key={categoriaEmEdicao?.id || "nova-categoria"}
              aberto={dialogAberto}
              categoria={categoriaEmEdicao}
              salvando={salvandoCategoria}
              erro={erroFormulario}
              sucesso=""
              onAbertoChange={(aberto) => {
                setDialogAberto(aberto);
                if (!aberto) setCategoriaEmEdicao(null);
              }}
              onSalvar={salvarCategoria}
            />
          )}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
