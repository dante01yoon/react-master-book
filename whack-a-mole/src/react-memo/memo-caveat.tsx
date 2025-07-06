import React, { useState, useMemo } from 'react'

// 부모 컴포넌트: React.memo로 감쌈
const MemoizedParent = React.memo(({ children }: { children: React.ReactNode }) => {
  console.log('부모 컴포넌트 렌더링')
  return <div style={{ border: '1px solid red', padding: 8 }}>{children}</div>
})

// 자식 컴포넌트: React.memo로 감쌈
const MemoizedChild = React.memo(() => {
  console.log('자식 컴포넌트 렌더링')
  return <div>자식 컴포넌트</div>
})

export default function MemoChildrenDemo() {
  const [count, setCount] = useState(0)

  // ➊ useMemo를 사용해 자식 엘리먼트를 메모이제이션
  const memoizedChild = useMemo(() => <MemoizedChild />, [])

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>
        리렌더 트리거 (count: {count})
      </button>

      <MemoizedParent>
        {/* ➋ 메모이제이션된 엘리먼트를 children으로 전달 */}
        {memoizedChild}
      </MemoizedParent>
    </div>
  )
}


// 매 렌더링 시, React.createElement(MemoizedChild)가 호출되어 새로운 객체를 생성
React.createElement(
  MemoizedParent,
  {
    children: React.createElement(MemoizedChild) // 이 부분이 매번 새로운 객체
  }
)