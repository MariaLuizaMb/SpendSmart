import BankAccountService from "../services/bankAccountService.js";

class BankAccountController {
  static async listar(req, res, next) {
    try {
      const contas = await BankAccountService.listarPorUsuario(req.usuario.id);

      return res.status(200).json({
        success: true,
        data: contas,
      });
    } catch (error) {
      next(error);
    }
  }

  static async cadastrar(req, res, next) {
    try {
      const { nome, tipo, saldoInicial, descricao } = req.body;

      const dadosConta = {
        idUsuario: req.usuario.id,
        nome,
        tipo,
        saldoInicial,
        descricao,
      };

      const conta = await BankAccountService.cadastrar(dadosConta);

      return res.status(201).json({
        success: true,
        message: "Conta bancária cadastrada com sucesso.",
        data: conta,
      });
    } catch (error) {
      next(error);
    }
  }

  static async editar(req, res, next) {
    try {
      const { id } = req.params;
      const dados = req.body;

      const contaAtualizada = await BankAccountService.editar(
        id,
        req.usuario.id,
        dados
      );

      return res.status(200).json({
        success: true,
        message: "Conta atualizada com sucesso.",
        data: contaAtualizada,
      });
    } catch (error) {
      next(error);
    }
  }

  static async remover(req, res, next) {
    try {
      const { id } = req.params;

      const resultado = await BankAccountService.remover(id, req.usuario.id);

      return res.status(200).json({
        success: true,
        message: "Conta removida com sucesso.",
        data: resultado,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default BankAccountController;
