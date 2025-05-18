import React, { useRef, useEffect } from 'react';
import Hole from './Hole';

interface GameBoardProps {
  activeHoles: boolean[];
  onWhack: (index: number) => void;
  gameSpeed: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ activeHoles, onWhack, gameSpeed }) => {
  // 각 두더지에 대한 ref 배열
  const moleRefs = useRef<(HTMLDivElement | null)[]>(Array(9).fill(null));
  
  // 난이도에 따른 속도 계산
  const moleSpeed = 0.5 - (gameSpeed * 0.05);
  
  useEffect(() => {
    console.log(moleRefs.current);
  },[activeHoles]);

  return (
    <div className="relative mx-auto">
      <div className="w-full p-4 bg-grass rounded-lg shadow-lg">
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          {activeHoles.map((isActive, index) => (
            <Hole 
              key={index}
              ref={(el) => { moleRefs.current[index] = el; }}
              isActive={isActive}
              onWhack={() => onWhack(index)}
              index={index}
              speed={moleSpeed}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
