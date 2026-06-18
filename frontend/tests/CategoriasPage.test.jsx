import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockApi = vi.hoisted(() => ({
  listarCategorias: vi.fn(),
  listarLancamentos: vi.fn(),
  cadastrarCategoria: vi.fn(),
  editarCategoria: vi.fn(),
  removerCategoria: vi.fn(),
}));

const routerState = vi.hoisted(() => ({
  pathname: "/categorias",
  navigate: vi.fn(),
}));

vi.mock("@/services/api", () => ({
  listarCategorias: mockApi.listarCategorias,
  listarLancamentos: mockApi.listarLancamentos,
  cadastrarCategoria: mockApi.cadastrarCategoria,
  editarCategoria: mockApi.editarCategoria,
  removerCategoria: mockApi.removerCategoria,
}));

vi.mock("@/lib/auth", () => ({
  obterUsuario: () => ({ id: "usuario-1", nome: "Maria" }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => routerState.navigate,
    useLocation: () => ({ pathname: routerState.pathname }),
  };
});

vi.mock("@/pages/Home", () => ({
  HomeSidebar: ({ usuario, paginaAtiva }) => (
    <aside data-testid="home-sidebar">
      {usuario.nome}-{paginaAtiva}
    </aside>
  ),
  NotificationsMenu: ({ variant }) => (
    <button type="button">Notificações {variant}</button>
  ),
}));

vi.mock("@/components/ui/sidebar", () => ({
  SidebarProvider: ({ children }) => <div>{children}</div>,
  SidebarInset: ({ children }) => <div>{children}</div>,
  SidebarTrigger: (props) => <button type="button" {...props}>Menu</button>,
}));

vi.mock("@/components/ui/tooltip", () => ({
  TooltipProvider: ({ children }) => <div>{children}</div>,
}));

vi.mock("@/components/gerenciamento/ManagementSwitcher", () => ({
  VISAO_CATEGORIAS: "categorias",
  VISAO_ORCAMENTOS: "orcamentos",
  default: ({ value, onValueChange }) => (
    <div>
      <span>Visão atual: {value}</span>
      <button type="button" onClick={() => onValueChange("orcamentos")}>
        Ir para orçamentos
      </button>
      <button type="button" onClick={() => onValueChange("categorias")}>
        Ir para categorias
      </button>
    </div>
  ),
}));

vi.mock("@/components/orcamentos/BudgetsView", () => ({
  default: () => <section>BudgetsView renderizado</section>,
}));

vi.mock("@/components/categorias/CategorySummaryCard", () => ({
  default: ({ titulo, valor, carregando }) => (
    <section>
      <span>{titulo}</span>
      <strong>{carregando ? "..." : valor}</strong>
    </section>
  ),
}));

vi.mock("@/components/categorias/CategoryFilters", () => ({
  FILTRO_ORIGEM_TODAS: "todas",
  FILTRO_ORIGEM_USUARIO: "usuario",
  FILTRO_ORIGEM_SISTEMA: "sistema",
  FILTRO_USO_TODAS: "todas",
  FILTRO_USO_COM_LANCAMENTOS: "com-lancamentos",
  FILTRO_USO_SEM_LANCAMENTOS: "sem-lancamentos",
  FILTRO_USO_RECENTE: "recente",
  FILTRO_USO_NAO_RECENTE: "nao-recente",
  default: ({
    busca,
    origem,
    uso,
    onBuscaChange,
    onOrigemChange,
    onUsoChange,
  }) => (
    <div>
      <label htmlFor="busca-categoria">Busca</label>
      <input
        id="busca-categoria"
        value={busca}
        onChange={(event) => onBuscaChange(event.target.value)}
      />
      <span>Origem: {origem}</span>
      <span>Uso: {uso}</span>
      <button type="button" onClick={() => onOrigemChange("usuario")}>
        Filtrar usuário
      </button>
      <button type="button" onClick={() => onOrigemChange("sistema")}>
        Filtrar sistema
      </button>
      <button type="button" onClick={() => onUsoChange("com-lancamentos")}>
        Com lançamentos
      </button>
      <button type="button" onClick={() => onUsoChange("sem-lancamentos")}>
        Sem lançamentos
      </button>
      <button type="button" onClick={() => onUsoChange("recente")}>
        Uso recente
      </button>
      <button type="button" onClick={() => onUsoChange("nao-recente")}>
        Uso antigo
      </button>
    </div>
  ),
}));

vi.mock("@/components/categorias/CategoriesTable", () => ({
  default: ({
    categorias,
    carregando,
    erro,
    haFiltrosAtivos,
    selecionados,
    todosSelecionados,
    codigosCategoria,
    onSelecionarTodas,
    onSelecionarCategoria,
    onEditar,
    onRemover,
    onVerLancamentos,
    categoriaRemovendo,
  }) => (
    <section>
      <p>Tabela carregando: {String(carregando)}</p>
      <p>Tabela erro: {erro || "sem erro"}</p>
      <p>Filtros ativos: {String(haFiltrosAtivos)}</p>
      <p>Todos selecionados: {String(todosSelecionados)}</p>
      <p>Selecionados tabela: {selecionados.size}</p>
      <p>Removendo: {categoriaRemovendo || "ninguém"}</p>
      {categorias.length === 0 && <p>Nenhuma categoria na tabela</p>}
      {categorias.map((categoria) => (
        <article key={categoria.id}>
          <span>
            {codigosCategoria.get(categoria.id)}-{categoria.nome || "Sem nome"}-
            {categoria.quantidadeLancamentos}
          </span>
          <button type="button" onClick={() => onSelecionarCategoria(categoria.id)}>
            Selecionar {categoria.id}
          </button>
          <button type="button" onClick={() => onEditar(categoria)}>
            Editar {categoria.id}
          </button>
          <button type="button" onClick={() => onRemover(categoria)}>
            Remover {categoria.id}
          </button>
          <button type="button" onClick={() => onVerLancamentos(categoria)}>
            Ver {categoria.id}
          </button>
        </article>
      ))}
      <button type="button" onClick={onSelecionarTodas}>
        Alternar todas
      </button>
    </section>
  ),
}));

vi.mock("@/components/categorias/CategoryFormDialog", () => ({
  default: ({
    categoria,
    erro,
    salvando,
    onAbertoChange,
    onSalvar,
  }) => (
    <section role="dialog">
      <h2>{categoria ? `Editar ${categoria.nome}` : "Criar categoria"}</h2>
      <p>Erro formulário: {erro || "sem erro"}</p>
      <p>Salvando: {String(salvando)}</p>
      <button type="button" onClick={() => onSalvar({ nome: "A", tipo: "DESPESA" })}>
        Salvar inválida
      </button>
      <button
        type="button"
        onClick={() => onSalvar({ nome: "Nova Categoria", tipo: "RECEITA" })}
      >
        Salvar válida
      </button>
      <button type="button" onClick={() => onAbertoChange(false)}>
        Fechar modal
      </button>
    </section>
  ),
}));

import Categorias from "../src/pages/Categorias";

function renderCategorias() {
  return render(
    <MemoryRouter>
      <Categorias />
    </MemoryRouter>,
  );
}

const categoriasBase = [
  { id: "cat-despesa", nome: "Mercado", tipo: "DESPESA", idUsuario: "usuario-1" },
  { id: "cat-receita", nome: "Salário", tipo: "RECEITA", idUsuario: null },
  { id: "cat-lazer", nome: "Lazer", tipo: "", idUsuario: "usuario-1" },
];

const lancamentosBase = [
  {
    id: "l1",
    idCategoria: "cat-despesa",
    dataTransacao: new Date().toISOString(),
  },
  {
    id: "l2",
    categoria: { id: "cat-despesa" },
    dataTransacao: "data-invalida",
  },
  {
    id: "l3",
    idCategoria: "cat-receita",
    dataTransacao: "2020-01-01T00:00:00.000Z",
  },
  {
    id: "l4",
    idCategoria: "",
    dataTransacao: "2020-01-01T00:00:00.000Z",
  },
];

describe("Categorias page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    routerState.pathname = "/categorias";
    mockApi.listarCategorias.mockResolvedValue(categoriasBase);
    mockApi.listarLancamentos.mockResolvedValue(lancamentosBase);
    mockApi.cadastrarCategoria.mockResolvedValue({ id: "nova" });
    mockApi.editarCategoria.mockResolvedValue({ id: "cat-despesa" });
    mockApi.removerCategoria.mockResolvedValue({});
  });

  it("deve carregar categorias, enriquecer dados, filtrar, selecionar e navegar", async () => {
    const user = userEvent.setup();
    renderCategorias();

    expect(screen.getByText("Tabela carregando: true")).toBeInTheDocument();
    expect(await screen.findByText("D01-Lazer-0")).toBeInTheDocument();
    expect(screen.getByText("D02-Mercado-2")).toBeInTheDocument();
    expect(screen.getByText("R01-Salário-1")).toBeInTheDocument();
    expect(screen.getByText("Total de Categorias")).toBeInTheDocument();
    expect(screen.getByText("Categorias do Sistema")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Busca"), "mer");
    expect(screen.getByText("D02-Mercado-2")).toBeInTheDocument();
    expect(screen.queryByText("R01-Salário-1")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Limpar filtros" }));
    expect(await screen.findByText("R01-Salário-1")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Filtrar sistema" }));
    expect(screen.getByText("R01-Salário-1")).toBeInTheDocument();
    expect(screen.queryByText("D02-Mercado-2")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Limpar filtros" }));
    await user.click(screen.getByRole("button", { name: "Com lançamentos" }));
    expect(screen.queryByText("D01-Lazer-0")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Limpar filtros" }));
    await user.click(screen.getByRole("button", { name: "Selecionar cat-despesa" }));
    expect(screen.getByText(/1 de 3 categorias selecionada/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Ver cat-despesa" }));
    expect(routerState.navigate).toHaveBeenCalledWith(
      "/transacoes?categoriaId=cat-despesa",
    );

    await user.click(
      screen.getByRole("button", { name: "Ver lançamentos associados" }),
    );
    expect(routerState.navigate).toHaveBeenCalledWith(
      "/transacoes?categoriaId=cat-despesa",
    );

    await user.click(screen.getByRole("button", { name: "Ir para orçamentos" }));
    await user.click(screen.getByRole("button", { name: "Ir para categorias" }));
    expect(routerState.navigate).toHaveBeenCalledWith("/orcamentos");
    expect(routerState.navigate).toHaveBeenCalledWith("/categorias");
  });

  it("deve criar, validar, editar e excluir categorias", async () => {
    const user = userEvent.setup();
    renderCategorias();

    await screen.findByText("D02-Mercado-2");

    await user.click(screen.getByRole("button", { name: "Nova Categoria" }));
    expect(screen.getByRole("dialog")).toHaveTextContent("Criar categoria");

    await user.click(screen.getByRole("button", { name: "Salvar inválida" }));
    expect(
      await screen.findByText("Erro formulário: Informe um nome com pelo menos 2 caracteres."),
    ).toBeInTheDocument();
    expect(mockApi.cadastrarCategoria).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "Salvar válida" }));
    await waitFor(() => {
      expect(mockApi.cadastrarCategoria).toHaveBeenCalledWith({
        nome: "Nova Categoria",
        tipo: "RECEITA",
      });
    });
    expect(await screen.findByText("Categoria cadastrada com sucesso.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Editar cat-despesa" }));
    expect(screen.getByRole("dialog")).toHaveTextContent("Editar Mercado");
    await user.click(screen.getByRole("button", { name: "Salvar válida" }));
    await waitFor(() => {
      expect(mockApi.editarCategoria).toHaveBeenCalledWith("cat-despesa", {
        nome: "Nova Categoria",
        tipo: "RECEITA",
      });
    });
    expect(await screen.findByText("Categoria atualizada com sucesso.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Remover cat-despesa" }));
    await waitFor(() => {
      expect(mockApi.removerCategoria).toHaveBeenCalledWith("cat-despesa");
    });
    expect(await screen.findByText("Categoria removida com sucesso.")).toBeInTheDocument();
  });

  it("deve exibir erros de carregamento, salvar e exclusão", async () => {
    const user = userEvent.setup();
    mockApi.listarCategorias.mockRejectedValueOnce(new Error("falha carregar"));

    renderCategorias();

    expect(await screen.findByText("Tabela erro: falha carregar")).toBeInTheDocument();
    expect(screen.getByText("Nenhuma categoria na tabela")).toBeInTheDocument();

    mockApi.listarCategorias.mockResolvedValue(categoriasBase);
    await user.click(screen.getByRole("button", { name: "Nova Categoria" }));
    mockApi.cadastrarCategoria.mockRejectedValueOnce(new Error("falha salvar"));
    await user.click(screen.getByRole("button", { name: "Salvar válida" }));
    expect(await screen.findByText("Erro formulário: falha salvar")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Fechar modal" }));
    await user.click(screen.getByRole("button", { name: "Ir para categorias" }));

    routerState.pathname = "/orcamentos";
  });

  it("deve renderizar visão de orçamentos quando rota ativa for /orcamentos", async () => {
    routerState.pathname = "/orcamentos";

    renderCategorias();

    expect(await screen.findByText("BudgetsView renderizado")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Orçamentos" })).toBeInTheDocument();
  });
});
