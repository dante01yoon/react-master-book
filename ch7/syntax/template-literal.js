// 템플릿 리터럴 기본 예제

// 기본 문자열 연결
const color = "golden";
const rabbit = "Rabbit";
const cat = "Cat";

// 1. 기존 방식 문자열 연결
const goldenRabbit = color + rabbit; // goldenRabbit
console.log(goldenRabbit);

// 2. 템플릿 리터럴 사용
const goldenCat = `${color}${cat}`; // goldenCat
console.log(goldenCat);

// 3. 템플릿 리터럴의 여러 줄 문자열 지원
const multiLineText = `
첫 번째 줄
두 번째 줄
세 번째 줄
`;
console.log(multiLineText);

// 4. 템플릿 리터럴 내에서 표현식 사용
const count = 5;
const message = `${color}${rabbit}이 ${count}마리 있습니다.`;
console.log(message); // goldenRabbit이 5마리 있습니다.

// 5. 템플릿 리터럴 내에서 계산 수행
const price = 1000;
const tax = 0.1;
const totalPrice = `총 가격: ${price * (1 + tax)}원`;
console.log(totalPrice); // 총 가격: 1100원 