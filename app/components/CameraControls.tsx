"use client";

import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";

export default function CameraControls() {
  const { camera, gl } = useThree();
  const isMouseDown = useRef(false);
  const isTouchDown = useRef(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const touchPosition = useRef<{
    x: number;
    y: number;
    initialDistance?: number;
    initialCameraDistance?: number;
  }>({ x: 0, y: 0 });
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

    // Touch event handlers for mobile devices
    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      if (event.touches.length === 1) {
        isTouchDown.current = true;
        touchPosition.current.x = event.touches[0].clientX;
        touchPosition.current.y = event.touches[0].clientY;
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      event.preventDefault();
      isTouchDown.current = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      if (!isTouchDown.current || event.touches.length !== 1) return;

      const deltaX = event.touches[0].clientX - touchPosition.current.x;
      const deltaY = event.touches[0].clientY - touchPosition.current.y;

      targetRotation.current.y += deltaX * 0.01;
      targetRotation.current.x += deltaY * 0.01;

      // Limit vertical rotation angle
      targetRotation.current.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, targetRotation.current.x)
      );

      touchPosition.current.x = event.touches[0].clientX;
      touchPosition.current.y = event.touches[0].clientY;
    };

    // Pinch to zoom for mobile
    const handleTouchStartMulti = (event: TouchEvent) => {
      if (event.touches.length === 2) {
        event.preventDefault();
      }
    };

    const handleTouchMoveMulti = (event: TouchEvent) => {
      if (event.touches.length === 2) {
        event.preventDefault();
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const distance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
            Math.pow(touch2.clientY - touch1.clientY, 2)
        );

        // Store initial distance for comparison
        if (!touchPosition.current.initialDistance) {
          touchPosition.current.initialDistance = distance;
          touchPosition.current.initialCameraDistance =
            camera.position.length();
        } else {
          const scale = distance / touchPosition.current.initialDistance;
          const newDistance = Math.max(
            3,
            Math.min(
              15,
              (touchPosition.current.initialCameraDistance || 8) / scale
            )
          );
          camera.position.normalize().multiplyScalar(newDistance);
          camera.lookAt(0, 0, 0);
        }
      }
    };

    const handleTouchEndMulti = (event: TouchEvent) => {
      if (event.touches.length < 2) {
        touchPosition.current.initialDistance = undefined;
        touchPosition.current.initialCameraDistance = undefined;
      }
    };

    gl.domElement.addEventListener("mousedown", handleMouseDown);
    gl.domElement.addEventListener("mouseup", handleMouseUp);
    gl.domElement.addEventListener("mousemove", handleMouseMove);
    gl.domElement.addEventListener("wheel", handleWheel);

    // Add touch event listeners for mobile support
    gl.domElement.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    gl.domElement.addEventListener("touchend", handleTouchEnd, {
      passive: false,
    });
    gl.domElement.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    gl.domElement.addEventListener("touchstart", handleTouchStartMulti, {
      passive: false,
    });
    gl.domElement.addEventListener("touchmove", handleTouchMoveMulti, {
      passive: false,
    });
    gl.domElement.addEventListener("touchend", handleTouchEndMulti, {
      passive: false,
    });

    return () => {
      gl.domElement.removeEventListener("mousedown", handleMouseDown);
      gl.domElement.removeEventListener("mouseup", handleMouseUp);
      gl.domElement.removeEventListener("mousemove", handleMouseMove);
      gl.domElement.removeEventListener("wheel", handleWheel);

      // Remove touch event listeners
      gl.domElement.removeEventListener("touchstart", handleTouchStart);
      gl.domElement.removeEventListener("touchend", handleTouchEnd);
      gl.domElement.removeEventListener("touchmove", handleTouchMove);
      gl.domElement.removeEventListener("touchstart", handleTouchStartMulti);
      gl.domElement.removeEventListener("touchmove", handleTouchMoveMulti);
      gl.domElement.removeEventListener("touchend", handleTouchEndMulti);
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
