interface DefaultId {
  id: number;
  createdAt: Date;
}

interface ApiResponse<T = DefaultId> { // ➊ DefaultId를 디폴트 타입으로 지정하는 경우
  data: T;
  error?: string;
}

// ➋ DefaultId를 사용하는 경우
const defaultResponse: ApiResponse = {
  data: { 
    id: 1, 
    createdAt: new Date() 
  }
};

// 아래 코드는 타입 에러가 발생합니다. 타입 매개변수 없이 DefaultId 타입 체크
// const invalidResponse: ApiResponse = { 
//   data: {  ❌ ➌ data는 DefaultId를 만족하지 않으므로 에러가 발생합니다.
//     id: 1
//   } 
// }; 