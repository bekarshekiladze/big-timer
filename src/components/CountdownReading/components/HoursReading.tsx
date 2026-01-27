import { useTimerStore } from "@/store/timerStore";

export default function HoursReading({ value }: { value: string | null }) {
  
  return (
    <div
      onClick={() => {
        useTimerStore.getState().setSelectedGroup("hours");
      }}
    >
      {value}
    </div>
  );
}
