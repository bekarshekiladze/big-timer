import { MAX_SECONDS } from "@/constants/times";

export function secondsToHMS(totalSeconds: number): {
  hours: number;
  minutes: number;
  seconds: number;
} | null {
  if (
    !Number.isInteger(totalSeconds) ||
    totalSeconds < 0 ||
    totalSeconds > MAX_SECONDS
  ) {
    return null;
  }
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
}

export function hmsToSeconds(
  hours: number,
  minutes: number,
  seconds: number,
): number | null {
  if (
    !Number.isInteger(hours) ||
    !Number.isInteger(minutes) ||
    !Number.isInteger(seconds)
  ) {
    return null;
  }
  if (
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59 ||
    seconds < 0 ||
    seconds > 59
  ) {
    return null;
  }

  const total = hours * 3600 + minutes * 60 + seconds;

  if (total > MAX_SECONDS) return null;

  return total;
}
