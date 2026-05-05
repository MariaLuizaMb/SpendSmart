import AppError from "../errors/appError.js";

class AnalyticsService {
  static async obterAnalisePreditiva({ idUsuario, mes, ano }) {
    const analyticsApiUrl = process.env.ANALYTICS_API_URL;

    if (!analyticsApiUrl) {
      throw new AppError(
        "Serviço de analytics não configurado.",
        500,
        "ANALYTICS_NOT_CONFIGURED",
      );
    }

    const endpoint = new URL(
      "/analytics/predict/monthly",
      analyticsApiUrl,
    ).toString();

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idUsuario, mes, ano }),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : null;

      if (!response.ok) {
        throw new AppError(
          data?.detail || "Erro ao consultar serviço de analytics.",
          response.status >= 500 ? 502 : response.status,
          "ANALYTICS_SERVICE_ERROR",
        );
      }

      return data;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(
        "Serviço de analytics indisponível.",
        503,
        "ANALYTICS_SERVICE_UNAVAILABLE",
      );
    }
  }
}

export default AnalyticsService;
