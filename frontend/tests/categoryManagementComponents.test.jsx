import React from "react";
import { Tag } from "lucide-react";
import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import CategoryActions from "../src/components/categorias/CategoryActions";
import {
  CategoryOriginBadge,
  CategoryTypeBadge,
} from "../src/components/categorias/CategoryBadge";
import CategoryFilters, {
  FILTRO_ORIGEM_SISTEMA,
  FILTRO_ORIGEM_TODAS,
  FILTRO_ORIGEM_USUARIO,
  FILTRO_USO_COM_LANCAMENTOS,
  FILTRO_USO_NAO_RECENTE,
  FILTRO_USO_RECENTE,
  FILTRO_USO_SEM_LANCAMENTOS,
  FILTRO_USO_TODAS,
} from "../src/components/categorias/CategoryFilters";
import CategoryFormDialog from "../src/components/categorias/CategoryFormDialog";
import CategorySummaryCard from "../src/components/categorias/CategorySummaryCard";
import CategoriesTable from "../src/components/categorias/CategoriesTable";
import {
  categoriaEhSistema,
  formatarTipoCategoria,
  normalizarTipoCategoria,
} from "../src/components/categorias/category-utils";
import BudgetActions from "../src/components/orcamentos/BudgetActions";
import ManagementSwitcher, {
  VISAO_CATEGORIAS,
  VISAO_ORCAMENTOS,
} from "../src/components/gerenciamento/ManagementSwitcher";

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, asChild, ...props }) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, props);
    }

    return <button {...props}>{children}</button>;
  },
}));

vi.mock("@/components/ui/badge", () => ({
  Badge: ({ children, ...props }) => <span {...props}>{children}</span>,
}));

vi.mock("@/components/ui/input", () => ({
  Input: (props) => <input {...props} />,
}));

vi.mock("@/components/ui/label", () => ({
  Label: ({ children, ...props }) => <label {...props}>{children}</label>,
}));

vi.mock("@/components/ui/card", () => ({
  Card: ({ children, ...props }) => <section {...props}>{children}</section>,
  CardContent: ({ children, ...props }) => <div {...props}>{children}</div>,
  CardFooter: ({ children, ...props }) => <footer {...props}>{children}</footer>,
  CardHeader: ({ children, ...props }) => <header {...props}>{children}</header>,
  CardTitle: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
}));

vi.mock("@/components/ui/scroll-area", () => ({
  ScrollArea: ({ children, ...props }) => <div {...props}>{children}</div>,
  ScrollBar: (props) => <div data-testid="scrollbar" {...props} />,
}));

const SelectContext = React.createContext({ onValueChange: () => {}, value: "" });

vi.mock("@/components/ui/select", async () => {
  const ReactActual = await vi.importActual("react");

  return {
    Select: ({ children, value, onValueChange = () => {}, disabled }) => (
      <SelectContext.Provider value={{ onValueChange, value, disabled }}>
        <div data-testid="select" data-value={value} aria-disabled={disabled}>
          {children}
        </div>
      </SelectContext.Provider>
    ),
    SelectContent: ({ children }) => <div>{children}</div>,
    SelectItem: ({ children, value, disabled }) => {
      const contexto = ReactActual.useContext(SelectContext);

      return (
        <button
          type="button"
          disabled={disabled || contexto.disabled}
          aria-pressed={contexto.value === value}
          onClick={() => contexto.onValueChange(value)}
        >
          {children}
        </button>
      );
    },
    SelectTrigger: ({ children, ...props }) => <div {...props}>{children}</div>,
    SelectValue: ({ placeholder }) => <span>{placeholder}</span>,
  };
});

vi.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children, open }) => (open ? <div>{children}</div> : null),
  DialogContent: ({ children, ...props }) => <div role="dialog" {...props}>{children}</div>,
  DialogDescription: ({ children }) => <p>{children}</p>,
  DialogTitle: ({ children, asChild }) => (asChild ? children : <h2>{children}</h2>),
}));

