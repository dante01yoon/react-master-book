import React, { useState, useEffect } from 'react'; // 리액트 및 useState, useEffect 훅 임포트

// 함수형 컴포넌트 선언
function RenderPhaseExample() {
  // useState 훅을 사용하여 count 상태와 이를 업데이트하는 setCount 함수 선언
  // 초기값은 0
  const [count, setCount] = useState(0);

  // useEffect 훅을 사용하여 마운트 및 언마운트 시점 확인
  useEffect(() => {
    // --- 마운트 시점 ---
    // 컴포넌트가 처음 렌더링되어 DOM에 삽입된 후 실행됨
    // 의존성 배열이 비어있으므로([]) 마운트 시 한 번만 실행됨
    console.log('마운트: 컴포넌트가 DOM에 추가됨');

    // --- 언마운트 시점 (클린업 함수) ---
    // 컴포넌트가 DOM에서 제거되기 직전에 실행됨
    // 이벤트 리스너 제거, 타이머 해제 등 리소스 정리에 사용됨
    return () => {
      console.log('언마운트: 컴포넌트가 DOM에서 제거됨');
    };
  }, []); // 빈 의존성 배열: 마운트 시 1회 실행, 언마운트 시 클린업 실행

  // --- 렌더 단계 (Render Phase) 시작 ---
  // 컴포넌트 함수가 호출되는 것 자체가 렌더 단계의 시작임
  // 여기서는 상태 변경 시 이전 가상돔과 비교할 새로운 가상돔을 계산함
  // 실제 DOM 변경은 아직 발생하지 않음
  console.log('렌더 단계 실행: 가상돔 계산 중...');

  // 상태를 업데이트하는 함수 (렌더링 트리거 역할)
  const handleIncrement = () => {
    // setCount가 호출되면 리액트는 이 컴포넌트의 리렌더링을 예약(스케줄링)함
    // 이것이 렌더링을 유발하는 '트리거'가 됨
    setCount(prevCount => prevCount + 1);
  };

  // 렌더 단계의 결과물: JSX (리액트 엘리먼트) 반환
  // 이 JSX는 리액트에 의해 가상돔으로 변환됨
  return (
    <div>
      <h1>카운터: {count}</h1>
      <p>버튼을 클릭하면 상태가 업데이트되어 리렌더링이 발생합니다.</p>
      {/* 버튼 클릭 시 handleIncrement 함수 호출 */}
      <button onClick={handleIncrement}>증가</button>
    </div>
  );
  // --- 렌더 단계 (Render Phase) 종료 ---
}

export default RenderPhaseExample; // 다른 파일에서 사용 가능하도록 컴포넌트 내보내기