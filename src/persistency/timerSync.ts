// @ts-nochec
import {
  DEFAULT_DURATION,
  DEFAULT_REPEAT,
  STORAGE_KEY_DURATION,
  STORAGE_KEY_SETTINGS,
  STORAGE_KEY_STATES,
  STORAGE_KEY_TARGET,
} from "@/constants/times";
import { hmsToMs, msToHMS } from "../utils/timeConversions";

// **********
// URL Section
// **********

const TIMER_KEYS = ["hours", "minutes", "seconds", "repeat"] as const;

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

  const params = new URLSearchParams(window.location.search);

  if (hours > 0) params.set("hours", String(hours));
  if (minutes > 0) params.set("minutes", String(minutes));
  if (seconds > 0) params.set("seconds", String(seconds));

  const currentParams = new URLSearchParams(window.location.search);
  params.set("repeat", currentParams.get("repeat") ?? "false");

  return params;
}

// save URLSearchParams to url
export function mergeSearchParams(ms: number) {
  const url = new URL(window.location.href);

  for (const k of TIMER_KEYS) url.searchParams.delete(k);

  const nextParams = buildTimerSearchParamsFromMs(ms);
  for (const [k, v] of nextParams.entries()) url.searchParams.set(k, v);

  const t = url.searchParams.get("target");
  if (t !== null) {
    url.searchParams.delete("target");
    url.searchParams.set("target", t);
  }

  window.history.replaceState(null, "", url);
}

export function updateRepeatInUrl(repeat: boolean) {
  const url = new URL(window.location.href);
  url.searchParams.set("repeat", String(repeat));

  const t = url.searchParams.get("target");
  if (t !== null) {
    url.searchParams.delete("target");
    url.searchParams.set("target", t);
  }

  window.history.replaceState(null, "", url);
}

// **********
// LocalStorage
// **********
export function updateRunningStatus(isRunning: boolean) {
  const state = { isTimerRunning: isRunning };

  localStorage.setItem(STORAGE_KEY_STATES, JSON.stringify(state));
}

export function updatePreviouslySetDuration(ms: number) {
  localStorage.setItem(
    STORAGE_KEY_DURATION,
    JSON.stringify(Math.round(ms / 1000)),
  );
}
export function updateRepeatStorageSetting(repeat: boolean) {
  try {
    const settingsString = localStorage.getItem(STORAGE_KEY_SETTINGS);
    const currentSettings = settingsString ? JSON.parse(settingsString) : {};
    const updatedSettings = {
      ...currentSettings,
      repeat: repeat,
    };
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(updatedSettings));
  } catch (error) {
    console.log("Couldnt update repeat in storage");
  }
}

// **********
// URL & LocalStorage
// **********

export function updateTargetTime(
  isRunning: boolean,
  targetTime: number | null,
) {
  if (isRunning) {
    localStorage.setItem(STORAGE_KEY_TARGET, JSON.stringify(targetTime));
    addNewSearchParam("target", JSON.stringify(targetTime));
  } else {
    localStorage.removeItem(STORAGE_KEY_TARGET);
    removeSearchParam("target");
  }
  updateRunningStatus(isRunning);
}

export function getResolvedDuration(): number {
  // url first
  const search = new URLSearchParams(window.location.search);

  const h = Number(search.get("hours") ?? 0);
  const m = Number(search.get("minutes") ?? 0);
  const s = Number(search.get("seconds") ?? 0);
  const fromUrlToMs = hmsToMs(h, m, s);

  if (fromUrlToMs !== null && fromUrlToMs > 0) {
    updatePreviouslySetDuration(fromUrlToMs);
    return fromUrlToMs;
  }

  // storage later
  const stored = localStorage.getItem(STORAGE_KEY_DURATION);
  if (stored !== null) {
    const n = Number(stored);

    if (Number.isFinite(n) && n >= 0) {
      return n * 1000;
    }
  }

  // fallback to default duration
  return DEFAULT_DURATION;
}

export function getResolvedRepeat(): boolean {
  // url first
  const search = new URLSearchParams(window.location.search);

  const r = search.get("repeat");
  if (r === "true") {
    updateRepeatInUrl(true);
    updateRepeatStorageSetting(true);
    return true;
  }
  if (r === "false") {
    updateRepeatInUrl(false);
    updateRepeatStorageSetting(false);
    return false;
  }

  // storage later
  const settingsString = localStorage.getItem(STORAGE_KEY_SETTINGS);
  if (settingsString !== null) {
    try {
      const settingsObj = JSON.parse(settingsString);
      if (typeof settingsObj?.repeat === "boolean") {
        return settingsObj.repeat;
      }
    } catch (error) {}
  }

  // fallback to default duration
  return DEFAULT_REPEAT;
}

export type ResolvedRunState = {
  resolvedIsRunning: boolean;
  resolvedTargetTime: number | null;
};

export function getResolvedRunStateFromUrl(): ResolvedRunState {
  const search = new URLSearchParams(window.location.search);

  const raw = search.get("target");

  // no param
  if (raw === null) {
    return { resolvedIsRunning: false, resolvedTargetTime: null };
  }

  // must be a number
  const target = Number(raw);
  if (!Number.isFinite(target) || target <= 0) {
    return { resolvedIsRunning: false, resolvedTargetTime: null };
  }

  // running means target is in the future
  const resolvedIsRunning = target > Date.now();

  return {
    resolvedIsRunning,
    resolvedTargetTime: resolvedIsRunning ? target : null,
  };
}

export function updateQueryAndStorage(ms: number) {
  mergeSearchParams(ms);
  updatePreviouslySetDuration(ms);
}

export function updateRepeatQueryAndStorage(repeat: boolean) {
  updateRepeatInUrl(repeat);
  updateRepeatStorageSetting(repeat);
}
