import { JSX } from "solid-js";

export interface Props {
  label: string;
  value: string | number;
  setValue: (value: string | number) => void;
  type?: "text" | "password" | "number";
}

export const Input = (props: Props) => {
  const handleInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
    if (typeof props.value === "number") {
      props.setValue(Number(e.currentTarget.value));
    } else {
      props.setValue(e.currentTarget.value);
    }
  };

  return (
    <label class="input w-full">
      {props.label}
      <div class="divider divider-horizontal" />
      <input
        type={props.type || "text"}
        value={props.value}
        onInput={handleInput}
      />
    </label>
  );
};
