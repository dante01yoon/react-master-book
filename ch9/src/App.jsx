import React, { useState } from 'react';
import ClassComponentExample from './ClassComponentExample';

function App() {
  const [showFirst, setShowFirst] = useState(true);
  const [showSecond, setShowSecond] = useState(true);

  console.log('-----------------------------------');
  console.log('App 컴포넌트 렌더링');
  console.log('-----------------------------------');

  return (
    <div>
      <h1>클래스 컴포넌트 인스턴스 데모</h1>

      <button onClick={() => setShowFirst(!showFirst)}>
        첫 번째 컴포넌트 {showFirst ? '숨기기' : '보이기'}
      </button>
      <button onClick={() => setShowSecond(!showSecond)}>
        두 번째 컴포넌트 {showSecond ? '숨기기' : '보이기'}
      </button>

      <hr />

      {/* 
        첫 번째 ClassComponentExample 인스턴스입니다.
        React는 이 JSX 태그를 만날 때 ClassComponentExample 클래스의
        새로운 인스턴스를 생성합니다 (`new ClassComponentExample({ message: '첫 번째 인스턴스' })`).
        이 인스턴스는 자신만의 state와 생명주기를 가집니다.
      */}
      {showFirst && <ClassComponentExample message="첫 번째 인스턴스" />}

      <hr />

      {/* 
        두 번째 ClassComponentExample 인스턴스입니다.
        React는 여기서 또 다른 새로운 인스턴스를 생성합니다.
        이 인스턴스는 첫 번째 인스턴스와 완전히 독립적입니다.
        각자의 state (카운트 값)를 가지고, 서로 영향을 주지 않습니다.
        'message' prop도 각 인스턴스별로 다르게 전달될 수 있습니다.
      */}
      {showSecond && <ClassComponentExample message="두 번째 인스턴스" />}

      {/*
        주목할 점:
        - 각 <ClassComponentExample /> 태그는 별도의 인스턴스를 생성합니다.
        - 각 인스턴스는 고유한 state (카운터 값)를 유지합니다.
        - 한 인스턴스에서 버튼을 클릭해도 다른 인스턴스의 카운터 값에 영향을 미치지 않습니다.
        - 컴포넌트가 언마운트(숨김 처리)되면 해당 인스턴스의 componentWillUnmount가 호출되고,
          다시 마운트(보이기 처리)되면 새로운 인스턴스가 생성되고 componentDidMount가 호출됩니다.
        - 개발자 도구 콘솔에서 인스턴스 생성, 마운트, 메서드 호출 시 출력되는 로그와
          'this'가 가리키는 객체를 확인해보세요.
      */}
    </div>
  );
}

export default App; 