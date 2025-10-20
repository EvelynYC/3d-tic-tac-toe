"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TokenProps } from "../types/GameTypes";
import { MaterialFactory } from "../utils/MaterialFactory";
import { AnimationManager } from "../utils/AnimationManager";

export default function Token({
  position,
  color,
  scale = 1,
  animate = false,
  isPreview = false,
  tokenId,
  finalRotation = [0, 0, 0],
}: TokenProps & { finalRotation?: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const animationStartTimeRef = useRef<number | null>(null);
  const [startPosition] = useState<[number, number, number]>([
    position[0],
    position[1] + 3,
    position[2],
  ]);

  // Column height is 4.0, so each token height should be 4.0/3 ≈ 1.33, all tokens are the same height
  const tokenHeight = 4.0 / 3;

  // Use the passed predefined angles

  // Animation effects
  useFrame((state) => {
    if (animate && meshRef.current) {
      const currentTime = state.clock.getElapsedTime();

      // Set animation start time
      if (animationStartTimeRef.current === null) {
        animationStartTimeRef.current = currentTime;
        return;
      }

      const elapsedTime = currentTime - animationStartTimeRef.current;
      const animationResult = AnimationManager.createTokenAnimation(
        startPosition,
        position,
        elapsedTime,
        finalRotation
      );

      meshRef.current.position.set(
        animationResult.position[0],
        animationResult.position[1],
        animationResult.position[2]
      );

      meshRef.current.rotation.set(
        animationResult.rotation[0],
        animationResult.rotation[1],
        animationResult.rotation[2]
      );
    } else if (!animate) {
      // Reset animation state
      animationStartTimeRef.current = null;
    }
  });

  // Select material - use useMemo to ensure material is created only once
  const material = useMemo(() => {
    if (isPreview) {
      return color === "dark"
        ? MaterialFactory.createPreviewMaterial("walnut")
        : MaterialFactory.createPreviewMaterial("birch");
    }
    return color === "dark"
      ? MaterialFactory.createTokenMaterial("walnut")
      : MaterialFactory.createTokenMaterial("birch");
  }, [color, isPreview]);

  return (
    <mesh
      ref={meshRef}
      position={animate ? startPosition : position}
      rotation={
        animate
          ? [0, 0, 0]
          : [finalRotation[0], finalRotation[1], finalRotation[2]]
      }
    >
      <boxGeometry args={[1.2 * scale, tokenHeight, 1.2 * scale, 16, 16, 16]} />
      <primitive object={material} />
    </mesh>
  );
}
