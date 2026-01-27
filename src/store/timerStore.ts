import { TimerState } from "@/types/storeTypes";
import { start } from "repl";
import { create } from "zustand";

export const useTimerStore = create<TimerState>((set) => ({
  // timer zone
  timerIsRunning: false,
  timerHasStarted: false,
  timerIsFinished: false,
  previouslySetDuration: null, //10 min default
  targetDate: null,
  hours: 0,
  minutes: 0,
  seconds: 0,

  setTime: (h, m, s) =>
    set({ hours: h, minutes: m, seconds: s, timerIsFinished: false }),
  start: () =>
    set({
      timerIsRunning: true,
      timerHasStarted: true,
      timerIsFinished: false,
    }),
  pause: () => set({ timerIsRunning: false }),
  setFinished: (finished) => set({ timerIsFinished: finished }),
  setHasStarted: (started) => set({ timerHasStarted: started }),
  setIsRunning: (running) => set({ timerIsRunning: running }),
  setRunning: (running) => set({ timerIsRunning: running }),
  initializeTimer: (h: number, m: number, s: number, repeat?: boolean) =>
    set((state) => ({
      hours: h,
      minutes: m,
      seconds: s,
      timerIsFinished: false,
      settings: {
        ...state.settings,
        repeat: repeat ?? state.settings.repeat,
      },
    })),
  syncTimer: (h: number, m: number, s: number) => {
    // Calculate targetDate if you want the timer to end 'X' seconds from now
    const totalSeconds = h * 3600 + m * 60 + s;
    const target = new Date();
    target.setSeconds(target.getSeconds() + totalSeconds);

    set({
      hours: h,
      minutes: m,
      seconds: s,
      targetDate: Number(target),
      timerIsFinished: false,
      isTimerLoading: false,
    });
  },
  // end of timer zone

  // UI zone
  isEditing: false,
  isTimerLoading: true,
  selectedGroup: "hours",
  setIsEditing: (editing) => set({ isEditing: editing }),
  setSelectedGroup: (group) => set({ selectedGroup: group }),
  setIsTimerLoading: (loading) => set({ isTimerLoading: loading }),
  // end of UI zone

  // settings zone
  settings: {
    continueBeyondZero: false,
    playTimerCompleteSound: false,
    playTimerCountdownSound: true,
    reducedMotion: true,
    repeat: false,
    showNotifications: false,
    warningWhenTimeIsAlmostUp: false,
  },
  setSettings: (settings) =>
    set((state) => ({
      settings: { ...state.settings, ...settings },
    })),
  // end of settings zone
}));
