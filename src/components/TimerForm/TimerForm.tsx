import { useEffect, useRef, useState } from "react";
import { useTimerStore } from "@/store/timerStore";
import { formatTimeDisplay } from "@/utils/timeFormat";
import { msToHMS } from "@/utils/timeConversions";
import { onlyDigits } from "@/utils/inputControls/inputUx";
import InputField from "./components/InputField";

type Group = "hours" | "minutes" | "seconds";
const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));
const clampByGroup = (g: Group, n: number) =>
  g === "hours" ? clamp(n, 0, 23) : clamp(n, 0, 59);
const pad2 = (s: string) => s.padStart(2, "0");

export default function TimerForm() {
  const duration = useTimerStore((state) => state.duration);
  const applyTimes = useTimerStore((state) => state.applyTimes);
  const setIsEditing = useTimerStore((state) => state.setIsEditing);

  const [draft, setDraft] = useState(() => {
    const { hours, minutes, seconds } = msToHMS(duration);
    return {
      hours: String(hours),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  });

  useEffect(() => {
    const { hours, minutes, seconds } = msToHMS(duration);
    setDraft({
      hours: String(hours),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    });
  }, [duration]);

  const onChangeField = (g: Group, raw: string) => {
    const d = onlyDigits(raw);

    if (d === "") {
      setDraft((prev) => ({ ...prev, [g]: "" }));
      return;
    }

    const clamped = String(clampByGroup(g, Number(d)));

    setDraft((prev) => ({
      ...prev,
      [g]: g === "hours" ? clamped : pad2(clamped),
    }));
  };

  const onBlurField = (g: Group) => {
    // normalize empties on blur (optional, feels nicer)
    setDraft((prev) => {
      const raw = prev[g];
      const num = raw === "" ? 0 : clampByGroup(g, Number(raw));
      const str = String(num);
      return {
        ...prev,
        [g]: g === "hours" ? str : pad2(str),
      };
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitted");

    const h = clampByGroup("hours", Number(draft.hours || 0));
    const m = clampByGroup("minutes", Number(draft.minutes || 0));
    const s = clampByGroup("seconds", Number(draft.seconds || 0));

    const ms = (h * 3600 + m * 60 + s) * 1000;
    applyTimes(ms);
    setIsEditing(false);
  };

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} onSubmit={onSubmit}>
      <fieldset className="flex justify-center gap-2 bg-white p-4 rounded-md font-bigtimer text-bigtimer-brown text-timer">
        <InputField
          name="hours"
          value={draft.hours}
          onChange={onChangeField}
          onBlur={onBlurField}
        />
        <span className="text-black spacer">:</span>
        <InputField
          name="minutes"
          value={draft.minutes}
          onChange={onChangeField}
          onBlur={onBlurField}
        />
        <span className="text-black spacer">:</span>
        <InputField
          name="seconds"
          value={draft.seconds}
          onChange={onChangeField}
          onBlur={onBlurField}
        />
        <button className="hidden" type="submit"></button>
      </fieldset>
    </form>
  );
}
