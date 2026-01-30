// @ts-nochec
import {
  DEFAULT_DURATION,
  STORAGE_KEY_DURATION,
  STORAGE_KEY_TARGET,
} from "@/constants/times";
import { hmsToMs, msToHMS } from "../utils/timeConversions";

// **********
// URL Section
// **********

// add pair of param
export function addNewSearchParam(key: string, value: string) {
  const params = new URLSearchParams(window.location.search);

  params.set(key, value);

  const url = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, "", url);
}
// remove pair of param
export function removeSearchParam(key: string) {
  const params = new URLSearchParams(window.location.search);

  params.delete(key);

  const query = params.toString();
  const url = query
    ? `${window.location.pathname}?${query}`
    : window.location.pathname;

  window.history.replaceState(null, "", url);
}

// create URLSearchParams from ms
export function buildTimerSearchParamsFromMs(ms: number): URLSearchParams {
  const { hours, minutes, seconds } = msToHMS(ms);

  const params = new URLSearchParams();

  if (hours > 0) params.set("hours", String(hours));
  if (minutes > 0) params.set("minutes", String(minutes));
  if (seconds > 0) params.set("seconds", String(seconds));

  params.set("repeat", "false");
  return params;
}

// save URLSearchParams to url
export function writeSearchParams(
  params: URLSearchParams,
  mode: "replace" | "push" = "replace",
) {
  const url = `${window.location.pathname}?${params.toString()}`;
  if (mode === "replace") window.history.replaceState(null, "", url);
  else window.history.pushState(null, "", url);
}

// **********
// LocalStorage
// **********

// **********
// URL & LocalStorage
// **********

export function updateTargetTime(isRunning, targetTime) {
  if (isRunning) {
    localStorage.setItem(STORAGE_KEY_TARGET, targetTime);
    addNewSearchParam("target", targetTime);
  } else {
    localStorage.removeItem(STORAGE_KEY_TARGET);
    removeSearchParam("target");
  }
}

export function getResolvedDuration(): number {
  // url first
  const search = new URLSearchParams(window.location.search);

  const h = Number(search.get("hours") ?? 0);
  const m = Number(search.get("minutes") ?? 0);
  const s = Number(search.get("seconds") ?? 0);
  const fromUrl = hmsToMs(h, m, s);

  if (fromUrl !== null && fromUrl > 0) {
    localStorage.setItem(STORAGE_KEY_DURATION, fromUrl);
    return fromUrl;
  }

  // storage later
  const stored = localStorage.getItem(STORAGE_KEY_DURATION);
  console.log(stored);
  if (stored !== null) {
    const n = Number(stored);

    if (Number.isFinite(n) && n >= 0) return n * 1000;
  }

  // fallback to default duration
  return DEFAULT_DURATION;
}
