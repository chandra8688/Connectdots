import React from 'react';

const GameStatus = ({ currentPlayer, scores }) => (
  <div className="status">
    <p>Current Player: {currentPlayer}</p>
    <p>Scores:</p>
    <ul>
      {Object.entries(scores).map(([player, score]) => (
        <li key={player}>{player}: {score}</li>
      ))}
    </ul>
  </div>
);

export default GameStatus;
