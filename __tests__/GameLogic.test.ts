import { GameLogic, GameState, Player } from "../app/utils/GameLogic";

describe("GameLogic", () => {
  describe("checkWinCondition", () => {
    // Helper function: create empty game state
    const createEmptyGameState = (): GameState => {
      return Array(9)
        .fill(null)
        .map(() => []);
    };

    // Helper function: create game state
    const createGameState = (
      tokens: Array<{ column: number; layer: number; player: Player }>
    ): GameState => {
      const gameState = createEmptyGameState();
      tokens.forEach(({ column, layer, player }) => {
        if (!gameState[column]) {
          gameState[column] = [];
        }
        // Ensure sufficient layers
        while (gameState[column].length <= layer) {
          gameState[column].push(null);
        }
        gameState[column][layer] = player;
      });
      return gameState;
    };

    describe("Plane Line Detection", () => {
      test("should detect bottom layer horizontal line", () => {
        const gameState = createGameState([
          { column: 0, layer: 0, player: "dark" },
          { column: 1, layer: 0, player: "dark" },
          { column: 2, layer: 0, player: "dark" },
        ]);

        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(true);
        expect(result.winner).toBe("dark");
      });

      test("should detect middle layer horizontal line", () => {
        const gameState = createGameState([
          { column: 3, layer: 1, player: "light" },
          { column: 4, layer: 1, player: "light" },
          { column: 5, layer: 1, player: "light" },
        ]);

        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(true);
        expect(result.winner).toBe("light");
      });

      test("should detect top layer horizontal line", () => {
        const gameState = createGameState([
          { column: 6, layer: 2, player: "dark" },
          { column: 7, layer: 2, player: "dark" },
          { column: 8, layer: 2, player: "dark" },
        ]);

        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(true);
        expect(result.winner).toBe("dark");
      });
    });

    describe("Vertical Line Detection", () => {
      test("should detect vertical line", () => {
        const gameState = createGameState([
          { column: 0, layer: 0, player: "light" },
          { column: 0, layer: 1, player: "light" },
          { column: 0, layer: 2, player: "light" },
        ]);

        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(true);
        expect(result.winner).toBe("light");
      });

      test("should detect center column vertical line", () => {
        const gameState = createGameState([
          { column: 4, layer: 0, player: "dark" },
          { column: 4, layer: 1, player: "dark" },
          { column: 4, layer: 2, player: "dark" },
        ]);

        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(true);
        expect(result.winner).toBe("dark");
      });
    });

    describe("Plane Column Detection", () => {
      test("should detect bottom layer column vertical line", () => {
        const gameState = createGameState([
          { column: 0, layer: 0, player: "dark" },
          { column: 3, layer: 0, player: "dark" },
          { column: 6, layer: 0, player: "dark" },
        ]);

        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(true);
        expect(result.winner).toBe("dark");
      });

      test("should detect middle layer column vertical line", () => {
        const gameState = createGameState([
          { column: 1, layer: 1, player: "light" },
          { column: 4, layer: 1, player: "light" },
          { column: 7, layer: 1, player: "light" },
        ]);

        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(true);
        expect(result.winner).toBe("light");
      });

      test("should detect top layer column vertical line", () => {
        const gameState = createGameState([
          { column: 2, layer: 2, player: "dark" },
          { column: 5, layer: 2, player: "dark" },
          { column: 8, layer: 2, player: "dark" },
        ]);

        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(true);
        expect(result.winner).toBe("dark");
      });
    });

    describe("Plane Diagonal Detection", () => {
      test("should detect bottom layer main diagonal", () => {
        const gameState = createGameState([
          { column: 0, layer: 0, player: "light" },
          { column: 4, layer: 0, player: "light" },
          { column: 8, layer: 0, player: "light" },
        ]);

        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(true);
        expect(result.winner).toBe("light");
      });

      test("should detect bottom layer anti-diagonal", () => {
        const gameState = createGameState([
          { column: 2, layer: 0, player: "dark" },
          { column: 4, layer: 0, player: "dark" },
          { column: 6, layer: 0, player: "dark" },
        ]);

        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(true);
        expect(result.winner).toBe("dark");
      });

      test("should detect top layer diagonal", () => {
        const gameState = createGameState([
          { column: 0, layer: 2, player: "light" },
          { column: 4, layer: 2, player: "light" },
          { column: 8, layer: 2, player: "light" },
        ]);

        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(true);
        expect(result.winner).toBe("light");
      });
    });

    describe("3D Diagonal Detection", () => {
      test("should detect center cross-layer diagonal", () => {
        const gameState = createGameState([
          { column: 0, layer: 0, player: "dark" },
          { column: 4, layer: 1, player: "dark" },
          { column: 8, layer: 2, player: "dark" },
        ]);

        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(true);
        expect(result.winner).toBe("dark");
      });

      test("should detect left side cross-layer diagonal", () => {
        const gameState = createGameState([
          { column: 0, layer: 0, player: "light" },
          { column: 3, layer: 1, player: "light" },
          { column: 6, layer: 2, player: "light" },
        ]);

        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(true);
        expect(result.winner).toBe("light");
      });

      test("should detect right side cross-layer diagonal", () => {
        const gameState = createGameState([
          { column: 2, layer: 0, player: "dark" },
          { column: 5, layer: 1, player: "dark" },
          { column: 8, layer: 2, player: "dark" },
        ]);

        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(true);
        expect(result.winner).toBe("dark");
      });

      test("should detect front side cross-layer diagonal", () => {
        const gameState = createGameState([
          { column: 0, layer: 0, player: "light" },
          { column: 1, layer: 1, player: "light" },
          { column: 2, layer: 2, player: "light" },
        ]);

        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(true);
        expect(result.winner).toBe("light");
      });

      test("should detect back side cross-layer diagonal", () => {
        const gameState = createGameState([
          { column: 6, layer: 0, player: "dark" },
          { column: 7, layer: 1, player: "dark" },
          { column: 8, layer: 2, player: "dark" },
        ]);

        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(true);
        expect(result.winner).toBe("dark");
      });

      test("should detect edge cross-layer diagonal", () => {
        const gameState = createGameState([
          { column: 0, layer: 0, player: "light" },
          { column: 1, layer: 0, player: "light" },
          { column: 2, layer: 0, player: "light" },
        ]);

        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(true);
        expect(result.winner).toBe("light");
      });
    });

    describe("No Win Conditions", () => {
      test("empty game state should have no win", () => {
        const gameState = createEmptyGameState();
        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(false);
        expect(result.winner).toBe(null);
      });

      test("only two same tokens should have no win", () => {
        const gameState = createGameState([
          { column: 0, layer: 0, player: "dark" },
          { column: 1, layer: 0, player: "dark" },
        ]);

        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(false);
        expect(result.winner).toBe(null);
      });

      test("different colored three tokens should have no win", () => {
        const gameState = createGameState([
          { column: 0, layer: 0, player: "dark" },
          { column: 1, layer: 0, player: "light" },
          { column: 2, layer: 0, player: "dark" },
        ]);

        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(false);
        expect(result.winner).toBe(null);
      });

      test("scattered three same tokens should have no win", () => {
        const gameState = createGameState([
          { column: 0, layer: 0, player: "light" },
          { column: 3, layer: 1, player: "light" },
          { column: 7, layer: 2, player: "light" },
        ]);

        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(false);
        expect(result.winner).toBe(null);
      });
    });

    describe("No Cross-layer Win Conditions", () => {
      test("only two cross-layer tokens should have no win", () => {
        const gameState = createGameState([
          { column: 0, layer: 0, player: "dark" },
          { column: 4, layer: 1, player: "dark" },
          // Missing third token
        ]);

        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(false);
        expect(result.winner).toBe(null);
      });

      test("different colored cross-layer tokens should have no win", () => {
        const gameState = createGameState([
          { column: 0, layer: 0, player: "dark" },
          { column: 4, layer: 1, player: "light" },
          { column: 8, layer: 2, player: "dark" },
        ]);

        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(false);
        expect(result.winner).toBe(null);
      });

      test("scattered cross-layer tokens should have no win", () => {
        const gameState = createGameState([
          { column: 0, layer: 0, player: "light" },
          { column: 1, layer: 1, player: "light" },
          { column: 7, layer: 2, player: "light" },
        ]);

        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(false);
        expect(result.winner).toBe(null);
      });
    });

    describe("Edge Cases", () => {
      test("should handle empty game state", () => {
        const gameState: GameState = [];
        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(false);
        expect(result.winner).toBe(null);
      });

      test("should handle empty column", () => {
        const gameState = createEmptyGameState();
        gameState[0] = [];
        const result = GameLogic.checkWinCondition(gameState);
        expect(result.isWin).toBe(false);
        expect(result.winner).toBe(null);
      });
    });
  });

  describe("Other Methods", () => {
    test("canPlaceToken should correctly determine if token can be placed", () => {
      const column: (Player | null)[] = ["dark", "light"];
      expect(GameLogic.canPlaceToken(column, false)).toBe(true);
      expect(GameLogic.canPlaceToken(column, true)).toBe(false);

      const fullColumn: (Player | null)[] = ["dark", "light", "dark"];
      expect(GameLogic.canPlaceToken(fullColumn, false)).toBe(false);
    });

    test("isColumnFull should correctly determine if column is full", () => {
      const column: (Player | null)[] = ["dark", "light", "dark"];
      expect(GameLogic.isColumnFull(column)).toBe(true);

      const notFullColumn: (Player | null)[] = ["dark", "light"];
      expect(GameLogic.isColumnFull(notFullColumn)).toBe(false);
    });

    test("isGameEmpty should correctly determine if game is empty", () => {
      const emptyGameState = Array(9)
        .fill(null)
        .map(() => []);
      expect(GameLogic.isGameEmpty(emptyGameState)).toBe(true);

      const nonEmptyGameState: GameState = Array(9)
        .fill(null)
        .map(() => []);
      nonEmptyGameState[0] = ["dark"];
      expect(GameLogic.isGameEmpty(nonEmptyGameState)).toBe(false);
    });

    test("getTokenCount should correctly count tokens in column", () => {
      const emptyColumn: (Player | null)[] = [];
      expect(GameLogic.getTokenCount(emptyColumn)).toBe(0);

      const columnWithTokens: (Player | null)[] = ["dark", "light", "dark"];
      expect(GameLogic.getTokenCount(columnWithTokens)).toBe(3);

      const columnWithNulls: (Player | null)[] = ["dark", null, "light"];
      expect(GameLogic.getTokenCount(columnWithNulls)).toBe(2);
    });

    test("getColumnPositions should return correct 9 positions", () => {
      const positions = GameLogic.getColumnPositions();

      expect(positions).toHaveLength(9);

      // Check if positions are correct
      expect(positions[0]).toEqual({ x: -2, z: -2, index: 0 }); // Top-left
      expect(positions[1]).toEqual({ x: 0, z: -2, index: 1 }); // Top-center
      expect(positions[2]).toEqual({ x: 2, z: -2, index: 2 }); // Top-right
      expect(positions[3]).toEqual({ x: -2, z: 0, index: 3 }); // Middle-left
      expect(positions[4]).toEqual({ x: 0, z: 0, index: 4 }); // Center
      expect(positions[5]).toEqual({ x: 2, z: 0, index: 5 }); // Middle-right
      expect(positions[6]).toEqual({ x: -2, z: 2, index: 6 }); // Bottom-left
      expect(positions[7]).toEqual({ x: 0, z: 2, index: 7 }); // Bottom-center
      expect(positions[8]).toEqual({ x: 2, z: 2, index: 8 }); // Bottom-right
    });
  });
});
