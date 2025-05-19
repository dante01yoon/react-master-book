import { DependencyList } from "react"

/**
 * useMemo 훅의 타입 시그니처
 * @param factory - 연산 결과를 반환하는 함수. 이 함수의 반환값이 메모이제이션됨
 * @param deps - 의존성 배열. 배열 내 값이 변경될 때만 factory 함수가 다시 실행됨
 * @returns factory 함수의 반환값(메모이제이션된 값)
 */
export function useMemo<T>(
  factory: () => T, // ➊ 연산 결과를 반환하는 함수
  deps: DependencyList // ➋ 의존성 배열 (값이 변경될 때만 factory 재실행)
): T {
  throw new Error("This is only a type signature stub. 실제 구현이 아님");
}
