// 비동기 실행의 이벤트 루프 예제
console.log("프로그램 시작");
const programStart = Date.now();


// setTimeout을 사용한 비동기 함수 예제
function delayedGreeting() {
   console.log("1. delayedGreeting() 함수 호출됨");
  
   setTimeout(function timer(){
       // ➊ 이 코드는 2초 후에 이벤트 큐에 들어가고, 콜 스택이 비워지면 실행됩니다.
       console.log("4. 타이머 완료! (2초 후)");
       console.log(`   현재 시간: ${Date.now() - programStart}ms`);
   }, 2000);
  
   console.log("2. setTimeout이 예약되었지만, 함수는 계속 실행됩니다");
}

function performTask() {
   console.log("3. performTask() 함수 호출됨");
  
   return new Promise(function performTaskPromise(resolve) {
       // ➋ Promise 내부의 코드는 동기적으로 실행됩니다
       console.log("   Promise 실행 시작");
      
       // ➌ 비동기 작업 시뮬레이션 (1초 후 완료)
       setTimeout(function timer() {
           console.log("5. Promise 내부의 타이머 완료! (1초 후)");
           resolve("작업 결과 데이터");  // 작업 성공 시 resolve 호출
       }, 1000);
      
       console.log("Promise 생성 완료 (비동기 작업은 백그라운드에서 계속됨)");
   });
}


// async/await를 사용한 비동기 함수 예제
async function processData() {
   console.log("6. processData() 함수 호출됨 (async 함수)");
  
   try {
       // ➍ await는 Promise가 해결될 때까지 함수 실행을 일시 중지합니다
       // 하지만 메인 스레드는 차단되지 않습니다
       const result = await new Promise(function processDataPromise(resolve) {
           console.log("   새 Promise 생성 (0.5초 지연)");
           setTimeout(function timer() {
               resolve("처리된 데이터");
           }, 500);
       });
      
       console.log(`7. 데이터 처리 완료: ${result}`);
   } catch (error) {
       console.error("   오류 발생:", error);
   }
}


delayedGreeting(); // ➎ setTimeout 실행 예제
performTask() // ➏ 프로미스와 이벤트 큐 실행 예제
   .then(function performTaskResolve(result) {
       console.log(`   Promise 결과: ${result}`);
       return processData();  // ➐ 다음 비동기 작업 체이닝
   })
   .then(() => {
       console.log("8. 모든 비동기 작업 완료");
       console.log(`   총 소요시간: ${Date.now() - programStart}ms`);
   });


console.log("메인 스크립트 실행 완료 (비동기 작업들은 백그라운드에서 계속 실행됨)");