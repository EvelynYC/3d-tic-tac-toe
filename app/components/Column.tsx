"use client";

import { useMemo } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { MaterialFactory } from "../utils/MaterialFactory";

interface ColumnProps {
  position: [number, number, number];
  onPointerOver: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut: (e: ThreeEvent<PointerEvent>) => void;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
}

export default function Column({
  position,
  onPointerOver,
  onPointerOut,
  onClick,
}: ColumnProps) {
  const material = useMemo(() => {
    return MaterialFactory.createColumnMaterial();
  }, []);

  return (
    <mesh
      position={position}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
    >
      <cylinderGeometry args={[0.15, 0.15, 4.2, 16, 8]} />
      <primitive object={material} />
    </mesh>
  );
}
