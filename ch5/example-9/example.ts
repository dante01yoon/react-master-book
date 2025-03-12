// 헬퍼 함수가 필요한 기능들을 사용하는 예제
class Animal {
    constructor(public name: string) {}
}

class Dog extends Animal { // 상속을 구현할 경우 헬퍼 함수 __extends()를 사용합니다.
    bark() {
        console.log(`${this.name} says woof!`);
    }
}

const numbers = [1, 2, 3];
const moreNumbers = [...numbers, 4, 5]; // 스프레드 연산자를 사용할 경우 헬퍼 함수 __spreadArray()를 사용합니다.

async function fetchData() { // 비동기 함수를 사용할 경우 헬퍼 함수 __awaiter()와 __generator()를 사용합니다.
    const response = await fetch('https://api.example.com/data');
    return response.json();
}

function logPerson({ name, age, ...rest }: {  // 나머지 매개변수를 사용할 경우 헬퍼 함수 __rest()를 사용합니다.
    name: string; 
    age: number; 
    occupation: string; 
    hobby: string 
}) {
    console.log(name, age, rest);
} 

/**
 * 출력 결과 - importHelpers를 사용할 떄 
   const { __extends, __spreadArray, __awaiter } = require("tslib");
 */

/**
 * 출력 결과 - importHelpers를 사용하지 않을 때 
    var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
   };
   // ... 이하 생략
 */