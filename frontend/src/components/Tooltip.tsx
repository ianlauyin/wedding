import { JSX } from "solid-js";

export interface Props {
  content: string;
  children: JSX.Element;
  placement?: "top" | "bottom" | "left" | "right";
}

export const Tooltip = (props: Props) => {
  return (
    <div class={`tooltip tooltip-${props.placement}`} data-tip={props.content}>
      <div class="underline">{props.children}</div>
    </div>
  );
};
