import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types
type Choice = 'rock' | 'paper' | 'scissors' | null;
type Result = 'win' | 'lose' | 'draw' | null;

interface GameHistoryItem {
  id: number;
  playerChoice: Choice;
  computerChoice: Choice;
  result: Result;
  timestamp: Date;
}

interface GameContextType {
  playerChoice: Choice;
  computerChoice: Choice;
  result: Result;
  playerScore: number;
  computerScore: number;
  rounds: number;
  gameHistory: GameHistoryItem[];
  setPlayerChoice: (choice: Choice) => void;
  resetGame: () => void;
  isAnimating: boolean;
}

// Create context with default values
const GameContext = createContext<GameContextType>({
  playerChoice: null,
  computerChoice: null,
  result: null,
  playerScore: 0,
  computerScore: 0,
  rounds: 0,
  gameHistory: [],
  setPlayerChoice: () => {},
  resetGame: () => {},
  isAnimating: false,
});

// Hook to use the game context
export const useGame = () => useContext(GameContext);

// Provider component
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<Result>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [gameHistory, setGameHistory] = useState<GameHistoryItem[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Generate computer choice
  const generateComputerChoice = (): Choice => {
    const choices: Choice[] = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
  };

  // Determine the game result
  const determineResult = (player: Choice, computer: Choice): Result => {
    if (!player || !computer) return null;
    
    if (player === computer) return 'draw';
    
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'win';
    }
    
    return 'lose';
  };

  // Handle player choice
  const handlePlayerChoice = (choice: Choice) => {
    if (isAnimating || choice === null) return;
    
    setIsAnimating(true);
    setPlayerChoice(choice);
    
    // Simulate computer "thinking"
    setTimeout(() => {
      const computerSelection = generateComputerChoice();
      setComputerChoice(computerSelection);
      
      const gameResult = determineResult(choice, computerSelection);
      setResult(gameResult);
      
      if (gameResult === 'win') {
        setPlayerScore(prev => prev + 1);
      } else if (gameResult === 'lose') {
        setComputerScore(prev => prev + 1);
      }
      
      setRounds(prev => prev + 1);
      
      // Add to game history
      const historyItem: GameHistoryItem = {
        id: Date.now(),
        playerChoice: choice,
        computerChoice: computerSelection,
        result: gameResult,
        timestamp: new Date()
      };
      
      setGameHistory(prev => [historyItem, ...prev].slice(0, 10));
      
      // Reset animation state
      setTimeout(() => {
        setIsAnimating(false);
      }, 1500);
    }, 1000);
  };

  // Reset the game
  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setPlayerScore(0);
    setComputerScore(0);
    setRounds(0);
    setGameHistory([]);
  };

  return (
    <GameContext.Provider
      value={{
        playerChoice,
        computerChoice,
        result,
        playerScore,
        computerScore,
        rounds,
        gameHistory,
        setPlayerChoice: handlePlayerChoice,
        resetGame,
        isAnimating
      }}
    >
      {children}
    </GameContext.Provider>
  );
};