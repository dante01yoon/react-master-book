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
      <div>중첩 컴포넌트</div>
      {/* ➊ NestedComponent가 렌더링될 때마다 ChildComponent도 함께 생성되고 렌더링됨 */}
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
      {/* 합성: MyApp이 ChildComponent를 생성하여 children으로 전달 */}
      <ChildrenComponent>
       <ChildComponent key="I'm children"/>
      </ChildrenComponent>
      {/* 중첩: MyApp은 NestedComponent만 생성 */}
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
// MyApp의 JSX를 바벨로 변환한 결과 (개념적)
_jsxs("div", {
  children: [
    // ➊ MyApp이 ChildComponent 엘리먼트를 생성하고, 그 결과를 children 프롭으로 전달
    _jsx(ChildrenComponent, {
      children: _jsx(ChildComponent, {})
    }),
    // ➋ MyApp은 NestedComponent 엘리먼트만 생성. ChildComponent 생성은 NestedComponent의 역할
    _jsx(NestedComponent, {})
  ]
});

// NestedComponent의 변환 결과 (개념적)
_jsxs("div", {
  children: [
    _jsx("h3", {}),
    // ➌ NestedComponent의 렌더링 로직 안에서 ChildComponent 엘리먼트가 생성됨
    _jsx(ChildComponent, {})
  ]
});
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