"use client";

import { useEffect } from "react";
import { CountdownReading } from "../CountdownReading";
import { ReadingForm } from "../ReadingForm";
import { initTimesFromStorageOrUrl } from "@/utils/timerSync";
import { useTimerStore } from "@/store/timerStore";

export default function Wrapper() {
  const isEditing = useTimerStore((state) => state.isEditing);


  useEffect(() => {
    initTimesFromStorageOrUrl();
    useTimerStore
      .getState()
      // .initializeTimer();
  }, []);

  return (
    <div className="wrapper">
      {isEditing ? <ReadingForm /> : <CountdownReading />}
    </div>
  );
}
