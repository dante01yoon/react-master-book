import React from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface GameModalProps {
  isOpen: boolean;
  score: number;
  highScore: number;
  onClose: () => void;
  onNewGame: () => void;
}

// 이 컴포넌트는 React Portal을 사용하는 예시임
const GameModal: React.FC<GameModalProps> = ({ isOpen, score, highScore, onClose, onNewGame }) => {
  if (!isOpen) return null;
  
  // return ReactDOM.createPortal(
  //   <div className="modal-overlay">
  //     <div className="modal-content">
  //       <button className="modal-close" onClick={onClose}>❌</button>
  //       {/* 모달 안에 게임 컴포넌트 렌더 */}
  //       {renderGame()}  
  //     </div>
  //   </div>,
  //   document.body
  // );
  // Portal을 생성하여 모달을 일반적인 DOM 계층 구조 외부에 렌더링함
  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div 
        className="bg-white rounded-lg p-6 w-[90%] max-w-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 15 }}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Game Over!</h2>
        <div className="mb-6 text-center">
          <p className="text-lg mb-2">Your score: <span className="font-bold text-primary">{score}</span></p>
          <p className="text-md">High score: <span className="font-bold text-primary">{highScore}</span></p>
          
          {score > 0 && score === highScore && (
            <motion.p 
              className="mt-4 text-lg font-bold text-green-600"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              New High Score! 🎉
            </motion.p>
          )}
        </div>
        
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={onNewGame}>New Game</Button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default GameModal;
