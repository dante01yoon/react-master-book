import React, { useState, useEffect, useRef } from 'react';

// 자식 컴포넌트 1: 아무런 props도 받지 않음
const StaticChild = () => {
  console.log("StaticChild가 리렌더링되었습니다.");
  return <div>Static Child</div>;
};

// 자식 컴포넌트 2: value prop을 받음
const Child = ({ value }) => {
  console.log(`Child가 리렌더링되었습니다. value: ${value}`);
  return <div>Child Value: {value}</div>;
};

// 부모 컴포넌트
const Parent = () => {
  // .current 프로퍼티를 변경해도 리렌더링을 유발하지 않는 ref 객체 생성
  const propRef = useRef({ value: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      // propRef의 값만 1 증가시킴. 이 연산은 리렌더링을 유발하지 않음.
      propRef.current.value += 1;
      console.log('ref 값이 업데이트되었습니다.:', propRef.current.value);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  console.log('Parent가 리렌더링되었습니다.');

  return (
    <div className="p-4 border rounded shadow-lg">
      <h1 className="text-xl font-bold mb-2">Parent Component</h1>
      <StaticChild />
      {/* 
        이 JSX는 Parent가 렌더링될 때 단 한 번만 실행됨.
          초기 렌더링 시점의 propRef.current.value (즉, 0)가 prop으로 전달됨.
          이후 propRef의 값이 메모리에서 변경되더라도, Parent의 렌더링 함수가 다시
          실행되지 않으므로 이 줄은 재평가되지 않고, Child에게 새로운 props가
          전달되지 않음.
      */}
      <Child value={propRef.current.value} />
    </div>
  );
};


export default Parent;
