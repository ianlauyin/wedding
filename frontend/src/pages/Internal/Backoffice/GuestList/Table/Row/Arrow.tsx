interface Props {
  opened: boolean;
}

export const Arrow = (props: Props) => {
  return (
    <div
      class={`cursor-pointer flex items-center justify-center h-8 w-8 transition-transform duration-300 ${
        props.opened ? "-rotate-90" : "rotate-90"
      }`}
    >
      <span class="text-gray-500">{">"}</span>
    </div>
  );
};
