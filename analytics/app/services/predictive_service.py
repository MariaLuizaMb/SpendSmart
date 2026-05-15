import calendar
from datetime import datetime, timedelta, timezone

import pandas as pd

from app.repositories.finance_repository import (
    buscar_lancamentos_periodo,
    buscar_orcamentos_mes,
    buscar_saldo_contas_usuario,
)


HISTORICO_MESES = 6
MESES_RECENTES = 2
LIMIAR_TENDENCIA_PERCENTUAL = 5
LIMIAR_CATEGORIA_PROXIMA_LIMITE = 80
LIMIAR_CRESCIMENTO_EXCESSIVO = 25
LIMIAR_ECONOMIA_BAIXA = 10
PESO_HISTORICO = 0.45
PESO_RECENTE = 0.55

TIPO_RECEITA = "RECEITA"
TIPO_DESPESA = "DESPESA"
RECORRENCIAS_ATIVAS = {"DIARIA", "SEMANAL", "MENSAL", "ANUAL"}


def arredondar(valor):
    return round(float(valor or 0), 2)


def dividir_seguro(numerador, denominador):
    denominador = float(denominador or 0)

    if denominador == 0:
        return 0

    return float(numerador or 0) / denominador


def inicio_mes(ano: int, mes: int):
    return datetime(ano, mes, 1)


def adicionar_meses(data: datetime, meses: int):
    indice_mes = data.month - 1 + meses
    ano = data.year + indice_mes // 12
    mes = indice_mes % 12 + 1
    dia = min(data.day, calendar.monthrange(ano, mes)[1])

    return datetime(ano, mes, dia)


def fim_mes(ano: int, mes: int):
    return adicionar_meses(inicio_mes(ano, mes), 1)


def chave_mes(data: datetime):
    return f"{data.year:04d}-{data.month:02d}"


def converter_data(valor):
    if pd.isna(valor):
        return None

    if isinstance(valor, datetime):
        return valor.replace(tzinfo=None)

    return pd.to_datetime(valor).to_pydatetime().replace(tzinfo=None)


def preparar_lancamentos(lancamentos):
    if lancamentos.empty:
        return lancamentos.copy()

    dados = lancamentos.copy()
    dados["valor"] = dados["valor"].astype(float)
    dados["dataTransacao"] = pd.to_datetime(dados["dataTransacao"])
    dados["tipo"] = dados["tipo"].fillna("")
    dados["recorrencia"] = dados["recorrencia"].fillna("NENHUMA")
    dados["descricao"] = dados["descricao"].fillna("")
    dados["categoria_nome"] = dados["categoria_nome"].fillna("Sem categoria")

    return dados


def filtrar_periodo(lancamentos, data_inicio, data_fim):
    if lancamentos.empty:
        return lancamentos.copy()

    inicio = pd.Timestamp(data_inicio)
    fim = pd.Timestamp(data_fim)

    return lancamentos[
        (lancamentos["dataTransacao"] >= inicio)
        & (lancamentos["dataTransacao"] < fim)
    ].copy()


def somar_por_tipo(lancamentos, tipo):
    if lancamentos.empty:
        return 0

    return float(lancamentos.loc[lancamentos["tipo"] == tipo, "valor"].sum())


def obter_valor_orcamento_geral(orcamentos):
    if orcamentos.empty:
        return 0

    orcamento_geral = orcamentos[orcamentos["idCategoria"].isna()]

    if orcamento_geral.empty:
        return 0

    return float(orcamento_geral["valor"].astype(float).sum())


def obter_orcamentos_por_categoria(orcamentos):
    if orcamentos.empty:
        return {}

    por_categoria = orcamentos[orcamentos["idCategoria"].notna()].copy()

    if por_categoria.empty:
        return {}

    agrupado = por_categoria.groupby("idCategoria")["valor"].sum()

    return {id_categoria: float(valor) for id_categoria, valor in agrupado.items()}


def obter_meses_historicos(data_inicio_alvo):
    inicio_historico = adicionar_meses(data_inicio_alvo, -HISTORICO_MESES)
    meses = []

    for indice in range(HISTORICO_MESES):
        meses.append(adicionar_meses(inicio_historico, indice))

    return inicio_historico, meses


