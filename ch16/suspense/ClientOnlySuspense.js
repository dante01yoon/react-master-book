import React, { Suspense, useState, useEffect } from 'react';

// React.lazy를 사용하여 MyAsyncComponent를 동적으로 임포트
// 이 컴포넌트는 클라이언트 사이드에서만 로드됨
const LazyMyAsyncComponent = React.lazy(() => import('./MyAsyncComponent'));

// 클라이언트 사이드에서만 Suspense를 사용하여 비동기 컴포넌트를 렌더링하는 예제 컴포넌트
function ClientOnlySuspense() {
  // isClient 상태는 컴포넌트가 클라이언트 환경에서 마운트되었는지 여부를 추적함
  const [isClient, setIsClient] = useState(false);

  // useEffect 훅은 컴포넌트가 클라이언트에서 마운트된 후에만 실행됨
  // 서버 사이드 렌더링 시에는 이 훅이 실행되지 않음
  useEffect(() => {
    // 이 시점에서는 window 객체가 존재하므로, 클라이언트 환경임을 확신할 수 있음
    setIsClient(true);
  }, []); // 빈 의존성 배열은 이 이펙트가 마운트 시 한 번만 실행되도록 함

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px' }}>
      <h2>클라이언트 전용 Suspense 예제</h2>
      <p>
        이 예제는 서버 사이드 렌더링 시에는 Suspense의 fallback이 즉시 보이지 않고,
        클라이언트에서 하이드레이션 후 비동기 컴포넌트가 로드될 때 fallback이 표시되거나
        (또는 isClient 상태에 따라 초기에는 아무것도 렌더링하지 않다가 클라이언트에서만 렌더링할 수도 있음)
        비동기 컴포넌트가 준비되면 해당 컴포넌트를 보여줌.
      </p>

      {/* isClient가 true일 때, 즉 클라이언트 환경일 때만 Suspense와 Lazy 컴포넌트를 렌더링 */}
      {isClient ? (
        <Suspense fallback={<div style={{ color: 'blue' }}>클라이언트에서 로딩 중... (Suspense Fallback)</div>}>
          <LazyMyAsyncComponent />
        </Suspense>
      ) : (
        // 서버 사이드 렌더링 시 또는 클라이언트에서 아직 isClient가 true가 되기 전 (초기 렌더링)
        // 이 부분은 서버에서 렌더링될 HTML에 포함될 수 있음
        // 또는, 아예 아무것도 렌더링하지 않도록 null을 반환할 수도 있음
        <div style={{ color: 'gray' }}>서버 렌더링 또는 클라이언트 초기 상태 (비동기 컴포넌트 로드 전)</div>
      )}

      {/* 
        또 다른 접근 방식 (typeof window !== 'undefined' 직접 사용):
        이는 isClient 상태를 사용하지 않고 직접 window 객체의 존재 여부를 확인하여 렌더링을 결정함.
        React 18 이전 버전의 SSR에서 Suspense의 즉각적인 fallback 렌더링을 피하고자 할 때 사용될 수 있었음.
        하지만 React 18에서는 스트리밍 SSR과 선택적 하이드레이션 덕분에 Suspense 자체의 SSR 지원이 강화됨.

        {typeof window !== 'undefined' ? (
          <Suspense fallback={<div>클라이언트에서 로딩 중...</div>}>
            <LazyMyAsyncComponent />
          </Suspense>
        ) : (
          <div>서버에서 렌더링 중 (비동기 컴포넌트는 아직)</div>
        )}
      */}
    </div>
  );
}

export default ClientOnlySuspense; 