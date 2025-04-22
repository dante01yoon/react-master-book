// 직접 만든 태그드 템플릿 기반 스타일드 컴포넌트
import React, { createElement } from 'react';

// 하이픈 케이스(kebab-case)를 카멜 케이스(camelCase)로 변환하는 헬퍼 함수
// 예: 'background-color' → 'backgroundColor'
const buildCamelCase = (str) => {
  return str.replace(/-([a-z])/g, (...args) => {
    // 정규식에서 캡처한 그룹(하이픈 다음의 문자)을 대문자로 변환
    return args[1].toUpperCase();
  });
};

// CSS 문자열을 리액트 스타일 객체로 변환하는 헬퍼 함수
// 예: 'color: red; font-size: 16px;' → { color: 'red', fontSize: '16px' }
export const buildCssObject = (str) => {
  return str
    .trim() // 앞뒤 공백 제거
    .split(";") // 세미콜론으로 각 스타일 규칙 분리
    .map((c) => c.split(":")) // 각 규칙을 키와 값으로 분리
    .reduce((accu, [key, val]) => {
      if (val) { // 값이 존재하는 경우에만 처리
        // 키는 카멜케이스로 변환하고 모든 공백과 줄바꿈 제거
        // 값은 공백을 제거하여 정규화
        accu[buildCamelCase(key).replaceAll(/[ \n]*/g, '')] = val.replaceAll(' ', '');
      }
      return accu;
    }, {}); // 빈 객체로 시작하여 스타일 객체 생성
};

// 간단한 custom styled-components 구현 - 태그드 템플릿 리터럴 활용
const DanteStyled = {
  // div 요소를 위한 태그드 템플릿 함수
  div: (css, ...dynamicValues) => (props) => {
    // css: 정적 문자열 부분의 배열
    // dynamicValues: 템플릿 리터럴 내 동적 표현식의 평가값 배열
    
    // 정적 CSS 문자열 시작 (첫 번째 부분)
    let compiledCss = css[0];
    
    // 동적 값들과 정적 CSS 문자열을 번갈아가며 결합
    dynamicValues.forEach((val, i) => {
      // 동적 값이 함수인 경우 (props를 인자로 받는 함수) props를 전달하여 실행
      // 이를 통해 props에 기반한 조건부 스타일링 구현 가능
      const dynamicValue = typeof val === 'function' ? val(props) : val;
      // 동적 값 + 다음 정적 CSS 문자열 부분 결합
      compiledCss += dynamicValue + css[i + 1];
    });
    
    // React.createElement를 사용하여 div 요소 생성
    return createElement('div', {
      ...props, // 컴포넌트에 전달된 모든 props를 그대로 전달
      // CSS 문자열을 리액트 스타일 객체로 변환하고, 추가 인라인 스타일이 있으면 병합
      // 이를 통해 props.style로 스타일 오버라이딩 가능
      style: Object.assign(buildCssObject(compiledCss), props.style || {})
    }, props.children); // 자식 요소 전달
  },
  
  // button 요소를 위한 태그드 템플릿 함수 - div와 동일한 로직 적용
  button: (css, ...dynamicValues) => (props) => {
    // div와 동일한 CSS 문자열 조합 로직
    let compiledCss = css[0];
    
    dynamicValues.forEach((val, i) => {
      // props 기반 동적 값 처리
      const dynamicValue = typeof val === 'function' ? val(props) : val;
      compiledCss += dynamicValue + css[i + 1];
    });
    
    // button 요소 생성
    return createElement('button', {
      ...props,
      style: Object.assign(buildCssObject(compiledCss), props.style || {})
    }, props.children);
  }
};

// 정적 스타일을 가진 컴포넌트
const DanteBox = DanteStyled.div`
  color: black;
  background-color: #555;
  padding: 16px;
  border-radius: 4px;
  font-family: sans-serif;
`;

// 동적 스타일을 가진 컴포넌트 (props 활용)
const DanteButton = DanteStyled.button`
  background-color: ${props => props.primary ? '#FFD700' : '#FFFFFF'};
  color: ${props => props.primary ? '#000000' : '#333333'};
  padding: 8px 16px;
  border: 2px solid #FFD700;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
`;

// 예제 컴포넌트
const CustomStyledComponent = () => {
  return (
    <div>
      {/* 정적 스타일 + 인라인 스타일 오버라이딩 */}
      <DanteBox style={{ color: "white" }}>
        GoldenRabbit - 흰색 텍스트
      </DanteBox>
      
      {/* 정적 스타일만 적용 */}
      <DanteBox>
        GoldenRabbit - 검은색 텍스트
      </DanteBox>
      
      {/* 동적 스타일 적용 - props 활용 */}
      <DanteButton>일반 버튼</DanteButton>
      <DanteButton primary>프라이머리 버튼</DanteButton>
    </div>
  );
};

export default CustomStyledComponent; 