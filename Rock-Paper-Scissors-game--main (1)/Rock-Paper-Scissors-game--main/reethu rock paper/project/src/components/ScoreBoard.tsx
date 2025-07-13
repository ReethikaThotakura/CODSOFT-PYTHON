import React from 'react';
import { useGame } from '../context/GameContext';
import { RotateCcw } from 'lucide-react';

const ScoreBoard: React.FC = () => {
  const { playerScore, computerScore, rounds, resetGame } = useGame();

  return (
    <div className="bg-blue-600 text-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-xs font-medium text-blue-200">ROUNDS</p>
            <p className="text-2xl font-bold">{rounds}</p>
          </div>
          
          <div className="flex items-center gap-3 bg-blue-700 bg-opacity-30 px-4 py-2 rounded-lg">
            <div className="text-center">
              <p className="text-xs font-medium text-blue-200">YOU</p>
              <p className="text-2xl font-bold">{playerScore}</p>
            </div>
            
            <div className="text-2xl font-light">:</div>
            
            <div className="text-center">
              <p className="text-xs font-medium text-blue-200">CPU</p>
              <p className="text-2xl font-bold">{computerScore}</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={resetGame}
          className="flex items-center gap-1 bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors px-3 py-1 rounded-md text-sm"
        >
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};

export default ScoreBoard;