from pydantic import BaseModel, Field


class MonthlyPredictiveRequest(BaseModel):
    idUsuario: str = Field(..., min_length=1)
    mes: int = Field(..., ge=1, le=12)
    ano: int = Field(..., ge=1900, le=9999)
