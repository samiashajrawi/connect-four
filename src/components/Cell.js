import React from 'react';

const Cell = ({ row, col, value, onClick }) => {
  const fillColor = value ? value : 'white'; // Red or Yellow disc, or empty
  
  return (
    <circle
      cx={col * 100 + 50}
      cy={row * 100 + 50}
      r={40}
      fill={fillColor}
      stroke="black"
      strokeWidth={2}
      onClick={onClick}
    />
  );
};

export default Cell;
