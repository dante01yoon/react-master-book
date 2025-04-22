import React from 'react';

/**
 * 토끼 이름표 컴포넌트의 props 타입 정의
 */
interface RabbitNameTagProps {
  rabbit: {
    age: number;
  }
}

/**
 * 토끼 이름표를 표시하는 컴포넌트
 * @param rabbit - 토끼 정보를 담은 객체
 */
export const RabbitNameTag = ({ rabbit }: RabbitNameTagProps) => {
  return (
    <div>
      {/* rabbit이 0살이라면 조건식이 거짓으로 평가가 되어 렌더링되지 않음 */}
      {rabbit.age && <p>Age: {rabbit.age}</p>}
      
      {/* 다음 값들 중 일부는 React에서 렌더링되지 않음 */}
      {NaN} {/* NaN은 'NaN'으로 렌더링됨 */}
      {false} {/* false는 렌더링되지 않음 */}
      {undefined} {/* undefined는 렌더링되지 않음 */}
      {null} {/* null은 렌더링되지 않음 */}  
    </div>
  );
}

/**
 * 삼항연산자를 통해 명시적으로 조건부 렌더링 사용하기
 */
export const TernaryOperatorExample = () => {
  // 사용자 정보를 담은 객체
  const user = {
    name: 'John',    // 사용자 이름
    age: 25,         // 사용자 나이
  }

  return (
    <div>
      {/* 
        삼항 연산자를 사용한 조건부 렌더링:
        - user.age가 0 초과면 환영 메시지 표시
        - user.age가 0 이하면 로그인 요청 메시지 표시
      */}
      { user.age > 0 ? <p>Welcome, {user.name}!</p> : <p>Please log in.</p>}
    </div>
  );
}