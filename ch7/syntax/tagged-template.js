// 태그드 템플릿 리터럴 예제

// 1. 기본적인 태그 함수 정의
function fn(strings, ...values) {
  console.log('strings:', strings);
  console.log('values:', values);
  return "함수 실행 결과";
}

// 2. 태그드 템플릿 호출 방식 비교
console.log('--- 예제 1: 인자 없는 태그드 템플릿 ---');
fn`rabbit jump`;  // ➊ 태그드 템플릿 호출
// 위 코드는 아래와 동일함
fn(["rabbit jump"]); // ➋ 일반 함수 호출로 표현

console.log('--- 예제 2: 인자가 있는 태그드 템플릿 ---');
const color = "Golden";
fn`this is a ${color} Rabbit`; // ➌ 인자가 있는 태그드 템플릿
// 위 코드는 아래와 동일함 
fn(["this is a ", " Rabbit"], color); // ➍ 일반 함수 호출로 표현

// 3. 태그 함수를 활용한 실용적인 예제
console.log('--- 예제 3: 하이라이트 태그 함수 ---');
function highlight(strings, ...values) {
  // 결과 문자열을 담을 배열
  let result = [];
  
  // strings와 values를 번갈아가며 처리
  strings.forEach((str, i) => {
    result.push(str);
    if (i < values.length) {
      // 값을 강조 표시로 감싸기
      result.push(`<strong style="color: #FFD700;">${values[i]}</strong>`);
    }
  });
  
  // 배열을 문자열로 합치기
  return result.join('');
}

// highlight 태그 함수 사용
const animal = "토끼";
const action = "뛰어오르다";
const highlightedText = highlight`${animal}가 재빠르게 ${action}!`;

console.log(highlightedText);
// 출력: "<strong style="color: #FFD700;">토끼</strong>가 재빠르게 <strong style="color: #FFD700;">뛰어오르다</strong>!"

// 4. 인자 값들을 서식화하는 태그 함수
console.log('--- 예제 4: 통화 포맷팅 태그 함수 ---');
function currency(strings, ...values) {
  return strings.reduce((result, str, i) => {
    // 마지막 문자열이면 값 없이 처리
    if (i >= values.length) {
      return result + str;
    }
    
    // 값이 숫자인 경우 통화 형식으로 변환
    const value = values[i];
    const formatted = typeof value === 'number'
      ? new Intl.NumberFormat('ko-KR', { 
          style: 'currency', 
          currency: 'KRW' 
        }).format(value)
      : value;
      
    return result + str + formatted;
  }, '');
}

// currency 태그 함수 사용
const productName = "골드 토끼 인형";
const price = 25000;
const formattedPrice = currency`${productName}의 가격은 ${price}입니다.`;

console.log(formattedPrice);
// 출력: "골드 토끼 인형의 가격은 ₩25,000입니다." 