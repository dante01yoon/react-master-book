import ErrorBoundary from "./ErrorBoundary";
import SignSpinner from "./SignSpinner";

// ➊ ThrowError 컴포넌트: 의도적으로 에러를 발생시키는 컴포넌트
const ThrowError = ({ message }: { message: string }) => {
  // 이 컴포넌트가 렌더링될 때 에러를 발생시킴
  throw new Error(message);
};

// ➋ ComponentC: 자체 ErrorBoundary를 가지고 있으며, ThrowError 컴포넌트를 자식으로 가짐
const ComponentC = () => (
  <ErrorBoundary
    fallbackRender={({ error, resetErrorBoundary }) => (
      // ComponentC의 에러 바운더리가 잡은 에러를 표시하는 fallback UI
      <div style={{ border: '1px solid orange', padding: '10px', margin: '5px' }}>
        <p>Component C 내부 에러:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>C에서 재시도</button>
      </div>
    )}
  >
    <div style={{ padding: '10px', border: '1px dashed blue' }}>
      <h3>Component C</h3>
      {/* ThrowError 컴포넌트가 여기서 에러를 발생시킴 */}
      <ThrowError message="Error thrown from Component C's child (ThrowError)" />
    </div>
  </ErrorBoundary>
);

// ➌ ComponentB: 자체 ErrorBoundary를 가지고 있으며, ComponentC를 자식으로 가짐
const ComponentB = () => (
  <ErrorBoundary
    fallbackRender={({ error, resetErrorBoundary }) => (
      // ComponentB의 에러 바운더리가 잡은 에러를 표시하는 fallback UI
      // 이 예제에서는 ComponentC의 에러 바운더리가 먼저 에러를 처리하므로, 이 fallback은 실행되지 않음
      <div style={{ border: '1px solid green', padding: '10px', margin: '5px' }}>
        <p>Component B 내부 에러:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>B에서 재시도</button>
      </div>
    )}
  >
    <div style={{ padding: '10px', border: '1px dashed green' }}>
      <h3>Component B</h3>
      <ComponentC />
    </div>
  </ErrorBoundary>
);

// ➍ ComponentA: 자체 ErrorBoundary를 가지고 있으며, ComponentB를 자식으로 가짐
const ComponentA = () => (
  <ErrorBoundary
    fallbackRender={({ error, resetErrorBoundary }) => (
      // ComponentA의 에러 바운더리가 잡은 에러를 표시하는 fallback UI
      // 이 예제에서는 ComponentC의 에러 바운더리가 먼저 에러를 처리하므로, 이 fallback은 실행되지 않음
      <div style={{ border: '1px solid purple', padding: '10px', margin: '5px' }}>
        <p>Component A 내부 에러:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>A에서 재시도</button>
      </div>
    )}
  >
    <div style={{ padding: '10px', border: '1px dashed purple' }}>
      <h3>Component A</h3>
      <ComponentB />
    </div>
  </ErrorBoundary>
);

// App 컴포넌트: 최상위 ErrorBoundary를 가지고 있으며, ComponentA를 자식으로 가짐
const App = () => (
  <ErrorBoundary
    // resetErrorBoundary 함수를 reset이라는 별칭으로 사용함
    fallbackRender={({ error, resetErrorBoundary: reset }) => (
      <SignSpinner error={error} resetErrorBoundary={reset} />
    )}
  >
    <h1>에러 전파 예제</h1>
    <ComponentA />
  </ErrorBoundary>
);

export default App;