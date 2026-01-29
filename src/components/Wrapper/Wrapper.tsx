"use client";

import { CountdownReading } from "../TimerDisplay";
import { ReadingForm } from "../TimerForm";
import { useTimerStore } from "@/store/timerStore";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

export default function Wrapper() {
  const [isEditing, setIsediting] = useState(true);
  return (
    // <ReadingForm />
    <CountdownReading />
  );
}
