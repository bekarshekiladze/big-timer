import { DEFAULT_DURATION, STORAGE_KEY } from "@/constants/times"
import { hmsToSeconds, secondsToHMS } from "./timeConversions"

export function buildTimerSearchParams(
  hours: number,
  minutes: number,
  seconds: number,
): URLSearchParams {
  const params = new URLSearchParams()
  if (hours > 0 && hours < 24) params.set("hours", String(hours))
  if (minutes > 0 && minutes < 60) params.set("minutes", String(minutes))
  if (seconds > 0) params.set("seconds", String(seconds))

  params.set("repeat", "false")

  return params
}


export function initTimerFromStorageOrUrl(): void {
  const stored = localStorage.getItem(STORAGE_KEY)

  if (stored !== null) {
    const total = Number(stored)
    const hmr = secondsToHMS(total)
    if (!hmr) return

    const params = buildTimerSearchParams(hmr.hours, hmr.minutes, hmr.seconds)
    window.history.replaceState(null, "", `${location.pathname}?${params.toString()}`)
    return
  }

  const search = new URLSearchParams(location.search)

  const hasTimeParams =
    search.has("hours") ||
    search.has("minutes") ||
    search.has("seconds")

  if (hasTimeParams) {
    const h = Number(search.get("hours") ?? 0)
    const m = Number(search.get("minutes") ?? 0)
    const s = Number(search.get("seconds") ?? 0)

    const fromUrl = hmsToSeconds(h, m, s)

    if (fromUrl !== null) {
      return
    }
  }


  const fallback = secondsToHMS(DEFAULT_DURATION)


  if (!fallback) return

  const params = buildTimerSearchParams(fallback.hours, fallback.minutes, fallback.seconds)

  window.history.replaceState(null, "", `${location.pathname}?${params.toString()}`)

}