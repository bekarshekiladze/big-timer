"use client";

import {
  addNewSearchParam,
  removeSearchParam,
  updateTargetTime,
} from "@/persistency/timerSync";
import { useTimerStore } from "@/store/timerStore";
import { animate, press } from "motion";
import { useEffect } from "react";

export default function PlayerControls() {
  const start = useTimerStore((s) => s.start);
  const pause = useTimerStore((s) => s.pause);
  const reset = useTimerStore((s) => s.reset);
  const targetTime = useTimerStore((s) => s.targetTime);
  const isRunning = useTimerStore((s) => s.isRunning);
  const remainingTime = useTimerStore((s) => s.remainingTime);

  useEffect(() => {
    press(".primary-button", (element) => {
      animate(element, { scale: 0.8 }, { type: "spring", stiffness: 1000 });
      return () =>
        animate(element, { scale: 1 }, { type: "spring", stiffness: 500 });
    });
  }, []);

  return (
    <div className="buttons-container">
      {!isRunning && remainingTime > 0 && (
        <button
          onClick={() => {
            start();
            updateTargetTime(true, Date.now() + remainingTime);
          }}
          className="button primary-button"
        >
          start
        </button>
      )}
      {(isRunning || remainingTime === 0) && (
        <button
          onClick={() => {
            reset();
            updateTargetTime(false, null);
          }}
          className="button primary-button"
        >
          reset
        </button>
      )}
      {isRunning && (
        <button
          onClick={() => {
            pause();
            updateTargetTime(false, null);
          }}
          className="button primary-button"
        >
          pause
        </button>
      )}
    </div>
  );
}
