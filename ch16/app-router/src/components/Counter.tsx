'use client';

import { useState } from 'react';

/**
 * 카운터 상태를 가진 클라이언트 컴포넌트
 */
export default function Counter({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  // 이 로그는 브라우저 콘솔에 출력됨
  console.log("[클라이언트 컴포넌트] Counter 렌더링됨");

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold">여기는 클라이언트 컴포넌트 영역</h2>
      <p className="mt-2">카운트: {count}</p>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        카운트 증가
      </button>

      {/* 
        자식으로 전달된 서버 컴포넌트를 렌더링함
        부모인 Counter가 리렌더링 되어도 이 부분은 리렌더링되지 않음
      */}
      {children}
    </div>
  );
} 