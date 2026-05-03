import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut, Mail, User } from "lucide-react";

import { obterUsuario, removerAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default function Perfil() {
  const navigate = useNavigate();
  const usuario = obterUsuario();

  function sair() {
    removerAuth();
    navigate("/");
  }

  return (
    <main className="min-h-screen bg-[#E9E9E9] p-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <Button
          asChild
          variant="ghost"
          className="w-fit px-2 text-zinc-700 hover:text-zinc-950"
        >
          <Link to="/home">
            <ArrowLeft />
            Voltar
          </Link>
        </Button>

        <section className="rounded-xl bg-white p-6">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-zinc-950">Perfil</h1>
              <p className="mt-2 text-sm text-zinc-600">
                Informações da sua conta SpendSmart.
              </p>
            </div>

            <Button
              type="button"
              onClick={sair}
              className="bg-zinc-950 text-white hover:bg-zinc-800"
            >
              <LogOut />
              Sair
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-200 p-4">
              <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-900">
                <User size={20} />
              </div>
              <p className="text-xs font-medium uppercase text-zinc-500">
                Nome
              </p>
              <p className="mt-1 text-base font-semibold text-zinc-950">
                {usuario?.nome || "Usuário"}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-200 p-4">
              <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-900">
                <Mail size={20} />
              </div>
              <p className="text-xs font-medium uppercase text-zinc-500">
                Email
              </p>
              <p className="mt-1 break-words text-base font-semibold text-zinc-950">
                {usuario?.email || "m@example.com"}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
