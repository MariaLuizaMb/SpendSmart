import unittest
from unittest.mock import patch

from fastapi import HTTPException

from app.main import health_check, predict_monthly
from app.schemas.predictive_schema import MonthlyPredictiveRequest


class MainApiTest(unittest.TestCase):
    def test_health_check_retorna_status_ok(self):
        self.assertEqual(health_check(), {"status": "ok"})

    def test_predict_monthly_retorna_resultado_do_servico(self):
        payload = MonthlyPredictiveRequest(idUsuario="usuario-1", mes=5, ano=2026)
        resultado = {"resumo": {"saldoProjetado": 100}}

        with patch(
            "app.main.gerar_analise_preditiva_mensal",
            return_value=resultado,
        ) as gerar:
            resposta = predict_monthly(payload)

        self.assertEqual(resposta, resultado)
        gerar.assert_called_once_with(id_usuario="usuario-1", mes=5, ano=2026)

    def test_predict_monthly_converte_runtime_error_em_http_500(self):
        payload = MonthlyPredictiveRequest(idUsuario="usuario-1", mes=5, ano=2026)

        with patch(
            "app.main.gerar_analise_preditiva_mensal",
            side_effect=RuntimeError("Banco indisponível."),
        ):
            with self.assertRaises(HTTPException) as contexto:
                predict_monthly(payload)

        self.assertEqual(contexto.exception.status_code, 500)
        self.assertEqual(contexto.exception.detail, "Banco indisponível.")

    def test_predict_monthly_oculta_erros_inesperados(self):
        payload = MonthlyPredictiveRequest(idUsuario="usuario-1", mes=5, ano=2026)

        with patch(
            "app.main.gerar_analise_preditiva_mensal",
            side_effect=ValueError("erro interno"),
        ):
            with self.assertRaises(HTTPException) as contexto:
                predict_monthly(payload)

        self.assertEqual(contexto.exception.status_code, 500)
        self.assertEqual(
            contexto.exception.detail,
            "Não foi possível gerar a análise preditiva.",
        )


if __name__ == "__main__":
    unittest.main()
