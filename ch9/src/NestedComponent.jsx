// 자식 컴포넌트 정의함
function ChildComponent() {
  return (
    <div>Child component </div>
  )
}

// 중첩된 컴포넌트 정의함. ChildComponent를 렌더링함.
const NestedComponent = () => {
  return (
    <>
      <div>Nested component </div>
      <ChildComponent /> 
    </>
  )
}

// children prop을 받아 렌더링하는 컴포넌트 정의함.
function ChildrenComponent({children}) {
  return (
    <>
      <div>ChildrenComponent</div>
      {children}
    </>
  )
}

// 애플리케이션의 메인 컴포넌트 정의함. ChildrenComponent와 NestedComponent를 렌더링함.
function MyApp() {
  return (
    <div>
      <ChildrenComponent>
       <ChildComponent key="I'm children"/>
      </ChildrenComponent>
     <NestedComponent></NestedComponent> 
    </div>
  );
}

export default MyApp;


/**
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
function ChildComponent() {
  return _jsx("div", {
    children: "Child component "
  });
}
function MyApp() {
  return _jsxs("div", {
    children: [
      _jsx(ChildrenComponent, {
        children: _jsx(ChildComponent, {}, "I'm children")
        }), 
     _jsx(NestedComponent, {})]
  });
}
function NestedComponent() {
  return _jsxs(_Fragment, {
    children: [
      _jsx("div", {
        children: "Nested component "
      }), 
     _jsx(ChildComponent, {})]
  });
}
function ChildrenComponent({
  children
}) {
  return _jsxs(_Fragment, {
    children: [
      _jsx("div", {
        children: "ChildrenComponent"
      }),
      children]
  });
}
*/


// 데이터를 사용하는 컴포넌트를 직접 children으로 전달
function ParentComponent() {
  const data = useRabbitData(); 
  // ParentComponent는 데이터 로딩만 담당
  return (
    // 데이터를 직접 사용하지 않는 중간 컴포넌트
    <IntermediateComponent> 
      {/* 데이터를 필요로 하는 ChildComponent를 children으로 전달 */}
      <ChildComponent data={data} /> 
    </IntermediateComponent>
  );
}

// IntermediateComponent는 children을 그대로 렌더링
function IntermediateComponent({ children }: { children: React.ReactNode }) {
  // 이 컴포넌트는 data를 알 필요가 없음
  console.log("IntermediateComponent 렌더링");
  return (
    <div>
      <h2>중간 컴포넌트</h2>
      {children} {/* 전달받은 children(ChildComponent)을 렌더링 */}
    </div>
  );
}

// ChildComponent는 전달받은 data 사용
function ChildComponent({ data }) { 
  console.log("ChildComponent 렌더링");
  return (
    <div>
      <h3>자식 컴포넌트</h3>
      <p>받은 데이터: {JSON.stringify(data)}</p>
    </div>
  );
}