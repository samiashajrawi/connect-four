import React, { useState } from 'react';
import * as d3 from 'd3';
import Cell from './Cell.js';
import './GameBoard.css';

const ROWS = 6;
const COLS = 7;
const checkForWin = (board, row, col, currentPlayer) => {
  const directions = [
    { dx: 1, dy: 0 }, // Horizontal
    { dx: 0, dy: 1 }, // Vertical
    { dx: 1, dy: 1 }, // Diagonal (down-right)
    { dx: 1, dy: -1 } // Diagonal (up-right)
  ];

  for (let { dx, dy } of directions) {
    let count = 1;

    // Check in the positive direction
    count += countInDirection(board, row, col, dx, dy, currentPlayer);

    // Check in the negative direction
    count += countInDirection(board, row, col, -dx, -dy, currentPlayer);

    if (count >= 4) return true;
  }

  return false;
};

const countInDirection = (board, row, col, dx, dy, player) => {
  let count = 0;
  let x = col + dx;
  let y = row + dy;

  while (x >= 0 && x < COLS && y >= 0 && y < ROWS && board[y][x] === player) {
    count++;
    x += dx;
    y += dy;
  }

  return count;
};

const GameBoard = () => {
  const [board, setBoard] = useState(Array(ROWS).fill(Array(COLS).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('red');

  // Function to drop a disc in a column
  const dropDisc = (col) => {
    const newBoard = board.map(row => [...row]);
        for (let row = ROWS - 1; row >= 0; row--) {
            if (!newBoard[row][col]) {
            newBoard[row][col] = currentPlayer;
            setBoard(newBoard);

            if (checkForWin(newBoard, row, col, currentPlayer)) {
                alert(`${currentPlayer} wins!`);
                setBoard(Array(ROWS).fill(Array(COLS).fill(null)));
            } else {
                setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
            }
            break;
            }
        }
    };

  const renderBoard = () => {
    return board.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Cell
          key={`${rowIndex}-${colIndex}`}
          row={rowIndex}
          col={colIndex}
          value={cell}
          onClick={() => dropDisc(colIndex)}
        />
      ))
    );
  };

  return (
    <div className="board-container">
      <svg className="board" width={COLS * 100} height={ROWS * 100}>
        {renderBoard()}
      </svg>
    </div>
  );
};

export default GameBoard;
