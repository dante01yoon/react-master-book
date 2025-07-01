import React, { useState as useReactState } from 'react'; // 실제 useState를 별칭으로 가져옴

// --- 간소화된 훅 상태 관리 시뮬레이션 ---

// 각 훅의 상태를 저장하는 배열 (컴포넌트 인스턴스별 상태 저장소를 모방)
// 실제 리액트에서는 이 상태가 파이버 노드 내부에 관리됨
const hookStates = [];
// 현재 처리 중인 훅의 인덱스
let hookIndex = 0;
// 실제 리액트 리렌더링을 트리거하기 위한 함수 참조
let triggerReactRender = null;

/**
 * 배열과 인덱스를 사용한 useState의 간소화된 버전
 * @param {any} initialState 초기 상태 값
 * @returns {[any, function(any): void]} 상태 값과 상태 업데이트 함수
 */
function useSimplifiedState(initialState) {
  // 현재 훅 호출에 해당하는 인덱스 저장
  const currentIndex = hookIndex;

  // hookStates 배열에서 현재 인덱스의 상태를 가져옴
  // 만약 해당 인덱스에 값이 없다면(첫 렌더링 시) initialState 사용
  const state = hookStates[currentIndex] !== undefined
    ? hookStates[currentIndex]
    : initialState;

  // 상태 업데이트 함수 정의
  const setState = (newState) => {
    // hookStates 배열의 현재 인덱스에 새 상태 저장
    hookStates[currentIndex] = newState;
    console.log(`[Simplified Hook] 상태 업데이트됨 (Index: ${currentIndex}, Value: ${newState}), hookStates:`, [...hookStates]);
    // 실제 리액트 컴포넌트의 리렌더링을 트리거 (시뮬레이션)
    if (triggerReactRender) {
      triggerReactRender(prev => !prev); // 더미 상태를 토글하여 강제 리렌더링
    }
  };

  hookIndex++; // 다음 훅 호출을 위해 인덱스 증가
  return [state, setState];
}

// --- 예제 컴포넌트 ---

/**
 * 간소화된 훅 상태 관리 시뮬레이션을 사용하는 예제 컴포넌트
 */
function SimplifiedHookExample() {
  // 실제 리액트 상태를 사용하여 리렌더링 트리거 함수를 설정
  const [, forceUpdate] = useReactState(false);
  triggerReactRender = forceUpdate;

  // 중요: 컴포넌트 렌더링 시작 시 hookIndex를 0으로 초기화
  // 이는 매 렌더링마다 훅이 처음부터 순서대로 호출되는 것을 모방함
  hookIndex = 0;
  console.log(`[Simplified Hook] 컴포넌트 렌더링 시작, hookIndex 초기화: ${hookIndex}`);

  // 간소화된 useState 훅을 순서대로 호출
  // 첫 번째 호출: hookIndex 0
  const [count, setCount] = useSimplifiedState(0);
  // 두 번째 호출: hookIndex 1
  const [text, setText] = useSimplifiedState('');
  // 세 번째 호출: hookIndex 2
  const [isActive, setIsActive] = useSimplifiedState(false);

  console.log(`[Simplified Hook] 렌더링 완료 후 hookStates:`, [...hookStates]); // 상태 배열 복사하여 출력

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
      <h3>간소화된 훅 상태 관리 예제 (배열/인덱스)</h3>
      <p>이 컴포넌트는 내부적으로 `hookStates` 배열과 `hookIndex`를 사용하여 상태를 관리하는 `useSimplifiedState` 훅을 사용합니다.</p>
      <p>개발자 도구 콘솔을 열어 렌더링 및 상태 업데이트 시 `hookIndex`와 `hookStates` 배열의 변화를 확인하세요.</p>

      {/* 첫 번째 훅 (Index 0) 상태 */}
      <div style={{ borderTop: '1px solid #eee', marginTop: '10px', paddingTop: '10px' }}>
        <h4>카운터 (Index 0)</h4>
        <p>값: {count}</p>
        {/* setCount 호출 -> hookStates[0] 업데이트 -> 리렌더링 */}
        <button onClick={() => setCount(count + 1)}>증가</button>
        <button onClick={() => setCount(0)}>초기화 (0)</button>
      </div>

      {/* 두 번째 훅 (Index 1) 상태 */}
      <div style={{ borderTop: '1px solid #eee', marginTop: '10px', paddingTop: '10px' }}>
        <h4>텍스트 입력 (Index 1)</h4>
        <input
          type="text"
          value={text}
          // setText 호출 -> hookStates[1] 업데이트 -> 리렌더링
          onChange={(e) => setText(e.target.value)}
          placeholder="텍스트 입력..."
          style={{ marginRight: '10px' }}
        />
        <span>입력 값: {text}</span>
      </div>

      {/* 세 번째 훅 (Index 2) 상태 */}
      <div style={{ borderTop: '1px solid #eee', marginTop: '10px', paddingTop: '10px' }}>
        <h4>활성 상태 토글 (Index 2)</h4>
        <p>현재 상태: {isActive ? '활성' : '비활성'}</p>
        {/* setIsActive 호출 -> hookStates[2] 업데이트 -> 리렌더링 */}
        <button onClick={() => setIsActive(!isActive)}>상태 토글</button>
      </div>
    </div>
  );
}

export default SimplifiedHookExample; 