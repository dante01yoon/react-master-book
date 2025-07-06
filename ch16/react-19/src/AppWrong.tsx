// (이 코드는 설명을 위한 안티패턴 예시이며, 실제 사용을 권장하지 않습니다.)
import React, { use, Suspense } from 'react';
import { fetchUser } from './fakeApiForUse'; // fetchUser는 프로미스를 반환한다고 가정

function UserProfileWrong() {
  // ➊ 컴포넌트 렌더링 시 매번 새로운 fetchUser() 프로미스가 생성됨
  const userPromise = fetchUser(); 
  const user = use(userPromise); // ➋ 매번 새로운 프로미스를 use에 전달

  return <h1>{user.name}</h1>;
}

export default function AppWrong() {
  return (
    <Suspense fallback={<p>로딩 중...</p>}>
      <UserProfileWrong />
    </Suspense>
  );
}