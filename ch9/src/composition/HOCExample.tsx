import React, { useState, useEffect, ComponentType } from 'react';

// HOC에 전달될 프롭스에 isLoading을 포함하도록 확장하는 타입
interface WithLoadingProps {
  isLoading: boolean;
}

/**
 * 로딩 상태를 처리하는 고차 컴포넌트 (HOC)
 * @param WrappedComponent - 감싸질 컴포넌트
 * @returns 로딩 상태가 처리되는 새로운 컴포넌트
 */
// P의 제약 조건을 Record<string, unknown>으로 변경하여 더 명시적인 객체 타입으로 제한함
const withLoadingSpinner = <P extends Record<string, unknown>>(WrappedComponent: ComponentType<P>) => {
  // 반환되는 새로운 컴포넌트 정의
  // P 타입의 프롭스와 WithLoadingProps 타입의 프롭스를 모두 받음
  const ComponentWithLoadingSpinner: React.FC<P & WithLoadingProps> = ({ isLoading, ...props }) => {
    // isLoading 프롭이 true이면 로딩 스피너 또는 메시지를 표시함
    if (isLoading) {
      return <div>로딩 중...</div>;
    }

    // isLoading이 false이면 원본 컴포넌트를 렌더링하고 나머지 프롭스를 전달함
    // props를 P 타입으로 단언하여 타입 에러 방지
    return <WrappedComponent {...(props as unknown as P)} />;
  };

  // 디버깅 시 컴포넌트 이름을 명확히 하기 위한 displayName 설정
  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  ComponentWithLoadingSpinner.displayName = `WithLoadingSpinner(${wrappedComponentName})`;

  return ComponentWithLoadingSpinner;
};

// --- HOC를 사용할 기본 컴포넌트 정의 ---

// UserProfile 컴포넌트의 프롭스 타입 정의
interface UserProfileProps {
  userId: string;
  name: string;
  email: string;
}

// 사용자 프로필 정보를 표시하는 간단한 컴포넌트
const UserProfile: React.FC<UserProfileProps> = ({ userId, name, email }) => {
  return (
    <div>
      <h3>사용자 프로필 (ID: {userId})</h3>
      <p>이름: {name}</p>
      <p>이메일: {email}</p>
    </div>
  );
};

// withLoadingSpinner HOC를 UserProfile 컴포넌트에 적용함
// UserProfileProps 타입을 명시적으로 전달하여 타입 호환성 문제 해결
const UserProfileWithLoading = withLoadingSpinner<UserProfileProps & Record<string, unknown>>(UserProfile);

// HOC 예제를 보여주는 애플리케이션 컴포넌트
const HOCExampleApp: React.FC = () => {
  // 로딩 상태와 사용자 데이터를 관리하기 위한 상태 훅
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<Omit<UserProfileProps, 'userId'> | null>(null); // userId는 고정값이므로 제외

  // 컴포넌트 마운트 시 데이터를 비동기적으로 가져오는 시뮬레이션
  useEffect(() => {
    const fetchUserData = () => {
      // 2초 후 로딩 상태를 false로 변경하고 사용자 데이터 설정
      setTimeout(() => {
        setUserData({ name: '김리액트', email: 'react.kim@example.com' });
        setIsLoading(false);
      }, 2000);
    };

    fetchUserData();
  }, []); // 빈 의존성 배열로 마운트 시 1회만 실행되도록 함

  return (
    <div>
      {/* 
        UserProfileWithLoading 컴포넌트 사용.
        isLoading 프롭에 따라 로딩 메시지 또는 UserProfile이 렌더링됨.
        userData가 로드되면 UserProfile에 필요한 프롭스(userId, name, email) 전달.
      */}
      {userData ? (
        <UserProfileWithLoading 
          isLoading={isLoading} 
          userId="user-123" 
          name={userData.name} 
          email={userData.email} 
        />
      ) : (
        // userData가 아직 없을 경우 (초기 상태 또는 로딩 중)
        <UserProfileWithLoading 
          isLoading={isLoading} 
          userId="user-123" 
          name="" // 기본값 전달
          email="" // 기본값 전달
        />
      )}
    </div>
  );
};

export default HOCExampleApp; 