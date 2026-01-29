"use client";

import { useTimerStore } from "@/store/timerStore";
import InputField from "./InputField";
import { msToHMS } from "@/utils/timeConversions";
import { formatTimeForForm } from "@/utils/timeFormat";

export default function HourInput() {
  const duration = useTimerStore((state) => state.duration);
  const { hours, minutes, seconds } = msToHMS(duration);
  const result = formatTimeForForm(hours, minutes, seconds);

  return <InputField name="hours" value={result.hours} />;
}
