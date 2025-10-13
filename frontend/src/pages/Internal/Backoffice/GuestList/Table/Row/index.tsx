import { createSignal, Show } from "solid-js";
import { GuestInfoView } from "wedding-interface";
import { Detail } from "./Detail";
import { Arrow } from "./Arrow";
import { ModalInfo } from "../../Modal/type";

interface Props {
  guest: GuestInfoView;
  setModal: (modal: ModalInfo) => void;
  refetch: () => void;
}

export const Row = (props: Props) => {
  const [opened, setOpened] = createSignal(false);
  const bg = props.guest.side === "BRIDE" ? "bg-red-200" : "bg-blue-200";

  return (
    <>
      <tr
        class={`${bg} ${opened() ? "border-b-0" : ""}`}
        onClick={() => setOpened(!opened())}
      >
        <td>{props.guest.relationship}</td>
        <td>{props.guest.name}</td>
        <td class="text-center">
          {props.guest.confirmedCount === null
            ? "-"
            : props.guest.confirmedCount}
          /{props.guest.estimatedCount}
        </td>
        <td class="p-2 w-8">
          <Arrow opened={opened()} />
        </td>
      </tr>
      <Show when={opened()}>
        <Detail
          guest={props.guest}
          bg={bg}
          refetch={props.refetch}
          setModal={props.setModal}
        />
      </Show>
    </>
  );
};
