"use client";

import { useTimerStore } from "@/store/timerStore";
import { secondsToHMS } from "@/utils/timeConversions";

export default function PlayerControls() {
  const { start, pause, reset, setTime, previouslySetDuration } =
    useTimerStore();

  return (
    <div className="buttons-container">
      <button
        onClick={() => {
          start();
        }}
        className="button primary-button"
      >
        start
      </button>
      <button
        onClick={() => {
          if (previouslySetDuration !== null) {
            const result = secondsToHMS(previouslySetDuration);
            if (result !== null) {
              const { hours, minutes, seconds } = result;
              setTime(hours, minutes, seconds);
            }
          }
          reset();
        }}
        className="button primary-button"
      >
        reset
      </button>
      <button
        onClick={() => {
          pause();
        }}
        className="button primary-button"
      >
        pause
      </button>
    </div>
  );
}
