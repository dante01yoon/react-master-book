import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ComponentWithReact19 from './components/ComponentWithReact19';
import SlowComponent from './components/SlowComponent';
import InversionOfControl from './components/InversionOfControl';
import BubbleGenerator from './components/BubbleGenerator';
import TearingExampleApp from './components/TearingExampleApp';

// 코드 스플리팅을 위해 lazy import 사용
const CarrotPriceChartEffectApp = lazy(() => import('./components/CarrotPriceChartEffect'));
const CarrotPriceChartLayoutEffectApp = lazy(() => import('./components/CarrotPriceChartLayoutEffect'));

// Home 컴포넌트는 간단한 안내 메시지만 표시하도록 수정
const Home = () => {
  return (
    <div>
      <h2>리액트 동시성 기능과 심화 훅 예제</h2>
      <p>상단 네비게이션 링크를 통해 각 차트 예제를 확인하세요.</p>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', gap: '10px' }}>
            <li>
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/effect-chart">useEffect 차트</Link>
            </li>
            <li>
              <Link to="/layout-effect-chart">useLayoutEffect 차트</Link>
            </li>
            <li>
              <Link to="/slow-component">Slow Component</Link>
            </li>
            <li>
              <Link to="/ioc">Inversion of Control</Link>
            </li>
            <li>
              <Link to="/bubble-generator">Bubble Generator</Link>
            </li>
            <li>
              <Link to="/tearing-example">Tearing Example</Link>
            </li>
          </ul>
        </nav>

        <hr />
        <ComponentWithReact19 product={{
          id: 1,
          name: '리액트 19 당근',
          description: '당근은 비타민 A와 섬유소가 풍부한 식품입니다.'
        }} />
        <Suspense fallback={<div>로딩 중...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/effect-chart" element={<CarrotPriceChartEffectApp />} />
            <Route path="/layout-effect-chart" element={<CarrotPriceChartLayoutEffectApp />} />
            <Route path="/slow-component" element={<SlowComponent />} />
            <Route path="/ioc" element={<InversionOfControl />} />
            <Route path="/bubble-generator" element={<BubbleGenerator />} />
            <Route path="/tearing-example" element={<TearingExampleApp />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}


// const something = "리액트";
// {/* ➊ 잘못 작성된 경우 */}
// <title>title {something}</title> // <- 잘못 작성된 경우
// {/* ➋ 올바르게 작성된 경우 */}
// <title>{`title ${something}`}</title> // <- 올바르게 작성된 경우
