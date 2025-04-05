import React, { useState, lazy, Suspense } from 'react';

// 이 컴포넌트들은 필요 시 변환을 보여주기 위해 지연 로딩됩니다
const LazyComponent1 = lazy(() => import('./lazy/LazyComponent1'));
const LazyComponent2 = lazy(() => import('./lazy/LazyComponent2'));
const LazyComponent3 = lazy(() => import('./lazy/LazyComponent3'));

/**
 * 이 컴포넌트는 지연 로딩을 통한 Vite의 필요 시 변환을 보여줍니다.
 * 
 * 각 컴포넌트는 필요할 때만 로드되고 변환되어 초기 로드 시간을 줄이고
 * 성능을 향상시킵니다.
 */
const LazyLoadExample = () => {
  const [activeComponent, setActiveComponent] = useState<number | null>(null);

  return (
    <div className="lazy-load-example">
      <h2>지연 로딩을 통한 필요 시 변환</h2>
      <p>
        Vite는 브라우저에서 요청할 때만 파일을 변환합니다.
        이 예제는 컴포넌트를 지연 로딩하여 이 기능을 보여줍니다.
      </p>
      <p>
        개발자 도구의 네트워크 탭을 열고 아래 버튼을 클릭할 때만
        JavaScript 파일이 로드되는 것을 관찰해보세요.
      </p>
      
      <div className="buttons">
        <button onClick={() => setActiveComponent(1)}>컴포넌트 1 로드</button>
        <button onClick={() => setActiveComponent(2)}>컴포넌트 2 로드</button>
        <button onClick={() => setActiveComponent(3)}>컴포넌트 3 로드</button>
        {activeComponent && (
          <button onClick={() => setActiveComponent(null)}>컴포넌트 숨기기</button>
        )}
      </div>
      
      <div className="component-container">
        <Suspense fallback={<div>컴포넌트 로딩 중...</div>}>
          {activeComponent === 1 && <LazyComponent1 />}
          {activeComponent === 2 && <LazyComponent2 />}
          {activeComponent === 3 && <LazyComponent3 />}
        </Suspense>
      </div>
    </div>
  );
};

export default LazyLoadExample; 