// Reducer 함수의 타입을 정의함
// S는 상태(State)의 타입, A는 액션(Action)의 타입을 나타냄
type Reducer<S, A> = (prevState: S, action: A) => S;

// Dispatch 함수의 타입을 정의함
// A는 디스패치할 액션(Action)의 타입을 나타냄
type Dispatch<A> = (action: A) => void;

// useReducer 훅의 기본 시그니처를 보여주는 예시임

// 카운터 예시를 위한 상태 타입 정의
interface CountState {
  count: number;
}

// 카운터 예시를 위한 액션 타입 정의
// 'type' 프로퍼티를 통해 액션의 종류를 구분함
type CountAction =
  | { type: 'increment'; payload?: number }
  | { type: 'decrement'; payload?: number }
  | { type: 'reset' };

// 카운터 리듀서 함수
// 이전 상태와 액션을 받아 새로운 상태를 반환함
const countReducer = (state: CountState, action: CountAction): CountState => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + (action.payload || 1) }; // payload가 있으면 그 값만큼, 없으면 1만큼 증가함
    case 'decrement':
      return { count: state.count - (action.payload || 1) }; // payload가 있으면 그 값만큼, 없으면 1만큼 감소함
    case 'reset':
      return { count: 0 }; // count를 0으로 리셋함
    default:
      throw new Error('Unhandled action type'); // 처리할 수 없는 액션 타입에 대해 에러를 발생시킴
  }
};

// 리듀서 함수 시그니처
// (state, action) => newState

// useReducer 기본 사용법
// 첫 번째 인자로 리듀서 함수를, 두 번째 인자로 초기 상태를 전달함
// 반환값은 [상태, 디스패치 함수] 형태의 배열임
// const [state, dispatch] = React.useReducer(➊countReducer, ➋initialArg, ➌init)

function useReducerBasicExample(initialCount: number): [CountState, Dispatch<CountAction>] {
  // React.useReducer<Reducer<CountState, CountAction>>(
  //   reducer: Reducer<CountState, CountAction>,
  //   initialState: CountState
  // ): [CountState, Dispatch<CountAction>];
  // 위는 실제 useReducer의 타입 시그니처 중 하나임 (타입스크립트 환경 기준)

  const initialState: CountState = { count: initialCount };
  // const [state, dispatch] = React.useReducer(countReducer, initialState);
  // 실제 리액트 환경에서는 위와 같이 사용함. 여기서는 시그니처 설명을 위해 타입을 명시함.
  // 이 파일은 실제 리액트 컴포넌트가 아니므로, React.useReducer를 직접 호출하지 않음.
  // 설명을 위한 의사 코드(pseudo-code)로 이해해야 함.
  // dispatch({ type: ‘increment’}); // 이렇게 사용함

  // 아래는 설명을 위한 반환값 예시임
  const exampleState: CountState = initialState;
  const exampleDispatch: Dispatch<CountAction> = (action) => {
    console.log('Dispatching action:', action);
    // 실제로는 여기서 state가 업데이트 됨
  };
  return [exampleState, exampleDispatch];
}

const [basicState, basicDispatch] = useReducerBasicExample(0);
basicDispatch({ type: 'increment' }); // { count: 1 } 상태로 변경 (예시)
basicDispatch({ type: 'decrement', payload: 2 }); // { count: -1 } 상태로 변경 (예시)




// useReducer 훅의 지연 초기화(lazy initialization) 시그니처를 보여주는 예시임

// 이 함수는 초기 렌더링 시 한 번만 호출됨
// 초기 상태를 생성하는 함수
const init = (initialState: CountState): CountState => {
  return { count: initialState.count };
};

// useReducer 지연 초기화 사용법
// 첫 번째 인자로 리듀서 함수를, 두 번째 인자로 초기화 함수에 전달할 인자를,
// 세 번째 인자로 초기화 함수를 전달함
function useReducerLazyInitExample(initialArg: number): [CountState, Dispatch<CountAction>] {
  // React.useReducer<Reducer<CountState, CountAction>, number>(
  //   reducer: Reducer<CountState, CountAction>,
  //   initialArg: number, // 초기화 함수에 전달될 인자
  //   initializer: (arg: number) => CountState // 초기 상태를 반환하는 함수
  // ): [CountState, Dispatch<CountAction>];
  // 위는 실제 useReducer의 지연 초기화 관련 타입 시그니처 중 하나임 (타입스크립트 환경 기준)

  // const [state, dispatch] = React.useReducer(countReducer, initialArg, init);
  // 실제 리액트 환경에서는 위와 같이 사용함.
  // 초기 상태를 계산하는 로직이 복잡하거나, 특정 조건에 따라 초기 상태가 달라져야 할 때 유용함.

  // 아래는 설명을 위한 반환값 예시임
  const exampleState: CountState = init(initialArg); // 초기화 함수를 통해 상태가 설정됨
  const exampleDispatch: Dispatch<CountAction> = (action) => {
    console.log('Dispatching action (lazy init):', action);
  };
  return [exampleState, exampleDispatch];
}

const [lazyState, lazyDispatch] = useReducerLazyInitExample(10);
lazyDispatch({ type: 'reset' }); // { count: 0 } 상태로 변경 (예시)

/*
  useReducer 사용 시 고려사항:

  1. 상태 로직의 복잡성:
     - 여러 하위 값으로 구성된 복잡한 상태 객체를 다루거나,
       다음 상태가 이전 상태 및 액션에 복잡하게 의존하는 경우 useReducer가 적합함.
     - 상태 업데이트 로직이 여러 곳에서 중복되거나 예측하기 어려울 때,
       리듀서를 통해 상태 변경 로직을 중앙에서 관리하여 코드의 명확성과 유지보수성을 높일 수 있음.

  2. 테스트 용이성:
     - 리듀서 함수는 순수 함수(pure function)이므로, 특정 입력(이전 상태, 액션)에 대해 항상 동일한 출력(새로운 상태)을 반환함.
     - 이로 인해 UI와 분리하여 비즈니스 로직을 테스트하기 용이함.

  3. 성능 최적화:
     - React.memo와 함께 사용할 때, dispatch 함수는 항상 동일한 참조를 유지하므로 불필요한 리렌더링을 방지하는 데 도움이 될 수 있음.
     - (주의: React 19부터는 컴파일러 최적화로 인해 dispatch의 참조 안정성이 항상 보장되지는 않을 수 있으나,
       일반적으로 useReducer는 콜백 최적화에 유리한 구조를 제공함)

  4. 상태 업데이트 추적:
     - 모든 상태 변경은 액션을 통해 이루어지므로, 액션 로그를 기록하여 상태 변경 과정을 추적하고 디버깅하기 용이함.
       (예: Redux DevTools와 유사한 방식으로 로깅 가능)

  useState vs useReducer:
  - 단순한 상태 (예: 숫자, 문자열, 불리언)나 독립적인 상태 값들을 관리할 때는 useState가 더 간결하고 직관적임.
  - 상태 간의 의존성이 높거나 상태 업데이트 로직이 복잡한 경우, useReducer를 고려하는 것이 좋음.
  - 정해진 규칙은 없으며, 팀의 컨벤션이나 개인의 선호도, 애플리케이션의 특정 요구사항에 따라 선택할 수 있음.
*/
