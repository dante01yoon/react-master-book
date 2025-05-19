import React, { useState } from "react"

// 소수 판별 함수 (비효율적 방식, 실무에서는 더 최적화할 수 있음)
function isPrime(n: number): boolean {
  if (n < 2) return false
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false
  }
  return true
}

// 대량 배열에서 소수 개수를 세는 무거운 연산 컴포넌트
function PrimeCounter({ max }: { max: number }) {
  // 1부터 max까지의 숫자 중 소수 개수를 세는 연산을 매 렌더링마다 수행함
  const count = React.useMemo(() => {
    let primeCount = 0
    for (let i = 1; i <= max; i++) {
      if (isPrime(i)) primeCount++
    }
    return primeCount
  }, [max])

  // 실제 연산 시간 측정 (성능 테스트용)
  // const t0 = performance.now()
  // ...연산...
  // const t1 = performance.now()
  // console.log(`소수 개수 연산 시간: ${t1 - t0}ms`)

  return (
    <div className="p-4 border rounded bg-gray-50 mt-4">
      <div className="font-semibold">1부터 {max}까지의 소수 개수: {count}개</div>
      {/* 렌더링마다 무거운 연산이 발생함을 보여줌 */}
    </div>
  )
}

// PrimeCounter를 React.memo로 감싼 최적화 버전
const MemoizedPrimeCounter = React.memo(PrimeCounter)

// 부모 컴포넌트: 상태 변경 시 자식이 불필요하게 리렌더링되는 상황을 시뮬레이션함
export default function PrimeCounterDemo() {
  const [max, setMax] = useState(100000)
  const [count, setCount] = useState(0)

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold">대량 배열의 소수 판별 및 카운트 성능 테스트</h2>
      <div className="flex items-center gap-2">
        <label htmlFor="max" className="font-medium">최대값:</label>
        <input
          id="max"
          type="number"
          value={max}
          onChange={e => setMax(Number(e.target.value))}
          className="border rounded px-2 py-1 w-32"
        />
        <button
          onClick={() => setCount(c => c + 1)}
          className="ml-4 px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          부모 상태 변경
        </button>
        <span className="text-sm text-gray-500">(PrimeCounter가 불필요하게 리렌더링되는지 확인)</span>
      </div>
      {/* 최적화 전 */}
      <div>
        <div className="mb-2 font-semibold text-red-600">최적화 전 (React.memo 미적용)</div>
        <PrimeCounter max={max} />
      </div>
      {/* 최적화 후 */}
      <div>
        <div className="mb-2 font-semibold text-green-600">최적화 후 (React.memo 적용)</div>
        <MemoizedPrimeCounter max={max} />
      </div>
    </div>
  )
} 