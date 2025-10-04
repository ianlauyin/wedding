import { createSignal, JSX } from "solid-js";

export interface Props {
  children: JSX.Element;
  onClick: () => any;
  class?: string;
  disabled?: boolean;
}

export function Button(props: Props) {
  const [loading, setLoading] = createSignal(false);

  const handleClick = async () => {
    setLoading(true);
    await props.onClick();
    setLoading(false);
  };

  return (
    <button
      class={`btn ${props.class}`}
      disabled={props.disabled || loading()}
      onClick={handleClick}
    >
      {loading() ? <span class="loading loading-spinner" /> : props.children}
    </button>
  );
}
