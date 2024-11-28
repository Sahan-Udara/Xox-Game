import React, { useState } from 'react';

const XOX = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (!board.includes(null)) {
      setWinner('Draw');
    }
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((_, index) => renderSquare(index))}
      </div>
      {winner && (
        <div className="status">
          {winner === 'Draw' ? 'It\'s a Draw!' : `${winner} wins!`}
        </div>
      )}
      <button className="reset-button" onClick={resetGame}>Restart Game</button>
      
      {/* Inner CSS */}
      <style jsx>{`
        .game-container {
          text-align: center;
          font-family: Arial, sans-serif;
          margin-top: 20px;
        }
        .game-container h1{
            font-size: 30px;
            font-weight: bold;
        }
        .board {
          display: grid;
          grid-template-columns: repeat(3, 100px);
          grid-gap: 10px;
          justify-content: center;
          margin-top: 20px;
        }
        .square {
          width: 100px;
          height: 100px;
          font-size: 24px;
          font-weight: bold;
          cursor: pointer;
          background-color: #f0f0f0;
          border: 2px solid #ccc;
          border-radius: 8px;
          transition: background-color 0.3s;
        }
        .square:hover {
          background-color: #e0e0e0;
        }
        .status {
          margin-top: 20px;
          font-size: 24px;
          font-weight: bold;
        }
        .reset-button {
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 16px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .reset-button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

export default XOX;
