import { GameState } from "../GameLogic";
import { WinDetectionStrategy, WinResult } from "./WinDetectionStrategy";
import { PlaneLineWinStrategy } from "./HorizontalWinStrategy";
import { VerticalWinStrategy } from "./VerticalWinStrategy";
import { DiagonalWinStrategy } from "./DiagonalWinStrategy";
import { CrossLayerWinStrategy } from "./CrossLayerWinStrategy";

export class WinDetector {
  private strategies: WinDetectionStrategy[];

  constructor() {
    this.strategies = [
      new PlaneLineWinStrategy(), // 18 plane lines
      new VerticalWinStrategy(), // 9 vertical lines
      new DiagonalWinStrategy(), // 6 plane diagonals
      new CrossLayerWinStrategy(), // 16 cross-layer diagonals
    ];
  }

  checkWin(gameState: GameState): WinResult {
    for (const strategy of this.strategies) {
      const result = strategy.checkWin(gameState);
      if (result.isWin) {
        return result;
      }
    }

    return { isWin: false, winner: null };
  }
}
