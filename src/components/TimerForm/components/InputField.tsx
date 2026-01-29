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
  const moveSelection = useTimerStore((state) => state.moveSelection);
  const nudgeSelected = useTimerStore((state) => state.nudgeSelected);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Only let the "active" field react
    if (!selected) return;

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        moveSelection("left");
        return;
      case "ArrowRight":
        e.preventDefault();
        moveSelection("right");
        return;
      case "ArrowUp":
        e.preventDefault();
        nudgeSelected("up");
        return;
      case "ArrowDown":
        e.preventDefault();
        nudgeSelected("down");
        return;
      default:
        return;
    }
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
        //readOnly // dont forget
        ref={inputRef}
        name={name}
        type="text"
        inputMode="numeric"
        onKeyDown={handleKeyDown}
        pattern="[0-9]*"
        value={value}
        className={`outline-0 max-w-[2ch] text-right ${name} ${selected && "selection:text-white selection:bg-[#fdf2b3]"}`}
      />
      <span className="input-label"></span>
    </label>
  );
}