def agregar_meses(lancamentos, meses):
    resultado = []

    for mes_inicio in meses:
        mes_fim = adicionar_meses(mes_inicio, 1)
        lancamentos_mes = filtrar_periodo(lancamentos, mes_inicio, mes_fim)
        receitas = somar_por_tipo(lancamentos_mes, TIPO_RECEITA)
        despesas = somar_por_tipo(lancamentos_mes, TIPO_DESPESA)

        resultado.append(
            {
                "mes": chave_mes(mes_inicio),
                "receitas": arredondar(receitas),
                "despesas": arredondar(despesas),
                "saldo": arredondar(receitas - despesas),
            }
        )

    return resultado


def media_mensal(historico, campo):
    if not historico:
        return 0

    return sum(float(mes[campo] or 0) for mes in historico) / len(historico)


def media_recente(historico, campo):
    meses = historico[-MESES_RECENTES:]

    if not meses:
        return 0

    return media_mensal(meses, campo)


def combinar_media(historico, campo):
    media_hist = media_mensal(historico, campo)
    media_rec = media_recente(historico, campo)

    if media_hist <= 0:
        return media_rec

    if media_rec <= 0:
        return media_hist

    return (media_hist * PESO_HISTORICO) + (media_rec * PESO_RECENTE)


def assinatura_recorrencia(lancamento):
    data = converter_data(lancamento["dataTransacao"])
    recorrencia = lancamento["recorrencia"]

    if recorrencia == "SEMANAL":
        marcador_data = data.weekday()
    elif recorrencia == "MENSAL":
        marcador_data = data.day
    elif recorrencia == "ANUAL":
        marcador_data = f"{data.month:02d}-{data.day:02d}"
    else:
        marcador_data = "DIARIA"

    return (
        lancamento["tipo"],
        lancamento["idCategoria"],
        recorrencia,
        arredondar(lancamento["valor"]),
        str(lancamento.get("descricao") or "").strip().lower(),
        marcador_data,
    )


def obter_templates_recorrentes(lancamentos, data_fim):
    if lancamentos.empty:
        return []

    recorrentes = lancamentos[
        lancamentos["recorrencia"].isin(RECORRENCIAS_ATIVAS)
        & (lancamentos["dataTransacao"] < pd.Timestamp(data_fim))
    ].copy()

    if recorrentes.empty:
        return []

    recorrentes["assinatura"] = recorrentes.apply(assinatura_recorrencia, axis=1)
    recorrentes = recorrentes.sort_values("dataTransacao", ascending=False)

    return recorrentes.drop_duplicates("assinatura").to_dict("records")


def contar_ocorrencias_recorrencia(template, data_inicio, data_fim):
    data_origem = converter_data(template["dataTransacao"])
    recorrencia = template["recorrencia"]
    inicio = max(data_inicio, data_origem)
    fim = data_fim

    if inicio >= fim:
        return 0

    if recorrencia == "DIARIA":
        return max((fim.date() - inicio.date()).days, 0)

    if recorrencia == "SEMANAL":
        dias_ate_ocorrencia = (data_origem.weekday() - inicio.weekday()) % 7
        primeira = inicio + timedelta(days=dias_ate_ocorrencia)

        if primeira >= fim:
            return 0

        return ((fim.date() - primeira.date()).days - 1) // 7 + 1

    if recorrencia == "MENSAL":
        ocorrencias = 0
        cursor = inicio_mes(inicio.year, inicio.month)

        while cursor < fim:
            ultimo_dia = calendar.monthrange(cursor.year, cursor.month)[1]
            dia = min(data_origem.day, ultimo_dia)
            ocorrencia = datetime(cursor.year, cursor.month, dia)

            if inicio <= ocorrencia < fim and ocorrencia >= data_origem:
                ocorrencias += 1

            cursor = adicionar_meses(cursor, 1)

        return ocorrencias

    if recorrencia == "ANUAL":
        ocorrencias = 0

        for ano in range(inicio.year, fim.year + 1):
            ultimo_dia = calendar.monthrange(ano, data_origem.month)[1]
            dia = min(data_origem.day, ultimo_dia)
            ocorrencia = datetime(ano, data_origem.month, dia)

            if inicio <= ocorrencia < fim and ocorrencia >= data_origem:
                ocorrencias += 1

        return ocorrencias

    return 0


