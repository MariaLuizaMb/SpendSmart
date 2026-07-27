import os

from fastapi import FastAPI, HTTPException, Security
from fastapi.security import APIKeyHeader

from app.schemas.predictive_schema import MonthlyPredictiveRequest
from app.services.predictive_service import gerar_analise_preditiva_mensal

app = FastAPI(title="SpendSmart Analytics API")

api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)


def verificar_api_key(api_key: str = Security(api_key_header)):
    chave_esperada = os.environ.get("ANALYTICS_API_KEY")

    if not chave_esperada:
        # Sem chave configurada no ambiente: bloqueia por segurança
        raise HTTPException(status_code=503, detail="Serviço não configurado.")

    if api_key != chave_esperada:
        raise HTTPException(status_code=401, detail="Chave de API inválida.")

    return True


@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/analytics/predict/monthly")
def predict_monthly(payload: MonthlyPredictiveRequest):
    try:
        return gerar_analise_preditiva_mensal(
            id_usuario=payload.idUsuario,
            mes=payload.mes,
            ano=payload.ano,
        )
    except RuntimeError as error:
        raise HTTPException(status_code=500, detail=str(error)) from error
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail="Não foi possível gerar a análise preditiva.",
        ) from error
