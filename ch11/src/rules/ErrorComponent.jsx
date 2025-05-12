import React, { useState, useEffect } from 'react';

/**
 * 훅 규칙을 위반한 컴포넌트
 */
function ErrorComponent({ showCounter }) {
  // 오류: 조건문 내부에서 useState 훅을 호출함
  // showCounter 값에 따라 훅 호출 순서가 달라질 수 있음
  // 리액트는 훅 호출 순서가 매 렌더링마다 동일해야 함
  if (showCounter) {
    const [count, setCount] = useState(0); // React Hook "useState" is called conditionally.

    // 마찬가지로 조건문 내부의 useEffect도 규칙 위반임
    useEffect(() => {
      document.title = `Count: ${count}`;
    }, [count]);

    const handleIncrement = () => {
      setCount(prevCount => prevCount + 1);
    };

    // 조건부 렌더링 자체는 문제가 없으나, 훅 호출이 문제임
    return (
      <div>
        <p>현재 카운트: {count}</p>
        <button onClick={handleIncrement}>증가</button>
        <p>카운터가 표시됨 (훅 규칙 위반)</p>
      </div>
    );
  }

  // showCounter가 false일 경우, 위의 훅들은 호출되지 않음
  // 따라서 렌더링 간 훅 호출 순서가 달라짐

  // 예시: 조건문 밖에서 호출되는 다른 훅 (규칙 준수)
  const [anotherState, setAnotherState] = useState('기본 값');

  return (
    <div>
      <p>카운터가 표시되지 않음.</p>
      <p>다른 상태: {anotherState}</p>
      <p>이 컴포넌트는 조건문 내부에 훅을 사용하여 규칙을 위반했음.</p>
    </div>
  );
}

export default ErrorComponent; 