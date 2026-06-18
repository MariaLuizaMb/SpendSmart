import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { loginUsuario } from "@/services/api";
import { salvarAuth } from "@/lib/auth";
import { emailTemFormatoValido } from "@/utils/emailValidator";
import capaLogin from "@/assets/img/capa_login.png";
import logoSpendSmart from "@/assets/img/logo.svg";

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

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  const [errosCampos, setErrosCampos] = useState({});
  const [submitTentado, setSubmitTentado] = useState(false);
  const [errosLogin, setErrosLogin] = useState({});
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [carregando, setCarregando] = useState(false);

  function validarCampo(nome, valor) {
    switch (nome) {
      case "email":
        if (!valor.trim()) return "O email é obrigatório.";
        if (!emailTemFormatoValido(valor)) {
          return "Digite um email válido.";
        }
        return "";

      case "senha":
        if (!valor.trim()) return "A senha é obrigatória.";
        if (valor.length < 8)
          return "A senha precisa ter pelo menos 8 caracteres.";
        return "";

      default:
        return "";
    }
  }

  function validarFormulario() {
    const novosErros = {
      email: validarCampo("email", form.email),
      senha: validarCampo("senha", form.senha),
    };

    setErrosCampos(novosErros);

    return !novosErros.email && !novosErros.senha;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setErrosLogin({});

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrosCampos((prev) => ({
      ...prev,
      [name]: validarCampo(name, value),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrosLogin({});
    setSubmitTentado(true);

    const formularioValido = validarFormulario();

    if (!formularioValido) return;

    setCarregando(true);

    try {
      const resultado = await loginUsuario(form);

      salvarAuth(resultado.token, resultado.usuario);
      navigate("/home");
    } catch (error) {
      const mensagem = error.message || "Email ou senha incorretos.";

      setErrosLogin(errosDoLogin(mensagem));
    } finally {
      setCarregando(false);
    }
  }

  function classeInput(campo) {
    const temErro = erroVisivel(campo);
    const campoValido = form[campo].trim() && !validarCampo(campo, form[campo]);

    if (temErro) {
      return "h-10 rounded-md border-red-500 bg-zinc-50 text-sm shadow-sm focus-visible:bg-zinc-50 focus-visible:ring-red-500";
    }

    if (campoValido) {
      return "h-10 rounded-md border-green-500 bg-zinc-50 text-sm shadow-sm focus-visible:bg-zinc-50 focus-visible:ring-green-500";
    }

    return "h-10 rounded-md border-zinc-300 bg-zinc-50 text-sm shadow-sm focus-visible:bg-zinc-50 focus-visible:ring-zinc-400";
  }

  function erroObrigatorio(mensagem) {
    return (
      mensagem === "O email é obrigatório." ||
      mensagem === "A senha é obrigatória."
    );
  }

  function errosDoLogin(mensagem) {
    const mensagemNormalizada = mensagem.toLowerCase();

    if (
      mensagemNormalizada.includes("email e senha") ||
      (mensagemNormalizada.includes("email") &&
        mensagemNormalizada.includes("senha"))
    ) {
      return {
        email: "Email inválido.",
        senha: "Senha inválida.",
      };
    }

    if (mensagemNormalizada.includes("email")) {
      return {
        email: mensagem,
      };
    }

    if (mensagemNormalizada.includes("senha")) {
      return {
        senha: mensagem,
      };
    }

    return {
      email: mensagem,
      senha: mensagem,
    };
  }

  function erroVisivel(campo) {
    const mensagem = errosLogin[campo] || errosCampos[campo];

    if (!mensagem) return "";
    if (erroObrigatorio(mensagem) && !submitTentado) return "";
    if (!form[campo].trim() && !submitTentado) return "";

    return mensagem;
  }

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-8 text-zinc-950">
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
        <section className="grid w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-xl md:grid-cols-2">
          <div className="px-8 py-8 sm:px-10 md:px-12">
            <div className="mb-5 flex items-center justify-center gap-2 text-sm font-medium text-zinc-900">
              <img
                src={logoSpendSmart}
                alt=""
                aria-hidden="true"
                className="h-5 w-5"
              />
              <span>SpendSmart</span>
            </div>

            <div className="mb-7 text-center">
              <h1 className="text-2xl font-bold tracking-tight">
                Bem vindo de volta!
              </h1>
              <p className="mt-2 text-sm text-zinc-500">
                Acesse seu gerenciador de finanças.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div className="relative space-y-1 pb-3">
                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor="senha" className="text-sm font-medium">
                    Senha
                  </Label>

                  <button
                    type="button"
                    className="text-xs font-medium text-zinc-700 underline-offset-4 hover:underline"
                  >
                    Esqueceu a Senha?
                  </button>
                </div>

                <Input
                  id="senha"
                  name="senha"
                  type={senhaVisivel ? "text" : "password"}
                  value={form.senha}
                  onChange={handleChange}
                  className={`${classeInput("senha")} pr-10`}
                />

                <button
                  type="button"
                  aria-label={senhaVisivel ? "Ocultar senha" : "Mostrar senha"}
                  title={senhaVisivel ? "Ocultar senha" : "Mostrar senha"}
                  onClick={() => setSenhaVisivel((visivel) => !visivel)}
                  className="absolute right-2 top-7 flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                >
                  {senhaVisivel ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>

                <MensagemSenha mensagem={erroVisivel("senha")} />
              </div>

              <Button
                type="submit"
                disabled={carregando}
                className="h-10 w-full rounded-md bg-zinc-950 text-sm font-medium text-white hover:bg-zinc-800"
              >
                {carregando ? "Entrando..." : "Entrar"}
              </Button>

              <p className="pt-3 text-center text-sm text-zinc-500">
                Não tem uma conta?{" "}
                <Link
                  to="/cadastro"
                  className="font-medium text-zinc-700 underline underline-offset-4 hover:text-zinc-950"
                >
                  Cadastrar
                </Link>
              </p>
            </form>
          </div>

          <div className="hidden border-l border-zinc-100 bg-zinc-50 md:block">
            <img
              src={capaLogin}
              alt="Capa do SpendSmart"
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-zinc-500">
          Clicando em entrar, você aceita nossos{" "}
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
