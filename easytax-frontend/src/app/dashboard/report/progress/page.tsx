'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';

interface ProgressStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'error';
  duration?: number;
}

export default function ReportProgressPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const steps: ProgressStep[] = [
    {
      id: 'validate',
      title: '데이터 검증',
      description: '신고 데이터의 정확성을 확인합니다',
      status: 'in_progress',
      duration: 2000
    },
    {
      id: 'hometax_connect',
      title: '홈택스 연동',
      description: '홈택스 시스템에 연결합니다',
      status: 'pending',
      duration: 3000
    },
    {
      id: 'submit',
      title: '전자신고 제출',
      description: '부가세 신고서를 제출합니다',
      status: 'pending',
      duration: 4000
    },
    {
      id: 'confirm',
      title: '신고 완료',
      description: '신고가 성공적으로 완료되었습니다',
      status: 'pending',
      duration: 1000
    }
  ];

  useEffect(() => {
    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        // 현재 단계 완료 처리
        setCurrentStep(stepIndex);
        
        // 마지막 단계가 아니면 다음 단계로
        if (stepIndex < steps.length - 1) {
          setTimeout(() => {
            stepIndex++;
          }, steps[stepIndex].duration);
        } else {
          // 모든 단계 완료
          setTimeout(() => {
            setIsCompleted(true);
            clearInterval(interval);
          }, steps[stepIndex].duration);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const getStepStatus = (stepIndex: number): ProgressStep['status'] => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'in_progress';
    return 'pending';
  };

  const getStepIcon = (status: ProgressStep['status']) => {
    switch (status) {
      case 'completed':
        return (
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'in_progress':
        return (
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        );
      case 'error':
        return (
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          </div>
        );
    }
  };

  const handleGoToDashboard = () => {
    window.location.href = '/dashboard';
  };

  const handleDownloadReport = () => {
    // TODO: 신고서 다운로드 기능
    alert('신고서 다운로드 기능은 준비 중입니다.');
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">신고 완료! 🎉</h1>
              <p className="text-lg text-gray-600 mb-6">
                2024년 1분기 부가세 신고가 성공적으로 완료되었습니다.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-green-900 mb-3">신고 정보</h3>
              <div className="text-left space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">신고 기간:</span>
                  <span className="text-green-900 font-medium">2024년 1분기</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">총 매출액:</span>
                  <span className="text-green-900 font-medium">{formatCurrency(12345678)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">부가세:</span>
                  <span className="text-green-900 font-medium">{formatCurrency(1234568)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">신고 번호:</span>
                  <span className="text-green-900 font-medium">VAT2024010001234</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleDownloadReport}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                📄 신고서 다운로드
              </Button>
              <Button
                onClick={handleGoToDashboard}
                variant="outline"
                className="w-full"
                size="lg"
              >
                대시보드로 돌아가기
              </Button>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              <p>💡 신고서는 이메일로도 발송되었습니다.</p>
              <p>문의사항이 있으시면 고객센터로 연락해주세요.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                <span className="text-2xl">⚡</span>
                <h1 className="text-xl font-semibold text-gray-900">신고 진행 중</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              부가세 신고 진행 중
            </h2>
            <p className="text-gray-600 text-center">
              잠시만 기다려주세요. 신고가 자동으로 진행되고 있습니다.
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {steps.map((step, index) => {
                const status = getStepStatus(index);
                return (
                  <div key={step.id} className="flex items-start space-x-4">
                    {getStepIcon(status)}
                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        status === 'completed' ? 'text-green-600' :
                        status === 'in_progress' ? 'text-blue-600' :
                        status === 'error' ? 'text-red-600' :
                        'text-gray-500'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {step.description}
                      </p>
                      {status === 'in_progress' && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-blue-800">
                  <strong>참고:</strong> 신고 진행 중에는 페이지를 닫지 마세요. 
                  자동으로 홈택스에 신고가 제출됩니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
