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

  // Add new win detection strategy
  addStrategy(strategy: WinDetectionStrategy): void {
    this.strategies.push(strategy);
  }

  // Remove strategy
  removeStrategy(strategy: WinDetectionStrategy): void {
    const index = this.strategies.indexOf(strategy);
    if (index > -1) {
      this.strategies.splice(index, 1);
    }
  }
}
