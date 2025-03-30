import { useState } from 'react';
import App from './App';
import OptimizedApp from './OptimizedApp';
import './ComparisonPage.css';

function ComparisonPage() {
  const [showOptimized, setShowOptimized] = useState(false);
  
  return (
    <div className="comparison-container">
      <header className="comparison-header">
        <h1>React-Scan 데모</h1>
        <p>
          이 데모는 react-scan이 React 애플리케이션의 성능 문제를 식별하고 해결하는 데 어떻게 도움이 되는지 보여줍니다.
          최적화되지 않은 버전과 최적화된 버전 사이를 전환하여 차이점을 확인하세요.
        </p>
        <div className="toggle-container">
          <button 
            className={!showOptimized ? 'active' : ''} 
            onClick={() => setShowOptimized(false)}
          >
            최적화되지 않은 버전
          </button>
          <button 
            className={showOptimized ? 'active' : ''} 
            onClick={() => setShowOptimized(true)}
          >
            최적화된 버전
          </button>
        </div>
        <div className="explanation">
          <h3>성능 문제:</h3>
          <ul>
            <li>카운터 상태 변경으로 인한 불필요한 리렌더링</li>
            <li>모든 렌더링에서 발생하는 무거운 계산</li>
            <li>파생 상태에 대한 메모이제이션 누락</li>
            <li>비효율적인 데이터 처리 패턴</li>
          </ul>
          {showOptimized && (
            <>
              <h3>적용된 최적화:</h3>
              <ul>
                <li>불필요한 컴포넌트 리렌더링 방지를 위한 React.memo</li>
                <li>비용이 많이 드는 계산을 위한 useMemo</li>
                <li>이벤트 핸들러를 위한 useCallback</li>
                <li>단일 패스를 사용한 최적화된 데이터 처리</li>
              </ul>
            </>
          )}
          <div className="instructions">
            <p>렌더링 횟수를 확인하려면 브라우저 콘솔을 열고, 렌더링을 시각화하려면 react-scan 오버레이를 확인하세요.</p>
          </div>
        </div>
      </header>
      <main className="app-container">
        {showOptimized ? <OptimizedApp /> : <App />}
      </main>
    </div>
  );
}

export default ComparisonPage; 