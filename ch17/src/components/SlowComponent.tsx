import { Suspense } from "react";

const SlowComponent = () => {
  return (
    <div className="slow-component p-6 rounded-lg shadow-lg">
      {/* ➊ 다운로드 받는데 오래 걸리는 slow.css */}
      <link rel="stylesheet" href="/slow.css" precedence="default" />
      <h2 className="text-xl font-bold mb-4 fancy-title">
        Slow Loading Component
      </h2>
      <p className="fancy-text">
        이 텍스트는 CSS가 다운로드될 때까지 보여지지 않습니다.
      </p>
    </div>
 )
}

const App = () => {
  return (
    // ➋ slow.css가 다운받아지기 전까지 대체 UI가 보여짐
    <Suspense fallback={<Spinnner/> }>
      <SlowComponent />
    </Suspense>
  )
}

export default App;
