import React from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <ChartBarIcon className="h-8 w-8 text-primary-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">
                AI Business Profitability Analyzer
              </h1>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Powered by Machine Learning
          </div>
        </div>
      </div>
    </header>
  );
};