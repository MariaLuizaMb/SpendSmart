import { ValidationError } from "../errors/AppError.js";
import { InternalServerError } from "../errors/AppError.js";

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

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regexEmail.test(emailLimpo)) {
    throw new ValidationError(
      "Informe um email válido, como nome@dominio.com.",
    );
  }

  return emailLimpo;
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
