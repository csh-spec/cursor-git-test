'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';

// 임시 데이터
const mockReportData = {
  period: '2024년 1분기 (1월~3월)',
  deadline: '2024년 4월 25일',
  summary: {
    totalSales: 12345678,
    taxInvoice: 8500000,
    cardSales: 3845678,
    others: 0,
    totalCount: 225
  },
  breakdown: {
    taxInvoice: {
      amount: 8500000,
      count: 69
    },
    cardSales: {
      amount: 3845678,
      count: 156
    },
    others: {
      amount: 0,
      count: 0
    }
  },
  estimatedVat: 1234568,
  businessInfo: {
    name: '김사업자',
    businessNumber: '123-45-67890',
    businessName: '김사업자님의 사업체'
  }
};

export default function ReportPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSubmit = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    // TODO: 실제 신고 API 호출
    console.log('신고 제출 시작');
    
    // 시뮬레이션을 위한 지연
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmModal(false);
      // 신고 진행 페이지로 이동
      router.push('/dashboard/report/progress');
    }, 1000);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

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
                <span className="text-2xl">🎯</span>
                <h1 className="text-xl font-semibold text-gray-900">부가세 신고 최종 확인</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 신고 기간 정보 */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-blue-900 mb-2">신고 기간</h2>
                <p className="text-blue-700">{mockReportData.period}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-600 mb-1">신고 마감일</p>
                <p className="text-lg font-semibold text-blue-900">{mockReportData.deadline}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 사업자 정보 */}
        <Card className="mb-8">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">📋 사업자 정보</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">사업자명</label>
                <p className="text-gray-900">{mockReportData.businessInfo.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">사업자등록번호</label>
                <p className="text-gray-900">{mockReportData.businessInfo.businessNumber}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">사업체명</label>
                <p className="text-gray-900">{mockReportData.businessInfo.businessName}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 신고 요약 */}
        <Card className="mb-8">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">📊 신고 요약</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* 총 매출액 */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-green-900 mb-2">총 매출액</h4>
                    <p className="text-3xl font-bold text-green-700">
                      {formatCurrency(mockReportData.summary.totalSales)}
                    </p>
                    <p className="text-sm text-green-600 mt-1">총 {mockReportData.summary.totalCount}건</p>
                  </div>
                  <div className="text-green-400">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 매출 유형별 상세 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-700">📋 세금계산서</span>
                  </div>
                  <p className="text-xl font-bold text-blue-900">
                    {formatCurrency(mockReportData.breakdown.taxInvoice.amount)}
                  </p>
                  <p className="text-sm text-blue-600">{mockReportData.breakdown.taxInvoice.count}건</p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-700">💳 카드매출</span>
                  </div>
                  <p className="text-xl font-bold text-purple-900">
                    {formatCurrency(mockReportData.breakdown.cardSales.amount)}
                  </p>
                  <p className="text-sm text-purple-600">{mockReportData.breakdown.cardSales.count}건</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">📄 기타매출</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    {formatCurrency(mockReportData.breakdown.others.amount)}
                  </p>
                  <p className="text-sm text-gray-600">{mockReportData.breakdown.others.count}건</p>
                </div>
              </div>

              {/* 예상 부가세 */}
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-yellow-900 mb-2">예상 부가세</h4>
                    <p className="text-2xl font-bold text-yellow-700">
                      {formatCurrency(mockReportData.estimatedVat)}
                    </p>
                    <p className="text-sm text-yellow-600 mt-1">(총 매출액의 10%)</p>
                  </div>
                  <div className="text-yellow-400">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 주의사항 */}
        <Card className="mb-8 bg-orange-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="text-orange-500 mt-0.5">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-orange-900 mb-2">⚠️ 신고 전 확인사항</h4>
                <ul className="text-sm text-orange-800 space-y-1">
                  <li>• 신고 내용을 다시 한번 확인해주세요</li>
                  <li>• 신고 후에는 수정이 어려우니 신중히 검토해주세요</li>
                  <li>• 모든 매출 데이터가 정확하게 수집되었는지 확인해주세요</li>
                  <li>• 신고 마감일까지 여유 있게 제출해주세요</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 신고 버튼 */}
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="px-8"
          >
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            size="lg"
            className="px-8 bg-green-600 hover:bg-green-700"
          >
            신고할래요
          </Button>
        </div>

        {/* 확인 모달 */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🤔</span>
                  <h3 className="text-lg font-semibold text-gray-900">정말 신고하시겠습니까?</h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    신고를 제출하면 홈택스 전자신고가 자동으로 진행됩니다.
                    제출 후에는 수정이 어려우니 신중히 결정해주세요.
                  </p>
                  
                  {isSubmitting && (
                    <div className="flex items-center justify-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="ml-2 text-blue-600">신고 진행 중...</span>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    취소
                  </Button>
                  <Button
                    onClick={handleConfirmSubmit}
                    disabled={isSubmitting}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? '진행중...' : '신고 제출'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
