import { GameState } from "../GameLogic";
import { WinDetectionStrategy, WinResult } from "./WinDetectionStrategy";

export class DiagonalWinStrategy extends WinDetectionStrategy {
  checkWin(gameState: GameState): WinResult {
    const boardSize = 3;

    // Check diagonals in each layer
    for (let layer = 0; layer < boardSize; layer++) {
      // Main diagonal (top-left to bottom-right)
      const diagonal1 = [
        gameState[0]?.[layer] ?? null, // Top-left
        gameState[4]?.[layer] ?? null, // Center
        gameState[8]?.[layer] ?? null, // Bottom-right
      ];

      if (this.checkThreeInARow(diagonal1)) {
        return { isWin: true, winner: diagonal1[0] as "dark" | "light" };
      }

      // Anti-diagonal (top-right to bottom-left)
      const diagonal2 = [
        gameState[2]?.[layer] ?? null, // Top-right
        gameState[4]?.[layer] ?? null, // Center
        gameState[6]?.[layer] ?? null, // Bottom-left
      ];

      if (this.checkThreeInARow(diagonal2)) {
        return { isWin: true, winner: diagonal2[0] as "dark" | "light" };
      }
    }

    return { isWin: false, winner: null };
  }
}
