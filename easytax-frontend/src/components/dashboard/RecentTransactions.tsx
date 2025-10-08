import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDateShort } from '@/lib/utils';

interface Transaction {
  id: string;
  date: string;
  customer: string;
  type: 'tax_invoice' | 'card_sales' | 'others';
  amount: number;
  status: 'confirmed' | 'pending' | 'error';
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  onViewAll?: () => void;
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
  onViewAll
}) => {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'tax_invoice':
        return '세금계산서';
      case 'card_sales':
        return '카드매출';
      case 'others':
        return '기타';
      default:
        return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="success">확인완료</Badge>;
      case 'pending':
        return <Badge variant="warning">미확인</Badge>;
      case 'error':
        return <Badge variant="error">오류</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">최근 거래 현황</h3>
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              전체보기
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{transaction.customer}</p>
                    <p className="text-xs text-gray-500">
                      {formatDateShort(transaction.date)} • {getTypeLabel(transaction.type)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-900">
                  {formatCurrency(transaction.amount)}
                </span>
                {getStatusBadge(transaction.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
