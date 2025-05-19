import React, { useState, useCallback, memo } from 'react';

// React.memo로 최적화된 자식 컴포넌트 정의함
// 이 컴포넌트는 props로 받은 onClick 함수와 name을 표시함
interface MemoizedChildProps {
  onClick: () => void;
  name: string;
}

const MemoizedChild = memo(({ onClick, name }: MemoizedChildProps) => {
  // 콘솔 로그를 통해 언제 이 컴포넌트가 렌더링되는지 확인함
  console.log(`${name} 자식 컴포넌트 렌더링됨`);
  return (
    <button onClick={onClick} style={{ margin: '5px', padding: '10px', border: '1px solid #ccc' }}>
      {name}
    </button>
  );
});
// React 개발자 도구에서 표시될 이름 설정함
MemoizedChild.displayName = 'MemoizedChild';

// 부모 컴포넌트 정의함
const ParentComponentForMemo = () => {
  const [count, setCount] = useState(0);
  const [unrelatedState, setUnrelatedState] = useState(0);

  // ➊useCallback을 사용하여 handleClick 함수를 메모이제이션함
  // 의존성 배열이 비어 있으므로, 이 함수는 컴포넌트 최초 렌더링 시에만 생성됨
  // 이후 부모 컴포넌트가 리렌더링 되어도 이 함수의 참조는 동일하게 유지됨
  const memoizedHandleClick = useCallback(() => {
    console.log('메모이즈된 핸들러 (MemoizedChild With Callback) 호출됨');
    // 이 함수는 외부 상태에 의존하지 않으므로 의존성 배열이 비어있음
  }, []); // 빈 의존성 배열

  // 일반 함수로 정의된 핸들러
  // ParentComponentForMemo 컴포넌트가 리렌더링될 때마다 이 함수는 새로 생성됨
  const unmemoizedHandleClick = () => {
    console.log('일반 핸들러 (MemoizedChild Without Callback) 호출됨');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>useCallback과 React.memo 예제</h2>
      <p style={{ marginTop: '10px', marginBottom: '10px' }}>
        부모 카운트: {count} (이 값을 변경하면 부모 컴포넌트가 리렌더링됨)
      </p>
      <button 
        onClick={() => setCount(c => c + 1)} 
        style={{ padding: '8px 12px', marginRight: '10px' }}
      >
        부모 카운트 증가
      </button>
      <button 
        onClick={() => setUnrelatedState(s => s + 1)} 
        style={{ padding: '8px 12px' }}
      >
        부모 기타 상태 변경 (관련 없는 상태)
      </button>
      
      <hr style={{ margin: '20px 0' }} />

      <div style={{ marginTop: '20px' }}>
        <strong>자식 컴포넌트 영역:</strong>
        <p><em>콘솔 로그를 확인하여 각 자식 컴포넌트의 렌더링 시점을 관찰하세요.</em></p>
        <div>
          {/* ➋ memoizedHandleClick은 참조가 안정적이므로 'MemoizedChild With Callback'는 부모가 리렌더링 되어도 불필요하게 리렌더링되지 않음 */}
          <MemoizedChild onClick={memoizedHandleClick} name="MemoizedChild With Callback" />
        </div>
        <div>
          {/* unmemoizedHandleClick은 부모가 리렌더링될 때마다 새로 생성되므로 'MemoizedChild Without Callback'는 항상 리렌더링됨 */}
          <MemoizedChild onClick={unmemoizedHandleClick} name="MemoizedChild Without Callback" />
        </div>
      </div>

      <hr style={{ margin: '20px 0' }} />

      <div style={{ marginTop: '20px' }}>
        <h3>useCallback의 불필요한 사용 예시 (안티 패턴)</h3>
        {/* 
          아래 버튼은 일반 HTML 요소이므로 React.memo로 최적화되지 않음.
          부모 컴포넌트(ParentComponentForMemo)가 리렌더링될 때, 
          이 <button> 요소는 onClick prop의 참조가 변경되었는지 여부와 관계없이 항상 다시 렌더링됨.
          따라서 handleAntiPatternClick에 useCallback을 사용하는 것은 성능상 이점을 제공하지 않으며, 
          오히려 코드를 불필요하게 복잡하게 만들 수 있음.
        */}
        <button 
          onClick={memoizedHandleClick} 
          style={{ padding: '8px 12px', backgroundColor: '#ffdddd', border: '1px solid #ffaaaa' }}
        >
          useCallback 사용 버튼 (HTML 요소 - 안티 패턴)
        </button>
        <p style={{ fontSize: '0.9em', color: '#555', marginTop: '5px' }}>
          이 버튼 클릭 핸들러(<code>memoizedHandleClick</code>)는 <code>useCallback</code>으로 메모이즈되었지만,
          이 버튼 자체가 <code>React.memo</code>로 감싸인 컴포넌트가 아니므로 부모가 리렌더링될 때 항상 함께 리렌더링됩니다.
          따라서 이 경우 <code>useCallback</code> 사용은 실질적인 성능 최적화 효과가 없습니다.
        </p>
      </div>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f0f0f0', border: '1px solid #ddd' }}>
        {/* 
          아래 버튼은 일반 HTML 요소이므로 React.memo로 최적화되지 않음.
          부모 컴포넌트(ParentComponentForMemo)가 리렌더링될 때, 
          이 <button> 요소는 onClick prop의 참조가 변경되었는지 여부와 관계없이 항상 다시 렌더링됨.
          따라서 handleAntiPatternClick에 useCallback을 사용하는 것은 성능상 이점을 제공하지 않으며, 
          오히려 코드를 불필요하게 복잡하게 만들 수 있음.
        */}
        <button 
          onClick={unmemoizedHandleClick} 
          style={{ padding: '8px 12px', backgroundColor: '#ffdddd', border: '1px solid #ffaaaa' }}
        >
          useCallback 사용 버튼 (HTML 요소 - 안티 패턴)
        </button>
        <p style={{ fontSize: '0.9em', color: '#555', marginTop: '5px' }}>
          이 버튼 클릭 핸들러(<code>unmemoizedHandleClick</code>)는 <code>useCallback</code>으로 메모이즈되었지만,
          이 버튼 자체가 <code>React.memo</code>로 감싸인 컴포넌트가 아니므로 부모가 리렌더링될 때 항상 함께 리렌더링됩니다.
          따라서 이 경우 <code>useCallback</code> 사용은 실질적인 성능 최적화 효과가 없습니다.
        </p>
      </div>
    </div>
  );
};

export default ParentComponentForMemo;
