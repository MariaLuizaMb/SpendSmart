import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Pencil,
  LoaderCircle,
  Plus,
  Save,
  Search,
  Trash2,
} from "lucide-react";

import { NovoLancamentoDialog, HomeSidebar } from "@/pages/Home";
import { obterUsuario } from "@/lib/auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  editarLancamento,
  listarCategorias,
  listarContas,
  listarLancamentos,
  removerLancamento,
} from "@/services/api";

const opcoesOrdenacao = [
  { value: "recentes", label: "Recentes" },
  { value: "antigas", label: "Antigas" },
  { value: "maior-valor", label: "Maior valor" },
  { value: "menor-valor", label: "Menor valor" },
];

const OPCAO_CONTA_VAZIA = "__sem_conta__";

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

function formatarDataHora(data) {
  if (!data) return "Não informado";

  return new Date(data).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function formatarDataParaInput(data) {
  if (!data) return "";

  const dataFormatada = new Date(data);
  const ano = dataFormatada.getUTCFullYear();
  const mes = String(dataFormatada.getUTCMonth() + 1).padStart(2, "0");
  const dia = String(dataFormatada.getUTCDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}

function converterInputParaData(dataInput) {
  if (!dataInput) return undefined;

  const [ano, mes, dia] = dataInput.split("-").map(Number);

  if (!ano || !mes || !dia) return undefined;

  return new Date(ano, mes - 1, dia);
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

function obterNomeConta(lancamento) {
  return lancamento.conta?.nome || lancamento.nomeConta || "Sem conta";
}

function obterPrefixoCodigoTransacao(tipo) {
  const tipoNormalizado = String(tipo || "").toUpperCase();

  if (tipoNormalizado === "RECEITA") return "R";
  if (tipoNormalizado === "DESPESA") return "D";

  return "T";
}

function criarMapaCodigosTransacao(lancamentos) {
  const contadores = {
    RECEITA: 0,
    DESPESA: 0,
    OUTRO: 0,
  };
  const mapaCodigos = new Map();

  const lancamentosOrdenados = [...lancamentos].sort((a, b) => {
    const diferencaData = obterTimestamp(a) - obterTimestamp(b);

    if (diferencaData !== 0) return diferencaData;

    return String(a.id || "").localeCompare(String(b.id || ""));
  });

  lancamentosOrdenados.forEach((lancamento) => {
    const tipoNormalizado = String(lancamento.tipo || "").toUpperCase();
    const chaveContador = ["RECEITA", "DESPESA"].includes(tipoNormalizado)
      ? tipoNormalizado
      : "OUTRO";
    const prefixo = obterPrefixoCodigoTransacao(tipoNormalizado);

    contadores[chaveContador] += 1;
    mapaCodigos.set(
      lancamento.id,
      `${prefixo}${String(contadores[chaveContador]).padStart(2, "0")}`,
    );
  });

  return mapaCodigos;
}

function obterCodigoTransacao(lancamento, mapaCodigos) {
  return (
    mapaCodigos.get(lancamento.id) ||
    `${obterPrefixoCodigoTransacao(lancamento.tipo)}00`
  );
}

function obterTimestamp(lancamento) {
  const data = new Date(lancamento.dataTransacao).getTime();

  return Number.isFinite(data) ? data : 0;
}

function obterValor(lancamento) {
  return Number(lancamento.valor || 0);
}

function criarFormularioDetalhes(lancamento) {
  return {
    tipo: lancamento?.tipo || "DESPESA",
    idCategoria: lancamento?.idCategoria || lancamento?.categoria?.id || "",
    idConta: lancamento?.idConta || lancamento?.conta?.id || "",
    valor: formatarValorMonetarioInput(
      Math.round(Number(lancamento?.valor || 0) * 100),
    ),
    dataTransacao: formatarDataParaInput(lancamento?.dataTransacao),
    recorrencia: lancamento?.recorrencia || "NENHUMA",
    descricao: lancamento?.descricao || "",
  };
}

function BadgeCategoria({ children }) {
  return (
    <span className="inline-flex h-6 items-center rounded-md border border-zinc-300 bg-zinc-100 px-2 text-xs font-medium text-zinc-700">
      {children}
    </span>
  );
}

function CheckboxTabela({ checked, onChange, label }) {
  return (
    <Checkbox
      checked={checked}
      onCheckedChange={onChange}
      aria-label={label}
      className="border-zinc-300 data-checked:border-zinc-950 data-checked:bg-zinc-950 data-checked:text-white"
    />
  );
}

function CampoSomenteLeitura({ label, children }) {
  return (
    <div className="space-y-1.5">
      <p className="text-sm font-medium text-zinc-950">{label}</p>
      <div className="flex min-h-10 items-center rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
        {children || "Não informado"}
      </div>
    </div>
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

function DetalhesLancamentoDialog({
  aberto,
  lancamento,
  codigoTransacao,
  contas,
  onAbertoChange,
  onLancamentoAtualizado,
  onLancamentoRemovido,
}) {
  const [categorias, setCategorias] = useState([]);
  const [formulario, setFormulario] = useState(() =>
    criarFormularioDetalhes(lancamento),
  );
  const [editando, setEditando] = useState(false);
  const [carregandoCategorias, setCarregandoCategorias] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [calendarioAberto, setCalendarioAberto] = useState(false);

  const seletorDataRef = useRef(null);
  const idLancamentoAnteriorRef = useRef(null);

  const camposBloqueados = salvando || excluindo;

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
    if (!lancamento) {
      idLancamentoAnteriorRef.current = null;
      return;
    }

    const mudouLancamento = idLancamentoAnteriorRef.current !== lancamento.id;

    if (!mudouLancamento) return;

    idLancamentoAnteriorRef.current = lancamento.id;

    setFormulario(criarFormularioDetalhes(lancamento));
    setEditando(false);
    setErro("");
    setSucesso("");
    setCalendarioAberto(false);
  }, [lancamento]);

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

  if (!lancamento) return null;

  function atualizarCampo(event) {
    const { name, value } = event.target;
    atualizarCampoFormulario(name, value);
  }

  function atualizarCampoFormulario(name, value) {
    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
      ...(name === "tipo" ? { idCategoria: "" } : {}),
    }));
  }

  function atualizarValorLancamento(event) {
    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      valor: formatarValorMonetarioInput(event.target.value),
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

  function cancelarEdicao() {
    setFormulario(criarFormularioDetalhes(lancamento));
    setEditando(false);
    setErro("");
    setSucesso("");
    setCalendarioAberto(false);
  }

  async function salvarLancamento(event) {
    event?.preventDefault();
    event?.stopPropagation();

    setErro("");
    setSucesso("");

    const valor = converterValorMonetarioParaNumero(formulario.valor);

    if (!formulario.idCategoria) {
      setErro("Selecione uma categoria para o lançamento.");
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
      const lancamentoAtualizado = await editarLancamento(lancamento.id, {
        idCategoria: formulario.idCategoria,
        idConta: formulario.idConta || null,
        valor,
        dataTransacao: formulario.dataTransacao,
        tipo: formulario.tipo,
        recorrencia: formulario.recorrencia,
        descricao: formulario.descricao.trim() || null,
      });

      await onLancamentoAtualizado(lancamentoAtualizado);

      onAbertoChange(false);
    } catch (error) {
      setErro(error.message || "Não foi possível atualizar o lançamento.");
    } finally {
      setSalvando(false);
    }
  }

  async function excluirLancamento() {
    setExcluindo(true);
    setErro("");
    setSucesso("");

    try {
      await removerLancamento(lancamento.id);
      await onLancamentoRemovido(lancamento.id);
      onAbertoChange(false);
    } catch (error) {
      setErro(error.message || "Não foi possível excluir o lançamento.");
    } finally {
      setExcluindo(false);
    }
  }

  return (
    <Dialog open={aberto} onOpenChange={onAbertoChange}>
      <DialogContent
        data-ui="modal-detalhes-lancamento-conteudo"
        className="max-h-[92vh] overflow-hidden p-0 sm:max-w-lg"
      >
        <div
          data-ui="modal-detalhes-lancamento-formulario"
          className="flex max-h-[92vh] flex-col"
        >
          <Card className="max-h-[92vh] overflow-hidden border-0 py-0 ring-0">
            <CardHeader className="px-5 pb-2 pt-5">
              <DialogTitle asChild>
                <CardTitle>Detalhes da transação</CardTitle>
              </DialogTitle>

              <DialogDescription>
                Consulte e altere as informações do lançamento selecionado.
              </DialogDescription>
            </CardHeader>

            <ScrollArea className="h-[60vh] max-h-[560px] min-h-0">
              <CardContent className="space-y-4 px-5 py-4 pr-6">
                <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-3 text-xs text-zinc-600">
                  <dl className="grid gap-2">
                    <div className="flex min-w-0 justify-between gap-3">
                      <dt className="shrink-0 font-medium text-zinc-950">
                        Id Transação
                      </dt>
                      <dd className="min-w-0 truncate text-right">
                        {codigoTransacao}
                      </dd>
                    </div>

                    <div className="flex min-w-0 justify-between gap-3">
                      <dt className="shrink-0 font-medium text-zinc-950">
                        Criado em
                      </dt>
                      <dd className="min-w-0 truncate text-right">
                        {formatarDataHora(lancamento.criadoEm)}
                      </dd>
                    </div>

                    <div className="flex min-w-0 justify-between gap-3">
                      <dt className="shrink-0 font-medium text-zinc-950">
                        Atualizado em
                      </dt>
                      <dd className="min-w-0 truncate text-right">
                        {formatarDataHora(lancamento.atualizadoEm)}
                      </dd>
                    </div>
                  </dl>
                </div>

                {!editando ? (
                  <>
                    <div className="space-y-4">
                      <CampoSomenteLeitura label="Tipo">
                        {formatarTipo(formulario.tipo)}
                      </CampoSomenteLeitura>

                      <CampoSomenteLeitura label="Valor">
                        {formatarMoeda(
                          converterValorMonetarioParaNumero(formulario.valor),
                        )}
                      </CampoSomenteLeitura>
                    </div>

                    <CampoSomenteLeitura label="Categoria">
                      {obterNomeCategoria(lancamento)}
                    </CampoSomenteLeitura>

                    <div className="space-y-4">
                      <CampoSomenteLeitura label="Conta">
                        {obterNomeConta(lancamento)}
                      </CampoSomenteLeitura>

                      <CampoSomenteLeitura label="Data">
                        {formatarData(formulario.dataTransacao)}
                      </CampoSomenteLeitura>
                    </div>

                    <CampoSomenteLeitura label="Recorrência">
                      {formulario.recorrencia}
                    </CampoSomenteLeitura>

                    <CampoSomenteLeitura label="Descrição">
                      {formulario.descricao}
                    </CampoSomenteLeitura>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="tipoLancamentoDetalhes">Tipo</Label>

                        <Select
                          value={formulario.tipo}
                          disabled={camposBloqueados}
                          onValueChange={(valor) =>
                            atualizarCampoFormulario("tipo", valor)
                          }
                        >
                          <SelectTrigger id="tipoLancamentoDetalhes">
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="DESPESA">Despesa</SelectItem>
                            <SelectItem value="RECEITA">Receita</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="valorLancamentoDetalhes">Valor</Label>

                        <div className="relative">
                          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            R$
                          </span>

                          <Input
                            id="valorLancamentoDetalhes"
                            name="valor"
                            type="text"
                            inputMode="numeric"
                            value={formulario.valor}
                            onChange={atualizarValorLancamento}
                            placeholder="0,00"
                            disabled={camposBloqueados}
                            className="h-10 pl-10 pr-3"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="categoriaLancamentoDetalhes">
                        Categoria
                      </Label>

                      <Select
                        value={formulario.idCategoria}
                        disabled={camposBloqueados || carregandoCategorias}
                        onValueChange={(valor) =>
                          atualizarCampoFormulario("idCategoria", valor)
                        }
                      >
                        <SelectTrigger id="categoriaLancamentoDetalhes">
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
                              <SelectItem
                                key={categoria.id}
                                value={categoria.id}
                              >
                                {categoria.nome}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="contaLancamentoDetalhes">Conta</Label>

                        <Select
                          value={formulario.idConta || OPCAO_CONTA_VAZIA}
                          disabled={camposBloqueados}
                          onValueChange={(valor) =>
                            atualizarCampoFormulario(
                              "idConta",
                              valor === OPCAO_CONTA_VAZIA ? "" : valor,
                            )
                          }
                        >
                          <SelectTrigger id="contaLancamentoDetalhes">
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
                        <Label htmlFor="dataLancamentoDetalhes">Data</Label>

                        <div ref={seletorDataRef} className="relative">
                          <Button
                            id="dataLancamentoDetalhes"
                            type="button"
                            variant="outline"
                            onClick={() =>
                              setCalendarioAberto((abertoAtual) => !abertoAtual)
                            }
                            disabled={camposBloqueados}
                            className="h-10 w-full justify-between px-3 text-left font-normal text-zinc-700"
                          >
                            <span>
                              {formatarData(formulario.dataTransacao)}
                            </span>
                            <CalendarDays size={16} />
                          </Button>

                          {calendarioAberto && (
                            <div className="absolute right-0 top-11 z-50 rounded-xl border border-zinc-200 bg-white p-1 shadow-lg">
                              <Calendar
                                mode="single"
                                selected={dataSelecionada}
                                onSelect={atualizarDataLancamento}
                                captionLayout="dropdown"
                                disabled={camposBloqueados}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="recorrenciaLancamentoDetalhes">
                        Recorrência
                      </Label>

                      <Select
                        value={formulario.recorrencia}
                        disabled={camposBloqueados}
                        onValueChange={(valor) =>
                          atualizarCampoFormulario("recorrencia", valor)
                        }
                      >
                        <SelectTrigger id="recorrenciaLancamentoDetalhes">
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
                      <Label htmlFor="descricaoLancamentoDetalhes">
                        Descrição
                      </Label>

                      <Textarea
                        id="descricaoLancamentoDetalhes"
                        name="descricao"
                        value={formulario.descricao}
                        onChange={atualizarCampo}
                        placeholder="Observações sobre o lançamento"
                        disabled={camposBloqueados}
                        className="min-h-20 px-3"
                      />
                    </div>
                  </>
                )}

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

            <CardFooter className="flex-wrap justify-between gap-2 border-t-0 bg-transparent px-5 pb-5 pt-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={salvando || excluindo}
                    className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                  >
                    {excluindo ? "Excluindo..." : "Excluir"}
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remover transação?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. A transação será removida
                      permanentemente do seu histórico.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={excluindo}>
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                      disabled={excluindo}
                      onClick={excluirLancamento}
                      className="bg-red-600 text-white hover:bg-red-700"
                    >
                      Remover
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <div className="flex flex-wrap justify-end gap-2">
                {editando && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={cancelarEdicao}
                    disabled={salvando || excluindo}
                  >
                    Cancelar
                  </Button>
                )}

                {editando ? (
                  <Button
                    type="button"
                    onClick={salvarLancamento}
                    disabled={salvando || excluindo || carregandoCategorias}
                    className="bg-zinc-950 text-white hover:bg-zinc-800"
                  >
                    {salvando ? "Salvando..." : "Salvar alterações"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();

                      setEditando(true);
                      setSucesso("");
                      setErro("");
                    }}
                    disabled={excluindo}
                    className="bg-zinc-950 text-white hover:bg-zinc-800"
                  >
                    Editar
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
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
  const [lancamentoDetalhes, setLancamentoDetalhes] = useState(null);
  const [lancamentoRemovendo, setLancamentoRemovendo] = useState("");
  const [removendoSelecionados, setRemovendoSelecionados] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState("");

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
      setContaSelecionada(
        (contaAtual) => contaAtual || contasResultado[0]?.id || "",
      );
    } catch (error) {
      setErro(error.message || "Não foi possível carregar as transações.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(carregarDados);
  }, [carregarDados]);

  const codigosTransacao = useMemo(
    () => criarMapaCodigosTransacao(lancamentos),
    [lancamentos],
  );

  const lancamentosFiltrados = useMemo(() => {
    const termo = filtro.trim().toLocaleLowerCase("pt-BR");

    const filtrados = termo
      ? lancamentos.filter((lancamento) => {
          const textoBusca = [
            obterCodigoTransacao(lancamento, codigosTransacao),
            formatarTipo(lancamento.tipo),
            obterNomeCategoria(lancamento),
            obterNomeConta(lancamento),
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
  }, [codigosTransacao, filtro, lancamentos, ordenacao]);

  useEffect(() => {
    if (!mensagemSucesso) return undefined;

    const timeout = window.setTimeout(() => {
      setMensagemSucesso("");
    }, 4000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [mensagemSucesso]);

  const todosSelecionados =
    lancamentosFiltrados.length > 0 &&
    lancamentosFiltrados.every((lancamento) => selecionados.has(lancamento.id));

  function alternarTodosSelecionados() {
    setSelecionados((selecionadosAtuais) => {
      const proximos = new Set(selecionadosAtuais);

      if (todosSelecionados) {
        lancamentosFiltrados.forEach((lancamento) =>
          proximos.delete(lancamento.id),
        );
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

  async function atualizarAposEdicao(lancamentoAtualizado) {
    setLancamentos((lancamentosAtuais) =>
      lancamentosAtuais.map((lancamento) =>
        lancamento.id === lancamentoAtualizado.id
          ? {
              ...lancamento,
              ...lancamentoAtualizado,
            }
          : lancamento,
      ),
    );

    setMensagemSucesso("Transação atualizada com sucesso.");
    setLancamentoDetalhes(null);

    await carregarDados();
  }

  async function atualizarAposExclusao(idLancamento) {
    setSelecionados((selecionadosAtuais) => {
      const proximos = new Set(selecionadosAtuais);
      proximos.delete(idLancamento);
      return proximos;
    });

    setLancamentoDetalhes(null);
    await carregarDados();
  }

  async function removerLancamentoSelecionado(lancamento) {
    setLancamentoRemovendo(lancamento.id);
    setErro("");

    try {
      await removerLancamento(lancamento.id);
      await atualizarAposExclusao(lancamento.id);
      setMensagemSucesso("Transação removida com sucesso.");
    } catch (error) {
      setErro(error.message || "Não foi possível excluir o lançamento.");
    } finally {
      setLancamentoRemovendo("");
    }
  }

  async function removerLancamentosSelecionados() {
    const lancamentosParaRemover = lancamentosFiltrados.filter((lancamento) =>
      selecionados.has(lancamento.id),
    );

    if (lancamentosParaRemover.length === 0) return;

    setRemovendoSelecionados(true);
    setErro("");

    try {
      await Promise.all(
        lancamentosParaRemover.map((lancamento) =>
          removerLancamento(lancamento.id),
        ),
      );

      setSelecionados((selecionadosAtuais) => {
        const proximos = new Set(selecionadosAtuais);
        lancamentosParaRemover.forEach((lancamento) =>
          proximos.delete(lancamento.id),
        );
        return proximos;
      });
      setLancamentoDetalhes(null);
      setMensagemSucesso("Transações removidas com sucesso.");

      await carregarDados();
    } catch (error) {
      setErro(error.message || "Não foi possível excluir as transações.");
    } finally {
      setRemovendoSelecionados(false);
    }
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

                {mensagemSucesso && (
                  <div className="flex w-full items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 sm:col-span-2">
                    <CheckCircle2 size={16} />
                    {mensagemSucesso}
                  </div>
                )}
              </CardHeader>

              <CardContent className="min-h-0 flex-1 px-4 pb-0">
                <ScrollArea className="h-full rounded-lg border border-zinc-200">
                  <div className="min-w-[980px]">
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

                          <th className="px-3 py-3">Tipo</th>

                          <th className="px-3 py-3">Valor</th>

                          <th className="px-3 py-3">Categoria</th>

                          <th className="px-3 py-3">Conta</th>

                          <th className="px-3 py-3">Data</th>

                          <th className="w-24 px-3 py-3 text-right">
                            {todosSelecionados && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    type="button"
                                    size="sm"
                                    disabled={removendoSelecionados}
                                    className="bg-red-600 px-3 text-xs text-white hover:bg-red-700"
                                  >
                                    {removendoSelecionados ? (
                                      <LoaderCircle
                                        className="animate-spin"
                                        size={14}
                                      />
                                    ) : null}

                                    {removendoSelecionados
                                      ? "Removendo..."
                                      : "Remover"}
                                  </Button>
                                </AlertDialogTrigger>

                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Remover transações?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Esta ação não pode ser desfeita. Todas as
                                      transações selecionadas serão removidas
                                      permanentemente do seu histórico.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>

                                  <AlertDialogFooter>
                                    <AlertDialogCancel
                                      disabled={removendoSelecionados}
                                    >
                                      Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      disabled={removendoSelecionados}
                                      onClick={removerLancamentosSelecionados}
                                      className="bg-red-600 text-white hover:bg-red-700"
                                    >
                                      Remover
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {carregando && (
                          <tr>
                            <td
                              colSpan={8}
                              className="h-80 text-center text-sm text-zinc-500"
                            >
                              <LoaderCircle
                                className="mx-auto mb-2 animate-spin"
                                size={20}
                              />
                              Carregando transações...
                            </td>
                          </tr>
                        )}

                        {!carregando && erro && (
                          <tr>
                            <td
                              colSpan={8}
                              className="h-80 text-center text-sm text-red-600"
                            >
                              {erro}
                            </td>
                          </tr>
                        )}

                        {!carregando &&
                          !erro &&
                          lancamentosFiltrados.length === 0 && (
                            <tr>
                              <td
                                colSpan={8}
                                className="h-80 text-center text-sm text-zinc-500"
                              >
                                Nenhuma transação encontrada.
                              </td>
                            </tr>
                          )}

                        {!carregando &&
                          !erro &&
                          lancamentosFiltrados.map((lancamento) => {
                            const estaSelecionado = selecionados.has(
                              lancamento.id,
                            );
                            const estaRemovendo =
                              lancamentoRemovendo === lancamento.id;
                            const codigoTransacao = obterCodigoTransacao(
                              lancamento,
                              codigosTransacao,
                            );

                            return (
                              <tr
                                key={lancamento.id}
                                className="border-b border-zinc-200 text-xs text-zinc-950 last:border-b-0 hover:bg-zinc-50"
                              >
                                <td className="px-3 py-3">
                                  <CheckboxTabela
                                    checked={estaSelecionado}
                                    onChange={() =>
                                      alternarSelecionado(lancamento.id)
                                    }
                                    label={`Selecionar transação ${codigoTransacao}`}
                                  />
                                </td>

                                <td className="px-3 py-3 font-medium">
                                  {codigoTransacao}
                                </td>

                                <td className="px-3 py-3">
                                  {formatarTipo(lancamento.tipo)}
                                </td>

                                <td className="px-3 py-3">
                                  {formatarMoeda(lancamento.valor)}
                                </td>

                                <td className="px-3 py-3">
                                  <BadgeCategoria>
                                    {obterNomeCategoria(lancamento)}
                                  </BadgeCategoria>
                                </td>

                                <td className="px-3 py-3">
                                  <BadgeCategoria>
                                    {obterNomeConta(lancamento)}
                                  </BadgeCategoria>
                                </td>

                                <td className="px-3 py-3">
                                  {formatarData(lancamento.dataTransacao)}
                                </td>

                                <td className="px-3 py-2 text-right">
                                  {estaSelecionado ? (
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button
                                          type="button"
                                          size="sm"
                                          disabled={Boolean(
                                            lancamentoRemovendo,
                                          )}
                                          className="bg-red-600 px-3 text-xs text-white hover:bg-red-700"
                                        >
                                          {estaRemovendo
                                            ? "Removendo..."
                                            : "Remover"}
                                        </Button>
                                      </AlertDialogTrigger>

                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>
                                            Remover transação?
                                          </AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Esta ação não pode ser desfeita. A
                                            transação será removida
                                            permanentemente do seu histórico.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>

                                        <AlertDialogFooter>
                                          <AlertDialogCancel
                                            disabled={estaRemovendo}
                                          >
                                            Cancelar
                                          </AlertDialogCancel>
                                          <AlertDialogAction
                                            disabled={estaRemovendo}
                                            onClick={() =>
                                              removerLancamentoSelecionado(
                                                lancamento,
                                              )
                                            }
                                            className="bg-red-600 text-white hover:bg-red-700"
                                          >
                                            Remover
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  ) : (
                                    <Button
                                      type="button"
                                      size="sm"
                                      onClick={() =>
                                        setLancamentoDetalhes(lancamento)
                                      }
                                      className="bg-zinc-950 px-3 text-xs text-white hover:bg-zinc-800"
                                    >
                                      Detalhes
                                    </Button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
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

          {lancamentoDetalhes && (
            <DetalhesLancamentoDialog
              aberto={Boolean(lancamentoDetalhes)}
              lancamento={lancamentoDetalhes}
              codigoTransacao={obterCodigoTransacao(
                lancamentoDetalhes,
                codigosTransacao,
              )}
              contas={contas}
              onAbertoChange={(aberto) => {
                if (!aberto) setLancamentoDetalhes(null);
              }}
              onLancamentoAtualizado={atualizarAposEdicao}
              onLancamentoRemovido={atualizarAposExclusao}
            />
          )}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
