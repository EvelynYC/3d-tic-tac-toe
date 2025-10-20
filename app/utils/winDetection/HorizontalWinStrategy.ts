import { GameState, Player } from "../GameLogic";
import { WinDetectionStrategy, WinResult } from "./WinDetectionStrategy";

export class PlaneLineWinStrategy extends WinDetectionStrategy {
  checkWin(gameState: GameState): WinResult {
    const boardSize = 3;

    // Check plane lines within each layer (rows and columns)
    for (let layer = 0; layer < boardSize; layer++) {
      // Check rows (horizontal) in each layer
      for (let row = 0; row < boardSize; row++) {
        const tokens: (Player | null)[] = [];
        for (let col = 0; col < boardSize; col++) {
          const columnIndex = row * boardSize + col;
          tokens.push(gameState[columnIndex]?.[layer] ?? null);
        }

        if (this.checkThreeInARow(tokens)) {
          return { isWin: true, winner: tokens[0] as "dark" | "light" };
        }
      }

      // Check columns (vertical) in each layer
      for (let col = 0; col < boardSize; col++) {
        const tokens: (Player | null)[] = [];
        for (let row = 0; row < boardSize; row++) {
          const columnIndex = row * boardSize + col;
          tokens.push(gameState[columnIndex]?.[layer] ?? null);
        }

        if (this.checkThreeInARow(tokens)) {
          return { isWin: true, winner: tokens[0] as "dark" | "light" };
        }
      }
    }

    return { isWin: false, winner: null };
  }
}
