import { GameLogic, GameState, Player } from "../app/utils/GameLogic";

describe("Cross-layer Diagonals Win Detection", () => {
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

  describe("3D Space Diagonals", () => {
    test("left-front to center to right-back diagonal", () => {
      const gameState = createGameState([
        { column: 0, layer: 0, player: "dark" },
        { column: 4, layer: 1, player: "dark" },
        { column: 8, layer: 2, player: "dark" },
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("right-front to center to left-back diagonal", () => {
      const gameState = createGameState([
        { column: 2, layer: 0, player: "light" },
        { column: 4, layer: 1, player: "light" },
        { column: 6, layer: 2, player: "light" },
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });

    test("left-back to center to right-front diagonal", () => {
      const gameState = createGameState([
        { column: 6, layer: 0, player: "dark" },
        { column: 4, layer: 1, player: "dark" },
        { column: 2, layer: 2, player: "dark" },
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("right-back to center to left-front diagonal", () => {
      const gameState = createGameState([
        { column: 8, layer: 0, player: "light" },
        { column: 4, layer: 1, player: "light" },
        { column: 0, layer: 2, player: "light" },
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });
  });

  describe("Left Side Cross-layer Diagonals", () => {
    test("left-front to left-center to left-back diagonal (bottom to top)", () => {
      const gameState = createGameState([
        { column: 0, layer: 0, player: "dark" },
        { column: 3, layer: 1, player: "dark" },
        { column: 6, layer: 2, player: "dark" },
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("left-front to left-center to left-back diagonal (top to bottom)", () => {
      const gameState = createGameState([
        { column: 0, layer: 2, player: "light" },
        { column: 3, layer: 1, player: "light" },
        { column: 6, layer: 0, player: "light" },
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });
  });

  describe("Right Side Cross-layer Diagonals", () => {
    test("right-front to right-center to right-back diagonal (bottom to top)", () => {
      const gameState = createGameState([
        { column: 2, layer: 0, player: "dark" },
        { column: 5, layer: 1, player: "dark" },
        { column: 8, layer: 2, player: "dark" },
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("right-front to right-center to right-back diagonal (top to bottom)", () => {
      const gameState = createGameState([
        { column: 2, layer: 2, player: "light" },
        { column: 5, layer: 1, player: "light" },
        { column: 8, layer: 0, player: "light" },
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });
  });

  describe("Front Side Cross-layer Diagonals", () => {
    test("left-front to front-center to right-front diagonal (bottom to top)", () => {
      const gameState = createGameState([
        { column: 0, layer: 0, player: "dark" },
        { column: 1, layer: 1, player: "dark" },
        { column: 2, layer: 2, player: "dark" },
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("left-front to front-center to right-front diagonal (top to bottom)", () => {
      const gameState = createGameState([
        { column: 0, layer: 2, player: "light" },
        { column: 1, layer: 1, player: "light" },
        { column: 2, layer: 0, player: "light" },
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });
  });

  describe("Back Side Cross-layer Diagonals", () => {
    test("left-back to back-center to right-back diagonal (bottom to top)", () => {
      const gameState = createGameState([
        { column: 6, layer: 0, player: "dark" },
        { column: 7, layer: 1, player: "dark" },
        { column: 8, layer: 2, player: "dark" },
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("left-back to back-center to right-back diagonal (top to bottom)", () => {
      const gameState = createGameState([
        { column: 6, layer: 2, player: "light" },
        { column: 7, layer: 1, player: "light" },
        { column: 8, layer: 0, player: "light" },
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });
  });

  describe("Edge Cross-layer Diagonals", () => {
    test("middle-front cross-layer diagonal (bottom to top)", () => {
      const gameState = createGameState([
        { column: 1, layer: 0, player: "light" },
        { column: 4, layer: 1, player: "light" },
        { column: 7, layer: 2, player: "light" },
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });

    test("middle-front cross-layer diagonal (top to bottom)", () => {
      const gameState = createGameState([
        { column: 1, layer: 2, player: "dark" },
        { column: 4, layer: 1, player: "dark" },
        { column: 7, layer: 0, player: "dark" },
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("middle-left cross-layer diagonal (bottom to top)", () => {
      const gameState = createGameState([
        { column: 3, layer: 0, player: "dark" },
        { column: 4, layer: 1, player: "dark" },
        { column: 5, layer: 2, player: "dark" },
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("middle-left cross-layer diagonal (top to bottom)", () => {
      const gameState = createGameState([
        { column: 3, layer: 2, player: "light" },
        { column: 4, layer: 1, player: "light" },
        { column: 5, layer: 0, player: "light" },
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });
  });
});
