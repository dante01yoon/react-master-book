import React, { useState } from 'react';

/**
 * 이벤트 버블링 및 캡처링 예제
 * 
 * 이 컴포넌트는 React에서 이벤트 버블링과 캡처링 단계가 어떻게 작동하는지,
 * 그리고 합성 이벤트 시스템에서 이를 어떻게 제어할 수 있는지 보여줍니다.
 */
function EventBubblingExample() {
  // 이벤트 로그를 저장할 상태
  const [logs, setLogs] = useState<string[]>([]);
  // 캡처 단계 활성화 여부
  const [captureEnabled, setCaptureEnabled] = useState(false);
  // 버블링 중지 여부
  const [stopPropagation, setStopPropagation] = useState(false);
  
  // 로그 추가 함수
  const addLog = (message: string) => {
    setLogs(prev => [...prev, message]);
  };
  
  // 로그 초기화 함수
  const clearLogs = () => {
    setLogs([]);
  };
  
  // 이벤트 핸들러 생성 함수
  const createEventHandler = (elementName: string, phase: 'bubble' | 'capture') => {
    return (event: React.MouseEvent<HTMLElement>) => {
      // currentTarget은 이벤트 핸들러가 연결된 요소
      // target은 이벤트가 실제로 발생한 요소
      const isSameElement = event.currentTarget === event.target;
      
      addLog(
        `${elementName} (${phase}) - ` +
        `${isSameElement ? '직접 클릭됨' : '이벤트 전파됨'}`
      );
      
      // stopPropagation이 활성화된 경우, 자식 요소에서만 이벤트 전파 중지
      if (stopPropagation && elementName === 'Child' && phase === 'bubble') {
        event.stopPropagation();
        addLog('⛔ 이벤트 전파가 중지되었습니다');
      }
    };
  };
  
  return (
    <div className="event-bubbling-container">
      <h2>이벤트 버블링 & 캡처링 예제</h2>
      
      <div className="controls" style={{ marginBottom: '20px' }}>
        <label>
          <input
            type="checkbox"
            checked={captureEnabled}
            onChange={e => setCaptureEnabled(e.target.checked)}
          />
          캡처 단계 핸들러 활성화
        </label>
        
        <label style={{ marginLeft: '20px' }}>
          <input
            type="checkbox"
            checked={stopPropagation}
            onChange={e => setStopPropagation(e.target.checked)}
          />
          자식 요소에서 버블링 중지 (stopPropagation)
        </label>
        
        <button 
          onClick={clearLogs}
          style={{ marginLeft: '20px' }}
        >
          로그 초기화
        </button>
      </div>
      
      {/* 이벤트 버블링을 보여주기 위한 중첩된 요소들 */}
      <div
        className="grandparent"
        onClick={createEventHandler('GrandParent', 'bubble')}
        onClickCapture={captureEnabled ? createEventHandler('GrandParent', 'capture') : undefined}
        style={{
          padding: '30px',
          backgroundColor: '#f0f0f0',
          border: '2px solid #ccc',
          borderRadius: '8px'
        }}
      >
        GrandParent
        <div
          className="parent"
          onClick={createEventHandler('Parent', 'bubble')}
          onClickCapture={captureEnabled ? createEventHandler('Parent', 'capture') : undefined}
          style={{
            padding: '20px',
            margin: '20px',
            backgroundColor: '#e0e0e0',
            border: '2px solid #aaa',
            borderRadius: '8px'
          }}
        >
          Parent
          <div
            className="child"
            onClick={createEventHandler('Child', 'bubble')}
            onClickCapture={captureEnabled ? createEventHandler('Child', 'capture') : undefined}
            style={{
              padding: '10px',
              margin: '20px',
              backgroundColor: '#d0d0d0',
              border: '2px solid #888',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Child (이 요소를 클릭하세요)
          </div>
        </div>
      </div>
      
      {/* 이벤트 로그 출력 */}
      <div className="event-logs" style={{ marginTop: '20px' }}>
        <h3>이벤트 로그</h3>
        <div
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            maxHeight: '200px',
            overflowY: 'auto',
            backgroundColor: '#f9f9f9',
            fontFamily: 'monospace'
          }}
        >
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <div key={index} style={{ margin: '5px 0' }}>
                {log}
              </div>
            ))
          ) : (
            <div>Child 요소를 클릭하여 이벤트 흐름을 확인하세요.</div>
          )}
        </div>
      </div>
      
      <div className="explanation" style={{ marginTop: '30px', fontSize: '14px' }}>
        <h3>이벤트 버블링과 캡처링 이해하기</h3>
        <p>
          <strong>DOM 이벤트 흐름의 3단계:</strong>
        </p>
        <ol>
          <li><strong>캡처 단계(Capture Phase)</strong>: 이벤트가 최상위 요소에서 시작하여 이벤트 타겟까지 내려갑니다.</li>
          <li><strong>타겟 단계(Target Phase)</strong>: 이벤트가 실제 타겟 요소에 도달합니다.</li>
          <li><strong>버블링 단계(Bubbling Phase)</strong>: 이벤트가 타겟에서 시작하여 최상위 조상 요소까지 올라갑니다.</li>
        </ol>
        
        <p>
          <strong>React에서의 이벤트 처리:</strong>
        </p>
        <ul>
          <li>일반 이벤트 핸들러(onClick)는 버블링 단계에서 실행됩니다.</li>
          <li>캡처 단계 핸들러(onClickCapture)는 캡처 단계에서 실행됩니다.</li>
          <li>event.stopPropagation()은 이벤트 전파를 중지시킵니다.</li>
          <li>event.nativeEvent.stopImmediatePropagation()은 같은 요소의 다른 핸들러 실행도 중지시킵니다.</li>
        </ul>
        
        <p>
          React 17부터 이벤트 위임 방식이 변경되어, 모든 이벤트가 document 대신 React 트리의 루트 DOM 컨테이너에 연결됩니다.
          이는 여러 React 애플리케이션이 한 페이지에 있을 때 이벤트 간섭을 줄이는 데 도움이 됩니다.
        </p>
      </div>
    </div>
  );
}

export default EventBubblingExample; 