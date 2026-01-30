import { useTimerStore } from "@/store/timerStore";

export default function SecondsReading({ value }: { value: string }) {
  const setSelectedInputGroup = useTimerStore(
    (state) => state.setSelectedInputGroup,
  );
  return (
    <div
      onClick={() => {
        setSelectedInputGroup("seconds");
      }}
    >
      {value}
    </div>
  );
}
