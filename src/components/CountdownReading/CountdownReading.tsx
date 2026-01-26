import { HoursReading, MinutesReading, SecondsReading } from "./components";

export default function CountdownReading() {
  return <div className="flex justify-center gap-2 p-4 font-bigtimer text-timer">
    <HoursReading /> :
    <MinutesReading /> :
    <SecondsReading />
  </div>;
}
