import React, { useState, useEffect } from 'react';

/**
 * 훅 규칙을 올바르게 준수한 컴포넌트
 */
function CorrectComponent() {
  // useState 훅을 컴포넌트 최상위 레벨에서 호출함
  // 매 렌더링 시 동일한 순서로 호출되는 것을 보장함
  const [count, setCount] = useState(0);

  // useEffect 훅 또한 컴포넌트 최상위 레벨에서 호출함
  useEffect(() => {
    // 문서의 타이틀을 현재 count 값으로 업데이트함
    document.title = `Count: ${count}`;
    // 이 효과는 count 값이 변경될 때마다 실행됨
  }, [count]);

  /**
   * 버튼 클릭 시 count 상태를 1 증가시키는 이벤트 핸들러
   */
  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={handleIncrement}>증가</button>
      <p>이 컴포넌트는 훅 규칙을 올바르게 준수하여 작성되었음.</p>
      <p>useState와 useEffect 훅은 항상 동일한 순서로 호출됨.</p>
    </div>
  );
}

export default CorrectComponent; 