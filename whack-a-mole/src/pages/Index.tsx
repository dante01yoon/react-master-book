import React, { useRef, useEffect } from 'react';
import GameBoard from '@/components/GameBoard';
import ScoreBoard from '@/components/ScoreBoard';
import GameModal from '@/components/GameModal';
import Tutorial from '@/components/Tutorial';
import { useGameState } from '@/hooks/useGameState';

const Index = () => {
  // useGameState (useReducer를 사용하는 커스텀 훅)를 사용하여 게임 상태를 관리함
  const { state, actions } = useGameState();
  
  // 두더지 등장 간격을 위한 useRef (리렌더링을 발생시키지 않음)
  const moleTimerId = useRef<number | null>(null);
  const prevActiveHoles = useRef<boolean[]>([]);

  // 두더지 등장 로직을 위한 useEffect
  useEffect(() => {
    if (state.isGameRunning) {
      // 기존 타이머 제거
      if (moleTimerId.current) {
        window.clearInterval(moleTimerId.current);
      }
      
      // 비교를 위해 현재 활성 두더지 구멍 저장
      prevActiveHoles.current = [...state.activeHoles];
      
      // 난이도에 따라 간격 계산 (난이도가 높을수록 빨라짐)
      const baseInterval = 1200;
      const interval = baseInterval - (state.difficulty * 150);
      
      // 두더지 등장 간격 설정
      moleTimerId.current = window.setInterval(() => {
        // 한 번에 활성화될 수 있는 최대 두더지 수 결정 (난이도에 따라)
        const maxActiveMoles = Math.min(3, Math.ceil(state.difficulty / 2));
        
        // 새로운 활성 두더지 구멍 배열 생성
        const newActiveHoles = [...state.activeHoles];
        
        // 현재 활성 두더지 수 계산
        const currentActiveMoles = newActiveHoles.filter(isActive => isActive).length;
        
        // 활성 두더지 중 일부를 무작위로 숨김
        if (currentActiveMoles > 0) {
          for (let i = 0; i < newActiveHoles.length; i++) {
            if (newActiveHoles[i] && Math.random() > 0.5) {
              newActiveHoles[i] = false;
            }
          }
        }
        
        // 최대치까지 새로운 두더지를 무작위로 등장시킴
        const availableSlots = newActiveHoles
          .map((isActive, index) => ({ isActive, index }))
          .filter(slot => !slot.isActive);
          
        // 사용 가능한 슬롯 섞기
        availableSlots.sort(() => Math.random() - 0.5);
        
        // maxActiveMoles까지 두더지 활성화
        const slotsToActivate = Math.min(
          maxActiveMoles - newActiveHoles.filter(isActive => isActive).length,
          availableSlots.length,
          1 + Math.floor(Math.random() * state.difficulty) // 난이도의 영향을 받는 무작위 숫자
        );
        
        for (let i = 0; i < slotsToActivate; i++) {
          if (availableSlots[i]) {
            newActiveHoles[availableSlots[i].index] = true;
          }
        }
        
        // 활성 두더지 구멍 상태 업데이트
        actions.setActiveHoles(newActiveHoles);
      }, interval);
    } else {
      // 게임이 실행 중이 아닐 때 인터벌 제거
      if (moleTimerId.current) {
        window.clearInterval(moleTimerId.current);
        moleTimerId.current = null;
      }
    }
    
    // 클린업 함수
    return () => {
      if (moleTimerId.current) {
        window.clearInterval(moleTimerId.current);
      }
    };
  }, [state.isGameRunning, state.difficulty]);
  
  // 두더지 때리기 처리
  const handleWhack = (index: number) => {
    actions.whackMole(index);
  };
  
  // 게임 리셋 처리
  const handleResetGame = () => {
    actions.resetGame();
  };
  
  // 새 게임 처리
  const handleNewGame = () => {
    actions.hideGameOver();
    actions.startGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8 px-4">
      <div className="container max-w-4xl mx-auto">
        <ScoreBoard 
          score={state.score}
          highScore={state.highScore}
          timeLeft={state.timeLeft}
          isGameRunning={state.isGameRunning}
          onStartGame={actions.startGame}
          onResetGame={handleResetGame}
          difficulty={state.difficulty}
          onChangeDifficulty={actions.setDifficulty}
        />
        
        <GameBoard 
          activeHoles={state.activeHoles}
          onWhack={handleWhack}
          gameSpeed={state.difficulty}
        />
        
        <GameModal 
          isOpen={state.showGameOver}
          score={state.score}
          highScore={state.highScore}
          onClose={actions.hideGameOver}
          onNewGame={handleNewGame}
        />
        
        <Tutorial />
      </div>
    </div>
  );
};

export default Index;
