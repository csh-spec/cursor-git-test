import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';

interface SalesCardProps {
  title: string;
  amount: number;
  count: number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  onClick?: () => void;
}

export const SalesCard: React.FC<SalesCardProps> = ({
  title,
  amount,
  count,
  icon,
  trend,
  onClick
}) => {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${onClick ? 'hover:scale-105' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(amount)}</p>
            <p className="text-sm text-gray-500">{count}건</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-blue-600 mb-2">{icon}</div>
            {trend && (
              <div className={`text-sm flex items-center ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <span className="mr-1">
                  {trend.isPositive ? '↗' : '↘'}
                </span>
                {Math.abs(trend.value)}%
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
