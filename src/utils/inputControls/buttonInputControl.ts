import { MAX_MS, MIN_MS } from "@/constants/times";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

// on every duration set in store
export function clampMs(ms: number, min = MIN_MS, max = MAX_MS) {
  return Math.min(max, Math.max(min, ms));
}

// two-way
export function getIncrementStepMs(t: number) {
  t = Math.max(0, t);

  if (t < 5 * SECOND) return 1 * SECOND;
  if (t < 1 * MINUTE) return 5 * SECOND;
  if (t < 20 * MINUTE) return 1 * MINUTE;
  if (t < 1 * HOUR) return 5 * MINUTE;

  return 15 * MINUTE;
}

export function getDecrementStepMs(t: number) {
  t = Math.max(0, t);

  if (t <= 5 * SECOND) return 1 * SECOND;
  if (t <= 1 * MINUTE) return 5 * SECOND;
  if (t <= 20 * MINUTE) return 1 * MINUTE;
  if (t <= 1 * HOUR) return 5 * MINUTE;

  return 15 * MINUTE;
}

export function snapDown(currentMs: number, stepMs: number) {
  const t = Math.max(0, currentMs);
  const step = Math.max(1, stepMs);
  const adjusted = t % step === 0 ? Math.max(0, t - 1) : t; // force decrease at boundaries
  return Math.floor(adjusted / step) * step;
}

export function snapUp(currentMs: number, stepMs: number) {
  const t = Math.max(0, currentMs);
  const step = Math.max(1, stepMs);
  const adjusted = t % step === 0 ? t + 1 : t; // force progress at boundaries
  return Math.ceil(adjusted / step) * step;
}

// for increase decrease buttons only
export function getNextIncrementMs(currentMs: number) {
  const step = getIncrementStepMs(currentMs);
  return clampMs(snapUp(currentMs, step));
}

export function getNextDecrementMs(currentMs: number) {
  const step = getDecrementStepMs(currentMs);
  return clampMs(snapDown(currentMs, step));
}
