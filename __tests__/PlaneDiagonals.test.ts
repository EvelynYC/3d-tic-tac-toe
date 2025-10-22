import { GameLogic, GameState, Player } from "../app/utils/GameLogic";

describe("Plane Diagonals Win Detection", () => {
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

  describe("Layer 0 (Bottom) Plane Diagonals", () => {
    // 2 diagonals = 2 tests
    test("should detect layer 0 main diagonal [0,4,8]", () => {
      const gameState = createGameState([
        { column: 0, layer: 0, player: "dark" },
        { column: 4, layer: 0, player: "dark" },
        { column: 8, layer: 0, player: "dark" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("should detect layer 0 anti-diagonal [2,4,6]", () => {
      const gameState = createGameState([
        { column: 2, layer: 0, player: "light" },
        { column: 4, layer: 0, player: "light" },
        { column: 6, layer: 0, player: "light" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });
  });

  describe("Layer 1 (Middle) Plane Diagonals", () => {
    // 2 diagonals = 2 tests
    test("should detect layer 1 main diagonal [0,4,8]", () => {
      const gameState = createGameState([
        { column: 0, layer: 1, player: "dark" },
        { column: 4, layer: 1, player: "dark" },
        { column: 8, layer: 1, player: "dark" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("should detect layer 1 anti-diagonal [2,4,6]", () => {
      const gameState = createGameState([
        { column: 2, layer: 1, player: "light" },
        { column: 4, layer: 1, player: "light" },
        { column: 6, layer: 1, player: "light" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });
  });

  describe("Layer 2 (Top) Plane Diagonals", () => {
    // 2 diagonals = 2 tests
    test("should detect layer 2 main diagonal [0,4,8]", () => {
      const gameState = createGameState([
        { column: 0, layer: 2, player: "dark" },
        { column: 4, layer: 2, player: "dark" },
        { column: 8, layer: 2, player: "dark" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("should detect layer 2 anti-diagonal [2,4,6]", () => {
      const gameState = createGameState([
        { column: 2, layer: 2, player: "light" },
        { column: 4, layer: 2, player: "light" },
        { column: 6, layer: 2, player: "light" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });
  });
});
