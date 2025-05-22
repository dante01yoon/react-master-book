import { Component, ErrorInfo, PropsWithChildren, ReactNode } from "react";

// ➊ ErrorBoundary 컴포넌트가 관리하는 상태 타입 정의.
type ErrorBoundaryState = {
  hasError: boolean; // 에러 발생 여부를 나타내는 boolean 값.
  error: Error | null; // 발생한 에러 객체
};

// ➋ 에러 발생 시 fallback UI를 렌더링하는 함수 또는 컴포넌트에 전달될 props 타입 정의.
export type FallbackProps = {
  error: Error; // 발생한 에러 객체
  resetErrorBoundary: () => void; // 에러 상태를 초기화하고 컴포넌트를 다시 렌더링하도록 시도하는 함수.
};

/**
 * ErrorBoundary 컴포넌트의 props 타입 정의.
 * PropsWithChildren: children prop을 기본적으로 포함함.
 * fallbackRender: 에러 발생 시 렌더링할 함수. FallbackProps를 인자로 받음.
 * FallbackComponent: 에러 발생 시 렌더링할 React 컴포넌트. FallbackProps를 props로 받음.
 * onReset: resetErrorBoundary 함수가 호출될 때 실행될 콜백 함수 (선택 사항).
 * onError: 에러가 감지되었을 때 호출될 콜백 함수 (선택 사항). componentDidCatch에서 호출됨.
 */
type ErrorBoundaryProps = PropsWithChildren<{
  fallbackRender?: (props: FallbackProps) => ReactNode;
  FallbackComponent?: React.ComponentType<FallbackProps>;
  onReset?: () => void; // 에러 상태 초기화 시 추가 작업 수행을 위한 콜백
  onError?: (error: Error, info: ErrorInfo) => void; // 에러 로깅 등을 위한 콜백
}>;

/**
 * 자식 컴포넌트에서 발생하는 렌더링 에러를 감지하고,
 * 사용자 정의 fallback UI를 보여주거나 에러 정보를 로깅할 수 있는 에러 바운더리 컴포넌트.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    // 초기 상태는 에러가 없는 상태로 설정함
    this.state = { error: null, hasError: false };
  }

  /**
   * ➌ 하위 컴포넌트에서 에러가 발생했을 때 호출되는 정적 생명주기 메서드.
   * 이 메서드는 렌더링 단계에서 호출되므로 부수 효과(side effects)를 발생시키면 안 됨.
   * 발생한 에러를 기반으로 ErrorBoundary의 상태를 업데이트하여 다음 렌더링에서 fallback UI를 표시하도록 함.
   * @param error 발생한 에러 객체
   * @returns 업데이트할 새로운 상태 객체 또는 null
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // 다음 렌더링에서 fallback UI가 보이도록 상태를 업데이트함
    return { error, hasError: true };
  }

  /**
   * ➍ 하위 컴포넌트에서 에러가 발생하여 getDerivedStateFromError가 호출된 후, 커밋 단계에서 호출되는 생명주기 메서드.
   * 이 메서드에서는 부수 효과(side effects)가 허용됨 (예: 에러 리포팅 서비스에 로그 전송).
   * @param error 발생한 에러 객체
   * @param errorInfo 에러를 발생시킨 컴포넌트 스택 정보를 포함하는 객체
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // props로 전달된 onError 콜백이 있다면 호출하여 에러 정보를 전달함
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    // 예: Sentry, DataDog 같은 외부 에러 모니터링 서비스에 에러 정보 전송
    // reportErrorToService(error, errorInfo);
  }

  /**
   * ➎ 에러 상태를 초기화하는 메서드.
   * 이 메서드는 fallback UI에 전달되어 사용자가 에러 상태를 리셋하고
   * 다시 시도할 수 있도록 하는 기능을 제공함.
   */
  resetErrorBoundary = () => {
    // props로 전달된 onReset 콜백이 있다면 호출함
    if (this.props.onReset) {
      this.props.onReset();
    }
    // 에러 상태를 초기화함
    this.setState({ error: null, hasError: false });
  };

  /**
   * ➏ 컴포넌트의 UI를 렌더링하는 메서드.
   * 에러 상태(this.state.hasError)에 따라 자식 컴포넌트 또는 fallback UI를 렌더링함.
   * @returns 렌더링할 React 엘리먼트
   */
  render() {
    const { fallbackRender, FallbackComponent, children } = this.props;
    const { hasError, error } = this.state;

    if (hasError && error) {
      // 에러가 발생한 경우 fallback UI를 렌더링함
      const fallbackProps: FallbackProps = {
        error,
        resetErrorBoundary: this.resetErrorBoundary,
      };

      // 1. FallbackComponent prop이 제공되면 해당 컴포넌트를 렌더링함
      if (FallbackComponent) {
        return <FallbackComponent {...fallbackProps} />;
      }
      // 2. fallbackRender prop이 제공되면 해당 함수를 호출하여 결과를 렌더링함
      if (fallbackRender) {
        return fallbackRender(fallbackProps);
      }
      // 3. 위 두 가지 prop이 모두 없다면, 기본적인 fallback UI를 렌더링함
      return (
        <div>
          <h2>문제가 발생했습니다.</h2>
          <p>{error.message}</p>
          <button type="button" onClick={this.resetErrorBoundary}>
            다시 시도
          </button>
        </div>
      );
    }

    // ➐ 에러가 없는 경우 자식 컴포넌트를 정상적으로 렌더링함
    return children;
  }
}

export default ErrorBoundary; 