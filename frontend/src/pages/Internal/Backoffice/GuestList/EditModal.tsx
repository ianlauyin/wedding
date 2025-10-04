import { createGuestInfo } from "@ajax/service";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { DisplayUtil } from "@utils/DisplayUtil";
import { createSignal } from "solid-js";
import {
  CreateOrUpdateGuestInfoRequest,
  GuestInfoView,
  Side,
} from "wedding-interface";

interface Props {
  guest: GuestInfoView | true;
  onClose: () => void;
  refetch: () => void;
}

export const EditModal = (props: Props) => {
  const [name, setName] = createSignal("");
  const [relationship, setRelationship] = createSignal("");
  const [estimatedCount, setEstimatedCount] = createSignal(0);
  const [side, setSide] = createSignal<Side>("BRIDE");
  const [errorMessage, setErrorMessage] = createSignal("");

  const header = props.guest === true ? "Add Guest" : "Update Guest";
  const buttonText = props.guest === true ? "Add" : "Update";

  const handleFinish = async () => {
    if (name().length === 0) return setErrorMessage("Name is required");
    if (relationship().length === 0)
      return setErrorMessage("Relationship is required");
    if (estimatedCount() === 0)
      return setErrorMessage("Estimated count should be greater than 0");

    const request: CreateOrUpdateGuestInfoRequest = {
      side: side(),
      name: name(),
      relationship: relationship(),
      estimatedCount: estimatedCount(),
    };

    try {
      if (props.guest === true) await createGuestInfo(request);
      // TODO: Implement
      // await updateGuestInfo(request, props.guest.id);
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : "Unknown error");
      return;
    }

    props.refetch();
    props.onClose();
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
          <h3 class="font-bold text-lg">{header}</h3>
          <div>
            <label class="select w-full">
              <span class="label">Side</span>
              <select
                value={side()}
                onChange={(e) => setSide(e.currentTarget.value as Side)}
              >
                <option value="BRIDE">{DisplayUtil.side("BRIDE")}</option>
                <option value="GROOM">{DisplayUtil.side("GROOM")}</option>
              </select>
            </label>
          </div>
          <Input label="Name" value={name()} setValue={setName} />
          <Input
            label="Relationship"
            value={relationship()}
            setValue={setRelationship}
          />
          <Input
            label="Estimated Count"
            value={estimatedCount()}
            setValue={setEstimatedCount}
            type="number"
          />
          <p class="text-red-500">{errorMessage()}</p>
        </div>
        <div class="modal-action">
          <Button class="btn-primary" onClick={handleFinish}>
            {buttonText}
          </Button>
        </div>
      </div>
    </dialog>
  );
};
