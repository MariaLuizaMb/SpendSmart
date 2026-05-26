import unittest
from datetime import datetime, timezone

import pandas as pd

from app.services import predictive_service as service


class PredictiveHelpersTest(unittest.TestCase):
    def test_datas_e_aritmetica_basica_sao_deterministicas(self):
        self.assertEqual(service.arredondar("10.235"), 10.23)
        self.assertEqual(service.dividir_seguro(10, 0), 0)
        self.assertEqual(service.dividir_seguro(10, 4), 2.5)
        self.assertEqual(service.inicio_mes(2026, 5), datetime(2026, 5, 1))
        self.assertEqual(service.fim_mes(2026, 12), datetime(2027, 1, 1))
        self.assertEqual(service.adicionar_meses(datetime(2026, 1, 31), 1), datetime(2026, 2, 28))
        self.assertEqual(service.chave_mes(datetime(2026, 5, 10)), "2026-05")

    def test_converter_data_trata_nulos_datetime_e_strings(self):
        data_com_timezone = datetime(2026, 5, 10, 12, 0, tzinfo=timezone.utc)

        self.assertIsNone(service.converter_data(pd.NaT))
        self.assertEqual(
            service.converter_data(data_com_timezone),
            datetime(2026, 5, 10, 12, 0),
        )
        self.assertEqual(
            service.converter_data("2026-05-10"),
            datetime(2026, 5, 10),
        )

    def test_preparar_filtrar_e_somar_lancamentos(self):
        dados = pd.DataFrame(
            [
                {
                    "id": "l1",
                    "valor": "100.50",
                    "dataTransacao": "2026-05-10",
                    "tipo": "DESPESA",
                    "recorrencia": None,
                    "descricao": None,
                    "categoria_nome": None,
                },
                {
                    "id": "l2",
                    "valor": "300",
                    "dataTransacao": "2026-06-10",
                    "tipo": "RECEITA",
                    "recorrencia": "MENSAL",
                    "descricao": "Salário",
                    "categoria_nome": "Salário",
                },
            ],
        )

        preparados = service.preparar_lancamentos(dados)

        self.assertEqual(preparados.iloc[0]["recorrencia"], "NENHUMA")
        self.assertEqual(preparados.iloc[0]["descricao"], "")
        self.assertEqual(preparados.iloc[0]["categoria_nome"], "Sem categoria")

        filtrados = service.filtrar_periodo(
            preparados,
            datetime(2026, 5, 1),
            datetime(2026, 6, 1),
        )

        self.assertEqual(filtrados["id"].tolist(), ["l1"])
        self.assertEqual(service.somar_por_tipo(filtrados, service.TIPO_DESPESA), 100.5)
        self.assertEqual(service.somar_por_tipo(pd.DataFrame(), service.TIPO_DESPESA), 0)

    def test_orcamentos_historico_e_regressao_insuficiente(self):
        orcamentos = pd.DataFrame(
            [
                {"idCategoria": None, "valor": 1000},
                {"idCategoria": "cat-1", "valor": 250},
                {"idCategoria": "cat-1", "valor": 50},
            ],
        )

        self.assertEqual(service.obter_valor_orcamento_geral(orcamentos), 1000)
        self.assertEqual(
            service.obter_orcamentos_por_categoria(orcamentos),
            {"cat-1": 300.0},
        )
        self.assertEqual(service.obter_valor_orcamento_geral(pd.DataFrame()), 0)
        self.assertEqual(service.obter_orcamentos_por_categoria(pd.DataFrame()), {})

        historico = [
            {"receitas": 100, "despesas": 50},
            {"receitas": 200, "despesas": 80},
        ]

        self.assertEqual(service.media_mensal(historico, "receitas"), 150)
        self.assertEqual(service.media_recente(historico, "despesas"), 65)
        self.assertEqual(service.combinar_media([], "receitas"), 0)
        self.assertIsNone(service.calcular_previsao_regressao(historico, "receitas"))


if __name__ == "__main__":
    unittest.main()
