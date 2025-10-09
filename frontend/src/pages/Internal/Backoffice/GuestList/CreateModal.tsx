import { createGuestInfo } from "@ajax/service";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { DisplayUtil } from "@utils/DisplayUtil";
import { createSignal } from "solid-js";
import { CreateGuestInfoRequest, GuestInfoView, Side } from "wedding-interface";

interface Props {
  guest: GuestInfoView | true;
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
  const [request, setRequest] = createSignal<CreateGuestInfoRequest>(
    props.guest === true ? INITIAL_REQUEST : { ...props.guest }
  );
  const [errorMessage, setErrorMessage] = createSignal("");

  const header = props.guest === true ? "Add Guest" : "Update Guest";
  const buttonText = props.guest === true ? "Add" : "Update";

  const handleFinish = async () => {
    if (request().name.length === 0) return setErrorMessage("Name is required");
    if (request().relationship.length === 0)
      return setErrorMessage("Relationship is required");
    if (request().estimatedCount === 0)
      return setErrorMessage("Estimated count should be greater than 0");

    try {
      if (props.guest === true) await createGuestInfo(request());
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
                value={request().side}
                onChange={(e) =>
                  setRequest({
                    ...request(),
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
            value={request().name}
            setValue={(name) => setRequest({ ...request(), name })}
          />
          <Input
            label="Relationship"
            value={request().relationship}
            setValue={(relationship) =>
              setRequest({ ...request(), relationship })
            }
          />
          <label class="input w-full">
            Estimated Count
            <div class="divider divider-horizontal" />
            <input
              type="number"
              min={0}
              max={12}
              value={request().estimatedCount}
              onInput={(e) =>
                setRequest({
                  ...request(),
                  estimatedCount: Number(e.currentTarget.value),
                })
              }
            />
          </label>
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
