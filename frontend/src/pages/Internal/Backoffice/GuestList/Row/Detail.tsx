import { removeGuest } from "@ajax/service";
import { Button } from "@components/Button";
import { ErrorModalContext } from "@context/ErrorModal";
import { DisplayUtil } from "@utils/DisplayUtil";
import { useContext } from "solid-js";
import { GuestInfoView } from "wedding-interface";

export interface Props {
  guest: GuestInfoView;
  bg: string;
  refetch: () => void;
  onEditButtonClick: () => void;
}

export const Detail = (props: Props) => {
  const errorModalContext = useContext(ErrorModalContext);

  const handleDelete = async () => {
    try {
      await removeGuest(props.guest.id);
      props.refetch();
    } catch (error: unknown) {
      errorModalContext?.setErrorMessage(
        error instanceof Error ? error.message : "Failed to delete guest"
      );
    }
  };

  return (
    <tr class={`border-t-0 ${props.bg}`}>
      <td class="px-4 pt-0 " colSpan={4}>
        <div>
          <p>Side: {DisplayUtil.side(props.guest.side)}</p>
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
            <Button class="btn-sm btn-error" onClick={handleDelete}>
              Delete
            </Button>
            <Button class="btn-sm btn-accent" onClick={props.onEditButtonClick}>
              Edit
            </Button>
          </div>
        </div>
      </td>
    </tr>
  );
};
