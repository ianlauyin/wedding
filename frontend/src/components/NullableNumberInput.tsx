export interface Props {
  label: string;
  value: number | null;
  setValue: (value: number | null) => void;
  min?: number;
  max?: number;
}

export const NullableNumberInput = (props: Props) => {
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
        onInput={(e) =>
          props.setValue(
            e.currentTarget.value ? Number(e.currentTarget.value) : null
          )
        }
      />
    </label>
  );
};
