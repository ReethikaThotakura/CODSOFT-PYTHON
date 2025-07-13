import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white bg-opacity-80 backdrop-blur-md py-3 text-center text-gray-500 text-sm">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} Rock Paper Scissors Game</p>
      </div>
    </footer>
  );
};

export default Footer;