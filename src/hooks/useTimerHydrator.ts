import {
  getResolvedDuration,
  getResolvedRepeat,
  mergeSearchParams,
} from "@/persistency/timerSync";
import { useTimerStore } from "@/store/timerStore";
import { useEffect } from "react";

export type UpdaterDraft = {
  duration: number;
  remainingTime: number;
  targetTime: null | number;
  isRunning: boolean;
  isInitiated: boolean;
  repeating: boolean;
};

function useTimerHydrator() {
  const hydrate = useTimerStore((state) => state.hydrate);
  // const duration = useTimerStore((state) => state.duration);

  useEffect(() => {
    const resolvedDuration = getResolvedDuration();
    const resolvedRepeat = getResolvedRepeat();

    console.log(resolvedRepeat);

    hydrate({
      // INITIAL STATE
      duration: resolvedDuration,
      remainingTime: resolvedDuration,
      targetTime: null,
      isRunning: false,
      isInitiated: true,
      repeating: resolvedRepeat,
    });
    mergeSearchParams(resolvedDuration);
  }, [hydrate]);
}
export default useTimerHydrator;
