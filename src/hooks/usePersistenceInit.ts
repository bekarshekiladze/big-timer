import { STORAGE_KEY_DURATION } from "@/constants/times";
import {
  buildTimerSearchParamsFromMs,
  getResolvedDuration,
  writeSearchParams,
} from "@/persistency/timerSync";
import { useTimerStore } from "@/store/timerStore";
import { useEffect, useRef } from "react";

function useTimerHydrator() {
  const hydrate = useTimerStore((state) => state.hydrate);
  const didRun = useRef(false); // devmode guard

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    const resolvedDuration = getResolvedDuration();
    localStorage.setItem(
      STORAGE_KEY_DURATION,
      JSON.stringify(Math.round(resolvedDuration / 1000)),
    );

    hydrate(resolvedDuration);
    const params = buildTimerSearchParamsFromMs(resolvedDuration);
    writeSearchParams(params);
  }, [hydrate]);
}
export default useTimerHydrator;
