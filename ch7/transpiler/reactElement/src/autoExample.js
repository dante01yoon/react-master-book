// Modern JSX Transformation Example
// Shows how React automatic runtime functions are used in newer JSX transformations

// Automatic Runtime JSX 변환 방식에서 사용되는 함수 구현
function jsx(type, props, key) {
  return {
    $$typeof: Symbol.for('react.element'),
    type,
    key: key === undefined ? null : key,
    ref: null,
    props
  };
}

function jsxs(type, props, key) {
  // 실제로는 jsx와 jsxs는 최적화 목적으로 분리되어 있지만
  // 이 예제에서는 동일하게 구현
  return jsx(type, props, key);
}

// Modern JSX 변환 시연
console.log('\n===== Modern JSX Transformation =====\n');

// JSX: <div className="container">Hello, world!</div>
const element1 = jsx('div', { className: 'container', children: 'Hello, world!' });
console.log('Simple Element (jsx):');
console.log(JSON.stringify(element1, (key, value) => 
  key === '$$typeof' ? '$$typeof: Symbol(react.element)' : value, 2));

// JSX: 
// <div className="container">
//   <h1>Title</h1>
//   <p>Paragraph</p>
// </div>
const element2 = jsxs('div', {
  className: 'container',
  children: [
    jsx('h1', { children: 'Title' }),
    jsx('p', { children: 'Paragraph' })
  ]
});

console.log('\nNested Elements (jsxs):');
console.log(JSON.stringify(element2, (key, value) => 
  key === '$$typeof' ? '$$typeof: Symbol(react.element)' : value, 2));

// JSX: <CustomComponent name="John" age={30}>Child content</CustomComponent>
function CustomComponent(props) {
  return jsx('div', { 
    children: `Hello, ${props.name}! Age: ${props.age}, Children: ${props.children}`
  });
}

const element3 = jsx(CustomComponent, { 
  name: 'John', 
  age: 30, 
  children: 'Child content' 
});

console.log('\nComponent with Props:');
console.log(JSON.stringify(element3, (key, value) => 
  key === '$$typeof' ? '$$typeof: Symbol(react.element)' : value, 2)); 