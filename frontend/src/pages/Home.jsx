import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { obterUsuario, removerAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  cadastrarCategoria,
  cadastrarLancamento,
  listarCategorias,
  listarContas,
} from "@/services/api";

const OPCAO_CATEGORIA_PERSONALIZADA = "__personalizada__";

export default function Dashboard() {
  const navigate = useNavigate();
  const usuario = obterUsuario();
  const [modalLancamentoAberto, setModalLancamentoAberto] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [contas, setContas] = useState([]);
  const [carregandoCategorias, setCarregandoCategorias] = useState(false);
  const [carregandoContas, setCarregandoContas] = useState(false);
  const [erroLancamento, setErroLancamento] = useState("");
  const [carregandoLancamento, setCarregandoLancamento] = useState(false);
  const [nomeCategoriaPersonalizada, setNomeCategoriaPersonalizada] =
    useState("");

  function sair() {
    removerAuth();
    navigate("/");
  }

  const [formLancamento, setFormLancamento] = useState({
    tipo: "RECEITA",
    idCategoria: "",
    idConta: "",
    valor: "",
    dataTransacao: "",
    descricao: "",
    recorrencia: "NENHUMA",
  });

  function handleChangeLancamento(e) {
    const { name, value } = e.target;

    if (name === "tipo") {
      setNomeCategoriaPersonalizada("");
    }

    setFormLancamento((prev) => {
      const novoEstado = {
        ...prev,
        [name]: value,
      };

      // sempre que trocar o tipo, limpa a categoria selecionada
      if (name === "tipo") {
        novoEstado.idCategoria = "";
      }

      return novoEstado;
    });
  }

  async function carregarCategorias() {
    setCarregandoCategorias(true);

    try {
      const resultado = await listarCategorias();
      setCategorias(resultado);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error.message);
      setErroLancamento("Erro ao carregar categorias.");
    } finally {
      setCarregandoCategorias(false);
    }
  }

  async function carregarContas() {
    setCarregandoContas(true);

    try {
      const resultado = await listarContas();
      setContas(resultado);
    } catch (error) {
      console.error("Erro ao carregar contas:", error.message);
      setErroLancamento("Erro ao carregar contas.");
    } finally {
      setCarregandoContas(false);
    }
  }

  function handleOpenChangeLancamento(aberto) {
    setModalLancamentoAberto(aberto);

    if (aberto) {
      setErroLancamento("");
      carregarCategorias();
      carregarContas();
    }
  }

  async function handleSubmitLancamento(e) {
    e.preventDefault();
    setErroLancamento("");
    setCarregandoLancamento(true);

    try {
      let idCategoria = formLancamento.idCategoria;
      let idConta = formLancamento.idConta;

      if (idCategoria === OPCAO_CATEGORIA_PERSONALIZADA) {
        const categoria = await cadastrarCategoria({
          nome: nomeCategoriaPersonalizada,
          tipo: formLancamento.tipo,
        });

        idCategoria = categoria.id;
      }

      await cadastrarLancamento({
        ...formLancamento,
        idCategoria,
        idConta: idConta || null,
      });

      setFormLancamento({
        tipo: "RECEITA",
        idCategoria: "",
        idConta: "",
        valor: "",
        dataTransacao: "",
        descricao: "",
        recorrencia: "NENHUMA",
      });
      setNomeCategoriaPersonalizada("");
      carregarCategorias();
      carregarContas();

      setModalLancamentoAberto(false);
    } catch (error) {
      setErroLancamento(error.message || "Erro ao cadastrar lançamento.");
    } finally {
      setCarregandoLancamento(false);
    }
  }

  const categoriasFiltradas = categorias.filter(
    (categoria) =>
      categoria.tipo?.toUpperCase() === formLancamento.tipo.toUpperCase(),
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <p data-nome="titulo" className="text-black text-2xl font-bold">
            {" "}
            SpendSmart
          </p>
          <Button variant="outline" onClick={sair}>
            Sair
          </Button>
        </div>
        <div data-nome="conteudo" className="flex flex-col items-start gap-10">
          <div data-nome="titulo">
            <h1 className="text-3xl text-black">
              Bem vindo ao SpendSmart, <strong>{usuario?.nome}</strong>
            </h1>
          </div>

          <div
            data-nome="opcoes"
            className="w-4/5 flex flex-row flex-wrap justify-between"
          >
            <h2>O que você deseja fazer?</h2>
            <Dialog
              open={modalLancamentoAberto}
              onOpenChange={handleOpenChangeLancamento}
            >
              <DialogTrigger asChild>
                <Button variant="secondary">Adicionar novo lançamento</Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Adicionar novo lançamento</DialogTitle>
                  <DialogDescription>
                    Preencha as informações do lançamento.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmitLancamento} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo</Label>
                    <select
                      id="tipo"
                      name="tipo"
                      value={formLancamento.tipo}
                      onChange={handleChangeLancamento}
                      className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                      required
                    >
                      <option value="RECEITA">Receita</option>
                      <option value="DESPESA">Despesa</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idCategoria">Categoria</Label>
                    <select
                      id="idCategoria"
                      name="idCategoria"
                      value={formLancamento.idCategoria}
                      onChange={handleChangeLancamento}
                      className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                      required
                    >
                      <option value="">Selecione uma categoria</option>

                      {!carregandoCategorias &&
                        categoriasFiltradas.map((categoria) => (
                          <option key={categoria.id} value={categoria.id}>
                            {categoria.nome}
                          </option>
                        ))}

                      <option value={OPCAO_CATEGORIA_PERSONALIZADA}>
                        Criar categoria personalizada
                      </option>
                    </select>

                    {formLancamento.idCategoria ===
                      OPCAO_CATEGORIA_PERSONALIZADA && (
                      <div className="space-y-2">
                        <Label htmlFor="nomeCategoriaPersonalizada">
                          Nome da categoria
                        </Label>
                        <Input
                          id="nomeCategoriaPersonalizada"
                          name="nomeCategoriaPersonalizada"
                          placeholder="Ex: Bônus, Comissão, Viagem"
                          value={nomeCategoriaPersonalizada}
                          onChange={(e) =>
                            setNomeCategoriaPersonalizada(e.target.value)
                          }
                          required
                        />
                      </div>
                    )}

                    {carregandoCategorias && (
                      <p className="text-sm text-slate-500">
                        Carregando categorias...
                      </p>
                    )}

                    {!carregandoCategorias &&
                      categoriasFiltradas.length === 0 && (
                        <p className="text-sm text-slate-500">
                          Nenhuma categoria disponível para{" "}
                          {formLancamento.tipo.toLowerCase()}.
                        </p>
                      )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idConta">Conta</Label>
                    <select
                      id="idConta"
                      name="idConta"
                      value={formLancamento.idConta}
                      onChange={handleChangeLancamento}
                      className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                      disabled={carregandoContas || contas.length === 0}
                      required={contas.length > 0}
                    >
                      <option value="">
                        {contas.length === 0
                          ? "Nenhuma conta cadastrada"
                          : "Selecione uma conta"}
                      </option>

                      {!carregandoContas &&
                        contas.map((conta) => (
                          <option key={conta.id} value={conta.id}>
                            {conta.nome}
                          </option>
                        ))}
                    </select>

                    {carregandoContas && (
                      <p className="text-sm text-slate-500">
                        Carregando contas...
                      </p>
                    )}

                    {!carregandoContas && contas.length === 0 && (
                      <p className="text-sm text-slate-500">
                        Você ainda não tem nenhuma conta bancária cadastrada.
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="valor">Valor</Label>
                    <Input
                      id="valor"
                      name="valor"
                      type="number"
                      step="0.01"
                      placeholder="0,00"
                      value={formLancamento.valor}
                      onChange={handleChangeLancamento}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dataTransacao">Data da transação</Label>
                    <Input
                      id="dataTransacao"
                      name="dataTransacao"
                      type="date"
                      value={formLancamento.dataTransacao}
                      onChange={handleChangeLancamento}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recorrencia">Recorrência</Label>
                    <select
                      id="recorrencia"
                      name="recorrencia"
                      value={formLancamento.recorrencia}
                      onChange={handleChangeLancamento}
                      className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                    >
                      <option value="NENHUMA">Nenhuma</option>
                      <option value="DIARIA">Diária</option>
                      <option value="SEMANAL">Semanal</option>
                      <option value="MENSAL">Mensal</option>
                      <option value="ANUAL">Anual</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea
                      id="descricao"
                      name="descricao"
                      placeholder="Descreva o lançamento"
                      value={formLancamento.descricao}
                      onChange={handleChangeLancamento}
                    />
                  </div>

                  {erroLancamento && (
                    <p className="text-sm text-red-500">{erroLancamento}</p>
                  )}

                  <DialogFooter>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={carregandoLancamento}
                    >
                      {carregandoLancamento
                        ? "Salvando..."
                        : "Salvar lançamento"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
