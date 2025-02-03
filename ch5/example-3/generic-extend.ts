interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
}

interface HasId {
  id: number;
}

interface ApiResponse<T extends HasId> { // ➊ T는 HasId를 상속하는 타입으로 제한됩니다.
  data: T;
  error?: string;
}

interface Comment {
  text: string; // id가 없는 타입
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Dante" }, // ➋ User는 HasId를 만족하므로 허용됩니다.
};

const postResponse: ApiResponse<Post> = {
  data: { id: 1, title: "My First Post" }, // ➌ Post도 HasId를 만족하므로 허용됩니다.
};

// 아래 코드는 타입 에러가 발생합니다.
// const commentResponse: ApiResponse<Comment> = {
//   data: { text: "Great post!" }, // ❌ ➍ Comment는 HasId를 만족하지 않으므로 에러가 발생합니다.
// }; 