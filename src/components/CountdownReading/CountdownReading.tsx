import { useTimerStore } from "@/store/timerStore";
import { HoursReading, MinutesReading, SecondsReading } from "./components";
import { formatTimeDisplay } from "@/utils/timeFormat";

export default function CountdownReading() {
  const { hours, minutes, seconds } = useTimerStore();

  const {
    hours: h,
    minutes: m,
    seconds: s,
    showHoursSeparator,
    showMinutesSeparator,
  } = formatTimeDisplay(hours, minutes, seconds);
  return (
    <div
      onClick={() => {
        useTimerStore.getState().setIsEditing(true);
      }}
      className="flex justify-center gap-2 p-4 font-bigtimer text-timer align-middle"
    >
      {h !== null && (
        <>
          <HoursReading value={h} />
          {showHoursSeparator && <span className="separator">:</span>}
        </>
      )}

      <MinutesReading value={m} />
      {showMinutesSeparator && <span className="separator">:</span>}

      <SecondsReading value={s} />
    </div>
  );
}
