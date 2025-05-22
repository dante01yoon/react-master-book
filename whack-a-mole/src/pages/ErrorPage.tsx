import ErrorBoundary from "@/components/ErrorBoundary";
import SignSpinner from "@/components/SignSpinner";

// 사용 예시를 위한 임시 App 컴포넌트
const App = () => {
  // 의도적으로 에러를 발생시키는 로직 (테스트용)
  if (Math.random() > 0.5) {
    throw new Error("App 컴포넌트에서 예기치 않은 에러 발생!");
  }
  return <div>애플리케이션의 주요 내용</div>;
};

const ErrorPage = () => {
  return (
    <ErrorBoundary
      // ➊ 에러 발생 시 표시할 컴포넌트
      fallbackRender={({ error, resetErrorBoundary }) => (
        <SignSpinner error={error} resetErrorBoundary={resetErrorBoundary} />
      )}
      // ➋ 에러 리셋 시 호출될 콜백
      onReset={() => console.log("ErrorBoundary가 리셋되었습니다.")}
      // ➌ 에러 발생 시 호출될 콜백
      onError={(error, info) => {
        console.error("ErrorBoundary에서 에러 감지:", error);
        console.error("에러 정보:", info.componentStack);
        // 이곳에서 Sentry 등의 외부 서비스로 에러를 로깅할 수 있음
        // logErrorToService(error, info);
      }}
    >
      {/* ➍ 실제 애플리케이션 컴포넌트 */}
      <App />
    </ErrorBoundary>
  )
}

export default ErrorPage;