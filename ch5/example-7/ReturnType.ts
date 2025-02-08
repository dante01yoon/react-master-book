// 예시 1: 기본 함수의 반환 타입 추출
function getUserInfo(id: number) {
    return {
        id: id,
        name: "홍길동",
        age: 30
    };
}

// getUserInfo 함수의 반환 타입을 추출
type UserInfo = ReturnType<typeof getUserInfo>;
// UserInfo는 { id: number; name: string; age: number; } 타입이 됩니다.

// 예시 2: 비동기 함수의 반환 타입 추출
async function fetchUserData(userId: string) {
    // API 호출을 시뮬레이션
    return {
        userId,
        lastLogin: new Date(),
        preferences: {
            theme: "dark",
            notifications: true
        }
    };
}

// Promise의 resolved 값 타입을 추출
type UserData = ReturnType<typeof fetchUserData>;
// UserData는 Promise<{ userId: string; lastLogin: Date; preferences: { theme: string; notifications: boolean; } }> 타입이 됩니다.

// 예시 3: 제네릭 함수의 반환 타입 추출
function createPair<T, U>(first: T, second: U) {
    return { first, second };
}

// 구체적인 타입으로 인스턴스화된 함수의 반환 타입을 추출
type StringNumberPair = ReturnType<typeof createPair<string, number>>;
// StringNumberPair는 { first: string; second: number; } 타입이 됩니다.

// ReturnType 활용 예시
const userInfo: UserInfo = {
    id: 1,
    name: "김철수",
    age: 25
};

// 타입 안전성 보장
// const invalidUserInfo: UserInfo = {
//     id: "1", // ❌ 타입 오류: number 타입이어야 함
//     name: "김철수",
//     age: 25
// };
