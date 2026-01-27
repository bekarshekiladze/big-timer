"use client";

import { CountdownReading } from "../CountdownReading";
import { ReadingForm } from "../ReadingForm";
import { useTimerStore } from "@/store/timerStore";
import { useInitializerTimer } from "@/hooks/useInitiazerTimer";
import useTimerTicking from "@/hooks/useTimerTicking";

export default function Wrapper() {
  const isEditing = useTimerStore((state) => state.isEditing);

  useInitializerTimer();
  useTimerTicking();

  return (
    <div className="wrapper">
      {isEditing ? <ReadingForm /> : <CountdownReading />}
    </div>
  );
}