vi.mock("@/components/ui/alert-dialog", () => ({
  AlertDialog: ({ children }) => <div>{children}</div>,
  AlertDialogAction: ({ children, ...props }) => <button {...props}>{children}</button>,
  AlertDialogCancel: ({ children, ...props }) => <button {...props}>{children}</button>,
  AlertDialogContent: ({ children }) => <div role="alertdialog">{children}</div>,
  AlertDialogDescription: ({ children }) => <p>{children}</p>,
  AlertDialogFooter: ({ children }) => <footer>{children}</footer>,
  AlertDialogHeader: ({ children }) => <header>{children}</header>,
  AlertDialogTitle: ({ children }) => <h2>{children}</h2>,
  AlertDialogTrigger: ({ children }) => children,
}));

describe("category-utils", () => {
  it("deve normalizar tipos válidos, inválidos, nulos e indefinidos", () => {
    expect(normalizarTipoCategoria("receita")).toBe("RECEITA");
    expect(normalizarTipoCategoria("DESPESA")).toBe("DESPESA");
    expect(normalizarTipoCategoria("investimento")).toBe("DESPESA");
    expect(normalizarTipoCategoria(null)).toBe("DESPESA");
    expect(normalizarTipoCategoria(undefined)).toBe("DESPESA");
    expect(formatarTipoCategoria("RECEITA")).toBe("Receita");
    expect(formatarTipoCategoria("qualquer")).toBe("Despesa");
  });

  it("deve identificar categorias do sistema e do usuário", () => {
    expect(categoriaEhSistema({ ehPadrao: true, idUsuario: "u1" })).toBe(true);
    expect(categoriaEhSistema({ ehPadrao: false, idUsuario: "u1" })).toBe(false);
    expect(categoriaEhSistema({ idUsuario: null })).toBe(true);
    expect(categoriaEhSistema(null)).toBe(true);
  });
});

describe("category badges and summary", () => {
  it("deve renderizar badges de tipo e origem com branches de receita/despesa e sistema/usuário", () => {
    render(
      <div>
        <CategoryTypeBadge tipo="RECEITA" />
        <CategoryTypeBadge tipo="outro" />
        <CategoryOriginBadge categoria={{ id: "1", idUsuario: "u1" }} />
        <CategoryOriginBadge categoria={{ id: "2", ehPadrao: true }} />
      </div>,
    );

    expect(screen.getByText("Receita")).toBeInTheDocument();
    expect(screen.getByText("Despesa")).toBeInTheDocument();
    expect(screen.getByText("Usuário")).toBeInTheDocument();
    expect(screen.getByText("Sistema")).toBeInTheDocument();
  });

  it("deve renderizar resumo carregando, variante desconhecida e valor final", () => {
    const { rerender } = render(
      <CategorySummaryCard
        titulo="Total"
        valor={8}
        descricao="Resumo"
        icon={Tag}
        variante="inexistente"
        carregando
      />,
    );

    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();

    rerender(
      <CategorySummaryCard
        titulo="Total"
        valor={8}
        descricao="Resumo"
        icon={Tag}
        variante="red"
        carregando={false}
      />,
    );

    expect(screen.getByText("8")).toBeInTheDocument();
  });
});

describe("CategoryFilters", () => {
  it("deve emitir callbacks de busca, origem e uso", async () => {
    const user = userEvent.setup();
    const onBuscaChange = vi.fn();
    const onOrigemChange = vi.fn();
    const onUsoChange = vi.fn();

    render(
      <CategoryFilters
        busca=""
        origem={FILTRO_ORIGEM_TODAS}
        uso={FILTRO_USO_TODAS}
        onBuscaChange={onBuscaChange}
        onOrigemChange={onOrigemChange}
        onUsoChange={onUsoChange}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("Pesquisar categoria"), {
      target: { value: "merc" },
    });
    await user.click(screen.getByRole("button", { name: "Criadas por mim" }));
    await user.click(screen.getByRole("button", { name: "Sistema" }));
    await user.click(screen.getByRole("button", { name: "Com lançamentos" }));
    await user.click(screen.getByRole("button", { name: "Sem lançamentos" }));
    await user.click(screen.getByRole("button", { name: "Usadas recentemente" }));
    await user.click(screen.getByRole("button", { name: "Não usadas recentemente" }));

    expect(onBuscaChange).toHaveBeenLastCalledWith("merc");
    expect(onOrigemChange).toHaveBeenCalledWith(FILTRO_ORIGEM_USUARIO);
    expect(onOrigemChange).toHaveBeenCalledWith(FILTRO_ORIGEM_SISTEMA);
    expect(onUsoChange).toHaveBeenCalledWith(FILTRO_USO_COM_LANCAMENTOS);
    expect(onUsoChange).toHaveBeenCalledWith(FILTRO_USO_SEM_LANCAMENTOS);
    expect(onUsoChange).toHaveBeenCalledWith(FILTRO_USO_RECENTE);
    expect(onUsoChange).toHaveBeenCalledWith(FILTRO_USO_NAO_RECENTE);
  });
});

