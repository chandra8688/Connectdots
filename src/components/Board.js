// src/components/Board.js
import React from 'react';
import Dot from './Dot';

const Board = ({ size }) => {
  // Initialize the grid
  const dots = Array(size).fill().map((_, i) => 
    Array(size).fill().map((_, j) => ({ x: i, y: j }))
  );

  return (
    <div className="board">
      {dots.map(row => row.map(dot => (
        <Dot key={`${dot.x}-${dot.y}`} x={dot.x} y={dot.y} />
      )))}
      {/* Render GameLines and Squares */}
    </div>
  );
};

export default Board;
