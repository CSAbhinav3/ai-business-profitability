import React, { useState } from 'react';
import { BusinessInput } from '../types';

interface InputFormProps {
  onSubmit: (data: BusinessInput) => void;
  loading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<BusinessInput>({
    rd_spend: 150000,
    administration: 120000,
    marketing_spend: 300000,
    revenue: 1000000,
    cost: 800000,
    target_profit: 250000,
    target_months: 6,
    current_cash: 300000,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof BusinessInput, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="card">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Data Input</h2>
        <p className="text-gray-600">Enter your business metrics to get AI-powered profitability analysis</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              R&D Spend
            </label>
            <input
              type="number"
              className="input-field"
              value={formData.rd_spend}
              onChange={(e) => handleChange('rd_spend', e.target.value)}
              placeholder="150000"
            />
            <p className="text-xs text-gray-500 mt-1">Current: {formatCurrency(formData.rd_spend)}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Administration Costs
            </label>
            <input
              type="number"
              className="input-field"
              value={formData.administration}
              onChange={(e) => handleChange('administration', e.target.value)}
              placeholder="120000"
            />
            <p className="text-xs text-gray-500 mt-1">Current: {formatCurrency(formData.administration)}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Marketing Spend
            </label>
            <input
              type="number"
              className="input-field"
              value={formData.marketing_spend}
              onChange={(e) => handleChange('marketing_spend', e.target.value)}
              placeholder="300000"
            />
            <p className="text-xs text-gray-500 mt-1">Current: {formatCurrency(formData.marketing_spend)}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Revenue
            </label>
            <input
              type="number"
              className="input-field"
              value={formData.revenue}
              onChange={(e) => handleChange('revenue', e.target.value)}
              placeholder="1000000"
            />
            <p className="text-xs text-gray-500 mt-1">Current: {formatCurrency(formData.revenue)}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Total Costs
            </label>
            <input
              type="number"
              className="input-field"
              value={formData.cost}
              onChange={(e) => handleChange('cost', e.target.value)}
              placeholder="800000"
            />
            <p className="text-xs text-gray-500 mt-1">Current: {formatCurrency(formData.cost)}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Cash
            </label>
            <input
              type="number"
              className="input-field"
              value={formData.current_cash}
              onChange={(e) => handleChange('current_cash', e.target.value)}
              placeholder="300000"
            />
            <p className="text-xs text-gray-500 mt-1">Current: {formatCurrency(formData.current_cash)}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Target Profit
            </label>
            <input
              type="number"
              className="input-field"
              value={formData.target_profit}
              onChange={(e) => handleChange('target_profit', e.target.value)}
              placeholder="250000"
            />
            <p className="text-xs text-gray-500 mt-1">Target: {formatCurrency(formData.target_profit)}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Target Timeline (Months)
            </label>
            <input
              type="number"
              className="input-field"
              value={formData.target_months}
              onChange={(e) => handleChange('target_months', e.target.value)}
              placeholder="6"
              min="1"
              max="60"
            />
            <p className="text-xs text-gray-500 mt-1">{formData.target_months} months</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`btn-primary w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Analyzing...
            </div>
          ) : (
            'Analyze Business Profitability'
          )}
        </button>
      </form>
    </div>
  );
};