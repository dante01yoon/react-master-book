import React, { useState } from "react"

// 부모 컴포넌트: React.memo로 감쌈
const MemoizedParent = React.memo(({ children }: { children: React.ReactNode }) => {
  console.log("부모 컴포넌트 렌더링됨") // 부모 렌더링 로그
  return <div style={{ border: "1px solid red", padding: 8 }}>{children}</div>
})

// 자식 컴포넌트: React.memo로 감쌈
const MemoizedChild = React.memo(() => {
  console.log("자식 컴포넌트 렌더링됨") // 자식 렌더링 로그
  return <div>자식 컴포넌트</div>
})

export default function MemoChildrenDemo() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>리렌더 트리거 (count: {count})</button>
      {/* 중첩 구조: 부모의 children으로 자식 전달 */}
      <MemoizedParent>
        <MemoizedChild />
      </MemoizedParent>
      {/* <MemoizedParentComponent children={MemoizedChildComponent} /> */}
    </div>
  )
}

/*
  // 주요 포인트 한글 주석
  - MemoizedParent는 React.memo로 감쌌지만, children으로 전달되는 <MemoizedChild />가 매번 새로운 React element로 생성됨
  - 따라서 MemoizedParent의 props가 매번 바뀌는 것으로 인식되어, 버튼 클릭 시마다 부모가 리렌더링됨
  - 자식 컴포넌트는 React.memo로 감쌌으므로, 실제로는 props가 바뀌지 않는 한 리렌더링되지 않음
  - 이 현상을 콘솔 로그로 직접 확인할 수 있음
*/