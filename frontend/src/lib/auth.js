const TOKEN_KEY = "spendsmart_token";
const USER_KEY = "spendsmart_user";

export function salvarAuth(token, usuario) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(usuario));
}

export function obterToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function obterUsuario() {
  const usuario = localStorage.getItem(USER_KEY);
  return usuario ? JSON.parse(usuario) : null;
}

export function removerAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function estaAutenticado() {
  return !!obterToken();
}
