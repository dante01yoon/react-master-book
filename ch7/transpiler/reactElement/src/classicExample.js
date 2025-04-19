// Classic JSX Transformation Example
// Shows how React.createElement is used during transpilation

// React.createElement 함수를 직접 구현하여 작동 방식 이해하기
function createElement(type, props = {}, ...children) {
  return {
    $$typeof: Symbol.for('react.element'),
    type,
    props: {
      ...props,
      children: children.length === 1 ? children[0] : children
    },
    key: props?.key || null,
    ref: props?.ref || null
  };
}

// JSX로 작성된 코드가 변환되는 방식 시연
console.log('\n===== Classic JSX Transformation =====\n');

// JSX: <div className="container">Hello, world!</div>
const element1 = createElement('div', { className: 'container' }, 'Hello, world!');
console.log('Simple Element:');
console.log(JSON.stringify(element1, (key, value) => 
  key === '$$typeof' ? '$$typeof: Symbol(react.element)' : value, 2));

// JSX: 
// <div className="container">
//   <h1>Title</h1>
//   <p>Paragraph</p>
// </div>
const element2 = createElement(
  'div',
  { className: 'container' },
  createElement('h1', null, 'Title'),
  createElement('p', null, 'Paragraph')
);

console.log('\nNested Elements:');
console.log(JSON.stringify(element2, (key, value) => 
  key === '$$typeof' ? '$$typeof: Symbol(react.element)' : value, 2));

// JSX: <CustomComponent name="John" age={30}>Child content</CustomComponent>
function CustomComponent(props) {
  return createElement('div', null, `Hello, ${props.name}! Age: ${props.age}, Children: ${props.children}`);
}

const element3 = createElement(CustomComponent, { name: 'John', age: 30 }, 'Child content');
console.log('\nComponent with Props:');
console.log(JSON.stringify(element3, (key, value) => 
  key === '$$typeof' ? '$$typeof: Symbol(react.element)' : value, 2)); 