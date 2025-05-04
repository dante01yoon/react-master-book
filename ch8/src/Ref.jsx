import { useEffect, useState, useRef } from 'react';

// Helper function to generate a random hex color
// 랜덤 hex 색상 코드를 생성하는 헬퍼 함수
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

/**
 * useState와 useRef의 차이점을 보여주는 컴포넌트
 */
function StateVsRefComparison() {
  // useState를 사용하여 상태 관리
  // 상태가 변경되면 컴포넌트가 리렌더링됨
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(true); // 기본값을 true로 설정하여 처음에 보이도록 함
  const [countColor, setCountColor] = useState('black'); // 카운트 색상 상태 추가. 기본값은 검정색

  /**
   * toggle 상태를 변경하는 함수
   */
  const handleToggle = () => {
    setToggle(prev => !prev);
  };

  console.log(" 이로직도 수행되고");
  // useRef를 사용하여 ref 관리
  // ref 값 변경은 리렌더링을 유발하지 않음 - postfix
  const countRef = useRef(0);

  const buttonRef = useRef(null);
  // buttonRef.current = null
  // buttonRef.current = 버튼 요소

  /**
   * useState 상태를 증가시키는 함수
   */
  const handleIncrementState = () => {
    setCount(prev => prev + 1);
    // buttonRef.current가 null이 아닐 때만 접근하도록 수정
    if (buttonRef.current) {
      console.log("button의 위치", buttonRef.current.getBoundingClientRect());
      console.log('buttonRef 값:', buttonRef.current); // 콘솔에서 변경 확인 가능
    }
  };

  /**
   * useRef 값을 증가시키는 함수
   * 이 함수 호출만으로는 컴포넌트가 리렌더링되지 않음
   */
  const handleIncrementRef = () => {
    // ref.current 값을 직접 변경
    countRef.current = countRef.current + 1;
    console.log('Ref 값:', countRef.current); // 콘솔에서 변경 확인 가능
  };

  /**
   * 컴포넌트를 강제로 리렌더링하는 함수
   * Ref 값의 변경이 UI에 반영되는 것을 확인하기 위함
   */
  const forceRerender = () => {
    // 상태를 변경하여 리렌더링 유발
    setCount(c => c);
  };

  useEffect(() => {
    // 토글 상태가 true이고 buttonRef.current가 존재할 때만 이벤트 리스너 추가
    if (toggle && buttonRef.current) {
      const buttonElement = buttonRef.current; // 클린업 함수에서 사용하기 위해 변수에 저장
      buttonElement.addEventListener('click', handleIncrementState);

      // 클린업 함수: 컴포넌트 언마운트 또는 toggle 상태 변경 전에 리스너 제거
      return () => {
        console.log('언마운트 될 때 실행')
        buttonElement.removeEventListener('click', handleIncrementState);
      };
    }
    // toggle이 false가 되어 버튼이 사라질 때, 또는 컴포넌트가 언마운트될 때 리스너가 제거됨
  }, [toggle]); // toggle 상태가 변경될 때마다 useEffect 실행


  // 컴포넌트가 마운트 되었을 때


  // count 값이 변경될 때 실행됨
  useEffect(() => {
    // count가 0보다 크고 2의 배수일 때만 색상 변경
    if (count > 0 && count % 2 === 0) {
      // 랜덤 색상 생성
      const newColor = getRandomColor();
      // countColor 상태 업데이트
      setCountColor(newColor);
      // 콘솔에 변경 사항 로깅 (디버깅용)
      console.log(`Count is ${count} (even), changing color to ${newColor}`);
    }
  }, [count]); // count 값이 변경될 때마다 이 effect 실행


  console.log('컴포넌트 렌더링됨도 수행되고');

  return (
    <div>
      <h1>useState vs useRef 비교</h1>
      {/* countColor 상태를 스타일로 적용하여 p 태그의 색상 변경 */}
      <p style={{ color: countColor }}>
        <strong>useState 값 (count):</strong> {count}
      </p>
      <p>
        {/* ref 값은 .current 속성을 통해 접근 */}
        <strong>useRef 값 (countRef):</strong> {countRef.current}
      </p>
      {/* // dataOnClick={handleIncrementState} */}

      {/* toggle 상태에 따라 버튼을 조건부 렌더링 */}
      {toggle && (
        <button ref={buttonRef}>
          useState 값 증가 (리렌더링 발생)
        </button>
      )}

      <button onClick={handleIncrementRef}>
        useRef 값 증가 (리렌더링 없음)
      </button>
      <button onClick={forceRerender}>
        강제 리렌더링 (Ref 값 UI 반영 확인)
      </button>
      {/* 토글 버튼 추가 */}
      <button onClick={handleToggle}>
        {toggle ? '버튼 숨기기' : '버튼 보이기'}
      </button>

      <div>
        <h2>설명</h2>
        <ul>
          <li>`useState` 값 증가는 즉시 화면에 반영됨 (리렌더링 발생).</li>
          <li>`useRef` 값 증가는 콘솔에는 기록되지만, 화면에는 즉시 반영되지 않음 (리렌더링 없음).</li>
          <li>'강제 리렌더링' 버튼을 클릭하면 `useRef`의 최신 값이 화면에 표시됨.</li>
          <li>`useRef`는 렌더링과 관계없이 값을 유지해야 할 때 유용함 (예: DOM 요소 참조, 이전 값 저장 등).</li>
          <li>'버튼 숨기기/보이기' 버튼으로 `buttonRef`가 연결된 버튼의 표시 여부를 제어할 수 있음.</li>
          <li>버튼이 숨겨지면 (`toggle`이 `false`일 때), `useEffect`의 클린업 함수가 실행되어 이벤트 리스너가 제거됨.</li>
          {/* 설명 추가: count 값이 2의 배수일 때 색상 변경 */}
          <li>`count` 값이 2의 배수가 될 때마다 해당 값의 색상이 랜덤하게 변경됨.</li>
        </ul>
      </div>
    </div>
  );
}

export default StateVsRefComparison;
