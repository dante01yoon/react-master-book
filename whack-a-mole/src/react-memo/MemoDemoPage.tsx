import { BreadcrumbPage } from "./memo"
import PrimeCounterDemo from "./memo-performance"
import CanvasPerformanceDemo from "./memo-canvas-performance"

// memo 관련 예시들을 한 페이지에서 보기 좋게 섹션별로 나눈 단일 데모 페이지 컴포넌트
export default function MemoDemoPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-12">
      {/* 브레드크럼 예시 섹션 */}
      <section>
        <h2 className="text-xl font-bold mb-2">BreadcrumbPage (React.memo 활용 예시)</h2>
        <p className="text-gray-600 mb-4">React.memo를 활용한 브레드크럼 UI 예시. 경로가 많을 때 중간을 ...으로 생략함.</p>
        <div className="bg-white rounded shadow p-4">
          <BreadcrumbPage paths={["Home", "whack-a-mole", "Components", "Breadcrumb"]} maxItems={3} />
        </div>
      </section>
      <hr className="my-8 border-gray-200" />
      {/* 대량 배열 소수 판별 예시 섹션 */}
      <section>
        <h2 className="text-xl font-bold mb-2">대량 배열의 소수 판별 및 카운트</h2>
        <p className="text-gray-600 mb-4">렌더링마다 무거운 연산이 발생하는 컴포넌트에서 React.memo 적용 전/후의 성능 차이를 확인할 수 있음.</p>
        <div className="bg-white rounded shadow p-4">
          <PrimeCounterDemo />
        </div>
      </section>
      <hr className="my-8 border-gray-200" />
      {/* 캔버스 노이즈 예시 섹션 */}
      <section>
        <h2 className="text-xl font-bold mb-2">캔버스 랜덤 노이즈 이미지</h2>
        <p className="text-gray-600 mb-4">캔버스에 매 렌더링마다 무거운 이미지 연산이 발생하는 예시. React.memo 적용 전/후의 효과를 확인할 수 있음.</p>
        <div className="bg-white rounded shadow p-4">
          <CanvasPerformanceDemo />
        </div>
      </section>
    </div>
  )
} 