import { CountdownReading } from "../CountdownReading";
import { ReadingForm } from "../ReadingForm";


export default function Wrapper({ isReading }: { isReading: boolean }) {
  return isReading ? <CountdownReading /> : <ReadingForm />;
}
