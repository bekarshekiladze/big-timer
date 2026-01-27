export type TimerSettings = {
  continueBeyondZero: boolean;
  playTimerCompleteSound: boolean;
  playTimerCountdownSound: boolean;
  reducedMotion: boolean;
  repeat: boolean;
  showNotifications: boolean;
  warningWhenTimeIsAlmostUp: boolean;
};

export type SelectedInputGroup = "hours" | "minutes" | "seconds";

export type TimerState = {
  start: () => void;
  pause: () => void;
  reset: () => void;
  pausedAt: null | number;
  timerIsRunning: boolean;
  setIsRunning: (running: boolean) => void;
  targetDate: number | null;
  setTargetDate: (date: number) => void;

  timerHasStarted: boolean;
  setHasStarted: (started: boolean) => void;

  timerIsFinished: boolean;
  setFinished: (finished: boolean) => void;

  previouslySetDuration: number | null;

  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;

  selectedGroup: SelectedInputGroup;
  setSelectedGroup: (group: SelectedInputGroup) => void;
  setPreviouslySetDuration: (value: number) => void;

  hours: number;
  minutes: number;
  seconds: number;

  settings: TimerSettings;

  isTimerLoading: boolean;
  setIsTimerLoading: (loading: boolean) => void;

  setTime: (h: number, m: number, s: number) => void;
  setSettings: (settings: Partial<TimerSettings>) => void;
  initializeTimer: (h: number, m: number, s: number, repeat?: boolean) => void;
  syncTimer: (h: number, m: number, s: number, duration: number) => void;
};

export type TimeDisplayData = {
  hours: string | null;
  minutes: string;
  seconds: string;
  showHoursSeparator: boolean;
  showMinutesSeparator: boolean;
};
