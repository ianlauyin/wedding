interface Props {
  opened: boolean;
}

export const Arrow = (props: Props) => {
  return (
    <div
      class={`transition-transform duration-300 ${
        props.opened ? "-rotate-90" : "rotate-90"
      }`}
    >
      <span class="text-gray-500">{">"}</span>
    </div>
  );
};
