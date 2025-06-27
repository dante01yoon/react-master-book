function first() {
  console.log("시작: first()");
  // 시간이 걸리는 동기 작업을 시뮬레이션
  for (let i = 0; i < 1_000_000; i++) {}
  second(); // ➊ second() 호출 -> 콜 스택에 'second' 추가
  console.log("종료: first()");
}

function second() {
  console.log("  시작: second()");
  // 시간이 걸리는 동기 작업을 시뮬레이션
  for (let i = 0; i < 1_000_000; i++) {}
  third(); // ➋ third() 호출 -> 콜 스택에 'third' 추가
  console.log("  종료: second()");
}

function third() {
  console.log("    시작: third()");
  // 시간이 걸리는 동기 작업을 시뮬레이션
  for (let i = 0; i < 1_000_000; i++) {}
  console.trace("현재 콜 스택:"); // ➌ 콜 스택 추적
  console.log("    종료: third()");
}

console.log("프로그램 시작");
first(); // ➍ first() 호출 -> 콜 스택에 'first' 추가
const programStart = Date.now();
console.log(`프로그램 종료 - 총 소요시간: ${Date.now() - programStart}ms`);

/* 예상 출력:
프로그램 시작
시작: first()
  시작: second()
    시작: third()
    현재 콜스택:
        at third (synchronous.js:31)
        at second (synchronous.js:19)
        at first (synchronous.js:8)
        at Object.<anonymous> (synchronous.js:37)
    종료: third() - 소요시간: Xms
  종료: second() - 소요시간: Xms
종료: first() - 소요시간: Xms
프로그램 종료 - 총 소요시간: Xms
*/
