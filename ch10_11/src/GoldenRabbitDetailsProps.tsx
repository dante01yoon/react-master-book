import React, { FC } from 'react';

// 기본 프롭스 타입을 정의하는 인터페이스
interface GoldenRabbitDetailsProps {
  name: string; // 필수 프롭스: 이름
  age: number; // 필수 프롭스: 나이
  isHidden?: boolean; // 선택적 프롭스: 숨김 여부. 기본값이 지정될 예정임
}


// FC를 사용한 기본 함수 컴포넌트 정의
const GoldenRabbitDetails: FC<GoldenRabbitDetailsProps> = ({ 
  name, // 이름 프롭스 구조 분해 할당
  age, // 나이 프롭스 구조 분해 할당
  isHidden = false // isHidden 프롭스 구조 분해 할당 및 기본값 false 지정
}) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>Age: {age}</p>
      <p>Status: {isHidden ? "Hidden" : "Visible"}</p>
    </div>
  );
};

// children을 포함하는 프롭스 타입을 정의하는 인터페이스 (children은 PropsWithChildren이 자동으로 추가함)
interface GoldenRabbitDetailsWithChildrenProps {
  name: string; // 필수 프롭스: 이름
  age: number; // 필수 프롭스: 나이
  isHidden?: boolean; // 선택적 프롭스: 숨김 여부
}

// React.PropsWithChildren을 사용하여 children 프롭스를 자동으로 포함하는 컴포넌트 정의
const GoldenRabbitDetailsWithChildren: React.FC<React.PropsWithChildren<GoldenRabbitDetailsWithChildrenProps>> = ({ 
  name, // 이름 프롭스
  age, // 나이 프롭스
  isHidden = false, // isHidden 프롭스 기본값 설정
  children // PropsWithChildren에 의해 자동으로 추가된 children 프롭스
}) => {
  return (
    <div>
      <h1>{name} (with children)</h1>
      <p>Age: {age}</p>
      <p>Status: {isHidden ? "Hidden" : "Visible"}</p>
      <div>{children}</div>
    </div>
  );
};

// 부모 컴포넌트: 위에서 정의한 자식 컴포넌트들을 사용함
const GoldenRabbitApp: React.FC = () => {
  return (
    <div>
      {/* GoldenRabbitDetails 컴포넌트 사용 예시 */}
      <GoldenRabbitDetails name="Goldie" age={3} />
      {/* isHidden 프롭스는 기본값이 사용됨 (false) */}
      
      <GoldenRabbitDetails name="Silvie" age={parseInt("four")} isHidden={true} />
      {/* age에 문자열 "four"를 숫자로 변환 시도 (NaN 발생 가능성 있음) */}
      {/* isHidden 프롭스 명시적으로 true 전달 */}

      {/* GoldenRabbitDetailsWithChildren 컴포넌트 사용 예시 */}
      <GoldenRabbitDetailsWithChildren name="Fluffy" age={1}>
        <span>This is a child element</span>
      </GoldenRabbitDetailsWithChildren>
    </div>
  );
};


export default GoldenRabbitApp; 