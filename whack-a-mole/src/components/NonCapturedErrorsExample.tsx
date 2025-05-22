import React, { useEffect, useState } from 'react';
import ErrorBoundary from './ErrorBoundary'; // 기존 ErrorBoundary 임포트

// ➍ useEffect에서 즉시 에러를 발생시키는 자식 컴포넌트
const ChildWithErrorOnMount = () => {
  useEffect(() => {
    // 이 에러는 렌더링 과정의 일부로 간주되어 ErrorBoundary에 의해 감지됨
    throw new Error("useEffect에서 즉시 발생한 동기적 에러 (감지됨)");
  }, []);
  return <p>이 컴포넌트는 마운트 시 즉시 에러를 발생시킵니다.</p>;
};

const NonCapturedErrorsExample = () => {
  const [showChildError, setShowChildError] = useState(false);

  // ➊ 이벤트 핸들러 내 에러 (ErrorBoundary에 감지되지 않음)
  const handleErrorInEventHandler = () => {
    try {
      console.log("이벤트 핸들러 에러 발생 시도...");
      throw new Error("이벤트 핸들러에서 발생한 에러 (감지 안됨)");
    } catch (e) {
      if (e instanceof Error) {
        console.error("💥 이벤트 핸들러 내부에서 직접 잡은 에러:", e.message);
        alert(`이벤트 핸들러 에러 (ErrorBoundary에 감지 안됨): ${e.message}`);
      }
    }
  };

  // ➋ fetch 비동기 에러 (ErrorBoundary에 감지되지 않음)
  const handleErrorInFetch = () => {
    console.log("fetch 비동기 에러 발생 시도...");
    fetch('/invalid-endpoint') // 존재하지 않는 엔드포인트
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP 에러! status: ${response.status} (감지 안됨)`);
        }
        return response.json();
      })
      .catch(e => {
        if (e instanceof Error) {
          console.error("💥 fetch().catch() 에서 잡은 에러:", e.message);
          alert(`fetch 비동기 에러 (ErrorBoundary에 감지 안됨): ${e.message}`);
        }
      });
  };

  // ➌ setTimeout 내 에러 (ErrorBoundary에 감지되지 않음)
  const handleErrorInSetTimeout = () => {
    console.log("setTimeout 에러 발생 시도...");
    setTimeout(() => {
      try {
        throw new Error("setTimeout 콜백에서 발생한 에러 (감지 안됨)");
      } catch (e) {
        if (e instanceof Error) {
          console.error("💥 setTimeout 내부 try/catch 에서 잡은 에러:", e.message);
          alert(`setTimeout 에러 (ErrorBoundary에 감지 안됨): ${e.message}`);
        }
      }
    }, 1000);
  };

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div style={{ border: '1px solid red', padding: '10px', margin: '10px' }}>
          <h2>🚫 ErrorBoundary가 에러를 감지했습니다!</h2>
          <p>이 에러는 주로 렌더링 중 또는 useEffect의 동기적 실행에서 발생합니다.</p>
          <pre>에러 메시지: {error.message}</pre>
          <button onClick={() => {
            setShowChildError(false); // 자식 컴포넌트 에러 상태 초기화
            resetErrorBoundary();
          }}>
            ErrorBoundary 리셋 및 재시도
          </button>
        </div>
      )}
    >
      <div>
        <h1>에러 바운더리 감지/비감지 예제</h1>
        <p>
          아래 버튼들은 다양한 상황에서 에러를 발생시킵니다. <br />
          브라우저 콘솔과 UI를 통해 ErrorBoundary가 어떤 에러를 감지하는지 확인해보세요.
        </p>

        <div style={{ margin: '10px 0', padding: '10px', border: '1px dashed gray' }}>
          <h3>1. 이벤트 핸들러 에러 (감지 ❌)</h3>
          <button onClick={handleErrorInEventHandler}>
            클릭 시 이벤트 핸들러 에러 발생
          </button>
          <p style={{ fontSize: '0.9em' }}>
            이벤트 핸들러 내에서 발생하는 에러는 React 렌더링 생명주기 외부이므로 ErrorBoundary가 감지하지 못합니다. (try/catch로 잡아야 함)
          </p>
        </div>

        <div style={{ margin: '10px 0', padding: '10px', border: '1px dashed gray' }}>
          <h3>2. 비동기 (fetch) 에러 (감지 ❌)</h3>
          <button onClick={handleErrorInFetch}>
            클릭 시 fetch 비동기 에러 발생
          </button>
          <p style={{ fontSize: '0.9em' }}>
            fetch와 같은 비동기 작업의 콜백에서 발생하는 에러는 ErrorBoundary가 감지하지 못합니다. (Promise의 .catch() 등으로 처리 필요)
          </p>
        </div>

        <div style={{ margin: '10px 0', padding: '10px', border: '1px dashed gray' }}>
          <h3>3. setTimeout 에러 (감지 ❌)</h3>
          <button onClick={handleErrorInSetTimeout}>
            클릭 시 setTimeout 에러 발생
          </button>
          <p style={{ fontSize: '0.9em' }}>
            setTimeout, setInterval 등의 타이머 콜백에서 발생하는 에러도 React 렌더링 생명주기 외부이므로 ErrorBoundary가 감지하지 못합니다. (try/catch로 잡아야 함)
          </p>
        </div>

        <div style={{ margin: '10px 0', padding: '10px', border: '1px dashed gray' }}>
          <h3>4. useEffect 내 동기적 에러 (감지 ✅)</h3>
          <button onClick={() => setShowChildError(true)}>
            자식 컴포넌트 마운트 (useEffect 에러 발생)
          </button>
          {showChildError && <ChildWithErrorOnMount />}
          <p style={{ fontSize: '0.9em' }}>
            useEffect 내에서 렌더링 직후 동기적으로 발생하는 에러는 ErrorBoundary가 감지할 수 있습니다.
          </p>
        </div>
        <p style={{ marginTop: '20px', fontSize: '0.8em', color: 'navy' }}>
          <strong>참고:</strong> '감지 ❌'로 표시된 에러들은 브라우저 콘솔에 에러 메시지가 출력되지만, ErrorBoundary의 fallback UI는 나타나지 않습니다.
          반면, '감지 ✅'는 ErrorBoundary의 fallback UI가 나타납니다.
        </p>
      </div>
    </ErrorBoundary>
  );
};

export default NonCapturedErrorsExample;