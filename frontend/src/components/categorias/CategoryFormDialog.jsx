import { CheckCircle2, LoaderCircle } from "lucide-react";
import { useState } from "react";

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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formularioInicial = {
  nome: "",
  tipo: "DESPESA",
};

function criarFormulario(categoria) {
  if (!categoria) return formularioInicial;

  return {
    nome: categoria.nome || "",
    tipo: categoria.tipo || "DESPESA",
  };
}

export default function CategoryFormDialog({
  aberto,
  categoria,
  salvando,
  erro,
  sucesso,
  onAbertoChange,
  onSalvar,
}) {
  const [formulario, setFormulario] = useState(() =>
    criarFormulario(categoria),
  );
  const editando = Boolean(categoria);

  function atualizarCampo(event) {
    const { name, value } = event.target;

    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
    }));
  }

  function atualizarTipo(tipo) {
    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      tipo,
    }));
  }

  function salvar(event) {
    event.preventDefault();

    onSalvar({
      nome: formulario.nome.trim(),
      tipo: formulario.tipo,
    });
  }

  return (
    <Dialog open={aberto} onOpenChange={onAbertoChange}>
      <DialogContent className="max-h-[92vh] overflow-hidden p-0 sm:max-w-lg">
        <form onSubmit={salvar} className="flex max-h-[92vh] flex-col">
          <Card className="max-h-[92vh] overflow-hidden border-0 py-0 ring-0">
            <CardHeader className="px-5 pb-2 pt-5">
              <DialogTitle asChild>
                <CardTitle>
                  {editando ? "Editar categoria" : "Nova categoria"}
                </CardTitle>
              </DialogTitle>
              <DialogDescription>
                {editando
                  ? "Atualize os dados da categoria selecionada."
                  : "Cadastre uma categoria para organizar seus lançamentos."}
              </DialogDescription>
            </CardHeader>

            <ScrollArea className="max-h-96 min-h-0">
              <CardContent className="space-y-4 px-5 py-4 pr-6">
                <div className="space-y-1.5">
                  <Label htmlFor="nomeCategoria">Nome</Label>
                  <Input
                    id="nomeCategoria"
                    name="nome"
                    value={formulario.nome}
                    onChange={atualizarCampo}
                    placeholder="Ex.: Mercado, Salário, Freelance"
                    disabled={salvando}
                    className="px-3"
                    minLength={2}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="tipoCategoria">Tipo</Label>
                  <Select
                    value={formulario.tipo}
                    disabled={salvando}
                    onValueChange={atualizarTipo}
                  >
                    <SelectTrigger id="tipoCategoria">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DESPESA">Despesa</SelectItem>
                      <SelectItem value="RECEITA">Receita</SelectItem>
                    </SelectContent>
                  </Select>
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
                type="submit"
                disabled={salvando}
                className="bg-zinc-950 text-white hover:bg-zinc-800"
              >
                {salvando ? (
                  <LoaderCircle className="animate-spin" size={16} />
                ) : null}
                {salvando ? "Salvando..." : "Salvar categoria"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
}
