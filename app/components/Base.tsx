"use client";

import { useMemo } from "react";
import { MaterialFactory } from "../utils/MaterialFactory";

export default function Base() {
  const material = useMemo(() => {
    return MaterialFactory.createBaseMaterial();
  }, []);

  return (
    <mesh position={[0, -0.2, 0]}>
      <boxGeometry args={[6.5, 0.4, 6.5, 8, 2, 8]} />
      <primitive object={material} />
    </mesh>
  );
}
