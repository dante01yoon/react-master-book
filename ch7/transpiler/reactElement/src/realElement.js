/**
 * 실제 React.createElement 함수를 사용한 예제
 *
 * 이 예제는 실제 React 라이브러리의 React.createElement 함수를 사용하여
 * ReactElement 객체를 생성하고 구조를 살펴봅니다.
 */

const React = require('react');

// 간단한 ReactElement 생성
console.log('\n===== 실제 React.createElement 예제 =====\n');

// 기본 HTML 태그 엘리먼트
const simpleElement = React.createElement('h1', { className: 'title' }, 'Hello Virtual DOM');
console.log('기본 HTML 태그 엘리먼트:');
console.log(simpleElement);
console.log('\n엘리먼트 구조 (객체로):');
console.log({
  type: simpleElement.type,
  props: simpleElement.props,
  key: simpleElement.key,
  ref: simpleElement.ref,
  $$typeof: String(simpleElement.$$typeof)
});

// 중첩된 엘리먼트
const nestedElement = React.createElement(
  'div',
  { className: 'container' },
  React.createElement('h1', { style: { color: 'blue' } }, '제목'),
  React.createElement('p', null, '내용 텍스트'),
  React.createElement('button', { onClick: () => console.log('클릭!') }, '클릭하세요')
);

console.log('\n중첩된 엘리먼트 구조:');
console.log('type:', nestedElement.type);
console.log('props:', nestedElement.props);
console.log('props.children 배열 길이:', nestedElement.props.children.length);
console.log('첫 번째 자식 type:', nestedElement.props.children[0].type);

// 함수 컴포넌트 사용
function MyComponent(props) {
  return React.createElement('div', null, `안녕하세요, ${props.name}님!`);
}

const componentElement = React.createElement(MyComponent, { name: '리액트' });
console.log('\n함수 컴포넌트 엘리먼트:');
console.log('type:', typeof componentElement.type); // 'function'
console.log('function name:', componentElement.type.name);
console.log('props:', componentElement.props);

// 가상 DOM과 실제 DOM의 관계
console.log('\n가상 DOM과 실제 DOM의 관계:');
console.log('1. JSX → React.createElement() → ReactElement 객체 (가상 DOM)');
console.log('2. ReactElement 객체들이 트리 구조를 형성');
console.log('3. React는 이 가상 DOM 트리를 이전 트리와 비교(diff)');
console.log('4. 변경된 부분만 실제 DOM에 업데이트');
console.log('5. 이를 통해 효율적인 UI 렌더링 구현'); 