import { GuestInfoView } from "wedding-interface";

interface Props {
  guest: GuestInfoView | true;
  refreshList: () => void;
}

export const EditModal = (props: Props) => {
  const header = props.guest === true ? "Add Guest" : "Update Guest";
  const buttonText = props.guest === true ? "Add" : "Update";

  return (
    <dialog class="modal modal-open">
      <div class="modal-box">
        <h3 class="font-bold text-lg">{header}</h3>
        <p class="py-4">You can edit the guest information here.</p>
        <div class="modal-action">
          <button class="btn btn-primary">{buttonText}</button>
        </div>
      </div>
    </dialog>
  );
};
