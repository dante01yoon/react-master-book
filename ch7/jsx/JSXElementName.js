import React from 'react';

/**
 * JSXElementName 예제
 * 
 * JSXElementName은 JSX에서 요소의 태그 이름을 나타내며 세 가지 유형이 있습니다:
 * 1. JSXIdentifier: 단일 식별자 (예: div, Button)
 * 2. JSXNamespacedName: 네임스페이스가 있는 이름 (예: svg:path)
 * 3. JSXMemberExpression: 점(.)으로 연결된 객체 속성 (예: Module.Component)
 */

// ------------- JSXIdentifier 예제 -------------

// 1. 기본 HTML 태그 (소문자로 시작)
function BasicHtmlElements() {
  return (
    <div>
      <span>Span 요소</span>
      <p>Paragraph 요소</p>
      <button>Button 요소</button>
    </div>
  );
}

// 2. 사용자 정의 컴포넌트 (대문자로 시작)
function CustomButton() {
  return <button className="custom-button">커스텀 버튼</button>;
}

function ComponentExample() {
  return (
    <div>
      <CustomButton />
      <CustomButton></CustomButton>
    </div>
  );
}

// 3. 유효한 식별자에는 알파벳, 숫자, $, _가 포함될 수 있음
function Button_Custom() {
  return <button>사용자 정의 버튼</button>;
}

function $SpecialButton() {
  return <button>특수 버튼</button>;
}

// 4. 비라틴 문자 (유니코드)를 사용한 컴포넌트 이름
// 가능하지만 권장되지 않음
function 한글컴포넌트() {
  return <div>한글 이름을 가진 컴포넌트</div>;
}

function Π지수컴포넌트() {
  return <div>π = 3.14159...</div>;
}


/** 유효한 컴포넌트  */
function $Button() { /** */ }
function _PrivateComponent() { /** */ }
function Button$Special() { /** */ }
function Component_With_Underscores() { /** */ }
function Component$123() { /** */ }

/** 유효하지 않은 컴포넌트 
function -Button() { ... }  // 하이픈으로 시작 (오류)
function Button-Special() { ... }  // 하이픈 포함 (오류)
function @Component() { ... }  // @ 기호 사용 (오류)
function 123Component() { ... }  // 숫자로 시작 (오류)
*/
// ------------- JSXNamespacedName 예제 -------------
// XML 네임스페이스와 유사한 표기법
// 주로 SVG 및 MathML에서 사용됨

function NamespacedExample() {
  return (
    <svg width="100" height="100">
      <svg:circle cx="50" cy="50" r="40" stroke="green" strokeWidth="4" fill="yellow" />
    </svg>
  );
}

// ------------- JSXMemberExpression 예제 -------------
// 모듈이나 객체의 속성으로 접근하는 경우

// 모듈에서 여러 컴포넌트 내보내기
const UI = {
  Button: () => <button>UI 버튼</button>,
  Card: () => <div className="card">UI 카드</div>,
  Form: {
    Input: () => <input placeholder="폼 입력" />,
    Submit: () => <button type="submit">제출</button>
  }
};

function MemberExpressionExample() {
  return (
    <div>
      {/* 객체의 속성으로 컴포넌트 접근 */}
      <UI.Button />
      <UI.Card />
      
      {/* 중첩된 객체 속성 접근 */}
      <UI.Form.Input />
      <UI.Form.Submit />
    </div>
  );
}

// ------------- 주의사항 및 제한 -------------

// 1. HTML 내장 요소는 항상 소문자로 시작
// <Div> - 잘못됨, React는 사용자 정의 컴포넌트를 찾으려 함
// <div> - 올바름, HTML 태그로 인식

// 2. 사용자 정의 컴포넌트는 항상 대문자로 시작
// <myComponent> - 잘못됨, React는 HTML 태그를 찾으려 함
// <MyComponent> - 올바름, 사용자 정의 컴포넌트로 인식

// 3. JSX는 표현식으로 동적 컴포넌트를 렌더링할 수 있음
function DynamicComponentExample() {
  const Components = {
    text: () => <span>텍스트 컴포넌트</span>,
    button: () => <button>버튼 컴포넌트</button>
  };
  
  const ComponentType = "text";
  const DynamicComponent = Components[ComponentType];
  
  return (
    <div>
      {/* 변수에 할당된 컴포넌트 사용 */}
      <DynamicComponent />
      
      {/* 표현식으로 동적 결정된 컴포넌트 */}
      {ComponentType === "text" ? <Components.text /> : <Components.button />}
    </div>
  );
}

// 자바스크립트에서는 변수 이름에 UnicodeEscapeSequence를 사용 가능
const \u03A9mega = "Omega"; 
function Oemga() {
  return (<div>{\u03A9mega}</div>)
}

/** 유니코드 이스케이프 시퀀스 사용 예제 
function Omega() {
  return (
    <>
      // JSX 태그 이름에는 UnicodeEscapeSequence 사용 불가
      <video></\u0076ideo>
   <\u03A9mega/>
    </>
  )
}
*/

const GoldenRabbit = () => <div>A golden rabbit</div>;
GoldenRabbit.Ear = () => <div>Ear</div>;
GoldenRabbit.Ear.Ball = () => <div>Ear Ball</div>; // 중첩된 속성 정의


export default function JSXElementNameExample() {
  return (
    <div className="jsx-element-name-examples">
      <h1>JSXElementName 예제</h1>
      
      <section>
        <h2>1. JSXIdentifier 예제</h2>
        <BasicHtmlElements />
        <ComponentExample />
        <Button_Custom />
        <$SpecialButton />
        <한글컴포넌트 />
        <Π지수컴포넌트 />
      </section>
      
      <section>
        <h2>2. JSXNamespacedName 예제</h2>
        <NamespacedExample />
      </section>
      
      <section>
        <h2>3. JSXMemberExpression 예제</h2>
        <MemberExpressionExample />
      </section>
      
      <section>
        <h2>4. 동적 컴포넌트 예제</h2>
        <DynamicComponentExample />
      </section>

      <section>
        <GoldenRabbit />
        <GoldenRabbit.Ear />
        <GoldenRabbit.Ear.Ball /> {/* 유효한 JSX */}
      </section>
    </div>
  );
} 