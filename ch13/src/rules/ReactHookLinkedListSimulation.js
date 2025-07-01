// --- 전역 컨텍스트 변수 ---
// 실제 리액트에서는 렌더링 컨텍스트를 관리하는 복잡한 객체 내에 존재함
let currentlyRenderingFiber = null; // 현재 렌더링 중인 컴포넌트(파이버)
let workInProgressHook = null;      // 현재 처리 중인 훅 (리스트의 마지막 훅 포인터)
let isMount = true;                 // 현재 렌더링이 마운트(첫 렌더링)인지 여부

// --- 훅 API (isMount 값에 따라 mount/update 함수를 호출하는 디스패처) ---
export function useState(initialState) {
  return isMount ? mountState(initialState) : updateState(initialState);
}
export function useRef(initialValue) {
  return isMount ? mountRef(initialValue) : updateRef(initialValue);
}
export function useEffect(create, deps) {
  return isMount ? mountEffect(create, deps) : updateEffect(create, deps);
}

// --- 마운트(Mount) 경로 구현 ---
// 마운트: 훅 노드를 생성하고 연결 리스트에 추가하는 것이 핵심
function mountState(initialState) {
  const hook = mountWorkInProgressHook(); // 새 훅 노드 생성 및 연결
  hook.memoizedState = initialState;
  const dispatch = (action) => { console.log('State updated:', action); };
  return [hook.memoizedState, dispatch];
}
function mountRef(initialValue) {
  const hook = mountWorkInProgressHook(); // 새 훅 노드 생성 및 연결
  hook.memoizedState = { current: initialValue };
  return hook.memoizedState;
}
function mountEffect(create, deps) {
  mountWorkInProgressHook(); // 새 훅 노드 생성 및 연결 (상태 저장은 생략)
}

// 마운트 시, 새로운 훅 노드를 생성하고 리스트에 추가하는 핵심 함수
function mountWorkInProgressHook() {
  const hook = { memoizedState: null, next: null }; // 새 훅 노드
  if (workInProgressHook === null) {
    // 훅 리스트가 비어있으면(첫 번째 훅), 파이버의 memoizedState가 리스트의 시작점(head)이 됨
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    // 리스트의 마지막 훅의 next가 새 훅을 가리키도록 연결함
    workInProgressHook = workInProgressHook.next = hook;
  }
  return workInProgressHook;
}

// --- 업데이트(Update) 경로 구현 ---
// 업데이트: 기존 훅 리스트를 순서대로 순회하는 것이 핵심
function updateState(initialState) {
  const hook = updateWorkInProgressHook(); // 기존 훅 노드로 이동
  const dispatch = (action) => { /* ... */ };
  return [hook.memoizedState, dispatch];
}
function updateRef(initialValue) {
  const hook = updateWorkInProgressHook(); // 기존 훅 노드로 이동
  return hook.memoizedState;
}
function updateEffect(create, deps) {
  updateWorkInProgressHook(); // 기존 훅 노드로 이동
}

// 업데이트 시, 기존 훅 리스트를 포인터를 따라 순서대로 순회하는 핵심 함수
function updateWorkInProgressHook() {
  // 다음 훅 노드를 가져옴
  const nextHook = workInProgressHook === null
    ? currentlyRenderingFiber.memoizedState // 첫 훅이면 리스트의 head에서 시작
    : workInProgressHook.next;              // 다음 훅으로 이동

  if (nextHook === null) {
    // 렌더링 간 훅 호출 횟수가 다를 때 발생 (규칙 위반)
    throw new Error('훅 호출 횟수가 렌더링 간에 다릅니다.');
  }

  workInProgressHook = nextHook; // 현재 처리 중인 훅 포인터를 다음으로 이동
  return workInProgressHook;
}

// --- 렌더링 시뮬레이터 ---
export function renderWithHooks(fiber) {
  currentlyRenderingFiber = fiber;
  workInProgressHook = null; // 렌더링 시작 전 포인터 초기화
  isMount = fiber.memoizedState === null; // memoizedState가 null이면 첫 렌더링(마운트)
  
  // 컴포넌트 함수 실행
  fiber.type(fiber.props);
}