import { useRef, useState, useEffect, startTransition } from 'react';

// 마우스의 X 좌표를 추적하는 커스텀 훅
const useMouseX = () => {
  const ref = useRef(0); // 마우스 X 좌표를 저장할 ref

  useEffect(() => {
    // 마우스 이동 이벤트를 처리하여 ref에 현재 X 좌표를 업데이트하는 함수
    const handleMouseMove = (event: MouseEvent) => {
      ref.current = event.clientX;
    };
    // window에 mousemove 이벤트 리스너 등록
    window.addEventListener('mousemove', handleMouseMove);
    // 컴포넌트 언마운트 시 이벤트 리스너 제거 (메모리 누수 방지)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // 의존성 배열이 비어있으므로 마운트 시 한 번만 실행

  return ref.current; // 현재 마우스 X 좌표 반환
};

// 마우스 X 좌표를 표시하고, 의도적으로 렌더링을 지연시키는 컴포넌트
const MousePositionX = ({ instanceId }: { instanceId: number,  }) => {
  // useMouseX 훅을 호출하여 마우스 X 좌표를 가져옴
  // 이 훅은 외부 스토어(window 이벤트 리스너)의 값을 읽어오므로,
  // React 19 이전 버전에서는 동시성 기능과 함께 사용할 때 티어링 현상을 유발할 수 있음
  const x = useMouseX(); // 현재 마우스 X 좌표를 가져옴

  // 의도적인 렌더링 지연 시작 시간 기록
  const startTime = performance.now();
  while (performance.now() - startTime < 20) {
    // 20ms 동안 메인 스레드 블로킹 (실제 애플리케이션에서는 심각한 성능 저하를 유발하므로 절대 사용해서는 안 되는 패턴)
    // 이 코드는 티어링 현상을 시각적으로 명확하게 보여주기 위한 예시
  }

  // 렌더링 시점과 해당 인스턴스의 X 좌표를 콘솔에 출력
  console.log(`MousePositionX (Instance ${instanceId}, rendered with X: ${x}`);

  // 화면에 마우스 X 좌표와 인스턴스 ID를 표시
  return <div>Mouse X (Instance {instanceId}): {x}</div>;
}

// 메인 애플리케이션 컴포넌트
const App = () => {
  // 버튼 클릭 횟수를 저장하는 상태
  const [count, setCount] = useState(0);

  // count 상태를 1 증가시키는 함수
  // startTransition으로 상태 업데이트를 감싸서 긴급하지 않은 업데이트로 처리
  // 이를 통해 UI 반응성을 유지하면서 백그라운드에서 렌더링을 수행
  const inc = () => {
    startTransition(() => {
      setCount(c => c + 1)
    })
  }

  return (
    <div>
      {/* 버튼 클릭 시 inc 함수 호출, 현재 count 값 표시 */}
      <button onClick={inc}>{count} inc</button>
      {/* 50개의 MousePositionX 컴포넌트를 렌더링 */}
      {/* 각 컴포넌트는 고유한 instanceId를 가짐 */}
      {[...Array(50).keys()].map(i => (
        <MousePositionX key={i} instanceId={i} />
      ))}
    </div>
  );
};

export default App;