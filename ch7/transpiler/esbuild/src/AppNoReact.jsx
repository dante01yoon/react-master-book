// AppNoReact.jsx - automatic 런타임용 JSX 예시
// React를 import하지 않아도 JSX 사용 가능 (automatic 모드에서)

// 간단한 JSX 컴포넌트 (React import 없음)
export const App = () => {
  return <div className="app">Hello esbuild with Automatic Runtime</div>;
};

// 중첩된 JSX 예제
export const NestedComponent = () => {
  return (
    <div className="container">
      <h1 className="title">Automatic JSX Transform</h1>
      <p className="content">
        React 17부터는 JSX를 위해 React를 import할 필요가 없습니다.
        esbuild도 이 기능을 지원합니다.
      </p>
      <button onClick={() => console.log('클릭됨!')}>
        클릭해보세요
      </button>
    </div>
  );
};

// 커스텀 컴포넌트
export const MyButton = ({ color, children }) => (
  <button 
    style={{ backgroundColor: color, color: 'white', padding: '10px' }}
  >
    {children}
  </button>
);

// 자동 런타임에서는 컴포넌트 합성도 React import 없이 가능
export const ComponentWithButton = () => (
  <div>
    <p>아래는 커스텀 버튼 컴포넌트입니다:</p>
    <MyButton color="green">자동 변환 적용됨</MyButton>
  </div>
); 