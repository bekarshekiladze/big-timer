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
