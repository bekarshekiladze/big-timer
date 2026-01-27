import { useRef } from "react";
import { HourField, MinuteField, SecondField } from "./components";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useTimerStore } from "@/store/timerStore";
import { formatTimeDisplay } from "@/utils/timeFormat";

export default function ReadingForm() {
  const { hours, minutes, seconds } = useTimerStore();

  const {
    hours: h,
    minutes: m,
    seconds: s,
  } = formatTimeDisplay(hours, minutes, seconds);

  const formRef = useRef<HTMLFormElement>(null);
  const disableEditingMode = useTimerStore((state) => state.setIsEditing);

  useClickOutside(formRef, () => disableEditingMode(false));
  return (
    <form ref={formRef}>
      <fieldset className="flex justify-center gap-2 bg-white p-4 rounded-md font-bigtimer text-bigtimer-brown text-timer">
        <HourField value={h} />
        <span className="text-black spacer">:</span>
        <MinuteField value={m} />
        <span className="text-black spacer">:</span>
        <SecondField value={s} />
      </fieldset>
    </form>
  );
}
