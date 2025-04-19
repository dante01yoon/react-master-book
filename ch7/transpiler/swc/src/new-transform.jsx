// SWC 새로운 JSX 변환 예제 (React 17+)
// automatic 런타임을 사용할 경우 React import가 필요 없음

// 간단한 JSX 예제
const element = <h1 className="welcome">Hello, New SWC Transform!</h1>;

// 중첩된 JSX 예제
const nestedElement = (
  <div className="container">
    <h2 className="title">SWC의 새로운 JSX 변환</h2>
    <p className="content">
      React 17부터는 JSX를 위해 React를 import할 필요가 없습니다.
      SWC는 이러한 새 변환도 지원합니다.
    </p>
    <button onClick={() => console.log('클릭됨!')}>
      클릭해보세요
    </button>
  </div>
);

// 커스텀 컴포넌트 - React import 없이도 작동
const MyButton = ({ color, children }) => (
  <button 
    style={{ backgroundColor: color, color: 'white', padding: '10px' }}
  >
    {children}
  </button>
);

const customComponentExample = <MyButton color="green">Automatic Transform</MyButton>;

// 기능적으로는 이전과 동일하지만, import React가 필요하지 않음
console.log('SWC 새로운 JSX 변환 예제 파일이 로드되었습니다.'); 