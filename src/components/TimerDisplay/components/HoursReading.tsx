import { useTimerStore } from "@/store/timerStore";

export default function HoursReading({ value }: { value: string | null }) {
  const setSelectedInputGroup = useTimerStore(
    (state) => state.setSelectedInputGroup,
  );
  return (
    <div
      onClick={() => {
        setSelectedInputGroup("hours");
      }}
    >
      {value}
    </div>
  );
}
