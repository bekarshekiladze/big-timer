"use client";

import { useTimerStore } from "@/store/timerStore";
import { msToHMS } from "@/utils/timeConversions";
import { semanticTimeDisplay } from "@/utils/timeFormat";
import { useEffect, useMemo } from "react";

export default function TitleUpdater() {
  const remainingTime = useTimerStore((s) => s.remainingTime);

  const { hours, minutes, seconds } = msToHMS(remainingTime);

  const titleText = useMemo(() => {
    return semanticTimeDisplay(hours, minutes, seconds);
  }, [remainingTime]);

  useEffect(() => {
    document.title = titleText;
  }, [titleText]);

  return null;
}
