import AuthService from "../services/authServices.js";

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
      return res.status(400).json({
        erro: error.message,
      });
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
      return res.status(401).json({
        erro: error.message,
      });
    }
  }
}

export default AuthController;
