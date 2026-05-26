const EMAIL_MIN_LENGTH = 6;
const EMAIL_MAX_LENGTH = 254;

export function emailTemFormatoValido(email) {
  if (typeof email !== "string") return false;

  const emailLimpo = email.trim();

  if (
    emailLimpo.length < EMAIL_MIN_LENGTH ||
    emailLimpo.length > EMAIL_MAX_LENGTH
  ) {
    return false;
  }

  for (const caractere of emailLimpo) {
    if (caractere.trim() === "") return false;
  }

  const indiceArroba = emailLimpo.indexOf("@");

  if (indiceArroba <= 0 || indiceArroba !== emailLimpo.lastIndexOf("@")) {
    return false;
  }

  const parteLocal = emailLimpo.slice(0, indiceArroba);
  const dominio = emailLimpo.slice(indiceArroba + 1);

  if (!parteLocal || !dominio) return false;
  if (!dominio.includes(".")) return false;
  if (dominio.startsWith(".") || dominio.endsWith(".")) return false;

  return true;
}
