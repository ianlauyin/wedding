import { GuestInfoView } from "wedding-interface";
import { createMemo } from "solid-js";
import Button from "@components/Button";

interface Props {
  list: Array<GuestInfoView>;
  onAddGuest: () => void;
}

export const Infomations = (props: Props) => {
  const totals = createMemo(() => {
    let brideEstimated = 0;
    let brideConfirmed = 0;
    let groomEstimated = 0;
    let groomConfirmed = 0;

    props.list.forEach((guest) => {
      if (guest.side === "BRIDE") {
        brideEstimated += guest.estimatedCount;
        brideConfirmed += guest.confirmedCount || 0;
      } else {
        groomEstimated += guest.estimatedCount;
        groomConfirmed += guest.confirmedCount || 0;
      }
    });

    return {
      brideEstimated,
      brideConfirmed,
      groomEstimated,
      groomConfirmed,
    };
  });

  return (
    <div class="flex justify-between my-4 w-full">
      <div>
        <p>
          Total Estimated Count:{" "}
          {totals().brideEstimated + totals().groomEstimated}(
          <span class="text-red-400">{totals().brideEstimated}</span> /{" "}
          <span class="text-blue-400">{totals().groomEstimated}</span>)
        </p>
        <p>
          Total Confirmed Count:{" "}
          {totals().brideConfirmed + totals().groomConfirmed}(
          <span class="text-red-400">{totals().brideConfirmed}</span> /{" "}
          <span class="text-blue-400">{totals().groomConfirmed}</span>)
        </p>
      </div>
      <Button
        class="btn-sm rounded-md self-end"
        color="accent"
        onClick={props.onAddGuest}
      >
        Add Guest
      </Button>
    </div>
  );
};
