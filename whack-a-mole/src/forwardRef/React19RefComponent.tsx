// React 19에서 함수 컴포넌트의 ref 처리 방식 변경을 보여주는 예시 파일
// 더 이상 React.forwardRef를 사용하지 않고도 함수 컴포넌트에 직접 ref를 전달할 수 있음
import { RefObject, useRef } from "react";

// React19RefComponent의 props 타입을 정의하는 인터페이스
interface React19RefComponentProps {
  // React 19부터 함수 컴포넌트는 'ref'를 일반 prop처럼 받을 수 있음
  // 이전 버전에서는 forwardRef HOC(고차 컴포넌트)가 필요했음
  // ref의 타입으로 React 내장 타입인 RefObject를 사용함. HTMLDivElement를 참조하거나 null일 수 있음
  // 'ref?'와 같이 물음표를 사용하여 이 prop이 선택적(optional)임을 명시할 수 있음
  // 여기서는 필수 prop으로 가정하고 작성함 (실제 코드에서는 'ref?: ...'로 되어 있었으나, 사용 예시에서는 필수로 전달하고 있으므로 설명을 위해 명확히 함)
  // 만약 ref prop이 선택적이라면 타입 정의는 `ref?: RefObject<HTMLDivElement | null>;` 와 같이 할 수 있음
  ref: RefObject<HTMLDivElement | null>; // 현재 코드에서는 props.ref를 사용하므로 이와 같이 수정
}

// React 19 스타일의 함수 컴포넌트
// props 객체를 통해 직접 'ref' prop을 수신함
const React19RefComponent = (props: React19RefComponentProps) => {
  // 전달받은 ref (props.ref)를 내부의 div 엘리먼트의 ref 속성에 할당함
  // 이를 통해 부모 컴포넌트에서 이 div 엘리먼트에 직접 접근 가능하게 됨
  return <div ref={props.ref}>React 19 Ref Component</div>;
};

// React19RefComponent를 사용하는 부모 컴포넌트 예시
const ParentComponent = () => {
  // useRef를 사용하여 HTMLDivElement를 참조할 수 있는 ref 객체(myRef)를 생성함
  // 초기값은 null로 설정됨. 이 ref는 React19RefComponent 내부의 div를 가리키게 됨
  const myRef = useRef<HTMLDivElement | null>(null);

  // React19RefComponent에 myRef를 'ref'라는 이름의 prop으로 전달함
  // React 19에서는 이것이 자동으로 올바르게 처리되어 자식 컴포넌트의 DOM에 연결됨
  return <React19RefComponent ref={myRef} />;
};

export default ParentComponent; // 예시 사용을 위해 ParentComponent를 export 하거나, 필요에 따라 React19RefComponent를 export 할 수 있음
 