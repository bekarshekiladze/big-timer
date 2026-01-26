'use client'

import InputField from "./InputField";

export default function HourField({ selected }: { selected: boolean }) {


  return <InputField name="hours" defaultValue="0" selected={selected} />
}
