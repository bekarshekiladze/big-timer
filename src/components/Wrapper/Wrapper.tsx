"use client";

import { CountdownReading } from "../CountdownReading";
import { ReadingForm } from "../ReadingForm";
import { useTimerStore } from "@/store/timerStore";
import { useInitializerTimer } from "@/hooks/useInitiazerTimer";

export default function Wrapper() {
  const isEditing = useTimerStore((state) => state.isEditing);

  useInitializerTimer();

  return (
    <div className="wrapper">
      {isEditing ? <ReadingForm /> : <CountdownReading />}
    </div>
  );
}
