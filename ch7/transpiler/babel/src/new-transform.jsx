// 새로운 JSX 변환(React 17+) 예제
// 이 파일은 React를 import하지 않아도 됩니다

// 간단한 JSX 예제 
const element = <h1 className="welcome">Hello, New JSX Transform!</h1>;

// 중첩된 JSX 예제
const nestedElement = (
  <div className="container">
    <h2 className="title">React 17+ JSX 변환</h2>
    <p className="content">
      React 17부터는 JSX를 위해 React를 import할 필요가 없습니다.
    </p>
    <button onClick={() => console.log('클릭됨!')}>
      클릭해보세요
    </button>
  </div>
);

// 기능적으로는 동일하지만, import React가 필요하지 않음
console.log('새로운 JSX 변환 예제 파일이 로드되었습니다.'); 