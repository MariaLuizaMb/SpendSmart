import LaunchService from "../services/launchService.js";

class LaunchController {
  static async cadastrar(req, res, next) {
    try {
      const { idCategoria, valor, dataTransacao, tipo, descricao, recorrencia } = req.body;

      // Pegando o id do usuário do middleware de autenticação
      const dadosLancamento = {
        idUsuario: req.usuario.id,
        idCategoria,
        valor,
        dataTransacao,
        tipo,
        descricao,
        recorrencia,
      };

      const lancamento = await LaunchService.cadastrar(dadosLancamento);

      res.status(201).json({
        success: true,
        message: "Lançamento cadastrado com sucesso.",
        data: lancamento,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default LaunchController;
