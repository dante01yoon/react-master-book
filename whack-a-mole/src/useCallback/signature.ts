// useCallback의 타입 시그니처 정의함
declare function useCallback<
  // T는 콜백 함수의 타입을 나타내는 제네릭 매개변수임
  // 모든 종류의 함수 시그니처를 받을 수 있도록 정의됨
  T extends (...args: any[]) => any
>(
  // ➊첫 번째 인수는 메모이제이션할 콜백 함수임
  callback: T,
  // ➋두 번째 인수는 의존성 배열임
  // 이 배열의 값들이 변경될 때만 콜백 함수가 새로 생성됨
  deps: ReadonlyArray<any>
  // 메모이제이션된 콜백 함수를 반환하며, 타입은 원본 콜백 함수와 동일함
): T;



// 이 두 코드는 완전히 동일하게 동작
const memoizedFn = useCallback(fn, deps);

const memoizedFn2 = useMemo(() => fn, deps);