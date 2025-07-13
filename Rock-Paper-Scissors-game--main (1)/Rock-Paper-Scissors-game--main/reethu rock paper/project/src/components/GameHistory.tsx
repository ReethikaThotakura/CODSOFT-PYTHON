import React from 'react';
import { useGame } from '../context/GameContext';
import ChoiceButton from './ChoiceButton';

const GameHistory: React.FC = () => {
  const { gameHistory } = useGame();

  if (gameHistory.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 h-full">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Game History</h2>
        <div className="flex items-center justify-center h-40 text-gray-400">
          <p>No games played yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Game History</h2>
      
      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
        {gameHistory.map((game) => (
          <div 
            key={game.id} 
            className={`
              p-3 rounded-lg border
              ${game.result === 'win' ? 'border-green-200 bg-green-50' : 
                game.result === 'lose' ? 'border-red-200 bg-red-50' : 
                'border-gray-200 bg-gray-50'}
            `}
          >
            <div className="flex justify-between items-center mb-2">
              <span className={`
                text-xs font-medium px-2 py-1 rounded
                ${game.result === 'win' ? 'bg-green-200 text-green-800' : 
                  game.result === 'lose' ? 'bg-red-200 text-red-800' : 
                  'bg-gray-200 text-gray-800'}
              `}>
                {game.result === 'win' ? 'WIN' : 
                 game.result === 'lose' ? 'LOSS' : 
                 'DRAW'}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(game.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </span>
            </div>
            
            <div className="flex items-center justify-around mt-2">
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500 mb-1">You</span>
                <ChoiceButton 
                  choice={game.playerChoice!} 
                  size="sm" 
                  onClick={() => {}} 
                  disabled 
                />
              </div>
              
              <span className="text-xs text-gray-400">vs</span>
              
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500 mb-1">CPU</span>
                <ChoiceButton 
                  choice={game.computerChoice!} 
                  size="sm" 
                  onClick={() => {}} 
                  disabled 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameHistory;