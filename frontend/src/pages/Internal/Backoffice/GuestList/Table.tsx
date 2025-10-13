import { GuestInfoView } from "wedding-interface";
import { Row } from "./Row";
import { ModalInfo } from "./Modal/type";

export interface Props {
  list: Array<GuestInfoView>;
  refetch: () => void;
  setModal: (modal: ModalInfo) => void;
}

export const Table = (props: Props) => {
  return (
    <table class="table">
      <thead class="bg-gray-200">
        <tr>
          <td>Relationship</td>
          <td>Name</td>
          <td class="text-center">
            <div class="tooltip tooltip-left" data-tip="Confirmed / Estimated">
              <u>Counts</u>
            </div>
          </td>
          <td class="p-2" />
        </tr>
      </thead>
      <tbody>
        {props.list.map((guest) => (
          <Row
            guest={guest}
            refetch={props.refetch}
            setModal={props.setModal}
          />
        ))}
      </tbody>
    </table>
  );
};
