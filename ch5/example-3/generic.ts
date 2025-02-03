interface ApiResponse<T> {
  data: T; // ➊ T는 제너릭 파라메터입니다.
  error?: string;
 }
 
 
 interface User {
  id: number;
  name: string;
 }
 
 
 interface Post {
  id: number;
  title: string;
 }
 
 
 const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Dante" }, // ➋ 제너릭 파라메터 T를 User 타입으로 지정합니다.
 };
 
 
 const postResponse: ApiResponse<Post> = {
  data: { id: 1, title: "My First Post" }, // ➌ 제너릭 파라메터 T를 Post 타입으로 지정합니다.
 };
 