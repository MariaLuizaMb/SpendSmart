import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowDownUp,
  ArrowUpDown,
  CalendarDays,
  CreditCard,
  LoaderCircle,
  Plus,
  Search,
} from "lucide-react";

import { NovoLancamentoDialog, HomeSidebar } from "@/pages/Home";
import { obterUsuario } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
import { listarContas, listarLancamentos } from "@/services/api";

const opcoesOrdenacao = [
  { value: "recentes", label: "Recentes" },
  { value: "antigas", label: "Antigas" },
  { value: "maior-valor", label: "Maior valor" },
  { value: "menor-valor", label: "Menor valor" },
];

function formatarMoeda(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarData(data) {
  if (!data) return "00/00/0000";

  return new Date(data).toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });
}

function formatarTipo(tipo) {
  const tipoNormalizado = String(tipo || "").toUpperCase();

  return (
    {
      RECEITA: "Receita",
      DESPESA: "Despesa",
      INVESTIMENTO: "Investimento",
    }[tipoNormalizado] || "Transação"
  );
}

function obterNomeCategoria(lancamento) {
  return lancamento.categoria?.nome || lancamento.nomeCategoria || "Categoria";
}

function obterCodigoTransacao(lancamento, indice) {
  if (lancamento.codigo) return lancamento.codigo;

  const prefixo = formatarTipo(lancamento.tipo).charAt(0).toUpperCase() || "T";

  return `${prefixo}${String(indice + 1).padStart(2, "0")}`;
}

function obterTimestamp(lancamento) {
  const data = new Date(lancamento.dataTransacao).getTime();

  return Number.isFinite(data) ? data : 0;
}

function obterValor(lancamento) {
  return Number(lancamento.valor || 0);
}

function BadgeCategoria({ children }) {
  return (
    <span className="inline-flex h-6 items-center rounded-md border border-violet-300 bg-violet-100 px-2 text-xs font-medium text-violet-700">
      {children}
    </span>
  );
}

function CheckboxTabela({ checked, onChange, label }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      aria-label={label}
      className="size-4 rounded border-zinc-300 text-zinc-950 accent-zinc-950"
    />
  );
}

function ordenarLancamentos(lancamentos, ordenacao) {
  return [...lancamentos].sort((a, b) => {
    if (ordenacao === "antigas") {
      return obterTimestamp(a) - obterTimestamp(b);
    }

    if (ordenacao === "maior-valor") {
      return obterValor(b) - obterValor(a);
    }

    if (ordenacao === "menor-valor") {
      return obterValor(a) - obterValor(b);
    }

    return obterTimestamp(b) - obterTimestamp(a);
  });
}

