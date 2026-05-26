import {
  ValidationError,
  InternalServerError,
} from "../errors/appError.js";

const EMAIL_MIN_LENGTH = 6;
const EMAIL_MAX_LENGTH = 254;

export function validarJwtSecret() {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim() === "") {
    throw new InternalServerError(
      "A configuração de autenticação do servidor está ausente.",
    );
  }

  return process.env.JWT_SECRET;
}

export function validarEmail(email) {
  if (typeof email !== "string") {
    throw new ValidationError("O email informado é inválido.");
  }

  const emailLimpo = email.trim().toLowerCase();

  if (!emailTemFormatoValido(emailLimpo)) {
    throw new ValidationError(
      "Informe um email válido, como nome@dominio.com.",
    );
  }

  return emailLimpo;
}

export function emailTemFormatoValido(email) {
  if (typeof email !== "string") return false;
  if (email.length < EMAIL_MIN_LENGTH || email.length > EMAIL_MAX_LENGTH) {
    return false;
  }

  for (const caractere of email) {
    if (caractere.trim() === "") return false;
  }

  const indiceArroba = email.indexOf("@");

  if (indiceArroba <= 0 || indiceArroba !== email.lastIndexOf("@")) {
    return false;
  }

  const parteLocal = email.slice(0, indiceArroba);
  const dominio = email.slice(indiceArroba + 1);

  if (!parteLocal || !dominio) return false;
  if (!dominio.includes(".")) return false;
  if (dominio.startsWith(".") || dominio.endsWith(".")) return false;

  return true;
}

export function validarSenha(senha) {
  if (typeof senha !== "string") {
    throw new ValidationError("A senha informada é inválida.");
  }

  const senhaLimpa = senha.trim();

  if (senhaLimpa.length < 8) {
    throw new ValidationError("A senha deve ter no mínimo 8 caracteres.");
  }

  if (!/[A-Z]/.test(senhaLimpa)) {
    throw new ValidationError(
      "A senha deve conter pelo menos uma letra maiúscula.",
    );
  }

  if (!/\d/.test(senhaLimpa)) {
    throw new ValidationError("A senha deve conter pelo menos um número.");
  }

  return senhaLimpa;
}
