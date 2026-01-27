"use client";

import InputField from "./InputField";

export default function HourField({ value }: { value: string | null }) {
  const newValue = value || "0";
  return <InputField name="hours" defaultValue={newValue} />;
}
