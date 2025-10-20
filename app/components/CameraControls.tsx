"use client";

import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";

export default function CameraControls() {
  const { camera, gl } = useThree();
  const isMouseDown = useRef(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      isMouseDown.current = true;
      mousePosition.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isMouseDown.current) return;

      const deltaX = event.clientX - mousePosition.current.x;
      const deltaY = event.clientY - mousePosition.current.y;

      targetRotation.current.y += deltaX * 0.01;
      targetRotation.current.x += deltaY * 0.01;

      // Limit vertical rotation angle
      targetRotation.current.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, targetRotation.current.x)
      );

      mousePosition.current = { x: event.clientX, y: event.clientY };
    };

    const handleWheel = (event: WheelEvent) => {
      const distance = camera.position.length();
      const newDistance = Math.max(
        3,
        Math.min(15, distance + event.deltaY * 0.01)
      );
      camera.position.normalize().multiplyScalar(newDistance);
      camera.lookAt(0, 0, 0);
    };

    gl.domElement.addEventListener("mousedown", handleMouseDown);
    gl.domElement.addEventListener("mouseup", handleMouseUp);
    gl.domElement.addEventListener("mousemove", handleMouseMove);
    gl.domElement.addEventListener("wheel", handleWheel);

    return () => {
      gl.domElement.removeEventListener("mousedown", handleMouseDown);
      gl.domElement.removeEventListener("mouseup", handleMouseUp);
      gl.domElement.removeEventListener("mousemove", handleMouseMove);
      gl.domElement.removeEventListener("wheel", handleWheel);
    };
  }, [camera, gl]);

  useFrame(() => {
    // Smooth rotation
    currentRotation.current.x +=
      (targetRotation.current.x - currentRotation.current.x) * 0.1;
    currentRotation.current.y +=
      (targetRotation.current.y - currentRotation.current.y) * 0.1;

    const distance = camera.position.length();
    camera.position.x =
      Math.cos(currentRotation.current.y) *
      Math.cos(currentRotation.current.x) *
      distance;
    camera.position.y = Math.sin(currentRotation.current.x) * distance;
    camera.position.z =
      Math.sin(currentRotation.current.y) *
      Math.cos(currentRotation.current.x) *
      distance;
    camera.lookAt(0, 0, 0);
  });

  return null;
}
