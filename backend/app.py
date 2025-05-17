from fastapi import FastAPI
from pydantic import BaseModel
from joblib import load
import pandas as pd

app = FastAPI()

# Load the trained Kaggle model
model = load("model/profit_model.pkl")  

# Input model: includes ML inputs + business logic inputs
class InputData(BaseModel):
    rd_spend: float
    administration: float
    marketing_spend: float
    revenue: float
    cost: float
    target_profit: float
    target_months: int
    current_cash: float

@app.post("/analyze_business")
def analyze_business(data: InputData):
    # ML Prediction
    input_df = pd.DataFrame([{
        "R&D Spend": data.rd_spend,
        "Administration": data.administration,
        "Marketing Spend": data.marketing_spend
    }])
    predicted_profit = float(model.predict(input_df)[0])

    # Profit percentage
    profit_percentage = (predicted_profit / data.revenue) * 100 if data.revenue != 0 else 0

    # Breakeven status
    if predicted_profit > 0:
        breakeven_status = "Profit"
    elif predicted_profit < 0:
        breakeven_status = "Loss"
    else:
        breakeven_status = "Break-even"

    # Health score (simple logic)
    if profit_percentage >= 30:
        health_score = 90
    elif profit_percentage >= 20:
        health_score = 75
    elif profit_percentage >= 10:
        health_score = 60
    else:
        health_score = 40

    # Goal planner
    growth_rate = 0.05  # 5% per month
    future_profit = predicted_profit
    for _ in range(data.target_months):
        future_profit *= (1 + growth_rate)

    goal_achievable = bool(future_profit >= data.target_profit)

    # Burn rate logic
    burn_rate = data.cost - data.revenue
    if burn_rate > 0:
        months_until_cashout = data.current_cash / burn_rate
        cash_burn_warning = f"Warning: You will run out of cash in {months_until_cashout:.1f} months."
    else:
        cash_burn_warning = "No burn: You are in profit or break-even."

    return {
        "predicted_profit": round(predicted_profit, 2),
        "profit_percentage": round(profit_percentage, 2),
        "breakeven_status": breakeven_status,
        "health_score": health_score,
        "goal_achievable": goal_achievable,
        "cash_burn_warning": cash_burn_warning
    }
