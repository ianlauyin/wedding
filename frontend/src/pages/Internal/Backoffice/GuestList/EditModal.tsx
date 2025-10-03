import { Input } from "@components/Input";
import { DisplayUtil } from "@utils/display";
import { createSignal } from "solid-js";
import { GuestInfoView, Side } from "wedding-interface";

interface Props {
  guest: GuestInfoView | true;
  onClose: () => void;
  refreshList: () => void;
}

export const EditModal = (props: Props) => {
  const [name, setName] = createSignal("");
  const [relationship, setRelationship] = createSignal("");
  const [estimatedCount, setEstimatedCount] = createSignal(0);
  const [side, setSide] = createSignal<Side>("BRIDE");

  const header = props.guest === true ? "Add Guest" : "Update Guest";
  const buttonText = props.guest === true ? "Add" : "Update";

  return (
    <dialog class="modal modal-open">
      <div class="modal-box">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={props.onClose}
        >
          ✕
        </button>
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
        </div>
        <div class="modal-action">
          <button class="btn btn-primary">{buttonText}</button>
        </div>
      </div>
    </dialog>
  );
};
