// JavaScript typeof 예제들
console.log(typeof "hello");     // "string"
console.log(typeof 123);         // "number"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" (이것은 JavaScript의 알려진 특이사항입니다)
console.log(typeof {});          // "object"
console.log(typeof []);          // "object"
console.log(typeof function(){}); // "function"

// TypeScript 전용 typeof 예제들
// 1. typeof를 사용한 타입 쿼리
const user = {
    name: "John",
    age: 30,
    isAdmin: false
}
// typeof를 사용하여 객체로부터 타입 생성
type User = typeof user;
// 이제 User는 다음과 동일합니다:
// type User = {
//     name: string;
//     age: number;
//     isAdmin: boolean;
// }

// 2. 함수와 함께 typeof 사용
function greet(name: string, age: number) {
    return `Hello ${name}, you are ${age} years old`;
}
type GreetFunction = typeof greet;
// GreetFunction은 이제: (name: string, age: number) => string 입니다

// 3. 클래스와 함께 typeof 사용
class Point {
    constructor(public x: number, public y: number) {}
}
type PointType = typeof Point;
// PointType은 생성자 타입을 나타냅니다

// 4. enum과 함께 typeof 사용
enum Direction {
    Up = "UP",
    Down = "DOWN"
}
type DirectionType = typeof Direction;
// DirectionType은 enum 객체 타입을 나타냅니다
