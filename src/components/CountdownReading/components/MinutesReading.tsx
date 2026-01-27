import { useTimerStore } from "@/store/timerStore";

export default function MinutesReading({ value }: { value: string }) {
  return (
    <div
      onClick={() => {
        useTimerStore.getState().setSelectedGroup("minutes");
      }}
    >
      {value}
    </div>
  );
}
