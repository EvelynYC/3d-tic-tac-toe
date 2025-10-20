"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import GameBoard from "./GameBoard";
import CameraControls from "./CameraControls";
import { Player, GameState } from "../utils/GameLogic";

interface SceneProps {
  onColumnClick: (columnIndex: number) => void;
  currentPlayer: Player;
  gameState: GameState;
  onGameEnd?: (winner: Player) => void;
}

export default function Scene({
  onColumnClick,
  currentPlayer,
  gameState,
  onGameEnd,
}: SceneProps) {
  return (
    <Canvas
      camera={{ position: [5, 5, 5], fov: 60 }}
      style={{
        background: "linear-gradient(135deg, #fefefe 0%, #f5f5dc 100%)",
      }}
    >
      <Suspense fallback={null}>
        {/* Lighting setup */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={0.6} />
        <pointLight position={[0, 8, 0]} intensity={0.4} />

        {/* Game board */}
        <GameBoard
          onColumnClick={onColumnClick}
          currentPlayer={currentPlayer}
          gameState={gameState}
          onGameEnd={onGameEnd}
        />

        {/* Camera controls */}
        <CameraControls />
      </Suspense>
    </Canvas>
  );
}
