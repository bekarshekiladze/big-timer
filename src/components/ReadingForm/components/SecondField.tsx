"use client";

import InputField from "./InputField";

export default function SecondField({ value }: { value: string }) {
  return <InputField name="seconds" defaultValue={value} />;
}
