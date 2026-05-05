import pandas as pd
from psycopg.rows import dict_row

from app.database import get_connection


LANCAMENTO_COLUMNS = [
    "id",
    "idCategoria",
    "categoria_nome",
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


def buscar_lancamentos_despesa_mes(id_usuario: str, data_inicio, data_fim):
    query = """
        SELECT
            l."id",
            l."idCategoria",
            c."nome" AS categoria_nome,
            l."valor",
            l."dataTransacao"
        FROM "Lancamento" l
        INNER JOIN "Categoria" c ON c."id" = l."idCategoria"
        WHERE l."idUsuario" = %s
          AND l."tipo" = 'DESPESA'
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
