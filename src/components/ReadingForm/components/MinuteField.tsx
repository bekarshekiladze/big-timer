"use client"

import InputField from "./InputField";

export default function MinuteField({ selected }: { selected: boolean }) {
  return (
    <InputField name="hours" defaultValue="00" selected={selected} />
  );
}
