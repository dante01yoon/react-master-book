import React, { useState } from 'react';

/**
 * JSXAttributes 예제
 * 
 * JSXAttributes는 JSX 엘리먼트에 추가 정보를 전달하기 위한 키-값 형태의 설정입니다.
 * HTML 속성과 유사하며 React 컴포넌트에서는 props로 전달됩니다.
 * 
 * JSXAttributes의 구성 요소:
 * 1. JSXAttribute: 개별 속성 (예: className="container")
 * 2. JSXAttributeName: 속성의 이름 (예: className)
 * 3. JSXAttributeInitializer: 속성값 할당 부분 (예: ="container")
 * 4. JSXAttributeValue: 속성에 할당되는 값 (예: "container")
 * 5. JSXSpreadAttribute: 객체 속성을 한꺼번에 전달 (예: {...props})
 */

// ------------- 기본 JSXAttribute 예제 -------------

// 1. 문자열 리터럴 속성값
function StringLiteralAttributes() {
  return (
    <div>
      {/* 문자열 리터럴 속성값 */}
      <input 
        type="text"           // type은 JSXAttributeName, "text"는 JSXAttributeValue
        placeholder="이름 입력" // 속성값으로 문자열 리터럴 사용
        className="input-field" // HTML class 속성은 React에서 className으로 사용
      />
      
      {/* 큰따옴표나 작은따옴표 모두 사용 가능 */}
      <button className="btn" id='submit-btn'>제출</button>
    </div>
  );
}
// <Rabbit isRunning />


// 2. JavaScript 표현식 속성값
function ExpressionAttributes() {
  const [value, setValue] = useState('');
  const isValid = value.length > 3;
  const inputStyle = { 
    border: isValid ? '1px solid green' : '1px solid red',
    padding: '8px'
  };
  
  return (
    <div>
      {/* JavaScript 표현식을 속성값으로 사용 */}
      <input 
        value={value}              // 변수를 속성값으로 사용
        onChange={(e) => setValue(e.target.value)} // 함수 표현식 사용
        style={inputStyle}         // 객체를 속성값으로 사용
        disabled={!isValid}        // 불리언 표현식 사용
      />
      
      {/* 산술식, 논리식 등 다양한 표현식 사용 가능 */}
      <div tabIndex={1 + 1}>       {/* 산술 표현식 */}
        <p style={{ color: isValid ? 'green' : 'red' }}> {/* 인라인 객체와 삼항 연산자 */}
          {isValid ? '유효한 입력입니다' : '3글자 이상 입력하세요'}
        </p>
      </div>
    </div>
  );
}

// 3. JSX를 속성값으로 사용
function JSXAsAttributeValue() {
  // 아이콘 컴포넌트
  const Icon = ({ name }) => <span className={`icon icon-${name}`}>📌</span>;
  
  return (
    <div>
      {/* JSX 엘리먼트를 속성값으로 사용 */}
      <button 
        icon={<Icon name="add" />} // JSX 엘리먼트를 속성값으로 전달
      >
        아이템 추가
      </button>
      
      {/* JSX Fragment를 속성값으로 사용 */}
      <Tooltip 
        content={
          <>
            <h4>도움말</h4>
            <p>여기에 도움말 내용이 표시됩니다.</p>
          </>
        }
      >
        도움말 보기
      </Tooltip>
    </div>
  );
}

// Tooltip 컴포넌트 정의
function Tooltip({ children, content }) {
  return (
    <div className="tooltip">
      <div className="tooltip-trigger">{children}</div>
      <div className="tooltip-content">{content}</div>
    </div>
  );
}

// 4. JSXAttributeInitializer 생략 (불리언 속성)
function BooleanAttributes() {
  return (
    <div>
      {/* JSXAttributeInitializer를 생략한 불리언 속성 */}
      <input 
        type="checkbox"
        checked         // checked={true}와 동일
        disabled        // disabled={true}와 동일
        readOnly        // readOnly={true}와 동일
      />
      
      {/* 컴포넌트에서도 동일하게 적용 */}
      <CustomComponent 
        isActive        // isActive={true}와 동일
        isVisible       // isVisible={true}와 동일
      />
    </div>
  );
}

