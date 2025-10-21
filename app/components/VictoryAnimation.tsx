"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { VictoryAnimationProps } from "../types/GameTypes";
import { createVictoryAnimation } from "../utils/AnimationManager";

export default function VictoryAnimation({ winner }: VictoryAnimationProps) {
  const textRef = useRef<THREE.Group>(null);
  const [animationTime, setAnimationTime] = useState(0);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    setAnimationTime(time);

    if (textRef.current) {
      const animation = createVictoryAnimation(time);

      // Rotation animation
      textRef.current.rotation.y = animation.rotation;
      // Up-down floating animation
      textRef.current.position.set(
        animation.position[0],
        4.5 + Math.sin(time * 2) * 0.5, // Float on Y=4.5 base, a bit lower
        animation.position[2]
      );
      // Scale animation
      textRef.current.scale.setScalar(animation.scale);
    }
  });

  const winnerColor = winner === "dark" ? 0x3e2723 : 0xe8d5b7; // Dark coffee and birch colors
  const winnerOpacity = winner === "dark" ? 1.0 : 0.9; // Slightly reduce birch transparency

  return (
    <group>
      {/* Victory text - simplified for clear text effect */}
      <group ref={textRef} position={[0, 12, 0.1]}>
        {/* Background halo */}
        <mesh position={[0, 0, -0.5]}>
          <ringGeometry args={[2, 3, 32]} />
          <meshBasicMaterial
            color={winnerColor}
            transparent
            opacity={0.3 * winnerOpacity}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Letter W */}
        <group position={[-1.5, 0, 0]}>
          {/* Left vertical line */}
          <mesh position={[-0.3, 0, 0]}>
            <boxGeometry args={[0.15, 1.2, 0.2]} />
            <meshBasicMaterial
              color={winnerColor}
              transparent
              opacity={winnerOpacity}
            />
          </mesh>
          {/* Left diagonal line */}
          <mesh position={[-0.1, -0.3, 0]} rotation={[0, 0, -0.4]}>
            <boxGeometry args={[0.15, 0.6, 0.2]} />
            <meshBasicMaterial
              color={winnerColor}
              transparent
              opacity={winnerOpacity}
            />
          </mesh>
          {/* Right diagonal line */}
          <mesh position={[0.1, -0.3, 0]} rotation={[0, 0, 0.4]}>
            <boxGeometry args={[0.15, 0.6, 0.2]} />
            <meshBasicMaterial
              color={winnerColor}
              transparent
              opacity={winnerOpacity}
            />
          </mesh>
          {/* Right vertical line */}
          <mesh position={[0.3, 0, 0]}>
            <boxGeometry args={[0.15, 1.2, 0.2]} />
            <meshBasicMaterial
              color={winnerColor}
              transparent
              opacity={winnerOpacity}
            />
          </mesh>
        </group>

        {/* Letter I */}
        <group position={[-0.5, 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.2, 1.2, 0.2]} />
            <meshBasicMaterial
              color={winnerColor}
              transparent
              opacity={winnerOpacity}
            />
          </mesh>
        </group>

        {/* Letter N */}
        <group position={[0.5, 0, 0]}>
          {/* Left vertical line */}
          <mesh position={[-0.3, 0, 0]}>
            <boxGeometry args={[0.15, 1.2, 0.2]} />
            <meshBasicMaterial
              color={winnerColor}
              transparent
              opacity={winnerOpacity}
            />
          </mesh>
          {/* Right vertical line */}
          <mesh position={[0.3, 0, 0]}>
            <boxGeometry args={[0.15, 1.2, 0.2]} />
            <meshBasicMaterial
              color={winnerColor}
              transparent
              opacity={winnerOpacity}
            />
          </mesh>
          {/* Middle diagonal line */}
          <mesh position={[0, 0, 0]} rotation={[0, 0, 0.4]}>
            <boxGeometry args={[0.15, 1.3, 0.2]} />
            <meshBasicMaterial
              color={winnerColor}
              transparent
              opacity={winnerOpacity}
            />
          </mesh>
        </group>

        {/* Exclamation mark ! */}
        <group position={[1.5, 0, 0]}>
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[0.2, 0.6, 0.2]} />
            <meshBasicMaterial
              color={winnerColor}
              transparent
              opacity={winnerOpacity}
            />
          </mesh>
          <mesh position={[0, -0.3, 0]}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshBasicMaterial
              color={winnerColor}
              transparent
              opacity={winnerOpacity}
            />
          </mesh>
        </group>
      </group>

      {/* Particle effects */}
      {Array.from({ length: 20 }).map((_, i) => {
        const animation = createVictoryAnimation(animationTime);
        const particlePos = animation.particles[i] || [0, 0, 0];

        return (
          <mesh
            key={i}
            position={[particlePos[0], particlePos[1], particlePos[2]]}
          >
            <sphereGeometry args={[0.1]} />
            <meshBasicMaterial color={winnerColor} transparent opacity={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}
