"use client";

import TimerDisplay from "../TimerDisplay/TimerDisplay";
import { useTimerMode } from "@/hooks/useTimerMode";
import TimerForm from "../TimerForm/TimerForm";
import { useTimerStore } from "@/store/timerStore";

export default function Wrapper() {
  const { isEditing, enterEdit } = useTimerMode();
  const isInitiated = useTimerStore((s) => s.isInitiated);

  return (
    <div onClick={!isEditing ? enterEdit : undefined}>
      {!isInitiated ? (
        <div className="loader" />
      ) : isEditing ? (
        <TimerForm />
      ) : (
        <TimerDisplay />
      )}
    </div>
  );
}
