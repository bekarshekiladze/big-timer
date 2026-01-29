"use client";

import TimerDisplay from "../TimerDisplay/TimerDisplay";
import { ReadingForm } from "../TimerForm";
import { useTimerMode } from "@/hooks/useTimerMode";

export default function Wrapper() {
  const { isEditing, enterEdit } = useTimerMode();

  return (
    <div onClick={!isEditing ? enterEdit : undefined}>
      {isEditing ? <ReadingForm /> : <TimerDisplay />}
    </div>
  );
}
