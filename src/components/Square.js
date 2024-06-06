// src/components/Square.js
import React from 'react';

const Square = ({ x, y, owner }) => (
  <div className="square" style={{ left: `${x * 20}px`, top: `${y * 20}px` }}>
    {owner}
  </div>
);

export default Square;
