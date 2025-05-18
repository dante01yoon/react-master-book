// 리액트 내부 어딘가에 컴포넌트의 실제 상태를 저장하는 공간이 있다고 가정
let actualComponentState = {}; // 예: { count: 0 }
let updateQueue = []; // setState 호출을 저장하는 큐
let isRendering = false; // 현재 렌더링 중인지 여부

// 사용자가 호출하는 useState
function useState(initialValue) {
  // 컴포넌트 ID 또는 고유 키로 실제 상태에 접근한다고 가정
  const componentId = getCurrentComponentId();

  if (actualComponentState[componentId] === undefined) {
    actualComponentState[componentId] = initialValue;
  }

   // *** 클로저에 의해 캡처된 상태 ***
  const currentStateInClosure = actualComponentState[componentId];

  function setState(newStateOrUpdaterFn) {
    // 업데이트 요청을 큐에 추가
    updateQueue.push({
      componentId: componentId,
      payload: newStateOrUpdaterFn, // 직접 값 또는 (prevState => newState) 함수
    });

    scheduleReRender(); // 리렌더링 예약
  }

  return [currentStateInClosure, setState];
}

// 리렌더링을 스케줄링하고, 적절한 시점에 큐를 처리하는 함수
function scheduleReRender() {
  // 실제로는 더 복잡한 스케줄링 로직이 있지만, 단순화
  if (!isRendering) {
    setTimeout(processUpdateQueueAndReRender, 0);
  }
}

// 업데이트 큐를 처리하고 컴포넌트를 리렌더링하는 함수 (리액트 내부 로직)
function processUpdateQueueAndReRender() {
  isRendering = true;

  for (let update of updateQueue) {
    const { componentId, payload } = update;
    let currentActualState = actualComponentState[componentId]; // *** 큐 처리 시점의 실제 최신 상태 ***

    if (typeof payload === 'function') {
      // payload가 함수인 경우 (예: prev => prev + 1)
      // *** 최신 상태(currentActualState)를 인자로 함수를 실행 ***
      actualComponentState[componentId] = payload(currentActualState);
    } else {
      // payload가 직접 값인 경우 (예: count + 1)
      // *** 클로저에 캡처된 (오래된) 상태를 기반으로 계산된 값을 사용 ***
      actualComponentState[componentId] = payload;
    }
  }
  updateQueue = []; // 큐 비우기

  // --- 여기서부터 컴포넌트 리렌더링 시작 ---
  // ClosureExample(); // 실제 컴포넌트 함수 다시 호출 (새로운 클로저 생성)
  // isRendering = false;
  // --- 리렌더링 종료 ---

  isRendering = false;
}


// --- 사용자 코드 예시 ---

function ClosureExample() {
  // 첫 렌더링 시: useState 내부의 currentStateInClosure는 0
  const [count, setCount] = useState(0); // count는 클로저에 의해 0으로 기억됨

  function handleIncrementDirectValue() {
    // setCount가 호출될 때, `count + 1`의 `count`는
    // MyComponent 렌더링 시점의 클로저에 있는 값 (예: 0)을 참조
    setCount(count + 1); // payload는 (0 + 1) = 1. updateQueue에 { payload: 1 } 추가
    setCount(count + 1); // payload는 (0 + 1) = 1. updateQueue에 { payload: 1 } 추가
    setCount(count + 1); // payload는 (0 + 1) = 1. updateQueue에 { payload: 1 } 추가
    // processUpdateQueueAndReRender 실행 시:
    // 1. actualComponentState.count = 1
    // 2. actualComponentState.count = 1
    // 3. actualComponentState.count = 1  => 최종 결과: 1 (배치 처리 및 동일 값 참조로 인해)
  }

  function handleIncrementFunctional() {
    // setCount가 호출될 때, (prevCount => prevCount + 1) 함수 자체가 큐에 들어감
    setCount(prevCount => prevCount + 1); // updateQueue에 { payload: (prevCount => prevCount + 1) } 추가
    setCount(prevCount => prevCount + 1); // updateQueue에 { payload: (prevCount => prevCount + 1) } 추가
    setCount(prevCount => prevCount + 1); // updateQueue에 { payload: (prevCount => prevCount + 1) } 추가
    // processUpdateQueueAndReRender 실행 시:
    // 1. currentActualState = 0. payload(0) 실행 => actualComponentState.count = 1
    // 2. currentActualState = 1. payload(1) 실행 => actualComponentState.count = 2
    // 3. currentActualState = 2. payload(2) 실행 => actualComponentState.count = 3 => 최종 결과: 3
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrementDirectValue}>Increment Direct</button>
      <button onClick={handleIncrementFunctional}>Increment Functional</button>
    </div>
  );
}