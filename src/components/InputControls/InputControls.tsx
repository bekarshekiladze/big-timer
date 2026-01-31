"use client";

import { useTimerStore } from "@/store/timerStore";
import {
  getNextIncrementMs,
  getNextDecrementMs,
} from "@/utils/inputControls/buttonInputControl";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

export default function OnTheFlyControls() {
  const duration = useTimerStore((s) => s.duration);
  const increment = useTimerStore((s) => s.increment);
  const decrement = useTimerStore((s) => s.decrement);
  const isRunning = useTimerStore((s) => s.isRunning);
  const remainingTime = useTimerStore((s) => s.remainingTime);
  const applyTimes = useTimerStore((s) => s.applyTimes);

  const base = isRunning ? remainingTime : duration;

  return (
    <div className="text-bigtimer-black buttons-container">
      <button
        onClick={() => {
          const value = getNextIncrementMs(base);
          console.log(value);

          applyTimes(value);
        }}
        className="place-content-center grid round button primary-button"
      >
        <FaPlus />
      </button>
      <button
        onClick={() => {
          applyTimes(getNextDecrementMs(base));
        }}
        className="place-content-center grid round button primary-button"
      >
        <FaMinus />
      </button>
    </div>
  );
}
