import pandas as pd
from psycopg.rows import dict_row

from app.database import get_connection


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

SALDO_COLUMNS = [
    "saldoInicial",
    "movimentacao",
    "contasAtivas",
]


def buscar_lancamentos_periodo(id_usuario: str, data_inicio, data_fim):
    query = """
        SELECT
            l."id",
            l."idCategoria",
            c."nome" AS categoria_nome,
            l."tipo",
            l."recorrencia",
            l."descricao",
            l."idConta",
            l."valor",
            l."dataTransacao"
        FROM "Lancamento" l
        INNER JOIN "Categoria" c ON c."id" = l."idCategoria"
        WHERE l."idUsuario" = %s
          AND l."dataTransacao" >= %s
          AND l."dataTransacao" < %s
        ORDER BY l."dataTransacao" ASC
    """

    try:
        with get_connection() as conn:
            with conn.cursor(row_factory=dict_row) as cursor:
                cursor.execute(query, (id_usuario, data_inicio, data_fim))
                rows = cursor.fetchall()
    except RuntimeError:
        raise
    except Exception as error:
        raise RuntimeError("Erro ao consultar lançamentos para analytics.") from error

    return pd.DataFrame(rows, columns=LANCAMENTO_COLUMNS)


def buscar_lancamentos_despesa_mes(id_usuario: str, data_inicio, data_fim):
    lancamentos = buscar_lancamentos_periodo(id_usuario, data_inicio, data_fim)

    if lancamentos.empty:
        return lancamentos

    return lancamentos[lancamentos["tipo"] == "DESPESA"].copy()


def buscar_orcamentos_mes(id_usuario: str, mes: int, ano: int):
    query = """
        SELECT
            o."id",
            o."idCategoria",
            c."nome" AS categoria_nome,
            o."valor",
            o."mes",
            o."ano"
        FROM "Orcamento" o
        LEFT JOIN "Categoria" c ON c."id" = o."idCategoria"
        WHERE o."idUsuario" = %s
          AND o."mes" = %s
          AND o."ano" = %s
    """

    try:
        with get_connection() as conn:
            with conn.cursor(row_factory=dict_row) as cursor:
                cursor.execute(query, (id_usuario, mes, ano))
                rows = cursor.fetchall()
    except RuntimeError:
        raise
    except Exception as error:
        raise RuntimeError("Erro ao consultar orçamentos para analytics.") from error

    return pd.DataFrame(rows, columns=ORCAMENTO_COLUMNS)


def buscar_saldo_contas_usuario(id_usuario: str, data_referencia):
    query = """
        WITH contas_ativas AS (
            SELECT
                c."id",
                c."saldoInicial"
            FROM "Conta" c
            WHERE c."idUsuario" = %s
              AND c."ativa" = true
        ),
        movimentacoes AS (
            SELECT
                COALESCE(
                    SUM(
                        CASE
                            WHEN l."tipo" = 'RECEITA' THEN l."valor"
                            WHEN l."tipo" = 'DESPESA' THEN -l."valor"
                            ELSE 0
                        END
                    ),
                    0
                ) AS movimentacao
            FROM "Lancamento" l
            INNER JOIN contas_ativas c ON c."id" = l."idConta"
            WHERE l."dataTransacao" < %s
        )
        SELECT
            COALESCE(SUM(c."saldoInicial"), 0) AS "saldoInicial",
            COALESCE(MAX(m.movimentacao), 0) AS movimentacao,
            COUNT(c."id") AS "contasAtivas"
        FROM contas_ativas c
        CROSS JOIN movimentacoes m
    """

    try:
        with get_connection() as conn:
            with conn.cursor(row_factory=dict_row) as cursor:
                cursor.execute(query, (id_usuario, data_referencia))
                row = cursor.fetchone()
    except RuntimeError:
        raise
    except Exception as error:
        raise RuntimeError("Erro ao consultar saldo para analytics.") from error

    if not row:
        return pd.DataFrame([], columns=SALDO_COLUMNS)

    return pd.DataFrame([row], columns=SALDO_COLUMNS)
