import { GameLogic, GameState, Player } from "../app/utils/GameLogic";

describe("Plane Lines Win Detection", () => {
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

  describe("Layer 0 (Bottom) Plane Lines", () => {
    // 3 rows + 3 columns = 6 tests
    test("should detect layer 0 row 0 [0,1,2]", () => {
      const gameState = createGameState([
        { column: 0, layer: 0, player: "dark" },
        { column: 1, layer: 0, player: "dark" },
        { column: 2, layer: 0, player: "dark" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("should detect layer 0 row 1 [3,4,5]", () => {
      const gameState = createGameState([
        { column: 3, layer: 0, player: "light" },
        { column: 4, layer: 0, player: "light" },
        { column: 5, layer: 0, player: "light" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });

    test("should detect layer 0 row 2 [6,7,8]", () => {
      const gameState = createGameState([
        { column: 6, layer: 0, player: "dark" },
        { column: 7, layer: 0, player: "dark" },
        { column: 8, layer: 0, player: "dark" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("should detect layer 0 col 0 [0,3,6]", () => {
      const gameState = createGameState([
        { column: 0, layer: 0, player: "light" },
        { column: 3, layer: 0, player: "light" },
        { column: 6, layer: 0, player: "light" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });

    test("should detect layer 0 col 1 [1,4,7]", () => {
      const gameState = createGameState([
        { column: 1, layer: 0, player: "dark" },
        { column: 4, layer: 0, player: "dark" },
        { column: 7, layer: 0, player: "dark" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("should detect layer 0 col 2 [2,5,8]", () => {
      const gameState = createGameState([
        { column: 2, layer: 0, player: "light" },
        { column: 5, layer: 0, player: "light" },
        { column: 8, layer: 0, player: "light" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });
  });

  describe("Layer 1 (Middle) Plane Lines", () => {
    // 3 rows + 3 columns = 6 tests
    test("should detect layer 1 row 0 [0,1,2]", () => {
      const gameState = createGameState([
        { column: 0, layer: 1, player: "dark" },
        { column: 1, layer: 1, player: "dark" },
        { column: 2, layer: 1, player: "dark" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("should detect layer 1 row 1 [3,4,5]", () => {
      const gameState = createGameState([
        { column: 3, layer: 1, player: "light" },
        { column: 4, layer: 1, player: "light" },
        { column: 5, layer: 1, player: "light" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });

    test("should detect layer 1 row 2 [6,7,8]", () => {
      const gameState = createGameState([
        { column: 6, layer: 1, player: "dark" },
        { column: 7, layer: 1, player: "dark" },
        { column: 8, layer: 1, player: "dark" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("should detect layer 1 col 0 [0,3,6]", () => {
      const gameState = createGameState([
        { column: 0, layer: 1, player: "light" },
        { column: 3, layer: 1, player: "light" },
        { column: 6, layer: 1, player: "light" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });

    test("should detect layer 1 col 1 [1,4,7]", () => {
      const gameState = createGameState([
        { column: 1, layer: 1, player: "dark" },
        { column: 4, layer: 1, player: "dark" },
        { column: 7, layer: 1, player: "dark" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("should detect layer 1 col 2 [2,5,8]", () => {
      const gameState = createGameState([
        { column: 2, layer: 1, player: "light" },
        { column: 5, layer: 1, player: "light" },
        { column: 8, layer: 1, player: "light" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });
  });

  describe("Layer 2 (Top) Plane Lines", () => {
    // 3 rows + 3 columns = 6 tests
    test("should detect layer 2 row 0 [0,1,2]", () => {
      const gameState = createGameState([
        { column: 0, layer: 2, player: "dark" },
        { column: 1, layer: 2, player: "dark" },
        { column: 2, layer: 2, player: "dark" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("should detect layer 2 row 1 [3,4,5]", () => {
      const gameState = createGameState([
        { column: 3, layer: 2, player: "light" },
        { column: 4, layer: 2, player: "light" },
        { column: 5, layer: 2, player: "light" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });

    test("should detect layer 2 row 2 [6,7,8]", () => {
      const gameState = createGameState([
        { column: 6, layer: 2, player: "dark" },
        { column: 7, layer: 2, player: "dark" },
        { column: 8, layer: 2, player: "dark" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("should detect layer 2 col 0 [0,3,6]", () => {
      const gameState = createGameState([
        { column: 0, layer: 2, player: "light" },
        { column: 3, layer: 2, player: "light" },
        { column: 6, layer: 2, player: "light" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });

    test("should detect layer 2 col 1 [1,4,7]", () => {
      const gameState = createGameState([
        { column: 1, layer: 2, player: "dark" },
        { column: 4, layer: 2, player: "dark" },
        { column: 7, layer: 2, player: "dark" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("should detect layer 2 col 2 [2,5,8]", () => {
      const gameState = createGameState([
        { column: 2, layer: 2, player: "light" },
        { column: 5, layer: 2, player: "light" },
        { column: 8, layer: 2, player: "light" },
      ]);
      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });
  });
});
