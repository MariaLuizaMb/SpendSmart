import AuthService from "../services/authServices.js";

function handleError(res, error) {
  return res.status(error.statusCode || 500).json({
    erro: error.message || "Erro interno do servidor.",
    codigo: error.code || "UNEXPECTED_ERROR",
  });
}

class AuthController {
  static async cadastrar(req, res) {
    try {
      const { nome, email, senha } = req.body;

      const usuario = await AuthService.cadastrar({ nome, email, senha });

      return res.status(201).json({
        mensagem: "Usuário cadastrado com sucesso.",
        usuario,
      });
    } catch (error) {
      return handleError(res, error);
    }
  }

  static async login(req, res) {
    try {
      const { email, senha } = req.body;

      const resultado = await AuthService.login({ email, senha });

      return res.status(200).json({
        mensagem: "Login realizado com sucesso.",
        ...resultado,
      });
    } catch (error) {
      return handleError(res, error);
    }
  }
}

export default AuthController;
