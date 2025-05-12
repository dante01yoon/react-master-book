// 이 파일은 리액트 내부의 훅 관리 메커니즘(연결 리스트 기반)을
// 교육 목적으로 단순화하여 시뮬레이션함.
// 실제 리액트 구현과는 차이가 있음.

// --- 전역 변수 및 객체 시뮬레이션 ---

// 현재 처리 중인 파이버 노드를 모방하는 객체
// 실제 리액트에서는 현재 작업 중인 컴포넌트의 메타데이터를 담고 있음
let currentlyRenderingFiber = {
  memoizedState: null, // 해당 파이버에 연결된 훅 리스트의 첫 번째 노드를 가리킴
};

// 현재 처리 중인 훅 노드를 가리키는 포인터 역할의 변수
let workInProgressHook = null;

// 훅의 종류를 나타내는 태그 (예시 상수)
const HookEffectTag = 'effect';

// --- 훅 마운트 함수 시뮬레이션 ---

/**
 * useState 훅이 마운트될 때 호출되는 함수를 모방함
 * @param {any} initialState 초기 상태 값
 * @returns {[any, Function]} 초기 상태와 디스패치 함수 (시뮬레이션)
 */
function mountState(initialState) {
  // 새로운 훅 노드를 생성하고 연결 리스트에 추가함
  const hook = mountWorkInProgressHook();
  // 훅의 memoizedState에 초기 상태 값을 저장함
  hook.memoizedState = initialState;
  // 실제 디스패치 함수 대신 더미 함수를 반환함 (시뮬레이션)
  const dispatch = (action) => { console.log('[Simulated Dispatch] Action:', action); };
  return [hook.memoizedState, dispatch];
}

/**
 * useRef 훅이 마운트될 때 호출되는 함수를 모방함
 * @param {any} initialValue 초기 값
 * @returns {{current: any}} Ref 객체
 */
function mountRef(initialValue) {
  // 새로운 훅 노드를 생성하고 연결 리스트에 추가함
  const hook = mountWorkInProgressHook();
  // Ref 객체를 생성함
  const ref = { current: initialValue };
  // 훅의 memoizedState에 Ref 객체를 저장함
  hook.memoizedState = ref;
  return ref;
}

/**
 * useEffect 훅이 마운트될 때 호출되는 함수를 모방함
 * @param {Function} create 이펙트 콜백 함수
 * @param {Array|null|undefined} deps 의존성 배열
 */
function mountEffect(create, deps) {
  // 새로운 훅 노드를 생성하고 연결 리스트에 추가함
  const hook = mountWorkInProgressHook();
  // 의존성 배열 처리 (undefined는 null로 변환)
  const nextDeps = deps === undefined ? null : deps;
  // 훅의 memoizedState에 이펙트 관련 정보(태그, 콜백, 의존성 등)를 저장함
  hook.memoizedState = {
    tag: HookEffectTag, // 이펙트 훅임을 나타내는 태그
    create: create,     // 실행할 이펙트 함수
    destroy: undefined, // 클린업 함수 (초기에는 없음)
    deps: nextDeps,     // 의존성 배열
    next: null          // 이펙트 리스트 내 다음 노드 (별도 관리됨, 여기선 단순화)
  };
}

// --- 핵심 헬퍼 함수 시뮬레이션 ---

/**
 * 새로운 훅 노드를 생성하고, 현재 파이버의 훅 리스트에 연결하는 함수를 모방함
 * @returns {object} 새로 생성되고 연결된 훅 노드
 */
function mountWorkInProgressHook() {
  // 새로운 훅 노드 객체 생성 (실제 리액트는 더 많은 필드를 가짐)
  const hook = {
    memoizedState: null, // 해당 훅의 상태 값 저장
    baseState: null,     // 업데이트 계산을 위한 기본 상태 (여기선 단순화)
    baseQueue: null,     // 업데이트 큐 (여기선 단순화)
    queue: null,         // 업데이트 큐 (여기선 단순화)
    next: null,          // 다음 훅 노드를 가리키는 포인터
  };

  // 현재 파이버에 연결된 훅 리스트가 비어있는 경우 (첫 번째 훅 호출 시)
  if (workInProgressHook === null) {
    // 파이버의 memoizedState가 첫 번째 훅 노드를 가리키도록 설정함
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    // 기존 마지막 훅 노드의 next 포인터가 새로 생성된 훅 노드를 가리키도록 설정함
    // 즉, 연결 리스트의 끝에 새 노드를 추가함
    workInProgressHook = workInProgressHook.next = hook;
  }
  // 새로 생성 및 연결된 훅 노드를 반환함
  return workInProgressHook;
}