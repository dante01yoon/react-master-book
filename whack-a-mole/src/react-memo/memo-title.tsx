import React, { useState } from 'react'
import { ChevronRight, MoreHorizontal } from 'lucide-react'

// ➊ props로 title만 받는 간단한 자식 컴포넌트
const TitleComponent = ({ title }: { title: string }) => {
  // 렌더링이 발생할 때마다 콘솔에 로그 출력
  console.log(`${title} 렌더링`)
  return <h4 className="text-lg font-bold">{title}</h4>
}

// ➋ React.memo로 감싼 자식 컴포넌트
const MemoizedTitleComponent = React.memo(({ title }: { title: string }) => {
  // 렌더링이 발생할 때마다 콘솔에 로그 출력
  console.log(`${title} (메모이즈) 렌더링`)
  return <h4 className="text-lg font-bold">{title}</h4>
})

// 부모 컴포넌트
export const MemoExample = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <button
        onClick={() => setCount((c) => c + 1)}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        카운트 증가: {count}
      </button>

      <hr />

      {/* ➌ 부모가 리렌더링될 때마다 함께 렌더링됨 */}
      <TitleComponent title="일반 타이틀" />

      {/* ➍ 부모가 리렌더링되어도 props가 그대로이므로 첫 렌더링 이후에는 렌더링되지 않음 */}
      <MemoizedTitleComponent title="메모이즈된 타이틀" />
    </div>
  )
}