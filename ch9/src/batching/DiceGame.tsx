import { FC, useState } from 'react';

// 무작위 헥스(HEX) 색상 코드를 생성하는 헬퍼 함수
const getRandomColor = () => {
  const letters = '0123456789ABCDEF'; // 헥스 코드에 사용될 문자들
  let color = '#'; // 헥스 코드 시작 문자
  for (let i = 0; i < 6; i++) { // 6자리 헥스 코드를 만들기 위해 반복함
    color += letters[Math.floor(Math.random() * 16)]; // 무작위로 문자 하나를 선택하여 색상 코드에 추가함
  }
  return color; // 완성된 헥스 색상 코드를 반환함
}

// DiceGame 컴포넌트의 props 타입을 정의함
interface DiceGameProps {
  maxTries?: number; // 최대 시도 횟수
}

// 주사위 게임 컴포넌트
const DiceGame: FC<DiceGameProps> = ({ maxTries = 5 } ) => {
    // 주사위 눈금 상태. 초기값은 1
  const [diceNumber, setDiceNumber] = useState(1);
    // 남은 시도 횟수 상태. 초기값은 props로 받은 maxTries 또는 기본값 5
  const [remainingTries, setRemainingTries] = useState(maxTries);
    // 배경색 상태. 초기값은 흰색('#FFFFFF')
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
    // 현재 테마 상태. 초기값은 'Default'
  const [theme, setTheme] = useState('Default');
  
    // 주사위를 굴리는 함수. 버튼 클릭 시 호출됨
  const rollDice = () => {
      // 1부터 6 사이의 무작위 주사위 눈금을 생성함
    const newDiceNumber = Math.floor(Math.random() * 6) + 1;
      // 남은 시도 횟수를 1 감소시킴
    const newRemainingTries = remainingTries - 1;
      // 새로운 무작위 배경색을 생성함
    const newBackgroundColor = getRandomColor();
      // 주사위 눈금에 따라 테마 이름을 결정함
      // 눈금이 6이면 'GoldenRabbit', 아니면 'random (시도 횟수)' 형태의 테마 이름을 가짐
    const newTheme = newDiceNumber === 6 ? 'GoldenRabbit' : `random ${maxTries - newRemainingTries}`;

    // 각 setState가 개별적으로 리렌더링을 트리거하는 것이 아니라,
    // 이벤트 핸들러 내의 모든 상태 업데이트가 끝난 후 단 한 번의 리렌더링만 발생시킴
    setDiceNumber(newDiceNumber); // 주사위 눈금 상태 업데이트
    setRemainingTries(newRemainingTries); // 남은 시도 횟수 상태 업데이트
    setBackgroundColor(newBackgroundColor); // 배경색 상태 업데이트
    setTheme(newTheme); // 테마 상태 업데이트

    // 이벤트 핸들러 내에서 상태 변경 직후의 값들을 콘솔에 기록함
    // 이 시점에서는 아직 리렌더링이 발생하기 전이므로, setXXX로 설정한 값들이
    // 실제 컴포넌트의 상태(diceNumber, remainingTries 등)에 반영되지 않았을 수 있음
    // 하지만 newXXX 변수를 통해 최신 값을 확인할 수 있음
    console.log('During event handler - Dice:', newDiceNumber, 'Tries:', newRemainingTries, 'Background:', newBackgroundColor, 'Theme:', newTheme);
  };
  // 컴포넌트 렌더링 시 현재 상태 값들을 콘솔에 기록함
  // 리액트 배칭으로 인해 rollDice 함수 내의 여러 setState 호출 후 이 로그는 한 번만 출력되어야 함
  console.log('Render - Dice:', diceNumber, 'Tries:', remainingTries, 'Background:', backgroundColor, 'Theme:', theme);

  // 주사위를 굴리는 함수 (비동기적 상태 업데이트)
  // setTimeout, Promise 등 비동기 콜백 내에서 상태 업데이트를 수행할 때도
  // 리액트 18부터는 자동 배칭이 적용되어 한 번의 리렌더링만 발생함
  const rollDiceAsync = () => {
    setTimeout(() => {
      // 1부터 6 사이의 무작위 주사위 눈금을 생성함
      const newDiceNumber = Math.floor(Math.random() * 6) + 1;
      // 남은 시도 횟수를 1 감소시킴
      // 주의: setTimeout 콜백이 실행될 시점의 remainingTries를 기준으로 계산하므로,
      // 여러 번 빠르게 클릭 시 의도치 않은 동작이 발생할 수 있음. (이는 배칭과는 다른 주제)
      // 함수형 업데이트 (setRemainingTries(prev => prev - 1))를 사용하면 이 문제를 해결할 수 있음.
      const newRemainingTries = remainingTries - 1;
      // 새로운 무작위 배경색을 생성함
      const newBackgroundColor = getRandomColor();
      // 주사위 눈금에 따라 테마 이름을 결정함
      const newTheme = newDiceNumber === 6 ? 'GoldenRabbit (Async)' : `random ${maxTries - newRemainingTries} (Async)`;

      // 비동기 콜백 내의 모든 상태 업데이트도 배칭되어 한 번의 리렌더링만 발생시킴 (리액트 18+)
      setDiceNumber(newDiceNumber);
      setRemainingTries(newRemainingTries);
      setBackgroundColor(newBackgroundColor);
      setTheme(newTheme);

      console.log('비동기 핸들러 내부 (setTimeout) - Dice:', newDiceNumber, 'Tries:', newRemainingTries, 'Background:', newBackgroundColor, 'Theme:', newTheme);
    }, 1000); // setTimeout으로 비동기 상황을 모방함
  };
  return (
      // 배경색은 backgroundColor 상태 값에 따라 동적으로 변경됨
    <div style={{ backgroundColor, padding: '20px', textAlign: 'center' }}>
      <h1>Dice Game</h1>
        {/* 현재 주사위 눈금을 표시함 */}
      <p>Current Dice Number: {diceNumber}</p>
        {/* 남은 시도 횟수를 표시함 */}
      <p>Remaining Tries: {remainingTries}</p>
        {/* 현재 테마를 표시함 */}
      <p>Current Theme: {theme}</p>
        {/* 버튼 클릭 시 rollDice 함수를 호출함. 남은 시도 횟수가 0이면 비활성화됨 */}
      <button onClick={rollDice} disabled={remainingTries === 0}>주사위 던지기 게임</button>
        {/* 버튼 클릭 시 rollDiceAsync 함수를 호출함. 남은 시도 횟수가 0이면 비활성화됨 */}
      <button onClick={rollDiceAsync} disabled={remainingTries === 0}>주사위 던지기 게임(비동기)</button>
    </div>
  );
}

export default DiceGame; // DiceGame 컴포넌트를 기본으로 내보냄
