export type TimerSettings = {
  continueBeyondZero: boolean;
  playTimerCompleteSound: boolean;
  playTimerCountdownSound: boolean;
  reducedMotion: boolean;
  repeat: boolean;
  showNotifications: boolean;
  warningWhenTimeIsAlmostUp: boolean;
}




export type TimerState = {
  timerIsRunning: boolean;
  previouslySetDuration: number | null;

  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;

  hours: number;
  minutes: number;
  seconds: number;

  settings: TimerSettings;

  isTimerLoading: boolean;
  setIsTimerLoading: (loading: boolean) => void;

  setTime: (h: number, m: number, s: number) => void;
  setRunning: (running: boolean) => void;
  setSettings: (settings: Partial<TimerSettings>) => void;
  syncFromUrl: (params: URLSearchParams) => void;
}

export type TimeDisplayData = {
  hours: string | null;
  minutes: string;
  seconds: string;
  showHoursSeparator: boolean;
  showMinutesSeparator: boolean;
}