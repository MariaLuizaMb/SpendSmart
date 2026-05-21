from fastapi import FastAPI, HTTPException

from app.schemas.predictive_schema import MonthlyPredictiveRequest
from app.services.predictive_service import gerar_analise_preditiva_mensal

app = FastAPI(title="SpendSmart Analytics API")


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
