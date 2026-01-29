import { useTimerStore } from "@/store/timerStore";
import { SelectedInputGroup } from "@/types/storeTypes";
import { useEffect, useRef, useState } from "react";

type InputFieldParams = {
  name: string;
  value: string;
  selected?: boolean;
};

export default function InputField({ name, value }: InputFieldParams) {
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = useTimerStore((state) => state.selectedInputGroup) === name;
  const select = useTimerStore((state) => state.setSelectedInputGroup);

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
        readOnly // dont forget
        ref={inputRef}
        name={name}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        className={`outline-0 max-w-[2ch] text-right ${name} ${selected && "selection:text-white selection:bg-[#fdf2b3]"}`}
      />
      <span className="input-label"></span>
    </label>
  );
}
