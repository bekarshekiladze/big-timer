"use client"


import { useEffect, useState } from "react";
import { CountdownReading } from "../CountdownReading";
import { ReadingForm } from "../ReadingForm";
import { initTimerFromStorageOrUrl } from "@/utils/store";
import { useTimerStore } from "@/store/timerStore";

type SelectedInputGroup = 'hours' | 'minutes' | 'seconds'

export default function Wrapper() {
  const isEditing = useTimerStore(state => state.isEditing)


  useEffect(() => {
    initTimerFromStorageOrUrl();
    const params = new URLSearchParams(window.location.search);
    useTimerStore.getState().syncFromUrl(params);
  }, []);


  return <div className="wrapper">
    {isEditing ? <ReadingForm /> : <CountdownReading />}
  </div>;
}
