import { useTimerStore } from "@/store/timerStore";
import { HoursReading, MinutesReading, SecondsReading } from "./components";
import { formatTimeDisplay } from "@/utils/timeFormat";
import { msToHMS } from "@/utils/timeConversions";
import { useEffect } from "react";

export default function TimerDisplay() {
  const tick = useTimerStore((s) => s.tick);
  const remainingTime = useTimerStore((s) => s.remainingTime);
  const isRunning = useTimerStore((s) => s.isRunning);
  const isInitiated = useTimerStore((s) => s.isInitiated);

  const { hours, minutes, seconds } = msToHMS(remainingTime);

  const {
    hours: h,
    minutes: m,
    seconds: s,
    showHoursSeparator,
    showMinutesSeparator,
  } = formatTimeDisplay(hours, minutes, seconds);

  useEffect(() => {
    if (!isRunning) return;
    const intervalId = setInterval(() => {
      tick();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, tick]);

  return (
    <div className="flex justify-center gap-2 p-4 font-bigtimer text-timer align-middle">
      {h !== null && (
        <>
          <HoursReading value={isInitiated ? h : "00"} />
          {showHoursSeparator && <span className="separator">:</span>}
        </>
      )}

      <MinutesReading value={isInitiated ? m : "00"} />
      {showMinutesSeparator && <span className="separator">:</span>}

      <SecondsReading value={isInitiated ? s : "00"} />
    </div>
  );
}
