import { useTimerStore } from "@/store/timerStore";
import { secondsToHMS } from "@/utils/timeConversions";
import { buildTimerSearchParams, getResolvedDuration } from "@/utils/timerSync";
import { useEffect } from "react";

export function useInitializerTimer() {
  const syncTimer = useTimerStore((state) => state.syncTimer);

  useEffect(() => {
    const duration = getResolvedDuration();

    const hmr = secondsToHMS(duration);
    

    if (hmr) {
      syncTimer(hmr.hours, hmr.minutes, hmr.seconds, duration);

      const params = buildTimerSearchParams(
        hmr.hours,
        hmr.minutes,
        hmr.seconds,
      );
      const newRelativePathQuery = `${window.location.pathname}?${params.toString()}`;

      // Only update if the URL actually needs to change
      if (window.location.search !== `?${params.toString()}`) {
        window.history.replaceState(null, "", newRelativePathQuery);
      }
    }
  }, [syncTimer]);
}
