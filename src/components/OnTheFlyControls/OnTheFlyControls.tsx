"use client";

import { useTimerStore } from "@/store/timerStore";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

export default function OnTheFlyControls() {
  return (
    <div className="text-bigtimer-black buttons-container">
      <button className="place-content-center grid round button primary-button">
        <FaPlus />
      </button>
      <button className="place-content-center grid round button primary-button">
        <FaMinus />
      </button>
    </div>
  );
}
