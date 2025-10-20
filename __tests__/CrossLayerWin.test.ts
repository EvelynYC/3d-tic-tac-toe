import { GameLogic, GameState, Player } from "../app/utils/GameLogic";

describe("3D Diagonal Win Detection", () => {
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
        { column: 0, layer: 0, player: "dark" }, // Left-front, bottom layer
        { column: 4, layer: 1, player: "dark" }, // Center, middle layer
        { column: 8, layer: 2, player: "dark" }, // Right-back, top layer
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("right-front to center to left-back diagonal", () => {
      const gameState = createGameState([
        { column: 2, layer: 0, player: "light" }, // Right-front, bottom layer
        { column: 4, layer: 1, player: "light" }, // Center, middle layer
        { column: 6, layer: 2, player: "light" }, // Left-back, top layer
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });

    test("left-back to center to right-front diagonal", () => {
      const gameState = createGameState([
        { column: 6, layer: 0, player: "dark" }, // Left-back, bottom layer
        { column: 4, layer: 1, player: "dark" }, // Center, middle layer
        { column: 2, layer: 2, player: "dark" }, // Right-front, top layer
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("right-back to center to left-front diagonal", () => {
      const gameState = createGameState([
        { column: 8, layer: 0, player: "light" }, // Right-back, bottom layer
        { column: 4, layer: 1, player: "light" }, // Center, middle layer
        { column: 0, layer: 2, player: "light" }, // Left-front, top layer
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });
  });

  describe("Left Side Cross-layer Diagonals", () => {
    test("left-front to left-center to left-back diagonal (bottom to top)", () => {
      const gameState = createGameState([
        { column: 0, layer: 0, player: "dark" }, // Left-front, bottom layer
        { column: 3, layer: 1, player: "dark" }, // Left-center, middle layer
        { column: 6, layer: 2, player: "dark" }, // Left-back, top layer
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("left-front to left-center to left-back diagonal (top to bottom)", () => {
      const gameState = createGameState([
        { column: 0, layer: 2, player: "light" }, // Left-front, top layer
        { column: 3, layer: 1, player: "light" }, // Left-center, middle layer
        { column: 6, layer: 0, player: "light" }, // Left-back, bottom layer
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });
  });

  describe("Right Side Cross-layer Diagonals", () => {
    test("right-front to right-center to right-back diagonal (bottom to top)", () => {
      const gameState = createGameState([
        { column: 2, layer: 0, player: "dark" }, // Right-front, bottom layer
        { column: 5, layer: 1, player: "dark" }, // Right-center, middle layer
        { column: 8, layer: 2, player: "dark" }, // Right-back, top layer
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("right-front to right-center to right-back diagonal (top to bottom)", () => {
      const gameState = createGameState([
        { column: 2, layer: 2, player: "light" }, // Right-front, top layer
        { column: 5, layer: 1, player: "light" }, // Right-center, middle layer
        { column: 8, layer: 0, player: "light" }, // Right-back, bottom layer
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });
  });

  describe("Front Side Cross-layer Diagonals", () => {
    test("left-front to front-center to right-front diagonal (bottom to top)", () => {
      const gameState = createGameState([
        { column: 0, layer: 0, player: "dark" }, // Left-front, bottom layer
        { column: 1, layer: 1, player: "dark" }, // Front-center, middle layer
        { column: 2, layer: 2, player: "dark" }, // Right-front, top layer
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("left-front to front-center to right-front diagonal (top to bottom)", () => {
      const gameState = createGameState([
        { column: 0, layer: 2, player: "light" }, // Left-front, top layer
        { column: 1, layer: 1, player: "light" }, // Front-center, middle layer
        { column: 2, layer: 0, player: "light" }, // Right-front, bottom layer
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });
  });

  describe("Back Side Cross-layer Diagonals", () => {
    test("left-back to back-center to right-back diagonal (bottom to top)", () => {
      const gameState = createGameState([
        { column: 6, layer: 0, player: "dark" }, // Left-back, bottom layer
        { column: 7, layer: 1, player: "dark" }, // Back-center, middle layer
        { column: 8, layer: 2, player: "dark" }, // Right-back, top layer
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("left-back to back-center to right-back diagonal (top to bottom)", () => {
      const gameState = createGameState([
        { column: 6, layer: 2, player: "light" }, // Left-back, top layer
        { column: 7, layer: 1, player: "light" }, // Back-center, middle layer
        { column: 8, layer: 0, player: "light" }, // Right-back, bottom layer
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });
  });

  describe("Edge Cross-layer Diagonals", () => {
    test("front side edge cross-layer diagonal (bottom layer)", () => {
      const gameState = createGameState([
        { column: 0, layer: 0, player: "dark" }, // Left-front, bottom layer
        { column: 1, layer: 0, player: "dark" }, // Front-center, bottom layer
        { column: 2, layer: 0, player: "dark" }, // Right-front, bottom layer
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("front side edge cross-layer diagonal (middle layer)", () => {
      const gameState = createGameState([
        { column: 0, layer: 1, player: "light" }, // Left-front, middle layer
        { column: 1, layer: 1, player: "light" }, // Front-center, middle layer
        { column: 2, layer: 1, player: "light" }, // Right-front, middle layer
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });

    test("front side edge cross-layer diagonal (top layer)", () => {
      const gameState = createGameState([
        { column: 0, layer: 2, player: "dark" }, // Left-front, top layer
        { column: 1, layer: 2, player: "dark" }, // Front-center, top layer
        { column: 2, layer: 2, player: "dark" }, // Right-front, top layer
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("back side edge cross-layer diagonal (bottom layer)", () => {
      const gameState = createGameState([
        { column: 6, layer: 0, player: "light" }, // Left-back, bottom layer
        { column: 7, layer: 0, player: "light" }, // Back-center, bottom layer
        { column: 8, layer: 0, player: "light" }, // Right-back, bottom layer
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });

    test("left side edge cross-layer diagonal (bottom layer)", () => {
      const gameState = createGameState([
        { column: 0, layer: 0, player: "dark" }, // Left-front, bottom layer
        { column: 3, layer: 0, player: "dark" }, // Left-center, bottom layer
        { column: 6, layer: 0, player: "dark" }, // Left-back, bottom layer
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("dark");
    });

    test("right side edge cross-layer diagonal (top layer)", () => {
      const gameState = createGameState([
        { column: 2, layer: 2, player: "light" }, // Right-front, top layer
        { column: 5, layer: 2, player: "light" }, // Right-center, top layer
        { column: 8, layer: 2, player: "light" }, // Right-back, top layer
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(true);
      expect(result.winner).toBe("light");
    });
  });

  describe("No Cross-layer Win Conditions", () => {
    test("only two cross-layer tokens should have no win", () => {
      const gameState = createGameState([
        { column: 0, layer: 0, player: "dark" }, // Left-front, bottom layer
        { column: 4, layer: 1, player: "dark" }, // Center, middle layer
        // Missing third token
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(false);
      expect(result.winner).toBe(null);
    });

    test("different colored cross-layer tokens should have no win", () => {
      const gameState = createGameState([
        { column: 0, layer: 0, player: "dark" }, // Left-front, bottom layer
        { column: 4, layer: 1, player: "light" }, // Center, middle layer
        { column: 8, layer: 2, player: "dark" }, // Right-back, top layer
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(false);
      expect(result.winner).toBe(null);
    });

    test("scattered cross-layer tokens should have no win", () => {
      const gameState = createGameState([
        { column: 0, layer: 0, player: "light" }, // Left-front, bottom layer
        { column: 1, layer: 1, player: "light" }, // Front-center, middle layer
        { column: 7, layer: 2, player: "light" }, // Back-center, top layer (not right-front)
      ]);

      const result = GameLogic.checkWinCondition(gameState);
      expect(result.isWin).toBe(false);
      expect(result.winner).toBe(null);
    });
  });
});
