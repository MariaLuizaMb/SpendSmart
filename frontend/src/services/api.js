const API_URL = "http://localhost:3000";

export async function cadastrarUsuario(dados) {
  const response = await fetch(`${API_URL}/auth/cadastro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  const resultado = await response.json();

  if (!response.ok) {
    throw new Error(resultado.erro || "Erro ao cadastrar usuário.");
  }

  return resultado;
}

export async function loginUsuario(dados) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  const resultado = await response.json();

  if (!response.ok) {
    throw new Error(resultado.erro || "Erro ao realizar login.");
  }

  return resultado;
}
