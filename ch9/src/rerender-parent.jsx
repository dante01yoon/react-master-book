import React, { useState, useEffect } from 'react';

// ➊ 일반 자식 컴포넌트
const Child = ({ value }) => {
  console.log(`Child 컴포넌트 렌더링 (value: ${value})`);
  return <div className="p-2 border-t mt-2">Child (props: {value})</div>;
};

// 부모 컴포넌트
const Parent = () => {
  // 1초마다 바뀌는 상태 (부모를 리렌더링 시키는 원인)
  const [time, setTime] = useState(new Date());
  // 버튼으로 바뀌는 상태 (자식에게 내려보낼 prop)
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  console.log('Parent 컴포넌트가 리렌더링되었습니다.');

  return (
    <div className="p-4 border rounded shadow-lg">
      <h1 className="text-xl font-bold mb-2">Parent Component</h1>
      <p>현재 시간: {time.toLocaleTimeString()}</p>
      <p className="text-sm text-gray-600 mb-4">
        시간이 매초 변경되어 Parent 컴포넌트는 계속 리렌더링됩니다.
      </p>

      <button
        onClick={() => setCount(count + 1)}
        className="bg-blue-500 text-white px-3 py-1 rounded mb-4"
      >
        Count 증가 (자식 prop 변경)
      </button>

      {/* ➌ 자식 컴포넌트들에게 count 상태를 prop으로 전달 */}
      <Child value={count} />
      <MemoizedChild value={count} />
    </div>
  );
};

export default Parent;