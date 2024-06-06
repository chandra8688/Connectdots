// src/components/Line.js
import React from 'react';

const Line = ({ from, to, direction }) => (
  <div className={`line ${direction}`} style={{
    left: `${from.x * 20}px`,
    top: `${from.y * 20}px`,
    width: direction === 'horizontal' ? '20px' : '2px',
    height: direction === 'vertical' ? '20px' : '2px',
  }}></div>
);

export default Line;
