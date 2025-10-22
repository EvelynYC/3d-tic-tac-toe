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
 * Cross-layer Diagonal Summary:
 *
 * 1. Center Diagonals (2 lines × 2 directions = 4 total):
 *    - [0,4,8] Left-front → Center → Right-back
 *    - [2,4,6] Right-front → Center → Left-back
 *
 * 2. Side Diagonals (6 lines × 2 directions = 12 total):
 *    - [0,3,6] Left side: Left-front → Left-center → Left-back
 *    - [2,5,8] Right side: Right-front → Right-center → Right-back
 *    - [0,1,2] Front side: Left-front → Front-center → Right-front
 *    - [6,7,8] Back side: Left-back → Back-center → Right-back
 *    - [1,4,7] Middle-front: Front-center → Center → Back-center
 *    - [3,4,5] Middle-left: Left-center → Center → Right-center
 *
 * Total: 4 + 12 = 16 cross-layer diagonals
 */
export class CrossLayerWinStrategy extends WinDetectionStrategy {
  private static readonly LAYERS = {
    BOTTOM: 0,
    MIDDLE: 1,
    TOP: 2,
  } as const;

  checkWin(gameState: GameState): WinResult {
    // Check all cross-layer diagonals (16 total: 4 center + 12 side)

    // 2 through-center 3D space diagonals (each has 2 directions = 4 total)
    const centerDiagonals = [
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [start, center, end] of centerDiagonals) {
      const result = this.checkCrossLayerDiagonal(
        gameState,
        start,
        center,
        end
      );
      if (result.isWin) {
        return result;
      }
    }

    // 6 side cross-layer diagonals (each has 2 directions = 12 total)
    const sideDiagonals = [
      [0, 3, 6],
      [2, 5, 8],
      [0, 1, 2],
      [6, 7, 8],
      [1, 4, 7],
      [3, 4, 5],
    ];

    for (const [start, middle, end] of sideDiagonals) {
      const result = this.checkCrossLayerDiagonal(
        gameState,
        start,
        middle,
        end
      );
      if (result.isWin) {
        return result;
      }
    }

    return { isWin: false, winner: null };
  }

  private checkCrossLayerDiagonal(
    gameState: GameState,
    start: number,
    middle: number,
    end: number
  ): WinResult {
    // Bottom layer to top layer
    const diagonal1 = [
      gameState[start]?.[CrossLayerWinStrategy.LAYERS.BOTTOM] ?? null,
      gameState[middle]?.[CrossLayerWinStrategy.LAYERS.MIDDLE] ?? null,
      gameState[end]?.[CrossLayerWinStrategy.LAYERS.TOP] ?? null,
    ];

    if (this.checkThreeInARow(diagonal1)) {
      return { isWin: true, winner: diagonal1[0] as "dark" | "light" };
    }

    // Top layer to bottom layer
    const diagonal2 = [
      gameState[start]?.[CrossLayerWinStrategy.LAYERS.TOP] ?? null,
      gameState[middle]?.[CrossLayerWinStrategy.LAYERS.MIDDLE] ?? null,
      gameState[end]?.[CrossLayerWinStrategy.LAYERS.BOTTOM] ?? null,
    ];

    if (this.checkThreeInARow(diagonal2)) {
      return { isWin: true, winner: diagonal2[0] as "dark" | "light" };
    }

    return { isWin: false, winner: null };
  }
}
