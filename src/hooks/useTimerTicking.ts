import { useTimerStore } from "@/store/timerStore";
import { msToHMS } from "@/utils/timeConversions";
import { useEffect, useRef } from "react";

export default function useTimerTicking() {
  const intervalRef = useRef<number | null>(null);

  const {
    timerIsRunning,
    targetDate,
    setTime,
    setFinished,
    setIsRunning,
    previouslySetDuration,
  } = useTimerStore();

  useEffect(() => {
    if (!timerIsRunning || !targetDate) return;

    const tick = () => {
      const remainingMs = targetDate - Date.now();

      if (remainingMs <= 0) {
        setTime(0, 0, 0);
        setFinished(true);
        setIsRunning(false);
        return;
      }

      const { hours, minutes, seconds } = msToHMS(remainingMs);
      setTime(hours, minutes, seconds);
    };
    tick();

    intervalRef.current = window.setInterval(tick, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [timerIsRunning, targetDate]);
}
