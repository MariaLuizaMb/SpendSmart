import unittest
from datetime import datetime
from unittest.mock import patch

from app.repositories import finance_repository as repo


class FakeCursor:
    def __init__(self, rows=None, row=None, error=None):
        self.rows = rows or []
        self.row = row
        self.error = error
        self.executed = None

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, tb):
        return False

    def execute(self, query, params):
        if self.error:
            raise self.error

        self.executed = (query, params)

    def fetchall(self):
        return self.rows

    def fetchone(self):
        return self.row


class FakeConnection:
    def __init__(self, cursor):
        self._cursor = cursor

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, tb):
        return False

    def cursor(self, row_factory=None):
        return self._cursor


def mock_connection(cursor):
    return patch(
        "app.repositories.finance_repository.get_connection",
        return_value=FakeConnection(cursor),
    )


class FinanceRepositoryTest(unittest.TestCase):
    def test_buscar_lancamentos_periodo_retorna_dataframe_com_colunas(self):
        linha = {
            "id": "l1",
            "idCategoria": "cat-1",
            "categoria_nome": "Mercado",
            "tipo": "DESPESA",
            "recorrencia": "NENHUMA",
            "descricao": "Compras",
            "idConta": "conta-1",
            "valor": 120,
            "dataTransacao": "2026-05-10",
        }
        cursor = FakeCursor(rows=[linha])

        with mock_connection(cursor):
            resultado = repo.buscar_lancamentos_periodo(
                "usuario-1",
                datetime(2026, 5, 1),
                datetime(2026, 6, 1),
            )

        self.assertEqual(list(resultado.columns), repo.LANCAMENTO_COLUMNS)
        self.assertEqual(resultado.iloc[0]["id"], "l1")
        self.assertEqual(cursor.executed[1][0], "usuario-1")

    def test_buscar_lancamentos_despesa_mes_filtra_apenas_despesas(self):
        linhas = [
            {
                "id": "d1",
                "idCategoria": "cat-1",
                "categoria_nome": "Mercado",
                "tipo": "DESPESA",
                "recorrencia": "NENHUMA",
                "descricao": "Compras",
                "idConta": "conta-1",
                "valor": 120,
                "dataTransacao": "2026-05-10",
            },
            {
                "id": "r1",
                "idCategoria": "cat-2",
                "categoria_nome": "Salário",
                "tipo": "RECEITA",
                "recorrencia": "MENSAL",
                "descricao": "Salário",
                "idConta": "conta-1",
                "valor": 3000,
                "dataTransacao": "2026-05-05",
            },
        ]

        with mock_connection(FakeCursor(rows=linhas)):
            resultado = repo.buscar_lancamentos_despesa_mes(
                "usuario-1",
                datetime(2026, 5, 1),
                datetime(2026, 6, 1),
            )

        self.assertEqual(resultado["id"].tolist(), ["d1"])

    def test_buscar_orcamentos_mes_retorna_dataframe(self):
        cursor = FakeCursor(
            rows=[
                {
                    "id": "o1",
                    "idCategoria": None,
                    "categoria_nome": None,
                    "valor": 1000,
                    "mes": 5,
                    "ano": 2026,
                }
            ],
        )

        with mock_connection(cursor):
            resultado = repo.buscar_orcamentos_mes("usuario-1", 5, 2026)

        self.assertEqual(list(resultado.columns), repo.ORCAMENTO_COLUMNS)
        self.assertEqual(resultado.iloc[0]["valor"], 1000)
        self.assertEqual(cursor.executed[1], ("usuario-1", 5, 2026))

    def test_buscar_saldo_contas_usuario_retorna_linha_ou_dataframe_vazio(self):
        cursor = FakeCursor(
            row={"saldoInicial": 1000, "movimentacao": -100, "contasAtivas": 2},
        )

        with mock_connection(cursor):
            resultado = repo.buscar_saldo_contas_usuario(
                "usuario-1",
                datetime(2026, 5, 27),
            )

        self.assertEqual(list(resultado.columns), repo.SALDO_COLUMNS)
        self.assertEqual(resultado.iloc[0]["movimentacao"], -100)

        with mock_connection(FakeCursor(row=None)):
            vazio = repo.buscar_saldo_contas_usuario(
                "usuario-1",
                datetime(2026, 5, 27),
            )

        self.assertTrue(vazio.empty)

    def test_erros_de_banco_sao_convertidos_em_runtime_error(self):
        with mock_connection(FakeCursor(error=ValueError("falha"))):
            with self.assertRaisesRegex(
                RuntimeError,
                "Erro ao consultar lançamentos para analytics.",
            ):
                repo.buscar_lancamentos_periodo(
                    "usuario-1",
                    datetime(2026, 5, 1),
                    datetime(2026, 6, 1),
                )

    def test_runtime_error_de_configuracao_eh_repassado(self):
        with patch(
            "app.repositories.finance_repository.get_connection",
            side_effect=RuntimeError("DATABASE_URL não configurada"),
        ):
            with self.assertRaisesRegex(RuntimeError, "DATABASE_URL"):
                repo.buscar_orcamentos_mes("usuario-1", 5, 2026)


if __name__ == "__main__":
    unittest.main()
