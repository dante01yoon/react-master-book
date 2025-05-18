import { useState } from "react";

const useInitializeExample = () => {
  const initialTasks = [ /* 초기 태스크 배열 */ ];
  const [tasks, setTasks] = useState(initialTasks);

  // 느린 초기화 기법
  // useState의 초기값으로 함수를 전달하는 '지연 초기화(lazy initialization)' 패턴
  // 이 방식은 초기 렌더링 시에만 실행되며, 리렌더링 시에는 이 함수가 호출되지 않음
  const [highScore, setHighScore] = useState(() => {
    // localStorage에서 'whackHighScore' 키로 저장된 값을 가져옴
    const saved = localStorage.getItem('whackHighScore');
    // 저장된 값이 있으면 정수로 변환하여 반환하고, 없으면 0을 반환
    // 이 방식은 앱이 처음 로드될 때 이전 게임의 최고 점수를 복원하는 데 사용됨
    return saved ? parseInt(saved) : 0;
  });

}