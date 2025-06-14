import { useState, useEffect } from 'react';

const EnvironmentInfo = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // ➊ 이 useEffect 훅은 클라이언트 사이드에서만 실행됨
    setIsClient(true);
  }, []);

  // ➋ typeof window를 사용하여 현재 실행 환경을 안전하게 감지함
  const currentEnv = typeof window === 'undefined' ? '서버 (Server)' : '클라이언트 (Client)';
  
  // ➌ 초기 렌더링 시에는 서버 환경에서 결정된 envType을 사용하고,
  // 클라이언트에서 하이드레이션 완료 후 isClient 상태에 따라 envType을 업데이트하여
  // Hydration 오류를 방지하고 정확한 환경 정보를 표시함
  const envType = typeof window !== 'undefined' ? '클라이언트 (Client)' : '서버 (Server)';

  /**
   const envType = typeof window !== 'undefined' ? '클라이언트 (Client)' : '서버 (Server)';
   */
  console.log(`I'm running on: ${currentEnv}`);

  return (
    <div>
      <p>이 컴포넌트는 초기에 다음 환경에서 렌더링되었습니다: {envType}.</p>
      {isClient && <p>이 텍스트는 클라이언트 사이드 하이드레이션 이후에만 나타납니다.</p>}
    </div>
  );
};

export default EnvironmentInfo;