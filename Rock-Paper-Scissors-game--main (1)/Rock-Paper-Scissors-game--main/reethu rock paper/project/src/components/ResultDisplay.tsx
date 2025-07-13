import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import ChoiceButton from './ChoiceButton';

const ResultDisplay: React.FC = () => {
  const { playerChoice, computerChoice, result, isAnimating } = useGame();
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => {
        setShowResult(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowResult(false);
    }
  }, [result]);

  if (!playerChoice) {
    return (
      <div className="h-36 flex items-center justify-center">
        <p className="text-xl text-gray-500 animate-pulse">Select your move to start the game</p>
      </div>
    );
  }

  return (
    <div className="min-h-36">
      <div className="grid grid-cols-3 items-center justify-items-center gap-4">
        <div className="flex flex-col items-center">
          <p className="text-sm font-medium text-gray-600 mb-3">You</p>
          <ChoiceButton choice={playerChoice} size="md" onClick={() => {}} selected={true} disabled />
        </div>
        
        <div className="flex items-center justify-center">
          {isAnimating && !computerChoice ? (
            <div className="text-2xl animate-pulse">🤔</div>
          ) : showResult ? (
            <div className={`
              text-xl font-bold py-2 px-6 rounded-full
              ${result === 'win' ? 'bg-green-100 text-green-700' : 
                result === 'lose' ? 'bg-red-100 text-red-700' : 
                'bg-gray-100 text-gray-700'}
              transform transition-all duration-500
              ${showResult ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
            `}>
              {result === 'win' ? 'You Win!' : 
               result === 'lose' ? 'You Lose' : 
               'Draw'}
            </div>
          ) : (
            <div className="text-xl">VS</div>
          )}
        </div>
        
        <div className="flex flex-col items-center">
          <p className="text-sm font-medium text-gray-600 mb-3">Computer</p>
          {computerChoice ? (
            <ChoiceButton choice={computerChoice} size="md" onClick={() => {}} selected={true} disabled />
          ) : (
            <div className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center bg-gray-50">
              <span className="animate-pulse text-gray-400">?</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Result explanation */}
      {result && showResult && (
        <div className="mt-6 text-center text-gray-600 animate-fadeIn">
          <p>
            {result === 'win' && `${playerChoice} beats ${computerChoice}`}
            {result === 'lose' && `${computerChoice} beats ${playerChoice}`}
            {result === 'draw' && `Both chose ${playerChoice}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;