// CustomComponent 정의
function CustomComponent({ isActive, isVisible }) {
  return (
    <div 
      style={{ 
        fontWeight: isActive ? 'bold' : 'normal',
        display: isVisible ? 'block' : 'none'
      }}
    >
      커스텀 컴포넌트 (활성: {isActive ? '예' : '아니오'}, 표시: {isVisible ? '예' : '아니오'})
    </div>
  );
}

// ------------- JSXSpreadAttribute 예제 -------------

// 1. 기본 JSXSpreadAttribute
function SpreadAttributeExample() {
  // 버튼 공통 속성
  const buttonProps = {
    type: 'button',
    className: 'btn',
    onClick: () => alert('버튼 클릭됨')
  };
  
  return (
    <div>
      {/* 객체의 모든 속성을 JSX 엘리먼트에 전달 */}
      <button {...buttonProps}>
        기본 버튼
      </button>
      
      {/* 여러 개의 spread 속성 사용 가능 */}
      <button 
        {...buttonProps} 
        {...{ id: 'special-btn' }}
      >
        여러 속성 병합
      </button>
    </div>
  );
}

// 2. JSXSpreadAttribute와 일반 속성 혼합
function MixedAttributesExample() {
  const baseProps = {
    className: 'base-class',
    style: { color: 'blue' },
    onClick: () => console.log('baseProps click')
  };
  
  return (
    <div>
      {/* Spread 연산자 이후 속성 정의 - 덮어쓰기 */}
      <button 
        {...baseProps} 
        className="override-class" // baseProps의 className을 덮어씀
        onClick={() => alert('새로운 클릭 이벤트')} // baseProps의 onClick을 덮어씀
      >
        속성 덮어쓰기
      </button>
      
      {/* Spread 연산자 이전 속성 정의 - 유지되지 않음 */}
      <button 
        className="will-be-overridden" 
        {...baseProps} // 이전에 정의된 className을 덮어씀
      >
        덮어쓰여진 속성
      </button>
      
      {/* 여러 개의 Spread 속성 사용 시 마지막 값이 우선 */}
      <button 
        {...baseProps} 
        {...{ className: 'middle-class' }}
        {...{ className: 'final-class' }} // 이 className이 적용됨
      >
        최종 값 적용
      </button>
    </div>
  );
}

// 3. 조건부 Spread 속성
function ConditionalSpreadAttributes() {
  const [isAdmin, setIsAdmin] = useState(false);
  
  // 일반 사용자와 관리자 속성
  const userProps = { className: 'user-btn', title: '일반 사용자 기능' };
  const adminProps = { className: 'admin-btn', title: '관리자 기능' };
  
  return (
    <div>
      {/* 조건에 따라 다른 속성 집합 적용 */}
      <button 
        {...(isAdmin ? adminProps : userProps)}
        onClick={() => setIsAdmin(!isAdmin)}
      >
        {isAdmin ? '관리자 모드' : '일반 사용자 모드'}
      </button>
      
      <p>클릭하여 모드 전환: {isAdmin ? '관리자' : '일반 사용자'}</p>
      
      {/* 조건부 속성 추가 */}
      <input
        type="text"
        {...(isAdmin && { readOnly: true, placeholder: '관리자 모드에서는 편집 불가' })}
        {...(!isAdmin && { placeholder: '여기에 텍스트 입력' })}
      />
    </div>
  );
}

// 4. 동적 속성 이름
function DynamicAttributeNames() {
  const [attribute, setAttribute] = useState('color');
  const [value, setValue] = useState('blue');
  
  const dynamicStyles = {
    [attribute]: value // 동적 속성 이름
  };
  
  return (
    <div>
      {/* 동적 스타일 속성 적용 */}
      <div style={dynamicStyles}>
        동적 스타일이 적용된 텍스트
      </div>
      
      {/* 컨트롤 */}
      <div>
        <select 
          value={attribute} 
          onChange={e => setAttribute(e.target.value)}
        >
          <option value="color">색상</option>
          <option value="fontSize">글자 크기</option>
          <option value="fontWeight">글자 굵기</option>
          <option value="backgroundColor">배경색</option>
        </select>
        
        <input 
          value={value} 
          onChange={e => setValue(e.target.value)}
          placeholder="속성값 입력"
        />
      </div>
      
      {/* 동적으로 생성된 data 속성 */}
      <div {...{ [`data-${attribute}`]: value }}>
        동적 데이터 속성이 추가된 요소
      </div>
    </div>
  );
}

