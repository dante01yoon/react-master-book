import React, { useState, useEffect, useRef } from 'react';

// 자식 컴포넌트 1: 아무런 props도 받지 않음
const StaticChild = () => {
  // 이 컴포넌트가 리렌더링될 때 콘솔에 로그 출력함
  console.log("StaticChild 컴포넌트가 리렌더링 되었습니다.");
  return <div>Static Child</div>;
}

// 자식 컴포넌트 2: value prop을 받음
const Child = ({ value }) => {
  // 이 컴포넌트가 리렌더링될 때 콘솔에 로그 출력함
  console.log(`Child 컴포넌트가 리렌더링되었습니다. value: ${value}`);
  return <div>Child Value: {value}</div>;
};

// 부모 컴포넌트 정의
const Parent = () => {
  // propRef 레퍼런스를 useRef 훅으로 선언하고 초기값을 { value: 0 }으로 설정함
  // ref 객체의 .current 프로퍼티 변경은 컴포넌트 리렌더링을 유발하지 않음
  const propRef = useRef({ value: 0 });
  
  // count 상태와 setCount 함수 선언 (현재 예제에서는 사용되지 않음)
  // 만약 setCount가 호출되면 Parent 리렌더링을 유발할 것임
  // const [count, setCount] = useState(0);

  // 컴포넌트 마운트 시 실행될 이펙트 설정함
  useEffect(() => {
    // 1초마다 실행될 인터벌 설정함
    const interval = setInterval(() => {
      // ➊ propRef의 현재 value 값을 1 증가시킴
      // 이 연산 자체는 Parent 컴포넌트의 리렌더링을 유발하지 않음
      propRef.current.value += 1;
      // ➋ setCount(propRef.current.value)
      // 만약 이 줄의 주석을 해제하면, 상태 업데이트로 인해 Parent가 1초마다 리렌더링됨
      // Parent가 리렌더링되면 StaticChild와 Child도 함께 리렌더링됨
      
      // ref 값이 변경되었음을 콘솔에 기록함 (리렌더링과는 별개로 실행됨)
      console.log('ref값이 업데이트되었습니다.:', propRef.current.value);
    }, 1000);

    // 컴포넌트 언마운트 시 인터벌 정리 함수 반환함
    return () => clearInterval(interval);
  }, []); // 의존성 배열이 비어 있으므로 마운트 시 한 번만 실행됨

  // Parent 컴포넌트 리렌더링 시 콘솔에 로그 출력함
  // 현재 setCount가 주석 처리되어 있으므로, 초기 렌더링 외에는 이 로그가 출력되지 않음
  console.log('Parent 컴포넌트가 리렌더링되었습니다.');
  
  return (
    <div className="p-4 border rounded">
      <h1 className="text-xl font-bold mb-2">Parent Component</h1>
      {/* StaticChild는 Parent가 리렌더링될 때만 리렌더링됨 */}
      {/* 현재 Parent는 리렌더링되지 않으므로 StaticChild도 초기 렌더링 이후 리렌더링되지 않음 */}
      <StaticChild />
      {/* propRef.current.value는 1초마다 변경되지만, Parent 컴포넌트 자체가 리렌더링되지 않음 */}
      {/* 따라서 Child 컴포넌트 함수가 다시 실행되지 않아 새로운 prop 값을 반영하지 못하고 리렌더링도 발생하지 않음 */}
      {/* 이는 props 값의 변경 자체가 리렌더링의 직접적인 원인이 아님을 보여줌 */}
      <Child value={propRef.current.value} />
    </div>
  );
};

export default Parent;
