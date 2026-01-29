import { useTimerStore } from "@/store/timerStore";

export default function SecondsReading({ value }: { value: string }) {
  return <div>{value}</div>;
}
