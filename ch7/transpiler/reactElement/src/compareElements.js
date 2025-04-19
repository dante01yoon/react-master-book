/**
 * React.createElement와 jsx 함수 비교 예제
 * 
 * 이 파일은 React.createElement(Classic)와 jsx 함수(Automatic)가
 * 어떻게 다른 방식으로 ReactElement를 생성하는지 비교합니다.
 */

// 실제 React 패키지 사용
const React = require('react');

// 가상 DOM과 ReactElement 구조 분석
console.log('\n===== React.createElement vs jsx/jsxs 함수 비교 =====\n');

// 1. React.createElement로 엘리먼트 생성 (Classic 변환)
console.log('1. React.createElement 방식 (Classic):');
const classicElement = React.createElement(
  'div', 
  { className: 'container', id: 'root' },
  React.createElement('h1', null, '제목'),
  React.createElement('p', null, '내용')
);

// ReactElement 구조 출력
console.log(classicElement);
return;
console.log(JSON.stringify(classicElement, (key, value) => 
  key === '$$typeof' || key === '_owner' || key === '_store' ? 
    String(key) + ': [Symbol/Object]' : value, 2));

// 2. jsx/jsxs 함수로 동일한 엘리먼트 생성 (Automatic 변환 시뮬레이션)
console.log('\n2. jsx/jsxs 함수 방식 (Automatic) - 시뮬레이션:');

// jsx/jsxs 함수 구현 (React 17+ 방식 시뮬레이션)
const _jsx = (type, props) => {
  return {
    $$typeof: Symbol.for('react.element'),
    type,
    props,
    key: props?.key || null,
    ref: props?.ref || null
  };
};

const automaticElement = _jsx('div', {
  className: 'container',
  id: 'root',
  children: [
    _jsx('h1', { children: '제목' }),
    _jsx('p', { children: '내용' })
  ]
});

console.log(JSON.stringify(automaticElement, (key, value) => 
  key === '$$typeof' ? '$$typeof: [Symbol]' : value, 2));

// 3. 차이점 분석
console.log('\n3. 두 방식의 주요 차이점:');
console.log('- Classic: children은 props의 일부가 아닌 별도 인자로 전달');
console.log('- Automatic: children이 props 객체 내부에 포함됨');
console.log('- Classic: createElement 함수 하나로 모든 종류의 엘리먼트 생성');
console.log('- Automatic: jsx와 jsxs 두 함수로 분리 (최적화 목적)');
console.log('- Classic: React를 명시적으로 import 해야 함');
console.log('- Automatic: react/jsx-runtime에서 함수를 자동 import');
console.log('\n하지만 두 방식 모두 동일한 ReactElement 객체 구조를 반환합니다:');
console.log('{ $$typeof, type, props, key, ref, _owner, ... }');

// 4. React Element 객체의 의미
console.log('\n4. React Element 객체의 의미:');
console.log('- 이 객체는 UI의 경량 표현(가상 DOM)');
console.log('- $$typeof: React 엘리먼트 타입 식별자 (XSS 공격 방지)');
console.log('- type: DOM 요소(문자열) 또는 React 컴포넌트(함수/클래스)');
console.log('- props: 엘리먼트에 전달된 모든 속성 및 자식 요소');
console.log('- key: 리스트 렌더링 시 요소 식별용 (reconciliation 최적화)');
console.log('- ref: DOM 노드 또는 컴포넌트 인스턴스 참조용');
console.log('- React는 이런 불변 객체 트리를 사용해 효율적으로 UI 업데이트 수행'); 