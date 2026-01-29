//@ts-nochec
import { SelectedInputGroup } from "@/types/storeTypes";
import { TimerActions } from "../types/storeTypes";
import { TimerState } from "@/types/storeTypes";
import { create } from "zustand";

const DEFAULT_DURATION = 10 * 60 * 1000;
// const DEFAULT_DURATION = 5 * 1000;

const GROUPS: SelectedInputGroup[] = ["hours", "minutes", "seconds"];

const STEP_MS: Record<SelectedInputGroup, number> = {
  hours: 60 * 60 * 1000,
  minutes: 60 * 1000,
  seconds: 1000,
};

export const useTimerStore = create<TimerActions & TimerState>((set, get) => ({
  // TIMER ZONE
  remainingTime: DEFAULT_DURATION,
  targetTime: null,
  isRunning: false,
  duration: DEFAULT_DURATION,

  start: () => {
    const { remainingTime, isRunning } = get();
    if (isRunning) return;
    set({
      isRunning: true,
      targetTime: Date.now() + remainingTime,
    });
    console.log("started");
  },

  pause: () => {
    const { targetTime, isRunning } = get();
    if (!targetTime || !isRunning) return;
    set({
      isRunning: false,
      remainingTime: Math.max(0, targetTime - Date.now()),
      targetTime: null,
    });
  },

  reset: () => {
    const { duration } = get();
    set({
      isRunning: false,
      targetTime: null,
      remainingTime: duration,
    });
  },

  tick: () => {
    console.log("tick");

    const { targetTime, isRunning } = get();
    if (!isRunning || !targetTime) return;

    if (Date.now() >= targetTime) {
      set({
        isRunning: false,
        targetTime: null,
        remainingTime: 0,
      });
      return;
    }
    set({ remainingTime: Math.max(0, targetTime - Date.now()) });
  },

  increment: (ms) => {
    const { isRunning, targetTime } = get();

    if (!isRunning || targetTime == null) {
      set((state) => {
        const next = Math.max(0, state.duration + ms);
        return { remainingTime: next, duration: next };
      });
      return;
    }

    const now = Date.now();
    const nextTarget = targetTime + ms;

    // running
    set({
      targetTime: nextTarget,
      remainingTime: Math.max(0, nextTarget - now),
    });
  },

  decrement: (ms) => {
    const { isRunning, targetTime, remainingTime } = get();

    if (!isRunning && targetTime == null && remainingTime == 0) return;

    if (isRunning && targetTime != null) {
      const nextTarget = targetTime - ms;
      if (nextTarget <= Date.now()) {
        set({
          isRunning: false,
          targetTime: null,
          remainingTime: 0,
        });
        return;
      }

      set({
        targetTime: nextTarget,
        remainingTime: Math.max(0, nextTarget - Date.now()),
      });
      return;
    }

    set((state) => {
      const next = Math.max(0, state.duration - ms);

      return { remainingTime: next, duration: next };
    });
  },

  setDuration: (ms) => set({ duration: ms }),

  applyTimes: (ms) => {
    const { isRunning } = get();
    if (isRunning) {
      set({
        duration: ms,
        targetTime: Date.now() + ms,
        remainingTime: ms,
      });
      return;
    }
    set({
      duration: ms,
      remainingTime: ms,
      targetTime: null,
    });
  },

  // end of TIMER ZONE

  // UI ZONE
  selectedInputGroup: "hours",
  isEditing: false,

  setSelectedInputGroup: (group) => {
    set({ selectedInputGroup: group });
  },
  moveSelection: (dir: "left" | "right") => {
    // ["hours", "minutes", "seconds"]
    const { selectedInputGroup } = get();
    const idx = GROUPS.indexOf(selectedInputGroup);
    const nextIdx =
      dir === "left"
        ? (idx - 1 + GROUPS.length) % GROUPS.length
        : (idx + 1) % GROUPS.length;

    set({ selectedInputGroup: GROUPS[nextIdx] });
  },
  nudgeSelected: (dir: "up" | "down") => {
    const { selectedInputGroup } = get();
    const step = STEP_MS[selectedInputGroup];

    if (dir === "up") get().increment(step);
    else get().decrement(step);
  },

  setIsEditing: (editing) => set({ isEditing: editing }),
  // end of UI ZONE
}));
