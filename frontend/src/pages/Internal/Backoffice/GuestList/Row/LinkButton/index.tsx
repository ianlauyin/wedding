import { createSignal } from "solid-js";
import linkIcon from "./link.svg";
import checkedIcon from "@assets/checked.svg";

export interface Props {
  link: string;
}

export const LinkButton = (props: Props) => {
  const [copied, setCopied] = createSignal(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(props.link);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div class="btn btn-circle btn-sm btn-outline" onClick={handleCopy}>
      {copied() ? (
        <img class="w-4 h-4" src={checkedIcon} alt="link" />
      ) : (
        <img class="w-4 h-4" src={linkIcon} alt="link" />
      )}
    </div>
  );
};
