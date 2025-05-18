import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

interface ScoreBoardProps {
  score: number;
  highScore: number;
  timeLeft: number;
  isGameRunning: boolean;
  onStartGame: () => void;
  onResetGame: () => void;
  difficulty: number;
  onChangeDifficulty: (level: number) => void;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  score,
  highScore,
  timeLeft,
  isGameRunning,
  onStartGame,
  onResetGame,
  difficulty,
  onChangeDifficulty
}) => {
  const { toast } = useToast();
  
  // 시간을 MM:SS 형식으로 포맷함
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // 게임 시작 시 토스트 메시지를 표시함
  const handleStartGame = () => {
    onStartGame();
    toast({
      title: "Game Started!",
      description: "Whack those moles!",
      duration: 2000,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-wrap justify-between items-center">
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-gray-800">Whack-a-Mole</h2>
          <div className="mt-2 flex space-x-6">
            <div>
              <p className="text-sm text-gray-600">Score</p>
              <p className="text-xl font-bold text-primary">{score}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">High Score</p>
              <p className="text-xl font-bold text-primary">{highScore}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Time</p>
              <p className="text-xl font-bold text-primary">{formatTime(timeLeft)}</p>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-auto flex flex-wrap items-center gap-3">
          <div className="mr-4">
            <p className="text-sm text-gray-600 mb-1">Difficulty</p>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map(level => (
                <button
                  key={level}
                  onClick={() => onChangeDifficulty(level)}
                  disabled={isGameRunning}
                  className={`w-8 h-8 rounded-full ${
                    difficulty === level 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } flex items-center justify-center transition-colors`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-2">
            {!isGameRunning ? (
              <Button onClick={handleStartGame}>Start Game</Button>
            ) : (
              <Button variant="destructive" onClick={onResetGame}>End Game</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
