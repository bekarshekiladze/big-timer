export type TimerState = {
  // timer
  duration: number;
  targetTime: number | null;
  isRunning: boolean;
  remainingTime: number;

  // ui
  selectedInputGroup: SelectedInputGroup;
  isEditing: boolean;
};

export type SelectedInputGroup = "hours" | "minutes" | "seconds";

export type TimerActions = {
  // init
  isInitiated: boolean;

  hydrate: (ms: number) => void;

  // timer
  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;

  increment: (ms: number) => void;
  decrement: (ms: number) => void;

  setDuration: (ms: number) => void;
  applyTimes: (ms: number) => void;

  // ui
  setSelectedInputGroup: (group: SelectedInputGroup) => void;
  moveSelection: (dir: "left" | "right") => void;
  nudgeSelected: (dir: "up" | "down") => void;
  setIsEditing: (editing: boolean) => void;
};
