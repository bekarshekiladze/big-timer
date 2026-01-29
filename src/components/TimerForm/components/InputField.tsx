import { useTimerStore } from "@/store/timerStore";
import { SelectedInputGroup } from "@/types/storeTypes";
import { useEffect, useRef } from "react";

type InputFieldParams = {
  name: string;
  defaultValue: string;
  selected?: boolean;
};

export default function InputField({ name, defaultValue }: InputFieldParams) {
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = useTimerStore((state) => state.selectedGroup) === name;
  const select = useTimerStore.getState().setSelectedGroup;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (selected && inputRef.current) {
      inputRef.current.select();
    }
  }, [selected]);

  return (
    <label
      className="input-group"
      onClick={() => {
        select(name as SelectedInputGroup);
      }}
    >
      <input
        onMouseDown={handleMouseDown}
        ref={inputRef}
        name={name}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        defaultValue={defaultValue}
        className={`outline-0 max-w-[2ch] text-right ${name} ${selected && "selection:text-white selection:bg-[#fdf2b3]"}`}
      />
      <span className="input-label"></span>
    </label>
  );
}