def projetar_recorrencias(lancamentos, data_inicio, data_fim):
    totais = {
        "receitas": 0,
        "despesas": 0,
        "categorias": {},
        "quantidade": 0,
    }

    for template in obter_templates_recorrentes(lancamentos, data_fim):
        ocorrencias = contar_ocorrencias_recorrencia(template, data_inicio, data_fim)

        if ocorrencias <= 0:
            continue

        valor_total = float(template["valor"]) * ocorrencias
        totais["quantidade"] += ocorrencias

        if template["tipo"] == TIPO_RECEITA:
            totais["receitas"] += valor_total
        elif template["tipo"] == TIPO_DESPESA:
            totais["despesas"] += valor_total
            id_categoria = template["idCategoria"]
            totais["categorias"][id_categoria] = (
                totais["categorias"].get(id_categoria, 0) + valor_total
            )

    return totais


def obter_descricao_tendencia(nome, direcao, percentual, campo="valor"):
    percentual_formatado = f"{arredondar(abs(percentual)):.1f}".replace(".", ",")

    if direcao == "ESTAVEL":
        return f"{nome} permaneceram estáveis em relação à média recente."

    if campo == "despesas" and direcao == "AUMENTO":
        return f"{nome} aumentaram {percentual_formatado}% em relação à média dos últimos meses."

    if campo == "receitas" and direcao == "REDUCAO":
        return f"{nome} reduziram {percentual_formatado}% em relação à média dos últimos meses."

    if campo == "saldo" and direcao == "MELHORA":
        return f"{nome} apresentam melhora de {percentual_formatado}% frente à média recente."

    if campo == "saldo" and direcao == "PIORA":
        return f"{nome} apresentam piora de {percentual_formatado}% frente à média recente."

    acao = "aumentaram" if direcao == "AUMENTO" else "reduziram"

    return f"{nome} {acao} {percentual_formatado}% em relação à média dos últimos meses."


def calcular_tendencia(valor_atual, media_base, nome, campo="valor"):
    valor_atual = float(valor_atual or 0)
    media_base = float(media_base or 0)
    base_percentual = abs(media_base) if campo == "saldo" else media_base
    percentual = dividir_seguro(valor_atual - media_base, base_percentual) * 100

    if media_base == 0 and valor_atual != 0:
        percentual = 100 if valor_atual > 0 else -100

    if abs(percentual) < LIMIAR_TENDENCIA_PERCENTUAL:
        direcao = "ESTAVEL"
    elif campo == "saldo":
        direcao = "MELHORA" if percentual > 0 else "PIORA"
    else:
        direcao = "AUMENTO" if percentual > 0 else "REDUCAO"

    return {
        "direcao": direcao,
        "percentual": arredondar(abs(percentual)),
        "descricao": obter_descricao_tendencia(nome, direcao, percentual, campo),
    }


def obter_status_orcamento(percentual_projetado, limite_mensal):
    if limite_mensal <= 0:
        return {
            "status": "SEM_ORCAMENTO",
            "mensagem": "Nenhum orçamento mensal foi definido para este período.",
        }

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


def criar_alerta(tipo, severidade, titulo, descricao, recomendacao):
    return {
        "id": tipo.lower(),
        "tipo": tipo,
        "severidade": severidade,
        "titulo": titulo,
        "descricao": descricao,
        "recomendacao": recomendacao,
    }


def obter_severidade_categoria(percentual_orcamento, percentual_renda, tendencia):
    if percentual_orcamento >= 100:
        return "ALTO"

    if percentual_orcamento >= LIMIAR_CATEGORIA_PROXIMA_LIMITE:
        return "MEDIO"

    if percentual_renda >= 30 or (
        tendencia["direcao"] == "AUMENTO"
        and tendencia["percentual"] >= LIMIAR_CRESCIMENTO_EXCESSIVO
    ):
        return "MEDIO"

    return "BAIXO"


def obter_status_categoria(percentual_orcamento, risco):
    if percentual_orcamento >= 100:
        return "ACIMA_DO_ORCAMENTO"

    if percentual_orcamento >= LIMIAR_CATEGORIA_PROXIMA_LIMITE:
        return "PROXIMA_DO_LIMITE"

    if risco == "MEDIO":
        return "ATENCAO"

    return "NORMAL"


