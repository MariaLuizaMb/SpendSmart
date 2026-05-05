import {
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  DollarSign,
  Home as HomeIcon,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  PiggyBank,
  Plus,
  Settings,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { obterUsuario, removerAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ContaCard from "@/components/ui/cardConta";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar-context";
import { Textarea } from "@/components/ui/textarea";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  cadastrarCategoria,
  cadastrarLancamento,
  listarCategorias,
  listarContas,
  listarLancamentos,
} from "@/services/api";

const OPCAO_CATEGORIA_PERSONALIZADA = "__nova_categoria__";
const OPCAO_CONTA_VAZIA = "__sem_conta__";
const contaSemConta = {
  id: OPCAO_CONTA_VAZIA,
  nome: "Sem conta",
  saldoAtual: 0,
};

function formatarMoeda(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarValorMonetarioInput(valor) {
  const digitos = String(valor || "").replace(/\D/g, "");

  if (!digitos) return "";

  return (Number(digitos) / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function converterValorMonetarioParaNumero(valor) {
  if (!valor) return 0;

  const valorNormalizado = String(valor)
    .replace(/\./g, "")
    .replace(",", ".")
    .replace(/[^\d.]/g, "");

  return Number(valorNormalizado);
}

function formatarData(data) {
  if (!data) return "00/00/0000";

  return new Date(data).toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });
}

function obterValorLancamento(lancamento) {
  return Number(lancamento.valor || 0);
}

function obterNomeCategoria(lancamento) {
  return lancamento.categoria?.nome || lancamento.nomeCategoria || "Categoria";
}

function normalizarNomeCategoria(nomeCategoria) {
  return nomeCategoria.toLocaleLowerCase("pt-BR");
}

function formatarValorEixoGrafico(valor) {
  return `R$\u00A0${Number(valor || 0).toLocaleString("pt-BR", {
    maximumFractionDigits: 2,
  })}`;
}

function somarLancamentosPorTipo(lancamentos, tipo) {
  return lancamentos.reduce((total, lancamento) => {
    if (lancamento.tipo?.toUpperCase() !== tipo) return total;

    return total + obterValorLancamento(lancamento);
  }, 0);
}

function obterCategoriaComMaiorDespesa(lancamentos) {
  const totaisPorCategoria = lancamentos.reduce((categorias, lancamento) => {
    const ehDespesa = lancamento.tipo?.toUpperCase() === "DESPESA";

    if (!ehDespesa) return categorias;

    const nome = obterNomeCategoria(lancamento);
    const categoriaNormalizada = normalizarNomeCategoria(nome);
    const categoriaAtual = categorias.get(categoriaNormalizada) || {
      nome,
      total: 0,
    };

    categoriaAtual.total += obterValorLancamento(lancamento);
    categorias.set(categoriaNormalizada, categoriaAtual);

    return categorias;
  }, new Map());

  return (
    Array.from(totaisPorCategoria.values()).sort(
      (categoriaA, categoriaB) => categoriaB.total - categoriaA.total,
    )[0] || {
      nome: "Nenhuma categoria",
      total: 0,
    }
  );
}

function calcularVariacaoPercentual(valorAtual, valorAnterior) {
  if (!valorAnterior) {
    return valorAtual ? 100 : 0;
  }

  return ((valorAtual - valorAnterior) / valorAnterior) * 100;
}

function calcularVariacaoPercentualPorDiferenca(valorAtual, valorAnterior) {
  if (!valorAnterior) {
    if (valorAtual > 0) return 100;
    if (valorAtual < 0) return -100;

    return 0;
  }

  return ((valorAtual - valorAnterior) / Math.abs(valorAnterior)) * 100;
}

function formatarPercentualAbsoluto(valor) {
  return `${Math.abs(valor).toLocaleString("pt-BR", {
    maximumFractionDigits: 0,
  })}%`;
}

function PercentualDescricao({ children, className = "" }) {
  return <span className={`font-bold ${className}`}>{children}</span>;
}

function descreverVariacaoMetrica(
  valorAtual,
  valorAnterior,
  variacao,
  opcoes = {},
) {
  const {
    mensagemZerado = "Manteve zerado em relação ao mês anterior",
    mensagemMantido = "Sem alteração em relação ao mês anterior",
  } = opcoes;

  if (!valorAtual && !valorAnterior) {
    return mensagemZerado;
  }

  if (variacao > 0) {
    return (
      <>
        Aumento de{" "}
        <PercentualDescricao className="text-emerald-600">
          {formatarPercentualAbsoluto(variacao)}
        </PercentualDescricao>{" "}
        em relação ao mês anterior
      </>
    );
  }

  if (variacao < 0) {
    return (
      <>
        Queda de{" "}
        <PercentualDescricao className="text-red-600">
          {formatarPercentualAbsoluto(variacao)}
        </PercentualDescricao>{" "}
        em relação ao mês anterior
      </>
    );
  }

  return mensagemMantido;
}

function obterPassoArredondado(valor) {
  if (!Number.isFinite(valor) || valor <= 0) return 10;

  const grandeza = 10 ** Math.floor(Math.log10(valor));
  const valorNormalizado = valor / grandeza;

  if (valorNormalizado <= 1) return grandeza;
  if (valorNormalizado <= 2) return 2 * grandeza;
  if (valorNormalizado <= 2.5) return 2.5 * grandeza;
  if (valorNormalizado <= 5) return 5 * grandeza;

  return 10 * grandeza;
}

function criarEscalaEixoY(maiorValor, quantidadeTicks = 6) {
  if (!Number.isFinite(maiorValor) || maiorValor <= 0) {
    return {
      limiteSuperior: 300,
      ticks: [50, 100, 150, 200, 250, 300],
    };
  }

  const passo = obterPassoArredondado(maiorValor / quantidadeTicks);
  const ticks = Array.from({ length: quantidadeTicks }, (_, indice) =>
    Number(((indice + 1) * passo).toFixed(2)),
  );

  return {
    limiteSuperior: ticks[ticks.length - 1],
    ticks,
  };
}

function obterIntervaloPorPeriodo(periodo, referencia = new Date()) {
  const ano = referencia.getUTCFullYear();
  const mes = referencia.getUTCMonth();
  const dia = referencia.getUTCDate();

  if (periodo === "semana") {
    const inicio = new Date(Date.UTC(ano, mes, dia));
    const diaSemana = inicio.getUTCDay();
    const distanciaSegunda = diaSemana === 0 ? -6 : 1 - diaSemana;

    inicio.setUTCDate(inicio.getUTCDate() + distanciaSegunda);

    const fim = new Date(inicio);
    fim.setUTCDate(fim.getUTCDate() + 7);

    return { inicio, fim };
  }

  if (periodo === "mes") {
    return {
      inicio: new Date(Date.UTC(ano, mes, 1)),
      fim: new Date(Date.UTC(ano, mes + 1, 1)),
    };
  }

  if (periodo === "ano") {
    return {
      inicio: new Date(Date.UTC(ano, 0, 1)),
      fim: new Date(Date.UTC(ano + 1, 0, 1)),
    };
  }

  return null;
}

function obterIntervaloMesAnterior(referencia = new Date()) {
  const ano = referencia.getUTCFullYear();
  const mes = referencia.getUTCMonth();

  return {
    inicio: new Date(Date.UTC(ano, mes - 1, 1)),
    fim: new Date(Date.UTC(ano, mes, 1)),
  };
}

function filtrarLancamentosPorIntervalo(lancamentos, intervalo) {
  if (!intervalo) return lancamentos;

  return lancamentos.filter((lancamento) => {
    const data = new Date(lancamento.dataTransacao);

    return data >= intervalo.inicio && data < intervalo.fim;
  });
}

function filtrarLancamentosPorPeriodo(lancamentos, periodo) {
  return filtrarLancamentosPorIntervalo(
    lancamentos,
    obterIntervaloPorPeriodo(periodo),
  );
}

function obterDataHojeInput() {
  return formatarDataParaInput(new Date());
}

function formatarDataParaInput(data) {
  if (!data) return "";

  const dataFormatada = new Date(data);
  const ano = dataFormatada.getFullYear();
  const mes = String(dataFormatada.getMonth() + 1).padStart(2, "0");
  const dia = String(dataFormatada.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}

function converterInputParaData(dataInput) {
  if (!dataInput) return undefined;

  const [ano, mes, dia] = dataInput.split("-").map(Number);

  if (!ano || !mes || !dia) return undefined;

  return new Date(ano, mes - 1, dia);
}

function criarFormularioLancamentoInicial(idConta = "") {
  return {
    tipo: "DESPESA",
    idConta,
    idCategoria: "",
    valor: "",
    dataTransacao: obterDataHojeInput(),
    recorrencia: "NENHUMA",
    descricao: "",
  };
}

function obterContaInicialLancamento(contaSelecionada, contas) {
  if (contaSelecionada === OPCAO_CONTA_VAZIA) return "";

  return contaSelecionada || contas[0]?.id || "";
}

export function HomeSidebar({ usuario, paginaAtiva = "home" }) {
  const navigate = useNavigate();
  const { open, setOpen, isMobile, setOpenMobile } = useSidebar();
  const [settingsAberto, setSettingsAberto] = useState(
    paginaAtiva === "contas-bancarias",
  );

  function handleLogoClick() {
    if (!open) {
      setOpen(true);
      return;
    }

    navigate("/home");
  }

  function handleSettingsClick() {
    if (!open && !isMobile) {
      setOpen(true);
      setSettingsAberto(true);
      return;
    }

    setSettingsAberto((aberto) => !aberto);
  }

  function handlePerfilClick() {
    navigate("/perfil");

    if (isMobile) {
      setOpenMobile(false);
    }
  }

  function handleLogout() {
    removerAuth();
    navigate("/");
  }

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="gap-4 p-4">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleLogoClick}
            className="flex min-w-0 items-center gap-3 rounded-md text-left group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:justify-center"
            aria-label={open ? "Ir para a home" : "Abrir menu lateral"}
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-white">
              <WalletCards size={20} />
            </div>

            <div className="min-w-0 group-data-[collapsible=icon]:hidden">
              <p className="truncate text-sm font-bold leading-none">
                SpendSmart
              </p>
              <p className="truncate text-xs text-zinc-600">
                Gestão Financeira
              </p>
            </div>
          </button>

          <SidebarTrigger className="size-8 shrink-0 group-data-[collapsible=icon]:hidden" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={paginaAtiva === "home"}
                  tooltip="Home"
                >
                  <Link to="/home">
                    <HomeIcon />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Dashboard">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={paginaAtiva === "transacoes"}
                  tooltip="Transações"
                >
                  <Link to="/transacoes">
                    <CreditCard />
                    <span>Transações</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Settings"
                  onClick={handleSettingsClick}
                  data-open={settingsAberto}
                >
                  <Settings />
                  <span>Configurações</span>
                  <ChevronDown
                    className={`ml-auto transition-transform group-data-[collapsible=icon]:hidden ${
                      settingsAberto ? "rotate-180" : ""
                    }`}
                  />
                </SidebarMenuButton>

                {settingsAberto && (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={paginaAtiva === "contas-bancarias"}
                      >
                        <Link to="/contas-bancarias">
                          <span>Contas Bancárias</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>

                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>
                        <span>Categorias de Gastos</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <SidebarMenuButton
              size="lg"
              tooltip={usuario?.nome || "Usuário"}
              className="h-12 flex-1 group-data-[collapsible=icon]:flex-none"
              onClick={handlePerfilClick}
            >
              <div className="size-9 shrink-0 rounded-xl bg-zinc-200" />

              <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
                <p className="truncate text-sm font-bold leading-none">
                  {usuario?.nome || "Usuário"}
                </p>
                <p className="truncate text-xs text-zinc-600">
                  {usuario?.email || "m@example.com"}
                </p>
              </div>
            </SidebarMenuButton>

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={handleLogout}
              className="size-8 shrink-0 group-data-[collapsible=icon]:hidden"
              aria-label="Sair da plataforma"
              title="Sair"
            >
              <LogOut />
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

function ListaLancamentos({
  lancamentos,
  carregando,
  erro,
  contas,
  contaSelecionada,
  setContaSelecionada,
  onNovoLancamento,
}) {
  return (
    <section
      data-ui="lista-lancamentos-section"
      className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-b-2xl bg-white px-4 pb-4 pt-4"
    >
      <div
        data-ui="lista-lancamentos-header"
        className="mb-3 flex items-center justify-between gap-3"
      >
        <h2 className="min-w-0 truncate text-sm font-bold">
          Últimas movimentações
        </h2>

        <Select
          textSize="xs"
          value={contaSelecionada || OPCAO_CONTA_VAZIA}
          onValueChange={setContaSelecionada}
        >
          <SelectTrigger className="h-8 w-auto min-w-0 max-w-[45vw] shrink border-zinc-950 bg-zinc-950 px-3 text-xs text-white hover:bg-zinc-900 focus-visible:ring-zinc-400 sm:max-w-44 [&_svg]:text-white">
            <SelectValue placeholder="Sem conta" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={OPCAO_CONTA_VAZIA}>Sem conta</SelectItem>
            {contas.map((conta) => (
              <SelectItem key={conta.id} value={conta.id}>
                {conta.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ScrollArea
        data-ui="lista-lancamentos-conteudo-scroll"
        className="min-h-0 flex-1"
      >
        <ItemGroup
          data-ui="lista-lancamentos-grupo-itens"
          className="flex min-h-full flex-col gap-2 pr-2"
        >
          {carregando && (
            <div
              data-ui="lista-lancamentos-estado-carregando"
              className="flex min-h-[220px] flex-1 items-center justify-center rounded-lg border border-zinc-200 p-4 text-sm text-zinc-500"
            >
              Carregando lançamentos...
            </div>
          )}

          {!carregando && erro && (
            <div
              data-ui="lista-lancamentos-estado-erro"
              className="flex min-h-[220px] flex-1 items-center justify-center rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600"
            >
              {erro}
            </div>
          )}

          {!carregando && !erro && lancamentos.length === 0 && (
            <div
              data-ui="lista-lancamentos-estado-vazio"
              className="flex min-h-[220px] flex-1 items-center justify-center rounded-lg border border-dashed border-zinc-300 p-4 text-center text-sm text-zinc-500"
            >
              Não há movimentações para serem mostradas nesse cartão.
            </div>
          )}

          {!carregando &&
            !erro &&
            lancamentos.map((lancamento) => {
              const tipo = lancamento.tipo?.toUpperCase();
              const valor = obterValorLancamento(lancamento);
              const ehDespesa = tipo === "DESPESA";

              return (
                <Item
                  data-ui="lista-lancamentos-item"
                  key={lancamento.id}
                  variant="outline"
                  className="items-start rounded-lg border-zinc-200 bg-white px-3 py-3"
                >
                  <ItemMedia
                    data-ui="lista-lancamentos-item-icone"
                    variant="icon"
                    className="size-9 rounded-lg bg-linear-to-br from-zinc-500 to-zinc-300"
                  />

                  <ItemContent data-ui="lista-lancamentos-item-textos">
                    <ItemTitle className="text-sm font-semibold">
                      {obterNomeCategoria(lancamento)}
                    </ItemTitle>

                    <ItemDescription className="text-xs text-zinc-500">
                      {formatarData(lancamento.dataTransacao)}
                    </ItemDescription>
                  </ItemContent>

                  <ItemActions
                    data-ui="lista-lancamentos-item-valor"
                    className="ml-auto"
                  >
                    <p
                      className={`whitespace-nowrap text-sm ${
                        ehDespesa ? "text-zinc-500" : "text-emerald-600"
                      }`}
                    >
                      {ehDespesa ? "- " : "+ "}
                      {formatarMoeda(valor)}
                    </p>
                  </ItemActions>
                </Item>
              );
            })}
        </ItemGroup>
      </ScrollArea>

      <div
        data-ui="lista-lancamentos-footer-botao"
        className="mt-4 flex justify-end"
      >
        <Button
          type="button"
          onClick={onNovoLancamento}
          className="h-9 rounded-md bg-zinc-950 px-4 text-xs text-white hover:bg-zinc-800"
        >
          Novo Lançamento
        </Button>
      </div>
    </section>
  );
}

function MetricaCard({
  titulo,
  valor,
  descricao,
  icone,
  variante = "sky",
  dataUi,
  className = "",
}) {
  const estilosPorVariante = {
    sky: {
      gradiente: "from-white via-white to-sky-100",
      bordaIcone: "border-sky-400",
      fundoIcone: "bg-sky-100/70",
      textoIcone: "text-sky-500",
    },
    indigo: {
      gradiente: "from-white via-white to-indigo-100",
      bordaIcone: "border-indigo-400",
      fundoIcone: "bg-indigo-100/70",
      textoIcone: "text-indigo-500",
    },
    emerald: {
      gradiente: "from-white via-white to-emerald-100",
      bordaIcone: "border-emerald-400",
      fundoIcone: "bg-emerald-100/70",
      textoIcone: "text-emerald-500",
    },
    rose: {
      gradiente: "from-white via-white to-rose-100",
      bordaIcone: "border-rose-400",
      fundoIcone: "bg-rose-100/70",
      textoIcone: "text-rose-500",
    },
    orange: {
      gradiente: "from-white via-white to-orange-100",
      bordaIcone: "border-orange-400",
      fundoIcone: "bg-orange-100/70",
      textoIcone: "text-orange-500",
    },
  };

  const estilos = estilosPorVariante[variante] || estilosPorVariante.sky;

  return (
    <Card
      data-ui={dataUi}
      className={`h-full min-h-[136px] overflow-hidden rounded-[18px] border-0 py-3 bg-linear-to-r ${estilos.gradiente} shadow-lg ring-0 sm:min-h-[148px] sm:py-4 lg:min-h-[128px] ${className}`}
    >
      <CardContent className="@container/metrica-card relative flex size-full min-h-0 min-w-0 flex-1 flex-col justify-center px-5 sm:px-6">
        <div
          data-ui={`${dataUi}-icone`}
          className={`absolute right-3 top-3 flex size-8 items-center justify-center rounded-full border-2 sm:right-4 sm:top-0 sm:size-9 ${estilos.bordaIcone} ${estilos.fundoIcone} ${estilos.textoIcone}`}
        >
          {createElement(icone, { size: 18, strokeWidth: 2.1 })}
        </div>

        <div
          data-ui={`${dataUi}-conteudo`}
          className="flex min-h-0 min-w-0 flex-col gap-1.5 sm:gap-2"
        >
          <p className="max-w-full shrink-0 overflow-hidden text-ellipsis whitespace-nowrap pr-10 text-[clamp(0.88rem,3.6cqw,1.15rem)] font-semibold leading-tight text-zinc-950 sm:pr-12">
            {titulo}
          </p>

          <p className="max-w-full shrink-0 overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(1.15rem,6.8cqw,1.9rem)] font-bold leading-none tracking-tight text-zinc-950">
            {valor}
          </p>

          <p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(0.62rem,2.3cqw,0.8rem)] leading-normal text-zinc-900">
            {descricao}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function MetricasCards({ metricas, carregando, erro }) {
  const valorCarregando = carregando ? "Carregando..." : null;

  return (
    <section
      data-ui="home-cards-metricas"
      className="grid gap-5 sm:grid-cols-2 lg:h-full lg:min-h-0 lg:grid-cols-6 lg:grid-rows-2"
    >
      <MetricaCard
        dataUi="card-saldo-mes"
        className="lg:col-span-3"
        titulo="Saldo do mês"
        valor={valorCarregando || formatarMoeda(metricas.saldoMes)}
        descricao={erro || metricas.descricaoSaldo}
        icone={WalletCards}
        variante="sky"
      />

      <MetricaCard
        dataUi="card-maior-categoria"
        className="lg:col-span-3"
        titulo={metricas.maiorCategoriaDespesaNome}
        valor={valorCarregando || formatarMoeda(metricas.maiorCategoriaDespesa)}
        descricao={erro || metricas.descricaoMaiorCategoriaDespesa}
        icone={TrendingUp}
        variante="indigo"
      />

      <MetricaCard
        dataUi="card-receitas-mes"
        className="lg:col-span-2"
        titulo="Receitas do mês"
        valor={valorCarregando || formatarMoeda(metricas.receitasMes)}
        descricao={erro || metricas.descricaoReceitas}
        icone={DollarSign}
        variante="emerald"
      />

      <MetricaCard
        dataUi="card-despesas-mes"
        className="lg:col-span-2"
        titulo="Despesas do mês"
        valor={valorCarregando || formatarMoeda(metricas.despesasMes)}
        descricao={erro || metricas.descricaoDespesas}
        icone={DollarSign}
        variante="rose"
      />

      <MetricaCard
        dataUi="card-orcamento-restante"
        className="lg:col-span-2"
        titulo="Orçamento restante"
        valor={valorCarregando || formatarMoeda(metricas.orcamentoRestante)}
        descricao={erro || metricas.descricaoOrcamentoRestante}
        icone={PiggyBank}
        variante="orange"
      />
    </section>
  );
}

function GraficoLancamentos({
  lancamentos,
  periodo,
  setPeriodo,
  carregando,
  erro,
}) {
  const tituloPorPeriodo = {
    semana: "Lançamentos por Semana",
    mes: "Lançamentos por Mês",
    ano: "Lançamentos por Ano",
  };

  const dadosGrafico = useMemo(() => {
    const gruposPorPeriodo = {
      semana: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
      mes: ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5"],
      ano: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ],
    };

    const grupos = gruposPorPeriodo[periodo] || gruposPorPeriodo.semana;
    const base = grupos.map((rotulo) => ({
      rotulo,
      gastos: 0,
      receitas: 0,
    }));

    lancamentos.forEach((lancamento) => {
      const data = new Date(lancamento.dataTransacao);
      let indice = 0;

      if (periodo === "mes") {
        indice = Math.min(Math.floor((data.getUTCDate() - 1) / 7), 4);
      } else if (periodo === "ano") {
        indice = data.getUTCMonth();
      } else {
        const diaSemana = data.getUTCDay();
        indice = diaSemana === 0 ? 6 : diaSemana - 1;
      }

      const valor = obterValorLancamento(lancamento);

      if (lancamento.tipo?.toUpperCase() === "DESPESA") {
        base[indice].gastos += valor;
      } else {
        base[indice].receitas += valor;
      }
    });

    return base;
  }, [lancamentos, periodo]);

  const escalaEixoY = useMemo(() => {
    const maiorValor = dadosGrafico.reduce(
      (maiorAtual, item) => Math.max(maiorAtual, item.gastos, item.receitas),
      0,
    );

    return criarEscalaEixoY(maiorValor);
  }, [dadosGrafico]);

  const chartConfig = {
    gastos: {
      label: "Gastos",
      color: "#008A78",
    },
    receitas: {
      label: "Receitas",
      color: "#40B8CC",
    },
  };

  return (
    <Card
      data-ui="grafico-lancamentos-card"
      className="flex min-h-[360px] w-full flex-col rounded-2xl border-0 bg-white shadow-lg ring-0 lg:h-full lg:min-h-0 py-0"
    >
      <CardHeader
        data-ui="grafico-lancamentos-header"
        className="grid shrink-0 grid-cols-[1fr_auto] items-start gap-4 px-6 pb-2 pt-5"
      >
        <div className="grid gap-1">
          <CardTitle>{tituloPorPeriodo[periodo]}</CardTitle>
          <CardDescription className="text-xs">
            Comparação entre gastos e receitas no período selecionado.
          </CardDescription>
        </div>

        <Select value={periodo} onValueChange={setPeriodo}>
          <SelectTrigger
            data-ui="grafico-lancamentos-dropdown-trigger"
            className="h-8 w-32"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="semana">Semana</SelectItem>
            <SelectItem value="mes">Mês</SelectItem>
            <SelectItem value="ano">Ano</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent
        data-ui="grafico-lancamentos-conteudo"
        className="min-h-0 flex-1 px-6 pb-5 pt-0"
      >
        {carregando ? (
          <div
            data-ui="grafico-lancamentos-estado-carregando"
            className="flex h-full min-h-[260px] items-center justify-center rounded-lg border border-border text-sm text-muted-foreground lg:min-h-0"
          >
            Carregando lançamentos...
          </div>
        ) : erro ? (
          <div
            data-ui="grafico-lancamentos-estado-erro"
            className="flex h-full min-h-[260px] items-center justify-center rounded-lg border border-destructive/30 bg-destructive/10 px-6 text-center text-sm text-destructive lg:min-h-0"
          >
            {erro}
          </div>
        ) : lancamentos.length === 0 ? (
          <div
            data-ui="grafico-lancamentos-estado-vazio"
            className="flex h-full min-h-[260px] items-center justify-center rounded-lg border border-dashed border-border px-6 text-center text-sm text-muted-foreground lg:min-h-0"
          >
            Não há lançamentos para serem mostrados nesse período.
          </div>
        ) : (
          <ChartContainer
            data-ui="grafico-lancamentos-chart-container"
            config={chartConfig}
            className="h-full min-h-[300px] w-full lg:min-h-0"
          >
            <BarChart
              accessibilityLayer
              data={dadosGrafico}
              barGap={4}
              barCategoryGap={periodo === "ano" ? "28%" : "42%"}
              margin={{ top: 8, right: 8, left: 4, bottom: 4 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <YAxis
                type="number"
                domain={[0, escalaEixoY.limiteSuperior]}
                ticks={escalaEixoY.ticks}
                tickFormatter={formatarValorEixoGrafico}
                tickLine={false}
                axisLine={false}
                interval={0}
                tickMargin={10}
                width={92}
                tick={{ fontSize: 12 }}
              />
              <XAxis
                dataKey="rotulo"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="dashed"
                    formatter={(valor, nome, item) => (
                      <>
                        <div
                          className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                          style={{ backgroundColor: item.color }}
                        />
                        <div className="flex flex-1 justify-between gap-4">
                          <span className="text-muted-foreground">
                            {chartConfig[nome]?.label ?? nome}
                          </span>
                          <span className="font-mono font-medium text-foreground tabular-nums">
                            {formatarMoeda(valor)}
                          </span>
                        </div>
                      </>
                    )}
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="gastos"
                fill="var(--color-gastos)"
                barSize={periodo === "ano" ? 16 : 24}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="receitas"
                fill="var(--color-receitas)"
                barSize={periodo === "ano" ? 16 : 24}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

export function NovoLancamentoDialog({
  aberto,
  onAbertoChange,
  contas,
  contaSelecionada,
  onLancamentoCriado,
}) {
  const [categorias, setCategorias] = useState([]);
  const [formulario, setFormulario] = useState(() =>
    criarFormularioLancamentoInicial(
      obterContaInicialLancamento(contaSelecionada, contas),
    ),
  );
  const [carregandoCategorias, setCarregandoCategorias] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [nomeCategoriaPersonalizada, setNomeCategoriaPersonalizada] =
    useState("");
  const [calendarioAberto, setCalendarioAberto] = useState(false);
  const seletorDataRef = useRef(null);

  const categoriasFiltradas = useMemo(
    () =>
      categorias.filter(
        (categoria) => categoria.tipo?.toUpperCase() === formulario.tipo,
      ),
    [categorias, formulario.tipo],
  );

  const dataSelecionada = useMemo(
    () => converterInputParaData(formulario.dataTransacao),
    [formulario.dataTransacao],
  );

  const carregarCategorias = useCallback(async () => {
    setCarregandoCategorias(true);
    setErro("");

    try {
      const resultado = await listarCategorias();
      setCategorias(resultado);
    } catch (error) {
      setErro(error.message || "Não foi possível carregar as categorias.");
    } finally {
      setCarregandoCategorias(false);
    }
  }, []);

  useEffect(() => {
    if (!aberto) return;

    void Promise.resolve().then(carregarCategorias);
  }, [aberto, carregarCategorias]);

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

  function atualizarCampo(event) {
    const { name, value } = event.target;
    atualizarCampoFormulario(name, value);
  }

  function atualizarCampoFormulario(name, value) {
    if (name === "tipo") {
      setNomeCategoriaPersonalizada("");
    }

    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
      ...(name === "tipo" ? { idCategoria: "" } : {}),
    }));
  }

  function atualizarValorLancamento(event) {
    const valorFormatado = formatarValorMonetarioInput(event.target.value);

    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      valor: valorFormatado,
    }));
  }

  function atualizarDataLancamento(data) {
    if (!data) return;

    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      dataTransacao: formatarDataParaInput(data),
    }));
    setCalendarioAberto(false);
  }

  async function salvarLancamento(event) {
    event.preventDefault();
    setErro("");
    setSucesso("");

    const valor = converterValorMonetarioParaNumero(formulario.valor);

    if (!formulario.idCategoria) {
      setErro("Selecione uma categoria para o lançamento.");
      return;
    }

    if (
      formulario.idCategoria === OPCAO_CATEGORIA_PERSONALIZADA &&
      nomeCategoriaPersonalizada.trim().length < 2
    ) {
      setErro("Informe um nome de categoria com pelo menos 2 caracteres.");
      return;
    }

    if (!Number.isFinite(valor) || valor <= 0) {
      setErro("Informe um valor maior que zero.");
      return;
    }

    if (!formulario.dataTransacao) {
      setErro("Informe a data do lançamento.");
      return;
    }

    setSalvando(true);

    try {
      let idCategoria = formulario.idCategoria;

      if (idCategoria === OPCAO_CATEGORIA_PERSONALIZADA) {
        const categoria = await cadastrarCategoria({
          nome: nomeCategoriaPersonalizada,
          tipo: formulario.tipo,
        });

        idCategoria = categoria.id;
        setCategorias((categoriasAtuais) => {
          const categoriaJaExiste = categoriasAtuais.some(
            (item) => item.id === categoria.id,
          );

          if (categoriaJaExiste) return categoriasAtuais;

          return [...categoriasAtuais, categoria].sort((a, b) =>
            a.nome.localeCompare(b.nome, "pt-BR"),
          );
        });
      }

      await cadastrarLancamento({
        idCategoria,
        idConta: formulario.idConta || undefined,
        valor,
        dataTransacao: formulario.dataTransacao,
        tipo: formulario.tipo,
        recorrencia: formulario.recorrencia,
        descricao: formulario.descricao.trim() || undefined,
      });

      setSucesso("Lançamento cadastrado com sucesso.");
      setFormulario(
        criarFormularioLancamentoInicial(
          obterContaInicialLancamento(contaSelecionada, contas),
        ),
      );
      setNomeCategoriaPersonalizada("");
      await onLancamentoCriado();
      onAbertoChange(false);
    } catch (error) {
      setErro(error.message || "Não foi possível cadastrar o lançamento.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Dialog open={aberto} onOpenChange={onAbertoChange}>
      <DialogContent
        data-ui="modal-novo-lancamento-conteudo"
        className="max-h-[92vh] overflow-hidden p-0 sm:max-w-lg"
      >
        <form
          data-ui="modal-novo-lancamento-formulario"
          onSubmit={salvarLancamento}
          className="flex max-h-[92vh] flex-col"
        >
          <Card className="max-h-[92vh] overflow-hidden border-0 py-0 ring-0">
            <CardHeader className="px-5 pb-2 pt-5">
              <DialogTitle asChild>
                <CardTitle>Novo lançamento</CardTitle>
              </DialogTitle>
              <DialogDescription>
                Informe os dados da movimentação financeira.
              </DialogDescription>
            </CardHeader>

            <ScrollArea className="h-[60vh] max-h-[520px] min-h-0">
              <CardContent className="space-y-4 px-5 py-4 pr-6">
                <div data-ui="modal-linha-tipo-e-valor" className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="tipoLancamento">Tipo</Label>
                    <Select
                      value={formulario.tipo}
                      disabled={salvando}
                      onValueChange={(valor) =>
                        atualizarCampoFormulario("tipo", valor)
                      }
                    >
                      <SelectTrigger id="tipoLancamento">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DESPESA">Despesa</SelectItem>
                        <SelectItem value="RECEITA">Receita</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="valorLancamento">Valor</Label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        R$
                      </span>
                      <Input
                        id="valorLancamento"
                        name="valor"
                        type="text"
                        inputMode="numeric"
                        value={formulario.valor}
                        onChange={atualizarValorLancamento}
                        placeholder="0,00"
                        disabled={salvando}
                        className="h-10 pl-10 pr-3"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="categoriaLancamento">Categoria</Label>
                  <Select
                    value={formulario.idCategoria}
                    disabled={salvando || carregandoCategorias}
                    onValueChange={(valor) =>
                      atualizarCampoFormulario("idCategoria", valor)
                    }
                  >
                    <SelectTrigger id="categoriaLancamento">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {carregandoCategorias && (
                        <SelectItem value="__carregando__" disabled>
                          Carregando...
                        </SelectItem>
                      )}
                      {!carregandoCategorias &&
                        categoriasFiltradas.length === 0 && (
                          <SelectItem value="__sem_categoria__" disabled>
                            Nenhuma categoria encontrada
                          </SelectItem>
                        )}
                      {!carregandoCategorias &&
                        categoriasFiltradas.map((categoria) => (
                          <SelectItem key={categoria.id} value={categoria.id}>
                            {categoria.nome}
                          </SelectItem>
                        ))}
                      {!carregandoCategorias && (
                        <SelectItem value={OPCAO_CATEGORIA_PERSONALIZADA}>
                          Criar nova categoria
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>

                  {formulario.idCategoria === OPCAO_CATEGORIA_PERSONALIZADA && (
                    <div className="space-y-1.5 pt-2">
                      <Label htmlFor="nomeCategoriaPersonalizada">
                        Nome da categoria
                      </Label>
                      <Input
                        id="nomeCategoriaPersonalizada"
                        value={nomeCategoriaPersonalizada}
                        onChange={(event) =>
                          setNomeCategoriaPersonalizada(event.target.value)
                        }
                        placeholder="Ex.: Viagem, Freelance, Mercado"
                        disabled={salvando}
                        className="h-10 px-3"
                        minLength={2}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="contaLancamento">Conta</Label>
                    <Select
                      value={formulario.idConta || OPCAO_CONTA_VAZIA}
                      disabled={salvando}
                      onValueChange={(valor) =>
                        atualizarCampoFormulario(
                          "idConta",
                          valor === OPCAO_CONTA_VAZIA ? "" : valor,
                        )
                      }
                    >
                      <SelectTrigger id="contaLancamento">
                        <SelectValue placeholder="Selecione uma conta" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={OPCAO_CONTA_VAZIA}>
                          Sem conta
                        </SelectItem>
                        {contas.map((conta) => (
                          <SelectItem key={conta.id} value={conta.id}>
                            {conta.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="dataLancamento">Data</Label>
                    <div ref={seletorDataRef} className="relative">
                      <Button
                        id="dataLancamento"
                        type="button"
                        variant="outline"
                        onClick={() =>
                          setCalendarioAberto((abertoAtual) => !abertoAtual)
                        }
                        disabled={salvando}
                        className="h-10 w-full justify-between px-3 text-left font-normal text-zinc-700"
                      >
                        <span>{formatarData(formulario.dataTransacao)}</span>
                        <CalendarDays size={16} />
                      </Button>

                      {calendarioAberto && (
                        <div className="absolute right-0 top-11 z-50 rounded-xl border border-zinc-200 bg-white p-1 shadow-lg">
                          <Calendar
                            mode="single"
                            selected={dataSelecionada}
                            onSelect={atualizarDataLancamento}
                            captionLayout="dropdown"
                            disabled={salvando}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="recorrenciaLancamento">Recorrência</Label>
                  <Select
                    value={formulario.recorrencia}
                    disabled={salvando}
                    onValueChange={(valor) =>
                      atualizarCampoFormulario("recorrencia", valor)
                    }
                  >
                    <SelectTrigger id="recorrenciaLancamento">
                      <SelectValue placeholder="Selecione a recorrência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NENHUMA">Nenhuma</SelectItem>
                      <SelectItem value="DIARIA">Diária</SelectItem>
                      <SelectItem value="SEMANAL">Semanal</SelectItem>
                      <SelectItem value="MENSAL">Mensal</SelectItem>
                      <SelectItem value="ANUAL">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="descricaoLancamento">Descrição</Label>
                  <Textarea
                    id="descricaoLancamento"
                    name="descricao"
                    value={formulario.descricao}
                    onChange={atualizarCampo}
                    placeholder="Observações sobre o lançamento"
                    disabled={salvando}
                    className="min-h-20 px-3"
                  />
                </div>

                {erro && (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {erro}
                  </p>
                )}

                {sucesso && (
                  <p className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                    <CheckCircle2 size={16} />
                    {sucesso}
                  </p>
                )}
              </CardContent>
            </ScrollArea>

            <CardFooter className="justify-end gap-2 border-t-0 bg-transparent px-5 pb-5 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onAbertoChange(false)}
                disabled={salvando}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={salvando || carregandoCategorias}
                className="bg-zinc-950 text-white hover:bg-zinc-800"
              >
                {salvando ? "Salvando..." : "Salvar lançamento"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function Home() {
  const usuario = obterUsuario();

  const [contas, setContas] = useState([]);
  const [contaSelecionada, setContaSelecionada] = useState("");
  const [lancamentosPeriodo, setLancamentosPeriodo] = useState([]);
  const [lancamentosMes, setLancamentosMes] = useState([]);
  const [lancamentosMesAnterior, setLancamentosMesAnterior] = useState([]);
  const [movimentacoesCartao, setMovimentacoesCartao] = useState([]);
  const [periodo, setPeriodo] = useState("semana");
  const [modalLancamentoAberto, setModalLancamentoAberto] = useState(false);

  const [carregandoContas, setCarregandoContas] = useState(false);
  const [carregandoLancamentosPeriodo, setCarregandoLancamentosPeriodo] =
    useState(false);
  const [carregandoMetricas, setCarregandoMetricas] = useState(false);
  const [carregandoMovimentacoes, setCarregandoMovimentacoes] = useState(false);
  const [erroLancamentosPeriodo, setErroLancamentosPeriodo] = useState("");
  const [erroMetricas, setErroMetricas] = useState("");
  const [erroMovimentacoes, setErroMovimentacoes] = useState("");

  const contaAtiva = useMemo(() => {
    if (contaSelecionada === OPCAO_CONTA_VAZIA) return contaSemConta;
    if (!contaSelecionada) return contas[0] || null;

    return (
      contas.find((conta) => conta.id === contaSelecionada) || contas[0] || null
    );
  }, [contas, contaSelecionada]);

  const metricasMes = useMemo(() => {
    const receitasMes = somarLancamentosPorTipo(lancamentosMes, "RECEITA");
    const despesasMes = somarLancamentosPorTipo(lancamentosMes, "DESPESA");
    const receitasMesAnterior = somarLancamentosPorTipo(
      lancamentosMesAnterior,
      "RECEITA",
    );
    const despesasMesAnterior = somarLancamentosPorTipo(
      lancamentosMesAnterior,
      "DESPESA",
    );
    const maiorCategoriaDespesa = obterCategoriaComMaiorDespesa(lancamentosMes);
    const saldoMes = receitasMes - despesasMes;
    const saldoMesAnterior = receitasMesAnterior - despesasMesAnterior;
    const orcamentoRestante = Math.max(receitasMes - despesasMes, 0);
    const percentualMaiorCategoriaDespesa = despesasMes
      ? Math.round((maiorCategoriaDespesa.total / despesasMes) * 100)
      : 0;
    const percentualOrcamentoUsado = receitasMes
      ? Math.round((despesasMes / receitasMes) * 100)
      : 0;
    const variacaoSaldo = calcularVariacaoPercentualPorDiferenca(
      saldoMes,
      saldoMesAnterior,
    );
    const variacaoReceitas = calcularVariacaoPercentual(
      receitasMes,
      receitasMesAnterior,
    );
    const variacaoDespesas = calcularVariacaoPercentual(
      despesasMes,
      despesasMesAnterior,
    );

    return {
      receitasMes,
      despesasMes,
      maiorCategoriaDespesa: maiorCategoriaDespesa.total,
      maiorCategoriaDespesaNome: maiorCategoriaDespesa.nome,
      saldoMes,
      orcamentoRestante,
      percentualMaiorCategoriaDespesa,
      variacaoSaldo,
      variacaoReceitas,
      variacaoDespesas,
      descricaoSaldo: descreverVariacaoMetrica(
        saldoMes,
        saldoMesAnterior,
        variacaoSaldo,
        {
          mensagemZerado: "Saldo zerado em relação ao mês anterior",
          mensagemMantido: "Saldo igual ao mês anterior",
        },
      ),
      descricaoMaiorCategoriaDespesa: despesasMes ? (
        <>
          <PercentualDescricao>
            {percentualMaiorCategoriaDespesa}%
          </PercentualDescricao>{" "}
          das despesas do mês
        </>
      ) : (
        "Sem despesas no mês"
      ),
      descricaoReceitas: descreverVariacaoMetrica(
        receitasMes,
        receitasMesAnterior,
        variacaoReceitas,
        {
          mensagemZerado: "Receita zerada em relação ao mês anterior",
          mensagemMantido: "Receita igual ao mês anterior",
        },
      ),
      descricaoDespesas: descreverVariacaoMetrica(
        despesasMes,
        despesasMesAnterior,
        variacaoDespesas,
        {
          mensagemZerado: "Despesas zeradas em relação ao mês anterior",
          mensagemMantido: "Despesas iguais ao mês anterior",
        },
      ),
      descricaoOrcamentoRestante: receitasMes ? (
        <>
          <PercentualDescricao>{percentualOrcamentoUsado}%</PercentualDescricao>{" "}
          do orçamento utilizado
        </>
      ) : (
        "Sem receitas no mês"
      ),
    };
  }, [lancamentosMes, lancamentosMesAnterior]);

  const carregarContas = useCallback(async () => {
    setCarregandoContas(true);

    try {
      const resultado = await listarContas();
      setContas(resultado);

      setContaSelecionada(
        (contaAtual) =>
          contaAtual || resultado[0]?.id || OPCAO_CONTA_VAZIA,
      );
    } catch (error) {
      console.error("Erro ao carregar contas:", error.message);
    } finally {
      setCarregandoContas(false);
    }
  }, []);

  const carregarLancamentosPeriodo = useCallback(async () => {
    setCarregandoLancamentosPeriodo(true);
    setErroLancamentosPeriodo("");

    try {
      const resultado = await listarLancamentos();
      const lancamentosFiltrados = filtrarLancamentosPorPeriodo(
        resultado,
        periodo,
      );

      setLancamentosPeriodo(lancamentosFiltrados);
    } catch (error) {
      setErroLancamentosPeriodo(
        error.message || "Erro ao carregar lançamentos.",
      );
    } finally {
      setCarregandoLancamentosPeriodo(false);
    }
  }, [periodo]);

  const carregarMetricasMensais = useCallback(async () => {
    setCarregandoMetricas(true);
    setErroMetricas("");

    try {
      const resultado = await listarLancamentos();
      const intervaloMesAtual = obterIntervaloPorPeriodo("mes");
      const intervaloMesAnterior = obterIntervaloMesAnterior();

      setLancamentosMes(
        filtrarLancamentosPorIntervalo(resultado, intervaloMesAtual),
      );
      setLancamentosMesAnterior(
        filtrarLancamentosPorIntervalo(resultado, intervaloMesAnterior),
      );
    } catch (error) {
      setErroMetricas(error.message || "Erro ao carregar métricas.");
    } finally {
      setCarregandoMetricas(false);
    }
  }, []);

  const carregarMovimentacoesCartao = useCallback(async () => {
    if (!contaSelecionada) {
      setMovimentacoesCartao([]);
      setErroMovimentacoes("");
      return;
    }

    setCarregandoMovimentacoes(true);
    setErroMovimentacoes("");

    try {
      const resultado = await listarLancamentos({
        idConta:
          contaSelecionada === OPCAO_CONTA_VAZIA ? undefined : contaSelecionada,
        semConta: contaSelecionada === OPCAO_CONTA_VAZIA ? true : undefined,
        limite: 6,
      });

      setMovimentacoesCartao(resultado);
    } catch (error) {
      setErroMovimentacoes(error.message || "Erro ao carregar movimentações.");
    } finally {
      setCarregandoMovimentacoes(false);
    }
  }, [contaSelecionada]);

  function abrirModalNovoLancamento() {
    setModalLancamentoAberto(true);
  }

  async function atualizarLancamentosAposCadastro() {
    await Promise.all([
      carregarLancamentosPeriodo(),
      carregarMovimentacoesCartao(),
      carregarContas(),
      carregarMetricasMensais(),
    ]);
  }

  useEffect(() => {
    void Promise.resolve().then(carregarContas);
  }, [carregarContas]);

  useEffect(() => {
    void Promise.resolve().then(carregarLancamentosPeriodo);
  }, [carregarLancamentosPeriodo]);

  useEffect(() => {
    void Promise.resolve().then(carregarMetricasMensais);
  }, [carregarMetricasMensais]);

  useEffect(() => {
    void Promise.resolve().then(carregarMovimentacoesCartao);
  }, [carregarMovimentacoesCartao]);

  return (
    <TooltipProvider>
      <SidebarProvider
        data-ui="home-sidebar-provider"
        className="h-screen overflow-hidden bg-[#E9E9E9]"
        style={{
          "--sidebar-width": "17.5rem",
          "--sidebar-width-icon": "4rem",
          "--sidebar-floating-offset": "1rem",
        }}
      >
        <HomeSidebar usuario={usuario} />

        <SidebarInset
          data-ui="home-area-principal"
          className="grid h-screen min-h-0 min-w-0 grid-rows-[auto_minmax(0,1fr)] gap-5 overflow-y-auto bg-[#E9E9E9] p-4 sm:py-4 sm:pl-2 sm:pr-4 lg:overflow-hidden"
        >
          <header data-ui="home-header" className="flex shrink-0 items-start">
            <SidebarTrigger className="mt-1 size-9 shrink-0 md:hidden" />

            <div data-ui="home-header-textos">
              <h1 className="text-2xl font-bold leading-tight text-zinc-950 sm:text-3xl">
                Bem Vindo ao SpendSmart
              </h1>
              <p className="mt-2 text-sm text-zinc-950">
                Olá, {usuario?.nome || "[Nome do Usuário]"}, Bem vindo(a) de
                volta!
              </p>
            </div>
          </header>

          <main
            data-ui="home-container-conteudo"
            className="grid h-full min-h-0 w-full gap-5 lg:grid-cols-[clamp(300px,30%,440px)_minmax(0,1fr)]"
          >
            <section
              data-ui="home-coluna-esquerda-cartao-e-lista"
              className="flex min-h-0 flex-col overflow-hidden rounded-2xl bg-white shadow-lg"
            >
              <div
                data-ui="home-area-card-conta"
                className="shrink-0 overflow-hidden rounded-2xl"
              >
                {carregandoContas ? (
                  <div
                    data-ui="home-card-conta-carregando"
                    className="flex aspect-646/397 items-center justify-center rounded-xl bg-white text-sm text-zinc-500"
                  >
                    Carregando conta...
                  </div>
                ) : (
                  <ContaCard conta={contaAtiva} variant="home" />
                )}
              </div>

              <ListaLancamentos
                lancamentos={movimentacoesCartao}
                carregando={carregandoMovimentacoes}
                erro={erroMovimentacoes}
                contas={contas}
                contaSelecionada={contaSelecionada}
                setContaSelecionada={setContaSelecionada}
                onNovoLancamento={abrirModalNovoLancamento}
              />
            </section>

            <section
              data-ui="home-area-metricas"
              className="flex min-h-0 flex-col gap-5 rounded-2xl lg:grid lg:grid-rows-[minmax(220px,40%)_minmax(320px,1fr)]"
            >
              <MetricasCards
                metricas={metricasMes}
                carregando={carregandoMetricas}
                erro={erroMetricas}
              />

              <GraficoLancamentos
                lancamentos={lancamentosPeriodo}
                periodo={periodo}
                setPeriodo={setPeriodo}
                carregando={carregandoLancamentosPeriodo}
                erro={erroLancamentosPeriodo}
              />
            </section>
          </main>

          {modalLancamentoAberto && (
            <NovoLancamentoDialog
              aberto={modalLancamentoAberto}
              onAbertoChange={setModalLancamentoAberto}
              contas={contas}
              contaSelecionada={contaSelecionada}
              onLancamentoCriado={atualizarLancamentosAposCadastro}
            />
          )}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
