import React from 'react';
import { GameProvider } from './context/GameContext';
import GameBoard from './components/GameBoard';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <GameBoard />
        </main>
        <Footer />
      </div>
    </GameProvider>
  );
}

export default App;