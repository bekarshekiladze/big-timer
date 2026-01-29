import { MAX_MS, MIN_MS } from "@/constants/times";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

// on every duration set in store
export function clampMs(ms: number, min = MIN_MS, max = MAX_MS) {
  return Math.min(max, Math.max(min, ms));
}

export function getIncrementStepMs(durationMs: number): number {
  const t = Math.max(0, durationMs);

  let stepMs: number;

  if (t <= 5 * SECOND) stepMs = 1 * SECOND;
  else if (t <= 1 * MINUTE) stepMs = 5 * SECOND;
  else if (t <= 5 * MINUTE) stepMs = 1 * MINUTE;
  else if (t <= 20 * MINUTE) stepMs = 1 * MINUTE;
  else if (t <= 1 * HOUR) stepMs = 5 * MINUTE;
  else stepMs = 15 * MINUTE;

  return stepMs;
}

export function snapDown(currentMs: number, stepMs: number) {
  const t = Math.max(0, currentMs);
  const step = Math.max(1, stepMs);

  const adJusted = t % step === 0 ? Math.max(0, t - 1) : t;

  return Math.floor(adJusted / step) * step;
}

export function getDecrementStepMs(durationMs: number): number {
  const t = Math.max(0, durationMs);

  let stepMs: number;

  if (t >= 1 * HOUR) stepMs = 15 * MINUTE;
  else if (t >= 1 * MINUTE) stepMs = 1 * MINUTE;
  else stepMs = 1 * SECOND;

  return stepMs;
}

export function snapUp(currentMs: number, stepMs: number) {
  const t = Math.max(0, currentMs);
  const step = Math.max(1, stepMs);

  const adjusted = t % step === 0 ? t + 1 : t;

  return Math.ceil(adjusted / step) * step;
}

// for increase decrease buttons only
export function getNextIncrementMs(currentDurationMs: number) {
  const step = getIncrementStepMs(currentDurationMs);
  return clampMs(snapUp(currentDurationMs, step));
}

export function getNextDecrementMs(currentMs: number) {
  const step = getDecrementStepMs(currentMs);
  return clampMs(snapDown(currentMs, step));
}
