// React 내부에서 각 컴포넌트별로 훅의 상태를 저장하는 가상의 저장소
// ➊ key: 컴포넌트 식별자, value: 해당 컴포넌트의 훅 리스트와 현재 훅 인덱스
const componentHooks: Map<any, { list: HookState[]; index: number }> = new Map();

// ➋ 현재 렌더링 중인 컴포넌트를 가리키는 포인터
let currentComponent: any = null;

// 훅의 상태를 나타내는 타입 정의
interface HookState {
  memoizedValue: any; // 이전에 계산된 값을 저장함
  deps: any[] | null | undefined; // 이전 렌더링 시의 의존성 배열
}

// ➌ 새로운 훅 상태 객체를 생성하는 함수
function createHook(): HookState {
  // 초기에는 메모이제이션된 값과 의존성 배열 모두 null로 설정함
  return { memoizedValue: null, deps: null };
}

/**
 * useMemo 훅의 간소화된 의사코드
 * @param callback 값을 생성하는 함수. 이 함수의 반환값이 메모이제이션됨
 * @param dependencies 의존성 배열. 이 배열의 요소가 변경될 때만 callback 함수가 재실행됨
 */
function useMemo<T>(
  callback: () => T,
  dependencies: any[] | undefined
): T {
  // ➍ 훅은 함수 컴포넌트 내부에서만 호출되어야 함
  if (!currentComponent) {
    throw new Error("훅은 컴포넌트 렌더링 중에만 호출될 수 있음");
  }

  // ➎ 현재 컴포넌트에 해당하는 훅 저장소(없으면 새로 생성)
  if (!componentHooks.has(currentComponent)) {
    componentHooks.set(currentComponent, { list: [], index: 0 });
  }
  const hooks = componentHooks.get(currentComponent)!; // Non-null assertion (위에서 생성 보장)
  
  // 현재 훅의 순서(인덱스)를 가져오고, 다음 훅을 위해 인덱스를 증가시킴
  // (리액트는 훅이 호출되는 순서에 의존함)
  const hookIndex = hooks.index++;
  let hook = hooks.list[hookIndex] as HookState | undefined; // 타입 단언

  // ➏ 아직 이 훅이 처음 호출되었거나, 상태가 없다면 초기화함
  if (!hook) {
    hook = createHook();
    hooks.list[hookIndex] = hook;
  }

  // ➐ 의존성 배열 비교 로직: 핵심 메모이제이션 원리
  //    - 이전 의존성 배열(hook.deps)이 없거나 (최초 실행)
  //    - 또는 현재 의존성 배열(dependencies)과 이전 의존성 배열이 다르면
  //      새로운 값을 계산함
  if (!hook.deps || !dependencies || !depsEqual(dependencies, hook.deps)) {
    // 새로운 값을 계산하고, 현재 의존성 배열과 함께 저장함
    hook.memoizedValue = callback();
    hook.deps = dependencies;
  }
  // ➑ 의존성 배열이 같다면, 저장된 이전 값을 그대로 반환함 (메모이제이션)
  return hook.memoizedValue;
}


/**
 * ➒ 두 의존성 배열을 비교하는 함수
 * @param newDeps 새로운 의존성 배열
 * @param oldDeps 이전 의존성 배열
 * @returns 두 배열의 모든 요소가 Object.is 기준으로 같으면 true, 아니면 false
 */
function depsEqual(
  newDeps: any[],
  oldDeps: any[] | null
): boolean {
  // 이전 의존성 배열이 null이면 (예: 초기 실행 후 두 번째 렌더링 전) 항상 다름
  if (oldDeps === null) return false;
  // 배열 길이가 다르면 항상 다름
  if (newDeps.length !== oldDeps.length) return false;
  
  // 배열의 각 요소를 Object.is를 사용하여 비교함 (=== 비교와 유사하지만 NaN 처리 등에서 다름)
  // 하나라도 다르면 false 반환
  return newDeps.every((dep, i) => Object.is(dep, oldDeps[i]));
}

// --- 예시 사용법 (테스트용) ---
/*
function MyComponent(props) {
  currentComponent = MyComponent; // 현재 컴포넌트 설정 (실제 React는 자동으로 처리)
  componentHooks.get(MyComponent)!.index = 0; // 훅 인덱스 초기화

  const memoizedValue = useMemo(() => {
    console.log("계산 함수 실행됨!");
    return props.a + props.b;
  }, [props.a, props.b]);

  console.log("메모이제이션된 값:", memoizedValue);
  return memoizedValue;
}

// 첫 번째 렌더링
MyComponent({ a: 1, b: 2 }); // 계산 함수 실행됨!, 메모이제이션된 값: 3

// 두 번째 렌더링 (props 변경 없음)
MyComponent({ a: 1, b: 2 }); // 메모이제이션된 값: 3 (계산 함수 실행 안 됨)

// 세 번째 렌더링 (props 변경)
MyComponent({ a: 2, b: 2 }); // 계산 함수 실행됨!, 메모이제이션된 값: 4
*/
