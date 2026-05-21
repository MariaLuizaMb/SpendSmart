import AnalyticsService from "../services/analyticsService.js";
import { ValidationError } from "../errors/appError.js";

class AnalyticsController {
  static async obterAnalisePreditiva(req, res, next) {
    try {
      const dataAtual = new Date();

      const mes = req.query.mes
        ? Number(req.query.mes)
        : dataAtual.getMonth() + 1;

      const ano = req.query.ano
        ? Number(req.query.ano)
        : dataAtual.getFullYear();

      if (!Number.isInteger(mes) || mes < 1 || mes > 12) {
        throw new ValidationError("O mês deve estar entre 1 e 12.");
      }

      if (!Number.isInteger(ano) || ano < 1900 || ano > 9999) {
        throw new ValidationError("O ano informado é inválido.");
      }

      const analise = await AnalyticsService.obterAnalisePreditiva({
        idUsuario: req.usuario.id,
        mes,
        ano,
      });

      return res.status(200).json({
        success: true,
        message: "Análise preditiva carregada com sucesso.",
        data: analise,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AnalyticsController;
