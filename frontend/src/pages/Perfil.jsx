import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  ReceiptText,
  ShieldCheck,
  Tags,
  Trash2,
  WalletCards,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { HomeSidebar, NotificationsMenu } from "@/pages/Home";
import { obterToken, obterUsuario, removerAuth, salvarAuth } from "@/lib/auth";
import {
  listarCategorias,
  listarContas,
  listarLancamentos,
  listarOrcamentos,
  excluirContaUsuario,
} from "@/services/api";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const DATA_INDISPONIVEL = "Não disponível";

function formatarDataPerfil(valor) {
  if (!valor) return DATA_INDISPONIVEL;

  const data = new Date(valor);

  if (Number.isNaN(data.getTime())) return DATA_INDISPONIVEL;

  return new Intl.DateTimeFormat("pt-BR").format(data);
}

function obterDataUsuario(usuario, chaves) {
  return chaves.map((chave) => usuario?.[chave]).find(Boolean);
}

function obterIniciais(nome = "") {
  const partes = nome.trim().split(/\s+/).filter(Boolean).slice(0, 2);

  if (!partes.length) return "US";

  return partes
    .map((parte) => parte[0])
    .join("")
    .toUpperCase();
}

function contarOrcamentosAtivos(orcamentos) {
  const hoje = new Date();
  const mesAtual = hoje.getMonth() + 1;
  const anoAtual = hoje.getFullYear();

  return (orcamentos || []).filter((orcamento) => {
    if (!orcamento?.mes || !orcamento?.ano) return true;

    return (
      Number(orcamento.mes) === mesAtual && Number(orcamento.ano) === anoAtual
    );
  }).length;
}

function criarFormularioUsuario(usuario) {
  return {
    nome: usuario?.nome || "",
    email: usuario?.email || "",
  };
}

