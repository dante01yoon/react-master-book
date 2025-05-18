import { useEffect, useRef, useState } from "react";

/**
 // initialValue가 T 타입일 때 randomRef는React.RefObject<T>
 const randomRef = useRef(initialValue);
 */

const ReRender = () => {
const [count, setCount] = useState<number>(0);
 const latestCountRef = useRef<number>(count); // count 상태를 추적하는 ref 생성

 // count 상태가 변경될 때마다 ref의 current 값도 업데이트함
 useEffect(() => {
   latestCountRef.current = count;
 }, [count]);

 useEffect(() => {
   const handleDocumentClick = () => {
     // 이벤트 핸들러 내에서는 ref를 통해 최신 count 값을 참조함
     // 이렇게 하면 useEffect의 의존성 배열에 count를 추가할 필요가 없어짐
     // 결과적으로 handleDocumentClick 함수가 count 변경 시마다 재생성되지 않음
     // (주의: 이 특정 예제에서는 document 클릭이므로, 의존성 배열에 count를 넣는 것과 큰 차이가 없을 수 있으나,
     // 더 복잡한 의존성을 가진 useEffect나, removeEventListener를 정확히 관리해야 하는 경우 유용함)
     console.log(`현재 클릭 시점의 count (ref 사용): ${latestCountRef.current}`);
   };

   document.addEventListener('click', handleDocumentClick);
   console.log('클릭 이벤트 리스너 등록됨');

   // 클린업 함수: 컴포넌트 언마운트 시 또는 useEffect가 재실행되기 전에 이벤트 리스너를 제거함
   return () => {
     document.removeEventListener('click', handleDocumentClick);
     console.log('클릭 이벤트 리스너 제거됨');
   };
 }, []); // 의존성 배열이 비어있으므로, 이 useEffect는 마운트 시 한 번만 실행되고 언마운트 시 클린업됨


 const handleIncrement = () => {
   setCount(c => c + 1);
 };

 return (
  <div>
    <p>현재 카운트: {count}</p>
    <button onClick={handleIncrement}>증가</button>
  </div>
 )
}

export default ReRender;