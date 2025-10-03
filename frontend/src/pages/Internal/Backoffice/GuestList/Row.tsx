import { GuestInfoView } from "wedding-interface";

interface Props {
  guest: GuestInfoView;
}

export const Row = (props: Props) => {
  const bg = props.guest.side === "BRIDE" ? "bg-red-200" : "bg-blue-200";
  return (
    <tr class={bg}>
      <td>{props.guest.relationship}</td>
      <td>{props.guest.name}</td>
      <td class="text-end">
        {props.guest.confirmedCount || "-"}/{props.guest.estimatedCount}
      </td>
    </tr>
  );
};
