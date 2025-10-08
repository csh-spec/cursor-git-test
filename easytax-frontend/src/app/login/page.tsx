'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function LoginPage() {
  const handleKakaoLogin = () => {
    // TODO: 카카오 로그인 API 연동
    console.log('카카오 로그인 시도');
    // 임시로 대시보드로 이동
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 로고 및 제목 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">간편신고</h1>
          <p className="text-gray-600">자영업자를 위한 스마트 부가세 신고</p>
        </div>

        {/* 로그인 카드 */}
        <Card className="shadow-xl">
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* 서비스 소개 */}
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">간편하게 시작하세요</h2>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>카카오 로그인으로 간편 인증</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>홈택스 자동 연동</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>매출 데이터 자동 수집</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>전자신고 자동 진행</span>
                  </div>
                </div>
              </div>

              {/* 카카오 로그인 버튼 */}
              <Button
                onClick={handleKakaoLogin}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-4 text-lg"
                size="lg"
              >
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11L6.5 21.5c-1.364-1.258-2.25-3.05-2.25-5.165C4.25 6.664 8.951 3 12 3Z"/>
                </svg>
                카카오로 시작하기
              </Button>

              {/* 약관 링크 */}
              <div className="text-center text-xs text-gray-500 space-y-1">
                <p>
                  로그인 시 <a href="#" className="text-blue-600 hover:underline">서비스 이용약관</a> 및{' '}
                  <a href="#" className="text-blue-600 hover:underline">개인정보 처리방침</a>에 동의하게 됩니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 하단 정보 */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>안전하고 간편한 부가세 신고 서비스</p>
          <p className="mt-1">문의: support@easytax.co.kr</p>
        </div>
      </div>
    </div>
  );
}
