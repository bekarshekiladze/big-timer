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
  timerIsRunning: boolean;
  setIsRunning: (running: boolean) => void;
  targetDate: number | null;

  timerHasStarted: boolean;
  setHasStarted: (started: boolean) => void;

  timerIsFinished: boolean;
  setFinished: (finished: boolean) => void;

  previouslySetDuration: number | null;

  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;

  selectedGroup: SelectedInputGroup;
  setSelectedGroup: (group: SelectedInputGroup) => void;

  hours: number;
  minutes: number;
  seconds: number;

  settings: TimerSettings;

  isTimerLoading: boolean;
  setIsTimerLoading: (loading: boolean) => void;

  setTime: (h: number, m: number, s: number) => void;
  setRunning: (running: boolean) => void;
  setSettings: (settings: Partial<TimerSettings>) => void;
  initializeTimer: (h: number, m: number, s: number, repeat?: boolean) => void;
  syncTimer: (h: number, m: number, s: number) => void;
};

export type TimeDisplayData = {
  hours: string | null;
  minutes: string;
  seconds: string;
  showHoursSeparator: boolean;
  showMinutesSeparator: boolean;
};
