// styled-components 예제
import React from 'react';
import styled from 'styled-components';

// 1. 기본 styled-components 사용법
const StyledDiv = styled.div`
  color: white;
  background-color: gray;
  padding: 16px;
  border-radius: 4px;
  margin: 8px;
  font-family: Arial, sans-serif;
`;

// 2. props를 활용하는 styled-components
const Button = styled.button`
  background-color: ${props => props.primary ? '#FFD700' : '#FFFFFF'};
  color: ${props => props.primary ? '#000000' : '#FFD700'};
  padding: 8px 16px;
  border: 2px solid #FFD700;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background-color: ${props => props.primary ? '#E5C100' : '#FFF8E0'};
  }
`;

// 3. 컴포넌트 확장
const ExtendedButton = styled(Button)`
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
`;

// 4. 예제 컴포넌트
const StyledComponentExample = () => {
  return (
    <div>
      <StyledDiv>Golden Rabbit</StyledDiv>
      
      <Button>일반 버튼</Button>
      <Button primary>프라이머리 버튼</Button>
      
      <ExtendedButton>확장된 버튼</ExtendedButton>
      <ExtendedButton primary>확장된 프라이머리 버튼</ExtendedButton>
    </div>
  );
};

export default StyledComponentExample; 