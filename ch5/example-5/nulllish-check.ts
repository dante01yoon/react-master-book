// 1. 기존의 상세한 null 체크
function getDisplayNameVerbose(user: any) {
  if (user === null || user === undefined) {
    return "Guest";
  }
  
  if (user.displayName === null || user.displayName === undefined) {
    if (user.firstName === null || user.firstName === undefined) {
      return "Guest";
    }
    return user.firstName;
  }
  
  return user.displayName;
}

// 2. 널 병합 연산자(??)를 사용한 간단한 체크
function getDisplayNameNullish(user: any) {
  return user?.displayName ?? user?.firstName ?? "Guest";
}

// 3. 옵셔널 체이닝(?.)만 사용한 경우
function getDisplayNameOptional(user: any) {
  return user?.displayName || user?.firstName || "Guest"; // 주의: 빈 문자열이나 0도 false로 처리됨
}

// 사용 예시와 비교
const user1 = {
  displayName: "John Doe",
  firstName: "John"
};

const user2 = {
  firstName: "Jane"
};

const user3 = {
  displayName: "",  // 빈 문자열
  firstName: "Alice"
};

const user4 = null;

console.log("Verbose checks:");
console.log(getDisplayNameVerbose(user1));  // "John Doe"
console.log(getDisplayNameVerbose(user2));  // "Jane"
console.log(getDisplayNameVerbose(user3));  // "" (빈 문자열 유지)
console.log(getDisplayNameVerbose(user4));  // "Guest"

console.log("\nNullish coalescing:");
console.log(getDisplayNameNullish(user1));  // "John Doe"
console.log(getDisplayNameNullish(user2));  // "Jane"
console.log(getDisplayNameNullish(user3));  // "" (빈 문자열 유지)
console.log(getDisplayNameNullish(user4));  // "Guest"

console.log("\nOptional chaining with OR:");
console.log(getDisplayNameOptional(user1)); // "John Doe"
console.log(getDisplayNameOptional(user2)); // "Jane"
console.log(getDisplayNameOptional(user3)); // "Guest" (빈 문자열이 false로 평가되어 대체됨)
console.log(getDisplayNameOptional(user4)); // "Guest"
