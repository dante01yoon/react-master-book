import { useState } from 'react';

function StaleClosureExample() {
  // useState를 사용하여 count 상태 선언 및 초기값 0으로 설정
  const [count, setCount] = useState(0);

  // count 상태를 1 증가시키는 함수
  const handleIncrement = () => {
    setCount(c => c + 1); // 함수형 업데이트를 사용하여 최신 상태를 기반으로 업데이트함
  };

  // 현재 count 값을 3초 후에 콘솔에 로그로 출력하는 함수
  const handleLogCount = () => {
    setTimeout(() => {
      // 이 시점의 count 값은 handleLogCount 함수가 호출될 때의 count 값을 참조함
      // 이것이 "오래된 클로저" 현상을 보여주는 부분임
      console.log(`3초 전의 count 값 (오래된 클로저): ${count}`);
    }, 3000);
  };

  // 최신 count 값을 3초 후에 콘솔에 로그로 출력하는 함수 (오래된 클로저 해결)
  const handleLogLatestCount = () => {
    setTimeout(() => {
      // setCount의 콜백 함수를 이용하여 최신 상태 값을 가져옴
      // 또는 useRef를 사용하여 항상 최신 값을 참조하도록 할 수도 있음 (다른 예제에서 다룰 수 있음)
      setCount(currentCount => {
        console.log(`3초 후의 최신 count 값: ${currentCount}`);
        return currentCount; // 상태를 변경하지 않고 현재 값만 읽음
      });
    }, 3000);
  };

  console.log('StaleClosureExample 컴포넌트 렌더링...');

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={handleIncrement}>카운트 증가</button>
      <button onClick={handleLogCount} style={{ marginLeft: '10px' }}>
        3초 후 현재 카운트 기록 (오래된 클로저 발생 가능)
      </button>
      <button onClick={handleLogLatestCount} style={{ marginLeft: '10px' }}>
        3초 후 최신 카운트 기록 (오래된 클로저 해결)
      </button>
    </div>
  );
}

export default StaleClosureExample; 