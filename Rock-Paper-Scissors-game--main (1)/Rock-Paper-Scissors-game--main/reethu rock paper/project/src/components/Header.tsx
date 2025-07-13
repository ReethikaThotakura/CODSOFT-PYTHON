import React from 'react';
import { Scissors } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white bg-opacity-80 backdrop-blur-md shadow-sm py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scissors className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">Rock Paper Scissors</h1>
        </div>
        <div className="text-sm text-gray-600">
          <p>Internship Project</p>
        </div>
      </div>
    </header>
  );
};

export default Header;