export default function Perfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(() => obterUsuario());
  const [formUsuario, setFormUsuario] = useState(() =>
    criarFormularioUsuario(usuario),
  );
  const [formSenha, setFormSenha] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarNovaSenha: "",
  });
  const [resumo, setResumo] = useState({
    contas: 0,
    categorias: 0,
    lancamentos: 0,
    orcamentosAtivos: 0,
  });
  const [carregandoResumo, setCarregandoResumo] = useState(true);
  const [erroResumo, setErroResumo] = useState("");
  const [mensagemPerfil, setMensagemPerfil] = useState("");

  const nomeExibicao = usuario?.nome || "Usuário";
  const emailExibicao = usuario?.email || "m@example.com";
  const dataCriacao = formatarDataPerfil(
    obterDataUsuario(usuario, ["criadoEm", "createdAt", "dataCriacao"]),
  );
  const dataAtualizacao = formatarDataPerfil(
    obterDataUsuario(usuario, ["atualizadoEm", "updatedAt", "dataAtualizacao"]),
  );

  const carregarResumo = useCallback(async () => {
    setCarregandoResumo(true);
    setErroResumo("");

    try {
      const [
        contasResultado,
        categoriasResultado,
        lancamentosResultado,
        orcamentosResultado,
      ] = await Promise.all([
        listarContas(),
        listarCategorias(),
        listarLancamentos(),
        listarOrcamentos(),
      ]);

      setResumo({
        contas: contasResultado?.length || 0,
        categorias: categoriasResultado?.length || 0,
        lancamentos: lancamentosResultado?.length || 0,
        orcamentosAtivos: contarOrcamentosAtivos(orcamentosResultado),
      });
    } catch (error) {
      setResumo({
        contas: 0,
        categorias: 0,
        lancamentos: 0,
        orcamentosAtivos: 0,
      });
      setErroResumo(
        error.message || "Não foi possível carregar o resumo da conta.",
      );
    } finally {
      setCarregandoResumo(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(carregarResumo);
  }, [carregarResumo]);

  useEffect(() => {
    if (!mensagemPerfil) return undefined;

    const timeout = window.setTimeout(() => setMensagemPerfil(""), 3500);

    return () => window.clearTimeout(timeout);
  }, [mensagemPerfil]);

  const cardsResumo = useMemo(
    () => [
      {
        titulo: "Contas cadastradas",
        valor: resumo.contas,
        icon: WalletCards,
        className: "bg-blue-50 text-blue-700",
      },
      {
        titulo: "Categorias",
        valor: resumo.categorias,
        icon: Tags,
        className: "bg-emerald-50 text-emerald-700",
      },
      {
        titulo: "Lançamentos",
        valor: resumo.lancamentos,
        icon: ReceiptText,
        className: "bg-violet-50 text-violet-700",
      },
      {
        titulo: "Orçamentos ativos",
        valor: resumo.orcamentosAtivos,
        icon: CalendarDays,
        className: "bg-orange-50 text-orange-700",
      },
    ],
    [resumo],
  );

  function atualizarCampoUsuario(event) {
    const { name, value } = event.target;

    setFormUsuario((formAtual) => ({
      ...formAtual,
      [name]: value,
    }));
  }

  function atualizarCampoSenha(event) {
    const { name, value } = event.target;

    setFormSenha((formAtual) => ({
      ...formAtual,
      [name]: value,
    }));
  }

  function salvarPerfil(event) {
    event.preventDefault();

    const token = obterToken();
    const usuarioAtualizado = {
      ...usuario,
      nome: formUsuario.nome.trim() || "Usuário",
      email: formUsuario.email.trim() || emailExibicao,
      atualizadoEm: new Date().toISOString(),
    };

    if (token) {
      salvarAuth(token, usuarioAtualizado);
    }

    setUsuario(usuarioAtualizado);
    setMensagemPerfil("Informações pessoais atualizadas nesta sessão.");
  }

  function cancelarPerfil() {
    setFormUsuario(criarFormularioUsuario(usuario));
  }

  function alterarSenha(event) {
    event.preventDefault();
    setFormSenha({
      senhaAtual: "",
      novaSenha: "",
      confirmarNovaSenha: "",
    });
    setMensagemPerfil("A solicitação de alteração de senha foi registrada.");
  }

  function desconectar() {
    removerAuth();
    navigate("/");
  }

  async function excluirConta() {
    try {
      // Importante: a API faz DELETE e remove definitivamente no backend.
      // Após sucesso, limpamos o auth local e redirecionamos.
      await excluirContaUsuario();

      removerAuth();

      navigate("/");
    } catch (error) {
      setMensagemPerfil(error.message || "Não foi possível excluir a conta.");
    }
  }

  return (
    <TooltipProvider>
      <SidebarProvider
        data-ui="perfil-sidebar-provider"
        className="h-screen overflow-hidden bg-[#E9E9E9]"
        style={{
          "--sidebar-width": "17.5rem",
          "--sidebar-width-icon": "4rem",
          "--sidebar-floating-offset": "1rem",
        }}
      >
        <HomeSidebar usuario={usuario} paginaAtiva="perfil" />

        <SidebarInset className="flex h-screen min-h-0 min-w-0 flex-col gap-5 overflow-y-auto bg-[#E9E9E9] p-4 sm:py-4 sm:pl-2 sm:pr-4">
          <header className="flex shrink-0 items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <SidebarTrigger className="mt-1 size-9 shrink-0 md:hidden" />

              <div>
                <h1 className="text-2xl font-bold leading-tight text-zinc-950 sm:text-3xl">
                  Perfil
                </h1>
                <p className="mt-2 max-w-3xl text-sm text-zinc-700">
                  Gerencie suas informações pessoais, segurança da conta e dados
                  vinculados ao seu perfil.
                </p>
              </div>
            </div>

            <NotificationsMenu variant="header" />
          </header>

          <main className="space-y-5">
            <Card className="rounded-xl border-0 bg-white p-5 shadow-sm ring-1 ring-zinc-200/70 sm:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-400 text-2xl font-bold text-white shadow-sm sm:size-24 sm:text-3xl">
                    {obterIniciais(nomeExibicao)}
                  </div>

                  <div className="min-w-0">
                    <h2 className="break-words text-2xl font-bold leading-tight text-zinc-950">
                      {nomeExibicao}
                    </h2>
                    <p className="mt-1 break-words text-sm text-zinc-600">
                      {emailExibicao}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex h-8 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-xs font-medium text-zinc-700">
                        <CalendarDays className="size-4" />
                        Conta criada em {dataCriacao}
                      </span>
                      <span className="inline-flex h-8 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-xs font-medium text-zinc-700">
                        <ShieldCheck className="size-4" />
                        Última atualização {dataAtualizacao}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-3 sm:w-44">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={desconectar}
                  >
                    Desconectar
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        variant="destructive"
                        className="w-full"
                      >
                        Excluir conta
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogMedia className="bg-red-50 text-red-600">
                          <Trash2 />
                        </AlertDialogMedia>
                        <AlertDialogTitle>Excluir conta?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação remove o acesso local à conta neste
                          dispositivo. Confirme apenas se deseja sair e
                          interromper o uso desta sessão.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          variant="destructive"
                          onClick={excluirConta}
                        >
                          Excluir conta
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </Card>

            {mensagemPerfil && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 shadow-sm">
                {mensagemPerfil}
              </div>
            )}

            <section className="grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)]">
              <Card className="rounded-xl border-0 bg-white py-5 shadow-sm ring-1 ring-zinc-200/70">
                <CardHeader className="px-5">
                  <CardTitle className="text-lg font-bold text-zinc-950">
                    Informações pessoais
                  </CardTitle>
                  <CardDescription>
                    Estas são as informações principais da sua conta.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-5">
                  <form onSubmit={salvarPerfil} className="space-y-5">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome completo</Label>
                        <Input
                          id="nome"
                          name="nome"
                          value={formUsuario.nome}
                          onChange={atualizarCampoUsuario}
                          className="h-10 truncate rounded-lg border-zinc-300 bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formUsuario.email}
                          onChange={atualizarCampoUsuario}
                          className="h-10 truncate rounded-lg border-zinc-300 bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dataCriacao">Data de criação</Label>
                        <div className="relative">
                          <Input
                            id="dataCriacao"
                            value={dataCriacao}
                            readOnly
                            className="h-10 truncate rounded-lg border-zinc-300 bg-zinc-50 pr-10 text-zinc-600"
                          />
                          <CalendarDays className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dataAtualizacao">
                          Última atualização
                        </Label>
                        <div className="relative">
                          <Input
                            id="dataAtualizacao"
                            value={dataAtualizacao}
                            readOnly
                            className="h-10 truncate rounded-lg border-zinc-300 bg-zinc-50 pr-10 text-zinc-600"
                          />
                          <CalendarDays className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-end gap-3 sm:flex-row">
                      <Button
                        type="submit"
                        className="bg-zinc-950 text-white hover:bg-zinc-800"
                      >
                        Salvar
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={cancelarPerfil}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="rounded-xl border-0 bg-white py-5 shadow-sm ring-1 ring-zinc-200/70">
                <CardHeader className="px-5">
                  <CardTitle className="text-lg font-bold text-zinc-950">
                    Segurança da conta
                  </CardTitle>
                  <CardDescription>
                    Gerencie sua senha e mantenha sua conta segura.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-5">
                  <form onSubmit={alterarSenha} className="space-y-5">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="senhaAtual">Senha atual</Label>
                        <Input
                          id="senhaAtual"
                          name="senhaAtual"
                          type="password"
                          value={formSenha.senhaAtual}
                          onChange={atualizarCampoSenha}
                          placeholder="Digite sua senha atual"
                          className="h-10 truncate rounded-lg border-zinc-300 bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="novaSenha">Nova senha</Label>
                        <Input
                          id="novaSenha"
                          name="novaSenha"
                          type="password"
                          value={formSenha.novaSenha}
                          onChange={atualizarCampoSenha}
                          placeholder="Digite a nova senha"
                          className="h-10 truncate rounded-lg border-zinc-300 bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmarNovaSenha">
                          Confirmar nova senha
                        </Label>
                        <Input
                          id="confirmarNovaSenha"
                          name="confirmarNovaSenha"
                          type="password"
                          value={formSenha.confirmarNovaSenha}
                          onChange={atualizarCampoSenha}
                          placeholder="Confirme a nova senha"
                          className="h-10 truncate rounded-lg border-zinc-300 bg-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        variant="outline"
                        className="w-full sm:w-fit"
                      >
                        Alterar senha
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </section>

            <Card className="rounded-xl border-0 bg-white py-5 shadow-sm ring-1 ring-zinc-200/70">
              <CardHeader className="px-5">
                <CardTitle className="text-lg font-bold text-zinc-950">
                  Resumo da conta
                </CardTitle>
                <CardDescription>
                  Visão geral da sua atividade no SpendSmart.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-5">
                {erroResumo && (
                  <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {erroResumo}
                  </p>
                )}

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {cardsResumo.map((card) => (
                    <div
                      key={card.titulo}
                      className="flex min-h-24 items-center gap-4 rounded-xl border border-zinc-200 bg-linear-to-r from-white via-white to-zinc-50 p-4 shadow-sm"
                    >
                      <div
                        className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${card.className}`}
                      >
                        <card.icon className="size-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-zinc-600">
                          {card.titulo}
                        </p>
                        <p className="mt-1 text-2xl font-bold leading-none text-zinc-950">
                          {carregandoResumo ? "..." : card.valor}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
