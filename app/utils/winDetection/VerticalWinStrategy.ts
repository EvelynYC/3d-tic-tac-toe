import { GameState } from "../GameLogic";
import { WinDetectionStrategy, WinResult } from "./WinDetectionStrategy";

export class VerticalWinStrategy extends WinDetectionStrategy {
  checkWin(gameState: GameState): WinResult {
    const totalColumns = 9;

    // Check vertical lines (three identical tokens in the same column)
    for (let columnIndex = 0; columnIndex < totalColumns; columnIndex++) {
      const tokens = gameState[columnIndex];
      if (tokens && this.checkThreeInARow(tokens)) {
        return { isWin: true, winner: tokens[0] as "dark" | "light" };
      }
    }

    return { isWin: false, winner: null };
  }
}
