import { updateGuest } from "@ajax/service";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { NullableNumberInput } from "@components/NullableNumberInput";
import { NumberInput } from "@components/NumberInput";
import { DisplayUtil } from "@utils/DisplayUtil";
import { GuestInfoValidator } from "@utils/GuestInfoValidator";
import { createSignal } from "solid-js";
import { GuestInfoView, Side, UpdateGuestInfoRequest } from "wedding-interface";

interface Props {
  guest: GuestInfoView;
  onClose: () => void;
  refetch: () => void;
}

export const UpdateModal = (props: Props) => {
  const [draft, setDraft] = createSignal<UpdateGuestInfoRequest>(props.guest);
  const [errorMessage, setErrorMessage] = createSignal("");

  const handleFinish = async () => {
    const request = draft();
    try {
      new GuestInfoValidator(props.guest)
        .checkName(request.name)
        .checkRelationship(request.relationship)
        .checkEstimatedCount(request.estimatedCount)
        .checkConfirmedCount(request.confirmedCount);
      await updateGuest(props.guest.id, request);
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
          <h3 class="font-bold text-lg">{"Update Guest"}</h3>
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
          <NullableNumberInput
            label="Confirmed Count"
            min={0}
            max={draft().estimatedCount}
            value={draft().confirmedCount}
            setValue={(confirmedCount) =>
              setDraft({ ...draft(), confirmedCount })
            }
          />
          <p class="text-red-500">{errorMessage()}</p>
        </div>
        <div class="modal-action">
          <Button class="btn-primary" onClick={handleFinish}>
            {"Update"}
          </Button>
        </div>
      </div>
    </dialog>
  );
};
