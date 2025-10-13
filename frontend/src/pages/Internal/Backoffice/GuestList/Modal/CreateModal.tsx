import { createGuestInfo } from "@ajax/service";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { NumberInput } from "@components/NumberInput";
import { DisplayUtil } from "@utils/DisplayUtil";
import { GuestInfoValidator } from "@utils/GuestInfoValidator";
import { createSignal } from "solid-js";
import { CreateGuestInfoRequest, GuestInfoView, Side } from "wedding-interface";

interface Props {
  onClose: () => void;
  refetch: () => void;
}

const INITIAL_REQUEST: CreateGuestInfoRequest = {
  side: "BRIDE",
  name: "",
  relationship: "",
  estimatedCount: 0,
};

export const CreateModal = (props: Props) => {
  const [draft, setDraft] =
    createSignal<CreateGuestInfoRequest>(INITIAL_REQUEST);
  const [errorMessage, setErrorMessage] = createSignal("");

  const handleFinish = async () => {
    const request = draft();
    try {
      new GuestInfoValidator()
        .checkName(request.name)
        .checkRelationship(request.relationship)
        .checkEstimatedCount(request.estimatedCount);
      await createGuestInfo(draft());
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
          <h3 class="font-bold text-lg">Add Guest</h3>
          <div>
            <label class="select w-full">
              <span class="label">Side</span>
              <select
                value={draft().side}
                onChange={(e) =>
                  setDraft({
                    ...draft(),
                    side: e.currentTarget.value as Side,
                  })
                }
              >
                <option value="BRIDE">{DisplayUtil.side("BRIDE")}</option>
                <option value="GROOM">{DisplayUtil.side("GROOM")}</option>
              </select>
            </label>
          </div>
          <Input
            label="Name"
            value={draft().name}
            setValue={(name) => setDraft({ ...draft(), name })}
          />
          <Input
            label="Relationship"
            value={draft().relationship}
            setValue={(relationship) => setDraft({ ...draft(), relationship })}
          />
          <NumberInput
            label="Estimated Count"
            min={0}
            max={12}
            value={draft().estimatedCount}
            setValue={(estimatedCount) =>
              setDraft({ ...draft(), estimatedCount })
            }
          />
          <p class="text-red-500">{errorMessage()}</p>
        </div>
        <div class="modal-action">
          <Button class="btn-primary" onClick={handleFinish}>
            Add
          </Button>
        </div>
      </div>
    </dialog>
  );
};
