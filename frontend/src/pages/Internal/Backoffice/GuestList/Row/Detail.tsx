import { Button } from "@components/Button";
import { DisplayUtil } from "@utils/DisplayUtil";
import { GuestInfoView } from "wedding-interface";
import { ModalInfo } from "../Modal/type";
import { LinkButton } from "./LinkButton";
import { QrCodeButton } from "./QrCodeButton";

export interface Props {
  guest: GuestInfoView;
  bg: string;
  refetch: () => void;
  setModal: (modal: ModalInfo) => void;
}

export const Detail = (props: Props) => {
  const link = `${document.location.origin}/invitation/${props.guest.id}`;

  return (
    <tr class={`border-t-0 ${props.bg}`}>
      <td class="px-4 pt-0 " colSpan={4}>
        <div>
          <div class="flex justify-between">
            <p>Side: {DisplayUtil.side(props.guest.side)}</p>
            <div class="flex gap-2">
              <LinkButton link={link} />
              <QrCodeButton link={link} />
            </div>
          </div>
          <div class="text-xs">
            <p>
              Created at {DisplayUtil.time(props.guest.createdAt)} by{" "}
              {props.guest.createdBy}
            </p>
            <p>
              Updated at {DisplayUtil.time(props.guest.updatedAt)} by{" "}
              {props.guest.updatedBy}
            </p>
          </div>
          <div class="flex justify-end gap-6 py-2">
            <Button
              class="btn-sm btn-error"
              onClick={() =>
                props.setModal({ type: "delete", guest: props.guest })
              }
            >
              Delete
            </Button>
            <Button
              class="btn-sm btn-accent"
              onClick={() =>
                props.setModal({ type: "update", guest: props.guest })
              }
            >
              Edit
            </Button>
          </div>
        </div>
      </td>
    </tr>
  );
};
