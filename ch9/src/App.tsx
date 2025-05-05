// 자식 컴포넌트 정의
// 부모로부터 message라는 이름의 프롭스를 받음
const ChildComponent = ({ message }: { message: string }) => {
  return (
    <div>
      {/* 전달받은 message 프롭스를 화면에 표시함 */}
      자식 컴포넌트가 받은 메시지: {message}
    </div>
  );
};

// 부모 컴포넌트 정의
const ParentComponent = () => {
  // 자식에게 전달할 문자열 데이터 정의
  const data = "Hello, GoldenRabbit!";

  return (
    <div>
      <h1>부모 컴포넌트</h1>
      {/* ChildComponent를 렌더링하고 message 프롭스로 data를 전달함 */}
      <ChildComponent message={data} />
    </div>
  );
};

// App 컴포넌트는 ParentComponent를 렌더링함
function App() {
  return <ParentComponent />;
}

export default App; 