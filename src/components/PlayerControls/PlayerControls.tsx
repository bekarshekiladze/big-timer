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

  useEffect(() => {
    press(".primary-button", (element) => {
      animate(element, { scale: 0.8 }, { type: "spring", stiffness: 1000 });
      return () =>
        animate(element, { scale: 1 }, { type: "spring", stiffness: 500 });
    });
  }, []);
  useEffect(() => {
    updateTargetTime(isRunning, targetTime);
  }, [isRunning, targetTime]);

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
