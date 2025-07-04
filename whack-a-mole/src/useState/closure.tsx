// ➊ 리액트 내부 어딘가에 컴포넌트의 실제 상태를 저장하는 중앙 저장소가 있다고 가정
// (실제로는 파이버 노드의 memoizedState에 저장됨)
let componentStateStorage = {}; // 예: { count: 0 }
let updateQueue = []; // setState 호출을 저장하는 큐
let isRendering = false; // 현재 렌더링 중인지 여부를 나타내는 플래그

// 사용자가 호출하는 useState
function useState(initialValue) {
  const componentId = getCurrentComponentId(); // 편의상 컴포넌트를 구분하는 ID

  if (componentStateStorage[componentId] === undefined) {
    componentStateStorage[componentId] = initialValue;
  }

  // ➋ 이 변수는 렌더링 시점의 상태를 클로저에 캡처함
  const currentStateForThisRender = componentStateStorage[componentId];

  function setState(newStateOrUpdaterFn) {
    // 업데이트 요청(값 또는 함수)을 큐에 추가
    updateQueue.push({
      componentId: componentId,
      payload: newStateOrUpdaterFn,
    });
    scheduleReRender(); // ➌ 리렌더링을 예약함
  }

  return [currentStateForThisRender, setState];
}

// 업데이트 큐를 처리하고 컴포넌트를 리렌더링하는 함수 (리액트 내부 로직)
function processUpdateQueueAndReRender() {
  if (isRendering) return;
  isRendering = true;

  for (let update of updateQueue) {
    const { componentId, payload } = update;
    // 큐를 처리하는 시점의 '최신' 상태를 저장소에서 가져옴
    const currentActualState = componentStateStorage[componentId];

    if (typeof payload === 'function') {
      // ➍ payload가 함수인 경우 (예: prev => prev + 1)
      // *** '최신 상태'를 인자로 함수를 실행하여 새 상태를 계산함 ***
      componentStateStorage[componentId] = payload(currentActualState);
    } else {
      // payload가 값인 경우 (예: count + 1)
      // *** 클로저에 캡처된 '오래된 상태'로 계산된 값(payload)을 그대로 할당함 ***
      componentStateStorage[componentId] = payload;
    }
  }

  updateQueue = []; // 큐 비우기
  isRendering = false;

  // 이 시점 이후, 컴포넌트 리렌더링이 트리거됨
  // renderComponent(componentId);
}

// --- 사용자 코드 예시 ---

function ClosureExample() {
  // 첫 렌더링 시: useState 내부의 currentStateInClosure는 0
  const [count, setCount] = useState(0);

  // ➊ 값으로 직접 업데이트: 예측과 다른 결과를 낳음
  function handleIncrementDirectValue() {
    // 이 핸들러가 생성된 시점의 count는 0
    // 따라서 세 번의 호출 모두 setCount(0 + 1)를 의미
    setCount(count + 1); // 큐에 { payload: 1 } 추가
    setCount(count + 1); // 큐에 { payload: 1 } 추가
    setCount(count + 1); // 큐에 { payload: 1 } 추가

    // 큐 처리 결과:
    // 1. state = 1
    // 2. state = 1
    // 3. state = 1  => 최종 결과: 1
  }

  // ➋ 함수형 업데이트: 항상 안전하고 예측 가능함
  function handleIncrementFunctional() {
    // (prev => prev + 1) 라는 함수 자체가 큐에 들어감
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);

    // 큐 처리 결과:
    // 1. 최신 상태 0을 받아 state = 1로 변경
    // 2. 최신 상태 1을 받아 state = 2로 변경
    // 3. 최신 상태 2를 받아 state = 3으로 변경  => 최종 결과: 3
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrementDirectValue}>Increment Direct</button>
      <button onClick={handleIncrementFunctional}>Increment Functional</button>
    </div>
  );
}