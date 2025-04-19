/**
 * JSX를 JavaScript로 변환하는 과정 데모
 * 
 * 이 파일은 Babel을 통해 JSX가 어떻게 JavaScript로 변환되는지 보여줍니다.
 * npm run jsx-demo 명령어로 변환 및 실행할 수 있습니다.
 */

// React 17 이전: React를 반드시 import 해야 함 (Classic 모드)
import React from 'react';

// 간단한 함수 컴포넌트 정의
function Greeting({ name, children }) {
  return (
    <div className="greeting">
      <h1>안녕하세요, {name}님!</h1>
      <div className="content">{children}</div>
    </div>
  );
}

// 중첩된 컴포넌트 사용
const app = (
  <div className="app">
    <Greeting name="리액트">
      <p>이 JSX 코드는 <strong>React.createElement</strong> 호출로 변환됩니다.</p>
      <p>Babel이 변환한 결과를 확인해보세요!</p>
    </Greeting>
    
    <div className="info">
      <h2>JSX가 변환되는 과정:</h2>
      <ol>
        <li>Babel이 JSX 구문을 파싱</li>
        <li>JSX를 React.createElement 호출로 변환</li>
        <li>변환된 코드가 ReactElement 객체 생성</li>
        <li>이 객체가 가상 DOM의 일부가 됨</li>
      </ol>
    </div>
  </div>
);

// 생성된 React 엘리먼트 구조 출력
console.log('생성된 React 엘리먼트 (app):');
console.log(JSON.stringify(app, (key, value) => 
  key === '$$typeof' || key === '_owner' || key === '_store' ? 
    String(key) + ': [Symbol/Object]' : value, 2)); 