import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  criarMapaCodigosTransacao,
  dashboardTypography,
  filtrarLancamentos,
  formatarData,
  formatarMoeda,
  formatarTipo,
  obterCodigoTransacao,
  obterNomeCategoria,
  obterNomeConta,
  opcoesOrdenacao,
  ordenarLancamentos,
} from "./dashboard-utils";

function CheckboxTabela({ checked, onChange, label }) {
  return (
    <Checkbox
      checked={checked}
      onCheckedChange={onChange}
      aria-label={label}
      className="border-zinc-300 data-checked:border-zinc-950 data-checked:bg-zinc-950 data-checked:text-white"
    />
  );
}

function DetalhesTransacaoDialog({ lancamento, codigo, onAbertoChange }) {
  if (!lancamento) return null;

  return (
    <Dialog open={Boolean(lancamento)} onOpenChange={onAbertoChange}>
      <DialogContent className="p-0 sm:max-w-lg">
        <Card className="border-0 py-0 ring-0">
          <CardHeader className="px-5 pb-2 pt-5">
            <DialogTitle asChild>
              <CardTitle>Detalhes da transação</CardTitle>
            </DialogTitle>
            <DialogDescription>
              Consulte as informações do lançamento selecionado.
            </DialogDescription>
          </CardHeader>
          <CardContent className="grid gap-3 px-5 py-4 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-200 p-3">
              <p className={dashboardTypography.detailLabel}>ID</p>
              <p className={dashboardTypography.detailValue}>{codigo}</p>
            </div>
            <div className="rounded-lg border border-zinc-200 p-3">
              <p className={dashboardTypography.detailLabel}>Tipo</p>
              <p className={dashboardTypography.detailValue}>
                {formatarTipo(lancamento.tipo)}
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 p-3">
              <p className={dashboardTypography.detailLabel}>Valor</p>
              <p className={dashboardTypography.detailValue}>
                {formatarMoeda(lancamento.valor)}
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 p-3">
              <p className={dashboardTypography.detailLabel}>Data</p>
              <p className={dashboardTypography.detailValue}>
                {formatarData(lancamento.dataTransacao)}
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 p-3">
              <p className={dashboardTypography.detailLabel}>Categoria</p>
              <p className={dashboardTypography.detailValue}>
                {obterNomeCategoria(lancamento)}
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 p-3">
              <p className={dashboardTypography.detailLabel}>Conta</p>
              <p className={dashboardTypography.detailValue}>
                {obterNomeConta(lancamento)}
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 p-3 sm:col-span-2">
              <p className={dashboardTypography.detailLabel}>Descrição</p>
              <p className={`mt-1 ${dashboardTypography.body}`}>
                {lancamento.descricao || "Sem descrição."}
              </p>
            </div>
          </CardContent>
          <CardFooter className="justify-end px-5 pb-5">
            <Button
              type="button"
              onClick={() => onAbertoChange(false)}
              className="bg-zinc-950 text-white hover:bg-zinc-800"
            >
              Fechar
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export default function DashboardTransactionsTable({
  lancamentos,
  carregando,
  erro,
  onNovoLancamento,
}) {
  const [filtro, setFiltro] = useState("");
  const [ordenacao, setOrdenacao] = useState("recentes");
  const [selecionados, setSelecionados] = useState(() => new Set());
  const [lancamentoDetalhes, setLancamentoDetalhes] = useState(null);
  const codigosTransacao = useMemo(
    () => criarMapaCodigosTransacao(lancamentos),
    [lancamentos],
  );
  const lancamentosFiltrados = useMemo(
    () => ordenarLancamentos(filtrarLancamentos(lancamentos, filtro), ordenacao),
    [filtro, lancamentos, ordenacao],
  );
  const todosSelecionados =
    lancamentosFiltrados.length > 0 &&
    lancamentosFiltrados.every((lancamento) => selecionados.has(lancamento.id));

  function alternarSelecionado(id) {
    setSelecionados((selecionadosAtuais) => {
      const proximos = new Set(selecionadosAtuais);

      if (proximos.has(id)) {
        proximos.delete(id);
      } else {
        proximos.add(id);
      }

      return proximos;
    });
  }

  function alternarTodosSelecionados() {
    setSelecionados((selecionadosAtuais) => {
      if (todosSelecionados) return new Set();

      const proximos = new Set(selecionadosAtuais);
      lancamentosFiltrados.forEach((lancamento) => proximos.add(lancamento.id));

      return proximos;
    });
  }

  return (
    <Card className="rounded-2xl border-0 bg-white py-0 shadow-lg ring-0">
      <CardHeader className="gap-4 px-4 pb-3 pt-5">
        <div className="grid gap-3 lg:grid-cols-[minmax(160px,1fr)_minmax(220px,304px)_140px] lg:items-center">
          <CardTitle className={dashboardTypography.cardTitle}>
            Transações
          </CardTitle>

          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
            <Input
              value={filtro}
              onChange={(event) => setFiltro(event.target.value)}
              placeholder="Pesquisar"
              className="h-10 rounded-lg pl-9"
            />
          </div>

          <Select value={ordenacao} onValueChange={setOrdenacao}>
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="Ordenar" />
            </SelectTrigger>
            <SelectContent align="end">
              {opcoesOrdenacao.map((opcao) => (
                <SelectItem key={opcao.value} value={opcao.value}>
                  {opcao.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-0">
        <ScrollArea className="h-[360px] rounded-lg border border-zinc-200">
          <div className="min-w-[900px]">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="sticky top-0 z-10 bg-white">
                <tr className={`border-b border-zinc-200 ${dashboardTypography.tableHead}`}>
                  <th className="w-10 px-3 py-3">
                    <CheckboxTabela
                      checked={todosSelecionados}
                      onChange={alternarTodosSelecionados}
                      label="Selecionar todas as transações"
                    />
                  </th>
                  <th className="px-3 py-3">Id Transação</th>
                  <th className="px-3 py-3">Tipo</th>
                  <th className="px-3 py-3">Valor</th>
                  <th className="px-3 py-3">Categoria</th>
                  <th className="px-3 py-3">Data</th>
                  <th className="w-24 px-3 py-3 text-right" />
                </tr>
              </thead>
              <tbody>
                {carregando && (
                  <tr>
                    <td
                      colSpan={7}
                      className={`h-72 ${dashboardTypography.emptyState}`}
                    >
                      Carregando lançamentos...
                    </td>
                  </tr>
                )}

                {!carregando && erro && (
                  <tr>
                    <td colSpan={7} className="h-72 text-center text-sm text-red-600">
                      {erro}
                    </td>
                  </tr>
                )}

                {!carregando && !erro && lancamentosFiltrados.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className={`h-72 ${dashboardTypography.emptyState}`}
                    >
                      {filtro
                        ? "Nenhum lançamento encontrado para a busca."
                        : "Nenhum lançamento encontrado."}
                    </td>
                  </tr>
                )}

                {!carregando &&
                  !erro &&
                  lancamentosFiltrados.map((lancamento) => {
                    const codigo = obterCodigoTransacao(lancamento, codigosTransacao);
                    const estaSelecionado = selecionados.has(lancamento.id);

                    return (
                      <tr
                        key={lancamento.id}
                        className={`border-b border-zinc-200 last:border-b-0 hover:bg-zinc-50 ${dashboardTypography.tableBody}`}
                      >
                        <td className="px-3 py-3">
                          <CheckboxTabela
                            checked={estaSelecionado}
                            onChange={() => alternarSelecionado(lancamento.id)}
                            label={`Selecionar transação ${codigo}`}
                          />
                        </td>
                        <td className="px-3 py-3 font-medium">{codigo}</td>
                        <td className="px-3 py-3">{formatarTipo(lancamento.tipo)}</td>
                        <td className="px-3 py-3">{formatarMoeda(lancamento.valor)}</td>
                        <td className="px-3 py-3">
                          <Badge variant="outline">
                            {obterNomeCategoria(lancamento)}
                          </Badge>
                        </td>
                        <td className="px-3 py-3">
                          {formatarData(lancamento.dataTransacao)}
                        </td>
                        <td className="px-3 py-2 text-right">
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => setLancamentoDetalhes(lancamento)}
                            className="bg-zinc-950 px-3 text-xs text-white hover:bg-zinc-800"
                          >
                            Detalhes
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>

      <CardFooter className={`justify-between gap-3 border-0 bg-white px-4 py-4 ${dashboardTypography.footer}`}>
        <span>
          {selecionados.size} de {lancamentosFiltrados.length} transação
          {lancamentosFiltrados.length === 1 ? "" : "es"} selecionada
          {selecionados.size === 1 ? "" : "s"}.
        </span>

        <Button
          type="button"
          variant="outline"
          onClick={onNovoLancamento}
          className="border-zinc-200 bg-white text-xs text-zinc-950 hover:bg-zinc-50"
        >
          <Plus size={14} />
          Novo Lançamento
        </Button>
      </CardFooter>

      {lancamentoDetalhes && (
        <DetalhesTransacaoDialog
          lancamento={lancamentoDetalhes}
          codigo={obterCodigoTransacao(lancamentoDetalhes, codigosTransacao)}
          onAbertoChange={(aberto) => {
            if (!aberto) setLancamentoDetalhes(null);
          }}
        />
      )}
    </Card>
  );
}
