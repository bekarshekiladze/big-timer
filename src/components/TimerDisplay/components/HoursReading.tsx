import { useTimerStore } from "@/store/timerStore";

export default function HoursReading({ value }: { value: string | null }) {
  return <div>{value}</div>;
}
