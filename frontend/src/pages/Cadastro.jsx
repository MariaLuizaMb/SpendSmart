import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { cadastrarUsuario } from "@/services/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function MensagemCampo({ mensagem }) {
  if (!mensagem) return null;

  return (
    <p className="pointer-events-none absolute bottom-0 left-0 max-w-full truncate text-xs leading-4 text-red-500">
      {mensagem}
    </p>
  );
}

function MensagemSenha({ mensagem }) {
  if (!mensagem) return null;

  return <p className="mt-1 text-xs text-red-500">{mensagem}</p>;
}

export default function Cadastro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [errosCampos, setErrosCampos] = useState({});
  const [submitTentado, setSubmitTentado] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  function validarCampo(nome, valor, dados = form) {
    switch (nome) {
      case "nome":
        if (!valor.trim()) return "O nome é obrigatório.";
        if (valor.trim().length < 3)
          return "O nome deve ter pelo menos 3 caracteres.";
        return "";

      case "email":
        if (!valor.trim()) return "O email é obrigatório.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
          return "Digite um email válido.";
        }
        return "";

      case "senha":
        if (!valor.trim()) return "A senha é obrigatória.";
        if (valor.length < 8)
          return "A senha precisa ter pelo menos 8 caracteres.";
        return "";

      case "confirmarSenha":
        if (!valor.trim()) return "Confirme sua senha.";
        if (valor.length < 8)
          return "A senha precisa ter pelo menos 8 caracteres.";
        if (valor !== dados.senha) return "As senhas não coincidem.";
        return "";

      default:
        return "";
    }
  }

  function validarFormulario(dados = form) {
    const novosErros = {
      nome: validarCampo("nome", dados.nome, dados),
      email: validarCampo("email", dados.email, dados),
      senha: validarCampo("senha", dados.senha, dados),
      confirmarSenha: validarCampo(
        "confirmarSenha",
        dados.confirmarSenha,
        dados,
      ),
    };

    setErrosCampos(novosErros);

    return Object.values(novosErros).every((erro) => !erro);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    const novoForm = {
      ...form,
      [name]: value,
    };

    setForm(novoForm);

    setErrosCampos((prev) => ({
      ...prev,
      [name]: validarCampo(name, value, novoForm),
    }));

    if (name === "senha" && novoForm.confirmarSenha) {
      setErrosCampos((prev) => ({
        ...prev,
        confirmarSenha: validarCampo(
          "confirmarSenha",
          novoForm.confirmarSenha,
          novoForm,
        ),
      }));
    }

    if (name === "confirmarSenha") {
      setErrosCampos((prev) => ({
        ...prev,
        confirmarSenha: validarCampo("confirmarSenha", value, novoForm),
      }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");
    setSubmitTentado(true);

    const formularioValido = validarFormulario(form);

    if (!formularioValido) return;

    setCarregando(true);

    try {
      await cadastrarUsuario({
        nome: form.nome,
        email: form.email,
        senha: form.senha,
      });

      setSucesso("Usuário cadastrado com sucesso.");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      setErro(error.message || "Erro ao cadastrar usuário.");
    } finally {
      setCarregando(false);
    }
  }

  function classeInput(campo) {
    const temErro = erroVisivel(campo);
    const campoValido =
      form[campo].trim() && !validarCampo(campo, form[campo], form);

    if (temErro) {
      return "h-10 rounded-md border-red-500 bg-zinc-50 text-sm shadow-sm focus-visible:bg-zinc-50 focus-visible:ring-red-500";
    }

    if (campoValido) {
      return "h-10 rounded-md border-green-500 bg-zinc-100 text-sm shadow-sm focus-visible:bg-zinc-50 focus-visible:ring-green-500";
    }

    return "h-10 rounded-md border-zinc-300 bg-zinc-50 text-sm shadow-sm focus-visible:bg-zinc-50 focus-visible:ring-zinc-400";
  }

  function erroObrigatorio(mensagem) {
    return (
      mensagem === "O nome é obrigatório." ||
      mensagem === "O email é obrigatório." ||
      mensagem === "A senha é obrigatória." ||
      mensagem === "Confirme sua senha."
    );
  }

  function erroVisivel(campo) {
    const mensagem = errosCampos[campo];

    if (!mensagem) return "";
    if (erroObrigatorio(mensagem) && !submitTentado) return "";
    if (!form[campo].trim() && !submitTentado) return "";

    return mensagem;
  }

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-8 text-zinc-950">
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
        <section className="grid w-full max-w-4xl overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl md:grid-cols-2">
          <div className="px-8 py-8 sm:px-10 md:px-12">
            <div className="mx-auto w-full max-w-92.5">
              <div className="mb-5 flex items-center justify-center gap-2 text-sm font-medium text-zinc-900">
                <span className="inline-flex h-4 w-4 items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 7h6" />
                    <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
                    <rect width="12" height="13" x="6" y="7" rx="2" />
                    <path d="M9 11h6" />
                    <path d="M9 15h4" />
                  </svg>
                </span>
                <span>SpendSmart</span>
              </div>

              <div className="mb-7 text-center">
                <h1 className="text-2xl font-bold tracking-tight">
                  Crie Sua Conta
                </h1>

                <p className="mx-auto mt-2 max-w-65 text-sm leading-5 text-zinc-500">
                  Coloque suas informações abaixo para criar sua conta!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="relative space-y-1 pb-3">
                  <Label htmlFor="nome" className="text-sm font-medium">
                    Nome
                  </Label>

                  <Input
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder="Nome completo"
                    value={form.nome}
                    onChange={handleChange}
                    className={classeInput("nome")}
                  />

                  <MensagemCampo mensagem={erroVisivel("nome")} />
                </div>

                <div className="relative space-y-1 pb-3">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className={classeInput("email")}
                  />

                  <MensagemCampo mensagem={erroVisivel("email")} />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="relative space-y-1 pb-3">
                    <Label htmlFor="senha" className="text-sm font-medium">
                      Senha
                    </Label>

                    <Input
                      id="senha"
                      name="senha"
                      type="password"
                      value={form.senha}
                      onChange={handleChange}
                      className={classeInput("senha")}
                    />

                    <MensagemSenha mensagem={erroVisivel("senha")} />
                  </div>

                  <div className="relative space-y-1 pb-3">
                    <Label
                      htmlFor="confirmarSenha"
                      className="text-sm font-medium"
                    >
                      Confirmar Senha
                    </Label>

                    <Input
                      id="confirmarSenha"
                      name="confirmarSenha"
                      type="password"
                      value={form.confirmarSenha}
                      onChange={handleChange}
                      className={classeInput("confirmarSenha")}
                    />

                    <MensagemSenha mensagem={erroVisivel("confirmarSenha")} />
                  </div>
                </div>

                {sucesso && (
                  <p className="rounded-md bg-green-50 px-3 py-2 text-center text-sm text-green-600">
                    {sucesso}
                  </p>
                )}

                {erro && (
                  <p className="rounded-md bg-red-50 px-3 py-2 text-center text-sm text-red-600">
                    {erro}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={carregando}
                  className="h-10 w-full rounded-md bg-zinc-950 text-sm font-medium text-white hover:bg-zinc-800"
                >
                  {carregando ? "Criando conta..." : "Criar Conta"}
                </Button>

                <p className="pt-3 text-center text-sm text-zinc-500">
                  Já tem uma conta?{" "}
                  <Link
                    to="/"
                    className="font-medium text-zinc-700 underline-offset-4 hover:text-zinc-950 hover:underline"
                  >
                    Entre aqui!
                  </Link>
                </p>
              </form>
            </div>
          </div>

          <div className="hidden items-center justify-center border-l border-zinc-100 bg-zinc-50 md:flex">
            <div className="relative flex h-40 w-40 items-center justify-center">
              <div className="absolute h-px w-36 rotate-45 bg-zinc-200" />
              <div className="absolute h-px w-36 -rotate-45 bg-zinc-200" />

              <div className="absolute h-24 w-24 rounded-full border border-zinc-200" />
              <div className="absolute h-14 w-14 rounded-full border border-zinc-200 bg-zinc-50" />

              <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-400 shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="14" height="11" x="5" y="7" rx="2" />
                  <path d="m8 11 2.5 2.5L16 9" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-zinc-500">
          Clicando em Criar Conta, você aceita nossos{" "}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-zinc-800"
          >
            Termos de Serviços
          </a>{" "}
          e{" "}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-zinc-800"
          >
            Política de Privacidade
          </a>
          .
        </p>
      </div>
    </main>
  );
}
