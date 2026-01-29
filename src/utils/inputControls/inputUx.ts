import { MAX_MS, MIN_MS } from "@/constants/times";

// use on every duration set in store
export const clampMs = (ms: number) => Math.min(MAX_MS, Math.max(MIN_MS, ms));

// cleanup form input
export const onlyDigits = (value: string) => value.replace(/\D/g, "");
