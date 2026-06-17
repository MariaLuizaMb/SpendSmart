import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  LoaderCircle,
  WalletCards,
} from "lucide-react";

import { HomeSidebar } from "@/pages/Home";
import ContaCard from "@/components/ui/cardConta";
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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { TooltipProvider } from "@/components/ui/tooltip";
import { obterUsuario } from "@/lib/auth";
import { cn } from "@/lib/utils";
import {
  cadastrarConta,
  editarConta,
  listarContas,
  listarLancamentos,
  removerConta,
} from "@/services/api";
import { MODELOS_CARTAO, opcoesCartao } from "@/constants/cardsConta";

const tiposConta = [
  { value: "CONTA_CORRENTE", label: "Conta corrente" },
  { value: "POUPANCA", label: "Poupança" },
  { value: "CARTEIRA_DINHEIRO", label: "Carteira em dinheiro" },
  { value: "CARTEIRA_DIGITAL", label: "Carteira digital" },
  { value: "OUTRA", label: "Outra" },
];

const formularioInicial = {
  nome: "",
  tipo: "CONTA_CORRENTE",
  saldoInicial: "0,00",
  modeloCartao: MODELOS_CARTAO.NUBANK,
  descricao: "",
};

export function ordenarContas(contas) {
  return [...contas].sort((contaA, contaB) =>
    contaA.nome.localeCompare(contaB.nome, "pt-BR"),
  );
}

export function formatarMoeda(valor) {
  return Number(valor || 0)
    .toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace(/\u00a0/g, " ");
}

