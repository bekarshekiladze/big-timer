import {
  getResolvedDuration,
  getResolvedRepeat,
  getResolvedRunStateFromUrl,
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
    const { resolvedIsRunning, resolvedTargetTime } =
      getResolvedRunStateFromUrl();

    console.log({ resolvedIsRunning, resolvedTargetTime });

    hydrate({
      // INITIAL STATE
      duration: resolvedDuration,
      remainingTime: resolvedDuration,
      targetTime: resolvedTargetTime,
      isRunning: resolvedIsRunning,
      isInitiated: true,
      repeating: resolvedRepeat,
    });
    console.log(location.search);
    mergeSearchParams(resolvedDuration);
    console.log(location.search);
  }, [hydrate]);
}
export default useTimerHydrator;
