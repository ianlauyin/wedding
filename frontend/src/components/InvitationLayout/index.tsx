import { JSX } from "solid-js";

export interface Props {
  children?: JSX.Element;
}

export const InvitationLayout = (props: Props) => {
  return <div>Invitation Layout{props.children}</div>;
};
