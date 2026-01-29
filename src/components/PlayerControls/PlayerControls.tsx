"use client";

import { useTimerStore } from "@/store/timerStore";
import { animate, press } from "motion";
import { useEffect } from "react";

export default function PlayerControls() {
  const { start, pause, reset } = useTimerStore();
  useEffect(() => {
    press(".primary-button", (element) => {
      animate(element, { scale: 0.8 }, { type: "spring", stiffness: 1000 });
      return () =>
        animate(element, { scale: 1 }, { type: "spring", stiffness: 500 });
    });
  }, []);

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