export default function Transacoes() {
  const usuario = obterUsuario();
  const [lancamentos, setLancamentos] = useState([]);
  const [contas, setContas] = useState([]);
  const [contaSelecionada, setContaSelecionada] = useState("");
  const [filtro, setFiltro] = useState("");
  const [ordenacao, setOrdenacao] = useState("recentes");
  const [selecionados, setSelecionados] = useState(() => new Set());
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [modalLancamentoAberto, setModalLancamentoAberto] = useState(false);

  const carregarDados = useCallback(async () => {
    setCarregando(true);
    setErro("");

    try {
      const [lancamentosResultado, contasResultado] = await Promise.all([
        listarLancamentos(),
        listarContas(),
      ]);

      setLancamentos(lancamentosResultado);
      setContas(contasResultado);
      setContaSelecionada((contaAtual) => contaAtual || contasResultado[0]?.id || "");
    } catch (error) {
      setErro(error.message || "Não foi possível carregar as transações.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(carregarDados);
  }, [carregarDados]);

  const lancamentosFiltrados = useMemo(() => {
    const termo = filtro.trim().toLocaleLowerCase("pt-BR");
    const filtrados = termo
      ? lancamentos.filter((lancamento, indice) => {
          const textoBusca = [
            obterCodigoTransacao(lancamento, indice),
            formatarTipo(lancamento.tipo),
            obterNomeCategoria(lancamento),
            formatarMoeda(lancamento.valor),
            formatarData(lancamento.dataTransacao),
            lancamento.descricao,
          ]
            .filter(Boolean)
            .join(" ")
            .toLocaleLowerCase("pt-BR");

          return textoBusca.includes(termo);
        })
      : lancamentos;

    return ordenarLancamentos(filtrados, ordenacao);
  }, [filtro, lancamentos, ordenacao]);

  const todosSelecionados =
    lancamentosFiltrados.length > 0 &&
    lancamentosFiltrados.every((lancamento) => selecionados.has(lancamento.id));

  function alternarTodosSelecionados() {
    setSelecionados((selecionadosAtuais) => {
      const proximos = new Set(selecionadosAtuais);

      if (todosSelecionados) {
        lancamentosFiltrados.forEach((lancamento) => proximos.delete(lancamento.id));
        return proximos;
      }

      lancamentosFiltrados.forEach((lancamento) => proximos.add(lancamento.id));
      return proximos;
    });
  }

  function alternarSelecionado(idLancamento) {
    setSelecionados((selecionadosAtuais) => {
      const proximos = new Set(selecionadosAtuais);

      if (proximos.has(idLancamento)) {
        proximos.delete(idLancamento);
      } else {
        proximos.add(idLancamento);
      }

      return proximos;
    });
  }

  async function atualizarAposCadastro() {
    await carregarDados();
  }

  return (
    <TooltipProvider>
      <SidebarProvider
        data-ui="transacoes-sidebar-provider"
        className="h-screen overflow-hidden bg-[#E9E9E9]"
        style={{
          "--sidebar-width": "17.5rem",
          "--sidebar-width-icon": "4rem",
          "--sidebar-floating-offset": "1rem",
        }}
      >
        <HomeSidebar usuario={usuario} paginaAtiva="transacoes" />

        <SidebarInset
          data-ui="transacoes-area-principal"
          className="grid h-screen min-h-0 min-w-0 grid-rows-[auto_minmax(0,1fr)] gap-5 overflow-y-auto bg-[#E9E9E9] p-4 sm:py-4 sm:pl-2 sm:pr-4 lg:overflow-hidden"
        >
          <header className="flex shrink-0 items-start">
            <SidebarTrigger className="mt-1 size-9 shrink-0 md:hidden" />

            <div>
              <h1 className="text-2xl font-bold leading-tight text-zinc-950 sm:text-3xl">
                Transações
              </h1>
              <p className="mt-2 text-sm text-zinc-950">
                Visualize seu histórico de transações completo.
              </p>
            </div>
          </header>

          <main className="min-h-0">
            <Card className="h-full min-h-0 gap-0 rounded-2xl border-0 bg-white shadow-none ring-0">
              <CardHeader className="gap-3 px-4 pb-3 pt-4 sm:flex sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-sm">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
                  <Input
                    value={filtro}
                    onChange={(event) => setFiltro(event.target.value)}
                    placeholder="Filtros"
                    className="h-10 rounded-lg pl-9"
                  />
                </div>

                <Select value={ordenacao} onValueChange={setOrdenacao}>
                  <SelectTrigger className="h-10 w-full sm:w-32">
                    <SelectValue placeholder="Ordenar" />
                  </SelectTrigger>
                  <SelectContent align="end">
                    {opcoesOrdenacao.map((opcao) => (
                      <SelectItem key={opcao.value} value={opcao.value}>
                        {opcao.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardHeader>

              <CardContent className="min-h-0 flex-1 px-4 pb-0">
                <ScrollArea className="h-full rounded-lg border border-zinc-200">
                  <div className="min-w-[860px]">
                    <table className="w-full border-collapse text-left text-sm">
                      <thead className="sticky top-0 z-10 bg-white">
                        <tr className="border-b border-zinc-200 text-xs font-medium text-zinc-950">
                          <th className="w-10 px-3 py-3">
                            <CheckboxTabela
                              checked={todosSelecionados}
                              onChange={alternarTodosSelecionados}
                              label="Selecionar todas as transações"
                            />
                          </th>
                          <th className="px-3 py-3">Id Transação</th>
                          <th className="px-3 py-3">
                            <span className="inline-flex items-center gap-1">
                              Tipo <ArrowUpDown size={12} />
                            </span>
                          </th>
                          <th className="px-3 py-3">
                            <span className="inline-flex items-center gap-1">
                              Valor <ArrowDownUp size={12} />
                            </span>
                          </th>
                          <th className="px-3 py-3">
                            <span className="inline-flex items-center gap-1">
                              Categoria <ArrowUpDown size={12} />
                            </span>
                          </th>
                          <th className="px-3 py-3">
                            <span className="inline-flex items-center gap-1">
                              Data <CalendarDays size={12} />
                            </span>
                          </th>
                          <th className="w-24 px-3 py-3" />
                        </tr>
                      </thead>

                      <tbody>
                        {carregando && (
                          <tr>
                            <td colSpan={7} className="h-80 text-center text-sm text-zinc-500">
                              <LoaderCircle className="mx-auto mb-2 animate-spin" size={20} />
                              Carregando transações...
                            </td>
                          </tr>
                        )}

                        {!carregando && erro && (
                          <tr>
                            <td colSpan={7} className="h-80 text-center text-sm text-red-600">
                              {erro}
                            </td>
                          </tr>
                        )}

                        {!carregando && !erro && lancamentosFiltrados.length === 0 && (
                          <tr>
                            <td colSpan={7} className="h-80 text-center text-sm text-zinc-500">
                              Nenhuma transação encontrada.
                            </td>
                          </tr>
                        )}

                        {!carregando &&
                          !erro &&
                          lancamentosFiltrados.map((lancamento, indice) => (
                            <tr
                              key={lancamento.id}
                              className="border-b border-zinc-200 text-xs text-zinc-950 last:border-b-0 hover:bg-zinc-50"
                            >
                              <td className="px-3 py-3">
                                <CheckboxTabela
                                  checked={selecionados.has(lancamento.id)}
                                  onChange={() => alternarSelecionado(lancamento.id)}
                                  label={`Selecionar transação ${obterCodigoTransacao(
                                    lancamento,
                                    indice,
                                  )}`}
                                />
                              </td>
                              <td className="px-3 py-3 font-medium">
                                {obterCodigoTransacao(lancamento, indice)}
                              </td>
                              <td className="px-3 py-3">{formatarTipo(lancamento.tipo)}</td>
                              <td className="px-3 py-3">{formatarMoeda(lancamento.valor)}</td>
                              <td className="px-3 py-3">
                                <BadgeCategoria>{obterNomeCategoria(lancamento)}</BadgeCategoria>
                              </td>
                              <td className="px-3 py-3">
                                {formatarData(lancamento.dataTransacao)}
                              </td>
                              <td className="px-3 py-2 text-right">
                                <Button
                                  type="button"
                                  size="sm"
                                  className="bg-zinc-950 px-3 text-xs text-white hover:bg-zinc-800"
                                >
                                  Detalhes
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </CardContent>

              <CardFooter className="justify-between gap-3 border-0 bg-white px-4 py-4 text-xs text-zinc-500">
                <span>
                  {selecionados.size} de {lancamentosFiltrados.length} transação
                  {lancamentosFiltrados.length === 1 ? "" : "es"} selecionada
                  {selecionados.size === 1 ? "" : "s"}.
                </span>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setModalLancamentoAberto(true)}
                  className="shrink-0 border-zinc-200 bg-white text-xs text-zinc-950 hover:bg-zinc-50"
                >
                  <Plus size={14} />
                  Novo Lançamento
                </Button>
              </CardFooter>
            </Card>
          </main>

          {modalLancamentoAberto && (
            <NovoLancamentoDialog
              aberto={modalLancamentoAberto}
              onAbertoChange={setModalLancamentoAberto}
              contas={contas}
              contaSelecionada={contaSelecionada}
              onLancamentoCriado={atualizarAposCadastro}
            />
          )}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
