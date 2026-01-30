import { useTimerStore } from "@/store/timerStores";

export default function MinutesReading({ value }: { value: string }) {
  const setSelectedInputGroup = useTimerStore(
    (state) => state.setSelectedInputGroup,
  );
  return (
    <div
      onClick={() => {
        setSelectedInputGroup("minutes");
      }}
    >
      {value}
    </div>
  );
}
