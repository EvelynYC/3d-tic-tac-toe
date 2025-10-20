"use client";

import { useState, useCallback } from "react";
import Scene from "./components/Scene";
import { Player } from "./utils/GameLogic";

export default function Home() {
  const [currentPlayer, setCurrentPlayer] = useState<Player>("dark");
  const [gameState, setGameState] = useState<(Player | null)[][]>(
    Array(9)
      .fill(null)
      .map(() => [])
  );
  const [gameStatus, setGameStatus] = useState<{
    isGameOver: boolean;
    winner: Player | null;
  }>({ isGameOver: false, winner: null });

  const handleColumnClick = useCallback(
    (columnIndex: number) => {
      // If game is over, don't allow token placement
      if (gameStatus.isGameOver) return;

      setGameState((prev) => {
        const newState = [...prev];
        const column = [...newState[columnIndex]];

        // Check if column is full (max 3 tokens)
        if (column.filter((token) => token !== null).length >= 3) {
          return prev;
        }

        // Add current player's token
        column.push(currentPlayer);
        newState[columnIndex] = column;

        return newState;
      });

      // Switch player
      setCurrentPlayer((prev) => (prev === "dark" ? "light" : "dark"));
    },
    [currentPlayer, gameStatus.isGameOver]
  );

  const resetGame = () => {
    setGameState(
      Array(9)
        .fill(null)
        .map(() => [])
    );
    setCurrentPlayer("dark");
    setGameStatus({ isGameOver: false, winner: null });
  };

  const handleGameEnd = useCallback((winner: Player) => {
    setGameStatus({ isGameOver: true, winner });
  }, []);

  return (
    <main id="game-container">
      <div className="game-ui">
        {gameStatus.isGameOver ? (
          <div className="game-over">
            <div
              className="winner-message"
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: gameStatus.winner === "dark" ? "#000" : "#666",
                marginBottom: "10px",
              }}
            >
              🎉 {gameStatus.winner === "dark" ? "Team Walnut" : "Team Birch"}{" "}
              Wins! 🎉
            </div>
            <button
              onClick={resetGame}
              style={{
                padding: "12px 24px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Play Again
            </button>
          </div>
        ) : (
          <>
            <div className="current-player">
              Current Player: {currentPlayer === "dark" ? "Walnut" : "Birch"}
            </div>
            <div className="instructions">
              Click on a column to place a token. Each column can hold up to 3
              tokens.
            </div>
            <button
              onClick={resetGame}
              style={{
                marginTop: "10px",
                padding: "8px 16px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Reset Game
            </button>
          </>
        )}
      </div>

      <Scene
        onColumnClick={handleColumnClick}
        currentPlayer={currentPlayer}
        gameState={gameState}
        onGameEnd={handleGameEnd}
      />
    </main>
  );
}