describe("CategoryFormDialog", () => {
  it("deve renderizar criação, validar atributos, cancelar e salvar dados trimados", async () => {
    const user = userEvent.setup();
    const onAbertoChange = vi.fn();
    const onSalvar = vi.fn();

    render(
      <CategoryFormDialog
        aberto
        categoria={undefined}
        salvando={false}
        erro="Nome inválido"
        sucesso="Categoria salva"
        onAbertoChange={onAbertoChange}
        onSalvar={onSalvar}
      />,
    );

    const nome = screen.getByLabelText("Nome");
    expect(screen.getByText("Nova categoria")).toBeInTheDocument();
    expect(nome).toBeRequired();
    expect(nome).toHaveAttribute("minLength", "2");
    expect(screen.getByText("Nome inválido")).toBeInTheDocument();
    expect(screen.getByText("Categoria salva")).toBeInTheDocument();

    await user.type(nome, "  Mercado  ");
    await user.click(screen.getByRole("button", { name: "Receita" }));
    await user.click(screen.getByRole("button", { name: "Salvar categoria" }));

    expect(onSalvar).toHaveBeenCalledWith({ nome: "Mercado", tipo: "RECEITA" });

    await user.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(onAbertoChange).toHaveBeenCalledWith(false);
  });

  it("deve renderizar edição e estado salvando com campos desabilitados", () => {
    render(
      <CategoryFormDialog
        aberto
        categoria={{ id: "cat-1", nome: "Salário", tipo: "RECEITA" }}
        salvando
        erro=""
        sucesso=""
        onAbertoChange={vi.fn()}
        onSalvar={vi.fn()}
      />,
    );

    expect(screen.getByText("Editar categoria")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome")).toHaveValue("Salário");
    expect(screen.getByRole("button", { name: "Salvando..." })).toBeDisabled();
  });
});

describe("CategoriesTable", () => {
  const categorias = [
    {
      id: "cat-1",
      nome: "Mercado",
      tipo: "DESPESA",
      quantidadeLancamentos: 0,
      idUsuario: "u1",
    },
    {
      id: "cat-2",
      nome: "",
      tipo: "RECEITA",
      quantidadeLancamentos: 1,
      ehPadrao: true,
    },
    {
      id: "cat-3",
      nome: "Lazer",
      tipo: "DESPESA",
      quantidadeLancamentos: 3,
      idUsuario: "u1",
    },
  ];

  const baseProps = {
    categorias,
    carregando: false,
    erro: "",
    haFiltrosAtivos: false,
    selecionados: new Set(["cat-2"]),
    todosSelecionados: false,
    codigosCategoria: new Map([
      ["cat-1", "D01"],
      ["cat-2", "R01"],
    ]),
    onSelecionarTodas: vi.fn(),
    onSelecionarCategoria: vi.fn(),
    onEditar: vi.fn(),
    onRemover: vi.fn(),
    onVerLancamentos: vi.fn(),
    categoriaRemovendo: "cat-3",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar estados carregando, erro e vazio com filtros", () => {
    const { rerender } = render(
      <CategoriesTable {...baseProps} categorias={[]} carregando />,
    );

    expect(screen.getByText("Carregando categorias...")).toBeInTheDocument();

    rerender(<CategoriesTable {...baseProps} categorias={[]} erro="Falha API" />);
    expect(screen.getByText("Falha API")).toBeInTheDocument();

    rerender(
      <CategoriesTable
        {...baseProps}
        categorias={[]}
        erro=""
        haFiltrosAtivos
      />,
    );
    expect(
      screen.getByText("Nenhuma categoria encontrada para os filtros selecionados."),
    ).toBeInTheDocument();

    rerender(<CategoriesTable {...baseProps} categorias={[]} erro="" />);
    expect(screen.getByText("Nenhuma categoria encontrada.")).toBeInTheDocument();
  });

  it("deve renderizar dados, quantidades, códigos e callbacks de ações", async () => {
    const user = userEvent.setup();
    render(<CategoriesTable {...baseProps} />);

    expect(screen.getByText("ID Categoria")).toBeInTheDocument();
    expect(screen.getByText("Mercado")).toBeInTheDocument();
    expect(screen.getByText("Sem nome")).toBeInTheDocument();
    expect(screen.getByText("Nenhum lançamento")).toBeInTheDocument();
    expect(screen.getByText("1 lançamento associado")).toBeInTheDocument();
    expect(screen.getByText("3 lançamentos associados")).toBeInTheDocument();
    expect(screen.getByText("C00")).toBeInTheDocument();

    await user.click(screen.getByLabelText("Selecionar todas as categorias"));
    await user.click(screen.getByLabelText("Selecionar categoria D01"));
    await user.click(screen.getByLabelText("Ver lançamentos associados a Mercado"));
    await user.click(screen.getByLabelText("Editar categoria Mercado"));

    const linhaMercado = screen.getByText("Mercado").closest("tr");
    await user.click(within(linhaMercado).getByRole("button", { name: "Excluir" }));

    expect(baseProps.onSelecionarTodas).toHaveBeenCalled();
    expect(baseProps.onSelecionarCategoria).toHaveBeenCalledWith("cat-1");
    expect(baseProps.onVerLancamentos).toHaveBeenCalledWith(categorias[0]);
    expect(baseProps.onEditar).toHaveBeenCalledWith(categorias[0]);
    expect(baseProps.onRemover).toHaveBeenCalledWith(categorias[0]);
  });
});

