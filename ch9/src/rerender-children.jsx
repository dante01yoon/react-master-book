import { useState, useEffect } from "react";

const StaticChild = () => {
  console.log("Static 컴포넌트가 리렌더링 되었습니다.")
   return <div>Static Child</div>;
 } 

// ➊ 자식 컴포넌트: Parent가 리렌더링될 때마다 함께 리렌더링됨
const ChildComponent = () => {
  console.log('ChildComponent rendered');
  return <div>자녀 컴포넌트</div>;
 };
 
// 부모 컴포넌트 정의: children prop을 받음
const Parent = ({ children }) => {
  // count 상태: 변경 시 Parent 리렌더링 유발
  const [count, setCount] = useState(0);
  console.log('Parent rendered');

  // 1초마다 count 상태 업데이트 -> Parent 리렌더링 유발
  useEffect(() => {
    const interval = setInterval(() => setCount(c => c + 1), 1000);
    return () => clearInterval(interval);
  }, []);
 
  return (
    <div>
      <h1>Count: {count}</h1>
      {/* 
        Case 1: 일반 자식 컴포넌트
        이 JSX는 Parent 컴포넌트의 렌더링 스코프 내에 있음.
        Parent가 리렌더링될 때마다 <ChildComponent />는 새로운 React 엘리먼트로 다시 생성되므로,
        React는 이 컴포넌트를 항상 리렌더링함.
      */}
      <ChildComponent />

      {/* 
        Case 2: children prop으로 전달된 컴포넌트
        children prop은 Parent를 사용하는 상위 컴포넌트(App) 스코프에서 생성됨.
        Parent가 리렌더링되어도 App이 리렌더링되지 않는 한 children 참조는 동일하게 유지됨.
        따라서 React는 children이 변경되지 않았다고 판단하여 리렌더링하지 않음.
      */}
      {children} 
    </div>
  );
 };
 
// props.children으로 전달될 컴포넌트
const RerenderChecker = () => {
  // 이 컴포넌트가 리렌더링될 때 로그 출력
  console.log('RerenderChecker rerendered')
  return <div>props.children 컴포넌트</div>
}

// 최상위 App 컴포넌트
const App = () => (
  // Parent 컴포넌트에 RerenderChecker를 children으로 전달함
  <Parent>
    <RerenderChecker />
  </Parent>
);
 


export default App;