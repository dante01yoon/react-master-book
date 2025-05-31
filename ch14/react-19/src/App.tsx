import React, { useState } from 'react';
import ProfilePageWithUse from './ProfilePageWithUse';
import { preloadProfileData } from './fakeApiForUse'; // 데이터 미리 로드 함수

// 프로미스들을 담는 resource 객체의 타입 (ProfilePageWithUse.tsx와 동일하게 정의하거나 import)
interface ProfileResource {
  userPromise: Promise<{ name: string }>;
  postsPromise: Promise<{ id: number; text: string }[]>;
}

// 애플리케이션의 루트 컴포넌트 또는 ProfilePageWithUse를 사용하는 상위 컴포넌트
export default function App() {
  // ➊ preloadProfileData()를 호출하여 초기 resource 상태를 설정함
  // useState를 사용하여 resource 상태를 관리함
  const [resource, setResource] = useState<ProfileResource>(() => preloadProfileData());

  // 데이터를 새로고침하는 함수
  const refreshData = () => {
    // 새로운 프로미스들로 resource 상태를 업데이트함
    // preloadProfileData()를 다시 호출하여 새로운 데이터 요청을 시작함
    setResource(preloadProfileData());
  };

  return (
    <div>
      <button
        onClick={refreshData}
        style={{ marginBottom: '20px' }}
      >
        데이터 새로고침
      </button>
      {/* ProfilePageWithUse 컴포넌트에 현재 resource 상태를 프롭스로 전달함 */}
      {/* resource가 변경되면 ProfilePageWithUse는 새로운 프로미스를 받고, use()가 이를 감지하여 UI를 업데이트함 */}
      <ProfilePageWithUse resource={resource} />
    </div>
  );
}