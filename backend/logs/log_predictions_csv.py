import csv
import os
from datetime import datetime

def log_prediction(input_data, output_data):
    log_dir = "backend/logs"
    log_file = os.path.join(log_dir, "prediction_logs.csv")

    os.makedirs(log_dir, exist_ok=True)

    write_header = not os.path.exists(log_file)
    with open(log_file, mode="a", newline="") as file:
        writer = csv.writer(file)
        if write_header:
            writer.writerow([
                "timestamp", "rd_spend", "administration", "marketing_spend",
                "revenue", "cost", "target_profit", "target_months", "current_cash",
                "predicted_profit", "profit_percentage", "breakeven_status",
                "health_score", "goal_achievable", "cash_burn_warning"
            ])

        writer.writerow([
            datetime.now().isoformat(),
            input_data.rd_spend,
            input_data.administration,
            input_data.marketing_spend,
            input_data.revenue,
            input_data.cost,
            input_data.target_profit,
            input_data.target_months,
            input_data.current_cash,
            output_data["predicted_profit"],
            output_data["profit_percentage"],
            output_data["breakeven_status"],
            output_data["health_score"],
            output_data["goal_achievable"],
            output_data["cash_burn_warning"]
        ])