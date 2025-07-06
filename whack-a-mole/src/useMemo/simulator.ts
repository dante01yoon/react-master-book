// ➊ 리액트 내부에서 컴포넌트별 훅 상태를 저장하는 가상의 저장소
const componentHooks: Map<any, { list: HookState[]; index: number }> = new Map();

// ➋ 현재 렌더링 중인 컴포넌트를 가리키는 포인터
let currentComponent: any = null;

// 훅의 상태를 표현하는 타입
interface HookState {
  memoizedValue: any; // 캐시된 값
  deps: any[] | undefined; // 이전 렌더링의 의존성 배열
}

function createHook(): HookState {
  return { memoizedValue: null, deps: undefined };
}

/**
 * useMemo 훅의 간소화된 의사 코드
 */
function useMemo<T>(callback: () => T, dependencies: any[] | undefined): T {
  // ➌ 훅은 반드시 컴포넌트 내부에서만 호출되어야 함
  if (!currentComponent) {
    throw new Error("훅은 컴포넌트 렌더링 중에만 호출될 수 있습니다.");
  }

  // ➍ 현재 컴포넌트에 해당하는 훅 저장소를 가져오거나 새로 생성함
  if (!componentHooks.has(currentComponent)) {
    componentHooks.set(currentComponent, { list: [], index: 0 });
  }
  const hooks = componentHooks.get(currentComponent)!;
  
  // ➎ 현재 훅의 순서(인덱스)를 가져오고, 다음 훅을 위해 인덱스를 1 증가시킴
  const hookIndex = hooks.index++;
  let hook = hooks.list[hookIndex] as HookState | undefined;

  // ➏ 이 훅이 처음 호출되었다면 상태를 초기화함
  if (!hook) {
    hook = createHook();
    hooks.list[hookIndex] = hook;
  }

  // ➐ 의존성 배열 비교: 메모이제이션의 핵심
  // 이전 의존성(hook.deps)이 없거나(첫 렌더링), 현재와 다르다면 값을 새로 계산함
  if (!hook.deps || !dependencies || !depsEqual(dependencies, hook.deps)) {
    hook.memoizedValue = callback(); // 콜백을 실행해 새로운 값을 계산
    hook.deps = dependencies;         // 새로운 값과 의존성을 저장
  }

  // ➑ 의존성이 같다면, 저장된 이전 값을 그대로 반환함
  return hook.memoizedValue;
}

/**
 * ➒ 두 의존성 배열을 비교하는 헬퍼 함수
 */
function depsEqual(newDeps: any[], oldDeps: any[] | null): boolean {
  if (oldDeps === null) return false;
  if (newDeps.length !== oldDeps.length) return false;
  
  // 모든 배열 요소를 Object.is 기준으로 비교
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
