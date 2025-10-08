'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDateShort } from '@/lib/utils';

// 임시 데이터
const mockTransactionData = {
  tax_invoice: [
    { id: '1', date: '2024-03-15', customer: 'ABC회사', amount: 1200000, vat: 120000, status: 'confirmed' },
    { id: '2', date: '2024-03-13', customer: 'DEF기업', amount: 2100000, vat: 210000, status: 'confirmed' },
    { id: '3', date: '2024-03-11', customer: 'JKL업체', amount: 1500000, vat: 150000, status: 'pending' },
    { id: '4', date: '2024-03-10', customer: 'MNO회사', amount: 800000, vat: 80000, status: 'confirmed' },
    { id: '5', date: '2024-03-08', customer: 'PQR상사', amount: 3200000, vat: 320000, status: 'confirmed' },
    { id: '6', date: '2024-03-07', customer: 'STU기업', amount: 950000, vat: 95000, status: 'confirmed' },
    { id: '7', date: '2024-03-05', customer: 'VWX회사', amount: 1750000, vat: 175000, status: 'confirmed' },
    { id: '8', date: '2024-03-03', customer: 'YZA상사', amount: 1100000, vat: 110000, status: 'confirmed' }
  ],
  card_sales: [
    { id: '1', date: '2024-03-14', customer: 'XYZ상점', amount: 850000, vat: 85000, status: 'confirmed' },
    { id: '2', date: '2024-03-12', customer: 'GHI매장', amount: 650000, vat: 65000, status: 'pending' },
    { id: '3', date: '2024-03-11', customer: 'BCD카페', amount: 420000, vat: 42000, status: 'confirmed' },
    { id: '4', date: '2024-03-09', customer: 'EFG편의점', amount: 380000, vat: 38000, status: 'confirmed' },
    { id: '5', date: '2024-03-08', customer: 'HIJ식당', amount: 720000, vat: 72000, status: 'confirmed' },
    { id: '6', date: '2024-03-06', customer: 'KLM마트', amount: 590000, vat: 59000, status: 'confirmed' },
    { id: '7', date: '2024-03-04', customer: 'NOP약국', amount: 310000, vat: 31000, status: 'confirmed' },
    { id: '8', date: '2024-03-02', customer: 'QRS주유소', amount: 485000, vat: 48500, status: 'confirmed' }
  ],
  others: []
};

export default function DetailsPage() {
  const params = useParams();
  const type = params.type as string;
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getTypeInfo = (type: string) => {
    switch (type) {
      case 'tax_invoice':
        return {
          title: '세금계산서',
          icon: '📋',
          description: '발행된 세금계산서 내역입니다'
        };
      case 'card_sales':
        return {
          title: '카드매출',
          icon: '💳',
          description: '카드 결제 매출 내역입니다'
        };
      case 'others':
        return {
          title: '기타매출',
          icon: '📄',
          description: '기타 매출 내역입니다'
        };
      default:
        return {
          title: '매출내역',
          icon: '💰',
          description: '매출 내역입니다'
        };
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

  const typeInfo = getTypeInfo(type);
  const transactions = mockTransactionData[type as keyof typeof mockTransactionData] || [];
  
  // 검색 필터링
  const filteredTransactions = transactions.filter(transaction =>
    transaction.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 페이지네이션
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  // 통계 계산
  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalVat = filteredTransactions.reduce((sum, t) => sum + t.vat, 0);
  const confirmedCount = filteredTransactions.filter(t => t.status === 'confirmed').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.history.back()}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                뒤로가기
              </Button>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{typeInfo.icon}</span>
                <h1 className="text-xl font-semibold text-gray-900">{typeInfo.title} 상세내역</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                🔍 검색
              </Button>
              <Button variant="ghost" size="sm">
                📅 필터
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 요약 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {filteredTransactions.length}
              </div>
              <div className="text-sm text-gray-600">총 건수</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {formatCurrency(totalAmount)}
              </div>
              <div className="text-sm text-gray-600">총 매출액</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {formatCurrency(totalVat)}
              </div>
              <div className="text-sm text-gray-600">부가세</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {confirmedCount}
              </div>
              <div className="text-sm text-gray-600">확인완료</div>
            </CardContent>
          </Card>
        </div>

        {/* 검색 및 필터 */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="거래처명으로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">전체</Button>
                <Button variant="outline">확인완료</Button>
                <Button variant="outline">미확인</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 거래 내역 테이블 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">거래 내역</h3>
              <div className="text-sm text-gray-500">
                {filteredTransactions.length}건 중 {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredTransactions.length)}건 표시
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {paginatedTransactions.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">날짜</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">거래처명</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-700">매출액</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-700">부가세</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-700">상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4 text-sm text-gray-900">
                            {formatDateShort(transaction.date)}
                          </td>
                          <td className="py-4 px-4 text-sm font-medium text-gray-900">
                            {transaction.customer}
                          </td>
                          <td className="py-4 px-4 text-sm text-right font-medium text-gray-900">
                            {formatCurrency(transaction.amount)}
                          </td>
                          <td className="py-4 px-4 text-sm text-right text-gray-600">
                            {formatCurrency(transaction.vat)}
                          </td>
                          <td className="py-4 px-4 text-center">
                            {getStatusBadge(transaction.status)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 페이지네이션 */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-gray-700">
                      페이지 {currentPage} / {totalPages}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                      >
                        이전
                      </Button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={page === currentPage ? "primary" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                      >
                        다음
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">{typeInfo.icon}</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">거래 내역이 없습니다</h3>
                <p className="text-gray-500">{typeInfo.description}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
