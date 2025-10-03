import { GuestInfoView } from "wedding-interface";

export interface Props {
  guest: GuestInfoView;
  bg: string;
}

export const Detail = (props: Props) => {
  return (
    <tr class={`border-t-0 border-accent ${props.bg}`}>
      <td colSpan={4}>Detail</td>
    </tr>
  );
};
