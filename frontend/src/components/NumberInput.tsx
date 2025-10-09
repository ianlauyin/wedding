export interface Props {
  label: string;
  value: number;
  setValue: (value: number) => void;
  min?: number;
  max?: number;
}

export const NumberInput = (props: Props) => {
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
        value={props.value ? props.value : "-"}
        onInput={(e) => props.setValue(Number(e.currentTarget.value))}
      />
    </label>
  );
};
