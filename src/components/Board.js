// src/components/Board.js
import React from 'react';
import Dot from './Dot';
import Line from './Line';
import Square from './Square';

const Board = ({ size, lines, squares, onLineClick }) => {
  const dots = Array(size).fill().map((_, i) => 
    Array(size).fill().map((_, j) => ({ x: i, y: j }))
  );

  return (
    <div className="board">
      {dots.map(row => row.map(dot => (
        <Dot key={`${dot.x}-${dot.y}`} x={dot.x} y={dot.y} onClick={() => onLineClick(dot.x, dot.y)} />
      )))}
      {lines.map((line, index) => (
        <Line key={index} from={line.from} to={line.to} direction={line.direction} />
      ))}
      {squares.map((square, index) => (
        <Square key={index} x={square.x} y={square.y} owner={square.owner} />
      ))}
    </div>
  );
};

export default Board;
