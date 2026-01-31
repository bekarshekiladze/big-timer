import { STORAGE_KEY_DURATION } from "@/constants/times";
import {
  buildTimerSearchParamsFromMs,
  getResolvedDuration,
  mergeSearchParams,
} from "@/persistency/timerSync";
import { useTimerStore } from "@/store/timerStore";
import { useEffect, useRef } from "react";

function useTimerHydrator() {
  const hydrate = useTimerStore((state) => state.hydrate);
  const duration = useTimerStore((state) => state.duration);

  useEffect(() => {
    const resolvedDuration = getResolvedDuration();
    console.log(resolvedDuration);

    // localStorage.setItem(
    //   STORAGE_KEY_DURATION,
    //   JSON.stringify(Math.round(resolvedDuration / 1000)),
    // );

    hydrate(resolvedDuration);
    const params = buildTimerSearchParamsFromMs(resolvedDuration);
    mergeSearchParams(params);
  }, [hydrate]);
}
export default useTimerHydrator;
