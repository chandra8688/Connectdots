// src/App.js
import React, { useState, useCallback } from 'react';
import Board from './components/Board';
import GameStatus from './components/GameStatus';
import './App.css';

const App = () => {
  const [size] = useState(5);
  const [lines, setLines] = useState([]);
  const [squares, setSquares] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('Player 1');
  const [scores, setScores] = useState({ 'Player 1': 0, 'Player 2': 0 });
  const [selectedDot, setSelectedDot] = useState(null);

  const handleLineClick = useCallback((x, y) => {
    setSelectedDot(prevDot => {
      if (prevDot) {
        const from = prevDot;
        const to = { x, y };

        // Check if the line is valid (adjacent dots)
        if ((Math.abs(from.x - to.x) === 1 && from.y === to.y) || 
            (Math.abs(from.y - to.y) === 1 && from.x === to.x)) {
          const direction = from.x === to.x ? 'vertical' : 'horizontal';
          const newLine = { from, to, direction };

          // Check if the line already exists
          if (!lines.some(line => 
            (line.from.x === from.x && line.from.y === from.y && line.to.x === to.x && line.to.y === to.y) ||
            (line.from.x === to.x && line.from.y === to.y && line.to.x === from.x && line.to.y === from.y)
          )) {
            setLines(prevLines => [...prevLines, newLine]);

            // Check for completed squares and update state
            const completedSquares = checkForCompletedSquares(from, to);
            if (completedSquares.length > 0) {
              setSquares(prevSquares => [...prevSquares, ...completedSquares]);
              setScores(prevScores => {
                const newScores = { ...prevScores };
                newScores[currentPlayer] += completedSquares.length;
                return newScores;
              });
            } else {
              // Switch player turn if no square is completed
              setCurrentPlayer(prevPlayer => prevPlayer === 'Player 1' ? 'Player 2' : 'Player 1');
            }
          }
        }

        return null;
      } else {
        return { x, y };
      }
    });
  }, [lines, currentPlayer]);

  const checkForCompletedSquares = (from, to) => {
    const squares = [];

    // Logic to check if a square is completed
    // A square is completed if all four sides have lines

    // Horizontal line
    if (from.y === to.y) {
      // Check above
      if (lines.some(line => line.from.x === from.x && line.from.y === from.y - 1 && line.to.x === to.x && line.to.y === to.y - 1) &&
          lines.some(line => line.from.x === from.x && line.from.y === from.y - 1 && line.to.x === from.x && line.to.y === from.y) &&
          lines.some(line => line.from.x === to.x && line.from.y === to.y - 1 && line.to.x === to.x && line.to.y === to.y)) {
        squares.push({ x: from.x, y: from.y - 1, owner: currentPlayer });
      }
      // Check below
      if (lines.some(line => line.from.x === from.x && line.from.y === from.y + 1 && line.to.x === to.x && line.to.y === to.y + 1) &&
          lines.some(line => line.from.x === from.x && line.from.y === from.y && line.to.x === from.x && line.to.y === from.y + 1) &&
          lines.some(line => line.from.x === to.x && line.from.y === to.y && line.to.x === to.x && line.to.y === to.y + 1)) {
        squares.push({ x: from.x, y: from.y, owner: currentPlayer });
      }
    }

    // Vertical line
    if (from.x === to.x) {
      // Check left
      if (lines.some(line => line.from.x === from.x - 1 && line.from.y === from.y && line.to.x === to.x - 1 && line.to.y === to.y) &&
          lines.some(line => line.from.x === from.x - 1 && line.from.y === from.y && line.to.x === from.x && line.to.y === from.y) &&
          lines.some(line => line.from.x === from.x - 1 && line.from.y === to.y && line.to.x === from.x && line.to.y === to.y)) {
        squares.push({ x: from.x - 1, y: from.y, owner: currentPlayer });
      }
      // Check right
      if (lines.some(line => line.from.x === from.x + 1 && line.from.y === from.y && line.to.x === to.x + 1 && line.to.y === to.y) &&
          lines.some(line => line.from.x === from.x && line.from.y === from.y && line.to.x === from.x + 1 && line.to.y === from.y) &&
          lines.some(line => line.from.x === from.x && line.from.y === to.y && line.to.x === from.x + 1 && line.to.y === to.y)) {
        squares.push({ x: from.x, y: from.y, owner: currentPlayer });
      }
    }

    return squares;
  };

  return (
    <div className="app">
      <Board size={size} lines={lines} squares={squares} onLineClick={handleLineClick} />
      <GameStatus currentPlayer={currentPlayer} scores={scores} />
    </div>
  );
};

export default App;
