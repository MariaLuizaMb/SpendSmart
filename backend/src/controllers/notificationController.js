import NotificationService from "../services/notificationService.js";

class NotificationController {
  static async listar(req, res, next) {
    try {
      const notificacoes = await NotificationService.listarRecentes(
        req.usuario.id,
        req.query.limite,
      );

      return res.status(200).json({
        success: true,
        data: notificacoes,
      });
    } catch (error) {
      next(error);
    }
  }

  static async marcarComoLida(req, res, next) {
    try {
      const resultado = await NotificationService.marcarComoLida(
        req.params.id,
        req.usuario.id,
      );

      return res.status(200).json({
        success: true,
        data: resultado,
      });
    } catch (error) {
      next(error);
    }
  }

  static async marcarTodasComoLidas(req, res, next) {
    try {
      const resultado = await NotificationService.marcarTodasComoLidas(
        req.usuario.id,
      );

      return res.status(200).json({
        success: true,
        data: resultado,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default NotificationController;