def calcular_categorias(
    lancamentos,
    lancamentos_alvo_atual,
    historico,
    data_inicio_alvo,
    data_fim_alvo,
    janela_recorrencias_inicio,
    orcamentos_categoria,
    receita_projetada,
    despesa_projetada,
    periodo_passado,
):
    despesas = lancamentos[lancamentos["tipo"] == TIPO_DESPESA].copy()
    despesas_alvo = lancamentos_alvo_atual[
        lancamentos_alvo_atual["tipo"] == TIPO_DESPESA
    ].copy()
    recorrencias = projetar_recorrencias(
        lancamentos,
        janela_recorrencias_inicio,
        data_fim_alvo,
    )

    ids_categorias = set(orcamentos_categoria.keys())

    if not despesas.empty:
        ids_categorias.update(despesas["idCategoria"].dropna().unique().tolist())

    categorias = []

    for id_categoria in ids_categorias:
        historico_categoria = []

        for mes in historico:
            mes_inicio = datetime.strptime(f"{mes['mes']}-01", "%Y-%m-%d")
            mes_fim = adicionar_meses(mes_inicio, 1)
            despesas_mes = filtrar_periodo(despesas, mes_inicio, mes_fim)
            total_mes = despesas_mes.loc[
                despesas_mes["idCategoria"] == id_categoria,
                "valor",
            ].sum()
            historico_categoria.append(float(total_mes or 0))

        media_historica = (
            sum(historico_categoria) / len(historico_categoria)
            if historico_categoria
            else 0
        )

        despesas_categoria_alvo = despesas_alvo[
            despesas_alvo["idCategoria"] == id_categoria
        ]
        total_atual = float(despesas_categoria_alvo["valor"].sum())
        recorrencia_categoria = recorrencias["categorias"].get(id_categoria, 0)

        if periodo_passado:
            projecao = total_atual
        else:
            projecao = max(total_atual + recorrencia_categoria, media_historica)

        nome = None

        if not despesas_categoria_alvo.empty:
            nome = despesas_categoria_alvo.iloc[0]["categoria_nome"]
        elif not despesas[despesas["idCategoria"] == id_categoria].empty:
            nome = despesas[despesas["idCategoria"] == id_categoria].iloc[-1][
                "categoria_nome"
            ]

        limite = float(orcamentos_categoria.get(id_categoria, 0))
        percentual_renda = dividir_seguro(projecao, receita_projetada) * 100
        percentual_orcamento = dividir_seguro(projecao, limite) * 100
        percentual_despesas = dividir_seguro(projecao, despesa_projetada) * 100
        tendencia = calcular_tendencia(
            projecao,
            media_historica,
            nome or "Categoria",
            "despesas",
        )
        risco = obter_severidade_categoria(
            percentual_orcamento,
            percentual_renda,
            tendencia,
        )
        status = obter_status_categoria(percentual_orcamento, risco)

        if total_atual <= 0 and projecao <= 0 and limite <= 0:
            continue

        categorias.append(
            {
                "idCategoria": id_categoria,
                "nome": nome or "Categoria",
                "total": arredondar(total_atual),
                "mediaHistorica": arredondar(media_historica),
                "projecaoFutura": arredondar(projecao),
                "percentual": arredondar(percentual_despesas),
                "percentualRenda": arredondar(percentual_renda),
                "limite": arredondar(limite),
                "percentualOrcamento": arredondar(percentual_orcamento),
                "tendencia": tendencia,
                "status": status,
                "risco": risco,
                "acimaDaMediaHistorica": projecao > media_historica * 1.2
                if media_historica > 0
                else projecao > 0,
            }
        )

    return sorted(
        categorias,
        key=lambda categoria: categoria["projecaoFutura"],
        reverse=True,
    )


