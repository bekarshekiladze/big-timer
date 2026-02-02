import { updateRepeatQueryAndStorage } from "@/persistency/timerSync";
import { useTimerStore } from "@/store/timerStore";

export default function Switch() {
  const repeat = useTimerStore((s) => s.repeat);
  const repeating = useTimerStore((s) => s.repeating);
  return (
    <>
      <input
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
        checked={repeating}
        onChange={(e) => {
          const repeating = e.target.checked;
          repeat(repeating);
          updateRepeatQueryAndStorage(repeating);
        }}
      />
      <label className="react-switch-label" htmlFor={`react-switch-new`}>
        <span className={`react-switch-button`} />
      </label>
    </>
  );
}
