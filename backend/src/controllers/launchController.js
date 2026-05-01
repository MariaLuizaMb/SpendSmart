import LaunchService from "../services/launchService.js";

class LaunchController {
  static async cadastrar(req, res, next) {
    try {
      const {
        idCategoria,
        idConta,
        valor,
        dataTransacao,
        tipo,
        descricao,
        recorrencia,
      } = req.body;

      // Pegando o id do usuário do middleware de autenticação
      const dadosLancamento = {
        idUsuario: req.usuario.id,
        idCategoria,
        idConta,
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

  static async editar(req, res, next) {
    try {
      const { id } = req.params;
      const dados = req.body;

      const lancamentoAtualizado = await LaunchService.editar(
        id,
        req.usuario.id,
        dados
      );

      res.status(200).json({
        success: true,
        message: "Lançamento atualizado com sucesso.",
        data: lancamentoAtualizado,
      });
    } catch (error) {
      next(error);
    }
  }

  static async remover(req, res, next) {
    try {
      const { id } = req.params;

      const resultado = await LaunchService.remover(id, req.usuario.id);

      res.status(200).json({
        success: true,
        message: "Lançamento removido com sucesso.",
        data: resultado,
      });
    } catch (error) {
      next(error);
    }
  }

  static async listar(req, res, next) {
    try {
      const lancamentos = await LaunchService.listar(req.usuario.id, req.query);

      res.status(200).json({
        success: true,
        message: "Lançamentos recuperados com sucesso.",
        data: lancamentos,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default LaunchController;
