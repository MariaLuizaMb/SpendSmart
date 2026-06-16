import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";

import {
  criarFormularioOrcamentoInicial,
  criarPayloadOrcamento,
  formatarValorMonetarioInput,
  nomesMeses,
  OPCAO_ORCAMENTO_GERAL,
} from "@/components/orcamentos/budget-utils";
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
import { Textarea } from "@/components/ui/textarea";

export default function BudgetFormDialog({
  aberto,
  onAbertoChange,
  orcamento,
  categorias,
  salvando,
  erro,
  sucesso,
  onSalvar,
}) {
  const [formulario, setFormulario] = useState(() =>
    criarFormularioOrcamentoInicial(orcamento),
  );
  const editando = Boolean(orcamento);
  const categoriasDespesa = useMemo(
    () =>
      (categorias || []).filter(
        (categoria) => String(categoria.tipo || "").toUpperCase() === "DESPESA",
      ),
    [categorias],
  );

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
      ...(name === "tipo" && value === "GERAL"
        ? { idCategoria: OPCAO_ORCAMENTO_GERAL }
        : {}),
    }));
  }

  function atualizarValor(event) {
    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      valor: formatarValorMonetarioInput(event.target.value),
    }));
  }

  function salvar(event) {
    event.preventDefault();
    onSalvar(criarPayloadOrcamento(formulario));
  }

  return (
    <Dialog open={aberto} onOpenChange={onAbertoChange}>
      <DialogContent className="max-h-[92vh] overflow-hidden p-0 sm:max-w-lg">
        <form onSubmit={salvar} className="flex max-h-[92vh] flex-col">
          <Card className="max-h-[92vh] overflow-hidden border-0 py-0 ring-0">
            <CardHeader className="px-5 pb-2 pt-5">
              <DialogTitle asChild>
                <CardTitle>
                  {editando ? "Editar orçamento" : "Novo orçamento"}
                </CardTitle>
              </DialogTitle>
              <DialogDescription>
                {editando
                  ? "Atualize o limite mensal e os dados do orçamento selecionado."
                  : "Cadastre um limite mensal geral ou por categoria."}
              </DialogDescription>
            </CardHeader>

            <ScrollArea className="h-[54vh] max-h-[440px] min-h-0">
              <CardContent className="space-y-4 px-5 py-4 pr-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="tipoOrcamento">Tipo do orçamento</Label>
                    <Select
                      value={formulario.tipo}
                      disabled={salvando}
                      onValueChange={(valor) =>
                        atualizarCampoFormulario("tipo", valor)
                      }
                    >
                      <SelectTrigger id="tipoOrcamento">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GERAL">Geral</SelectItem>
                        <SelectItem value="CATEGORIA">Categoria</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="valorOrcamento">Valor limite</Label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                        R$
                      </span>
                      <Input
                        id="valorOrcamento"
                        name="valor"
                        type="text"
                        inputMode="numeric"
                        value={formulario.valor}
                        onChange={atualizarValor}
                        placeholder="0,00"
                        disabled={salvando}
                        className="h-10 pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                {formulario.tipo === "CATEGORIA" && (
                  <div className="space-y-1.5">
                    <Label htmlFor="categoriaOrcamento">Categoria</Label>
                    <Select
                      value={formulario.idCategoria}
                      disabled={salvando}
                      onValueChange={(valor) =>
                        atualizarCampoFormulario("idCategoria", valor)
                      }
                    >
                      <SelectTrigger id="categoriaOrcamento">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriasDespesa.length === 0 && (
                          <SelectItem value="__sem_categorias__" disabled>
                            Nenhuma categoria de despesa encontrada
                          </SelectItem>
                        )}
                        {categoriasDespesa.map((categoria) => (
                          <SelectItem key={categoria.id} value={categoria.id}>
                            {categoria.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="mesOrcamento">Período</Label>
                    <Select
                      value={formulario.mes}
                      disabled={salvando}
                      onValueChange={(valor) =>
                        atualizarCampoFormulario("mes", valor)
                      }
                    >
                      <SelectTrigger id="mesOrcamento">
                        <SelectValue placeholder="Selecione o mês" />
                      </SelectTrigger>
                      <SelectContent>
                        {nomesMeses.map((nome, indice) => (
                          <SelectItem key={nome} value={String(indice + 1)}>
                            {nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="anoOrcamento">Ano</Label>
                    <Input
                      id="anoOrcamento"
                      name="ano"
                      type="number"
                      min="1900"
                      max="9999"
                      value={formulario.ano}
                      onChange={atualizarCampo}
                      disabled={salvando}
                      className="h-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="descricaoOrcamento">Observação</Label>
                  <Textarea
                    id="descricaoOrcamento"
                    name="descricao"
                    value={formulario.descricao}
                    onChange={atualizarCampo}
                    placeholder="Observações sobre o orçamento"
                    disabled={salvando}
                    className="min-h-20"
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
              </CardContent>
            </ScrollArea>

            <CardFooter className="justify-end gap-2 border-t-0 bg-transparent px-5 pb-5 pt-2">
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
                {salvando ? "Salvando..." : "Salvar orçamento"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
}
