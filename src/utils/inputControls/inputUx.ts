import { MAX_MS, MIN_MS } from "@/constants/times";
import { SelectedInputGroup } from "@/types/storeTypes";

// use on every duration set in store
export const clampMs = (ms: number) => Math.min(MAX_MS, Math.max(MIN_MS, ms));

// cleanup form input
export const onlyDigits = (value: string) => value.replace(/\D/g, "");

export const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

export const clampField = (g: SelectedInputGroup, n: number) =>
  g === "hours" ? clamp(n, 0, 23) : clamp(n, 0, 59);