describe("actions and switcher", () => {
  it("deve disparar ações de categoria e respeitar estado removendo", async () => {
    const user = userEvent.setup();
    const onEditar = vi.fn();
    const onRemover = vi.fn();
    const onVerLancamentos = vi.fn();
    const categoria = { id: "cat-1", nome: "Mercado" };

    render(
      <CategoryActions
        categoria={categoria}
        removendo={false}
        onEditar={onEditar}
        onRemover={onRemover}
        onVerLancamentos={onVerLancamentos}
      />,
    );

    await user.click(screen.getByLabelText("Ver lançamentos associados a Mercado"));
    await user.click(screen.getByLabelText("Editar categoria Mercado"));
    await user.click(screen.getByRole("button", { name: "Excluir" }));

    expect(onVerLancamentos).toHaveBeenCalledWith(categoria);
    expect(onEditar).toHaveBeenCalledWith(categoria);
    expect(onRemover).toHaveBeenCalledWith(categoria);
  });

  it("deve disparar ações de orçamento e bloquear confirmação durante remoção", async () => {
    const user = userEvent.setup();
    const onEditar = vi.fn();
    const onRemover = vi.fn();
    const orcamento = {
      id: "orc-1",
      categoria: { nome: "Mercado" },
      mes: 5,
      ano: 2026,
    };

    const { rerender } = render(
      <BudgetActions
        orcamento={orcamento}
        removendo={false}
        onEditar={onEditar}
        onRemover={onRemover}
      />,
    );

    await user.click(screen.getByLabelText(/Editar orçamento/i));
    await user.click(screen.getByRole("button", { name: "Excluir" }));

    expect(onEditar).toHaveBeenCalledWith(orcamento);
    expect(onRemover).toHaveBeenCalledWith(orcamento);

    rerender(
      <BudgetActions
        orcamento={orcamento}
        removendo
        onEditar={onEditar}
        onRemover={onRemover}
      />,
    );

    expect(screen.getByLabelText(/Excluir orçamento/i)).toBeDisabled();
  });

  it("deve alternar entre categorias e orçamentos", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <ManagementSwitcher
        value={VISAO_CATEGORIAS}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Orçamentos" }));

    expect(onValueChange).toHaveBeenCalledWith(VISAO_ORCAMENTOS);
  });
});
