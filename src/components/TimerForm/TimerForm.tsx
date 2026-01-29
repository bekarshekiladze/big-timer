import { useEffect, useRef, useState } from "react";
import { HourField, MinuteField, SecondField } from "./components";
import { useTimerStore } from "@/store/timerStore";
import { formatTimeDisplay } from "@/utils/timeFormat";
import { msToHMS } from "@/utils/timeConversions";

export default function TimerForm() {
  const duration = useTimerStore((state) => state.duration);
  const applyTimes = useTimerStore((state) => state.applyTimes);

  useEffect(() => {
    const { hours, minutes, seconds } = msToHMS(duration);
  }, [duration]);

  const formRef = useRef<HTMLFormElement>(null);
  // const disableEditingMode = useTimerStore((state) => state.setIsEditing);
  // useClickOutside(formRef, () => disableEditingMode(false));

  return (
    <form ref={formRef}>
      <fieldset className="flex justify-center gap-2 bg-white p-4 rounded-md font-bigtimer text-bigtimer-brown text-timer">
        <HourField />
        <span className="text-black spacer">:</span>
        <MinuteField />
        <span className="text-black spacer">:</span>
        <SecondField />
      </fieldset>
    </form>
  );
}
