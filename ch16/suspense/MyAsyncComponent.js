import React from 'react';

// 비동기적으로 로드될 실제 컴포넌트
// 이 컴포넌트는 지연 로딩의 대상이 됨
function MyAsyncComponent() {
  // 실제 애플리케이션에서는 여기서 더 복잡한 UI나 로직이 포함될 수 있음
  return (
    <div style={{ padding: '20px', backgroundColor: 'lightgreen', borderRadius: '5px' }}>
      <h3>비동기 로드된 컴포넌트</h3>
      <p>이 콘텐츠는 클라이언트에서 지연 로딩 후 표시됨!</p>
    </div>
  );
}

export default MyAsyncComponent; 


/**
// 서버 환경에서 의도적으로 에러를 발생시켜
// 클라이언트 환경에서만 렌더링되도록 하는 예제
<Suspense fallback={<Loading />}>
  <ClientOnlySuspense />
</Suspense>

function ClientOnlySuspense() {
  if (typeof window === 'undefined') {
    throw Error('이 컴포넌트는 클라이언트에서만 렌더링되어야 함.');
  }
  // ...
}
*/

// 서버 환경에서 의도적으로 에러를 발생시켜
// 클라이언트 환경에서만 렌더링되도록 하는 예제
<Suspense fallback={<Loading />}>
  <ClientOnlySuspense />
</Suspense>

function ClientOnlySuspense() {
  if (typeof window === 'undefined') {
    throw Error('이 컴포넌트는 클라이언트에서만 렌더링되어야 함.');
  }
  // ...
}