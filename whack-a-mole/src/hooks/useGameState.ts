import { useReducer, useEffect } from 'react';

// 게임 상태 구조 정의
interface GameState {
  score: number;
  highScore: number;
  timeLeft: number;
  isGameRunning: boolean;
  activeHoles: boolean[];
  difficulty: number;
  showGameOver: boolean;
}

// 액션 타입 정의
type GameAction = 
  | { type: 'START_GAME' }
  | { type: 'END_GAME' }
  | { type: 'RESET_GAME' }
  | { type: 'WHACK_MOLE'; index: number }
  | { type: 'SET_ACTIVE_HOLES'; holes: boolean[] }
  | { type: 'DECREMENT_TIME' }
  | { type: 'SET_DIFFICULTY'; level: number }
  | { type: 'SHOW_GAME_OVER' }
  | { type: 'HIDE_GAME_OVER' };

// 초기 상태 팩토리 (지연 초기화 패턴 사용)
const createInitialState = (): GameState => {
  // localStorage에서 최고 점수 가져오기 (지연 초기화 시연)
  const savedHighScore = localStorage.getItem('whackHighScore');
  const highScore = savedHighScore ? parseInt(savedHighScore) : 0;
  
  return {
    score: 0,
    highScore,
    timeLeft: 60,
    isGameRunning: false,
    activeHoles: Array(9).fill(false),
    difficulty: 1,
    showGameOver: false
  };
};

// 게임 상태 관리를 위한 리듀서 함수
// 게임 로직이 복잡해지면 다양한 상태와 액션들을 관리해야 함.
// 이때 useReducer를 사용하면 상태 변경 로직을 컴포넌트 외부로 분리하여 코드의 가독성과 유지보수성을 높일 수 있음.
// 아래 gameReducer 함수는 두더지 잡기 게임의 다양한 액션에 따른 상태 변화를 명확하게 정의하고 있음.
// 예를 들어, 'START_GAME' 액션 발생 시 isGameRunning을 true로 설정하고 점수와 남은 시간을 초기화하며,
// 'WHACK_MOLE' 액션 발생 시에는 잡은 두더지의 인덱스를 받아 점수를 올리고 해당 두더지를 비활성화함.
// 이처럼 복잡한 상태 업데이트 로직을 하나의 리듀서 함수 내에서 중앙 집중적으로 관리함으로써
// 예측 가능하고 테스트하기 쉬운 코드를 작성할 수 있음.
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        isGameRunning: true,
        score: 0,
        timeLeft: 60,
        activeHoles: Array(9).fill(false)
      };
      
    case 'END_GAME': {
      // 새로운 최고 점수 계산
      const newHighScore = state.score > state.highScore ? state.score : state.highScore;
      
      return {
        ...state,
        isGameRunning: false,
        highScore: newHighScore,
        showGameOver: true
      };
    }
    
    case 'RESET_GAME':
      return {
        ...state,
        isGameRunning: false,
        score: 0,
        timeLeft: 60,
        activeHoles: Array(9).fill(false)
      };
      
    case 'WHACK_MOLE': {
      // 두더지가 활성화된 경우에만 점수 증가
      if (state.activeHoles[action.index]) {
        // 잡힌 두더지를 비활성화하여 새로운 활성 구멍 배열 생성
        const newActiveHoles = [...state.activeHoles];
        newActiveHoles[action.index] = false;
        
        return {
          ...state,
          score: state.score + 1,
          activeHoles: newActiveHoles
        };
      }
      return state;
    }
    
    case 'SET_ACTIVE_HOLES':
      return {
        ...state,
        activeHoles: action.holes
      };
      
    case 'DECREMENT_TIME': {
      const newTimeLeft = state.timeLeft - 1;
      
      // 시간이 다 되면 게임 종료
      if (newTimeLeft <= 0) {
        const newHighScore = state.score > state.highScore ? state.score : state.highScore;
        
        return {
          ...state,
          timeLeft: 0,
          isGameRunning: false,
          highScore: newHighScore,
          showGameOver: true
        };
      }
      
      return {
        ...state,
        timeLeft: newTimeLeft
      };
    }
    
    case 'SET_DIFFICULTY':
      return {
        ...state,
        difficulty: action.level
      };
      
    case 'SHOW_GAME_OVER':
      return {
        ...state,
        showGameOver: true
      };
      
    case 'HIDE_GAME_OVER':
      return {
        ...state,
        showGameOver: false
      };
      
    default:
      return state;
  }
};

export const useGameState = () => {
  // 복잡한 상태 로직 관리를 위해 useReducer 훅 사용
  const [state, dispatch] = useReducer(gameReducer, null, createInitialState);
  
  // 최고 점수가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('whackHighScore', state.highScore.toString());
  }, [state.highScore]);
  
  // 게임 타이머 처리
  useEffect(() => {
    let timerId: number;
    
    if (state.isGameRunning) {
      timerId = window.setInterval(() => {
        dispatch({ type: 'DECREMENT_TIME' });
      }, 1000);
    }
    
    // 컴포넌트 언마운트 시 인터벌 정리를 위한 클린업 함수
    // 또는 의존성 변경 시
    return () => {
      window.clearInterval(timerId);
    };
  }, [state.isGameRunning]);
  
  // 상태와 액션 모두 반환
  return {
    state,
    actions: {
      startGame: () => dispatch({ type: 'START_GAME' }),
      endGame: () => dispatch({ type: 'END_GAME' }),
      resetGame: () => dispatch({ type: 'RESET_GAME' }),
      whackMole: (index: number) => dispatch({ type: 'WHACK_MOLE', index }),
      setActiveHoles: (holes: boolean[]) => dispatch({ type: 'SET_ACTIVE_HOLES', holes }),
      setDifficulty: (level: number) => dispatch({ type: 'SET_DIFFICULTY', level }),
      hideGameOver: () => dispatch({ type: 'HIDE_GAME_OVER' })
    }
  };
};
