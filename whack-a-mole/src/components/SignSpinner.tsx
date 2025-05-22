import React from 'react';
import type { FallbackProps } from './ErrorBoundary'; // ErrorBoundary에서 정의한 FallbackProps 타입을 가져옴

/**
 * SignSpinner 컴포넌트: ErrorBoundary를 위한 기본 fallback UI.
 * 에러 아이콘, 에러 제목, 상세 에러 메시지, 그리고 재시도 버튼을 표시함.
 * @param error 발생한 에러 객체
 * @param resetErrorBoundary ErrorBoundary의 에러 상태를 초기화하는 함수
 */
const SignSpinner: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div
      className="flex flex-col items-center justify-center p-6 bg-red-100 border border-red-300 rounded-lg shadow-md"
      role="alert" // 접근성을 위해 alert 역할을 명시함
    >
      {/* 에러 아이콘 (간단한 SVG 예시) */}
      <div className="w-12 h-12 mb-4 text-red-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-full h-full"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      </div>

      {/* 에러 제목 */}
      <h2 className="mb-2 text-2xl font-semibold text-red-700">
        문제가 발생했습니다
      </h2>

      {/* 상세 에러 메시지 */}
      {error?.message && (
        <p className="mb-4 text-sm text-red-600">
          {error.message}
        </p>
      )}

      {/* 재시도 버튼 */}
      <button
        type="button"
        onClick={resetErrorBoundary} // 클릭 시 ErrorBoundary의 reset 함수를 호출함
        className="px-4 py-2 font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
      >
        다시 시도
      </button>
    </div>
  );
};

export default SignSpinner; 