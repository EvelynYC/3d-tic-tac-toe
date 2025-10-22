"use client";

import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { GameBoardProps, GameStatus } from "../types/GameTypes";
import { GameLogic, GameState, Player } from "../utils/GameLogic";
import Base from "./Base";
import Column from "./Column";
import Token from "./Token";
import VictoryAnimation from "./VictoryAnimation";

export default function GameBoard({
  onColumnClick,
  currentPlayer,
  gameState,
  onGameEnd,
}: GameBoardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
  const [previewColumn, setPreviewColumn] = useState<number | null>(null);
  const lastClickTime = useRef<number>(0);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    isGameOver: false,
    winner: null,
  });
  const [animatingTokens, setAnimatingTokens] = useState<Set<string>>(
    new Set()
  );
  const [previousGameState, setPreviousGameState] = useState<GameState>([]);
  const [showPreview, setShowPreview] = useState(true);
  const isAnimatingRef = useRef(false);
  const { camera, gl } = useThree();

  // Handle single tap (preview) and double tap (place token)
  const handleColumnInteraction = useCallback(
    (columnIndex: number) => {
      const now = Date.now();
      const timeDiff = now - lastClickTime.current;

      // Clear any existing timeout
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
        clickTimeout.current = null;
      }

      // If clicking on the same column that's being previewed, place the token
      if (previewColumn === columnIndex) {
        if (!isAnimatingRef.current) {
          onColumnClick(columnIndex);
          setPreviewColumn(null);
        }
        lastClickTime.current = now;
        return;
      }

      if (timeDiff < 300) {
        // Double tap - place token
        if (!isAnimatingRef.current) {
          onColumnClick(columnIndex);
          setPreviewColumn(null);
        }
      } else {
        // Single tap - show preview
        setPreviewColumn(columnIndex);
        clickTimeout.current = setTimeout(() => {
          setPreviewColumn(null);
          clickTimeout.current = null;
        }, 1000); // Preview for 1 second
      }

      lastClickTime.current = now;
    },
    [onColumnClick, previewColumn]
  );

  // Generate fixed angles for each token position to avoid changes during re-rendering
  const tokenRotations = useMemo(() => {
    const rotations: { [key: string]: [number, number, number] } = {};
    // Generate angles for all possible token positions
    for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
      for (let tokenIndex = 0; tokenIndex < 3; tokenIndex++) {
        const tokenId = `${columnIndex}-${tokenIndex}`;
        rotations[tokenId] = [
          0, // Keep X-axis at 0, no tilt
          (Math.random() - 0.5) * 0.4, // Y-axis rotation
          0, // Keep Z-axis at 0, no tilt
        ];
      }
    }
    return rotations;
  }, []);

  // Check win conditions
  useEffect(() => {
    if (!gameStatus.isGameOver) {
      const result = GameLogic.checkWinCondition(gameState);
      if (result.isWin && result.winner) {
        setGameStatus({ isGameOver: true, winner: result.winner });
        onGameEnd?.(result.winner);
      }
    }
  }, [gameState, gameStatus.isGameOver, onGameEnd]);

  // Clear victory state when game state is reset
  useEffect(() => {
    if (GameLogic.isGameEmpty(gameState) && gameStatus.isGameOver) {
      setGameStatus({ isGameOver: false, winner: null });
    }
  }, [gameState, gameStatus.isGameOver]);

  // Detect newly placed tokens and trigger animation
  useEffect(() => {
    // Compare current state with previous state to find newly added tokens
    gameState.forEach((column, columnIndex) => {
      const prevColumn = previousGameState[columnIndex] || [];

      // Check if new tokens have been added
      if (column.length > prevColumn.length) {
        const newTokenIndex = column.length - 1;
        const tokenId = `${columnIndex}-${newTokenIndex}`;

        // Trigger animation
        setAnimatingTokens((prev) => new Set(prev).add(tokenId));
        setShowPreview(false); // Hide preview
        isAnimatingRef.current = true; // Set animation flag

        // Remove animation flag after 1 second
        setTimeout(() => {
          setAnimatingTokens((prev) => {
            const newSet = new Set(prev);
            newSet.delete(tokenId);
            return newSet;
          });
          isAnimatingRef.current = false; // Clear animation flag
        }, 1000);
      }
    });

    // Update previous game state
    setPreviousGameState(gameState);
  }, [gameState, previousGameState]);

  // Create positions for 9 columns
  const columnPositions = useMemo(() => GameLogic.getColumnPositions(), []);

  return (
    <group ref={groupRef} position={[0, -1.5, 0]}>
      {/* Base */}
      <Base />

      {/* 9 columns */}
      {columnPositions.map(({ x, z, index }) => {
        const tokenCount = GameLogic.getTokenCount(gameState[index]);
        const isHovered = hoveredColumn === index && !isAnimatingRef.current;
        const canPlace =
          GameLogic.canPlaceToken(gameState[index], gameStatus.isGameOver) &&
          !isAnimatingRef.current;

        return (
          <group key={index}>
            {/* Column */}
            <Column
              position={[x, 2.1, z]}
              onPointerOver={(e) => {
                // Stop event propagation to ensure only the topmost column responds
                e.stopPropagation();
                // Only update hover state when there's no animation
                if (!isAnimatingRef.current) {
                  setHoveredColumn(index);
                  setShowPreview(true);
                  // Set pointer cursor
                  document.body.style.cursor = "pointer";
                }
              }}
              onPointerOut={(e) => {
                // Stop event propagation
                e.stopPropagation();
                // Only clear hover state when there's no animation
                if (!isAnimatingRef.current) {
                  setHoveredColumn(null);
                  // Restore default cursor
                  document.body.style.cursor = "default";
                }
              }}
              onClick={(e) => {
                // Stop event propagation to ensure only the topmost column responds
                e.stopPropagation();
                handleColumnInteraction(index);
              }}
              onPointerDown={(e) => {
                // Handle touch events for mobile
                e.stopPropagation();
                handleColumnInteraction(index);
              }}
            />

            {/* Placed tokens */}
            {gameState[index].map((token, tokenIndex) => {
              if (!token) return null;
              const tokenY = 0 + 4.0 / 3 / 2 + tokenIndex * (4.0 / 3);
              const tokenId = `${index}-${tokenIndex}`;
              const shouldAnimate = animatingTokens.has(tokenId);

              return (
                <Token
                  key={tokenIndex}
                  position={[x, tokenY, z]}
                  color={token as Player}
                  animate={shouldAnimate}
                  tokenId={tokenId}
                  finalRotation={tokenRotations[tokenId]}
                />
              );
            })}

            {/* Preview next token */}
            {isHovered &&
              canPlace &&
              showPreview &&
              animatingTokens.size === 0 && (
                <Token
                  position={[x, 0 + 4.0 / 3 / 2 + tokenCount * (4.0 / 3), z]}
                  color={currentPlayer}
                  isPreview={true}
                  finalRotation={[0, 0, 0]}
                />
              )}

            {/* Preview token for single tap */}
            {previewColumn === index && canPlace && (
              <Token
                position={[x, 0 + 4.0 / 3 / 2 + tokenCount * (4.0 / 3), z]}
                color={currentPlayer}
                isPreview={true}
                finalRotation={[0, 0, 0]}
                opacity={0.7}
              />
            )}
          </group>
        );
      })}

      {/* Victory animation */}
      {gameStatus.isGameOver && gameStatus.winner && (
        <VictoryAnimation winner={gameStatus.winner} />
      )}
    </group>
  );
}
