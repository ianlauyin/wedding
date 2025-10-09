import { JSX } from "solid-js";

export interface Props {
  label: string;
  value: number | null;
  setValue: (value: number | null) => void;
  min?: number;
  max?: number;
}

export const NullableNumberInput = (props: Props) => {
  const handleInput: JSX.InputEventHandlerUnion<
    HTMLInputElement,
    InputEvent
  > = (e) => {
    const newValue =
      e.currentTarget.value === "" ? null : Number(e.currentTarget.value);
    if (newValue === null) props.setValue(null);
    else if (props.min && newValue < props.min) props.setValue(props.min);
    else if (props.max && newValue > props.max) props.setValue(props.max);
    else props.setValue(newValue);
  };

  return (
    <label class="input w-full">
      {props.label}
      <div class="divider divider-horizontal" />
      <input
        type="number"
        class="validator"
        placeholder="-"
        min={props.min}
        max={props.max}
        value={props.value === null ? "" : props.value}
        onInput={handleInput}
      />
    </label>
  );
};
