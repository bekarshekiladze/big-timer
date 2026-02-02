import { msToHMS } from "./timeConversions";

export type TimeDisplayData = {
  hours: string | null;
  minutes: string;
  seconds: string;
  showHoursSeparator: boolean;
  showMinutesSeparator: boolean;
};

export type TimeFormDisplay = {
  hours: string;
  minutes: string;
  seconds: string;
};

export function formatTimeDisplay(
  hours: number,
  minutes: number,
  seconds: number,
): TimeDisplayData {
  const hasHours = hours > 0;

  return {
    hours: hasHours ? String(hours) : null,
    minutes: hasHours ? String(minutes).padStart(2, "0") : String(minutes),
    seconds: String(seconds).padStart(2, "0"),
    showHoursSeparator: hasHours,
    showMinutesSeparator: true,
  };
}

export function formatTimeForForm(
  hours: number,
  minutes: number,
  seconds: number,
): TimeFormDisplay {
  return {
    hours: String(hours), // no padding (0–23)
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

export function semanticTimeDisplay(
  hours: number,
  minutes: number,
  seconds: number,
): string {
  const timerPrefixDraft = {
    name: "",
    value: 0,
    semanticPrefix: false,
  };

  if (hours > 0 && minutes === 0 && seconds === 0) {
    timerPrefixDraft.name = "Hour";
    timerPrefixDraft.value = hours;
    timerPrefixDraft.semanticPrefix = true;
  } else if (minutes > 0 && hours === 0 && seconds === 0) {
    timerPrefixDraft.name = "Minute";
    timerPrefixDraft.value = minutes;
    timerPrefixDraft.semanticPrefix = true;
  } else if (seconds >= 0 && hours === 0 && minutes === 0) {
    timerPrefixDraft.name = "Second";
    timerPrefixDraft.value = seconds;
    timerPrefixDraft.semanticPrefix = true;
  }

  if (timerPrefixDraft.semanticPrefix) {
    return `${timerPrefixDraft.value} ${timerPrefixDraft.name} Countdown | Big Timer - Fullscreen countdown timer`;
  } else {
    const {
      hours: h,
      minutes: m,
      seconds: s,
    } = formatTimeForForm(hours, minutes, seconds);
    return `${h ? h + ":" : ""}${m}:${s} Countdown | Big Timer - Fullscreen countdown timer`;
  }
}