def gerar_alertas(
    saldo_projetado,
    receita_projetada,
    despesa_projetada,
    economia_projetada,
    percentual_comprometimento,
    limite_mensal,
    tendencias,
    categorias,
    saldos_futuros,
):
    alertas = []

    if limite_mensal <= 0:
        alertas.append(
            criar_alerta(
                "AUSENCIA_ORCAMENTO",
                "MEDIA",
                "Orçamento mensal ausente",
                "Não existe orçamento geral definido para o período analisado.",
                "Defina um limite mensal para melhorar a precisão dos alertas.",
            )
        )

    if saldo_projetado < 0:
        alertas.append(
            criar_alerta(
                "SALDO_NEGATIVO",
                "ALTA",
                "Saldo negativo previsto",
                "Seu saldo projetado para este período pode ficar negativo.",
                "Reduza gastos não essenciais ou antecipe receitas planejadas.",
            )
        )

    if receita_projetada > 0 and despesa_projetada > receita_projetada:
        alertas.append(
            criar_alerta(
                "DESPESAS_ACIMA_DA_RENDA",
                "ALTA",
                "Despesas acima da renda",
                "As despesas projetadas superam as receitas previstas.",
                "Revise gastos variáveis e priorize despesas essenciais.",
            )
        )

    if (
        tendencias["tendenciaDespesas"]["direcao"] == "AUMENTO"
        and tendencias["tendenciaDespesas"]["percentual"] >= LIMIAR_CRESCIMENTO_EXCESSIVO
    ):
        alertas.append(
            criar_alerta(
                "CRESCIMENTO_EXCESSIVO_GASTOS",
                "MEDIA",
                "Gastos em forte crescimento",
                tendencias["tendenciaDespesas"]["descricao"],
                "Compare as categorias que mais cresceram e ajuste limites.",
            )
        )

    if (
        tendencias["tendenciaReceitas"]["direcao"] == "REDUCAO"
        and tendencias["tendenciaReceitas"]["percentual"] >= LIMIAR_CRESCIMENTO_EXCESSIVO
    ):
        alertas.append(
            criar_alerta(
                "REDUCAO_RECEITAS",
                "MEDIA",
                "Receitas em queda",
                tendencias["tendenciaReceitas"]["descricao"],
                "Evite assumir novas despesas fixas até recuperar a renda.",
            )
        )

    if receita_projetada > 0 and dividir_seguro(economia_projetada, receita_projetada) * 100 < LIMIAR_ECONOMIA_BAIXA:
        alertas.append(
            criar_alerta(
                "BAIXA_CAPACIDADE_ECONOMIA",
                "MEDIA",
                "Baixa capacidade de economia",
                "A economia projetada está abaixo do nível saudável para o mês.",
                "Reserve uma parte da renda antes de novos gastos variáveis.",
            )
        )

    for categoria in categorias:
        if categoria["percentualOrcamento"] >= 100:
            alertas.append(
                criar_alerta(
                    f"CATEGORIA_ACIMA_ORCAMENTO_{categoria['idCategoria']}",
                    "ALTA",
                    f"{categoria['nome']} acima do orçamento",
                    "A projeção da categoria ultrapassa o limite definido.",
                    "Reduza novas despesas nessa categoria ou ajuste o orçamento.",
                )
            )
        elif categoria["percentualOrcamento"] >= LIMIAR_CATEGORIA_PROXIMA_LIMITE:
            alertas.append(
                criar_alerta(
                    f"CATEGORIA_PROXIMA_LIMITE_{categoria['idCategoria']}",
                    "MEDIA",
                    f"{categoria['nome']} próxima do limite",
                    "A categoria está se aproximando do orçamento previsto.",
                    "Acompanhe novos lançamentos dessa categoria com atenção.",
                )
            )

    if any(valor < 0 for valor in saldos_futuros.values()):
        alertas.append(
            criar_alerta(
                "RISCO_FINANCEIRO_FUTURO",
                "ALTA",
                "Risco financeiro futuro",
                "Uma das projeções de saldo para os próximos meses fica negativa.",
                "Planeje cortes recorrentes antes que o saldo seja comprometido.",
            )
        )

    severidade_ordem = {"ALTA": 0, "MEDIA": 1, "BAIXA": 2}
    alertas.sort(key=lambda alerta: severidade_ordem.get(alerta["severidade"], 3))

    return alertas


def calcular_confiabilidade(historico, lancamentos, recorrencias, limite_mensal):
    meses_com_dados = sum(
        1 for mes in historico if float(mes["receitas"]) > 0 or float(mes["despesas"]) > 0
    )
    quantidade_lancamentos = len(lancamentos)
    historico_suficiente = meses_com_dados >= 3
    score = 20
    score += min(meses_com_dados * 10, 35)
    score += min(quantidade_lancamentos * 1.5, 25)
    score += 10 if recorrencias["quantidade"] > 0 else 0
    score += 10 if limite_mensal > 0 else 0
    score = min(round(score), 100)

    if score >= 75:
        qualidade = "ALTA"
    elif score >= 45:
        qualidade = "MEDIA"
    else:
        qualidade = "BAIXA"

    return {
        "confiabilidadeAnalise": score,
        "qualidadeDosDados": qualidade,
        "historicoSuficiente": historico_suficiente,
        "mesesComDados": meses_com_dados,
        "quantidadeLancamentos": quantidade_lancamentos,
    }


