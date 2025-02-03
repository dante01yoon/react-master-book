let count: number = 10;        // number 타입으로 명시적으로 타입 선언했습니다.
let userName: string = "Dante"; // string 타입으로 명시적으로 타입 선언했습니다.

function add(a: number, b: number): number { // 인자와 반환 타입을 명시적으로 선언합니다.
  return a + b;
}

type User = { // 객체의 각 키의 값들에 대한 타입을 명시적으로 선언합니다.
  name: string;
  age: number;
};

let person: User = { // 객체 persion에 User 커스텀 타입을 명시적으로 선언합니다.
  name: "Dante",
  age: 25
};

let scores: number[] = [10, 20, 30]; // number의 배열 타입을 명시적으로 선언했습니다.
