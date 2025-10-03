import { GuestInfoView } from "wedding-interface";
import { Tooltip } from "@components/Tooltip";

export interface Props {
  list: Array<GuestInfoView>;
}

export const GuestList = (props: Props) => {
  const mapRow = (guest: GuestInfoView) => {
    const bg = guest.side === "BRIDE" ? "bg-red-200" : "bg-blue-200";
    return (
      <tr class={bg}>
        <td>{guest.relationship}</td>
        <td>{guest.name}</td>
        <td class="text-end">
          {guest.confirmedCount}/{guest.estimatedCount}
        </td>
      </tr>
    );
  };

  return (
    <table class="table">
      <thead class="bg-gray-200">
        <tr>
          <td>Relationship</td>
          <td>Name</td>
          <td class="text-end">
            <Tooltip content="Confirmed / Estimated" placement="left">
              Counts
            </Tooltip>
          </td>
        </tr>
      </thead>
      <tbody>{props.list.map(mapRow)}</tbody>
    </table>
  );
};
