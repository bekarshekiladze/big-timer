"use client";

import InputField from "./InputField";

export default function MinuteField({ value }: { value: string }) {
  return <InputField name="minutes" defaultValue={value} />;
}
