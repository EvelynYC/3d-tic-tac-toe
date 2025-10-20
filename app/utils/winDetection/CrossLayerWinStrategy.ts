import { GameState, Player } from "../GameLogic";
import { WinDetectionStrategy, WinResult } from "./WinDetectionStrategy";

export class CrossLayerWinStrategy extends WinDetectionStrategy {
  checkWin(gameState: GameState): WinResult {
    // Check all cross-layer diagonals (16 total: 4 center + 12 side)

    // 4 through-center 3D space diagonals (each has 2 directions)
    const centerDiagonals = [
      [0, 4, 8], // Left-front to center to right-back
      [2, 4, 6], // Right-front to center to left-back
    ];

    for (const [start, center, end] of centerDiagonals) {
      // Bottom layer to top layer
      const diagonal1 = [
        gameState[start]?.[0] ?? null,
        gameState[center]?.[1] ?? null,
        gameState[end]?.[2] ?? null,
      ];

      if (this.checkThreeInARow(diagonal1)) {
        return { isWin: true, winner: diagonal1[0] as "dark" | "light" };
      }

      // Top layer to bottom layer
      const diagonal2 = [
        gameState[start]?.[2] ?? null,
        gameState[center]?.[1] ?? null,
        gameState[end]?.[0] ?? null,
      ];

      if (this.checkThreeInARow(diagonal2)) {
        return { isWin: true, winner: diagonal2[0] as "dark" | "light" };
      }
    }

    // 12 side cross-layer diagonals (each has 2 directions)
    const sideDiagonals = [
      // Left side cross-layer diagonal
      [0, 3, 6], // Left-front to left-center to left-back
      // Right side cross-layer diagonal
      [2, 5, 8], // Right-front to right-center to right-back
      // Front side cross-layer diagonal
      [0, 1, 2], // Left-front to front-center to right-front
      // Back side cross-layer diagonal
      [6, 7, 8], // Left-back to back-center to right-back
      // Middle cross-layer diagonals
      [1, 4, 7], // Front-center to center to back-center
      [3, 4, 5], // Left-center to center to right-center
    ];

    for (const [start, middle, end] of sideDiagonals) {
      // Bottom layer to top layer
      const diagonal1 = [
        gameState[start]?.[0] ?? null,
        gameState[middle]?.[1] ?? null,
        gameState[end]?.[2] ?? null,
      ];

      if (this.checkThreeInARow(diagonal1)) {
        return { isWin: true, winner: diagonal1[0] as "dark" | "light" };
      }

      // Top layer to bottom layer
      const diagonal2 = [
        gameState[start]?.[2] ?? null,
        gameState[middle]?.[1] ?? null,
        gameState[end]?.[0] ?? null,
      ];

      if (this.checkThreeInARow(diagonal2)) {
        return { isWin: true, winner: diagonal2[0] as "dark" | "light" };
      }
    }

    return { isWin: false, winner: null };
  }
}
