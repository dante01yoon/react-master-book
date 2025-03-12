// 동기 실행의 콜스택 예제
function first() {
    console.log("시작: first()");
    const startTime = Date.now();
    
    // 시간이 걸리는 작업 시뮬레이션
    for(let i = 0; i < 1000000; i++) {}
    
    second();  // second() 호출 -> 콜스택에 'second' 추가
    console.log(`종료: first() - 소요시간: ${Date.now() - startTime}ms`);
}

function second() {
    console.log("  시작: second()");
    const startTime = Date.now();
    
    // 시간이 걸리는 작업 시뮬레이션
    for(let i = 0; i < 1000000; i++) {}
    
    third();   // third() 호출 -> 콜스택에 'third' 추가
    console.log(`  종료: second() - 소요시간: ${Date.now() - startTime}ms`);
}

function third() {
    console.log("    시작: third()");
    const startTime = Date.now();
    
    // 시간이 걸리는 작업 시뮬레이션
    for(let i = 0; i < 1000000; i++) {}
    
    console.trace("    현재 콜스택:"); // 콜스택 추적 출력
    console.log(`    종료: third() - 소요시간: ${Date.now() - startTime}ms`);
}

console.log("프로그램 시작");
const programStart = Date.now();

first();  // first() 호출 -> 콜스택에 'first' 추가

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
