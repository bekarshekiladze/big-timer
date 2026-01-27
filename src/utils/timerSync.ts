import { DEFAULT_DURATION, STORAGE_KEY } from "@/constants/times";
import { hmsToSeconds, secondsToHMS } from "./timeConversions";

export function buildTimerSearchParams(
  hours: number,
  minutes: number,
  seconds: number,
): URLSearchParams {
  const params = new URLSearchParams();
  if (hours > 0 && hours < 24) params.set("hours", String(hours));
  if (minutes > 0 && minutes < 60) params.set("minutes", String(minutes));
  if (seconds > 0) params.set("seconds", String(seconds));

  params.set("repeat", "false");

  return params;
}

export function getResolvedDuration(): number {
  // storage first
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored !== null) {
    return Number(stored);
  }

  // url later
  const search = new URLSearchParams(window.location.search);

  const h = Number(search.get("hours") ?? 0);
  const m = Number(search.get("minutes") ?? 0);
  const s = Number(search.get("seconds") ?? 0);
  const fromUrl = hmsToSeconds(h, m, s);

  if (fromUrl !== null && fromUrl > 0) return fromUrl;

  // fallback to default duration
  return DEFAULT_DURATION;
}
