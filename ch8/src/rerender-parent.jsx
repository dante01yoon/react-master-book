import { useState, useEffect, useRef } from 'react';

// 자식 컴포넌트 정의
const Child = ({ value }) => {
  // ➊ 자식 컴포넌트 리렌더링 시 콘솔에 로그 출력함
  console.log('Child 컴포넌트가 리렌더링되었습니다.'); 
  return <div>Child Value: {value}</div>;
};

// 부모 컴포넌트 정의
const Parent = () => {
  // count 상태와 setCount 함수를 useState 훅으로 선언함
  const [count, setCount] = useState(0); 
  // ➋ propRef 레퍼런스를 useRef 훅으로 선언하고 초기값을 { value: 0 }으로 설정함
  // ref 객체는 업데이트 되어도 리렌더링을 유발하지 않음
  const propRef = useRef({ value: 0 }); 

  // 컴포넌트 마운트 시 및 의존성 배열 변경 시 실행될 이펙트 설정함
  useEffect(() => {
    // 1초마다 실행될 인터벌 설정함
    const interval = setInterval(() => {
      // ➌ propRef의 현재 value 값을 1 증가시킴 (이 자체는 리렌더링을 유발하지 않음)
      propRef.current.value += 1; 
      // ➍ count 상태를 propRef의 현재 value 값으로 업데이트함 (리렌더링 유발)
      setCount(propRef.current.value); 
      console.log('ref값이 업데이트되었습니다.:', propRef.current.value);
    }, 1000);

    // 컴포넌트 언마운트 시 인터벌 정리 함수 반환함
    return () => clearInterval(interval); 
  }, []); // 의존성 배열이 비어 있으므로 마운트 시 한 번만 실행됨

  // 부모 컴포넌트 리렌더링 시 콘솔에 로그 출력함
  console.log('Parent 컴포넌트가 리렌더링되었습니다.'); 
  return (
    <div className="p-4 border rounded">
      <h1 className="text-xl font-bold mb-2">Parent Component</h1>
      {/* ➎ Child 컴포넌트에 현재 count 상태 값을 value prop으로 전달함 */}
      {/* 부모가 리렌더링되면 자식도 리렌더링됨 */}
      <Child value={count} /> 
    </div>
  );
};

export default Parent; 