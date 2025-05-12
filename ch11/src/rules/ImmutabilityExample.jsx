import React, { useContext } from 'react';

// 예시를 위한 간단한 테마 컨텍스트와 타입 정의
interface Theme {
  golden: string;
  normal: string;
}
const ThemeContext = React.createContext<Theme>({ golden: 'gold', normal: 'white' });

interface Rabbit {
  name: string;
  color: string;
  isSpecial: boolean;
  glow?: boolean; // 선택적 속성
}

/**
 * ❌ 잘못된 사용: 훅의 인수를 직접 수정함
 */
function useGoldenRabbitBad(rabbit: Rabbit): Rabbit {
  const theme = useContext(ThemeContext);

  if (rabbit.isSpecial) {
    // ➊ 원본 rabbit 객체의 속성을 직접 변경함
    //    이러한 직접 수정은 부수 효과를 유발하고 리액트의 변경 감지를 방해할 수 있음
    rabbit.color = theme.golden;
    rabbit.glow = true;
  }

  // 원본 객체(수정되었을 수 있는)를 그대로 반환
  return rabbit;
}

/**
 * ✅ 올바른 사용: 훅의 인수를 직접 수정하지 않고 새로운 객체를 반환함
 */
function useGoldenRabbitGood(rabbit: Rabbit): Rabbit {
  const theme = useContext(ThemeContext);

  // 조건에 맞지 않으면 원본 객체를 그대로 반환 (수정 없이)
  if (!rabbit.isSpecial) {
    return rabbit;
  }

  // ➋ 조건에 맞으면, 새로운 객체를 생성하여 반환함
  //    스프레드 연산자(...)를 사용해 원본 객체의 속성을 복사하고,
  //    필요한 속성(color, glow)만 변경하여 불변성을 유지함
  return {
    ...rabbit, // 원본 rabbit 객체의 모든 속성 복사
    color: theme.golden, // color 속성 덮어쓰기
    glow: true, // glow 속성 추가 또는 덮어쓰기
  };
}

// 사용 예시 (설명을 위해 추가, 실제 사용 시에는 적절한 컴포넌트 내에서 호출)
function RabbitDisplay({ initialRabbit }: { initialRabbit: Rabbit }) {
  const rabbit = useGoldenRabbitGood(initialRabbit); // 올바른 훅 사용

  // const badRabbit = useGoldenRabbitBad(initialRabbit); // 잘못된 훅 사용 (주의!)
  // console.log(initialRabbit === badRabbit); // isSpecial이 true면 true가 나올 수 있음 (같은 객체 참조)

  return (
    <div style={{ color: rabbit.color, textShadow: rabbit.glow ? '0 0 5px gold' : 'none' }}>
      {rabbit.name} ({rabbit.color})
    </div>
  );
}

export { useGoldenRabbitBad, useGoldenRabbitGood, RabbitDisplay, ThemeContext };