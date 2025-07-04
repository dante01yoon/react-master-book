import { useRef, useEffect } from 'react';

function SearchInput() {
  // ➊ HTMLInputElement 타입을 가진 ref 객체를 생성. 초깃값은 null.
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // ➌ useEffect는 컴포넌트가 렌더링되고, ref가 연결된 후에 실행됨
    // 이 시점에는 inputRef.current가 실제 <input> DOM 노드를 가리킴
    inputRef.current?.focus(); // 옵셔널 체이닝(?.)으로 안전하게 focus() 호출
  }, []); // 마운트 시 한 번만 실행

  // ➋ JSX의 ref 속성을 통해 inputRef와 실제 DOM 노드를 연결
  return <input ref={inputRef} type="text" placeholder="검색어 입력" />;
}