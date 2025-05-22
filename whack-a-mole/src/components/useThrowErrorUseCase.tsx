import React, { useState, Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";

// ➊ useThrowError 커스텀 훅: 렌더링 단계에서 에러를 발생시켜 ErrorBoundary가 감지하도록 함
export const useThrowError = () => {
  // _errorState는 직접 사용되지 않지만, setErrorState를 통해 에러를 발생시키는 역할을 함
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_errorState, setErrorState] = useState<Error | null>(null); // 타입 Error | null로 명시

  return (error: Error) => { // error 파라미터 타입 Error로 명시
    setErrorState(() => {
      throw error;
    });
  };
};

// useThrowError 훅 사용 예제 컴포넌트
const CarrotPriceUpdater = () => {
  // const [carrotData, setCarrotData] = useState({ price: 1000 }); // 예시 상태
  const throwErrorHook = useThrowError(); // ➋ 커스텀 훅 사용

  const handleUpdatePrice = () => {
    try {
      // 실제 데이터 업데이트 로직이 여기에 들어갈 수 있음
      // 예시를 위해 의도적으로 에러 발생
      console.log("당근 가격 업데이트 시도...");
      throw new Error("당근 가격 서버 통신 실패!");
    } catch (error) {
      if (error instanceof Error) {
        // ➌ 이벤트 핸들러에서 발생한 에러를 throwErrorHook을 통해 렌더링 에러로 전환
        throwErrorHook(error);
      } else {
        throwErrorHook(new Error("알 수 없는 에러 발생"));
      }
    }
  };

  return (
    <div>
      <h3>당근 가격 정보</h3>
      {/* <p>현재 가격: {carrotData.price}원</p> */}
      <button onClick={handleUpdatePrice}>가격 업데이트 (에러 발생시키기)</button>
    </div>
  );
};

export const AppWithUseThrowError = () => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div style={{ border: '1px solid red', padding: '10px', margin: '10px' }}>
          <h4>에러 발생! (useThrowError 예제)</h4>
          <p>에러 메시지: {error.message}</p>
          <button onClick={resetErrorBoundary}>재시도</button>
        </div>
      )}
    >
      <h1>useThrowError 커스텀 훅 예제</h1>
      <CarrotPriceUpdater />
    </ErrorBoundary>
  );
};

// ➍ React 19 'use' 훅을 사용한 비동기 데이터 로딩 및 에러 처리 예제
// fetchData 함수는 Promise를 반환하며, 의도적으로 에러를 발생시킬 수 있음
async function fetchData(shouldFail: boolean): Promise<string> {
  console.log(`fetchData 호출됨 (shouldFail: ${shouldFail})`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        console.log("fetchData: Promise reject 예정");
        reject(new Error("데이터 로딩 중 서버 에러 발생 (use 훅)"));
      } else {
        console.log("fetchData: Promise resolve 예정");
        resolve("서버로부터 데이터 로드 성공!");
      }
    }, 1500);
  });
}

// 'use' 훅을 사용하는 데이터 표시 컴포넌트
// 이 컴포넌트는 'use client' 환경 또는 Client Component 내부에서 사용되어야 함
// Next.js App Router에서는 파일 상단에 'use client' 지시어 필요
function DataComponentUsingUseHook({ fail }: { fail: boolean }) {
  // ➎ 'use' 훅은 Promise를 인자로 받아 그 결과를 반환함
  // Promise가 pending 상태일 때는 가장 가까운 Suspense의 fallback을 렌더링함
  // Promise가 reject되면, 에러는 동기적으로 발생한 것처럼 처리되어 ErrorBoundary에 잡힘
  try {
    console.log(`DataComponentUsingUseHook 렌더링 시도 (fail: ${fail})`);
    const message = React.use(fetchData(fail));
    console.log("DataComponentUsingUseHook: 데이터 수신 성공", message);
    return <p>{message}</p>;
  } catch (e) {
    // React.use에서 발생한 에러는 ErrorBoundary로 전파되므로,
    // 여기서의 catch는 일반적으로 ErrorBoundary에서 처리하기 전에 추가적인 로깅 등을 할 때 사용 가능
    // 하지만 대부분의 경우 ErrorBoundary가 처리하도록 두는 것이 일반적임
    console.error("DataComponentUsingUseHook 내부 catch:", e);
    throw e; // 에러를 다시 throw하여 ErrorBoundary가 잡도록 함
  }
}

export const AppWithUseHookOnError = () => {
  const [attemptKey, setAttemptKey] = useState(0); // 재시도를 위한 key
  const [shouldFailFetch, setShouldFailFetch] = useState(true); // 에러 발생 여부 제어

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div style={{ border: '1px solid green', padding: '10px', margin: '10px' }}>
          <h4>에러 발생! (React.use 예제)</h4>
          <p>에러 메시지: {error.message}</p>
          <button
            onClick={() => {
              setShouldFailFetch(true); // 다음 시도도 실패하도록 설정 (테스트용)
              setAttemptKey(prev => prev + 1); // key를 변경하여 컴포넌트 리마운트 유도
              resetErrorBoundary(); // ErrorBoundary 상태 리셋
            }}
          >
            재시도 (에러 발생)
          </button>
          <button
            onClick={() => {
              setShouldFailFetch(false); // 다음 시도는 성공하도록 설정
              setAttemptKey(prev => prev + 1);
              resetErrorBoundary();
            }}
          >
            재시도 (성공)
          </button>
        </div>
      )}
    >
      <h1>React 19 'use' 훅 에러 처리 예제</h1>
      <button onClick={() => setShouldFailFetch(prev => !prev)}>
        다음 데이터 요청 시 에러 발생 토글 ({shouldFailFetch ? "현재: 에러 발생" : "현재: 성공"})
      </button>
      {/* ➏ Suspense는 'use' 훅이 Promise를 기다리는 동안 보여줄 fallback UI를 정의함 */}
      <Suspense fallback={<p style={{ color: 'blue' }}>데이터 로딩 중... (Suspense fallback)</p>}>
        {/* key를 변경하여 DataComponentUsingUseHook을 강제로 리마운트시켜 재시도 로직 구현 */}
        <DataComponentUsingUseHook key={attemptKey} fail={shouldFailFetch} />
      </Suspense>
    </ErrorBoundary>
  );
};

// App.tsx 등에서 이 컴포넌트들을 사용하려면 아래와 같이 export 할 수 있습니다.
// export { AppWithUseThrowError, AppWithUseHookOnError };

// 이 파일 자체를 실행하여 보려면 아래와 같은 메인 컴포넌트를 만들 수 있습니다.
const MainApp = () => (
  <div>
    <AppWithUseThrowError />
    <hr />
    <AppWithUseHookOnError />
  </div>
);

export default MainApp; 