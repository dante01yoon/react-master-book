import { useState } from "react";

const useUpdaterExample = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1); // 이전 상태 값(count)에 직접 의존하는 방식
    // console.log(count); // setCount가 스케줄링된 후 실행되므로, 여전히 이전 값이 출력될 수 있음
  };
}



const useInitializeExample = () => {
  const initialTasks = [ /* 초기 태스크 배열 */ ];
  const [tasks, setTasks] = useState(initialTasks);

  const handleAddTask = (task: string) => {
    // 상태 업데이트 시 현재 상태값을 참조하여 새 상태 계산
    setTasks(prevTasks => [...prevTasks, task]);
  };

  return { tasks, handleAddTask };
};

