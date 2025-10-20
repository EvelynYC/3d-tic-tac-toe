export type Player = "dark" | "light";
export type GameState = (Player | null)[][];

export interface WinResult {
  isWin: boolean;
  winner: Player | null;
}

export interface GameConfig {
  boardSize: number;
  maxTokensPerColumn: number;
  totalColumns: number;
}

import { WinDetector } from "./winDetection/WinDetector";

export class GameLogic {
  private static readonly config: GameConfig = {
    boardSize: 3,
    maxTokensPerColumn: 3,
    totalColumns: 9,
  };

  private static winDetector = new WinDetector();

  static checkWinCondition(gameState: GameState): WinResult {
    return this.winDetector.checkWin(gameState);
  }

  static canPlaceToken(column: (Player | null)[], gameOver: boolean): boolean {
    return (
      column.filter((token) => token !== null).length <
        this.config.maxTokensPerColumn && !gameOver
    );
  }

  static isColumnFull(column: (Player | null)[]): boolean {
    return (
      column.filter((token) => token !== null).length >=
      this.config.maxTokensPerColumn
    );
  }

  static getTokenCount(column: (Player | null)[]): number {
    return column.filter((token) => token !== null).length;
  }

  static isGameEmpty(gameState: GameState): boolean {
    return gameState.every((column) => column.length === 0);
  }

  static getColumnPositions(): Array<{ x: number; z: number; index: number }> {
    const positions = [];
    for (let row = 0; row < this.config.boardSize; row++) {
      for (let col = 0; col < this.config.boardSize; col++) {
        positions.push({
          x: (col - 1) * 2,
          z: (row - 1) * 2,
          index: row * this.config.boardSize + col,
        });
      }
    }
    return positions;
  }
}
