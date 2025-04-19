// SWC JSX 변환 예제 - 기본 JSX 코드
import React from 'react';

// 간단한 JSX 예제
const element = <h1 className="welcome">Hello, SWC!</h1>;

// 중첩된 JSX 예제
const nestedElement = (
  <div className="container">
    <h2 className="title">SWC로 변환하는 JSX</h2>
    <p className="content">
      SWC는 Babel보다 훨씬 빠른 컴파일 속도를 제공합니다.
    </p>
    <button onClick={() => console.log('클릭됨!')}>
      클릭해보세요
    </button>
  </div>
);

// 커스텀 컴포넌트 예제
const MyButton = ({ color, children }) => (
  <button 
    style={{ backgroundColor: color, color: 'white', padding: '10px' }}
  >
    {children}
  </button>
);

const customComponentExample = <MyButton color="blue">Click Me</MyButton>;

// 조건부 렌더링 예제
const showMessage = true;
const conditionalExample = (
  <div>
    {showMessage ? <p>메시지가 표시됩니다.</p> : <p>메시지가 숨겨집니다.</p>}
  </div>
);

console.log('SWC JSX 예제 파일이 로드되었습니다.'); 