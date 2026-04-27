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

export async function cadastrarCategoria(dados) {
  const resultado = await request("/categorias", {
    method: "POST",
    body: JSON.stringify(dados),
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

export async function listarContas() {
  const resultado = await request("/contas");

  return resultado.data || resultado;
}

export async function cadastrarConta(dados) {
  const resultado = await request("/contas", {
    method: "POST",
    body: JSON.stringify(dados),
  });

  return resultado.data || resultado;
}
