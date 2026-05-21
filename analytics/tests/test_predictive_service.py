import unittest
from datetime import datetime, timezone
from unittest.mock import patch

import pandas as pd

from app.services.predictive_service import gerar_analise_preditiva_mensal


LANCAMENTO_COLUMNS = [
    "id",
    "idCategoria",
    "categoria_nome",
    "tipo",
    "recorrencia",
    "descricao",
    "idConta",
    "valor",
    "dataTransacao",
]

ORCAMENTO_COLUMNS = [
    "id",
    "idCategoria",
    "categoria_nome",
    "valor",
    "mes",
    "ano",
]

SALDO_COLUMNS = ["saldoInicial", "movimentacao", "contasAtivas"]


def df_lancamentos(linhas):
    return pd.DataFrame(linhas, columns=LANCAMENTO_COLUMNS)


def df_orcamentos(linhas):
    return pd.DataFrame(linhas, columns=ORCAMENTO_COLUMNS)


def df_saldo(saldo_inicial=0, movimentacao=0, contas_ativas=1):
    return pd.DataFrame(
        [[saldo_inicial, movimentacao, contas_ativas]],
        columns=SALDO_COLUMNS,
    )


class PredictiveServiceTest(unittest.TestCase):
    def gerar(self, lancamentos, orcamentos=None, saldo=None, mes=5, ano=2026):
        with (
            patch(
                "app.services.predictive_service.buscar_lancamentos_periodo",
                return_value=df_lancamentos(lancamentos),
            ),
            patch(
                "app.services.predictive_service.buscar_orcamentos_mes",
                return_value=df_orcamentos(orcamentos or []),
            ),
            patch(
                "app.services.predictive_service.buscar_saldo_contas_usuario",
                return_value=saldo if saldo is not None else df_saldo(1000, 0),
            ),
        ):
            return gerar_analise_preditiva_mensal(
                "usuario-1",
                mes,
                ano,
                data_referencia=datetime(2026, 5, 14, tzinfo=timezone.utc),
            )

    def test_projeta_receitas_despesas_saldo_e_tendencias(self):
        lancamentos = [
            ["r-mar", "salario", "Salário", "RECEITA", "MENSAL", "salario", "conta-1", 3000, "2026-03-05"],
            ["d-mar", "moradia", "Moradia", "DESPESA", "MENSAL", "aluguel", "conta-1", 1000, "2026-03-10"],
            ["m-mar", "mercado", "Mercado", "DESPESA", "NENHUMA", "compras", "conta-1", 600, "2026-03-15"],
            ["r-abr", "salario", "Salário", "RECEITA", "MENSAL", "salario", "conta-1", 3000, "2026-04-05"],
            ["d-abr", "moradia", "Moradia", "DESPESA", "MENSAL", "aluguel", "conta-1", 1000, "2026-04-10"],
            ["m-abr", "mercado", "Mercado", "DESPESA", "NENHUMA", "compras", "conta-1", 700, "2026-04-15"],
            ["r-mai", "salario", "Salário", "RECEITA", "MENSAL", "salario", "conta-1", 3000, "2026-05-05"],
            ["d-mai", "moradia", "Moradia", "DESPESA", "MENSAL", "aluguel", "conta-1", 1000, "2026-05-10"],
            ["m-mai", "mercado", "Mercado", "DESPESA", "NENHUMA", "compras", "conta-1", 350, "2026-05-12"],
        ]
        orcamentos = [
            ["o-geral", None, None, 2500, 5, 2026],
            ["o-moradia", "moradia", "Moradia", 1100, 5, 2026],
        ]

        resultado = self.gerar(lancamentos, orcamentos=orcamentos)

        self.assertGreater(resultado["resumo"]["receitaProjetada"], 0)
        self.assertGreater(resultado["resumo"]["despesaProjetada"], 0)
        self.assertIn("saldoProjetado", resultado["saldo"])
        self.assertIn("tendenciaReceitas", resultado["tendencias"])
        self.assertIn("confiabilidadeAnalise", resultado["confiabilidade"])
        self.assertIn("modeloPreditivo", resultado)
        self.assertEqual(resultado["categorias"][0]["nome"], "Moradia")
        self.assertIn("projecaoGastoMensal", resultado["resumo"])
        self.assertIn("diasAteEsgotar", resultado["orcamento"])
        self.assertIn("mensagemTemporal", resultado["orcamento"])

    def test_mes_futuro_usa_recorrencias_sem_depender_de_lancamento_no_mes(self):
        lancamentos = [
            ["r-abr", "salario", "Salário", "RECEITA", "MENSAL", "salario", "conta-1", 4000, "2026-04-05"],
            ["d-abr", "moradia", "Moradia", "DESPESA", "MENSAL", "aluguel", "conta-1", 1200, "2026-04-10"],
        ]

        resultado = self.gerar(lancamentos, mes=6, ano=2026)

        self.assertGreaterEqual(resultado["projecoes"]["receitaProjetada"], 4000)
        self.assertGreaterEqual(resultado["projecoes"]["despesaProjetada"], 1200)
        self.assertEqual(resultado["periodo"]["tipoPeriodo"], "FUTURO")
        self.assertEqual(resultado["modeloPreditivo"]["biblioteca"], "scikit-learn")

    def test_alerta_saldo_negativo_e_despesas_acima_da_renda(self):
        lancamentos = [
            ["d-mai", "mercado", "Mercado", "DESPESA", "NENHUMA", "compras", "conta-1", 1500, "2026-05-02"],
            ["d-mai-2", "lazer", "Lazer", "DESPESA", "NENHUMA", "fim de semana", "conta-1", 700, "2026-05-10"],
        ]

        resultado = self.gerar(
            lancamentos,
            saldo=df_saldo(0, -50),
        )
        tipos_alertas = {alerta["tipo"] for alerta in resultado["alertas"]}

        self.assertIn("SALDO_NEGATIVO", tipos_alertas)
        self.assertIn("AUSENCIA_ORCAMENTO", tipos_alertas)

    def test_sem_dados_retorna_estrutura_estavel(self):
        resultado = self.gerar([], saldo=df_saldo(0, 0, 0))

        self.assertEqual(resultado["resumo"]["despesaProjetada"], 0)
        self.assertEqual(resultado["categorias"], [])
        self.assertEqual(resultado["confiabilidade"]["qualidadeDosDados"], "BAIXA")
        self.assertTrue(resultado["insights"]["dadosInsuficientes"])


if __name__ == "__main__":
    unittest.main()
