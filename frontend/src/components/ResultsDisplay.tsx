import React from 'react';
import { BusinessAnalysis } from '../types';
import { 
  ChartBarIcon, 
  TrendingUpIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

interface ResultsDisplayProps {
  results: BusinessAnalysis;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getBreakevenStatusColor = (status: string) => {
    switch (status) {
      case 'Profit': return 'text-green-600 bg-green-100';
      case 'Loss': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center mb-4">
          <ChartBarIcon className="h-8 w-8 text-primary-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">AI Analysis Results</h2>
        </div>
        
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Predicted Profit</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(results.predicted_profit)}
                </p>
              </div>
              <CurrencyDollarIcon className="h-8 w-8 text-primary-600" />
            </div>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Profit Margin</p>
                <p className="text-2xl font-bold text-gray-900">
                  {results.profit_percentage.toFixed(1)}%
                </p>
              </div>
              <TrendingUpIcon className="h-8 w-8 text-primary-600" />
            </div>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${getBreakevenStatusColor(results.breakeven_status)}`}>
                  {results.breakeven_status}
                </span>
              </div>
              {results.breakeven_status === 'Profit' ? (
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              ) : (
                <XCircleIcon className="h-8 w-8 text-red-600" />
              )}
            </div>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Health Score</p>
                <p className="text-2xl font-bold text-gray-900">{results.health_score}/100</p>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getHealthScoreColor(results.health_score)}`}>
                <span className="text-lg font-bold">{results.health_score}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Goal Achievement */}
      <div className="card">
        <div className="flex items-center mb-4">
          <div className={`p-2 rounded-lg ${results.goal_achievable ? 'bg-green-100' : 'bg-red-100'} mr-3`}>
            {results.goal_achievable ? (
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            ) : (
              <XCircleIcon className="h-6 w-6 text-red-600" />
            )}
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Goal Achievement</h3>
        </div>
        <p className={`text-lg ${results.goal_achievable ? 'text-green-700' : 'text-red-700'}`}>
          {results.goal_achievable 
            ? '✅ Your target profit is achievable within the specified timeframe!'
            : '❌ Your target profit may not be achievable within the specified timeframe.'
          }
        </p>
      </div>

      {/* Cash Burn Warning */}
      <div className="card">
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-lg bg-yellow-100 mr-3">
            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Cash Flow Analysis</h3>
        </div>
        <p className="text-gray-700 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
          {results.cash_burn_warning}
        </p>
      </div>

      {/* Feature Importance */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Factors Impact</h3>
        <p className="text-gray-600 mb-4">These factors have the most influence on your predicted profit:</p>
        
        <div className="space-y-3">
          {Object.entries(results.feature_importance).map(([feature, importance]) => (
            <div key={feature} className="flex items-center">
              <div className="w-32 text-sm font-medium text-gray-700">{feature}</div>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-primary-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${importance * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-16 text-sm font-semibold text-gray-900 text-right">
                {(importance * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};