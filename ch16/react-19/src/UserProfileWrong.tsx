import { use } from "react";
import { fetchUser } from "./fakeApiForUse";

function UserProfileWrong() {
  // ➊ 렌더링 시마다 매번 새로운 프로미스가 생성됨
  const userPromise = fetchUser(); 
  // ➋ use()는 매번 새로운 프로미스를 받아, 영원히 '대기' 상태로 판단함
  const user = use(userPromise);

  return <h1>{user.name}</h1>;
}