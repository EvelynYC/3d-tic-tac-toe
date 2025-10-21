export interface TokenAnimationConfig {
  duration: number;
  startHeight: number;
  swayAmplitude: number;
  swayFrequency: number;
  rotationSpeed: number;
}

export interface VictoryAnimationConfig {
  rotationSpeed: number;
  floatAmplitude: number;
  floatFrequency: number;
  scaleAmplitude: number;
  scaleFrequency: number;
  particleCount: number;
}

const TOKEN_CONFIG: TokenAnimationConfig = {
  duration: 1.0,
  startHeight: 3,
  swayAmplitude: 0.05,
  swayFrequency: 8,
  rotationSpeed: 2,
} as const;

const VICTORY_CONFIG: VictoryAnimationConfig = {
  rotationSpeed: 0.5,
  floatAmplitude: 0.3,
  floatFrequency: 2,
  scaleAmplitude: 0.1,
  scaleFrequency: 3,
  particleCount: 20,
} as const;

export const easeOutBounce = (t: number): number => {
  if (t < 1 / 2.75) {
    return 7.5625 * t * t;
  } else if (t < 2 / 2.75) {
    return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
  } else if (t < 2.5 / 2.75) {
    return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
  } else {
    return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  }
};

export const createTokenAnimation = (
  startPosition: [number, number, number],
  endPosition: [number, number, number],
  elapsedTime: number,
  finalRotation: [number, number, number]
): {
  position: [number, number, number];
  rotation: [number, number, number];
  isComplete: boolean;
} => {
  const { duration, startHeight, swayAmplitude, swayFrequency, rotationSpeed } =
    TOKEN_CONFIG;

  if (elapsedTime >= duration) {
    return {
      position: endPosition,
      rotation: finalRotation,
      isComplete: true,
    };
  }

  const progress = elapsedTime / duration;
  const easedProgress = easeOutBounce(progress);

  // Calculate current position
  const currentY =
    startPosition[1] + (endPosition[1] - startPosition[1]) * easedProgress;

  // Add subtle left-right sway effect
  const sway =
    Math.sin(elapsedTime * swayFrequency) * swayAmplitude * (1 - progress);

  const position: [number, number, number] = [
    endPosition[0] + sway,
    currentY,
    endPosition[2],
  ];

  // Calculate rotation
  const animationRotationY = elapsedTime * rotationSpeed;
  const animationRotationX = Math.sin(elapsedTime * 4) * 0.1 * (1 - progress);

  // Use easing function to transition from animation rotation to final angle
  const rotationProgress = Math.min(progress * 2, 1);
  const rotation: [number, number, number] = [
    animationRotationX * (1 - rotationProgress) +
      finalRotation[0] * rotationProgress,
    animationRotationY * (1 - rotationProgress) +
      finalRotation[1] * rotationProgress,
    finalRotation[2] * rotationProgress,
  ];

  return {
    position,
    rotation,
    isComplete: false,
  };
};

export const createVictoryAnimation = (
  time: number,
  config: Partial<VictoryAnimationConfig> = {}
): {
  rotation: number;
  position: [number, number, number];
  scale: number;
  particles: Array<[number, number, number]>;
} => {
  const finalConfig = { ...VICTORY_CONFIG, ...config };
  const {
    rotationSpeed,
    floatAmplitude,
    floatFrequency,
    scaleAmplitude,
    scaleFrequency,
    particleCount,
  } = finalConfig;

  return {
    rotation: time * rotationSpeed,
    position: [0, 4 + Math.sin(time * floatFrequency) * floatAmplitude, 0],
    scale: 1 + Math.sin(time * scaleFrequency) * scaleAmplitude,
    particles: generateParticles(time, particleCount),
  };
};

const generateParticles = (
  time: number,
  count: number
): Array<[number, number, number]> => {
  const particles: Array<[number, number, number]> = [];

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + time;
    const radius = 4;
    particles.push([
      Math.cos(angle) * radius,
      4 + Math.sin(time * 2 + i) * 0.5,
      Math.sin(angle) * radius,
    ]);
  }

  return particles;
};
