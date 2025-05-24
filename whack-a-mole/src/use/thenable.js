// 리액트 19에서 사용되는 use() 로직 예제
function use(usable) {
  // ➊ 인자로 전달된 값이 Promise인지 확인
  if (isPromise(usable)) {
    return handlePromise(usable);
  } else if (isContext(usable)) {
    return readContextValue(usable);
  } else {
    throw new Error("Unsupported type for use()");
  }
}

function handlePromise(promise) {
  // ➋ Promise 객체 자체에 저장된 상태(status, value, reason)가 있는지 확인
  //    (React는 Promise 객체에 'status', 'value', 'reason' 같은 커스텀 속성을 추가해서 관리)
  if (promise.status === 'fulfilled') {
    return promise.value;
  } else if (promise.status === 'rejected') {
    throw promise.reason;
  } else if (promise.status === 'pending') {
    // 이미 pending 상태로 추적 중이면, 계속해서 SuspenseException을 throw
    throw SuspenseException; // React 내부에서 이 예외를 잡아서 Suspense 처리
  } else {
    // ➌ 처음 보는 Promise라면, 상태 추적 로직을 설정
    promise.status = 'pending';
    promise.then(
      value => {
        promise.status = 'fulfilled';
        promise.value = value;
        // 리액트에게 이 Promise에 의존하는 컴포넌트를 다시 렌더링하도록 알림
        scheduleReRenderForPromise(promise);
      },
      error => {
        promise.status = 'rejected';
        promise.reason = error;
        // 리액트에게 이 Promise에 의존하는 컴포넌트를 다시 렌더링하도록 알림 (에러 처리)
        scheduleReRenderForPromise(promise);
      }
    );
    // ➍ 현재 렌더링을 중단시키기 위해 특별한 예외를 throw
    throw SuspenseException; // 리액트 내부에서 이 예외를 잡아서 Suspense 처리
  }
}

function readContextValue(context) {
  // ➎ 현재 컴포넌트 트리 상에서 가장 가까운 Context Provider를 찾아서 값을 읽어옴
  return findProviderValue(context);
}

// --- 헬퍼 함수 정의 ---
// SuspenseException: 리액트 내부에서 사용되는 특별한 예외 객체 (렌더링 중단용)
// scheduleReRenderForPromise(promise): 해당 promise를 기다리던 컴포넌트를 다시 렌더링 큐에 넣음
// findProviderValue(context): Context Provider로부터 값을 가져옴