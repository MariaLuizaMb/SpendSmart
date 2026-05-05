import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../database/prisma.js";

import {
  ValidationError,
  ConflictError,
  AuthenticationError,
} from "../errors/appError.js";

import {
  validarEmail,
  validarSenha,
  validarJwtSecret,
} from "../utils/authValidators.js";

const SALT_ROUNDS = 10;

class AuthService {
  static async cadastrar({ nome, email, senha }) {
    if (!nome || !email || !senha) {
      throw new ValidationError("Nome, email e senha são obrigatórios.");
    }

    const nomeLimpo = nome.trim();
    const emailValido = validarEmail(email);
    const senhaValida = validarSenha(senha);

    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email: emailValido },
    });

    if (usuarioExistente) {
      throw new ConflictError("Já existe um usuário com esse email.");
    }

    const senhaHash = await bcrypt.hash(senhaValida, SALT_ROUNDS);

    const usuario = await prisma.usuario.create({
      data: {
        nome: nomeLimpo,
        email: emailValido,
        senhaHash,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        criadoEm: true,
      },
    });

    return usuario;
  }

  static async login({ email, senha }) {
    if (!email || !senha) {
      throw new ValidationError("Email e senha são obrigatórios.");
    }

    const emailValido = validarEmail(email);

    const usuario = await prisma.usuario.findUnique({
      where: { email: emailValido },
    });

    if (!usuario) {
      throw new AuthenticationError("Email inválido.");
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senhaHash);

    if (!senhaCorreta) {
      throw new AuthenticationError("Senha inválida.");
    }

    const jwtSecret = validarJwtSecret();

    const token = jwt.sign(
      {
        sub: usuario.id,
        email: usuario.email,
      },
      jwtSecret,
      {
        expiresIn: "1d",
      },
    );

    return {
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    };
  }
}

export default AuthService;