// ------------- 주의사항 및 모범 사례 -------------

// 1. props 전달 패턴
function PropsPassingPatterns({ className, style, ...restProps }) {
  // 일부 props는 구조 분해로 추출하고, 나머지는 spread로 전달
  return (
    <div className={`base-class ${className || ''}`} style={{ padding: '10px', ...style }}>
      <input {...restProps} /> {/* 추출되지 않은 모든 props를 input에 전달 */}
    </div>
  );
}

// 2. 속성 우선순위 주의사항
function AttributePrecedence() {
  const props = { id: 'from-props', className: 'from-props' };

  return (
    <div>
      {/* 잘못된 패턴: id가 중복 정의됨 */}
      <div id="hard-coded" {...props}>
        이 요소의 id는 "from-props"가 됩니다 (덮어씌워짐)
      </div>
      
      {/* 올바른 패턴: props 이후에 중요 속성 정의 */}
      <div {...props} id="final-id">
        이 요소의 id는 "final-id"가 됩니다
      </div>
    </div>
  );
}

// 3. 이벤트 핸들러 패턴
function EventHandlerPatterns() {
  const [count, setCount] = useState(0);
  
  // 인라인 이벤트 핸들러 vs 명명된 함수
  const handleClick = () => setCount(count + 1);
  
  // 부모로부터 받은 이벤트 핸들러와 결합
  function ChildButton({ onClick }) {
    const handleChildClick = (e) => {
      console.log('자식 컴포넌트에서 처리');
      // 부모의 이벤트 핸들러도 호출
      onClick && onClick(e);
    };
    
    return (
      <button onClick={handleChildClick}>
        자식 버튼
      </button>
    );
  }
  
  return (
    <div>
      {/* 인라인 이벤트 핸들러 */}
      <button onClick={() => setCount(count + 1)}>
        인라인 증가 (현재: {count})
      </button>
      
      {/* 명명된 함수 이벤트 핸들러 - 가독성이 더 좋음 */}
      <button onClick={handleClick}>
        함수 증가 (현재: {count})
      </button>
      
      {/* 이벤트 핸들러 전달 */}
      <ChildButton onClick={() => console.log('부모에서 처리됨')} />
      
      {/* 조건부 이벤트 핸들러 */}
      <button onClick={count < 5 ? handleClick : undefined}>
        {count < 5 ? '제한적 증가' : '최대치 도달'}
      </button>
    </div>
  );
}

export default function JSXAttributesExample() {
  return (
    <div className="jsx-attributes-examples">
      <h1>JSXAttributes 예제</h1>
      
      <section>
        <h2>1. 기본 JSXAttribute 예제</h2>
        <h3>1.1 문자열 리터럴 속성값</h3>
        <StringLiteralAttributes />
        
        <h3>1.2 JavaScript 표현식 속성값</h3>
        <ExpressionAttributes />
        
        <h3>1.3 JSX를 속성값으로 사용</h3>
        <JSXAsAttributeValue />
        
        <h3>1.4 불리언 속성 (JSXAttributeInitializer 생략)</h3>
        <BooleanAttributes />
      </section>
      
      <section>
        <h2>2. JSXSpreadAttribute 예제</h2>
        <h3>2.1 기본 Spread 속성</h3>
        <SpreadAttributeExample />
        
        <h3>2.2 일반 속성과 Spread 속성 혼합</h3>
        <MixedAttributesExample />
        
        <h3>2.3 조건부 Spread 속성</h3>
        <ConditionalSpreadAttributes />
        
        <h3>2.4 동적 속성 이름</h3>
        <DynamicAttributeNames />
      </section>
      
      <section>
        <h2>3. 주의사항 및 모범 사례</h2>
        <h3>3.1 Props 전달 패턴</h3>
        <PropsPassingPatterns 
          className="custom-class"
          style={{ color: 'green' }}
          type="text"
          placeholder="모범 사례 예시"
        />
        
        <h3>3.2 속성 우선순위</h3>
        <AttributePrecedence />
        
        <h3>3.3 이벤트 핸들러 패턴</h3>
        <EventHandlerPatterns />
      </section>
    </div>
  );
} 