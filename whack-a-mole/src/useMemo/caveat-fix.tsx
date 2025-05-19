import React, { useState, useMemo } from "react";

// 부모 컴포넌트: React.memo로 감쌈
const MemoizedParent = React.memo(
  ({ children }: { children: React.ReactNode }) => {
    console.log("자식 변경 Props 전달 시 부모 컴포넌트 렌더링됨"); // 부모 렌더링 로그
    return (
      <div style={{ border: "2px solid dodgerblue", padding: "10px", margin: "10px 0" }}>
        <h4>부모 컴포넌트</h4>
        {children}
      </div>
    );
  }
);
MemoizedParent.displayName = "MemoizedParent";

// 자식 컴포넌트: React.memo로 감쌈
const MemoizedChild = React.memo(() => {
  console.log("자식 컴포넌트 렌더링됨"); // 자식 렌더링 로그
  return (
    <div style={{ border: "1px solid orange", padding: "10px" }}>
      <h5>자식 컴포넌트</h5>
      <p>나는 자식 컴포넌트입니다.</p>
    </div>
  );
});
MemoizedChild.displayName = "MemoizedChild";

export default function UseMemoCaveatFixSolution() {
  const [count, setCount] = useState(0);

  // ➊ useMemo를 사용하여 MemoizedChild 컴포넌트 자체를 메모이제이션함
  //    의존성 배열이 빈 배열([])이므로, MemoizedChild 엘리먼트는 최초 렌더링 시에만 생성됨
  //    이후에는 항상 메모이제이션된 엘리먼트를 재사용함
  const memoizedChildElement = useMemo(() => <MemoizedChild />, []);

  return (
    <div>
      <h3>useMemo로 children 리렌더링 문제 해결</h3>
      <button onClick={() => setCount((c) => c + 1)} style={{ marginBottom: "10px" }}>
        리렌더 트리거 (count: {count})
      </button>
      <MemoizedParent>
        {/* ➋ 메모이제이션된 자식 엘리먼트를 children으로 전달함 */}
        {memoizedChildElement}
      </MemoizedParent>
    </div>
  );
}

/*
  주요 포인트:
  - React.memo로 감싼 부모 컴포넌트가 children prop 때문에 리렌더링되는 문제를 해결하는 방법.
  - useMemo를 사용하여 children으로 전달될 React 엘리먼트 자체를 메모이제이션함.
  - 의존성 배열을 빈 배열([])로 설정하여, 엘리먼트가 최초 한 번만 생성되도록 함.
  - 이렇게 하면 부모 컴포넌트는 항상 동일한 children prop을 받게 되어 불필요한 리렌더링을 피할 수 있음.
*/
