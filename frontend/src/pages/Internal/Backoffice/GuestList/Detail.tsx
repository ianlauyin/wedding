import { GuestInfoView } from "wedding-interface";

export interface Props {
  guest: GuestInfoView;
}

export const Detail = (props: Props) => {
  return <div>{props.guest.name}</div>;
};
