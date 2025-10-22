import { GameState } from "../GameLogic";
import { WinDetectionStrategy, WinResult } from "./WinDetectionStrategy";

/*
 * 3D Board Position Reference (3x3x3 = 27 positions)
 *
 * Layer 0 (Bottom):    Layer 1 (Middle):    Layer 2 (Top):
 * [0] [1] [2]         [0] [1] [2]         [0] [1] [2]
 * [3] [4] [5]         [3] [4] [5]         [3] [4] [5]
 * [6] [7] [8]         [6] [7] [8]         [6] [7] [8]
 *
 * Plane Diagonal Summary:
 *
 * 1. Main Diagonals (3 layers × 1 diagonal = 3 total):
 *    - [0,4,8] Top-left → Center → Bottom-right
 *
 * 2. Anti-diagonals (3 layers × 1 diagonal = 3 total):
 *    - [2,4,6] Top-right → Center → Bottom-left
 *
 * Total: 3 + 3 = 6 plane diagonals
 */
export class DiagonalWinStrategy extends WinDetectionStrategy {
  checkWin(gameState: GameState): WinResult {
    const boardSize = 3;

    // Check diagonals in each layer (6 total: 3 main + 3 anti)
    for (let layer = 0; layer < boardSize; layer++) {
      // Main diagonal (top-left to bottom-right)
      const diagonal1 = [
        gameState[0]?.[layer] ?? null,
        gameState[4]?.[layer] ?? null,
        gameState[8]?.[layer] ?? null,
      ];

      if (this.checkThreeInARow(diagonal1)) {
        return { isWin: true, winner: diagonal1[0] as "dark" | "light" };
      }

      // Anti-diagonal (top-right to bottom-left)
      const diagonal2 = [
        gameState[2]?.[layer] ?? null,
        gameState[4]?.[layer] ?? null,
        gameState[6]?.[layer] ?? null,
      ];

      if (this.checkThreeInARow(diagonal2)) {
        return { isWin: true, winner: diagonal2[0] as "dark" | "light" };
      }
    }

    return { isWin: false, winner: null };
  }
}
