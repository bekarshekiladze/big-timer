"use client";

import { CountdownReading } from "../CountdownReading";
import { ReadingForm } from "../ReadingForm";
import { useTimerStore } from "@/store/timerStore";
import { useInitializerTimer } from "@/hooks/useInitiazerTimer";
import useTimerTicking from "@/hooks/useTimerTicking";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";

export default function Wrapper() {
  const { isEditing, isTimerLoading } = useTimerStore();

  useInitializerTimer();
  useTimerTicking();

  if (isTimerLoading) {
    return <div className="text-xl">Loading ...</div>;
  }

  return (
    <motion.div
      key="wrapper"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className="wrapper"
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
    >
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            key="readingForm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <ReadingForm />
          </motion.div>
        ) : (
          <motion.div
            key="countdownReading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <CountdownReading />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
