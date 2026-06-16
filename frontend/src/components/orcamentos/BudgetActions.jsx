import { Eye, LoaderCircle, Pencil, Trash2 } from "lucide-react";

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
import { obterNomeOrcamento } from "@/components/orcamentos/budget-utils";

export default function BudgetActions({
  orcamento,
  removendo,
  onVerDetalhes,
  onEditar,
  onRemover,
}) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        type="button"
        size="icon-sm"
        variant="outline"
        onClick={() => onVerDetalhes(orcamento)}
        className="size-8 rounded-full border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
        aria-label={`Ver detalhes de ${obterNomeOrcamento(orcamento)}`}
        title="Ver detalhes"
      >
        <Eye size={15} />
      </Button>

      <Button
        type="button"
        size="icon-sm"
        onClick={() => onEditar(orcamento)}
        className="size-8 rounded-full bg-orange-400 text-white hover:bg-orange-500"
        aria-label={`Editar orçamento ${obterNomeOrcamento(orcamento)}`}
        title="Editar orçamento"
      >
        <Pencil size={15} />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            size="icon-sm"
            disabled={removendo}
            className="size-8 rounded-full bg-red-500 text-white hover:bg-red-600"
            aria-label={`Excluir orçamento ${obterNomeOrcamento(orcamento)}`}
            title="Excluir orçamento"
          >
            {removendo ? (
              <LoaderCircle className="animate-spin" size={15} />
            ) : (
              <Trash2 size={15} />
            )}
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir orçamento?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação remove o orçamento selecionado, mas não apaga os
              lançamentos associados ao período.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={removendo}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              disabled={removendo}
              onClick={() => onRemover(orcamento)}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
