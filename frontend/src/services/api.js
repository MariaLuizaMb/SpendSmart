import { obterToken } from "@/lib/auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function request(path, options = {}) {
  const token = obterToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type") || "";
  const resultado = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const mensagem =
      typeof resultado === "object"
        ? resultado.erro || resultado.message
        : resultado;

    throw new Error(mensagem || "Erro ao comunicar com o servidor.");
  }

  return resultado;
}

export async function cadastrarUsuario(dados) {
  return request("/auth/cadastro", {
    method: "POST",
    body: JSON.stringify(dados),
  });
}

export async function loginUsuario(dados) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(dados),
  });
}

export async function listarCategorias() {
  const resultado = await request("/categorias");

  return resultado.data || resultado;
}

export async function excluirContaUsuario() {
  const resultado = await request("/auth/excluir-conta", {
    method: "DELETE",
  });

  return resultado.data || resultado;
}

export async function cadastrarCategoria(dados) {
  const resultado = await request("/categorias", {
    method: "POST",
    body: JSON.stringify(dados),
  });

  return resultado.data || resultado;
}

export async function editarCategoria(id, dados) {
  const resultado = await request(`/categorias/editar/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  });

  return resultado.data || resultado;
}

export async function removerCategoria(id) {
  const resultado = await request(`/categorias/remover/${id}`, {
    method: "DELETE",
  });

  return resultado.data || resultado;
}

export async function cadastrarLancamento(dados) {
  const resultado = await request("/lancamentos/cadastrar", {
    method: "POST",
    body: JSON.stringify(dados),
  });

  return resultado.data || resultado;
}

export async function cadastrarOrcamento(dados) {
  const resultado = await request("/orcamentos", {
    method: "POST",
    body: JSON.stringify(dados),
  });

  return resultado.data || resultado;
}

export async function listarOrcamentos({ mes, ano, idCategoria } = {}) {
  const params = new URLSearchParams();

  if (mes !== undefined && mes !== null && mes !== "") {
    params.append("mes", mes);
  }

  if (ano !== undefined && ano !== null && ano !== "") {
    params.append("ano", ano);
  }

  if (idCategoria !== undefined && idCategoria !== "") {
    params.append("idCategoria", idCategoria);
  }

  const query = params.toString();
  const resultado = await request(`/orcamentos${query ? `?${query}` : ""}`);

  return resultado.data || resultado;
}

export async function buscarOrcamento(id) {
  const resultado = await request(`/orcamentos/${id}`);

  return resultado.data || resultado;
}

export async function editarOrcamento(id, dados) {
  const resultado = await request(`/orcamentos/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  });

  return resultado.data || resultado;
}

export async function removerOrcamento(id) {
  const resultado = await request(`/orcamentos/${id}`, {
    method: "DELETE",
  });

  return resultado.data || resultado;
}

export async function editarLancamento(id, dados) {
  const resultado = await request(`/lancamentos/editar/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  });

  return resultado.data || resultado;
}

export async function removerLancamento(id) {
  const resultado = await request(`/lancamentos/remover/${id}`, {
    method: "DELETE",
  });

  return resultado.data || resultado;
}

export async function listarContas() {
  const resultado = await request("/contas");

  return resultado.data || resultado;
}

export async function buscarAnalisePreditiva({ mes, ano } = {}) {
  const params = new URLSearchParams();

  if (mes) params.append("mes", mes);
  if (ano) params.append("ano", ano);

  const query = params.toString();
  const resultado = await request(
    `/analytics/preditiva${query ? `?${query}` : ""}`,
  );

  return resultado.data || resultado;
}

export async function listarNotificacoes(limite = 10) {
  const params = new URLSearchParams();

  if (limite) params.append("limite", limite);

  const query = params.toString();
  const resultado = await request(`/notifications${query ? `?${query}` : ""}`);

  return resultado.data || resultado;
}

export async function marcarNotificacaoComoLida(id) {
  const resultado = await request(`/notifications/${id}/read`, {
    method: "PATCH",
  });

  return resultado.data || resultado;
}

export async function marcarTodasNotificacoesComoLidas() {
  const resultado = await request("/notifications/read-all", {
    method: "PATCH",
  });

  return resultado.data || resultado;
}

export async function cadastrarConta(dados) {
  const resultado = await request("/contas", {
    method: "POST",
    body: JSON.stringify(dados),
  });

  return resultado.data || resultado;
}

export async function editarConta(id, dados) {
  const resultado = await request(`/contas/editar/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  });

  return resultado.data || resultado;
}

export async function removerConta(id) {
  const resultado = await request(`/contas/remover/${id}`, {
    method: "DELETE",
  });

  return resultado.data || resultado;
}

export async function listarLancamentos({
  periodo,
  idConta,
  semConta,
  tipo,
  idCategoria,
  valorMinimo,
  valorMaximo,
  limite,
  dataInicio,
  dataFim,
} = {}) {
  const params = new URLSearchParams();
  const adicionarParametro = (nome, valor) => {
    if (valor === "" || valor === null || valor === undefined) return;
    if (valor === false) return;

    params.append(nome, valor);
  };

  adicionarParametro("periodo", periodo);
  adicionarParametro("dataInicio", dataInicio);
  adicionarParametro("dataFim", dataFim);
  adicionarParametro("idConta", semConta ? undefined : idConta);
  adicionarParametro("semConta", semConta);
  adicionarParametro("tipo", tipo);
  adicionarParametro("idCategoria", idCategoria);
  adicionarParametro("valorMinimo", valorMinimo);
  adicionarParametro("valorMaximo", valorMaximo);
  adicionarParametro("limite", limite);

  const query = params.toString();
  const path = `/lancamentos/listar${query ? `?${query}` : ""}`;
  const deveLogarFiltroMes = periodo === "mes";

  if (deveLogarFiltroMes) {
    console.log("[API][Lancamentos][Filtro mes] parametros enviados:", {
      periodo,
      idConta,
      limite,
      dataInicio,
      dataFim,
      path,
    });
  }

  const resultado = await request(path);
  const dados = resultado.data || resultado;

  if (deveLogarFiltroMes) {
    console.log("[API][Lancamentos][Filtro mes] resposta completa:", resultado);
    console.log("[API][Lancamentos][Filtro mes] dados usados na tela:", dados);
  }

  return dados;
}
