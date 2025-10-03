import { GuestInfoView } from "wedding-interface";
import { Tooltip } from "@components/Tooltip";
import { Infomations } from "./Infomations";
import { Row } from "./Row";
import { JSX } from "solid-js";

export interface Props {
  list: Array<GuestInfoView>;
}

export const GuestList = (props: Props) => {
  let rows: Array<JSX.Element> = [];
  let totalEstimatedCount = 0;
  let totalConfirmedCount = 0;

  props.list.forEach((guest) => {
    totalEstimatedCount += guest.estimatedCount;
    totalConfirmedCount += guest.confirmedCount;
    rows.push(<Row guest={guest} />);
  });

  return (
    <>
      <Infomations
        totalEstimatedCount={totalEstimatedCount}
        totalConfirmedCount={totalConfirmedCount}
      />
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
        <tbody>{rows}</tbody>
      </table>
    </>
  );
};
