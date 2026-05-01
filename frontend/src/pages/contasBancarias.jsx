import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  LoaderCircle,
  Plus,
  WalletCards,
} from "lucide-react";

import ContaCard from "@/components/ui/cardConta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { listarContas, cadastrarConta } from "@/services/api";
import { MODELOS_CARTAO, opcoesCartao } from "@/constants/cardsConta";

const tiposConta = [
  { value: "CONTA_CORRENTE", label: "Conta corrente" },
  { value: "POUPANCA", label: "Poupanca" },
  { value: "CARTEIRA_DINHEIRO", label: "Carteira em dinheiro" },
  { value: "CARTEIRA_DIGITAL", label: "Carteira digital" },
  { value: "OUTRA", label: "Outra" },
];

const formularioInicial = {
  nome: "",
  tipo: "CONTA_CORRENTE",
  saldoInicial: "0",
  modeloCartao: MODELOS_CARTAO.NUBANK,
  descricao: "",
};

function ordenarContas(contas) {
  return [...contas].sort((contaA, contaB) =>
    contaA.nome.localeCompare(contaB.nome, "pt-BR"),
  );
}

function formatarMoeda(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function obterNomeConta(modeloCartao, nomePersonalizado) {
  if (modeloCartao === MODELOS_CARTAO.DEFAULT) {
    return nomePersonalizado.trim();
  }

  return (
    opcoesCartao.find((opcao) => opcao.value === modeloCartao)?.label ||
    "Conta"
  );
}

export default function ContasBancarias() {
  const [contas, setContas] = useState([]);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const saldoTotal = useMemo(
    () =>
      contas.reduce(
        (total, conta) =>
          total + Number(conta.saldoAtual ?? conta.saldoInicial ?? 0),
        0,
      ),
    [contas],
  );

  const carregarContas = useCallback(async () => {
    setCarregando(true);
    setErro("");

    try {
      const resultado = await listarContas();
      setContas(ordenarContas(resultado));
    } catch (error) {
      setErro(error.message || "Nao foi possivel carregar suas contas.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(carregarContas);
  }, [carregarContas]);

  function atualizarCampo(event) {
    const { name, value } = event.target;

    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
    }));
  }

  async function salvarConta(event) {
    event.preventDefault();
    setErro("");
    setSucesso("");

    const nome = obterNomeConta(formulario.modeloCartao, formulario.nome);
    const descricao = formulario.descricao.trim();
    const saldoInicial = Number(formulario.saldoInicial);

    if (formulario.modeloCartao === MODELOS_CARTAO.DEFAULT && nome.length < 2) {
      setErro("Informe um nome com pelo menos 2 caracteres.");
      return;
    }

    if (!Number.isFinite(saldoInicial) || saldoInicial < 0) {
      setErro("Informe um saldo inicial maior ou igual a zero.");
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

      setContas((contasAtuais) => ordenarContas([...contasAtuais, novaConta]));
      setFormulario(formularioInicial);
      setSucesso("Conta bancária cadastrada com sucesso.");
    } catch (error) {
      setErro(error.message || "Nao foi possivel cadastrar a conta.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#E9E9E9] p-6 text-zinc-950">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-xl bg-white px-5 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              to="/home"
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
            >
              <ArrowLeft size={16} />
              Voltar para home
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-zinc-950 text-white">
                <WalletCards size={22} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Contas Bancárias</h1>
                <p className="text-sm text-zinc-600">
                  Cadastre e acompanhe suas contas em um só lugar.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 px-4 py-3">
            <p className="text-xs font-medium uppercase text-zinc-500">
              Saldo total
            </p>
            <p className="text-xl font-bold">{formatarMoeda(saldoTotal)}</p>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 rounded-xl bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">Minhas contas</h2>
                <p className="text-sm text-zinc-600">
                  {contas.length} {contas.length === 1 ? "conta cadastrada" : "contas cadastradas"}
                </p>
              </div>
            </div>

            {carregando ? (
              <div className="flex min-h-52 items-center justify-center rounded-lg border border-dashed border-zinc-300 text-sm text-zinc-500">
                <LoaderCircle className="mr-2 animate-spin" size={18} />
                Carregando contas...
              </div>
            ) : contas.length === 0 ? (
              <div className="flex min-h-52 flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 px-6 text-center">
                <WalletCards className="mb-3 text-zinc-400" size={32} />
                <p className="font-semibold text-zinc-800">
                  Nenhuma conta cadastrada
                </p>
                <p className="mt-1 max-w-sm text-sm text-zinc-500">
                  Use o formulário ao lado para criar sua primeira conta.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {contas.map((conta) => (
                  <ContaCard key={conta.id} conta={conta} />
                ))}
              </div>
            )}
          </div>

          <aside className="rounded-xl bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-bold">Nova conta</h2>
              <p className="text-sm text-zinc-600">
                Informe os dados da conta bancária.
              </p>
            </div>

            <form className="space-y-4" onSubmit={salvarConta}>
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo</Label>
                <select
                  id="tipo"
                  name="tipo"
                  value={formulario.tipo}
                  onChange={atualizarCampo}
                  disabled={salvando}
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {tiposConta.map((tipo) => (
                    <option key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="saldoInicial">Saldo inicial</Label>
                <Input
                  id="saldoInicial"
                  name="saldoInicial"
                  type="number"
                  value={formulario.saldoInicial}
                  onChange={atualizarCampo}
                  min="0"
                  step="0.01"
                  disabled={salvando}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="modeloCartao">Modelo do cartão</Label>
                <select
                  id="modeloCartao"
                  name="modeloCartao"
                  value={formulario.modeloCartao}
                  onChange={atualizarCampo}
                  disabled={salvando}
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {opcoesCartao.map((opcao) => (
                    <option key={opcao.value} value={opcao.value}>
                      {opcao.label}
                    </option>
                  ))}
                </select>
              </div>

              {formulario.modeloCartao === MODELOS_CARTAO.DEFAULT && (
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome da conta</Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formulario.nome}
                    onChange={atualizarCampo}
                    placeholder="Ex.: Bradesco, Inter, Carteira"
                    disabled={salvando}
                    required
                    minLength={2}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  name="descricao"
                  value={formulario.descricao}
                  onChange={atualizarCampo}
                  placeholder="Observações sobre a conta"
                  disabled={salvando}
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

              <Button
                type="submit"
                className="w-full"
                disabled={salvando || carregando}
              >
                {salvando ? (
                  <LoaderCircle className="animate-spin" size={16} />
                ) : (
                  <Plus size={16} />
                )}
                {salvando ? "Salvando..." : "Adicionar conta"}
              </Button>
            </form>
          </aside>
        </section>
      </main>
    </div>
  );
}
