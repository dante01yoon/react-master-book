import { flushSync } from "react-dom";
import { useState } from "react";

const FlushSyncExample = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 2);
    // 이 시점의 count는 0
    console.log("before flushSync - count 스냅샷:", count);

    // flushSync는 콜백 내의 상태 업데이트를 즉시 동기적으로 실행하고 DOM을 업데이트함
    flushSync(() => {
      setCount(prevCount => {
        console.log("inside flushSync - prevCount:", prevCount);
        return prevCount + 3
      });
    console.log("inside flushSync - count 스냅샷:", count);
    });
    // 이 시점의 count는 0
    console.log("after flushSync - count 스냅샷:", count);
    
    // 다음 상태 업데이트는 다시 일반적인 배칭 규칙을 따름.
    // 이 setCount는 flushSync로 인해 이미 발생한 렌더링 이후의 다음 렌더링을 위해 스케줄됨.
    setCount(count + 4);
    
    // handleClick 함수의 실행이 모두 끝난 후에도, 이 console.log는
    // handleClick이 호출된 시점의 count 스냅샷(0)을 참조함.
    // 실제 count 상태는 이 핸들러 실행 완료 후, 스케줄된 리렌더링이 발생할 때 업데이트됨.
    // 이 시점의 count는 0
    console.log("handleClick 함수의 마지막 count 스냅샷:", count);
  }

  // 컴포넌트가 리렌더링될 때마다 현재 스냅샷에서 참조하는 count값을 콘솔 로그로 출력함.
  // Increment버튼을 누르면 두 번의 콘솔 로그가 출력됨. 
  // 첫 번째는 count 값(5), 두 번째는 최종 count 값(4)
  console.log("렌더링 발생, 현재 count:", count)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  )
}

export default FlushSyncExample;
