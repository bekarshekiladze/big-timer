"use client";

import { CountdownReading } from "../CountdownReading";
import { ReadingForm } from "../ReadingForm";
import { useTimerStore } from "@/store/timerStore";
import { useInitializerTimer } from "@/hooks/useInitiazerTimer";
import useTimerTicking from "@/hooks/useTimerTicking";
import * as motion from "motion/react-client";

export default function Wrapper() {
  const { isEditing, isTimerLoading } = useTimerStore();

  useInitializerTimer();
  useTimerTicking();

  if (isTimerLoading) {
    return <div className="text-xl">Loading ...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className="wrapper"
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
    >
      {isEditing ? <ReadingForm /> : <CountdownReading />}
    </motion.div>
  );
}
