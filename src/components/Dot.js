// src/components/Dot.js
import React from 'react';

const Dot = ({ x, y }) => (
  <div className="dot" style={{ left: `${x * 20}px`, top: `${y * 20}px` }}></div>
);

export default Dot;

