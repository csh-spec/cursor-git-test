'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SalesCard } from '@/components/dashboard/SalesCard';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { formatCurrency } from '@/lib/utils';

// 임시 데이터
const mockData = {
  user: {
    name: '김사업자',
    businessName: '김사업자님의 사업체'
  },
  salesSummary: {
    total: 12345678,
    taxInvoice: 8500000,
    cardSales: 3845678,
    others: 0,
    totalCount: 225
  },
  salesBreakdown: {
    taxInvoice: {
      amount: 8500000,
      count: 69,
      trend: { value: 5.2, isPositive: true }
    },
    cardSales: {
      amount: 3845678,
      count: 156,
      trend: { value: 2.1, isPositive: true }
    },
    others: {
      amount: 0,
      count: 0,
      trend: { value: 0, isPositive: true }
    }
  },
  recentTransactions: [
    {
      id: '1',
      date: '2024-03-15',
      customer: 'ABC회사',
      type: 'tax_invoice' as const,
      amount: 1200000,
      status: 'confirmed' as const
    },
    {
      id: '2',
      date: '2024-03-14',
      customer: 'XYZ상점',
      type: 'card_sales' as const,
      amount: 850000,
      status: 'confirmed' as const
    },
    {
      id: '3',
      date: '2024-03-13',
      customer: 'DEF기업',
      type: 'tax_invoice' as const,
      amount: 2100000,
      status: 'confirmed' as const
    },
    {
      id: '4',
      date: '2024-03-12',
      customer: 'GHI매장',
      type: 'card_sales' as const,
      amount: 650000,
      status: 'pending' as const
    }
  ]
};

export default function DashboardPage() {
  const handleViewDetails = (type: string) => {
    console.log(`${type} 상세보기 클릭`);
    // TODO: 상세 페이지로 이동
  };

  const handleReport = () => {
    console.log('신고하기 클릭');
    // TODO: 신고 확인 페이지로 이동
  };

  const handleViewAllTransactions = () => {
    console.log('전체 거래 내역 보기');
    // TODO: 전체 거래 내역 페이지로 이동
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h1 className="text-xl font-semibold text-gray-900">간편신고</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
                안녕하세요, <span className="font-medium">{mockData.user.name}</span>님
              </div>
              <Button variant="ghost" size="sm">
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 제목 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            📊 2024년 1분기 신고 현황
          </h2>
          <p className="text-gray-600">
            {mockData.user.businessName}의 매출 정보를 확인하고 부가세를 신고하세요.
          </p>
        </div>

        {/* 총 매출액 카드 */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium mb-2">💰 총 매출액</h3>
                <p className="text-4xl font-bold mb-2">
                  {formatCurrency(mockData.salesSummary.total)}
                </p>
                <p className="text-blue-100">
                  (+5.2% 전분기 대비) • 총 {mockData.salesSummary.totalCount}건
                </p>
              </div>
              <div className="text-blue-200">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 매출 유형별 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SalesCard
            title="📋 세금계산서"
            amount={mockData.salesBreakdown.taxInvoice.amount}
            count={mockData.salesBreakdown.taxInvoice.count}
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
            trend={mockData.salesBreakdown.taxInvoice.trend}
            onClick={() => handleViewDetails('tax_invoice')}
          />
          <SalesCard
            title="💳 카드매출"
            amount={mockData.salesBreakdown.cardSales.amount}
            count={mockData.salesBreakdown.cardSales.count}
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            }
            trend={mockData.salesBreakdown.cardSales.trend}
            onClick={() => handleViewDetails('card_sales')}
          />
          <SalesCard
            title="📄 기타매출"
            amount={mockData.salesBreakdown.others.amount}
            count={mockData.salesBreakdown.others.count}
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
            trend={mockData.salesBreakdown.others.trend}
            onClick={() => handleViewDetails('others')}
          />
        </div>

        {/* 최근 거래 현황과 신고하기 버튼 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RecentTransactions
              transactions={mockData.recentTransactions}
              onViewAll={handleViewAllTransactions}
            />
          </div>
          <div className="space-y-6">
            {/* 신고하기 카드 */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <svg className="w-12 h-12 text-green-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">신고 준비 완료</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    모든 매출 데이터가 수집되었습니다.<br />
                    지금 바로 신고하세요!
                  </p>
                </div>
                <Button
                  onClick={handleReport}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                  size="lg"
                >
                  📝 신고하기
                </Button>
                <p className="text-xs text-gray-500 mt-3">
                  💡 신고 마감일까지 15일 남았습니다
                </p>
              </CardContent>
            </Card>

            {/* 도움말 카드 */}
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-900 mb-3">💡 도움말</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• 각 카드를 클릭하면 상세 내역을 확인할 수 있습니다</p>
                  <p>• 신고 전 모든 데이터를 다시 한번 확인해주세요</p>
                  <p>• 문의사항이 있으시면 고객센터로 연락해주세요</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
