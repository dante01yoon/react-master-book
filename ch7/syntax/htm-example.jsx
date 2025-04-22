import React from 'react';
import ReactDOM from 'react-dom';
import { html } from 'htm/react';

// 1. 기본 htm 사용 예시
const BasicExample = () => {
  const name = "리액트";
  const className = "greeting";
  
  // JSX 버전
  // return <div className={className}>안녕하세요, {name}!</div>;
  
  // htm 버전 (태그드 템플릿)
  return html`<div className=${className}>안녕하세요, ${name}!</div>`;
  // html 태그드 템플릿 함수를 사용하여 JSX와 유사한 문법으로 마크업을 작성
  // 변수는 ${} 구문을 통해 전달됨
};

// 2. 조건부 렌더링 컴포넌트
const ConditionalExample = ({ isLoggedIn }) => {
  // JSX 버전
  // return (
  //   <div>
  //     {isLoggedIn 
  //       ? <p>환영합니다!</p> 
  //       : <button>로그인</button>
  //     }
  //   </div>
  // );
  
  // htm 버전
  return html`
    <div>
      ${isLoggedIn 
        ? html`<p>환영합니다!</p>` 
        : html`<button>로그인</button>`
      }
    </div>
  `;
  // 조건부 렌더링에서는 삼항연산자와 함께 중첩된 html` ` 템플릿 사용
  // 각 분기점에서 다시 html 태그드 템플릿을 사용해야 함
};

// 3. 복잡한 컴포넌트 구조 예시
const GoldenRabbitBox = ({ children }) => {
  return html`<div className="golden-rabbit-box">${children}</div>`;
  // 자식 컴포넌트를 받아 렌더링하는 기본 컨테이너 컴포넌트
};

GoldenRabbitBox.Comment = ({ children }) => {
  return html`<div className="comment">${children}</div>`;
  // 부모 컴포넌트의 속성으로 정의된 서브 컴포넌트
};

const GoldenRabbitAnswer = ({ value, children }) => {
  return html`<div className="answer" data-value=${value}>${children}</div>`;
  // props로 value와 children을 받는 독립 컴포넌트
};

// 복잡한 컴포넌트 사용 예시
const ComplexExample = ({ user }) => {
  const shouldShowGoldenRabbit = (user) => {
    return user && user.role === 'admin';
    // 사용자가 존재하고 역할이 'admin'인 경우에만 true 반환
  };
  
  // 방법 1: $ 문법으로 컴포넌트 참조 (문서에서 설명한 첫 번째 방식)
  return html`
    <${GoldenRabbitBox}>
      ${
        shouldShowGoldenRabbit(user)
          ? html`<${GoldenRabbitAnswer} value=${false}>No Golden Rabbit</${GoldenRabbitAnswer}>`
          : html`
              <${GoldenRabbitBox.Comment}>
                GoldenRabbit
              </${GoldenRabbitBox.Comment}>
            `
        // 사용자 역할에 따라 다른 컴포넌트 조건부 렌더링
        // 컴포넌트를 참조할 때는 <${컴포넌트}> 형식 사용
        // props는 속성으로 전달 (value=${false})
      }
    </${GoldenRabbitBox}>
  `;
  
  // 방법 2: 간소화된 문법 (문서에서 설명한 두 번째 방식)
  // 주의: 아래 코드는 실제로는 작동하지 않을 수 있음
  // htm은 내부 변수를 자동으로 인식하지 못하기 때문
  // return html`
  //   <GoldenRabbitBox>
  //     {
  //       shouldShowGoldenRabbit(user)
  //         ? <GoldenRabbitAnswer value={false}>No Golden Rabbit</GoldenRabbitAnswer>
  //         : <GoldenRabbitBox.Comment>
  //             GoldenRabbit
  //           </GoldenRabbitBox.Comment>
  //     }
  //   </GoldenRabbitBox>
  // `;
};

// 4. 리스트 렌더링 예시
const ListExample = () => {
  const items = ['사과', '바나나', '오렌지'];
  
  // JSX 버전
  // return (
  //   <ul>
  //     {items.map((item, index) => (
  //       <li key={index}>{item}</li>
  //     ))}
  //   </ul>
  // );
  
  // htm 버전
  return html`
    <ul>
      ${items.map((item, index) => html`<li key=${index}>${item}</li>`)}
    </ul>
  `;
  // 배열의 map 메서드와 함께 사용하여 리스트 렌더링
  // 각 항목마다 html` ` 템플릿을 반환해야 함
  // JSX와 마찬가지로 key 속성 사용 필요
};

// 메인 앱 컴포넌트
const App = () => {
  return html`
    <div className="app">
      <h1>JSX VS 태그드 템플릿(htm) 비교</h1>
      
      <h2>1. 기본 사용법</h2>
      <${BasicExample} />
      
      <h2>2. 조건부 렌더링</h2>
      <${ConditionalExample} isLoggedIn=${true} />
      <${ConditionalExample} isLoggedIn=${false} />
      
      <h2>3. 복잡한 컴포넌트 구조</h2>
      <${ComplexExample} user=${{ role: 'admin' }} />
      <${ComplexExample} user=${{ role: 'user' }} />
      
      <h2>4. 리스트 렌더링</h2>
      <${ListExample} />
      
      <h3>JSX와 태그드 템플릿 비교</h3>
      <ul>
        <li>JSX: 전용 트랜스파일러 필요, 강력한 IDE 지원, 성능 최적화</li>
        <li>태그드 템플릿: 트랜스파일러 불필요, 기본 JS 문법만으로 사용 가능, 런타임 파싱으로 약간의 성능 저하</li>
      </ul>
    </div>
  `;
  // 모든 컴포넌트를 조합한 최상위 App 컴포넌트
  // 컴포넌트에 props 전달 시 ${} 문법 사용
  // 객체는 ${{}} 형태로 전달 가능
};

// 실제 렌더링은 다음과 같이 할 수 있습니다
// ReactDOM.render(html`<${App} />`, document.getElementById('root'));
// htm을 사용한 최종 렌더링 방식
// 컴포넌트를 <${컴포넌트}> 형식으로 참조

export default App; 