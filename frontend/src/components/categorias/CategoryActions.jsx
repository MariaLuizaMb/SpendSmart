import { ExternalLink, LoaderCircle, Pencil, Trash2 } from "lucide-react";

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

export default function CategoryActions({
  categoria,
  removendo,
  onEditar,
  onRemover,
  onVerLancamentos,
}) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        type="button"
        size="icon-sm"
        variant="outline"
        onClick={() => onVerLancamentos(categoria)}
        className="size-8 rounded-full border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
        aria-label={`Ver lançamentos associados a ${categoria.nome}`}
        title="Ver lançamentos associados"
      >
        <ExternalLink size={15} />
      </Button>

      <Button
        type="button"
        size="icon-sm"
        onClick={() => onEditar(categoria)}
        className="size-8 rounded-full bg-orange-400 text-white hover:bg-orange-500"
        aria-label={`Editar categoria ${categoria.nome}`}
        title="Editar categoria"
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
            aria-label={`Excluir categoria ${categoria.nome}`}
            title="Excluir categoria"
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
            <AlertDialogTitle>Excluir categoria?</AlertDialogTitle>
            <AlertDialogDescription>
              A exclusão seguirá a regra atual do sistema: categorias padrão ou
              categorias com lançamentos/orçamentos associados não podem ser
              removidas.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={removendo}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              disabled={removendo}
              onClick={() => onRemover(categoria)}
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
