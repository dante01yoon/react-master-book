import { useEffect, useRef } from "react";

function SearchInput() {
  // HTMLInputElement를 참조하기 위한 ref 생성
  const inputRef = useRef<HTMLInputElement>(null);
 
 
  useEffect(() => {
    // 컴포넌트 마운트 시 input 요소에 자동으로 포커스를 줌
    inputRef.current?.focus();
  }, []); // 의존성 배열이 비어있으므로 마운트 시 한 번만 실행됨
 
 
  // input 요소에 ref를 연결함
  return <input ref={inputRef} type="text" placeholder="검색어 입력" />;
 }
 