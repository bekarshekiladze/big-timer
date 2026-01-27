import { TimerState } from "@/types/storeTypes";
import { create } from "zustand";

export const useTimerStore = create<TimerState>((set) => ({
  // TIMERS ZONE
  timerIsRunning: false,
  timerHasStarted: false,
  timerIsFinished: false,
  previouslySetDuration: null, //10 min default
  targetDate: null,
  pausedAt: null,
  hours: 0,
  minutes: 0,
  seconds: 0,

  setPreviouslySetDuration: (value) => {
    set((state) => {
      if (!state.previouslySetDuration) return state;
      return { previouslySetDuration: state.previouslySetDuration + value };
    });
  },
  setTime: (h, m, s) =>
    set({ hours: h, minutes: m, seconds: s, timerIsFinished: false }),
  start: () =>
    set((state) => {
      if (state.timerIsRunning) return state;

      const pauseDuration = state.pausedAt ? Date.now() - state.pausedAt : 0;

      return {
        timerIsRunning: true,
        timerHasStarted: true,
        timerIsFinished: false,
        targetDate: state.targetDate
          ? state.targetDate + pauseDuration
          : Date.now() + (state.previouslySetDuration ?? 0) * 1000,
        pausedAt: null,
      };
    }),
  pause: () =>
    set((state) => {
      if (!state.timerIsRunning) return state;

      return {
        timerIsRunning: false,
        pausedAt: Number(Date.now()),
      };
    }),
  reset: () => {
    set(() => {
      return {
        timerIsRunning: false,
        timerHasStarted: false,
        timerIsFinished: false,
        targetDate: null,
        pausedAt: null,
      };
    });
  },
  setTargetDate: (milliseconds) => set({ targetDate: milliseconds }),
  setFinished: (finished) => set({ timerIsFinished: finished }),
  setHasStarted: (started) => set({ timerHasStarted: started }),
  setIsRunning: (running) => set({ timerIsRunning: running }),
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
  syncTimer: (h: number, m: number, s: number, duration: number) => {
    set({
      hours: h,
      minutes: m,
      seconds: s,
      previouslySetDuration: duration,
      timerIsFinished: false,
      isTimerLoading: false,
    });
  },
  // end of TIMERS ZONE

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
