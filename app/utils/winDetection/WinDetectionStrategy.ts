import { GameState, Player } from "../GameLogic";

export interface WinResult {
  isWin: boolean;
  winner: Player | null;
}

export abstract class WinDetectionStrategy {
  abstract checkWin(gameState: GameState): WinResult;

  protected checkThreeInARow(tokens: (Player | null)[]): boolean {
    if (tokens.length === 3) {
      const [first, second, third] = tokens;
      return (
        first !== null &&
        first !== undefined &&
        first === second &&
        second === third
      );
    }

    const validTokens = tokens.filter(
      (token) => token !== null && token !== undefined
    );

    if (validTokens.length < 3) {
      return false;
    }

    for (let i = 0; i <= validTokens.length - 3; i++) {
      if (
        validTokens[i] === validTokens[i + 1] &&
        validTokens[i + 1] === validTokens[i + 2]
      ) {
        return true;
      }
    }
    return false;
  }
}
