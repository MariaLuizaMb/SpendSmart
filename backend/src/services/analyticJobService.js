import prisma from "../database/prisma.js";

class AnalyticJobService {
  static async registrarInicio({ idUsuario, tipo, payload }) {
    return prisma.analyticJob.create({
      data: {
        idUsuario,
        tipo,
        status: "processing",
        payload,
        iniciadoEm: new Date(),
      },
    });
  }

  static async registrarSucesso(id, resultado) {
    return prisma.analyticJob.update({
      where: { id },
      data: {
        status: "completed",
        resultado: resultado || {},
        erro: null,
        finalizadoEm: new Date(),
      },
    });
  }

  static async registrarFalha(id, error) {
    return prisma.analyticJob.update({
      where: { id },
      data: {
        status: "failed",
        erro: error?.message || String(error || "Erro desconhecido."),
        finalizadoEm: new Date(),
      },
    });
  }
}

export default AnalyticJobService;