export function formatarNumeroParaInputMoeda(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatarValorMonetarioInput(valor) {
  const digitos = String(valor || "").replace(/\D/g, "");

  if (!digitos) return "";

  return (Number(digitos) / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function converterValorMonetarioParaNumero(valor) {
  if (!valor) return 0;

  const valorNormalizado = String(valor)
    .replace(/\./g, "")
    .replace(",", ".")
    .replace(/[^\d.]/g, "");

  return Number(valorNormalizado);
}

export function obterNomeConta(modeloCartao, nomePersonalizado) {
  if (modeloCartao === MODELOS_CARTAO.DEFAULT) {
    return nomePersonalizado.trim();
  }

  return (
    opcoesCartao.find((opcao) => opcao.value === modeloCartao)?.label || "Conta"
  );
}

export function formatarTipoConta(tipo) {
  return tiposConta.find((opcao) => opcao.value === tipo)?.label || "Conta";
}

export function criarFormularioPorConta(conta) {
  if (!conta) return formularioInicial;

  return {
    nome: conta.nome || "",
    tipo: conta.tipo || "CONTA_CORRENTE",
    saldoInicial: formatarNumeroParaInputMoeda(
      conta.saldoInicial ?? conta.saldoAtual ?? 0,
    ),
    modeloCartao: conta.modeloCartao || MODELOS_CARTAO.DEFAULT,
    descricao: conta.descricao || "",
  };
}

export function normalizarContaParaFormulario(conta) {
  return {
    ...conta,
    saldoAtual: conta?.saldoAtual ?? conta?.saldoInicial ?? 0,
  };
}

export function formatarData(data) {
  if (!data) return "Nenhuma movimentação";

  return new Date(data).toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });
}

function DetalhesContaDialog({
  aberto,
  conta,
  onAbertoChange,
  onContaAtualizada,
}) {
  const [formulario, setFormulario] = useState(() =>
    criarFormularioPorConta(conta),
  );
  const [editando, setEditando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [carregandoMovimentacao, setCarregandoMovimentacao] = useState(false);
  const [ultimaMovimentacao, setUltimaMovimentacao] = useState(null);
  const [erro, setErro] = useState("");

  const saldoAtual = conta?.saldoAtual ?? conta?.saldoInicial ?? 0;

  useEffect(() => {
    if (!aberto || !conta?.id) return;

    async function carregarUltimaMovimentacao() {
      setCarregandoMovimentacao(true);

      try {
        const lancamentos = await listarLancamentos({
          idConta: conta.id,
          limite: 1,
        });

        setUltimaMovimentacao(lancamentos[0] || null);
      } catch (error) {
        console.error("Erro ao carregar última movimentação:", error.message);
        setUltimaMovimentacao(null);
      } finally {
        setCarregandoMovimentacao(false);
      }
    }

    void Promise.resolve().then(carregarUltimaMovimentacao);
  }, [aberto, conta]);

  if (!conta) return null;

  function atualizarCampo(event) {
    const { name, value } = event.target;

    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      [name]:
        name === "saldoInicial" ? formatarValorMonetarioInput(value) : value,
    }));
  }

  function atualizarCampoFormulario(name, value) {
    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
    }));
  }

  function atualizarModeloCartao(valor) {
    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      modeloCartao: valor,
      nome: valor === MODELOS_CARTAO.DEFAULT ? "" : dadosAtuais.nome,
    }));
  }

  function cancelarEdicao() {
    setFormulario(criarFormularioPorConta(conta));
    setEditando(false);
    setErro("");
  }

  async function salvarEdicao(event) {
    event?.preventDefault();
    event?.stopPropagation();
    setErro("");

    const nome = obterNomeConta(formulario.modeloCartao, formulario.nome);
    const saldoInicial = converterValorMonetarioParaNumero(
      formulario.saldoInicial,
    );
    const descricao = formulario.descricao.trim();

    if (formulario.modeloCartao === MODELOS_CARTAO.DEFAULT && nome.length < 2) {
      setErro("Informe um nome com pelo menos 2 caracteres.");
      return;
    }

    if (!Number.isFinite(saldoInicial) || saldoInicial < 0) {
      setErro("Informe um saldo maior ou igual a zero.");
      return;
    }

    setSalvando(true);

    try {
      const contaAtualizada = await editarConta(conta.id, {
        nome,
        modeloCartao: formulario.modeloCartao,
        tipo: formulario.tipo,
        saldoInicial,
        descricao: descricao || null,
      });

      await onContaAtualizada(contaAtualizada);
      setEditando(false);
    } catch (error) {
      setErro(error.message || "Não foi possível atualizar a conta.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Dialog open={aberto} onOpenChange={onAbertoChange}>
      <DialogContent className="max-h-[92vh] overflow-hidden p-0 sm:max-w-xl">
        <div className="flex max-h-[92vh] flex-col">
          <Card className="max-h-[92vh] overflow-hidden border-0 py-0 ring-0">
            <CardHeader className="px-5 pb-2 pt-5">
              <DialogTitle asChild>
                <CardTitle>Detalhes da conta</CardTitle>
              </DialogTitle>

              <DialogDescription>
                Consulte as informações da conta bancária selecionada.
              </DialogDescription>
            </CardHeader>

            <ScrollArea className="max-h-140 min-h-0">
              <CardContent className="space-y-4 px-5 py-4 pr-6">
                <div className="flex flex-col gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="modeloCartaoContaDetalhes">Banco</Label>
                    {editando ? (
                      <Select
                        value={formulario.modeloCartao}
                        disabled={salvando}
                        onValueChange={atualizarModeloCartao}
                      >
                        <SelectTrigger id="modeloCartaoContaDetalhes">
                          <SelectValue placeholder="Banco" />
                        </SelectTrigger>
                        <SelectContent>
                          {opcoesCartao.map((opcao) => (
                            <SelectItem key={opcao.value} value={opcao.value}>
                              {opcao.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id="modeloCartaoContaDetalhes"
                        value={conta.nome}
                        readOnly
                        className="bg-zinc-50 px-3"
                      />
                    )}
                  </div>
                  {editando &&
                    formulario.modeloCartao === MODELOS_CARTAO.DEFAULT && (
                      <div className="space-y-1.5">
                        <Label htmlFor="nomeContaDetalhes">Nome do banco</Label>
                        <Input
                          id="nomeContaDetalhes"
                          name="nome"
                          value={formulario.nome}
                          onChange={atualizarCampo}
                          disabled={salvando}
                          minLength={2}
                          placeholder="Ex.: Inter, Bradesco"
                          className="bg-white px-3"
                        />
                      </div>
                    )}
                  <div className="space-y-1.5">
                    <Label htmlFor="saldoInicialContaDetalhes">Saldo</Label>
                    <div className="relative">
                      {editando && (
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                          R$
                        </span>
                      )}

                      <Input
                        id="saldoInicialContaDetalhes"
                        name="saldoInicial"
                        type="text"
                        inputMode="numeric"
                        value={
                          editando
                            ? formulario.saldoInicial
                            : formatarMoeda(saldoAtual)
                        }
                        onChange={atualizarCampo}
                        readOnly={!editando}
                        disabled={salvando}
                        className={
                          editando
                            ? "bg-white pl-10 pr-3"
                            : "bg-zinc-50 px-3"
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="tipoContaDetalhes">Tipo de conta</Label>
                    {editando ? (
                      <Select
                        value={formulario.tipo}
                        disabled={salvando}
                        onValueChange={(valor) =>
                          atualizarCampoFormulario("tipo", valor)
                        }
                      >
                        <SelectTrigger id="tipoContaDetalhes">
                          <SelectValue placeholder="Tipo de conta" />
                        </SelectTrigger>
                        <SelectContent>
                          {tiposConta.map((tipo) => (
                            <SelectItem key={tipo.value} value={tipo.value}>
                              {tipo.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id="tipoContaDetalhes"
                        value={formatarTipoConta(formulario.tipo)}
                        readOnly
                        className="bg-zinc-50 px-3"
                      />
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="ultimaMovimentacaoContaDetalhes">
                      Última movimentação
                    </Label>
                    <Input
                      id="ultimaMovimentacaoContaDetalhes"
                      value={
                        carregandoMovimentacao
                          ? "Carregando..."
                          : formatarData(ultimaMovimentacao?.dataTransacao)
                      }
                      readOnly
                      className="bg-zinc-50 px-3"
                    />
                  </div>

                  <div className="space-y-1.5 ">
                    <Label htmlFor="descricaoContaDetalhes">Descrição</Label>
                    <Textarea
                      id="descricaoContaDetalhes"
                      name="descricao"
                      value={formulario.descricao}
                      onChange={atualizarCampo}
                      placeholder="Observações sobre a conta"
                      readOnly={!editando}
                      disabled={salvando}
                      className="min-h-20 bg-white px-3 read-only:bg-zinc-50"
                    />
                  </div>
                </div>

                {erro && (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {erro}
                  </p>
                )}
              </CardContent>
            </ScrollArea>

            <CardFooter className="justify-end gap-2 border-0 bg-white px-5 pb-5 pt-2">
              {editando ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={cancelarEdicao}
                  disabled={salvando}
                >
                  Cancelar
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onAbertoChange(false)}
                  disabled={salvando}
                >
                  Fechar
                </Button>
              )}

              {editando ? (
                <Button
                  type="button"
                  onClick={salvarEdicao}
                  disabled={salvando}
                  className="bg-zinc-950 text-white hover:bg-zinc-800"
                >
                  {salvando ? (
                    <LoaderCircle className="animate-spin" size={16} />
                  ) : null}
                  {salvando ? "Salvando..." : "Salvar alterações"}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setEditando(true);
                  }}
                  className="bg-zinc-950 text-white hover:bg-zinc-800"
                >
                  Editar informações
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function NovaContaDialog({ aberto, onAbertoChange, onContaCriada }) {
  const [formulario, setFormulario] = useState(formularioInicial);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  function atualizarCampo(event) {
    const { name, value } = event.target;

    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
    }));
  }

  function atualizarCampoFormulario(name, value) {
    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
      ...(name === "modeloCartao" && value !== MODELOS_CARTAO.DEFAULT
        ? { nome: "" }
        : {}),
    }));
  }

  function atualizarModeloCartao(valor) {
    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      modeloCartao: valor,
      nome: valor === MODELOS_CARTAO.DEFAULT ? "" : dadosAtuais.nome,
    }));
  }

  async function salvarNovaConta(event) {
    event?.preventDefault();
    event?.stopPropagation();

    setErro("");

    const nome = obterNomeConta(formulario.modeloCartao, formulario.nome);
    const saldoInicial = converterValorMonetarioParaNumero(
      formulario.saldoInicial,
    );
    const descricao = formulario.descricao.trim();

    if (formulario.modeloCartao === MODELOS_CARTAO.DEFAULT && nome.length < 2) {
      setErro("Informe um nome com pelo menos 2 caracteres.");
      return;
    }

    if (!Number.isFinite(saldoInicial) || saldoInicial < 0) {
      setErro("Informe um saldo maior ou igual a zero.");
      return;
    }

    setSalvando(true);

    try {
      const novaConta = await cadastrarConta({
        nome,
        tipo: formulario.tipo,
        saldoInicial,
        modeloCartao: formulario.modeloCartao,
        descricao: descricao || undefined,
      });

      await onContaCriada(novaConta);
      onAbertoChange(false);
    } catch (error) {
      setErro(error.message || "Não foi possível cadastrar a conta.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Dialog open={aberto} onOpenChange={onAbertoChange}>
      <DialogContent className="max-h-[92vh] overflow-hidden p-0 sm:max-w-xl">
        <div className="flex max-h-[92vh] flex-col">
          <Card className="max-h-[92vh] overflow-hidden border-0 py-0 ring-0">
            <CardHeader className="px-5 pb-2 pt-5">
              <DialogTitle asChild>
                <CardTitle>Adicionar nova conta</CardTitle>
              </DialogTitle>

              <DialogDescription>
                Cadastre uma conta bancária para acompanhar seu saldo e suas
                movimentações.
              </DialogDescription>
            </CardHeader>

            <ScrollArea className="max-h-140 min-h-0">
              <CardContent className="space-y-4 px-5 py-4 pr-6">
                <div className="flex flex-col gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="modeloCartaoNovaConta">Banco</Label>

                    <Select
                      value={formulario.modeloCartao}
                      disabled={salvando}
                      onValueChange={atualizarModeloCartao}
                    >
                      <SelectTrigger id="modeloCartaoNovaConta">
                        <SelectValue placeholder="Banco" />
                      </SelectTrigger>

                      <SelectContent>
                        {opcoesCartao.map((opcao) => (
                          <SelectItem key={opcao.value} value={opcao.value}>
                            {opcao.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {formulario.modeloCartao === MODELOS_CARTAO.DEFAULT && (
                    <div className="space-y-1.5">
                      <Label htmlFor="nomeNovaConta">Nome do banco</Label>

                      <Input
                        id="nomeNovaConta"
                        name="nome"
                        value={formulario.nome}
                        onChange={atualizarCampo}
                        disabled={salvando}
                        minLength={2}
                        placeholder="Ex.: Inter, Bradesco"
                        className="bg-white px-3"
                      />
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <Label htmlFor="saldoInicialNovaConta">Saldo</Label>

                    <Input
                      id="saldoInicialNovaConta"
                      name="saldoInicial"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formulario.saldoInicial}
                      onChange={atualizarCampo}
                      disabled={salvando}
                      placeholder="0,00"
                      className="bg-white px-3"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="tipoNovaConta">Tipo de conta</Label>

                    <Select
                      value={formulario.tipo}
                      disabled={salvando}
                      onValueChange={(valor) =>
                        atualizarCampoFormulario("tipo", valor)
                      }
                    >
                      <SelectTrigger id="tipoNovaConta">
                        <SelectValue placeholder="Tipo de conta" />
                      </SelectTrigger>

                      <SelectContent>
                        {tiposConta.map((tipo) => (
                          <SelectItem key={tipo.value} value={tipo.value}>
                            {tipo.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="descricaoNovaConta">Descrição</Label>

                    <Textarea
                      id="descricaoNovaConta"
                      name="descricao"
                      value={formulario.descricao}
                      onChange={atualizarCampo}
                      placeholder="Observações sobre a conta"
                      disabled={salvando}
                      className="min-h-20 bg-white px-3"
                    />
                  </div>
                </div>

                {erro && (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {erro}
                  </p>
                )}
              </CardContent>
            </ScrollArea>

            <CardFooter className="justify-end gap-2 border-0 bg-white px-5 pb-5 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onAbertoChange(false)}
                disabled={salvando}
              >
                Cancelar
              </Button>

              <Button
                type="button"
                onClick={salvarNovaConta}
                disabled={salvando}
                className="bg-zinc-950 text-white hover:bg-zinc-800"
              >
                {salvando ? "Salvando..." : "Salvar conta"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ContasBancarias() {
  const usuario = obterUsuario();

  const [contas, setContas] = useState([]);
  const [indiceConta, setIndiceConta] = useState(0);
  const [modalNovaContaAberto, setModalNovaContaAberto] = useState(false);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [criandoConta, setCriandoConta] = useState(false);
  const [editandoConta, setEditandoConta] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [removendo, setRemovendo] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [contaDetalhes, setContaDetalhes] = useState(null);

  const contaSelecionada = contas[indiceConta] || null;
  const camposBloqueados = carregando || salvando || removendo;
  const modoFormulario = criandoConta || editandoConta;

  const saldoTotal = useMemo(
    () =>
      contas.reduce(
        (total, conta) =>
          total + Number(conta.saldoAtual ?? conta.saldoInicial ?? 0),
        0,
      ),
    [contas],
  );

  const contaPreview = useMemo(() => {
    if (!criandoConta) {
      return normalizarContaParaFormulario(contaSelecionada);
    }

    return {
      nome:
        obterNomeConta(formulario.modeloCartao, formulario.nome) ||
        "Nova conta",
      saldoAtual: formulario.saldoInicial,
      modeloCartao: formulario.modeloCartao,
    };
  }, [contaSelecionada, criandoConta, formulario]);

  const carregarContas = useCallback(async () => {
    setCarregando(true);
    setErro("");

    try {
      const resultado = await listarContas();
      const contasOrdenadas = ordenarContas(resultado);

      setContas(contasOrdenadas);

      setIndiceConta((indiceAtual) => {
        const novoIndice = Math.min(
          indiceAtual,
          Math.max(contasOrdenadas.length - 1, 0),
        );

        setFormulario(
          criarFormularioPorConta(contasOrdenadas[novoIndice] || null),
        );

        return novoIndice;
      });
    } catch (error) {
      setErro(error.message || "Não foi possível carregar suas contas.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(carregarContas);
  }, [carregarContas]);

  function atualizarCampo(event) {
    const { name, value } = event.target;

    atualizarCampoFormulario(name, value);
  }

  function atualizarCampoFormulario(name, value) {
    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
      ...(name === "modeloCartao" && value !== MODELOS_CARTAO.DEFAULT
        ? { nome: "" }
        : {}),
    }));
  }

  function iniciarCriacao() {
    setModalNovaContaAberto(true);
    setCriandoConta(false);
    setEditandoConta(false);
    setFormulario(formularioInicial);
    setErro("");
    setSucesso("");
  }

  function cancelarFormulario() {
    setCriandoConta(false);
    setEditandoConta(false);
    setFormulario(criarFormularioPorConta(contaSelecionada));
    setErro("");
    setSucesso("");
  }

  function selecionarContaPorIndice(novoIndice) {
    const novaContaSelecionada = contas[novoIndice] || null;

    setIndiceConta(novoIndice);
    setCriandoConta(false);
    setEditandoConta(false);
    setFormulario(criarFormularioPorConta(novaContaSelecionada));
    setErro("");
    setSucesso("");
  }

  function irParaContaAnterior() {
    const novoIndice = Math.max(indiceConta - 1, 0);

    selecionarContaPorIndice(novoIndice);
  }

  function irParaProximaConta() {
    const novoIndice = Math.min(
      indiceConta + 1,
      Math.max(contas.length - 1, 0),
    );

    selecionarContaPorIndice(novoIndice);
  }
  function validarFormulario() {
    const nome = obterNomeConta(formulario.modeloCartao, formulario.nome);
    const saldoInicial = converterValorMonetarioParaNumero(
      formulario.saldoInicial,
    );

    if (formulario.modeloCartao === MODELOS_CARTAO.DEFAULT && nome.length < 2) {
      return "Informe um nome com pelo menos 2 caracteres.";
    }

    if (!Number.isFinite(saldoInicial) || saldoInicial < 0) {
      return "Informe um saldo maior ou igual a zero.";
    }

    return "";
  }

  async function salvarConta(event) {
    event.preventDefault();
    setErro("");
    setSucesso("");

    const erroValidacao = validarFormulario();

    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    const nome = obterNomeConta(formulario.modeloCartao, formulario.nome);
    const saldoInicial = converterValorMonetarioParaNumero(
      formulario.saldoInicial,
    );
    const descricao = formulario.descricao.trim();

    setSalvando(true);

    try {
      if (editandoConta && contaSelecionada) {
        const contaAtualizada = await editarConta(contaSelecionada.id, {
          nome,
          tipo: formulario.tipo,
          saldoInicial,
          descricao: descricao || null,
        });

        setContas((contasAtuais) => {
          const proximasContas = ordenarContas(
            contasAtuais.map((conta) =>
              conta.id === contaAtualizada.id ? contaAtualizada : conta,
            ),
          );
          const novoIndice = proximasContas.findIndex(
            (conta) => conta.id === contaAtualizada.id,
          );

          setIndiceConta(Math.max(novoIndice, 0));
          return proximasContas;
        });
        setSucesso("Conta bancária atualizada com sucesso.");
      } else {
        const novaConta = await cadastrarConta({
          nome,
          tipo: formulario.tipo,
          saldoInicial,
          modeloCartao: formulario.modeloCartao,
          descricao: descricao || undefined,
        });

        setContas((contasAtuais) => {
          const proximasContas = ordenarContas([...contasAtuais, novaConta]);
          const novoIndice = proximasContas.findIndex(
            (conta) => conta.id === novaConta.id,
          );

          setIndiceConta(Math.max(novoIndice, 0));
          return proximasContas;
        });
        setSucesso("Conta bancária cadastrada com sucesso.");
      }

      setCriandoConta(false);
      setEditandoConta(false);
    } catch (error) {
      setErro(error.message || "Não foi possível salvar a conta.");
    } finally {
      setSalvando(false);
    }
  }

  async function desativarConta() {
    if (!contaSelecionada) return;

    setRemovendo(true);
    setErro("");
    setSucesso("");

    try {
      await removerConta(contaSelecionada.id);

      setContas((contasAtuais) => {
        const proximasContas = contasAtuais.filter(
          (conta) => conta.id !== contaSelecionada.id,
        );

        setIndiceConta((indiceAtual) =>
          Math.min(indiceAtual, Math.max(proximasContas.length - 1, 0)),
        );
        return proximasContas;
      });
      setCriandoConta(false);
      setEditandoConta(false);
      setSucesso("Conta bancária desativada com sucesso.");
    } catch (error) {
      setErro(error.message || "Não foi possível desativar a conta.");
    } finally {
      setRemovendo(false);
    }
  }

  async function atualizarAposEdicaoDetalhes(contaAtualizada) {
    setContas((contasAtuais) => {
      const proximasContas = ordenarContas(
        contasAtuais.map((conta) =>
          conta.id === contaAtualizada.id ? contaAtualizada : conta,
        ),
      );
      const novoIndice = proximasContas.findIndex(
        (conta) => conta.id === contaAtualizada.id,
      );

      setIndiceConta(Math.max(novoIndice, 0));
      return proximasContas;
    });
    setContaDetalhes(contaAtualizada);
    setSucesso("Conta bancária atualizada com sucesso.");
  }

  async function atualizarAposCriacaoDialog(novaConta) {
    setContas((contasAtuais) => {
      const proximasContas = ordenarContas([...contasAtuais, novaConta]);
      const novoIndice = proximasContas.findIndex(
        (conta) => conta.id === novaConta.id,
      );

      setIndiceConta(Math.max(novoIndice, 0));

      return proximasContas;
    });

    setCriandoConta(false);
    setEditandoConta(false);
    setModalNovaContaAberto(false);
    setSucesso("Conta bancária cadastrada com sucesso.");
  }

  return (
    <TooltipProvider>
      <SidebarProvider
        data-ui="contas-sidebar-provider"
        className="h-screen overflow-hidden bg-[#E9E9E9]"
        style={{
          "--sidebar-width": "17.5rem",
          "--sidebar-width-icon": "4rem",
          "--sidebar-floating-offset": "1rem",
        }}
      >
        <HomeSidebar usuario={usuario} paginaAtiva="contas-bancarias" />

        <SidebarInset
          data-ui="contas-area-principal"
          className="grid h-screen min-h-0 min-w-0 grid-rows-[auto_minmax(0,1fr)] gap-5 overflow-y-auto bg-[#E9E9E9] p-4 sm:py-4 sm:pl-2 sm:pr-4"
        >
          <header className="flex shrink-0 items-start justify-between gap-4">
            <SidebarTrigger className="mt-1 size-9 shrink-0 md:hidden" />

            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold leading-tight text-zinc-950 sm:text-3xl">
                Contas Bancárias
              </h1>
              <p className="mt-2 text-sm text-zinc-950">
                Cadastre e acompanhe suas contas em um só lugar
              </p>
            </div>

            <Card className="hidden w-44 gap-1 rounded-xl border-0 bg-white px-4 py-3 shadow-md ring-1 ring-zinc-200 sm:flex">
              <p className="text-xs font-bold leading-none text-zinc-950">
                Saldo Total
              </p>
              <p className="text-xs leading-none text-zinc-500">
                Saldo total de todas as contas
              </p>
              <p className="text-base font-bold leading-6 text-zinc-950">
                {formatarMoeda(saldoTotal)}
              </p>
            </Card>
          </header>

          <main className="min-h-0">
            <Card className="h-auto min-h-0 gap-0 rounded-2xl border-0 bg-white py-0 shadow-md ring-1 ring-zinc-200">
              <CardHeader className="grid-cols-[minmax(0,1fr)_auto] items-start gap-3 px-5 pb-4 pt-5">
                <div>
                  <CardTitle className="text-lg font-bold text-zinc-950">
                    Minhas contas
                  </CardTitle>
                  <p className="mt-1 text-xs text-zinc-600">
                    Contas cadastradas
                  </p>
                </div>

                <Button
                  type="button"
                  onClick={iniciarCriacao}
                  disabled={camposBloqueados}
                  className="justify-self-end bg-zinc-950 text-xs text-white hover:bg-zinc-800"
                >
                  Criar Nova Conta
                </Button>
              </CardHeader>

              <CardContent className="min-h-0 px-5 pb-4">
                <div className="rounded-xl border border-zinc-200 p-4">
                  {carregando ? (
                    <div className="flex min-h-[220px] items-center justify-center text-sm text-zinc-500">
                      <LoaderCircle className="mr-2 animate-spin" size={18} />
                      Carregando contas...
                    </div>
                  ) : !contaSelecionada && !criandoConta ? (
                    <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
                      <WalletCards className="mb-3 text-zinc-400" size={32} />
                      <p className="font-semibold text-zinc-800">
                        Nenhuma conta cadastrada
                      </p>
                      <p className="mt-1 max-w-sm text-sm text-zinc-500">
                        Crie sua primeira conta bancária para acompanhar seus
                        saldos.
                      </p>
                    </div>
                  ) : (
                    <form
                      className="grid min-h-[220px] items-center gap-5 lg:grid-cols-[minmax(320px,420px)_minmax(0,1fr)]"
                      onSubmit={salvarConta}
                    >
                      <div className="flex items-center">
                        <ContaCard
                          conta={contaPreview}
                          variant="home"
                          className="w-full max-w-[420px] rounded-xl shadow-sm"
                        />
                      </div>

                      <div className="flex h-full min-w-0 flex-col gap-5 rounded-xl border border-zinc-200 p-5">
                        <div>
                          <h2 className="text-sm font-bold text-zinc-950">
                            Informações da Conta
                          </h2>

                          <div className="mt-5 grid gap-x-5 gap-y-4 md:grid-cols-2">
                            <div className="space-y-1.5">
                              <Label
                                htmlFor="modeloCartao"
                                className="text-sm font-medium text-zinc-950"
                              >
                                Banco
                              </Label>
                              {modoFormulario ? (
                                <Select
                                  value={formulario.modeloCartao}
                                  disabled={camposBloqueados || editandoConta}
                                  onValueChange={(valor) =>
                                    atualizarCampoFormulario(
                                      "modeloCartao",
                                      valor,
                                    )
                                  }
                                >
                                  <SelectTrigger
                                    id="modeloCartao"
                                    className="h-9 rounded-lg px-3 text-sm"
                                  >
                                    <SelectValue placeholder="Banco" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {opcoesCartao.map((opcao) => (
                                      <SelectItem
                                        key={opcao.value}
                                        value={opcao.value}
                                      >
                                        {opcao.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Input
                                  id="modeloCartao"
                                  value={contaSelecionada?.nome || ""}
                                  placeholder="Banco"
                                  readOnly
                                  className="h-9 rounded-lg bg-white px-3 text-sm text-zinc-500 opacity-100"
                                />
                              )}
                            </div>

                            <div className="space-y-1.5">
                              <Label
                                htmlFor="saldoInicial"
                                className="text-sm font-medium text-zinc-950"
                              >
                                Saldo
                              </Label>
                              <div className="relative">
                                {modoFormulario && (
                                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                                    R$
                                  </span>
                                )}

                                <Input
                                  id="saldoInicial"
                                  name="saldoInicial"
                                  type="text"
                                  inputMode="numeric"
                                  value={
                                    modoFormulario
                                      ? formulario.saldoInicial
                                      : formatarMoeda(
                                          contaSelecionada?.saldoAtual ??
                                            contaSelecionada?.saldoInicial ??
                                            0,
                                        )
                                  }
                                  onChange={atualizarCampo}
                                  placeholder="0,00"
                                  disabled={camposBloqueados && modoFormulario}
                                  readOnly={!modoFormulario}
                                  required={modoFormulario}
                                  className={
                                    modoFormulario
                                      ? "h-9 rounded-lg bg-white pl-10 pr-3 text-sm text-zinc-500 opacity-100 disabled:opacity-100"
                                      : "h-9 rounded-lg bg-white px-3 text-sm text-zinc-500 opacity-100"
                                  }
                                />
                              </div>
                            </div>

                            {formulario.modeloCartao ===
                              MODELOS_CARTAO.DEFAULT &&
                              modoFormulario && (
                                <div className="space-y-1.5">
                                  <Label
                                    htmlFor="nome"
                                    className="text-sm font-medium text-zinc-950"
                                  >
                                    Nome da conta
                                  </Label>
                                  <Input
                                    id="nome"
                                    name="nome"
                                    value={formulario.nome}
                                    onChange={atualizarCampo}
                                    placeholder="Ex.: Inter, Bradesco"
                                    disabled={camposBloqueados}
                                    required
                                    minLength={2}
                                    className="h-9 rounded-lg px-3 text-sm"
                                  />
                                </div>
                              )}

                            <div
                              className={cn(
                                "space-y-1.5",
                                formulario.modeloCartao ===
                                  MODELOS_CARTAO.DEFAULT && modoFormulario
                                  ? ""
                                  : "md:col-start-1",
                              )}
                            >
                              <Label
                                htmlFor="tipo"
                                className="text-sm font-medium text-zinc-950"
                              >
                                Tipo de conta
                              </Label>
                              {modoFormulario ? (
                                <Select
                                  value={formulario.tipo}
                                  disabled={camposBloqueados}
                                  onValueChange={(valor) =>
                                    atualizarCampoFormulario("tipo", valor)
                                  }
                                >
                                  <SelectTrigger
                                    id="tipo"
                                    className="h-9 rounded-lg px-3 text-sm"
                                  >
                                    <SelectValue placeholder="Tipo de conta" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {tiposConta.map((tipo) => (
                                      <SelectItem
                                        key={tipo.value}
                                        value={tipo.value}
                                      >
                                        {tipo.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Input
                                  id="tipo"
                                  value={formatarTipoConta(
                                    contaSelecionada?.tipo,
                                  )}
                                  placeholder="Tipo de conta"
                                  readOnly
                                  className="h-9 rounded-lg bg-white px-3 text-sm text-zinc-500 opacity-100"
                                />
                              )}
                            </div>

                            <div className="space-y-1.5">
                              <Label
                                htmlFor="descricao"
                                className="text-sm font-medium text-zinc-950"
                              >
                                Descrição
                              </Label>
                              <Textarea
                                id="descricao"
                                name="descricao"
                                value={formulario.descricao}
                                onChange={atualizarCampo}
                                placeholder="Observações sobre a conta"
                                disabled={camposBloqueados && modoFormulario}
                                readOnly={!modoFormulario}
                                rows={1}
                                wrap="off"
                                className="h-9 min-h-9 resize-none overflow-hidden text-ellipsis whitespace-nowrap rounded-lg bg-white px-3 py-2 text-sm text-zinc-500 opacity-100 disabled:opacity-100"
                              />
                            </div>
                          </div>
                        </div>

                        {(erro || sucesso) && (
                          <div className="space-y-2">
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
                          </div>
                        )}

                        <div className="mt-auto flex flex-wrap justify-end gap-2">
                          {modoFormulario ? (
                            <>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={cancelarFormulario}
                                disabled={camposBloqueados}
                                className="h-8 rounded-lg px-4 text-sm"
                              >
                                Cancelar
                              </Button>

                              <Button
                                type="submit"
                                disabled={camposBloqueados}
                                className="h-8 rounded-lg bg-zinc-950 px-4 text-sm text-white hover:bg-zinc-800"
                                >
                                  {salvando ? (
                                    <LoaderCircle
                                      className="animate-spin"
                                      size={16}
                                    />
                                  ) : null}
                                  {salvando ? "Salvando..." : "Salvar"}
                                </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                  setContaDetalhes(contaSelecionada)
                                }
                                disabled={!contaSelecionada || camposBloqueados}
                                className="h-8 rounded-lg px-4 text-sm"
                              >
                                Detalhes
                              </Button>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    type="button"
                                    disabled={
                                      !contaSelecionada || camposBloqueados
                                    }
                                    className="h-8 rounded-lg bg-red-600 px-4 text-sm text-white hover:bg-red-700"
                                  >
                                    {removendo ? (
                                      <LoaderCircle
                                        className="animate-spin"
                                        size={16}
                                      />
                                    ) : null}
                                    Desativar
                                  </Button>
                                </AlertDialogTrigger>

                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Desativar conta bancária?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      A conta deixará de aparecer na listagem.
                                      Se ela tiver lançamentos, o histórico será
                                      preservado.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel disabled={removendo}>
                                      Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      disabled={removendo}
                                      onClick={desativarConta}
                                      className="bg-red-600 text-white hover:bg-red-700"
                                    >
                                      Desativar
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </>
                          )}
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </CardContent>

              <CardFooter className="justify-between border-0 bg-white px-5 pb-5 pt-0 text-xs text-zinc-500">
                <span>
                  Conta {contas.length === 0 ? 0 : indiceConta + 1} de{" "}
                  {contas.length}
                </span>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={irParaContaAnterior}
                    disabled={indiceConta === 0 || camposBloqueados}
                    className="text-xs"
                  >
                    Anterior
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={irParaProximaConta}
                    disabled={
                      contas.length === 0 ||
                      indiceConta >= contas.length - 1 ||
                      camposBloqueados
                    }
                    className="text-xs"
                  >
                    Próximo
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </main>

          {contaDetalhes && (
            <DetalhesContaDialog
              key={contaDetalhes.id}
              aberto={Boolean(contaDetalhes)}
              conta={contaDetalhes}
              onAbertoChange={(aberto) => {
                if (!aberto) setContaDetalhes(null);
              }}
              onContaAtualizada={atualizarAposEdicaoDetalhes}
            />
          )}

          {modalNovaContaAberto && (
            <NovaContaDialog
              aberto={modalNovaContaAberto}
              onAbertoChange={setModalNovaContaAberto}
              onContaCriada={atualizarAposCriacaoDialog}
            />
          )}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
