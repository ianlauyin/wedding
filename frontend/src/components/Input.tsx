export interface Props {
  label: string;
  value: string;
  setValue: (value: string) => void;
  type?: "text" | "password";
}

export const Input = (props: Props) => {
  return (
    <label class="input w-full">
      {props.label}
      <div class="divider divider-horizontal" />
      <input
        type={props.type || "text"}
        value={props.value}
        onInput={(e) => props.setValue(e.target.value)}
      />
    </label>
  );
};
