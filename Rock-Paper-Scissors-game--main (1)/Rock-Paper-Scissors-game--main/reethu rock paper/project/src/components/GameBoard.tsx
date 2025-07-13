import React from 'react';
import { useGame } from '../context/GameContext';
import ChoicePanel from './ChoicePanel';
import ResultDisplay from './ResultDisplay';
import ScoreBoard from './ScoreBoard';
import GameHistory from './GameHistory';

const GameBoard: React.FC = () => {
  const { 
    playerChoice, 
    computerChoice, 
    result,
    isAnimating
  } = useGame();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <ScoreBoard />
            
            <div className="p-6">
              <ResultDisplay />
              
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  {!playerChoice || result ? "Make your choice:" : "Wait for computer..."}
                </h2>
                <ChoicePanel disabled={isAnimating} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <GameHistory />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;