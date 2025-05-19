import React, { useRef, useEffect, useState } from "react"

// 캔버스에 랜덤 노이즈 이미지를 그리는 컴포넌트
function NoiseCanvas({ width, height }: { width: number; height: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // 랜덤 픽셀 데이터 생성 및 캔버스에 그리기
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const imageData = ctx.createImageData(width, height)
    for (let i = 0; i < imageData.data.length; i += 4) {
      // 각 픽셀의 R,G,B 값을 랜덤으로 지정, A(불투명도)는 255
      imageData.data[i] = Math.random() * 255 // R
      imageData.data[i + 1] = Math.random() * 255 // G
      imageData.data[i + 2] = Math.random() * 255 // B
      imageData.data[i + 3] = 255 // A
    }
    ctx.putImageData(imageData, 0, 0)
  }) // 매 렌더링마다 실행

  return (
    <div className="p-4 border rounded bg-gray-50 mt-4">
      <canvas ref={canvasRef} width={width} height={height} className="block border" />
      <div className="mt-2 text-sm text-gray-500">매 렌더링마다 랜덤 노이즈 이미지를 그림</div>
    </div>
  )
}

// NoiseCanvas를 React.memo로 감싼 최적화 버전
const MemoizedNoiseCanvas = React.memo(NoiseCanvas)

// 부모 컴포넌트: 상태 변경 시 자식이 불필요하게 리렌더링되는 상황을 시뮬레이션함
export default function CanvasPerformanceDemo() {
  const [count, setCount] = useState(0)
  const [size, setSize] = useState(400)

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold">캔버스 랜덤 노이즈 이미지 성능 테스트</h2>
      <div className="flex items-center gap-2">
        <label htmlFor="size" className="font-medium">캔버스 크기(px):</label>
        <input
          id="size"
          type="number"
          value={size}
          min={50}
          max={1000}
          onChange={e => setSize(Number(e.target.value))}
          className="border rounded px-2 py-1 w-24"
        />
        <button
          onClick={() => setCount(c => c + 1)}
          className="ml-4 px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          부모 상태 변경
        </button>
        <span className="text-sm text-gray-500">(NoiseCanvas가 불필요하게 리렌더링되는지 확인)</span>
      </div>
      {/* 최적화 전 */}
      <div>
        <div className="mb-2 font-semibold text-red-600">최적화 전 (React.memo 미적용)</div>
        <NoiseCanvas width={size} height={size / 2} />
      </div>
      {/* 최적화 후 */}
      <div>
        <div className="mb-2 font-semibold text-green-600">최적화 후 (React.memo 적용)</div>
        <MemoizedNoiseCanvas width={size} height={size / 2} />
      </div>
    </div>
  )
} 