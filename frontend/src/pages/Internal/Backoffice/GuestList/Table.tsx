import { Tooltip } from "@components/Tooltip";
import { GuestInfoView } from "wedding-interface";
import { Row } from "./Row";

export interface Props {
  list: Array<GuestInfoView>;
}

export const Table = (props: Props) => {
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
      <tbody>
        {props.list.map((guest) => (
          <Row guest={guest} />
        ))}
      </tbody>
    </table>
  );
};
