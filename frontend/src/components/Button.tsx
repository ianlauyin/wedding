import { createSignal, JSX } from "solid-js";

export interface Props {
  children: JSX.Element;
  onClick: () => any;
  class?: string;
  color?: "primary" | "secondary" | "accent" | "info" | "error" | "ghost";
  disabled?: boolean;
}

export default function Button(props: Props) {
  const [loading, setLoading] = createSignal(false);

  const handleClick = async () => {
    setLoading(true);
    await props.onClick();
  };

  return (
    <button
      class={`btn ${props.color && "btn-" + props.color} ${props.class}`}
      disabled={props.disabled || loading()}
      onClick={handleClick}
    >
      {loading() ? <span class="loading loading-spinner" /> : props.children}
    </button>
  );
}
