import { useCallback } from "react";
import { useTimerStore } from "@/store/timerStores";

export function useTimerMode() {
  const isEditing = useTimerStore((s) => s.isEditing);
  const isRunning = useTimerStore((s) => s.isRunning);

  const pause = useTimerStore((s) => s.pause);
  const setIsEditing = useTimerStore((s) => s.setIsEditing);

  const enterEdit = useCallback(() => {
    if (isRunning) pause();
    setIsEditing(true);
  }, [isRunning, pause, setIsEditing]);

  const exitEdit = useCallback(() => {
    setIsEditing(false);
  }, [setIsEditing]);

  const toggleEdit = useCallback(() => {
    if (isEditing) exitEdit();
    else enterEdit();
  }, [isEditing, enterEdit, exitEdit]);

  return { isEditing, enterEdit, exitEdit, toggleEdit };
}
