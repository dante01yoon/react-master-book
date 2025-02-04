interface User {
  id: string;
  name: string;
  email: string;
}

type UpdateUserInput = Partial<User>; // Partial 유틸리티 타입을 사용하여 User 인터페이스의 모든 필드를 선택적으로 만듭니다.

const updateUserInput: UpdateUserInput = { // name, email 필드는 선택입니다.
  name: "Dante",
};

type ReadOnlyUser = Readonly<User>; // Readonly 유틸리티 타입을 사용하여 User 인터페이스의 모든 필드를 읽기 전용으로 만듭니다.

const readonlyUser: ReadOnlyUser = {
  id: "1",
  name: "Dante",
  email: "dante@example.com",
};

readonlyUser.email = "dante@example.com"; // ❌ 읽기 전용 필드는 수정할 수 없습니다.

