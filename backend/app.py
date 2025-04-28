from fastapi import FastAPI
from pydantic import BaseModel

# Step 1: Create FastAPI app
app = FastAPI()

# Step 2: Create input model
class InputData(BaseModel):
    revenue: float
    cost: float

# Step 3: Create /predict_profit endpoint
@app.post("/predict_profit")
def predict_profit(data: InputData):
    profit = data.revenue - data.cost
    profit_percentage = (profit / data.revenue) * 100 if data.revenue != 0 else 0
    breakeven_status = "Profit" if profit > 0 else "Loss" if profit < 0 else "Break-even"

    return {
        "profit": profit,
        "profit_percentage": profit_percentage,
        "breakeven_status": breakeven_status
    }

