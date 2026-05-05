import calendar
from datetime import datetime, timezone

from app.repositories.finance_repository import (
    buscar_lancamentos_despesa_mes,
    buscar_orcamentos_mes,
)


def arredondar(valor):
    return round(float(valor), 2)


def obter_status_orcamento(percentual_projetado):
    if percentual_projetado >= 100:
        return {
            "status": "RISCO",
            "mensagem": "Mantendo esse ritmo, você pode ultrapassar seu orçamento mensal.",
        }

    if percentual_projetado >= 80:
        return {
            "status": "ATENCAO",
            "mensagem": "Seus gastos estão se aproximando do limite definido para o mês.",
        }

    return {
        "status": "DENTRO_DO_ORCAMENTO",
        "mensagem": "Seus gastos estão dentro do orçamento previsto.",
    }


def gerar_analise_preditiva_mensal(id_usuario: str, mes: int, ano: int):
    dias_no_mes = calendar.monthrange(ano, mes)[1]

    data_inicio = datetime(ano, mes, 1)

    if mes == 12:
        data_fim = datetime(ano + 1, 1, 1)
    else:
        data_fim = datetime(ano, mes + 1, 1)

    hoje = datetime.now(timezone.utc).replace(tzinfo=None)

    analisando_mes_atual = hoje.year == ano and hoje.month == mes

    dias_considerados = hoje.day if analisando_mes_atual else dias_no_mes

    lancamentos = buscar_lancamentos_despesa_mes(
        id_usuario=id_usuario,
        data_inicio=data_inicio,
        data_fim=data_fim,
    )

    orcamentos = buscar_orcamentos_mes(
        id_usuario=id_usuario,
        mes=mes,
        ano=ano,
    )

    if lancamentos.empty:
        total_gasto_atual = 0
    else:
        total_gasto_atual = lancamentos["valor"].astype(float).sum()

    media_diaria = total_gasto_atual / dias_considerados if dias_considerados > 0 else 0
    projecao_gasto_mensal = media_diaria * dias_no_mes

    orcamento_geral = orcamentos[orcamentos["idCategoria"].isna()]
    limite_mensal = (
        orcamento_geral["valor"].astype(float).sum()
        if not orcamento_geral.empty
        else 0
    )

    percentual_atual = (
        (total_gasto_atual / limite_mensal) * 100 if limite_mensal > 0 else 0
    )

    percentual_projetado = (
        (projecao_gasto_mensal / limite_mensal) * 100 if limite_mensal > 0 else 0
    )

    status_orcamento = obter_status_orcamento(percentual_projetado)

    categorias = []

    if not lancamentos.empty:
        agrupado = (
            lancamentos.groupby(["idCategoria", "categoria_nome"])["valor"]
            .sum()
            .reset_index()
            .sort_values(by="valor", ascending=False)
        )

        orcamentos_categoria = orcamentos[orcamentos["idCategoria"].notna()]

        for _, linha in agrupado.iterrows():
            id_categoria = linha["idCategoria"]
            total_categoria = float(linha["valor"])

            limite_categoria_df = orcamentos_categoria[
                orcamentos_categoria["idCategoria"] == id_categoria
            ]

            limite_categoria = (
                float(limite_categoria_df["valor"].sum())
                if not limite_categoria_df.empty
                else 0
            )

            percentual_total = (
                (total_categoria / total_gasto_atual) * 100
                if total_gasto_atual > 0
                else 0
            )

            percentual_orcamento = (
                (total_categoria / limite_categoria) * 100
                if limite_categoria > 0
                else 0
            )

            categorias.append(
                {
                    "idCategoria": id_categoria,
                    "nome": linha["categoria_nome"],
                    "total": arredondar(total_categoria),
                    "percentual": arredondar(percentual_total),
                    "limite": arredondar(limite_categoria),
                    "percentualOrcamento": arredondar(percentual_orcamento),
                }
            )

    categoria_maior_gasto = categorias[0] if categorias else None

    dados_insuficientes = len(lancamentos) < 3 or dias_considerados < 3

    return {
        "periodo": {
            "mes": mes,
            "ano": ano,
            "diasNoMes": dias_no_mes,
            "diasConsiderados": dias_considerados,
        },
        "resumo": {
            "totalGastoAtual": arredondar(total_gasto_atual),
            "mediaDiaria": arredondar(media_diaria),
            "projecaoGastoMensal": arredondar(projecao_gasto_mensal),
        },
        "orcamento": {
            "limiteMensal": arredondar(limite_mensal),
            "percentualAtual": arredondar(percentual_atual),
            "percentualProjetado": arredondar(percentual_projetado),
            "status": status_orcamento["status"],
            "mensagem": status_orcamento["mensagem"],
        },
        "categorias": categorias,
        "insights": {
            "categoriaMaiorGasto": categoria_maior_gasto,
            "dadosInsuficientes": dados_insuficientes,
        },
    }
