import { GameLogic, GameState, Player } from "../app/utils/GameLogic";

describe("Vertical Lines Win Detection", () => {
  // Helper function: create game state
  const createGameState = (
    tokens: Array<{ column: number; layer: number; player: Player }>
  ): GameState => {
    const gameState: GameState = Array(9)
      .fill(null)
      .map(() => []);
    tokens.forEach(({ column, layer, player }) => {
      // Ensure sufficient layers
      while (gameState[column].length <= layer) {
        gameState[column].push(null);
      }
      gameState[column][layer] = player;
    });
    return gameState;
  };

  describe("Column Vertical Lines", () => {
    // 9 columns × 1 vertical line each = 9 tests
    test("should detect column 0 vertical line", () => {
      const gameState = createGameState([
        { column: 0, layer: 0, player: "light" },
        { column: 0, layer: 1, player: "light" },
        { column: 0, layer: 2, player: "light" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });

    test("should detect column 1 vertical line", () => {
      const gameState = createGameState([
        { column: 1, layer: 0, player: "dark" },
        { column: 1, layer: 1, player: "dark" },
        { column: 1, layer: 2, player: "dark" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("should detect column 2 vertical line", () => {
      const gameState = createGameState([
        { column: 2, layer: 0, player: "light" },
        { column: 2, layer: 1, player: "light" },
        { column: 2, layer: 2, player: "light" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });

    test("should detect column 3 vertical line", () => {
      const gameState = createGameState([
        { column: 3, layer: 0, player: "dark" },
        { column: 3, layer: 1, player: "dark" },
        { column: 3, layer: 2, player: "dark" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("should detect column 4 vertical line", () => {
      const gameState = createGameState([
        { column: 4, layer: 0, player: "light" },
        { column: 4, layer: 1, player: "light" },
        { column: 4, layer: 2, player: "light" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });

    test("should detect column 5 vertical line", () => {
      const gameState = createGameState([
        { column: 5, layer: 0, player: "dark" },
        { column: 5, layer: 1, player: "dark" },
        { column: 5, layer: 2, player: "dark" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("should detect column 6 vertical line", () => {
      const gameState = createGameState([
        { column: 6, layer: 0, player: "light" },
        { column: 6, layer: 1, player: "light" },
        { column: 6, layer: 2, player: "light" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });

    test("should detect column 7 vertical line", () => {
      const gameState = createGameState([
        { column: 7, layer: 0, player: "dark" },
        { column: 7, layer: 1, player: "dark" },
        { column: 7, layer: 2, player: "dark" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("should detect column 8 vertical line", () => {
      const gameState = createGameState([
        { column: 8, layer: 0, player: "light" },
        { column: 8, layer: 1, player: "light" },
        { column: 8, layer: 2, player: "light" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });
  });
});
