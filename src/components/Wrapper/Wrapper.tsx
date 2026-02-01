"use client";

import TimerDisplay from "../TimerDisplay/TimerDisplay";
import { useTimerMode } from "@/hooks/useTimerMode";
import TimerForm from "../TimerForm/TimerForm";

export default function Wrapper() {
  const { isEditing, enterEdit } = useTimerMode();

  return (
    <div onClick={!isEditing ? enterEdit : undefined}>
      {isEditing ? <TimerForm /> : <TimerDisplay />}
    </div>
  );
}
