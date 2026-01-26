import { HourField, MinuteField, SecondField } from './components';

export default function ReadingForm() {
  return (
    <form>
      <fieldset className="flex justify-center gap-2 bg-white p-4 rounded-md font-bigtimer text-bigtimer-brown text-timer">
        <HourField selected={true} />
        <span className="text-black spacer">:</span>
        <MinuteField selected={false} />
        <span className="text-black spacer">:</span>
        <SecondField selected={false} />
      </fieldset>
    </form>
  );
}
