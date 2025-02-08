function fetchData() {  // API나 다른 소스에서 데이터를 가져오는 것을 시뮬레이션
  const responses = [
    "문자열 응답",
    123,
    { message: "객체 응답" },
    [1, 2, 3]
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

// 1. any 타입 예시 - 타입 검사를 완전히 비활성화
let dataAny: any = fetchData();
dataAny.toUpperCase();     // 컴파일 에러 없음 (런타임 에러 가능성)
dataAny.nonexistentMethod(); // 컴파일 에러 없음 
dataAny.foo.bar.baz;      // 컴파일 에러 없음 


// 2. unknown 타입 예시 - 타입 검사 필수
let dataUnknown: unknown = fetchData();
// dataUnknown.toUpperCase();     // ❌ 컴파일 에러
// dataUnknown.nonexistentMethod(); // ❌ 컴파일 에러
// dataUnknown.foo.bar.baz;      // ❌ 컴파일 에러

// unknown 타입은 타입 검사(Type narrowing)가 필수입니다
if (typeof dataUnknown === 'string') {
    console.log(dataUnknown.toUpperCase()); // ✅ 안전
} else if (Array.isArray(dataUnknown)) {
    console.log(dataUnknown.length);        // ✅ 안전
} else if (typeof dataUnknown === 'object' && dataUnknown !== null) {
    const obj = dataUnknown as { message?: string };
    console.log(obj.message);               // ✅ 안전
}


// 3. unknown 타입과 타입 단언(Type Assertion) 예시
let jsonString = '{"name": "John", "age": 30}';
let data: unknown = JSON.parse(jsonString);

// unknown에서 특정 타입으로 단언
interface User {
  name: string;
  age: number;
}

// data를 User 타입으로 단언
const user = data as User;
console.log(user.name);  // ✅ 안전 - "John"
console.log(user.age);   // ✅ 안전 - 30

// 다중 단언도 가능하지만 권장되지 않음
const anotherData: unknown = "Hello";
const num = anotherData as unknown as number; // ⚠️ 권장되지 않는 방식
