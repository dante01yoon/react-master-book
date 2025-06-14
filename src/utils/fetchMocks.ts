/**
 * API 응답값으로 사용될 Repo 객체의 인터페이스 정의.
 * 실제 애플리케이션에서는 이 인터페이스를 공유하거나 API 명세에 따라 더 구체적으로 정의함.
 */
// ... 기존 코드 ...
// 모킹된 Repo 데이터
// ... 기존 코드 ...
/**
 * 실제 fetch API 호출을 모방하는 함수.
 * Response 객체와 유사한 구조를 반환하며, json() 메서드 호출 시 미리 정의된 Repo 데이터를 반환함.
 * @returns Promise<{ status: number, ok: boolean, json: () => Promise<Repo> }>
 */
// ... 기존 코드 ...
  // 네트워크 지연 시간 시뮬레이션
// ... 기존 코드 ...
  // 성공적인 응답 모방
// ... 기존 코드 ...
      // JSON 파싱 시간 시뮬레이션
// ... 기존 코드 ...
/**
 * API 호출 실패를 모방하는 예시 함수.
 * @returns Promise<{ status: number, ok: boolean, json: () => Promise<any>, statusText: string }>
 */ 