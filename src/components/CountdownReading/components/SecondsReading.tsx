import { useTimerStore } from "@/store/timerStore";

export default function SecondsReading({ value }: { value: string }) {
  return (
    <div
      onClick={() => {
        useTimerStore.getState().setSelectedGroup("seconds");
      }}
    >
      {value}
    </div>
  );
}
