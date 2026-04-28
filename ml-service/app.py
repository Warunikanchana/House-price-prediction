from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import joblib
import pandas as pd
import numpy as np

app = FastAPI(title="House Price Prediction API")

# Load models once at startup
try:
    base_model = joblib.load("hybrid_base_pipe.pkl")
    resid_model = joblib.load("hybrid_resid_pipe.pkl")
    metadata = joblib.load("model_metadata.pkl")

    print("Base model loaded successfully")
    print("Residual model loaded successfully")
    print("Metadata loaded successfully")
    print("Metadata:", metadata)

except Exception as e:
    raise RuntimeError(f"Failed to load model files: {e}")


class PredictionRequest(BaseModel):
    district: str = Field(..., min_length=1, example="Colombo")
    city: str = Field(..., min_length=1, example="Colombo 5")
    bedrooms: int = Field(..., gt=0, le=20, example=3)
    bathrooms: int = Field(..., gt=0, le=20, example=2)
    house_size: float = Field(..., gt=0, example=1800)
    land_size: float = Field(..., gt=0, example=10)


@app.get("/")
def home():
    return {"message": "House Price Prediction API is running"}


@app.post("/predict")
def predict_price(request: PredictionRequest):
    try:
        input_df = pd.DataFrame([{
            "District": request.district,
            "city": request.city,
            "numberOfRooms": request.bedrooms,
            "numberOfBathrooms": request.bathrooms,
            "HouseSize": request.house_size,
            "LandSize": request.land_size
        }])

        expected_cols = [
            "District",
            "city",
            "numberOfRooms",
            "numberOfBathrooms",
            "HouseSize",
            "LandSize"
        ]

        if list(input_df.columns) != expected_cols:
            raise HTTPException(
             status_code=500,
             detail="Input columns do not match expected model columns"
          )

        print("Received request:", request.dict())
        print("Input dataframe:")
        print(input_df)

        pred_log = base_model.predict(input_df) + resid_model.predict(input_df)
        pred_price = np.expm1(pred_log)

        print("Log prediction:", pred_log)
        print("Final price:", pred_price)

        return {
            "success": True,
            "predicted_price": float(pred_price[0]),
            "currency": "LKR",
            "model_type": "hybrid_base_plus_residual"
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")