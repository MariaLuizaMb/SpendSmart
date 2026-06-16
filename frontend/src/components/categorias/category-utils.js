export function normalizarTipoCategoria(tipo) {
  const tipoNormalizado = String(tipo || "").toUpperCase();

  return ["RECEITA", "DESPESA"].includes(tipoNormalizado)
    ? tipoNormalizado
    : "DESPESA";
}

export function formatarTipoCategoria(tipo) {
  return normalizarTipoCategoria(tipo) === "RECEITA" ? "Receita" : "Despesa";
}

export function categoriaEhSistema(categoria) {
  return Boolean(categoria?.ehPadrao || !categoria?.idUsuario);
}
