export interface BusinessInput {
  rd_spend: number;
  administration: number;
  marketing_spend: number;
  revenue: number;
  cost: number;
  target_profit: number;
  target_months: number;
  current_cash: number;
}

export interface BusinessAnalysis {
  predicted_profit: number;
  profit_percentage: number;
  breakeven_status: string;
  health_score: number;
  goal_achievable: boolean;
  cash_burn_warning: string;
  feature_importance: {
    [key: string]: number;
  };
}