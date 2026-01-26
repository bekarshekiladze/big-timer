import { TimeDisplayData } from "@/types/storeTypes"



export function formatTimeDisplay(hours: number, minutes: number, seconds: number): TimeDisplayData {
  const hasHours = hours > 0

  return {
    hours: hasHours ? String(hours) : null,
    minutes: hasHours ? String(minutes).padStart(2, "0") : String(minutes),
    seconds: String(seconds).padStart(2, '0'),
    showHoursSeparator: hasHours,
    showMinutesSeparator: true
  }
}

