import React, { useState } from 'react';

/**
 * 이 컴포넌트는 Vite의 사전 번들링 없이 lodash-es를 직접 가져올 때의 잠재적 성능 문제를 보여줍니다.
 * 
 * 이것은 교육 목적으로만 사용되는 예제로, 사전 번들링 기능이 있는 Vite 개발 서버 내에서 실행되기 때문에
 * 실제로는 성능 문제가 보이지 않습니다. 대신, 실제 사전 번들링 없는 동작을 시뮬레이션합니다.
 * 
 * 직접적인 비교를 위해 별도의 데모 HTML 파일도 제공합니다.
 */
const NoPrebundlingExample = () => {
  const [visualizationStarted, setVisualizationStarted] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const maxRequests = 600;
  const requestsPerBatch = 20;
  const batchInterval = 20; // 밀리초

  // HTTP 요청 시뮬레이션 시작
  const startVisualization = () => {
    if (visualizationStarted) return;
    
    setVisualizationStarted(true);
    setRequestCount(0);
    setSimulationComplete(false);
    
    let currentCount = 0;
    
    // 요청 일괄 처리 시뮬레이션
    const simulateRequestBatch = () => {
      for (let i = 0; i < requestsPerBatch; i++) {
        if (currentCount >= maxRequests) {
          setSimulationComplete(true);
          return;
        }
        currentCount++;
        setRequestCount(currentCount);
      }
      
      if (currentCount < maxRequests) {
        setTimeout(simulateRequestBatch, batchInterval);
      } else {
        setSimulationComplete(true);
      }
    };
    
    // 첫 번째 일괄 처리 시작
    simulateRequestBatch();
  };

  return (
    <div className="no-prebundling-example">
      <h2>사전 번들링 없는 예제</h2>
      
      {/* 데모 배너 섹션 */}
      <div className="demo-banner" style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <h3>대화형 데모 사용 가능:</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <a 
            href="/real-imports-demo.html" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '10px 15px',
              backgroundColor: '#4CAF50',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: 'bold'
            }}
          >
            직접 lodash-es 임포트 데모
          </a>
          <a 
            href="/no-bundling-demo.html" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '10px 15px',
              backgroundColor: '#2196F3',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: 'bold'
            }}
          >
            시뮬레이션된 요청 데모
          </a>
        </div>
        <p>
          실제 요청을 보려면 <strong>직접 lodash-es 임포트 데모</strong>를 클릭하거나, 
          600개 이상의 HTTP 요청 시뮬레이션을 보려면 <strong>시뮬레이션된 요청 데모</strong>를 사용하세요.
        </p>
      </div>

      {/* 문제 설명 섹션 */}
      <div className="problem-explanation" style={{ marginBottom: '30px' }}>
        <h3>사전 번들링 없는 경우의 문제:</h3>
        <p>
          lodash-es와 같은 모듈화된 ESM 라이브러리는 여러 개의 작은 파일로 구성되어 있습니다. 
          Vite의 사전 번들링 없이 이러한 라이브러리를 가져올 경우 다음과 같은 일이 발생합니다:
        </p>
        <ul>
          <li>단일 함수(예: debounce)를 가져와도 수백 개의 HTTP 요청이 발생합니다</li>
          <li>debounce가 다른 lodash 기능을 내부적으로 사용하면 이들도 로드되어야 합니다</li>
          <li>각 내부 모듈은 단일 파일로 포함됩니다</li>
          <li>네트워크 혼잡으로 페이지 로딩 시간이 크게 늘어납니다</li>
        </ul>
      </div>

      {/* 비교 섹션 */}
      <div className="comparison-section" style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div className="with-prebundling" style={{ 
          padding: '15px', 
          backgroundColor: '#e8f5e9', 
          borderRadius: '8px'
        }}>
          <h3>사전 번들링 사용 시:</h3>
          <div className="icon" style={{ fontSize: '40px', marginBottom: '10px' }}>✅</div>
          <ul>
            <li>모든 lodash-es 모듈이 단일 파일로 번들링됨</li>
            <li>브라우저가 관리해야 할 파일 하나</li>
            <li>HTTP 요청 하나만 필요</li>
            <li>빠른 로딩 시간</li>
            <li>네트워크 혼잡 없음</li>
          </ul>
        </div>
        
        <div className="without-prebundling" style={{ 
          padding: '15px', 
          backgroundColor: '#ffebee', 
          borderRadius: '8px'
        }}>
          <h3>사전 번들링 없을 시:</h3>
          <div className="icon" style={{ fontSize: '40px', marginBottom: '10px' }}>❌</div>
          <ul>
            <li>개별 모듈이 별도의 파일로 로드됨</li>
            <li>브라우저가 수백 개의 파일을 관리</li>
            <li>600개 이상의 HTTP 요청 발생</li>
            <li>느린 로딩 시간</li>
            <li>브라우저 측 네트워크 혼잡</li>
          </ul>
        </div>
      </div>

      {/* 네트워크 요청 시각화 섹션 */}
      <div className="network-visualization" style={{ marginBottom: '30px' }}>
        <h3>네트워크 요청 시각화:</h3>
        <p>
          lodash-es를 사전 번들링 없이 불러올 때 발생하는 600개 이상의 HTTP 요청을 시뮬레이션합니다. 
          이는 페이지 로딩 시간을 크게 늘립니다.
        </p>
        
        <button 
          onClick={startVisualization}
          disabled={visualizationStarted && !simulationComplete}
          style={{
            padding: '10px 15px',
            backgroundColor: visualizationStarted && !simulationComplete ? '#ccc' : '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: visualizationStarted && !simulationComplete ? 'not-allowed' : 'pointer',
            marginBottom: '15px'
          }}
        >
          {visualizationStarted && !simulationComplete 
            ? '시뮬레이션 중...' 
            : simulationComplete 
              ? '시뮬레이션 다시 시작' 
              : 'HTTP 요청 시뮬레이션 시작'}
        </button>
        
        <div className="progress-container" style={{ 
          width: '100%', 
          backgroundColor: '#e0e0e0', 
          borderRadius: '4px',
          height: '24px',
          position: 'relative',
          marginBottom: '10px'
        }}>
          <div 
            className="progress-bar" 
            style={{ 
              width: `${(requestCount / maxRequests) * 100}%`, 
              backgroundColor: '#f44336',
              height: '100%',
              borderRadius: '4px',
              transition: 'width 0.3s ease'
            }}
          ></div>
          <div 
            className="progress-label" 
            style={{ 
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: requestCount > maxRequests / 2 ? 'white' : 'black',
              fontWeight: 'bold'
            }}
          >
            {requestCount} / {maxRequests} 요청
          </div>
        </div>
        
        <div className="request-visualization" style={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2px'
        }}>
          {Array.from({ length: maxRequests }).map((_, index) => (
            <div 
              key={index}
              style={{ 
                width: '12px', 
                height: '12px', 
                backgroundColor: index < requestCount ? '#f44336' : '#e0e0e0',
                borderRadius: '2px',
                transition: 'background-color 0.1s ease'
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* 시각적 비교 섹션 */}
      <div className="visual-comparison">
        <h3>시각적 비교:</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div className="comparison-item" style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <div style={{ flex: '0 0 200px', fontWeight: 'bold' }}>Vite 사전 번들링 사용:</div>
            <div className="with-prebundling-visual" style={{ 
              height: '30px',
              backgroundColor: '#4CAF50',
              borderRadius: '4px',
              width: '50px',
              position: 'relative'
            }}>
              <span style={{ 
                position: 'absolute', 
                left: '60px', 
                top: '5px'
              }}>
                단일 HTTP 요청 (1개)
              </span>
            </div>
          </div>
          
          <div className="comparison-item" style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <div style={{ flex: '0 0 200px', fontWeight: 'bold' }}>사전 번들링 없음:</div>
            <div className="without-prebundling-visual" style={{ 
              height: '30px',
              backgroundColor: '#f44336',
              borderRadius: '4px',
              width: '100%',
              position: 'relative'
            }}>
              <span style={{ 
                position: 'absolute', 
                left: '15px', 
                top: '5px',
                color: 'white'
              }}>
                600+ HTTP 요청
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoPrebundlingExample; 