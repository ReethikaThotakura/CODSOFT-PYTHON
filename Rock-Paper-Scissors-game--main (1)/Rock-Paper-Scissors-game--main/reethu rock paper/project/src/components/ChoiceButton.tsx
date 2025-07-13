import React from 'react';

interface ChoiceButtonProps {
  choice: 'rock' | 'paper' | 'scissors';
  disabled?: boolean;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
  selected?: boolean;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ 
  choice, 
  disabled = false, 
  onClick, 
  size = 'lg',
  selected = false
}) => {
  const getChoiceEmoji = () => {
    switch (choice) {
      case 'rock': return '✊';
      case 'paper': return '✋';
      case 'scissors': return '✌️';
    }
  };

  const sizeClasses = {
    sm: 'text-2xl w-12 h-12',
    md: 'text-4xl w-16 h-16',
    lg: 'text-5xl w-20 h-20 sm:w-24 sm:h-24'
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`
        ${sizeClasses[size]}
        flex items-center justify-center
        bg-white border-2 rounded-full
        transition-all duration-300 ease-in-out
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:scale-110 hover:shadow-lg'}
        ${selected ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-300' : 'border-gray-200'}
      `}
      aria-label={`Choose ${choice}`}
    >
      <span className="transform transition-transform duration-300 hover:scale-110">
        {getChoiceEmoji()}
      </span>
    </button>
  );
};

export default ChoiceButton;