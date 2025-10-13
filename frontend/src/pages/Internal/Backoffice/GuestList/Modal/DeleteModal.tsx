import { removeGuest } from "@ajax/service";
import { Button } from "@components/Button";
import { ErrorModalContext } from "@context/ErrorModal";
import { useContext } from "solid-js";
import { GuestInfoView } from "wedding-interface";

interface Props {
  guest: GuestInfoView;
  onClose: () => void;
  refetch: () => void;
}

export const DeleteModal = (props: Props) => {
  const errorModalContext = useContext(ErrorModalContext);

  const handleDelete = async () => {
    try {
      await removeGuest(props.guest.id);
      props.refetch();
      props.onClose();
    } catch (error: unknown) {
      errorModalContext?.setErrorMessage(
        error instanceof Error ? error.message : "Failed to delete guest"
      );
    }
  };

  return (
    <dialog class="modal modal-open">
      <div class="modal-box">
        <Button
          class="btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={props.onClose}
        >
          ✕
        </Button>
        <div class="space-y-4">
          <h3 class="font-bold text-lg">Delete Guest</h3>
          <div>Do you want to delete this guest: {props.guest.name}?</div>
        </div>
        <div class="modal-action">
          <Button class="btn-error" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop" onClick={props.onClose} />
    </dialog>
  );
};
