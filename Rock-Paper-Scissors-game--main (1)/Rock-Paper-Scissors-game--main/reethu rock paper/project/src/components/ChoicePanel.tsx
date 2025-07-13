import React from 'react';
import { useGame } from '../context/GameContext';
import ChoiceButton from './ChoiceButton';

interface ChoicePanelProps {
  disabled?: boolean;
}

const ChoicePanel: React.FC<ChoicePanelProps> = ({ disabled = false }) => {
  const { setPlayerChoice } = useGame();

  return (
    <div className="grid grid-cols-3 gap-4">
      <ChoiceButton 
        choice="rock" 
        disabled={disabled} 
        onClick={() => setPlayerChoice('rock')} 
      />
      <ChoiceButton 
        choice="paper" 
        disabled={disabled} 
        onClick={() => setPlayerChoice('paper')} 
      />
      <ChoiceButton 
        choice="scissors" 
        disabled={disabled} 
        onClick={() => setPlayerChoice('scissors')} 
      />
    </div>
  );
};

export default ChoicePanel;