def gerar_analise_preditiva_mensal(
    id_usuario: str,
    mes: int,
    ano: int,
    data_referencia: datetime | None = None,
):
    data_inicio_alvo = inicio_mes(ano, mes)
    data_fim_alvo = fim_mes(ano, mes)
    dias_no_mes = calendar.monthrange(ano, mes)[1]
    inicio_historico, meses_historicos = obter_meses_historicos(data_inicio_alvo)
    agora = (data_referencia or datetime.now(timezone.utc)).replace(tzinfo=None)
    hoje_inicio = datetime(agora.year, agora.month, agora.day)
    amanha_inicio = hoje_inicio + timedelta(days=1)
    mes_atual_inicio = inicio_mes(agora.year, agora.month)
    analisando_mes_atual = data_inicio_alvo == mes_atual_inicio
    periodo_passado = data_fim_alvo <= mes_atual_inicio
    periodo_futuro = data_inicio_alvo > mes_atual_inicio
    limite_observado = data_fim_alvo

    if analisando_mes_atual:
        limite_observado = min(amanha_inicio, data_fim_alvo)
    elif periodo_futuro:
        limite_observado = data_inicio_alvo

    dias_considerados = max((limite_observado.date() - data_inicio_alvo.date()).days, 0)

    lancamentos = preparar_lancamentos(
        buscar_lancamentos_periodo(
            id_usuario=id_usuario,
            data_inicio=inicio_historico,
            data_fim=data_fim_alvo,
        )
    )
    orcamentos = buscar_orcamentos_mes(id_usuario=id_usuario, mes=mes, ano=ano)
    saldo_contas = buscar_saldo_contas_usuario(
        id_usuario=id_usuario,
        data_referencia=amanha_inicio,
    )

    historico = agregar_meses(lancamentos, meses_historicos)
    lancamentos_alvo_completo = filtrar_periodo(
        lancamentos,
        data_inicio_alvo,
        data_fim_alvo,
    )
    lancamentos_alvo_observado = filtrar_periodo(
        lancamentos,
        data_inicio_alvo,
        limite_observado,
    )

    receita_observada = somar_por_tipo(lancamentos_alvo_observado, TIPO_RECEITA)
    despesa_observada = somar_por_tipo(lancamentos_alvo_observado, TIPO_DESPESA)
    receita_completa = somar_por_tipo(lancamentos_alvo_completo, TIPO_RECEITA)
    despesa_completa = somar_por_tipo(lancamentos_alvo_completo, TIPO_DESPESA)
    media_receita_base = combinar_media(historico, "receitas")
    media_despesa_base = combinar_media(historico, "despesas")
    data_inicio_recorrencias = (
        data_fim_alvo if periodo_passado else max(limite_observado, data_inicio_alvo)
    )
    recorrencias_restantes = projetar_recorrencias(
        lancamentos,
        data_inicio_recorrencias,
        data_fim_alvo,
    )
    recorrencias_mes = projetar_recorrencias(
        lancamentos,
        data_inicio_alvo,
        data_fim_alvo,
    )
    dias_decorridos = max(dias_considerados, 1)
    projecao_diaria_receita = receita_observada / dias_decorridos * dias_no_mes
    projecao_diaria_despesa = despesa_observada / dias_decorridos * dias_no_mes

    if periodo_passado:
        receita_projetada = receita_completa
        despesa_projetada = despesa_completa
    elif analisando_mes_atual:
        receita_projetada = max(
            receita_observada + recorrencias_restantes["receitas"],
            (projecao_diaria_receita * 0.4) + (media_receita_base * 0.6),
            receita_observada,
        )
        despesa_projetada = max(
            despesa_observada + recorrencias_restantes["despesas"],
            (projecao_diaria_despesa * 0.4) + (media_despesa_base * 0.6),
            despesa_observada,
        )
    else:
        receita_projetada = max(
            receita_completa,
            recorrencias_mes["receitas"],
            media_receita_base,
        )
        despesa_projetada = max(
            despesa_completa,
            recorrencias_mes["despesas"],
            media_despesa_base,
        )

    saldo_mes_projetado = receita_projetada - despesa_projetada
    economia_projetada = max(saldo_mes_projetado, 0)
    percentual_comprometimento = dividir_seguro(despesa_projetada, receita_projetada) * 100
    limite_mensal = obter_valor_orcamento_geral(orcamentos)
    orcamentos_categoria = obter_orcamentos_por_categoria(orcamentos)
    percentual_atual = dividir_seguro(despesa_observada, limite_mensal) * 100
    percentual_projetado = dividir_seguro(despesa_projetada, limite_mensal) * 100
    status_orcamento = obter_status_orcamento(percentual_projetado, limite_mensal)
    media_diaria_despesa = dividir_seguro(despesa_observada, dias_considerados)

    tendencias = {
        "tendenciaReceitas": calcular_tendencia(
            receita_projetada,
            media_mensal(historico, "receitas"),
            "Suas receitas",
            "receitas",
        ),
        "tendenciaDespesas": calcular_tendencia(
            despesa_projetada,
            media_mensal(historico, "despesas"),
            "Suas despesas",
            "despesas",
        ),
        "tendenciaSaldo": calcular_tendencia(
            saldo_mes_projetado,
            media_mensal(historico, "saldo"),
            "Seu saldo",
            "saldo",
        ),
    }

    if tendencias["tendenciaSaldo"]["direcao"] == "MELHORA":
        tendencia_geral = "MELHORA"
        descricao_geral = "A projeção indica melhora financeira no período."
    elif tendencias["tendenciaSaldo"]["direcao"] == "PIORA":
        tendencia_geral = "PIORA"
        descricao_geral = "A projeção indica piora financeira no período."
    else:
        tendencia_geral = "ESTABILIDADE"
        descricao_geral = "A projeção indica estabilidade financeira no período."

    tendencias["tendenciaGeral"] = {
        "direcao": tendencia_geral,
        "percentual": tendencias["tendenciaSaldo"]["percentual"],
        "descricao": descricao_geral,
    }

    categorias = calcular_categorias(
        lancamentos=lancamentos,
        lancamentos_alvo_atual=lancamentos_alvo_observado,
        historico=historico,
        data_inicio_alvo=data_inicio_alvo,
        data_fim_alvo=data_fim_alvo,
        janela_recorrencias_inicio=data_inicio_recorrencias,
        orcamentos_categoria=orcamentos_categoria,
        receita_projetada=receita_projetada,
        despesa_projetada=despesa_projetada,
        periodo_passado=periodo_passado,
    )

    saldo_inicial_contas = 0
    movimentacao_contas = 0
    contas_ativas = 0

    if not saldo_contas.empty:
        saldo_inicial_contas = float(saldo_contas.iloc[0]["saldoInicial"] or 0)
        movimentacao_contas = float(saldo_contas.iloc[0]["movimentacao"] or 0)
        contas_ativas = int(saldo_contas.iloc[0]["contasAtivas"] or 0)

    saldo_atual = saldo_inicial_contas + movimentacao_contas
    saldo_projetado = saldo_atual + (
        (receita_projetada - receita_observada)
        - (despesa_projetada - despesa_observada)
    )
    saldo_diario_projetado = dividir_seguro(saldo_mes_projetado, dias_no_mes)
    saldos_futuros = {
        "saldoPrevisto30Dias": saldo_atual + (saldo_diario_projetado * 30),
        "saldoPrevisto60Dias": saldo_atual + (saldo_diario_projetado * 60),
        "saldoPrevisto90Dias": saldo_atual + (saldo_diario_projetado * 90),
    }

    alertas = gerar_alertas(
        saldo_projetado=saldo_projetado,
        receita_projetada=receita_projetada,
        despesa_projetada=despesa_projetada,
        economia_projetada=economia_projetada,
        percentual_comprometimento=percentual_comprometimento,
        limite_mensal=limite_mensal,
        tendencias=tendencias,
        categorias=categorias,
        saldos_futuros=saldos_futuros,
    )
    confiabilidade = calcular_confiabilidade(
        historico=historico,
        lancamentos=lancamentos,
        recorrencias=recorrencias_mes,
        limite_mensal=limite_mensal,
    )

    if any(alerta["severidade"] == "ALTA" for alerta in alertas):
        status_orcamento = {
            "status": "RISCO",
            "mensagem": "Existem alertas financeiros de alta severidade para este período.",
        }
    elif any(alerta["severidade"] == "MEDIA" for alerta in alertas):
        status_orcamento = {
            "status": "ATENCAO",
            "mensagem": "Existem pontos de atenção na sua projeção financeira.",
        }

    categoria_maior_gasto = categorias[0] if categorias else None
    categorias_criticas = [
        categoria for categoria in categorias if categoria["risco"] in {"ALTO", "MEDIO"}
    ]
    categorias_mais_cresceram = sorted(
        categorias,
        key=lambda categoria: categoria["tendencia"]["percentual"]
        if categoria["tendencia"]["direcao"] == "AUMENTO"
        else 0,
        reverse=True,
    )[:3]

    return {
        "periodo": {
            "mes": mes,
            "ano": ano,
            "diasNoMes": dias_no_mes,
            "diasConsiderados": dias_considerados,
            "tipoPeriodo": "ATUAL"
            if analisando_mes_atual
            else "FUTURO"
            if periodo_futuro
            else "PASSADO",
            "historicoMeses": HISTORICO_MESES,
        },
        "resumo": {
            "totalGastoAtual": arredondar(despesa_observada),
            "totalReceitaAtual": arredondar(receita_observada),
            "mediaDiaria": arredondar(media_diaria_despesa),
            "projecaoGastoMensal": arredondar(despesa_projetada),
            "receitaProjetada": arredondar(receita_projetada),
            "despesaProjetada": arredondar(despesa_projetada),
            "saldoProjetado": arredondar(saldo_mes_projetado),
            "economiaProjetada": arredondar(economia_projetada),
            "percentualComprometimentoRenda": arredondar(percentual_comprometimento),
        },
        "projecoes": {
            "receitaProjetada": arredondar(receita_projetada),
            "despesaProjetada": arredondar(despesa_projetada),
            "saldoProjetado": arredondar(saldo_mes_projetado),
            "economiaProjetada": arredondar(economia_projetada),
            "percentualComprometimentoRenda": arredondar(percentual_comprometimento),
            "receitasRecorrentes": arredondar(recorrencias_mes["receitas"]),
            "despesasRecorrentes": arredondar(recorrencias_mes["despesas"]),
        },
        "saldo": {
            "saldoAtual": arredondar(saldo_atual),
            "saldoProjetado": arredondar(saldo_projetado),
            "saldoPrevisto30Dias": arredondar(saldos_futuros["saldoPrevisto30Dias"]),
            "saldoPrevisto60Dias": arredondar(saldos_futuros["saldoPrevisto60Dias"]),
            "saldoPrevisto90Dias": arredondar(saldos_futuros["saldoPrevisto90Dias"]),
            "saldoInicialContas": arredondar(saldo_inicial_contas),
            "movimentacaoContas": arredondar(movimentacao_contas),
            "contasAtivas": contas_ativas,
        },
        "orcamento": {
            "limiteMensal": arredondar(limite_mensal),
            "percentualAtual": arredondar(percentual_atual),
            "percentualProjetado": arredondar(percentual_projetado),
            "status": status_orcamento["status"],
            "mensagem": status_orcamento["mensagem"],
            "semOrcamento": limite_mensal <= 0,
        },
        "categorias": categorias,
        "tendencias": tendencias,
        "alertas": alertas,
        "confiabilidade": confiabilidade,
        "historico": {
            "meses": historico,
            "mediaReceitas": arredondar(media_mensal(historico, "receitas")),
            "mediaDespesas": arredondar(media_mensal(historico, "despesas")),
            "mediaSaldo": arredondar(media_mensal(historico, "saldo")),
        },
        "insights": {
            "categoriaMaiorGasto": categoria_maior_gasto,
            "categoriasCriticas": categorias_criticas[:5],
            "categoriasMaisCresceram": categorias_mais_cresceram,
            "dadosInsuficientes": not confiabilidade["historicoSuficiente"],
        },
    }
