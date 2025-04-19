// App.jsx - JSX 원본 예시
import React from 'react';

// 간단한 JSX 컴포넌트
export const App = () => {
  return <div className="app">Hello esbuild</div>;
};

// 중첩된 JSX 예제
export const NestedComponent = () => {
  return (
    <div className="container">
      <h1 className="title">esbuild로 JSX 변환하기</h1>
      <p className="content">
        esbuild는 Go로 작성된 초고속 번들러 겸 트랜스파일러입니다.
      </p>
      <button onClick={() => console.log('클릭됨!')}>
        클릭해보세요
      </button>
    </div>
  );
};

// 커스텀 컴포넌트 예제
export const MyButton = ({ color, children }) => (
  <button 
    style={{ backgroundColor: color, color: 'white', padding: '10px' }}
  >
    {children}
  </button>
);

// 조건부 렌더링 예제
export const ConditionalComponent = ({ showMessage }) => (
  <div>
    {showMessage ? <p>메시지가 표시됩니다.</p> : <p>메시지가 숨겨집니다.</p>}
  </div>
);

// export 안 하는 값은 번들에 포함되지 않음
const notExported = <div>This won't be included in the bundle</div>; 