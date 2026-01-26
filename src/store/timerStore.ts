import { TimerState } from "@/types/storeTypes"
import { create } from "zustand"

export const useTimerStore = create<TimerState>(set => ({
  timerIsRunning: true,
  previouslySetDuration: null,

  isEditing: false,
  setIsEditing: (editing) => set({ isEditing: editing }),

  hours: 0,
  minutes: 0,
  seconds: 0,

  settings: {
    continueBeyondZero: false,
    playTimerCompleteSound: false,
    playTimerCountdownSound: true,
    reducedMotion: true,
    repeat: false,
    showNotifications: false,
    warningWhenTimeIsAlmostUp: false
  },

  isTimerLoading: true,
  setIsTimerLoading: (loading) => set({ isTimerLoading: loading }),

  setTime: (h, m, s) => set({ hours: h, minutes: m, seconds: s }),
  setRunning: (running) => set({ timerIsRunning: running }),
  setSettings: (settings) =>
    set(state => ({
      settings: { ...state.settings, ...settings }
    })),
  syncFromUrl: (params) => set(state => ({
    hours: Number(params.get('hours')) || 0,
    minutes: Number(params.get('minutes')) || 0,
    seconds: Number(params.get('seconds')) || 0,
    settings: {
      ...state.settings,
      repeat: params.get('repeat') === 'true'
    }
  }))
}))