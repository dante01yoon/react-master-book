import React, { useState, useEffect, ComponentType } from 'react';

// HOC에 의해 주입될 프롭스 타입
interface WithLoadingProps {
  isLoading: boolean;
}

// ➊ 로딩 스피너 HOC 정의
// 제네릭 <P>를 사용하여 어떤 프롭스를 가진 컴포넌트에도 적용 가능하게 함
const withLoadingSpinner = <P extends object>(WrappedComponent: ComponentType<P>) => {

  // HOC가 반환할 새로운 컴포넌트
  const ComponentWithLoadingSpinner: React.FC<P & WithLoadingProps> = ({ isLoading, ...props }) => {
    // isLoading 프롭스가 true이면 로딩 메시지를 표시함
    if (isLoading) {
      return <div>로딩 중...</div>;
    }

    // isLoading이 false이면 원본 컴포넌트를 렌더링하고 나머지 프롭스를 전달함
    return <WrappedComponent {...(props as P)} />;
  };
  
  // React 개발자 도구에서 컴포넌트 이름을 명확히 하기 위한 설정
  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  ComponentWithLoadingSpinner.displayName = `WithLoadingSpinner(${wrappedComponentName})`;

  return ComponentWithLoadingSpinner;
};

// 사용자 프로필 정보를 표시하는 원본 컴포넌트
interface UserProfileProps {
  userId: string;
  name: string;
  email: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId, name, email }) => {
  return (
    <div>
      <h3>사용자 프로필 (ID: {userId})</h3>
      <p>이름: {name}</p>
      <p>이메일: {email}</p>
    </div>
  );
};

// ➋ withLoadingSpinner HOC를 UserProfile 컴포넌트에 적용함
const UserProfileWithLoading = withLoadingSpinner(UserProfile);

// HOC 예제를 보여주는 애플리케이션 컴포넌트
const HOCExampleApp: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserProfileProps | null>(null);

  // 컴포넌트 마운트 시 데이터를 비동기적으로 가져오는 것을 시뮬레이션
  useEffect(() => {
    setTimeout(() => {
      setUserData({
        userId: 'user-123',
        name: '단테',
        email: 'dante@example.com',
      });
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      <h1>고차 컴포넌트 예제</h1>
      <UserProfileWithLoading isLoading={loading} {...userData} />
    </div>
  );
};

export default HOCExampleApp;