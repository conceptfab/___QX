import type { Transition } from 'framer-motion';

export const CATALOG_MOTION_MULTIPLIER = 2;

const TIMING_KEYS = new Set([
  'duration',
  'delay',
  'repeatDelay',
  'delayChildren',
  'staggerChildren',
]);

type MotionTimingConfig = Transition | Record<string, unknown> | undefined;

export function scaleMotionValue(value: number): number {
  return value * CATALOG_MOTION_MULTIPLIER;
}

export function slowTransition<T extends MotionTimingConfig>(transition: T): T {
  if (!transition || typeof transition !== 'object' || Array.isArray(transition)) {
    return transition;
  }

  const scaled = Object.entries(transition).reduce<Record<string, unknown>>(
    (result, [key, value]) => {
      if (typeof value === 'number' && TIMING_KEYS.has(key)) {
        result[key] = scaleMotionValue(value);
        return result;
      }

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        result[key] = slowTransition(value as Record<string, unknown>);
        return result;
      }

      result[key] = value;
      return result;
    },
    {},
  );

  return scaled as T;
}
