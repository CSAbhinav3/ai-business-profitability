from fastapi import FastAPI
from pydantic import BaseModel
from joblib import load
import pandas as pd
import os
from .logs.log_predictions_csv import log_prediction

# Get base directory of this script
base_dir = os.path.dirname(__file__)

# Load model and feature names safely using full paths
model = load(os.path.join(base_dir, "model", "profit_model.pkl"))

with open(os.path.join(base_dir, "model", "feature_names.txt"), "r") as f:
    feature_names = f.read().split(",")

app = FastAPI()

# Input schema
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
    print("🚀 Endpoint hit!")
    # Predict profit
    input_df = pd.DataFrame([{
        "R&D Spend": data.rd_spend,
        "Administration": data.administration,
        "Marketing Spend": data.marketing_spend
    }])
    predicted_profit = float(model.predict(input_df)[0])

    # Profit percentage
    profit_percentage = (predicted_profit / data.revenue) * 100 if data.revenue else 0

    # Breakeven status
    if predicted_profit > 0:
        breakeven_status = "Profit"
    elif predicted_profit < 0:
        breakeven_status = "Loss"
    else:
        breakeven_status = "Break-even"

    # Health score
    if profit_percentage >= 30:
        health_score = 90
    elif profit_percentage >= 20:
        health_score = 75
    elif profit_percentage >= 10:
        health_score = 60
    else:
        health_score = 40

    # Goal planning
    future_profit = predicted_profit
    for _ in range(data.target_months):
        future_profit *= 1.05  # 5% growth per month

    goal_achievable = future_profit >= data.target_profit

    # Burn rate analysis
    burn_rate = data.cost - data.revenue
    cash_burn_warning = (
        f"Warning: You will run out of cash in {data.current_cash / burn_rate:.1f} months."
        if burn_rate > 0 else "No burn: You are in profit or break-even."
    )

    # Feature importance
    importances = model.feature_importances_
    sorted_importance = dict(sorted(zip(feature_names, importances), key=lambda x: x[1], reverse=True))

    result = {
        "predicted_profit": round(predicted_profit, 2),
        "profit_percentage": round(profit_percentage, 2),
        "breakeven_status": breakeven_status,
        "health_score": health_score,
        "goal_achievable": goal_achievable,
        "cash_burn_warning": cash_burn_warning,
        "feature_importance": sorted_importance
    }

    log_prediction(data, result)
    return result