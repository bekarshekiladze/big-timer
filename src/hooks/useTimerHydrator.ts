import {
  buildTimerSearchParamsFromMs,
  getResolvedDuration,
  mergeSearchParams,
} from "@/persistency/timerSync";
import { useTimerStore } from "@/store/timerStore";
import { useEffect, useRef } from "react";

export type UpdaterDraft = {
  duration: number;
  remainingTime: number;
  targetTime: null | number;
  isRunning: boolean;
  isInitiated: boolean;
};

function useTimerHydrator() {
  const hydrate = useTimerStore((state) => state.hydrate);
  // const duration = useTimerStore((state) => state.duration);

  useEffect(() => {
    const resolvedDuration = getResolvedDuration();
    console.log(resolvedDuration);

    hydrate({
      // INITIAL STATE
      duration: resolvedDuration,
      remainingTime: resolvedDuration,
      targetTime: null,
      isRunning: false,
      isInitiated: true,
    });
    mergeSearchParams(resolvedDuration);
  }, [hydrate]);
}
export default useTimerHydrator;
