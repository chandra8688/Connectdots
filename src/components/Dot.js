// src/components/Dot.js
import React from 'react';

const Dot = ({ x, y, onClick }) => (
  <div className="dot" style={{ left: `${x * 20}px`, top: `${y * 20}px` }} onClick={onClick}></div>
);

export default Dot;
