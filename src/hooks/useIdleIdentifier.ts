"use client";

import { useEffect, useRef, useState } from "react";
import usePointerIdentifier from "./usePoinerIdentifier";

export default function useIdleIdentifier(idleMs = 10000) {
  const [idle, setIdle] = useState(false);
  const mouseCapable = usePointerIdentifier();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mouseCapable) {
      setIdle(false);
      document.documentElement.classList.remove("cursor-hidden");
      return;
    }

    const clear = () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const arm = () => {
      clear();
      timerRef.current = window.setTimeout(() => setIdle(true), idleMs);
    };

    const wake = () => {
      setIdle(false);
      arm();
    };

    arm();

    // cursor hiding part

    const root = document.documentElement;

    const applyCursor = (nextIdle: boolean) => {
      root.classList.toggle("cursor-hidden", nextIdle);
    };

    applyCursor(idle);

    window.addEventListener("pointermove", wake, { passive: true });
    window.addEventListener("keydown", wake);

    return () => {
      clear();
      root.classList.remove("cursor-hidden");
      window.removeEventListener("pointermove", wake);
      window.removeEventListener("keydown", wake);
    };
  }, [mouseCapable, idleMs]);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "cursor-hidden",
      mouseCapable && idle,
    );
  }, [mouseCapable, idle]);

  return idle;
}
