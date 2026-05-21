import OrcamentoService from "../services/orcamentoService.js";

class OrcamentoController {
  static async cadastrar(req, res, next) {
    try {
      const { valor, mes, ano, idCategoria, descricao } = req.body;

      const orcamento = await OrcamentoService.cadastrar({
        idUsuario: req.usuario.id,
        valor,
        mes,
        ano,
        idCategoria,
        descricao,
      });

      return res.status(201).json({
        success: true,
        message: "Orçamento cadastrado com sucesso.",
        data: orcamento,
      });
    } catch (error) {
      next(error);
    }
  }

  static async listar(req, res, next) {
    try {
      const orcamentos = await OrcamentoService.listar(
        req.usuario.id,
        req.query,
      );

      return res.status(200).json({
        success: true,
        message: "Orçamentos recuperados com sucesso.",
        data: orcamentos,
      });
    } catch (error) {
      next(error);
    }
  }

  static async buscarPorId(req, res, next) {
    try {
      const { id } = req.params;

      const orcamento = await OrcamentoService.buscarPorId(id, req.usuario.id);

      return res.status(200).json({
        success: true,
        message: "Orçamento recuperado com sucesso.",
        data: orcamento,
      });
    } catch (error) {
      next(error);
    }
  }

  static async editar(req, res, next) {
    try {
      const { id } = req.params;

      const orcamentoAtualizado = await OrcamentoService.editar(
        id,
        req.usuario.id,
        req.body,
      );

      return res.status(200).json({
        success: true,
        message: "Orçamento atualizado com sucesso.",
        data: orcamentoAtualizado,
      });
    } catch (error) {
      next(error);
    }
  }

  static async remover(req, res, next) {
    try {
      const { id } = req.params;

      const resultado = await OrcamentoService.remover(id, req.usuario.id);

      return res.status(200).json({
        success: true,
        message: "Orçamento removido com sucesso.",
        data: resultado,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default OrcamentoController;
