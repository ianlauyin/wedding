import { GuestInfoView } from "wedding-interface";
import { Row } from "./Row";
import { ModalInfo } from "../Modal/type";
import { createSignal } from "solid-js";
import { Filter } from "./Filter";

export interface Props {
  list: Array<GuestInfoView>;
  refetch: () => void;
  setModal: (modal: ModalInfo) => void;
}

export const Table = (props: Props) => {
  const [displayList, setDisplayList] = createSignal<Array<GuestInfoView>>(
    props.list
  );

  return (
    <>
      <Filter list={props.list} setList={setDisplayList} />
      <table class="table">
        <thead class="bg-gray-200">
          <tr>
            <td>Relationship</td>
            <td>Name</td>
            <td class="text-center">
              <div
                class="tooltip tooltip-left"
                data-tip="Confirmed / Estimated"
              >
                <u>Counts</u>
              </div>
            </td>
            <td class="p-2" />
          </tr>
        </thead>
        <tbody>
          {displayList().map((guest) => (
            <Row
              guest={guest}
              refetch={props.refetch}
              setModal={props.setModal}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
