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
}

export default BankAccountController;
