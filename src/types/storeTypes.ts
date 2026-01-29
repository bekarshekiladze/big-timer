export type TimerState = {
  duration: number;
  targetTime: number | null;
  isRunning: boolean;
  remainingTime: number;
};

export type TimerActions = {
  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;

  increment: (ms: number) => void;
  decrement: (ms: number) => void;

  setDuration: (ms: number) => void;
  applyTimes: (ms: number) => void;
};

export type TimeDisplayData = {
  hours: string | null;
  minutes: string;
  seconds: string;
  showHoursSeparator: boolean;
  showMinutesSeparator: boolean;
};
