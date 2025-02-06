// 1. Null 참조 오류 케이스
const user = undefined;
console.log(user.name); // TypeError: undefined의 'name' 속성을 읽을 수 없습니다

// 2. 중첩된 객체의 Null 참조 오류
const response = {
  data: undefined
};
console.log(response.data.id); // TypeError: undefined의 'id' 속성을 읽을 수 없습니다

// 3. undefined에서 함수 호출 오류
const someFunction = undefined;
someFunction(); // TypeError: someFunction은 함수가 아닙니다

// 4. null에서 배열 접근 오류
const items = null;
console.log(items[0]); // TypeError: null의 '0' 속성을 읽을 수 없습니다

// 5. undefined에서 메서드 호출 오류
const obj = {
  method: undefined
};
obj.method(); // TypeError: obj.method는 함수가 아닙니다

// 이러한 오류들은 null/undefined 값에서 속성에 접근하거나 메서드를 호출하려고 할 때 발생합니다.
// 옵셔널 체이닝(?.)과 널 병합 연산자(??)는 이러한 런타임 오류를 방지하는데 도움을 줍니다.

