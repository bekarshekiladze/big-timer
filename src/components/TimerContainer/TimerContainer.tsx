"use client";

import { useCallback, useRef } from "react";
import { OnTheFlyControls } from "../InputControls";
import { PlayerControls } from "../PlayerControls";
import { Wrapper } from "../Wrapper";
import { useTimerStore } from "@/store/timerStore";
import { useClickOutside } from "@/hooks/useClickOutside";
import useTimerHydrator from "@/hooks/useTimerHydrator";

export default function TimerContainer() {
  const setIsEditing = useTimerStore((state) => state.setIsEditing);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const savedCallback = useCallback(() => setIsEditing(false), [setIsEditing]);
  useClickOutside(containerRef, savedCallback);

  useTimerHydrator();

  return (
    <div className="countdown-container center" ref={containerRef}>
      <PlayerControls />
      <Wrapper />
      <OnTheFlyControls />
    </div>
  );
}
